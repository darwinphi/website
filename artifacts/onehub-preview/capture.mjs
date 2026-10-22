// Run with Node.js. Requires Playwright, a Chromium installation, and FFmpeg.
// Override PLAYWRIGHT_MODULE, CHROMIUM_PATH, or FFMPEG_PATH on other machines.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/Users/dar.manalo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const output = dirname(fileURLToPath(import.meta.url));
const fps = 60;
const viewport = { width: 1280, height: 720 };
const holdStart = 1.5;
const scrollDuration = 10.5;
const holdEnd = 1.5;
const duration = holdStart + scrollDuration + holdEnd;
const loopDuration = duration + 0.5;
const master = join(output, 'onehub-scroll.mp4');
const loop = join(output, 'onehub-scroll-loop.mp4');
const cover = join(output, 'onehub-cover.png');
const ffmpeg = process.env.FFMPEG_PATH || '/opt/homebrew/bin/ffmpeg';
await mkdir(output, { recursive: true });

function encoder(args) {
  const child = spawn(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['pipe', 'ignore', 'pipe'] });
  let errors = '';
  child.stderr.on('data', chunk => { errors += chunk; });
  child.stdin.on('error', () => {});
  const done = new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error(errors || `FFmpeg exited ${code}`)));
  });
  // Attach a handler immediately; the original promise still rejects on await.
  done.catch(() => {});
  return { child, done };
}

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH === 'default' ? {} : { executablePath: process.env.CHROMIUM_PATH || '/Users/dar.manalo/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell' }),
});
let capture;
try {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1.5, colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto('https://onehub.globe.com.ph/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
  });
  // Warm up any content that loads or reveals on scroll, then return to the hero.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
    for (const animation of document.getAnimations()) {
      if (animation.effect?.getTiming().iterations !== Infinity) {
        try { animation.finish(); } catch {}
      } else animation.pause();
    }
  });
  // These capture-only styles hide recording clutter without changing site copy.
  await page.addStyleTag({ content: 'html {scroll-behavior:auto !important; scrollbar-width:none !important;} ::-webkit-scrollbar {display:none !important;} * {caret-color:transparent !important;}' });
  await page.mouse.move(1279, 719);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const first = await page.screenshot({ path: cover, type: 'png' });
  capture = encoder([
    '-f', 'image2pipe', '-framerate', String(fps), '-vcodec', 'png', '-i', 'pipe:0',
    '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', '-r', String(fps), master,
  ]);
  async function frame(buffer) {
    if (!capture.child.stdin.write(buffer)) await once(capture.child.stdin, 'drain');
  }
  for (let i = 0; i < holdStart * fps; i++) await frame(first);
  let last = first;
  const frames = Math.round(scrollDuration * fps);
  for (let i = 1; i <= frames; i++) {
    const t = i / frames;
    // Gentle acceleration and deceleration, with a near-constant middle speed.
    const ramp = 0.12;
    const progress = t < ramp ? t * t / (2 * ramp * (1 - ramp))
      : t > 1 - ramp ? 1 - (1 - t) ** 2 / (2 * ramp * (1 - ramp))
      : (t - ramp / 2) / (1 - ramp);
    await page.evaluate(async y => {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(resolve => requestAnimationFrame(resolve));
    }, maxScroll * progress);
    last = await page.screenshot({ type: 'png' });
    await frame(last);
    if (i % 120 === 0) console.log(`Captured ${i}/${frames} scrolling frames`);
  }
  for (let i = 0; i < holdEnd * fps; i++) await frame(last);
  await writeFile(join(output, 'onehub-end.png'), last);
  capture.child.stdin.end();
  await capture.done;
  console.log('Scroll master captured; encoding seamless loop.');
  const looping = encoder([
    '-i', master, '-loop', '1', '-framerate', String(fps), '-i', cover,
    '-filter_complex', `[0:v]settb=AVTB,setpts=PTS-STARTPTS[a];[1:v]format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=1:offset=${duration - 1}[v]`,
    '-map', '[v]', '-t', String(loopDuration), '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', String(fps), loop,
  ]);
  looping.child.stdin.end();
  await looping.done;
  await writeFile(join(output, 'capture-info.json'), JSON.stringify({
    source: 'https://onehub.globe.com.ph/', capturedAt: new Date().toISOString(),
    viewport, resolution: { width: 1920, height: 1080 }, fps, duration, loopDuration, maxScroll,
    files: ['onehub-scroll.mp4', 'onehub-scroll-loop.mp4', 'onehub-cover.png'],
  }, null, 2) + '\n');
  console.log(JSON.stringify({ master, loop, cover, duration, loopDuration, fps }));
} finally {
  if (capture && !capture.child.stdin.writableEnded) capture.child.stdin.destroy();
  await browser.close();
}
