// ============================================================
// ВЕЙЛАН — ВСПЛЫВАЮЩИЕ УВЕДОМЛЕНИЯ (toast)
// ============================================================

const TOAST_MAX = 3;
const TOAST_DURATION = 2500;

let _toastContainer = null;

function _getContainer() {
  if (_toastContainer && document.body.contains(_toastContainer)) {
    return _toastContainer;
  }
  let el = document.getElementById('toasts');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toasts';
    document.body.appendChild(el);
  }
  _toastContainer = el;
  return el;
}

function _trim() {
  const c = _getContainer();
  while (c.children.length > TOAST_MAX) {
    c.removeChild(c.firstChild);
  }
}

// Показать toast
// type: 'info' | 'good' | 'bad' | 'levelup' | 'loot'
function showToast(text, type) {
  const container = _getContainer();
  const t = type || 'info';

  const el = document.createElement('div');
  el.className = 'toast toast-' + t;
  el.textContent = text;

  // Цвета по типу
  // Цвета как у вкладок меню: тёмно-синий + золото, белый текст
  el.style.cssText =
    'background: linear-gradient(180deg, rgba(30,36,48,0.45) 0%, rgba(14,18,24,0.45) 100%);' +
    'border: 1px solid rgba(232,184,74,0.50);' +
    'color: #e8e0c8;' +
    'padding: 5px 10px;' +
    'border-radius: 3px;' +
    'font-size: 11px;' +
    'text-align: center;' +
    'font-weight: bold;' +
    'letter-spacing: 0.3px;' +
    'text-shadow: 0 1px 1px #000;' +
    'box-shadow: 0 0 8px rgba(0,0,0,0.3);' +
    'animation: toastIn 0.25s;' +
    'pointer-events: none;' +
    'opacity: 1;' +
    'transition: opacity 0.3s;' +
    'max-width: 90%;';

  container.appendChild(el);
  _trim();

  // Убираем через 3 сек
  setTimeout(function() {
    el.style.opacity = '0';
    setTimeout(function() {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 350);
  }, TOAST_DURATION);
}

// Обёртки
function toastInfo(text)    { showToast(text, 'info'); }
function toastGood(text)    { showToast(text, 'good'); }
function toastBad(text)     { showToast(text, 'bad'); }
function toastLevelUp(text) { showToast(text, 'levelup'); }
function toastLoot(text)    { showToast(text, 'loot'); }

// Специальный toast «Уровень N!»
function toastLevel(level) {
  showToast('УРОВЕНЬ ' + level + '!', 'levelup');
}

window.Toast = {
  show: showToast,
  info: toastInfo,
  good: toastGood,
  bad: toastBad,
  levelup: toastLevelUp,
  loot: toastLoot,
  level: toastLevel
};
