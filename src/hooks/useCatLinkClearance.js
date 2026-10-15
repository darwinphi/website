import { useLayoutEffect } from 'react';

// A cat can hang into the empty part of a wrapped line. Reserve line height
// only when that space actually contains following text.
export default function useCatLinkClearance(containerRef, text) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    let frame;
    let disposed = false;

    function measure() {
      for (const paragraph of container.querySelectorAll(':scope > p')) {
        const links = [...paragraph.querySelectorAll('.cat-underline-link')];
        if (links.length === 0) continue;

        for (const link of links) link.style.setProperty('--cat-clearance', '0px');

        const textNodes = [];
        const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.textContent.trim() && !node.parentElement.closest('[aria-hidden="true"]')) {
            textNodes.push(node);
          }
        }

        let bottomClearance = 0;
        for (const link of links) {
          const styles = getComputedStyle(link);
          const width = parseFloat(styles.getPropertyValue('--cat-width'));
          const height = parseFloat(styles.getPropertyValue('--cat-height'));
          const label = link.querySelector('.cat-underline-link__label');
          const labelBox = label.getBoundingClientRect();
          const center = labelBox.left + labelBox.width / 2;
          // Include the gray cat's rebound and both sprites' small side motions.
          const left = center - width / 2 - 6;
          const right = center + width / 2 + 6;
          const bottom = labelBox.bottom - parseFloat(styles.fontSize) * 0.1 + height + 8;
          bottomClearance = Math.max(bottomClearance, height + 10);

          let clearance = 0;
          for (const node of textNodes) {
            if (link.contains(node) || !(link.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING)) {
              continue;
            }
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) {
              if (rect.top >= labelBox.bottom - 1 && rect.top < bottom
                && rect.right > left && rect.left < right) {
                clearance = Math.max(clearance, bottom - rect.top);
              }
            }
          }

          // The normal line height already provides some room. Add only the
          // missing clearance rather than an entire extra cat-height gap.
          if (clearance > 0) link.style.setProperty('--cat-clearance', `${Math.ceil(clearance)}px`);
        }

        paragraph.style.setProperty('--hero-cat-bottom-clearance', `${bottomClearance}px`);
      }
    }

    function schedule() {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    // Image loads add the decorations without changing the surrounding copy.
    const mutations = new MutationObserver(schedule);
    mutations.observe(container, { childList: true, subtree: true });
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
    };
  }, [containerRef, text]);
}
