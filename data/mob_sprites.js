// ============================================================
// ВЕЙЛАН — КАРТА СПРАЙТОВ МОБОВ
// Формат: mobId -> { folder: 'xxx', num: N }
// path = 'sprites/units/xxx/xxx_NNN.png'
// Если mobId не в карте — рендерится текстовая плашка
// ============================================================

const MOB_SPRITE_MAP = {

  // ========== ЗОНА 1: ЛАГЕРЬ ==========
  rat_grey:         { folder: 'custom_mobs', num: 0, custom: true },
  olden_servant:  { folder: 'custom_mobs', num: 0, custom: true },
  tetor_demon:    { folder: 'custom_mobs', num: 0, custom: true },
  rat_big:          { folder: 'custom_mobs', num: 0, custom: true },
  dog_wild:         { folder: 'custom_mobs', num: 0, custom: true },
  bandit_grunt:     { folder: 'custom_mobs', num: 0, custom: true },
  bandit_thug:      { folder: 'custom_mobs', num: 0, custom: true },
  drunk_merc:       { folder: 'custom_mobs', num: 0, custom: true },
  shaman_outcast:   { folder: 'custom_mobs', num: 0, custom: true },
  camp_dog:         { folder: 'custom_mobs', num: 0, custom: true },
  bandit_leader:    { folder: 'custom_mobs', num: 0, custom: true },

  // ========== ЗОНА 2: ЛЕС ==========
  wolf_grey:        { folder: 'custom_mobs', num: 0, custom: true },
  spider_weaver:    { folder: 'nature_new', num: 1 },  boar_forest:      { folder: 'wolves_bandits_rats', num: 4 },
  treant_rotten:    { folder: 'nature_new', num: 4 },
  fly_vampire:      { folder: 'elements_new', num: 21 },
  wolf_dire:        { folder: 'wolves_bandits_rats', num: 8 },
  cursed_priest:    { folder: 'npc_uniques', num: 11 },
  skeleton_guard:   { folder: 'skeletons_base', num: 5 },
  treant_fallen:    { folder: 'bosses', num: 2 },

  // ========== ЗОНА 3: РУДНИКИ ==========
  goblin_miner:     { folder: 'custom_mobs', num: 0, custom: true },
  bat_cave:         { folder: 'custom_mobs', num: 0, custom: true },
  miner_mad:        { folder: 'custom_mobs', num: 0, custom: true },
  golem_stone:      { folder: 'custom_mobs', num: 0, custom: true },
  spider_venom:     { folder: 'custom_mobs', num: 0, custom: true },
  dwarf_greed:      { folder: 'npc_uniques', num: 7 },
  golem_iron:       { folder: 'custom_mobs', num: 0, custom: true },
  slave_escaped:    { folder: 'custom_mobs', num: 0, custom: true },
  golem_ancient:    { folder: 'bosses', num: 3 },

  // ========== ЗОНА 4: РУИНЫ ==========
  skeleton_warrior: { folder: 'custom_mobs', num: 0, custom: true },
  ghost_civilian:   { folder: 'nature_new', num: 2 },
  gargoyle:         { folder: 'custom_mobs', num: 0, custom: true },
  knight_fallen:    { folder: 'skeletons_base', num: 23 },
  hound_spectral:   { folder: 'wolves_bandits_rats', num: 14 },
  mage_ghost:       { folder: 'skeletons_base', num: 17 },
  knight_captain:   { folder: 'skeletons_elite', num: 4 },
  wraith:           { folder: 'skeletons_elite', num: 6 },
  king_olden:       { folder: 'skeletons_elite', num: 11 },

  // ========== ТАЙНОЕ РЕМЕСЛО (редкие мобы) ==========
  rat_matriarch:    { folder: 'custom_mobs', num: 0, custom: true },
  treant_renegade:  { folder: 'custom_mobs', num: 0, custom: true },
  blind_smith:      { folder: 'custom_mobs', num: 0, custom: true },
  weeper:           { folder: 'custom_mobs', num: 0, custom: true },

  // ========== ЗОНА 5: ХРАМ ==========
  fishman_warrior:  { folder: 'custom_mobs', num: 0, custom: true },
  crab_giant:       { folder: 'marine_new', num: 7 },
  drowned_sailor:   { folder: 'skeletons_base', num: 22 },
  eel_electric:     { folder: 'custom_mobs', num: 0, custom: true },
  jelly_poison:     { folder: 'custom_mobs', num: 0, custom: true },
  priest_corrupt:   { folder: 'npc_uniques', num: 22 },
  priestess_deep:   { folder: 'npc_uniques', num: 23 },
  guardian_coral:   { folder: 'custom_mobs', num: 0, custom: true },
  leviathan_young:  { folder: 'bosses', num: 5 },

  // ========== ЗОНА 6: ПИКИ ==========
  wolf_ice:         { folder: 'wolves_bandits_rats', num: 14 },
  yeti:             { folder: 'marine_new', num: 4 },
  hunter_frost:     { folder: 'npc_uniques', num: 24 },
  golem_ice:        { folder: 'custom_mobs', num: 0, custom: true },
  ghost_frozen:     { folder: 'skeletons_base', num: 24 },
  spider_frost:     { folder: 'custom_mobs', num: 0, custom: true },
  giant_frost:      { folder: 'marine_new', num: 3 },
  priest_ice:       { folder: 'npc_uniques', num: 25 },
  wyrm_frost:       { folder: 'bosses', num: 7 },

  // ========== ЗОНА 7: КУЗНИ ==========
  smith_mad:        { folder: 'npc_uniques', num: 17 },
  golem_magma:      { folder: 'custom_mobs', num: 0, custom: true },
  dog_hell:         { folder: 'wolves_bandits_rats', num: 12 },
  construct_iron:   { folder: 'custom_mobs', num: 0, custom: true },
  elemental_fire:   { folder: 'custom_mobs', num: 0, custom: true },
  traitor_grann:    { folder: 'npc_uniques', num: 19 },
  master_smith:     { folder: 'npc_uniques', num: 28 },
  guard_rune:       { folder: 'npc_uniques', num: 29 },
  forge_titan:      { folder: 'bosses', num: 9 },

  // ========== ЗОНА 8: ТОПИ ==========
  slug_giant:       { folder: 'custom_mobs', num: 0, custom: true },
  toad_venom:       { folder: 'custom_mobs', num: 0, custom: true },
  cultist_mora:     { folder: 'npc_uniques', num: 30 },
  zombie_swamp:     { folder: 'skeletons_base', num: 25 },
  witch_swamp:      { folder: 'npc_uniques', num: 31 },
  lizard_warrior:   { folder: 'npc_uniques', num: 32 },
  broodmother:      { folder: 'custom_mobs', num: 0, custom: true },
  spawn_mora:       { folder: 'custom_mobs', num: 0, custom: true },
  mora_avatar:      { folder: 'bosses', num: 15 },

  // ========== ЗОНА 9: МОСТ ==========
  elemental_air:    { folder: 'nature_new', num: 8 },
  griffon_wild:     { folder: 'custom_mobs', num: 0, custom: true },
  storm_archer:     { folder: 'npc_uniques', num: 18 },
  elemental_lightning: { folder: 'custom_mobs', num: 0, custom: true },
  wyvern:           { folder: 'custom_mobs', num: 0, custom: true },
  guardian_air:     { folder: 'marine_new', num: 2 },
  titan_storm:      { folder: 'marine_new', num: 1 },
  elemental_air_elite: { folder: 'custom_mobs', num: 0, custom: true },
  storm_lord:       { folder: 'bosses', num: 16 },

  // ========== ЗОНА 10: РАЗЛОМ ==========
  abyss_crawler:    { folder: 'custom_mobs', num: 0, custom: true },
  void_wraith:      { folder: 'skeletons_base', num: 21 },
  rift_guard:       { folder: 'skeletons_base', num: 27 },
  thing_unnamed:    { folder: 'custom_mobs', num: 0, custom: true },
  void_knight:      { folder: 'skeletons_base', num: 28 },
  shard_colossus:   { folder: 'custom_mobs', num: 0, custom: true },
  devourer_lesser:  { folder: 'custom_mobs', num: 0, custom: true },
  void_priest:      { folder: 'npc_uniques', num: 12 },
  devourer:         { folder: 'bosses', num: 10 },

  // ========== ЗОНА 11: КРЕПОСТЬ ==========
  automaton_guard:  { folder: 'custom_mobs', num: 0, custom: true },
  rune_knight:      { folder: 'npc_uniques', num: 17 },
  trap_mage:        { folder: 'npc_uniques', num: 33 },
  iron_sentinel:    { folder: 'custom_mobs', num: 0, custom: true },
  chaos_knight:     { folder: 'npc_uniques', num: 26 },
  titan_guard:      { folder: 'custom_mobs', num: 0, custom: true },
  avatar_turn:      { folder: 'bosses', num: 11 },
  rune_priest:      { folder: 'npc_uniques', num: 27 },
  turn_avatar:      { folder: 'bosses', num: 12 },

  // ========== ЗОНА 12: СЕРДЦЕ ==========
  light_guardian:   { folder: 'npc_uniques', num: 1 },
  dark_guardian:    { folder: 'npc_uniques', num: 2 },
  guardian_balance: { folder: 'npc_uniques', num: 4 },
  echo_olden:       { folder: 'skeletons_elite', num: 12 },
  echo_leviathan:   { folder: 'bosses', num: 15 },
  echo_titan:       { folder: 'bosses', num: 9 },
  herald_light:     { folder: 'npc_uniques', num: 5 },
  herald_dark:      { folder: 'npc_uniques', num: 6 },
  turn_true:        { folder: 'bosses', num: 16 }
};

// Получить путь спрайта для моба
function getMobSpritePath(mobId) {
  const entry = MOB_SPRITE_MAP[mobId];
  if (!entry || !entry.folder) return null;

  // Кастомный спрайт — файл называется по mobId
  if (entry.custom) {
    return 'sprites/units/' + entry.folder + '/' + mobId + '.png';
  }

  // Обычный — folder/ПРЕФИКС_NNN.png
  if (!entry.num) return null;
  const folder = entry.folder;
  const numStr = String(entry.num).padStart(3, '0');
  
  // Определяем префикс по папке
  let prefix = folder;
  if (folder === 'nature_new')   prefix = 'nature';
  else if (folder === 'marine_new')   prefix = 'marine';
  else if (folder === 'elements_new') prefix = 'element';
  else if (folder === 'rats_new')     prefix = 'rat';
  
  return 'sprites/units/' + folder + '/' + prefix + '_' + numStr + '.png';
}

window.MobSprites = {
  MOB_SPRITE_MAP,
  getMobSpritePath
};
