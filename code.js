document.addEventListener('DOMContentLoaded', () => {
  const small = document.getElementById('small');
  const big = document.getElementById('big');

  const revealEls = document.querySelectorAll('.reveal');
  const pageBlocks = document.querySelectorAll('.page-block');

  const heroGrid = document.querySelector('.hero-grid');
  const heroSlantA = document.querySelector('.hero-slant-a');
  const heroSlantB = document.querySelector('.hero-slant-b');

  /* ─────────────────────────────────────────
     HERO TITLE — PLAY ONCE
  ───────────────────────────────────────── */

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      small?.classList.add('up');
      big?.classList.add('up');

      /*
        Mark them as permanently animated.
        Other observers will ignore them.
      */
      small?.classList.add('hero-done');
      big?.classList.add('hero-done');
    });
  });


  /* ─────────────────────────────────────────
     REVEAL ANIMATIONS
  ───────────────────────────────────────── */

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        /* NEVER touch anything inside the hero */
        if (entry.target.closest('#hero')) {
          return;
        }

        entry.target.classList.toggle(
          'up',
          entry.isIntersecting
        );
      });
    },
    {
      threshold: 0.12
    }
  );


  revealEls.forEach(el => {
    if (!el.closest('#hero')) {
      revealObserver.observe(el);
    }
  });


  /* ─────────────────────────────────────────
     SCROLL ANIMATIONS
  ───────────────────────────────────────── */

  const scrollObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        if (entry.target.closest('#hero')) {
          return;
        }

        entry.target.classList.toggle(
          'in-view',
          entry.isIntersecting
        );
      });
    },
    {
      threshold: 0.14
    }
  );


  document
    .querySelectorAll(
      '.scroll-fade, .scroll-rise, .scroll-scale'
    )
    .forEach(el => {

      if (!el.closest('#hero')) {
        scrollObserver.observe(el);
      }

    });


  /* ─────────────────────────────────────────
     PAGE BLOCKS
  ───────────────────────────────────────── */

  const pageObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        /* NEVER animate the hero */
        if (entry.target.id === 'hero') {
          return;
        }

        entry.target.classList.toggle(
          'in-view',
          entry.isIntersecting
        );
      });
    },
    {
      threshold: 0.18
    }
  );


  pageBlocks.forEach(block => {

    if (block.id !== 'hero') {
      pageObserver.observe(block);
    }

  });


  /* ─────────────────────────────────────────
     HERO PARALLAX
  ───────────────────────────────────────── */

  let ticking = false;

  window.addEventListener('scroll', () => {

    if (!ticking) {

      window.requestAnimationFrame(() => {

        const y = window.scrollY;

        if (heroGrid) {
          heroGrid.style.transform =
            `translate3d(0, ${y * 0.08}px, 0)`;
        }

        if (heroSlantA) {
          heroSlantA.style.transform =
            `translate3d(0, ${y * 0.035}px, 0) rotate(-9deg)`;
        }

        if (heroSlantB) {
          heroSlantB.style.transform =
            `translate3d(0, ${y * -0.025}px, 0) rotate(-7deg)`;
        }

        ticking = false;
      });

      ticking = true;
    }

  });


  /* ─────────────────────────────────────────
     PROJECT HOVER PREVIEW
  ───────────────────────────────────────── */

  const hoverPreview =
    document.querySelector('.hover-preview');

  const hoverImage =
    document.querySelector('.hover-preview-image');

  const hoverTitle =
    document.querySelector('.hover-preview-title');

  const hoverDesc =
    document.querySelector('.hover-preview-desc');

  const hoverTop =
    document.querySelector('.hover-preview-top');


  document.querySelectorAll('.experience-item')
    .forEach(item => {

      item.addEventListener('mouseenter', () => {

        const image = item.dataset.image;
        const title = item.dataset.title;
        const description = item.dataset.description;
        const type = item.dataset.type;
        const date = item.dataset.date;

        if (hoverImage && image) {
          hoverImage.src = image;
        }

        if (hoverTitle && title) {
          hoverTitle.textContent = title;
        }

        if (hoverDesc && description) {
          hoverDesc.textContent = description;
        }

        if (hoverTop) {
          const typeEl =
            hoverTop.querySelector('.preview-type');

          const dateEl =
            hoverTop.querySelector('.preview-date');

          if (typeEl) {
            typeEl.textContent = type || '';
          }

          if (dateEl) {
            dateEl.textContent = date || '';
          }
        }

        hoverPreview?.classList.add('show');
        item.classList.add('active');
      });


      item.addEventListener('mouseleave', () => {

        hoverPreview?.classList.remove('show');
        item.classList.remove('active');

      });

    });


  /* Move preview with mouse */

  document.addEventListener('mousemove', e => {

    if (!hoverPreview?.classList.contains('show')) {
      return;
    }

    const offset = 18;

    let x = e.clientX + offset;
    let y = e.clientY + offset;

    const rect =
      hoverPreview.getBoundingClientRect();

    if (x + rect.width > window.innerWidth) {
      x = e.clientX - rect.width - offset;
    }

    if (y + rect.height > window.innerHeight) {
      y = e.clientY - rect.height - offset;
    }

    hoverPreview.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;

  });


  /* ─────────────────────────────────────────
     PROJECT POPUP
  ───────────────────────────────────────── */

  const popup =
    document.querySelector('.project-popup');

  const popupImage =
    document.querySelector('.project-popup-image');

  const popupTitle =
    document.querySelector('.project-popup-title');

  const popupDesc =
    document.querySelector('.project-popup-desc');

  const popupTop =
    document.querySelector('.project-popup-top');

  const popupClose =
    document.querySelector('.project-popup-close');


  document.querySelectorAll('.project-card')
    .forEach(card => {

      card.addEventListener('click', () => {

        const image = card.dataset.image;
        const title = card.dataset.title;
        const description = card.dataset.description;
        const type = card.dataset.type;
        const date = card.dataset.date;

        if (popupImage && image) {
          popupImage.src = image;
        }

        if (popupTitle && title) {
          popupTitle.textContent = title;
        }

        if (popupDesc && description) {
          popupDesc.textContent = description;
        }

        if (popupTop) {

          const typeEl =
            popupTop.querySelector('.popup-type');

          const dateEl =
            popupTop.querySelector('.popup-date');

          if (typeEl) {
            typeEl.textContent = type || '';
          }

          if (dateEl) {
            dateEl.textContent = date || '';
          }

        }

        popup?.classList.add('show');

        document.body.style.overflow = 'hidden';

      });

    });


  /* Close popup */

  popupClose?.addEventListener('click', () => {

    popup?.classList.remove('show');

    document.body.style.overflow = '';

  });


  /* Click outside modal */

  popup?.addEventListener('click', e => {

    if (
      e.target.classList.contains(
        'project-popup-backdrop'
      )
    ) {

      popup.classList.remove('show');

      document.body.style.overflow = '';

    }

  });


  /* Escape key */

  document.addEventListener('keydown', e => {

    if (e.key === 'Escape') {

      popup?.classList.remove('show');

      document.body.style.overflow = '';

    }

  });

});
