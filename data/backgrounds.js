// ============================================================
// ВЕЙЛАН — ФОНЫ ЛОКАЦИЙ
// zoneId -> путь к jpg
// ============================================================

const ZONE_BACKGROUNDS = {
  camp:      'sprites/backgrounds/camp.jpg',
  forest:    'sprites/backgrounds/forest.jpg',
  mines:     'sprites/backgrounds/mines.jpg',
  ruins:     'sprites/backgrounds/ruins.jpg',
  peaks:     'sprites/backgrounds/peaks.jpg',
  forges:    'sprites/backgrounds/forge.jpg',
  swamp:     'sprites/backgrounds/swamp.jpg',
  temple:    'sprites/backgrounds/temple.jpg',
  bridge:    'sprites/backgrounds/bridge.jpg',
  rift:      'sprites/backgrounds/rift.jpg',
  fortress:  'sprites/backgrounds/fortress.jpg',
  heart:     'sprites/backgrounds/heart.jpg'
};

function getZoneBackground(zoneId) {
  return ZONE_BACKGROUNDS[zoneId] || null;
}

window.Backgrounds = {
  ZONE_BACKGROUNDS: ZONE_BACKGROUNDS,
  getZoneBackground: getZoneBackground
};
