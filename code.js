const nav = document.getElementById('nav')
const small = document.getElementById('small')
const big = document.getElementById('big')
const aboutBig = document.getElementById('aboutBig')
const revealEls = document.querySelectorAll('.reveal')
const pageBlocks = document.querySelectorAll('.page-block')
const hero = document.getElementById('hero')
const about = document.getElementById('about')
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

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    small.classList.add('up')
    big.classList.add('up')
  })
})

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('up')
    } else {
      entry.target.classList.remove('up')
    }
  })
}, { threshold: 0.12 })

revealEls.forEach((el) => revealObserver.observe(el))

const scrollAnimations = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view')
    } else {
      entry.target.classList.remove('in-view')
    }
  })
}, { threshold: 0.14 })

document.querySelectorAll('.scroll-fade, .scroll-rise, .scroll-scale').forEach((el) => {
  scrollAnimations.observe(el)
})

const pageBlockObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view')
    } else {
      entry.target.classList.remove('in-view')
    }
  })
}, { threshold: 0.18 })

pageBlocks.forEach((block) => pageBlockObserver.observe(block))

const aboutHeadingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      aboutBig.classList.add('up')
    } else {
      aboutBig.classList.remove('up')
    }
  })
}, { threshold: 0.25 })

aboutHeadingObserver.observe(document.getElementById('about'))

function setHoverPreviewPosition(x, y) {
  const offsetX = 24
  const offsetY = 24
  const width = 320
  const height = 360
  const maxX = window.innerWidth - width - 16
  const maxY = window.innerHeight - height - 16
  const nextX = Math.min(x + offsetX, Math.max(16, maxX))
  const nextY = Math.min(y + offsetY, Math.max(16, maxY))
  hoverPreview.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`
}

function setProjectPreview(card) {
  const title = card.dataset.title || 'Project'
  const gallery = (card.dataset.gallery || card.dataset.thumb || '')
    .split('|')
    .map((img) => img.trim())
    .filter(Boolean)

  const firstImage = gallery[0] || card.dataset.thumb || ''

  projectCards.forEach((el) => el.classList.remove('active'))
  card.classList.add('active')

  hoverPreviewImage.src = firstImage
  hoverPreviewImage.alt = `${title} preview`
  hoverPreviewTitle.textContent = title
  hoverPreviewCompany.textContent = card.dataset.company || ''
  hoverPreviewMeta.textContent = card.dataset.meta || ''
  hoverPreviewDesc.textContent = card.dataset.desc || ''
}

function openProjectPopup(card) {
  const title = card.dataset.title || 'Project'
  const gallery = (card.dataset.gallery || card.dataset.thumb || '')
    .split('|')
    .map((img) => img.trim())
    .filter(Boolean)

  const firstImage = gallery[0] || card.dataset.thumb || ''

  projectPopupImage.src = firstImage
  projectPopupImage.alt = `${title} preview`
  projectPopupTitle.textContent = title
  projectPopupCompany.textContent = card.dataset.company || ''
  projectPopupMeta.textContent = card.dataset.meta || ''
  projectPopupDesc.textContent = card.dataset.desc || ''
  projectPopupThumbs.innerHTML = ''

  gallery.forEach((image, index) => {
    const button = document.createElement('button')
    button.className = `project-popup-thumb${index === 0 ? ' active' : ''}`
    button.type = 'button'
    button.innerHTML = `<img src="${image}" alt="${title} thumb ${index + 1}">`

    button.addEventListener('click', () => {
      projectPopupImage.src = image
      projectPopupImage.alt = `${title} preview`
      projectPopupThumbs.querySelectorAll('.project-popup-thumb').forEach((thumb, thumbIndex) => {
        thumb.classList.toggle('active', thumbIndex === index)
      })
    })

    projectPopupThumbs.appendChild(button)
  })

  projectPopup.classList.add('show')
  projectPopup.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
}

function closeProjectPopup() {
  projectPopup.classList.remove('show')
  projectPopup.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
}

projectCards.forEach((card) => {
  card.addEventListener('mouseenter', (event) => {
    setProjectPreview(card)
    setHoverPreviewPosition(event.clientX, event.clientY)
    hoverPreview.classList.add('show')
    hoverPreview.setAttribute('aria-hidden', 'false')
  })

  card.addEventListener('mousemove', (event) => {
    setHoverPreviewPosition(event.clientX, event.clientY)
  })

  card.addEventListener('mouseleave', () => {
    hoverPreview.classList.remove('show')
    hoverPreview.setAttribute('aria-hidden', 'true')
  })

  card.addEventListener('focus', () => {
    setProjectPreview(card)
    hoverPreview.classList.add('show')
    hoverPreview.setAttribute('aria-hidden', 'false')
    setHoverPreviewPosition(window.innerWidth * 0.5, window.innerHeight * 0.35)
  })

  card.addEventListener('blur', () => {
    hoverPreview.classList.remove('show')
    hoverPreview.setAttribute('aria-hidden', 'true')
  })

  card.addEventListener('click', () => {
    openProjectPopup(card)
  })
})

projectPopupBackdrop.addEventListener('click', closeProjectPopup)
projectPopupClose.addEventListener('click', closeProjectPopup)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeProjectPopup()
})

let parallaxTicking = false

function updateParallax() {
  const scrollY = window.scrollY

  if (hero) {
    hero.style.transform = `translateY(${Math.min(scrollY * 0.06, 32)}px)`
  }

  if (heroGrid) {
    heroGrid.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`
  }

  if (heroSlantA) {
    heroSlantA.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0) rotate(-9deg)`
  }

  if (heroSlantB) {
    heroSlantB.style.transform = `translate3d(0, ${scrollY * -0.05}px, 0) rotate(-7deg)`
  }

  if (about) {
    const aboutTop = about.offsetTop
    const relative = Math.max(0, scrollY - aboutTop + window.innerHeight * 0.7)
    about.style.transform = `translateY(${Math.max(0, 36 - relative * 0.05)}px)`
  }

  parallaxTicking = false
}

window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    requestAnimationFrame(updateParallax)
    parallaxTicking = true
  }
}, { passive: true })

updateParallax()
