document.addEventListener('DOMContentLoaded', () => {
  const small = document.getElementById('small');
  const big = document.getElementById('big');

  const revealEls = document.querySelectorAll('.reveal');
  const pageBlocks = document.querySelectorAll('.page-block');

  const heroGrid = document.querySelector('.hero-grid');
  const heroSlantA = document.querySelector('.hero-slant-a');
  const heroSlantB = document.querySelector('.hero-slant-b');

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      small?.classList.add('up');
      big?.classList.add('up');

      small?.classList.add('hero-done');
      big?.classList.add('hero-done');
    });
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
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

  const pageObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
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

  const hoverPreview =
    document.querySelector('.hover-preview');

  const hoverImage =
    document.querySelector('.hover-preview-image');

  const hoverTitle =
    document.querySelector('.hover-preview-title');

  const hoverDesc =
    document.querySelector('.hover-preview-desc');

  const hoverCompany =
    document.querySelector('#hoverPreviewCompany');

  const hoverMeta =
    document.querySelector('#hoverPreviewMeta');

  document.querySelectorAll('.project-card')
    .forEach(card => {

      card.addEventListener('mouseenter', () => {

        const image =
          card.dataset.thumb ||
          card.querySelector('img')?.src;

        const title =
          card.dataset.title || '';

        const description =
          card.dataset.desc || '';

        const company =
          card.dataset.company || '';

        const meta =
          card.dataset.meta || '';

        if (hoverImage && image) {
          hoverImage.src = image;
        }

        if (hoverTitle) {
          hoverTitle.textContent = title;
        }

        if (hoverDesc) {
          hoverDesc.textContent = description;
        }

        if (hoverCompany) {
          hoverCompany.textContent = company;
        }

        if (hoverMeta) {
          hoverMeta.textContent = meta;
        }

        hoverPreview?.classList.add('show');
        card.classList.add('active');
      });

      card.addEventListener('mouseleave', () => {
        hoverPreview?.classList.remove('show');
        card.classList.remove('active');
      });
    });

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

  const popup =
    document.querySelector('.project-popup');

  const popupImage =
    document.querySelector('.project-popup-image');

  const popupTitle =
    document.querySelector('.project-popup-title');

  const popupDesc =
    document.querySelector('.project-popup-desc');

  const popupCompany =
    document.querySelector('#projectPopupCompany');

  const popupMeta =
    document.querySelector('#projectPopupMeta');

  const popupThumbs =
    document.querySelector('#projectPopupThumbs');

  const popupClose =
    document.querySelector('.project-popup-close');

  document.querySelectorAll('.project-card')
    .forEach(card => {

      card.addEventListener('click', () => {

        const gallery =
          card.dataset.gallery
            ? card.dataset.gallery.split('|')
            : [];

        const image =
          gallery[0] ||
          card.dataset.thumb ||
          card.querySelector('img')?.src;

        const title =
          card.dataset.title || '';

        const description =
          card.dataset.desc || '';

        const company =
          card.dataset.company || '';

        const meta =
          card.dataset.meta || '';

        if (popupImage && image) {
          popupImage.src = image;
        }

        if (popupTitle) {
          popupTitle.textContent = title;
        }

        if (popupDesc) {
          popupDesc.textContent = description;
        }

        if (popupCompany) {
          popupCompany.textContent = company;
        }

        if (popupMeta) {
          popupMeta.textContent = meta;
        }

        if (popupThumbs) {

          popupThumbs.innerHTML = '';

          gallery.forEach((src, index) => {

            const thumb =
              document.createElement('button');

            thumb.type = 'button';
            thumb.className =
              'project-popup-thumb';

            if (index === 0) {
              thumb.classList.add('active');
            }

            const img =
              document.createElement('img');

            img.src = src;
            img.alt = `${title} screenshot ${index + 1}`;

            thumb.appendChild(img);
            popupThumbs.appendChild(thumb);

            thumb.addEventListener('click', () => {

              if (popupImage) {
                popupImage.src = src;
              }

              document
                .querySelectorAll('.project-popup-thumb')
                .forEach(item => {
                  item.classList.remove('active');
                });

              thumb.classList.add('active');
            });

          });
        }

        popup?.classList.add('show');

        document.body.style.overflow = 'hidden';
      });
    });

  popupClose?.addEventListener('click', () => {

    popup?.classList.remove('show');

    document.body.style.overflow = '';
  });

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

  document.addEventListener('keydown', e => {

    if (e.key === 'Escape') {

      popup?.classList.remove('show');

      document.body.style.overflow = '';
    }
  });
});
