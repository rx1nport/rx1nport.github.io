document.addEventListener('DOMContentLoaded', () => {

const nav = document.getElementById('nav')
const small = document.getElementById('small')
const big = document.getElementById('big')
const aboutBig = document.getElementById('aboutBig')
const revealEls = document.querySelectorAll('.reveal')
const pageBlocks = document.querySelectorAll('.page-block')
const heroGrid = document.querySelector('.hero-grid')
const heroSlantA = document.querySelector('.hero-slant-a')
const heroSlantB = document.querySelector('.hero-slant-b')

const projectCards = document.querySelectorAll('.project-card')
const hoverPreview = document.getElementById('hoverPreview')
const hoverPreviewImage = document.getElementById('hoverPreviewImage')
const hoverPreviewCompany = document.getElementById('hoverPreviewCompany')
const hoverPreviewMeta = document.getElementById('hoverPreviewMeta')
const hoverPreviewTitle = document.getElementById('hoverPreviewTitle')
const hoverPreviewDesc = document.getElementById('hoverPreviewDesc')

const projectPopup = document.getElementById('projectPopup')
const projectPopupBackdrop = document.getElementById('projectPopupBackdrop')
const projectPopupClose = document.getElementById('projectPopupClose')
const projectPopupImage = document.getElementById('projectPopupImage')
const projectPopupCompany = document.getElementById('projectPopupCompany')
const projectPopupMeta = document.getElementById('projectPopupMeta')
const projectPopupTitle = document.getElementById('projectPopupTitle')
const projectPopupDesc = document.getElementById('projectPopupDesc')
const projectPopupThumbs = document.getElementById('projectPopupThumbs')

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40)
})

// ── Hero name: animate in once, never reverse ─────────────────
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    small?.classList.add('up')
    big?.classList.add('up')
  })
})

// ── Hero .reveal elements: fire once via unobserve ────────────
const heroRevealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('up')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

// ── Non-hero .reveal elements: normal reversible toggle ───────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('up', entry.isIntersecting)
  })
}, { threshold: 0.12 })

revealEls.forEach((el) => {
  if (el.closest('#hero')) {
    heroRevealObserver.observe(el)
  } else {
    revealObserver.observe(el)
  }
})

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('in-view', entry.isIntersecting)
  })
}, { threshold: 0.14 })

document.querySelectorAll('.scroll-fade, .scroll-rise, .scroll-scale')
  .forEach((el) => scrollObserver.observe(el))

const pageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('in-view', entry.isIntersecting)
  })
}, { threshold: 0.18 })

pageBlocks.forEach((block) => pageObserver.observe(block))

if (aboutBig) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      aboutBig.classList.toggle('up', e.isIntersecting)
    })
  }, { threshold: 0.25 })
  obs.observe(document.getElementById('about'))
}

function setHoverPreviewPosition(x, y) {
  const w = 320
  const h = 360
  const xPos = Math.min(x + 24, window.innerWidth - w - 16)
  const yPos = Math.min(y + 24, window.innerHeight - h - 16)
  hoverPreview.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`
}

function setProjectPreview(card) {
  const title = card.dataset.title || 'Project'
  const gallery = (card.dataset.gallery || card.dataset.thumb || '')
    .split('|').map(i => i.trim()).filter(Boolean)

  const img = gallery[0] || card.dataset.thumb || ''

  projectCards.forEach(el => el.classList.remove('active'))
  card.classList.add('active')

  hoverPreviewImage.src = img
  hoverPreviewTitle.textContent = title
  hoverPreviewCompany.textContent = card.dataset.company || ''
  hoverPreviewMeta.textContent = card.dataset.meta || ''
  hoverPreviewDesc.textContent = card.dataset.desc || ''
}

function openProjectPopup(card) {
  const gallery = (card.dataset.gallery || card.dataset.thumb || '')
    .split('|').map(i => i.trim()).filter(Boolean)

  const title = card.dataset.title || 'Project'

  projectPopupImage.src = gallery[0] || ''
  projectPopupTitle.textContent = title
  projectPopupCompany.textContent = card.dataset.company || ''
  projectPopupMeta.textContent = card.dataset.meta || ''
  projectPopupDesc.textContent = card.dataset.desc || ''

  projectPopupThumbs.innerHTML = ''

  if (gallery.length > 1) {
    gallery.forEach((img, i) => {
      const btn = document.createElement('button')
      btn.className = 'project-popup-thumb' + (i === 0 ? ' active' : '')
      btn.type = 'button'
      btn.innerHTML = `<img src="${img}" alt="Thumbnail ${i + 1}">`

      btn.onclick = () => {
        projectPopupImage.src = img
        projectPopupThumbs.querySelectorAll('.project-popup-thumb').forEach(t => t.classList.remove('active'))
        btn.classList.add('active')
      }

      projectPopupThumbs.appendChild(btn)
    })
    projectPopupThumbs.style.display = 'grid'
  } else {
    projectPopupThumbs.style.display = 'none'
  }

  projectPopup.classList.add('show')
  document.body.style.overflow = 'hidden'
}

function closeProjectPopup() {
  projectPopup.classList.remove('show')
  document.body.style.overflow = ''
}

projectCards.forEach(card => {
  card.addEventListener('mouseenter', e => {
    setProjectPreview(card)
    setHoverPreviewPosition(e.clientX, e.clientY)
    hoverPreview.classList.add('show')
  })

  card.addEventListener('mousemove', e => {
    setHoverPreviewPosition(e.clientX, e.clientY)
  })

  card.addEventListener('mouseleave', () => {
    hoverPreview.classList.remove('show')
  })

  card.addEventListener('click', () => {
    openProjectPopup(card)
  })
})

projectPopupBackdrop?.addEventListener('click', closeProjectPopup)
projectPopupClose?.addEventListener('click', closeProjectPopup)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectPopup()
})

let ticking = false

function updateParallax() {
  const y = window.scrollY

  if (heroGrid) {
    heroGrid.style.transform = `translate3d(0, ${y * 0.08}px, 0)`
  }

  if (heroSlantA) {
    heroSlantA.style.transform = `translate3d(0, ${y * 0.05}px, 0) rotate(-9deg)`
  }

  if (heroSlantB) {
    heroSlantB.style.transform = `translate3d(0, ${y * -0.03}px, 0) rotate(-7deg)`
  }

  ticking = false
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax)
    ticking = true
  }
}, { passive: true })

updateParallax()

})
