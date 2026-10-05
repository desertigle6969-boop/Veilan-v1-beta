// СТАРТОВЫЕ КОМПЛЕКТЫ — worn-предметы (60% от t1)
const STARTING_WEAPON = {
  guardian:'worn_sword', stormblade:'worn_axe', shadowhunter:'worn_dagger',
  pyromancer:'worn_staff', cryomancer:'worn_staff', conduit:'worn_staff',
  windbard:'worn_lute', runesmith:'worn_hammer', spearman:'worn_spear',
  beastmaster:'worn_bow', soulforged:'worn_dagger', ironhorn:'worn_axe'
};
const STARTING_ARMOR = {
  guardian:'heavy', stormblade:'heavy',
  shadowhunter:{ human:'medium', soulless:'light' },
  pyromancer:{ human:'light', soulless:'light' },
  cryomancer:'light',
  conduit:{ human:'medium', minotaur:'medium' },
  windbard:'light',
  runesmith:{ orc:'heavy', minotaur:'medium' },
  spearman:'medium', beastmaster:'heavy', soulforged:'light',
  ironhorn:{ orc:'heavy', minotaur:'medium' }
};
const ARMOR_SETS = {
  light:  { helmet:'worn_light_helm', chest:'worn_light_chest', legs:'worn_light_legs' },
  medium: { helmet:'worn_med_helm',   chest:'worn_med_chest',   legs:'worn_med_legs'   },
  heavy:  { helmet:'worn_heavy_helm', chest:'worn_heavy_chest', legs:'worn_heavy_legs' }
};
const STARTING_CLOAK = 'worn_cloak';
