function getCurrentLanguage() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') === 'en' ? 'en' : 'ka';
}

function applyEnglishText() {
  document.documentElement.lang = 'en';
  document.querySelectorAll('[data-en]').forEach((element) => {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = element.getAttribute('data-en');
      return;
    }
    element.textContent = element.getAttribute('data-en');
  });
}

function updateNavLinks(lang) {
  const navLinks = document.querySelectorAll('.site-nav a, .header-actions a:not(.language-toggle)');
  navLinks.forEach((link) => {
    const url = new URL(link.href, window.location.origin);
    if (lang === 'en') {
      url.searchParams.set('lang', 'en');
    } else {
      url.searchParams.delete('lang');
    }
    link.href = url.pathname + url.search;
  });
}

function setLanguageButtonState(lang) {
  document.querySelectorAll('.language-toggle').forEach((button) => {
    const code = button.textContent.trim();
    button.classList.toggle('button-primary', (lang === 'en' && code === 'EN') || (lang === 'ka' && code === 'GE'));
    button.classList.toggle('button-secondary', !((lang === 'en' && code === 'EN') || (lang === 'ka' && code === 'GE')));
  });
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.site-nav a').forEach((link) => {
    const linkPage = new URL(link.href, window.location.origin).pathname.split('/').pop() || 'index.html';
    const isCurrentPage = linkPage === currentPage;

    link.classList.toggle('active', isCurrentPage);
    if (isCurrentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = getCurrentLanguage();
  if (lang === 'en') {
    applyEnglishText();
  } else {
    document.documentElement.lang = 'ka';
  }
  updateNavLinks(lang);
  setLanguageButtonState(lang);
  setActiveNavLink();
});
