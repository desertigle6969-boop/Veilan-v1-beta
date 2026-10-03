// ============================================================
// ВЕЙЛАН — ПОСЕЛЕНИЯ (отдельно от боевых подлокаций)
// Каждое поселение привязано к зоне
// ============================================================

const SETTLEMENTS = {

  // ========== ЛАГЕРЬ СЕРЫХ ХОЛМОВ (camp) ==========
  camp_settlement: {
    id: 'camp_settlement',
    type: 'main',
    level: 5,
    zoneId: 'camp',
    name: 'Лагерь Серых Холмов',
    subtitle: 'Северо-запад Империи Валдорн',
    lore: 'Здесь стоял последний гарнизон Валдорна в этой части мира. Триста лет назад его жители отступили, оставив костры, палатки и тела. С тех пор лагерь переходил из рук в руки — мародёры, беглые рабы, одинокие изгнанники. Никто не задерживался надолго.',
    npcs: ['hrod', 'gunnar', 'ingvar', 'refugee_child', 'elder_valdorn'],
    buildings: ['blacksmith', 'merchant', 'tavern', 'board']
  },

  // ========== ЛАГЕРЬ: МАЛЫЕ СТОЯНКИ ==========
  camp_watchtower: {
    id: 'camp_watchtower',
    type: 'small',
    zoneId: 'camp',
    level: 2,
    name: 'Дозорная вышка «Ястреб»',
    subtitle: 'Восточный рубеж Лагеря',
    lore: 'Деревянная вышка на краю Лагеря. С неё видно весь лагерь и тропу на восток. Здесь всегда кто-то дежурит — с самого Раскола.',
    npcs: ['camp_watchman'],
    buildings: []
  },

  camp_hermit_fire: {
    id: 'camp_hermit_fire',
    type: 'small',
    zoneId: 'camp',
    level: 4,
    name: 'Костровище Отшельника',
    subtitle: 'Западный край, у старого костра',
    lore: 'Скáльд живёт здесь тридцать лет. Говорит, что видел, как падала Завеса. Никто не верит — но все приходят послушать.',
    npcs: ['camp_hermit'],
    buildings: []
  },

  // ========== ДЕРЕВНЯ ТИХИХ ВЕТВЕЙ (forest) ==========
  forest_village: {
    id: 'forest_village',
    type: 'main',
    level: 10,
    zoneId: 'forest',
    name: 'Деревня Тихих Ветвей',
    subtitle: 'Дом Аэлвин в северных лесах',
    lore: 'Деревня, построенная на ветвях трёх столетних дубов. Аэлвин живут здесь с самого Раскола. Никто из них не помнит, как выглядел мир до — но все помнят, каким он должен быть.',
    npcs: ['magister_aelvin', 'druss_merc', 'forest_trader'],
    buildings: ['merchant', 'board']
  },

  // ========== ЛЕС: МАЛЫЕ СТОЯНКИ ==========
  forest_lumber_hut: {
    id: 'forest_lumber_hut',
    type: 'small',
    zoneId: 'forest',
    level: 6,
    name: 'Хижина Лесорубов',
    subtitle: 'Западная опушка',
    lore: 'Ивар живёт здесь двенадцать лет. Один. Говорит, что лес его не отпускает — и он не спорит.',
    npcs: ['forest_lumberjack'],
    buildings: []
  },

  forest_old_altar: {
    id: 'forest_old_altar',
    type: 'small',
    zoneId: 'forest',
    level: 10,
    name: 'Древний Алтарь',
    subtitle: 'Руины у Гнилой рощи',
    lore: 'Алтарь Синклита, построенный ещё до Раскола. Скелеты-охранники стоят у него триста лет — и не знают, что их хозяин мёртв.',
    npcs: ['forest_pilgrim'],
    buildings: []
  },

  // ========== РУДНИКИ: МАЛЫЕ СТОЯНКИ ==========
  mines_collapsed: {
    id: 'mines_collapsed',
    type: 'small',
    zoneId: 'mines',
    level: 12,
    name: 'Заброшенная Штольня',
    subtitle: 'Заваленный проход',
    lore: 'Штольня обвалилась двенадцать лет назад. Трое выбрались. Один остался — не смог уйти.',
    npcs: ['mines_survivor'],
    buildings: []
  },

  // ========== РУИНЫ: МАЛЫЕ СТОЯНКИ ==========
  ruins_watch: {
    id: 'ruins_watch',
    type: 'small',
    zoneId: 'ruins',
    level: 18,
    name: 'Проклятый Дозор',
    subtitle: 'Разрушенная башня',
    lore: 'Здесь стоял дозорный триста лет. Он не заметил Раскола. Он всё ещё смотрит.',
    npcs: ['ruins_watcher'],
    buildings: []
  },

  // ========== ХРАМ: МАЛЫЕ СТОЯНКИ ==========
  temple_porch: {
    id: 'temple_porch',
    type: 'small',
    zoneId: 'temple',
    level: 24,
    name: 'Молчаливая Паперть',
    subtitle: 'Притвор перед храмом',
    lore: 'Монах-молчальник сидит здесь сорок лет. Никто не слышал от него ни слова. Даже Мора.',
    npcs: ['temple_silent'],
    buildings: []
  },

  // ========== ПИКИ: МАЛЫЕ СТОЯНКИ ==========
  peaks_post: {
    id: 'peaks_post',
    type: 'small',
    zoneId: 'peaks',
    level: 30,
    name: 'Ветхая Застава',
    subtitle: 'Полуразрушенный форт',
    lore: 'Империя держала здесь гарнизон до Раскола. Теперь здесь живёт только ветер — и один старик.',
    npcs: ['peaks_veteran'],
    buildings: []
  },

  // ========== КУЗНИ: МАЛЫЕ СТОЯНКИ ==========
  forges_cold: {
    id: 'forges_cold',
    type: 'small',
    zoneId: 'forges',
    level: 36,
    name: 'Угасший Горн',
    subtitle: 'Старая кузня',
    lore: 'Этот горн погас первым. Старый Гранн не смог его зажечь снова — и остался здесь, ждать.',
    npcs: ['forges_old_smith'],
    buildings: []
  },

  // ========== ТОПИ: МАЛЫЕ СТОЯНКИ ==========
  swamp_dock: {
    id: 'swamp_dock',
    type: 'small',
    zoneId: 'swamp',
    level: 42,
    name: 'Гнилая Пристань',
    subtitle: 'Полузатопленный помост',
    lore: 'Паромщик перевозит через топи. Не спрашивает, зачем идёшь. Не спрашивает, что ты видел.',
    npcs: ['swamp_ferryman'],
    buildings: []
  },

  // ========== МОСТ: МАЛЫЕ СТОЯНКИ ==========
  bridge_post: {
    id: 'bridge_post',
    type: 'small',
    zoneId: 'bridge',
    level: 48,
    name: 'Одинокий Пикет',
    subtitle: 'Застава у входа на мост',
    lore: 'Здесь стоит часовой. Один. Уже пятнадцать лет. Он не помнит, чего ждёт.',
    npcs: ['bridge_sentry'],
    buildings: []
  },

  // ========== РАЗЛОМ: МАЛЫЕ СТОЯНКИ ==========
  rift_watch: {
    id: 'rift_watch',
    type: 'small',
    zoneId: 'rift',
    level: 54,
    name: 'Тихий Наблюдатель',
    subtitle: 'Одинокая палатка',
    lore: 'Маг-исследователь наблюдает за Разломом. Он молчит. Он всегда молчал.',
    npcs: ['rift_observer'],
    buildings: []
  },

  // ========== КРЕПОСТЬ: МАЛЫЕ СТОЯНКИ ==========
  fortress_front: {
    id: 'fortress_front',
    type: 'small',
    zoneId: 'fortress',
    level: 60,
    name: 'Передовой Рубеж',
    subtitle: 'Окоп у стен крепости',
    lore: 'Здесь стояли последние защитники. Разведчик Асгейр — один из них. Он не сдался. Он просто остался.',
    npcs: ['fortress_scout'],
    buildings: []
  },

  // ========== АВАНПОСТ КАМЕННЫХ ГОРЛ (mines) ==========
  mines_outpost: {
    id: 'mines_outpost',
    type: 'main',
    level: 15,
    zoneId: 'mines',
    name: 'Аванпост Каменных Горл',
    subtitle: 'Последний форт Империи на пути вглубь',
    lore: 'Империя построила его, чтобы охранять рудники. Теперь это — единственное место, где можно передохнуть на пути вниз. Гранн-кузнецы работают здесь вахтами по три месяца.',
    npcs: ['mines_smith', 'mines_elder', 'mines_trader'],
    buildings: ['blacksmith', 'merchant', 'board']
  },

  // ========== СХРОН ОЛЬДЕНА (ruins) ==========
  olden_hideout: {
    id: 'olden_hideout',
    type: 'main',
    level: 20,
    zoneId: 'ruins',
    name: 'Схрон Ольдена',
    subtitle: 'Убежище в руинах',
    lore: 'Один из немногих уцелевших залов дворца Ольдена. Здесь живёт старик, который называет себя Хранителем. Никто не помнит, чтобы он выходил наружу.',
    npcs: ['olden_keeper'],
    buildings: ['board']
  },

  // ========== СКИТ МОРА (temple) ==========
  mora_skit: {
    id: 'mora_skit',
    type: 'main',
    level: 27,
    zoneId: 'temple',
    name: 'Скит Мора',
    subtitle: 'Прибежище отверженных',
    lore: 'Мора не бог. Это — состояние. Здесь живут те, кто принял конец мира и нашёл в нём покой. Они не боятся Бездны — они её ждут.',
    npcs: ['mora_priest', 'mora_pilgrim'],
    buildings: ['board']
  },

  // ========== ЛАГЕРЬ ЛЕДОРУКОВ (peaks) ==========
  peaks_camp: {
    id: 'peaks_camp',
    type: 'main',
    level: 33,
    zoneId: 'peaks',
    name: 'Лагерь Ледоруков',
    subtitle: 'Стоянка охотников на вирмов',
    lore: 'Здесь живут те, кто поклялся убивать вирмов, пока не убьют их самих. Они не считают это героизмом — это долг.',
    npcs: ['peaks_hunter'],
    buildings: ['board']
  },

  // ========== КУЗНИ ГНОМОВ (forges) ==========
  dwarven_forges: {
    id: 'dwarven_forges',
    type: 'main',
    level: 38,
    zoneId: 'forges',
    name: 'Кузни Гномов',
    subtitle: 'Огненные пещеры Гранн',
    lore: 'Здесь никогда не засыпают горны. Гранн говорят: пока горит огонь, Предтечи не забыли о нас. Когда погаснет — начнётся последний Раскол.',
    npcs: ['forge_master', 'forge_apprentice'],
    buildings: ['blacksmith', 'merchant']
  },

  // ========== СТОЯНКА НА КОЧЕ (swamp) ==========
  swamp_camp: {
    id: 'swamp_camp',
    type: 'main',
    level: 44,
    zoneId: 'swamp',
    name: 'Стоянка на Коче',
    subtitle: 'Островок жизни в мёртвых топях',
    lore: 'Единственный клочок твёрдой земли в топях. Здесь торгуют те, кому нечего терять. Здесь начинаются все легенды о Молодом Левиафане.',
    npcs: ['swamp_bolotnik', 'swamp_trader'],
    buildings: ['merchant', 'board']
  },

  // ========== ЗАСТАВА МОСТА (bridge) ==========
  bridge_outpost: {
    id: 'bridge_outpost',
    type: 'main',
    level: 50,
    zoneId: 'bridge',
    name: 'Застава Моста',
    subtitle: 'Граница между живыми и мёртвыми',
    lore: 'Мост через Разлом — единственный путь на ту сторону. Империя держит здесь гарнизон. Официально — для охраны. Реально — чтобы никто не вернулся оттуда.',
    npcs: ['bridge_officer', 'bridge_medic'],
    buildings: ['merchant', 'board']
  },

  // ========== КРАЙ РАЗЛОМА (rift) ==========
  rift_edge: {
    id: 'rift_edge',
    type: 'main',
    level: 56,
    zoneId: 'rift',
    name: 'Край Разлома',
    subtitle: 'Лагерь магов Синклита',
    lore: 'Аэлвин разбили здесь шатры, чтобы изучать Разлом. Каждый день они измеряют его. Каждую ночь — он становится шире. Никто не знает, что это значит.',
    npcs: ['rift_magister', 'rift_mage_1', 'rift_mage_2'],
    buildings: ['merchant', 'board']
  },

  // ========== ЛАГЕРЬ ОСАДЫ (fortress) ==========
  fortress_siege: {
    id: 'fortress_siege',
    type: 'main',
    level: 62,
    zoneId: 'fortress',
    name: 'Лагерь Осады',
    subtitle: 'Последний рубеж перед Тэрном',
    lore: 'Три державы объединились здесь впервые за триста лет. Никто не верит в победу. Но все пришли.',
    npcs: ['fortress_officer', 'fortress_smith', 'fortress_trader'],
    buildings: ['blacksmith', 'merchant', 'board']
  },

  // ========== ПОРОГ СЕРДЦА (heart) ==========
  heart_threshold: {
    id: 'heart_threshold',
    type: 'main',
    level: 68,
    zoneId: 'heart',
    name: 'Порог Сердца',
    subtitle: 'Там, где кончаются слова',
    lore: 'Последний лагерь перед Сердцем Вейлана. Отсюда никто не возвращался. Отсюда всё начинается заново.',
    npcs: ['stranger', 'rift_mage_2'],
    buildings: []
  }

};

// ============================================================
// ЭКСПОРТ
// ============================================================

function getSettlement(zoneId) {
  for (var id in SETTLEMENTS) {
    if (SETTLEMENTS[id].zoneId === zoneId) return SETTLEMENTS[id];
  }
  return null;
}

window.Settlements = {
  SETTLEMENTS: SETTLEMENTS,
  getSettlement: getSettlement
};

console.log('[settlements] загружено: ' + Object.keys(SETTLEMENTS).length);
