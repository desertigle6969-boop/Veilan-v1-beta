// ============================================================
// ВЕЙЛАН — МОБЫ ЗОН 1-4
// Зона 1: Лагерь Серых Холмов (ур. 1-8)
// Зона 2: Шепчущий Лес (ур. 5-14)
// Зона 3: Рудники Ханна (ур. 10-20)
// Зона 4: Руины Валдорна (ур. 16-26)
// ============================================================

const MOBS_1 = {

  // ================= ЗОНА 1: ЛАГЕРЬ СЕРЫХ ХОЛМОВ =================

  // --- Подлокация: Пепелище (ур. 1-3) ---
  rat_grey: {
    id:'rat_grey', name:'Серая крыса', sprite:'RAT',
    level:1, type:'beast', zone:'camp', sub:'ash',
    hp:64, atk:13, def:5, spd:12, eva:8,
    exp:23, gold:4,
    skill:'beast_bite',
    lore:'Три поколения крыс выросли на телах этого лагеря. Она — четвёртое. Не боится никого.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather', chance:0.3, quantity:1 },
      { itemId:'food_bread',  chance:0.10, quantity:1 }
    ]
  },
  rat_big: {
    id:'rat_big', name:'Крыса-падальщик', sprite:'RAT_BIG',
    level:2, type:'beast', zone:'camp', sub:'ash',
    hp:89, atk:16, def:6, spd:13, eva:10,
    exp:31, gold:5,
    skill:'beast_bite',
    lore:'Ела то, что осталось от солдат. Теперь ест тех, кто пришёл их хоронить.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather', chance:0.3, quantity:1 },
      { itemId:'mat_iron_ore',chance:0.3, quantity:1 }
    ]
  },
  dog_wild: {
    id:'dog_wild', name:'Дикий пёс', sprite:'DOG',
    level:3, type:'beast', zone:'camp', sub:'ash',
    hp:113, atk:20, def:7, spd:15, eva:12,
    exp:39, gold:6,
    skill:'beast_tear',
    lore:'Была собакой одного из солдат. Солдат умер. Собака — нет. Теперь она ест всех, кто подходит к костру.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather', chance:0.3, quantity:1 },
      { itemId:'food_meat',   chance:0.15, quantity:1 }
    ]
  },

  // --- Подлокация: Палаточный ряд (ур. 3-6) ---
  bandit_grunt: {
    id:'bandit_grunt', name:'Мародёр-новобранец', sprite:'BANDIT',
    level:3, type:'humanoid', zone:'camp', sub:'tents',
    hp:113, atk:22, def:8, spd:12, eva:8,
    exp:41, gold:8,
    skill:'humanoid_strike',
    lore:'Убил первого человека в двенадцать лет. Не помнит его лица. Помнит только, что тот просил.',
    aiProfile:'trash',
    loot:[
      { itemId:'sword_rusty',   chance:0.05, quantity:1 },
      { itemId:'potion_hp_small', chance:0.20, quantity:1 },
      { itemId:'mat_leather',   chance:0.30, quantity:1 }
    ]
  },
  bandit_thug: {
    id:'bandit_thug', name:'Мародёр-громила', sprite:'BANDIT_THUG',
    level:4, type:'humanoid', zone:'camp', sub:'tents',
    hp:137, atk:26, def:10, spd:11, eva:6,
    exp:47, gold:10,
    skill:'humanoid_strike',
    lore:'Дерётся за еду и за женщин. В этом порядке. Остальное его не интересует.',
    aiProfile:'trash',
    loot:[
      { itemId:'axe_hand',      chance:0.06, quantity:1 },
      { itemId:'potion_hp_small', chance:0.25, quantity:1 }
    ]
  },
  drunk_merc: {
    id:'drunk_merc', name:'Пьяный наёмник', sprite:'MERC',
    level:5, type:'humanoid', zone:'camp', sub:'tents',
    hp:162, atk:29, def:11, spd:12, eva:8,
    exp:55, gold:14,
    skill:'humanoid_strike',
    lore:'Был наёмником в Империи. Провалил одно задание. Теперь пьёт и не помнит, какое именно.',
    aiProfile:'trash',
    loot:[
      { itemId:'sword_iron',    chance:0.04, quantity:1 },
      { itemId:'potion_hp_small', chance:0.30, quantity:1 },
      { itemId:'rune_rage', chance:0.10, quantity:1 }
    ]
  },

  // --- Подлокация: Костровая (ур. 5-7) — элита ---
  shaman_outcast: {
    id:'shaman_outcast', name:'Шаман-изгой', sprite:'SHAMAN',
    level:5, type:'humanoid', zone:'camp', sub:'firepit',
    hp:486, atk:45, def:16, spd:14, eva:10,    // элита: ×3 HP, ×1.5 ATK
    exp:275, gold:70,
    skill:'humanoid_curse',
    lore:'Его изгнали из Синклита за то, что он оживил мёртвого пса. Пёс до сих пор рядом.',
    aiProfile:'elite',
    loot:[
      { itemId:'staff_oak',     chance:0.30, quantity:1 },
      { itemId:'amulet_wood',   chance:0.35, quantity:1 },
      { itemId:'potion_mp_med', chance:0.40, quantity:1 },
      { itemId:'mat_essence',   chance:0.3, quantity:2 }
    ]
  },
  camp_dog: {
    id:'camp_dog', name:'Цепной пёс', sprite:'DOG_CHAIN',
    level:3, type:'beast', zone:'camp', sub:'firepit',
    hp:113, atk:20, def:7, spd:15, eva:12,
    exp:39, gold:6,
    skill:'beast_tear',
    lore:'Цепной пёс, которого забыли отвязать. Умер от голода. Продолжает охранять.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather', chance:0.3, quantity:1 }
    ]
  },

  // --- БОСС ЗОНЫ 1 ---
  bandit_leader: {
    id:'bandit_leader', name:'Вожак Мародёров', sprite:'LEADER',
    level:8, type:'humanoid', zone:'camp', sub:'altar',
    hp:2025, atk:84, def:28, spd:16, eva:12,   // босс
    exp:3600, gold:400,
    skill:'boss_strike',
    isBoss:true,
    skills:['humanoid_cleave','humanoid_cleave'],  // 2 скилла
    lore:'Он не называет себя вожаком. Другие называют. Ему всё равно. Он просто убивает тех, кто не согласен.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['bandit_grunt','bandit_grunt'],
    loot:[
      { itemId:'sword_iron',    chance:1.00, quantity:1 },   // гарант
      { itemId:'chest_iron',    chance:0.60, quantity:1 },
      { itemId:'helm_iron',   chance:0.45, quantity:1 },
      { itemId:'potion_hp_med', chance:1.00, quantity:3 },
      { itemId:'shard_1',       chance:0.05, quantity:1 }
    ]
  },

  // ================= ЗОНА 2: ШЕПЧУЩИЙ ЛЕС =================

  // --- Опушка (ур. 5-8) ---
  wolf_grey: {
    id:'wolf_grey', name:'Серый волк', sprite:'WOLF',
    level:5, type:'beast', zone:'forest', sub:'edge',
    hp:162, atk:29, def:11, spd:16, eva:14,
    exp:55, gold:7,
    skill:'beast_tear',
    lore:'Охотится стаей. Если видишь одного — их четверо за спиной.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather',    chance:0.3, quantity:1 },
      { itemId:'mat_thick_hide', chance:0.3, quantity:1 }
    ]
  },
  spider_weaver: {
    id:'spider_weaver', name:'Паук-ткач', sprite:'SPIDER',
    level:6, type:'beast', zone:'forest', sub:'edge',
    hp:186, atk:32, def:12, spd:18, eva:16,
    exp:63, gold:8,
    skill:'beast_poison',
    lore:'Плетёт сети между деревьями. Иногда ловит то, что не должно было попасть.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather', chance:0.30, quantity:1 },
      { itemId:'mat_essence', chance:0.3, quantity:1 }
    ]
  },
  boar_forest: {
    id:'boar_forest', name:'Лесной кабан', sprite:'BOAR',
    level:7, type:'beast', zone:'forest', sub:'edge',
    hp:210, atk:36, def:14, spd:13, eva:8,
    exp:71, gold:9,
    skill:'beast_charge',
    lore:'Его ранили охотники. Он запомнил запах. Всех охотников.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather',    chance:0.3, quantity:1 },
      { itemId:'mat_thick_hide', chance:0.3, quantity:1 },
      { itemId:'food_meat',      chance:0.30, quantity:1 }
    ]
  },

  // --- Гнилая роща (ур. 8-11) ---
  treant_rotten: {
    id:'treant_rotten', name:'Гнилой Древень', sprite:'TREANT',
    level:8, type:'plant', zone:'forest', sub:'grove',
    hp:234, atk:40, def:20, spd:8, eva:4,
    exp:79, gold:11,
    skill:'plant_root',
    lore:'Стоял здесь до Раскола. Помнит солнце. Не прощает, что его больше нет.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_leather', chance:0.30, quantity:2 },
      { itemId:'mat_essence', chance:0.3, quantity:1 }
    ]
  },
  fly_vampire: {
    id:'fly_vampire', name:'Светляк-вампир', sprite:'FIREFLY',
    level:9, type:'beast', zone:'forest', sub:'grove',
    hp:259, atk:44, def:15, spd:22, eva:25,
    exp:87, gold:12,
    skill:'beast_drain',
    lore:'Светится, чтобы ты шёл за ним. Ты идёшь. Он доволен.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:1 },
      { itemId:'potion_hp_small', chance:0.20, quantity:1 }
    ]
  },
  wolf_dire: {
    id:'wolf_dire', name:'Лютый волк', sprite:'WOLF_DIRE',
    level:10, type:'beast', zone:'forest', sub:'grove',
    hp:283, atk:48, def:18, spd:18, eva:14,
    exp:95, gold:14,
    skill:'beast_tear',
    lore:'Вожак стаи. Пережил трёх альф. Четвёртая — он сам.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_thick_hide', chance:0.3, quantity:1 },
      { itemId:'mat_thick_hide',          chance:0.3, quantity:1 }
    ]
  },

  // --- Забытая часовня (ур. 10-12) — элита ---
  cursed_priest: {
    id:'cursed_priest', name:'Проклятый Жрец', sprite:'PRIEST',
    level:10, type:'humanoid', zone:'forest', sub:'chapel',
    hp:850, atk:71, def:27, spd:13, eva:8,
    exp:475, gold:120,
    skill:'humanoid_curse',
    lore:'Молился Свету триста лет. Свет не ответил. Он обиделся.',
    aiProfile:'elite',
    loot:[
      { itemId:'staff_rune',    chance:0.005, quantity:1 },
      { itemId:'amulet_bone',   chance:0.30, quantity:1 },
      { itemId:'potion_hp_med', chance:0.50, quantity:2 },
      { itemId:'rune_stone',   chance:0.25, quantity:1 }
    ]
  },
  skeleton_guard: {
    id:'skeleton_guard', name:'Скелет-охранник', sprite:'SKELETON',
    level:9, type:'undead', zone:'forest', sub:'chapel',
    hp:259, atk:44, def:20, spd:11, eva:6,
    exp:87, gold:10,
    skill:'undead_chill',
    lore:'Охраняет часовню, которой уже нет. Приказ помнит. Приказодателя — нет.',
    aiProfile:'trash',
    loot:[
      { itemId:'sword_iron',  chance:0.05, quantity:1 },
      { itemId:'mat_essence', chance:0.3, quantity:1 }
    ]
  },

  // --- БОСС ЗОНЫ 2 ---
  treant_fallen: {
    id:'treant_fallen', name:'Древень-Отступник', sprite:'TREANT_BOSS',
    level:12, type:'plant', zone:'forest', sub:'heart',
    hp:3240, atk:114, def:42, spd:12, eva:8,
    exp:9000, gold:800,
    skill:'boss_strike',
    isBoss:true,
    skills:['plant_wrath','plant_regen'],
    lore:'Рос здесь до Раскола. Три тысячи лет был домом для птиц. Сейчас в его дупле живут только мёртвые.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['treant_rotten','spider_weaver'],
    loot:[
      { itemId:'staff_rune',     chance:0.005, quantity:1 },
      { itemId:'legs_leather',   chance:0.70, quantity:1 },
      { itemId:'chest_leather',  chance:0.55, quantity:1 },
      { itemId:'potion_hp_med',  chance:1.00, quantity:4 },
      { itemId:'shard_1',        chance:0.05, quantity:1 },
      { itemId:'mat_dust',       chance:0.3, quantity:3 }
    ]
  },

  // ================= ЗОНА 3: РУДНИКИ ХАННА =================

  // --- Шахты (ур. 10-13) ---
  goblin_miner: {
    id:'goblin_miner', name:'Гоблин-шахтёр', sprite:'GOBLIN',
    level:10, type:'humanoid', zone:'mines', sub:'shafts',
    hp:283, atk:48, def:18, spd:14, eva:10,
    exp:95, gold:18,
    skill:'humanoid_strike',
    lore:'Копает за медяки. Медяки не тратит — некуда. Копает дальше.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_iron_ore',   chance:0.3, quantity:2 },
      { itemId:'mat_steel_ore',  chance:0.005, quantity:1 },
      { itemId:'potion_hp_small', chance:0.15, quantity:1 }
    ]
  },
  bat_cave: {
    id:'bat_cave', name:'Пещерная мышь', sprite:'BAT',
    level:11, type:'beast', zone:'mines', sub:'shafts',
    hp:307, atk:52, def:18, spd:24, eva:25,
    exp:103, gold:14,
    skill:'beast_drain',
    lore:'Слепая. Ориентируется по звуку шагов. Твои шаги — громкие.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:1 }
    ]
  },
  miner_mad: {
    id:'miner_mad', name:'Безумный шахтёр', sprite:'MINER',
    level:12, type:'humanoid', zone:'mines', sub:'shafts',
    hp:332, atk:55, def:20, spd:12, eva:6,
    exp:111, gold:20,
    skill:'humanoid_cleave',
    lore:'Копал двадцать лет. Нашёл что-то на глубине. Теперь копает себя.',
    aiProfile:'trash',
    loot:[
      { itemId:'hammer_forge', chance:0.10, quantity:1 },
      { itemId:'mat_iron_ore', chance:0.3, quantity:2 },
      { itemId:'mat_steel_ore', chance:0.005, quantity:1 }
    ]
  },

  // --- Глубокие штольни (ур. 13-16) ---
  golem_stone: {
    id:'golem_stone', name:'Каменный голем', sprite:'GOLEM',
    level:14, type:'elemental', zone:'mines', sub:'deep',
    hp:388, atk:63, def:32, spd:8, eva:4,
    exp:127, gold:25,
    skill:'elemental_smash',
    lore:'Стоял здесь, когда пришли первые шахтёры. Был статуей. Перестал быть статуей.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_steel_ore', chance:0.005, quantity:2 },
      { itemId:'mat_mithril',   chance:0.3, quantity:1 }
    ]
  },
  spider_venom: {
    id:'spider_venom', name:'Ядовитый паук', sprite:'SPIDER_VENOM',
    level:15, type:'beast', zone:'mines', sub:'deep',
    hp:413, atk:67, def:22, spd:20, eva:18,
    exp:135, gold:22,
    skill:'beast_poison',
    lore:'Яд не для охоты. Яд для того, чтобы жертва не кричала.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:1 },
      { itemId:'potion_hp_small', chance:0.20, quantity:1 }
    ]
  },
  dwarf_greed: {
    id:'dwarf_greed', name:'Гранн-предатель', sprite:'DWARF_BAD',
    level:16, type:'humanoid', zone:'mines', sub:'deep',
    hp:437, atk:71, def:28, spd:11, eva:6,
    exp:143, gold:35,
    skill:'humanoid_cleave',
    lore:'Он из Гранн. Продал свой клан за одну жилу. Жила оказалась пустой.',
    aiProfile:'trash',
    loot:[
      { itemId:'hammer_war',   chance:0.10, quantity:1 },
      { itemId:'belt_iron',    chance:0.06, quantity:1 },
      { itemId:'mat_mithril',  chance:0.3, quantity:1 }
    ]
  },

  // --- Затопленные тоннели (ур. 16-18) — элита ---
  golem_iron: {
    id:'golem_iron', name:'Железный голем', sprite:'GOLEM_IRON',
    level:17, type:'elemental', zone:'mines', sub:'flooded',
    hp:1296, atk:101, def:52, spd:9, eva:4,
    exp:800, gold:200,
    skill:'elemental_smash',
    lore:'Собран из тел погибших шахтёров. Не помнит, кем был. Помнит только работу.',
    aiProfile:'elite',
    loot:[
      { itemId:'chest_iron',     chance:0.30, quantity:1 },
      { itemId:'hammer_war',     chance:0.15, quantity:1 },
      { itemId:'mat_mithril',    chance:0.3, quantity:2 },
      { itemId:'potion_hp_med',  chance:0.50, quantity:2 }
    ]
  },
  slave_escaped: {
    id:'slave_escaped', name:'Беглый раб', sprite:'SLAVE',
    level:13, type:'humanoid', zone:'mines', sub:'flooded',
    hp:356, atk:59, def:20, spd:14, eva:10,
    exp:119, gold:12,
    skill:'humanoid_strike',
    lore:'Бежал с рудников, где работал восемнадцать лет. Помнит каждую минуту. Не любит вспоминать — но не может забыть.',
    aiProfile:'coward',
    loot:[
      { itemId:'dagger_bone', chance:0.15, quantity:1 },
      { itemId:'food_bread',  chance:0.30, quantity:1 }
    ]
  },

  // --- БОСС ЗОНЫ 3 ---
  golem_ancient: {
    id:'golem_ancient', name:'Древний Голем Ханна', sprite:'GOLEM_ANCIENT',
    level:20, type:'elemental', zone:'mines', sub:'core',
    hp:5670, atk:169, def:70, spd:10, eva:6,
    exp:18000, gold:1400,
    skill:'boss_strike',
    isBoss:true,
    skills:['elemental_smash','elemental_quake'],
    lore:'Древний Голем Ханна. Копал эти шахты тысячу лет. Помнит руки Предтеч. Не знает, что Предтеч больше нет.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['golem_stone','golem_stone'],
    loot:[
      { itemId:'hammer_war',     chance:1.00, quantity:1 },
      { itemId:'chest_iron',     chance:0.80, quantity:1 },
      { itemId:'legs_iron',      chance:0.60, quantity:1 },
      { itemId:'potion_hp_med',  chance:1.00, quantity:5 },
      { itemId:'shard_2',        chance:0.05, quantity:1 },
      { itemId:'mat_mithril',    chance:0.3, quantity:5 }
    ]
  },

  // ================= ЗОНА 4: РУИНЫ ВАЛДОРНА =================

  // --- Разрушенные стены (ур. 16-19) ---
  skeleton_warrior: {
    id:'skeleton_warrior', name:'Скелет-воин', sprite:'SKELETON_WAR',
    level:17, type:'undead', zone:'ruins', sub:'walls',
    hp:461, atk:75, def:28, spd:12, eva:6,
    exp:151, gold:22,
    skill:'undead_chill',
    lore:'Умирал на этих стенах. Считает, что стены ещё держатся. Стоит.',
    aiProfile:'trash',
    loot:[
      { itemId:'sword_iron',  chance:0.10, quantity:1 },
      { itemId:'mat_essence', chance:0.30, quantity:1 }
    ]
  },
  ghost_civilian: {
    id:'ghost_civilian', name:'Призрак горожанина', sprite:'GHOST',
    level:18, type:'undead', zone:'ruins', sub:'walls',
    hp:486, atk:79, def:24, spd:16, eva:20,
    exp:159, gold:25,
    skill:'undead_drain',
    lore:'Шёл домой, когда упала Завеса. Дома больше нет. Он всё ещё идёт.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence',    chance:0.3, quantity:2 },
      { itemId:'potion_mp_small', chance:0.25, quantity:1 }
    ]
  },
  gargoyle: {
    id:'gargoyle', name:'Горгулья', sprite:'GARGOYLE',
    level:19, type:'elemental', zone:'ruins', sub:'walls',
    hp:510, atk:83, def:34, spd:14, eva:10,
    exp:167, gold:30,
    skill:'elemental_smash',
    lore:'Был статуей на крыше. Ожил в момент Раскола. Жалеет, что ожил.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_steel_ore', chance:0.005, quantity:2 },
      { itemId:'mat_mithril',   chance:0.3, quantity:1 }
    ]
  },

  // --- Внутренний двор (ур. 20-22) ---
  knight_fallen: {
    id:'knight_fallen', name:'Павший рыцарь', sprite:'KNIGHT',
    level:20, type:'undead', zone:'ruins', sub:'courtyard',
    hp:534, atk:88, def:36, spd:12, eva:8,
    exp:175, gold:40,
    skill:'undead_chill',
    lore:'Один из последних рыцарей Валдорна. Видел, как падает столица. Не смог помешать. Теперь не может умереть.',
    aiProfile:'trash',
    loot:[
      { itemId:'sword_steel',    chance:0.005, quantity:1 },
      { itemId:'chest_iron',     chance:0.08, quantity:1 },
      { itemId:'mat_steel_ore',  chance:0.005, quantity:1 }
    ]
  },
  hound_spectral: {
    id:'hound_spectral', name:'Призрачная гончая', sprite:'HOUND',
    level:21, type:'undead', zone:'ruins', sub:'courtyard',
    hp:558, atk:92, def:32, spd:22, eva:25,
    exp:183, gold:32,
    skill:'undead_drain',
    lore:'Охотничий пёс короля. Умер в один день с хозяином. До сих пор ищет его след.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 }
    ]
  },
  mage_ghost: {
    id:'mage_ghost', name:'Призрак-маг', sprite:'MAGE_GHOST',
    level:22, type:'undead', zone:'ruins', sub:'courtyard',
    hp:583, atk:96, def:30, spd:14, eva:12,
    exp:191, gold:45,
    skill:'undead_fire',
    lore:'Пытался удержать Завесу. Успел только наполовину. Половина — не спасение.',
    aiProfile:'trash',
    loot:[
      { itemId:'staff_rune',    chance:0.005, quantity:1 },
      { itemId:'potion_mp_med', chance:0.30, quantity:1 },
      { itemId:'mat_essence',   chance:0.3, quantity:2 }
    ]
  },

  // --- Тронный зал (ур. 22-24) — элита ---
  knight_captain: {
    id:'knight_captain', name:'Капитан стражи', sprite:'KNIGHT_CAP',
    level:23, type:'undead', zone:'ruins', sub:'throne',
    hp:1701, atk:169, def:80, spd:14, eva:10,
    exp:1500, gold:400,
    skill:'undead_cleave',
    lore:'Капитан стражи. Приказ: не пускать никого к королю. Умирал, выполняя. Выполняет.',
    aiProfile:'elite',
    loot:[
      { itemId:'sword_steel',    chance:0.005, quantity:1 },
      { itemId:'chest_steel',    chance:0.005, quantity:1 },
      { itemId:'helm_steel',     chance:0.005, quantity:1 },
      { itemId:'potion_hp_large',chance:0.40, quantity:1 }
    ]
  },
  wraith: {
    id:'wraith', name:'Дух-убийца', sprite:'WRAITH',
    level:22, type:'undead', zone:'ruins', sub:'throne',
    hp:583, atk:104, def:30, spd:20, eva:28,
    exp:191, gold:55,
    skill:'undead_drain',
    lore:'Не помнит, кем был. Помнит только ненависть.',
    aiProfile:'trash',
    loot:[
      { itemId:'cloak_mist',   chance:0.03, quantity:1 },
      { itemId:'mat_essence',  chance:0.3, quantity:2 }
    ]
  },

  // --- БОСС ЗОНЫ 4 ---
  king_olden: {
    id:'king_olden', name:'Призрак Короля Ольдена', sprite:'KING_GHOST',
    level:26, type:'undead', zone:'ruins', sub:'crypt',
    hp:8100, atk:234, def:95, spd:15, eva:14,
    exp:32000, gold:2500,
    skill:'boss_strike',
    isBoss:true,
    skills:['undead_royal_strike','undead_summon_army'],
    lore:'Король Ольден. Ждёт доклада от генералов. Все генералы мертвы триста лет. Он ждёт.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['skeleton_warrior','skeleton_warrior','ghost_civilian'],
    loot:[
      { itemId:'sword_steel',    chance:0.005, quantity:1 },
      { itemId:'chest_steel',    chance:0.005, quantity:1 },
      { itemId:'legs_steel',     chance:0.005, quantity:1 },
      { itemId:'cloak_mist',     chance:0.03, quantity:1 },
      { itemId:'potion_hp_large',chance:1.00, quantity:4 },
      { itemId:'shard_2',        chance:0.05, quantity:1 },
      { itemId:'mat_dust',       chance:0.3, quantity:5 }
    ]
  }

};

