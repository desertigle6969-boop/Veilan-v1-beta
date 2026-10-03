// ============================================================
// ВЕЙЛАН — ФОНЫ ГОРОДОВ
// Каждая зона имеет свой фон города (вид сверху)
// ============================================================

const CITY_BG = {
  camp:     'sprites/cities/camp.png',
  forest:   'sprites/cities/forest.png',
  mines:    'sprites/cities/mines.png',
  ruins:    'sprites/cities/ruins.png',
  temple:   'sprites/cities/temple.png',
  peaks:    'sprites/cities/peaks.png',
  forges:   'sprites/cities/forges.png',
  swamp:    'sprites/cities/swamp.png',
  bridge:   'sprites/cities/bridge.png',
  rift:     'sprites/cities/rift.png',
  fortress: 'sprites/cities/fortress.png',
  heart:    'sprites/cities/heart.png'
};

function getCityBg(zoneId, settlementId) {
  // 1. Если подзона (не главное поселение) — ищем свой фон
  if (settlementId && settlementId !== zoneId + '_settlement') {
    return 'sprites/cities/' + settlementId + '.png';
  }
  // 2. Главное поселение — фон зоны или общий
  return CITY_BG[zoneId] || 'sprites/cities/_default.png';
}

window.CityBg = {
  CITY_BG: CITY_BG,
  getCityBg: getCityBg
};

console.log('[city_backgrounds] загружено: ' + Object.keys(CITY_BG).length + ' фонов');
