// ============================================================
// ВЕЙЛАН — КАРТА МИРА (вкладка "Карта")
// title.png на весь экран + кликабельные точки зон
// ============================================================

// Точки зон (координаты в % от размеров картинки)
// Пока пусто — заполним после калибровки через режим ловли
window.WORLD_MAP_POINTS = [
  { zoneId: 'camp',     name: 'Лагерь',        x: 82.3, y: 61.8 },
  { zoneId: 'forest',   name: 'Лес',           x: 77.8, y: 78.2 },
  { zoneId: 'mines',    name: 'Рудники',       x: 27.6, y: 81.5 },
  { zoneId: 'ruins',    name: 'Руины',         x: 38.6, y: 61.6 },
  { zoneId: 'temple',   name: 'Храм Мора',     x: 19.1, y: 53.4 },
  { zoneId: 'peaks',    name: 'Пики Хлада',    x: 37.1, y: 36.5 },
  { zoneId: 'forges',   name: 'Чёрная Гора',   x: 26.4, y: 25.1 },
  { zoneId: 'swamp',    name: 'Топи',          x: 41.3, y: 18.3 },
  { zoneId: 'bridge',   name: 'Мост Ветров',   x: 69.9, y: 19.9 },
  { zoneId: 'rift',     name: 'Разлом Бездны', x: 53.5, y: 32.5 },
  { zoneId: 'fortress', name: 'Крепость Тэрна',x: 69.6, y: 72.6 },
  { zoneId: 'heart',    name: 'Храм Душ',      x: 27.0, y: 71.6 }
];

function renderWorldMapTab(screen) {
  // Контейнер карты
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:relative;width:100%;height:100%;overflow:hidden;background:#000;' +
    'user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;' +
    '-webkit-tap-highlight-color:transparent;';
  wrap.addEventListener('contextmenu', function(e) { e.preventDefault(); });

  var img = document.createElement('img');
  img.src = 'sprites/backgrounds/title.png';
  img.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;' +
    'user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;' +
    'pointer-events:none;';
  img.draggable = false;
  img.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  wrap.appendChild(img);

  // Точки зон — невидимые кликабельные области поверх кристаллов
  window.WORLD_MAP_POINTS.forEach(function(p) {
    var dot = document.createElement('div');
    dot.style.cssText = 'position:absolute;left:' + p.x + '%;top:' + p.y + '%;' +
      'width:14%;height:14%;margin-left:-7%;margin-top:-7%;' +
      'cursor:pointer;';
    dot.onclick = function(e) {
      e.stopPropagation();
      showZoneLabel(p.name || p.zoneId);
    };
    wrap.appendChild(dot);
  });


  screen.appendChild(wrap);
}

// ============================================================
// РЕЖИМ КАЛИБРОВКИ
// Тапаешь по карте — в Toast появляются координаты в %
// Записываешь их и присылаешь мне
// ============================================================

function startCalibration(wrap, img) {
  if (window.Toast) Toast.info('Режим калибровки. Тапай по точкам зон. Координаты появятся внизу.');

  // Панель с логом
  var log = document.createElement('div');
  log.style.cssText = 'position:absolute;bottom:0;left:0;right:0;max-height:40%;' +
    'overflow-y:auto;background:rgba(0,0,0,0.9);color:#e8b84a;' +
    'font-family:monospace;font-size:11px;padding:8px;border-top:2px solid #e8b84a;';
  log.textContent = 'Координаты (тап по карте):\n';
  wrap.appendChild(log);

  var counter = 1;
  wrap.onclick = function(e) {
    // Игнорируем клики по кнопкам/логу
    if (e.target === log || log.contains(e.target)) return;
    if (e.target.tagName === 'BUTTON') return;

    var rect = img.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);

    log.textContent += counter + ': x=' + x + ', y=' + y + '\n';
    log.scrollTop = log.scrollHeight;
    counter++;
  };
}

// Показ названия зоны поверх карты
var _zoneLabelTimer = null;
function showZoneLabel(name) {
  var old = document.getElementById('zone-label-toast');
  if (old) old.remove();
  if (_zoneLabelTimer) clearTimeout(_zoneLabelTimer);

  var label = document.createElement('div');
  label.id = 'zone-label-toast';
  label.textContent = name;
  label.style.cssText = 'position:fixed;left:50%;bottom:22%;transform:translateX(-50%);' +
    'padding:8px 18px;background:rgba(3,5,8,0.92);' +
    'border:1px solid rgba(232,184,74,0.85);border-radius:4px;' +
    'color:#e8b84a;font-family:inherit;font-size:15px;font-weight:bold;' +
    'letter-spacing:0.5px;text-shadow:0 1px 3px #000;' +
    'box-shadow:0 0 10px rgba(232,184,74,0.4);' +
    'pointer-events:none;z-index:9999;white-space:nowrap;';
  document.body.appendChild(label);

  _zoneLabelTimer = setTimeout(function() {
    label.style.transition = 'opacity 0.4s';
    label.style.opacity = '0';
    setTimeout(function() { label.remove(); }, 400);
  }, 1500);
}

window.renderWorldMapTab = renderWorldMapTab;
console.log('[world-map-ui] модуль загружен');
