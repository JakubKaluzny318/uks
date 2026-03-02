const PROJECT_ID = 'cusodt8u'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

let allNews = []

const QUERY = `
*[_type == "news" && isVisible == true]
| order(_createdAt desc){
  _id,
  title,
  category,
  _createdAt,
  excerpt,
  content,
  "imageUrl": image.asset->url
}
`

const homeGrid = document.getElementById('home-news-grid')
const newsGrid = document.getElementById('news-grid')

const modal = document.getElementById('news-modal')
const modalContent = document.getElementById('news-modal-content')
const modalClose = document.getElementById('news-modal-close')


// ================= FETCH =================

fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(
    QUERY
  )}`
)
  .then(res => res.json())
  .then(({ result }) => {
    if (!result || !result.length) return

    allNews = result

    // STRONA GŁÓWNA
    if (homeGrid) {
      renderHome(allNews.slice(0, 3))
    }

    // STRONA AKTUALNOŚCI
    if (newsGrid) {
      renderNews(allNews)
      initFilters()
    }
  })
  .catch(err => console.error(err))


// ================= HOME =================

function renderHome(items) {
  homeGrid.innerHTML = ''

  items.forEach(item => {
    const card = createCard(item, false)
    card.addEventListener('click', () => {
      window.location.href = 'aktualnosci.html'
    })
    homeGrid.appendChild(card)
  })
}


// ================= AKTUALNOŚCI =================

function renderNews(items) {
  newsGrid.innerHTML = ''

  items.forEach(item => {
    const card = createCard(item, true)
    newsGrid.appendChild(card)
  })
}


// ================= FILTRY =================

function initFilters() {
  const buttons = document.querySelectorAll('[data-category]')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category

      // aktywna klasa
      buttons.forEach(b => b.classList.remove('active'))
      button.classList.add('active')

      if (category === 'all') {
        renderNews(allNews)
        return
      }

      const filtered = allNews.filter(
        item => item.category === category
      )

      renderNews(filtered)
    })
  })
}


// ================= CARD =================

function createCard(item, useModal) {
  const article = document.createElement('article')
  article.className = `
    bg-white dark:bg-slate-800 rounded-2xl overflow-hidden
    shadow-xl shadow-slate-200/50 dark:shadow-none
    flex flex-col h-full border border-slate-100 dark:border-slate-700
    cursor-pointer
  `

  article.innerHTML = `
    <div class="relative overflow-hidden">
      <img
        src="${item.imageUrl || ''}"
        alt="${item.title}"
        class="w-full h-56 object-cover"
        loading="lazy"
      />
    </div>

    <div class="p-6 flex flex-col flex-grow space-y-4">
      <div class="space-y-2">
        <h3 class="text-xl font-bold">${item.title}</h3>
        <p class="text-sm opacity-70">
          ${formatDate(item._createdAt)}
        </p>
      </div>

      <div class="text-sm opacity-80 flex-grow">
        ${portableToHTML(item.excerpt)}
      </div>
    </div>
  `

  if (useModal) {
    article.addEventListener('click', () => openModal(item))
  }

  return article
}


// ================= MODAL =================

function openModal(item) {
  if (!modal) return

  modalContent.innerHTML = `
    <h2 class="text-3xl font-bold mb-2">${item.title}</h2>
    <p class="text-sm opacity-60 mb-6">${formatDate(item._createdAt)}</p>

    <div class="prose dark:prose-invert max-w-none">
      ${portableToHTML(item.content || item.excerpt)}
    </div>
  `

  modal.classList.remove('hidden')
  modal.classList.add('flex')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  if (!modal) return

  modal.classList.add('hidden')
  modal.classList.remove('flex')
  document.body.style.overflow = ''
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal)
}

if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal()
  })
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal()
})


// ================= UTILS =================

function formatDate(date) {
  return new Date(date).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function portableToHTML(blocks = []) {
  return blocks
    .map(block => {
      if (block._type !== 'block') return ''
      return `<p>${block.children.map(c => c.text).join('')}</p>`
    })
    .join('')
}
