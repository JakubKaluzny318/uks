
const button = document.getElementById('mobile-menu-button')
const menu = document.getElementById('mobile-menu')
const overlay = document.getElementById('mobile-overlay')
const panel = document.getElementById('mobile-panel')

function openMenu() {
  menu.classList.remove('hidden')

  // blokada scrolla
  document.body.style.overflow = 'hidden'

  // fade in
  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0')
    overlay.classList.add('opacity-100')
    panel.classList.remove('opacity-0')
    panel.classList.add('opacity-100')
  })

  button.setAttribute('aria-expanded', 'true')
}

function closeMenu() {
  overlay.classList.remove('opacity-100')
  overlay.classList.add('opacity-0')
  panel.classList.remove('opacity-100')
  panel.classList.add('opacity-0')

  setTimeout(() => {
    menu.classList.add('hidden')
  }, 300)

  document.body.style.overflow = ''
  button.setAttribute('aria-expanded', 'false')
}

button.addEventListener('click', () => {
  if (menu.classList.contains('hidden')) {
    openMenu()
  } else {
    closeMenu()
  }
})

overlay.addEventListener('click', closeMenu)

// zamykanie po kliknięciu linku
panel.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu)
})

// ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu()
})
document.addEventListener('click', function (e) {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnButton = button.contains(e.target);

  if (!isClickInsideMenu && !isClickOnButton) {
    closeMenu();
  }
});

