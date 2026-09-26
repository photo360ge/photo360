document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.getElementById('spin-viewer');
  if (!viewer) return;

  fetch('spinsample.spin')
    .then((res) => {
      if (!res.ok) throw new Error('Spin config not found');
      return res.json();
    })
    .then((config) => {
      const framesObj = config.layers && config.layers['1'];
      if (!framesObj) return;
      const keys = Object.keys(framesObj).sort((a, b) => Number(a) - Number(b));
      const frames = keys.map((k) => framesObj[k]);
      if (!frames.length) return;

      const img = viewer.querySelector('.spin-frame img');
      let index = 0;

      function show(i) {
        index = ((i % frames.length) + frames.length) % frames.length;
        img.src = frames[index];
      }

      // Preload a few frames
      frames.forEach((src) => { const p = new Image(); p.src = src; });

      const prev = viewer.querySelector('.spin-prev');
      const next = viewer.querySelector('.spin-next');
      prev.addEventListener('click', () => show(index - 1));
      next.addEventListener('click', () => show(index + 1));

      // Pointer drag to rotate
      let dragging = false;
      let startX = 0;
      let startIndex = 0;

      viewer.addEventListener('pointerdown', (e) => {
        dragging = true;
        startX = e.clientX;
        startIndex = index;
        viewer.setPointerCapture && viewer.setPointerCapture(e.pointerId);
      });

      viewer.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const delta = e.clientX - startX;
        // change sensitivity here
        const step = Math.floor(delta / 8);
        show(startIndex + step);
      });

      function stopDrag(e) {
        dragging = false;
        try { viewer.releasePointerCapture && viewer.releasePointerCapture(e.pointerId); } catch (err) {}
      }

      viewer.addEventListener('pointerup', stopDrag);
      viewer.addEventListener('pointercancel', stopDrag);
      viewer.addEventListener('pointerleave', stopDrag);

      // Initialize
      show(0);
    })
    .catch((err) => {
      console.warn('Spin viewer error:', err);
    });
});