import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

function createFlagTexture() {
  const texture = document.createElement('canvas');
  texture.width = 240;
  texture.height = 120;
  const context = texture.getContext('2d');
  context.fillStyle = '#0038a8';
  context.fillRect(0, 0, 240, 60);
  context.fillStyle = '#ce1126';
  context.fillRect(0, 60, 240, 60);
  context.fillStyle = '#fff';
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(104, 60);
  context.lineTo(0, 120);
  context.fill();
  context.fillStyle = '#fcd116';

  // Eight rays and three stars stay part of the cloth as it bends.
  context.save();
  context.translate(35, 60);
  for (let ray = 0; ray < 8; ray += 1) {
    context.save();
    context.rotate(ray * Math.PI / 4);
    context.beginPath();
    context.moveTo(7, -2);
    context.lineTo(17, -1);
    context.lineTo(19, 0);
    context.lineTo(17, 1);
    context.lineTo(7, 2);
    context.fill();
    context.restore();
  }
  context.beginPath();
  context.arc(0, 0, 9, 0, Math.PI * 2);
  context.fill();
  context.restore();

  for (const [x, y, angle] of [[12, 16, -Math.PI / 2], [12, 104, Math.PI / 2], [83, 60, 0]]) {
    context.beginPath();
    for (let point = 0; point < 10; point += 1) {
      const radius = point % 2 === 0 ? 6 : 2.5;
      const direction = angle + point * Math.PI / 5;
      const px = x + Math.cos(direction) * radius;
      const py = y + Math.sin(direction) * radius;
      if (point === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    }
    context.closePath();
    context.fill();
  }
  return texture;
}

function drawFlag(canvas, texture, time, reducedMotion) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.scale(canvas.width / 140, canvas.height / 84);

  const strips = 60;
  const width = 120;
  const height = 60;
  const wind = 0.8 + Math.sin(time * 0.6) * 0.12;
  const wave = (u) => reducedMotion ? 0 : (
    // Travelling waves grow toward the free edge; the hoist stays fixed.
    Math.pow(u, 1.25) * wind * (
      Math.sin(u * 8 - time * 3.2) * 5
      + Math.sin(u * 13 - time * 4.7 + 0.8) * 1.3
    )
  );
  let x = 8;
  for (let strip = 0; strip < strips; strip += 1) {
    const u = strip / strips;
    const nextU = (strip + 1) / strips;
    const z = wave(u);
    const nextZ = wave(nextU);
    const slope = (nextZ - z) / (width / strips);
    // Foreshorten each fold rather than stretching the entire flag sideways.
    const sliceWidth = (width / strips) / Math.sqrt(1 + slope * slope);
    const top = 10 + z + u * u * 1.5;
    const nextTop = 10 + nextZ + nextU * nextU * 1.5;
    const flutter = reducedMotion ? 0 : Math.sin(u * 8 - time * 3.2 + 0.5) * u * 0.025;
    const sliceHeight = height * (1 + flutter);
    context.save();
    context.transform(1, (nextTop - top) / sliceWidth, 0, sliceHeight / height, x, top);
    // A tiny overlap prevents seams between the deformed texture strips.
    context.drawImage(texture, u * texture.width, 0, texture.width / strips, texture.height,
      0, 0, sliceWidth + 0.3, height);
    const shade = Math.min(0.23, Math.abs(slope) * 0.25);
    context.fillStyle = slope > 0 ? `rgba(0,0,0,${shade})` : `rgba(255,255,255,${shade * 0.6})`;
    context.fillRect(0, 0, sliceWidth + 0.3, height);
    context.restore();
    x += sliceWidth;
  }
  context.restore();
}

export default function WavingFlag({ active }) {
  const canvasRef = useRef(null);
  const elapsedRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const texture = createFlagTexture();
    let frame;
    let previous;
    const started = performance.now();
    const animate = (now) => {
      if (previous !== undefined && !document.hidden) {
        elapsedRef.current += Math.min(now - previous, 40) / 1000;
      }
      previous = now;
      drawFlag(canvas, texture, elapsedRef.current, reducedMotion);
      // Keep waving during the fade out, then stop rendering while hidden.
      if (!reducedMotion && (active || now - started < 250)) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion]);

  return <canvas ref={canvasRef} className="hero-location__flag-cloth" width={280} height={168} aria-hidden="true" />;
}
