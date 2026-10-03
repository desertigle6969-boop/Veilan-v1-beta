// ============================================================
// ВЕЙЛАН — МОБЫ ЗОН 5-8
// Зона 5: Затонувший Храм (ур. 22-32)
// Зона 6: Пики Хлада (ур. 28-38)
// Зона 7: Кузни Гранна (ур. 34-44)
// Зона 8: Топи Мора (ур. 40-50)
// ============================================================

const MOBS_2 = {

  // ================= ЗОНА 5: ЗАТОНУВШИЙ ХРАМ =================

  // --- Внешние залы (ур. 22-25) ---
  fishman_warrior: {
    id:'fishman_warrior', name:'Рыболюд-воин', sprite:'FISHMAN',
    level:22, type:'humanoid', zone:'temple', sub:'halls',
    hp:583, atk:96, def:34, spd:15, eva:10,
    exp:191, gold:38,
    skill:'humanoid_strike',
    lore:'Стоит в боевом порядке триста лет. Враг не пришёл. Он всё ещё ждёт.',
    aiProfile:'trash',
    loot:[
      { itemId:'trident_coral', chance:0.10, quantity:1 },
      { itemId:'mat_leather',   chance:0.3, quantity:2 }
    ]
  },
  crab_giant: {
    id:'crab_giant', name:'Гигантский краб', sprite:'CRAB',
    level:23, type:'beast', zone:'temple', sub:'halls',
    hp:607, atk:101, def:44, spd:10, eva:6,
    exp:199, gold:32,
    skill:'beast_crush',
    lore:'Вырос на костях утопленников. Каждый панцирь — чей-то череп.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_thick_hide', chance:0.3, quantity:2 },
      { itemId:'mat_essence',    chance:0.3, quantity:1 }
    ]
  },
  drowned_sailor: {
    id:'drowned_sailor', name:'Утонувший моряк', sprite:'DROWNED',
    level:24, type:'undead', zone:'temple', sub:'halls',
    hp:631, atk:106, def:32, spd:13, eva:10,
    exp:207, gold:35,
    skill:'undead_chill',
    lore:'Шёл домой к жене. Море поднялось. Жена умерла двести лет назад. Он всё ещё идёт.',
    aiProfile:'trash',
    loot:[
      { itemId:'sword_iron',  chance:0.10, quantity:1 },
      { itemId:'mat_essence', chance:0.3, quantity:2 }
    ]
  },

  // --- Затопленные залы (ур. 25-28) ---
  eel_electric: {
    id:'eel_electric', name:'Электрический угорь', sprite:'EEL',
    level:25, type:'beast', zone:'temple', sub:'flooded',
    hp:656, atk:110, def:28, spd:20, eva:18,
    exp:215, gold:38,
    skill:'beast_shock',
    lore:'Светится в темноте. Не для того, чтобы ты видел её — чтобы ты подошёл.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 },
      { itemId:'potion_mp_small', chance:0.20, quantity:1 }
    ]
  },
  jelly_poison: {
    id:'jelly_poison', name:'Ядовитая медуза', sprite:'JELLY',
    level:26, type:'elemental', zone:'temple', sub:'flooded',
    hp:680, atk:114, def:30, spd:18, eva:20,
    exp:223, gold:40,
    skill:'elemental_poison',
    lore:'Прозрачная. Красивая. Один удар — и ты уже не помнишь своего имени.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 }
    ]
  },
  priest_corrupt: {
    id:'priest_corrupt', name:'Порченый жрец', sprite:'PRIEST_BAD',
    level:27, type:'humanoid', zone:'temple', sub:'flooded',
    hp:704, atk:118, def:34, spd:13, eva:10,
    exp:231, gold:55,
    skill:'humanoid_curse',
    lore:'Молился в этом храме до Раскола. После Раскола молится дальше — но уже не Свету.',
    aiProfile:'trash',
    loot:[
      { itemId:'staff_rune',    chance:0.005, quantity:1 },
      { itemId:'amulet_bone',   chance:0.10, quantity:1 },
      { itemId:'mat_essence',   chance:0.3, quantity:2 }
    ]
  },

  // --- Алтарь глубин (ур. 28-30) — элита ---
  priestess_deep: {
    id:'priestess_deep', name:'Жрица Глубин', sprite:'PRIESTESS',
    level:29, type:'humanoid', zone:'temple', sub:'altar',
    hp:2187, atk:208, def:76, spd:15, eva:14,
    exp:2400, gold:600,
    skill:'humanoid_holy',
    lore:'Жрица, что отказалась покидать храм. Вода поднялась — она осталась. Дышать разучилась, жить — нет.',
    aiProfile:'elite',
    loot:[
      { itemId:'staff_crystal', chance:0.005, quantity:1 },
      { itemId:'amulet_sapphire', chance:0.20, quantity:1 },
      { itemId:'chest_iron',    chance:0.15, quantity:1 },
      { itemId:'potion_mp_large', chance:0.40, quantity:2 }
    ]
  },
  guardian_coral: {
    id:'guardian_coral', name:'Коралловый страж', sprite:'CORAL_GUARD',
    level:28, type:'elemental', zone:'temple', sub:'altar',
    hp:729, atk:123, def:52, spd:11, eva:6,
    exp:239, gold:48,
    skill:'elemental_smash',
    lore:'Не знает, что океана больше нет. Охраняет то, что осталось.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_mithril', chance:0.3, quantity:2 },
      { itemId:'mat_essence', chance:0.3, quantity:2 }
    ]
  },

  // --- БОСС ЗОНЫ 5 ---
  leviathan_young: {
    id:'leviathan_young', name:'Молодой Левиафан', sprite:'LEVIATHAN',
    level:32, type:'beast', zone:'temple', sub:'deep',
    hp:12150, atk:312, def:120, spd:16, eva:12,
    exp:50000, gold:4000,
    skill:'boss_strike',
    isBoss:true,
    skills:['beast_tidal','elemental_tsunami'],
    lore:'Спит в затопленном святилище. Ему снится море, которого не существует. Один день — и он проснётся.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['fishman_warrior','eel_electric','jelly_poison'],
    loot:[
      { itemId:'trident_deep',    chance:0.005, quantity:1 },
      { itemId:'chest_steel',     chance:0.005, quantity:1 },
      { itemId:'helm_steel',      chance:0.005, quantity:1 },
      { itemId:'amulet_sapphire', chance:0.55, quantity:1 },
      { itemId:'potion_hp_large', chance:1.00, quantity:5 },
      { itemId:'shard_3',         chance:0.05, quantity:1 },
      { itemId:'mat_mithril',     chance:0.3, quantity:8 }
    ]
  },

  // ================= ЗОНА 6: ПИКИ ХЛАДА =================

  // --- Снежные склоны (ур. 28-31) ---
  wolf_ice: {
    id:'wolf_ice', name:'Ледяной волк', sprite:'WOLF_ICE',
    level:28, type:'beast', zone:'peaks', sub:'slopes',
    hp:729, atk:123, def:40, spd:18, eva:16,
    exp:239, gold:45,
    skill:'beast_freeze',
    lore:'Шерсть — из льда. Сердце — из ярости. Остальное — из голода.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_thick_hide', chance:0.3, quantity:2 },
      { itemId:'mat_essence',    chance:0.30, quantity:1 }
    ]
  },
  yeti: {
    id:'yeti', name:'Йети', sprite:'YETI',
    level:30, type:'beast', zone:'peaks', sub:'slopes',
    hp:777, atk:132, def:48, spd:12, eva:6,
    exp:255, gold:60,
    skill:'beast_crush',
    lore:'Первый йети этих гор. Помнит, когда здесь росли деревья. Не признаёт снег.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_thick_hide', chance:0.3, quantity:2 },
      { itemId:'potion_hp_med',  chance:0.20, quantity:1 }
    ]
  },
  hunter_frost: {
    id:'hunter_frost', name:'Морозный охотник', sprite:'HUNTER_ICE',
    level:31, type:'humanoid', zone:'peaks', sub:'slopes',
    hp:801, atk:137, def:40, spd:16, eva:14,
    exp:263, gold:70,
    skill:'humanoid_pierce',
    lore:'Охотится на всё живое в этих горах. Живого осталось мало. Он зол.',
    aiProfile:'trash',
    loot:[
      { itemId:'bow_composite', chance:0.15, quantity:1 },
      { itemId:'mat_thick_hide', chance:0.3, quantity:2 }
    ]
  },

  // --- Ледяные пещеры (ур. 32-35) ---
  golem_ice: {
    id:'golem_ice', name:'Ледяной голем', sprite:'GOLEM_ICE',
    level:33, type:'elemental', zone:'peaks', sub:'caves',
    hp:850, atk:146, def:64, spd:9, eva:4,
    exp:279, gold:85,
    skill:'elemental_freeze',
    lore:'Ледяной голем. Собран из слёз Нирны. Никогда не тает. Никогда не спит.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_mithril', chance:0.3, quantity:3 },
      { itemId:'mat_dust',    chance:0.3, quantity:1 }
    ]
  },
  ghost_frozen: {
    id:'ghost_frozen', name:'Замёрзший дух', sprite:'GHOST_ICE',
    level:34, type:'undead', zone:'peaks', sub:'caves',
    hp:874, atk:150, def:44, spd:18, eva:24,
    exp:287, gold:78,
    skill:'undead_drain',
    lore:'Умер от холода. Не понял, что умер. Ждёт весну, которой не будет.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence',    chance:0.3, quantity:2 },
      { itemId:'potion_mp_med',  chance:0.30, quantity:1 }
    ]
  },
  spider_frost: {
    id:'spider_frost', name:'Морозный паук', sprite:'SPIDER_ICE',
    level:35, type:'beast', zone:'peaks', sub:'caves',
    hp:899, atk:156, def:38, spd:22, eva:22,
    exp:295, gold:82,
    skill:'beast_poison',
    lore:'Плетёт лёд вместо паутины. Жертвы замерзают в её сетях.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 },
      { itemId:'mat_dust',    chance:0.3, quantity:1 }
    ]
  },

  // --- Замёрзший храм (ур. 35-37) — элита ---
  giant_frost: {
    id:'giant_frost', name:'Ледяной великан', sprite:'GIANT_ICE',
    level:37, type:'giant', zone:'peaks', sub:'temple_ice',
    hp:3240, atk:312, def:110, spd:12, eva:8,
    exp:4200, gold:1200,
    skill:'elemental_avalanche',
    lore:'Ледяной великан. Стоял здесь, когда эти пики были зелёными холмами. Помнит.',
    aiProfile:'elite',
    loot:[
      { itemId:'hammer_rune',   chance:0.005, quantity:1 },
      { itemId:'chest_steel',   chance:0.005, quantity:1 },
      { itemId:'legs_steel',    chance:0.005, quantity:1 },
      { itemId:'mat_dust',      chance:0.3, quantity:5 }
    ]
  },
  priest_ice: {
    id:'priest_ice', name:'Жрец Вечных Льдов', sprite:'PRIEST_ICE',
    level:36, type:'humanoid', zone:'peaks', sub:'temple_ice',
    hp:923, atk:159, def:46, spd:14, eva:10,
    exp:303, gold:95,
    skill:'humanoid_curse',
    lore:'Служит Нирне. Поёт ей гимны. Дыхание превращается в лёд. Она этого не замечает.',
    aiProfile:'trash',
    loot:[
      { itemId:'staff_crystal', chance:0.005, quantity:1 },
      { itemId:'potion_mp_large', chance:0.25, quantity:1 }
    ]
  },

  // --- БОСС ЗОНЫ 6 ---
  wyrm_frost: {
    id:'wyrm_frost', name:'Ледяной Вирм', sprite:'WYRM_ICE',
    level:40, type:'dragon', zone:'peaks', sub:'lair',
    hp:16200, atk:390, def:150, spd:17, eva:10,
    exp:75000, gold:6000,
    skill:'boss_strike',
    isBoss:true,
    skills:['dragon_breath_ice','dragon_wing_storm'],
    lore:'Создан Нирной из её слёз. Спит на сокровищах тех, кто пытался его убить. Их кости видны из-под льда.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['wolf_ice','golem_ice'],
    loot:[
      { itemId:'staff_elder',    chance:0.03, quantity:1 },
      { itemId:'chest_steel',    chance:0.005, quantity:1 },
      { itemId:'helm_steel',     chance:0.005, quantity:1 },
      { itemId:'cloak_mist',     chance:0.03, quantity:1 },
      { itemId:'potion_hp_large', chance:1.00, quantity:6 },
      { itemId:'shard_3',        chance:0.05, quantity:1 },
      { itemId:'mat_dust',       chance:0.3, quantity:10 }
    ]
  },

  // ================= ЗОНА 7: КУЗНИ ГРАННА =================

  // --- Кузнечные залы (ур. 34-37) ---
  smith_mad: {
    id:'smith_mad', name:'Безумный кузнец', sprite:'SMITH',
    level:34, type:'humanoid', zone:'forges', sub:'halls',
    hp:874, atk:150, def:52, spd:12, eva:6,
    exp:287, gold:120,
    skill:'humanoid_cleave',
    lore:'Кузнец, что пережил падение своего клана. Куёт молот, которым убьёт убийц. Молот уже больше него.',
    aiProfile:'trash',
    loot:[
      { itemId:'hammer_war',   chance:0.15, quantity:1 },
      { itemId:'mat_mithril',  chance:0.30, quantity:2 }
    ]
  },
  golem_magma: {
    id:'golem_magma', name:'Магмовый голем', sprite:'GOLEM_MAGMA',
    level:36, type:'elemental', zone:'forges', sub:'halls',
    hp:923, atk:159, def:62, spd:8, eva:4,
    exp:303, gold:135,
    skill:'elemental_burn',
    lore:'Собран из лавы и обещаний. Обещаний, что огонь согреет. Огонь не согрел.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_mithril', chance:0.3, quantity:3 },
      { itemId:'mat_dust',    chance:0.3, quantity:1 }
    ]
  },
  dog_hell: {
    id:'dog_hell', name:'Огненный пёс', sprite:'DOG_HELL',
    level:37, type:'beast', zone:'forges', sub:'halls',
    hp:947, atk:163, def:44, spd:20, eva:16,
    exp:311, gold:100,
    skill:'beast_burn',
    lore:'Пёс, что прыгнул в печь за хозяином. Хозяин сгорел. Пёс — нет. Пёс стал печью.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 },
      { itemId:'potion_hp_large', chance:0.15, quantity:1 }
    ]
  },

  // --- Печи (ур. 38-40) ---
  construct_iron: {
    id:'construct_iron', name:'Железный конструкт', sprite:'CONSTRUCT',
    level:38, type:'elemental', zone:'forges', sub:'furnace',
    hp:972, atk:167, def:76, spd:10, eva:4,
    exp:319, gold:140,
    skill:'elemental_smash',
    lore:'Собран из тел павших кузнецов. Работает до сих пор. Не помнит, зачем начал.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_mithril',  chance:0.3, quantity:3 },
      { itemId:'mat_dust',     chance:0.3, quantity:1 }
    ]
  },
  elemental_fire: {
    id:'elemental_fire', name:'Дух Огня', sprite:'ELEM_FIRE',
    level:39, type:'elemental', zone:'forges', sub:'furnace',
    hp:996, atk:171, def:50, spd:22, eva:20,
    exp:327, gold:150,
    skill:'elemental_burn',
    lore:'Огонь без хозяина. Свободный. Голодный.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_dust', chance:0.3, quantity:2 }
    ]
  },
  traitor_grann: {
    id:'traitor_grann', name:'Гранн-предатель', sprite:'DWARF_TRAITOR',
    level:40, type:'humanoid', zone:'forges', sub:'furnace',
    hp:1020, atk:175, def:56, spd:13, eva:8,
    exp:335, gold:200,
    skill:'humanoid_cleave',
    lore:'Он из Гранн. Продал клан за одну жилу. Жила была пустой. Клан — мёртв.',
    aiProfile:'trash',
    loot:[
      { itemId:'hammer_rune',   chance:0.005, quantity:1 },
      { itemId:'belt_iron',     chance:0.10, quantity:1 },
      { itemId:'mat_mithril',   chance:0.3, quantity:2 }
    ]
  },

  // --- Тайная кузня (ур. 41-42) — элита ---
  master_smith: {
    id:'master_smith', name:'Мастер-Кузнец Хрод', sprite:'MASTER_SMITH',
    level:42, type:'humanoid', zone:'forges', sub:'secret',
    hp:3888, atk:377, def:130, spd:15, eva:10,
    exp:5500, gold:1800,
    skill:'humanoid_rune_smash',
    lore:'Кузнец-предатель. Убивал своих. Куёт оружие, которым убивают его бывших.',
    aiProfile:'elite',
    loot:[
      { itemId:'hammer_rune',   chance:0.005, quantity:1 },
      { itemId:'chest_runed',   chance:0.005, quantity:1 },
      { itemId:'helm_steel',    chance:0.005, quantity:1 },
      { itemId:'mat_mithril',   chance:0.3, quantity:8 }
    ]
  },
  guard_rune: {
    id:'guard_rune', name:'Рунный страж', sprite:'RUNE_GUARD',
    level:41, type:'elemental', zone:'forges', sub:'secret',
    hp:1044, atk:179, def:82, spd:11, eva:6,
    exp:343, gold:180,
    skill:'elemental_smash',
    lore:'Рунный страж. Стоит здесь, когда Хрод ещё был человеком. Остался, когда Хрод перестал им быть.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_mithril', chance:0.3, quantity:3 }
    ]
  },

  // --- БОСС ЗОНЫ 7 ---
  forge_titan: {
    id:'forge_titan', name:'Титан Кузни', sprite:'FORGE_TITAN',
    level:46, type:'elemental', zone:'forges', sub:'heart',
    hp:21600, atk:494, def:200, spd:13, eva:8,
    exp:110000, gold:9000,
    skill:'boss_strike',
    isBoss:true,
    skills:['elemental_meteor','elemental_inferno_ring'],
    lore:'Титан Кузни. Не живое и не мёртвое. Огонь, что жжёт триста лет. Никто не знает, чем его потушить.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['golem_magma','elemental_fire','construct_iron'],
    loot:[
      { itemId:'hammer_elder',   chance:0.03, quantity:1 },
      { itemId:'chest_runed',    chance:0.005, quantity:1 },
      { itemId:'legs_runed',     chance:0.005, quantity:1 },
      { itemId:'helm_runed',     chance:0.005, quantity:1 },
      { itemId:'ring_ruby',      chance:0.60, quantity:1 },
      { itemId:'potion_hp_large',chance:1.00, quantity:8 },
      { itemId:'shard_4',        chance:0.05, quantity:1 },
      { itemId:'mat_mithril',    chance:0.3, quantity:15 }
    ]
  },

  // ================= ЗОНА 8: ТОПИ МОРА =================

  // --- Гнилые болота (ур. 40-43) ---
  slug_giant: {
    id:'slug_giant', name:'Гигантский слизень', sprite:'SLUG',
    level:40, type:'beast', zone:'swamp', sub:'rot',
    hp:1020, atk:175, def:64, spd:10, eva:6,
    exp:335, gold:130,
    skill:'beast_poison',
    lore:'Гигантский слизень. Двигается медленно. Жрёт всё на пути. Два качества.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 },
      { itemId:'mat_dust',    chance:0.3, quantity:1 }
    ]
  },
  toad_venom: {
    id:'toad_venom', name:'Ядовитая жаба', sprite:'TOAD',
    level:41, type:'beast', zone:'swamp', sub:'rot',
    hp:1044, atk:179, def:58, spd:12, eva:8,
    exp:343, gold:135,
    skill:'beast_poison',
    lore:'Жаба. Каждое её касание — яд. Она даже дышит ядом. Никто не знает, зачем.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 },
      { itemId:'mat_dust',    chance:0.3, quantity:1 }
    ]
  },
  cultist_mora: {
    id:'cultist_mora', name:'Культист Мора', sprite:'CULTIST',
    level:42, type:'humanoid', zone:'swamp', sub:'rot',
    hp:1069, atk:183, def:54, spd:14, eva:10,
    exp:351, gold:180,
    skill:'humanoid_curse',
    lore:'Культист Мора. Молится топям. Топи отвечают — но не словами.',
    aiProfile:'trash',
    loot:[
      { itemId:'staff_crystal', chance:0.005, quantity:1 },
      { itemId:'amulet_bone',   chance:0.10, quantity:1 },
      { itemId:'mat_essence',   chance:0.3, quantity:2 }
    ]
  },

  // --- Гниющие развалины (ур. 43-46) ---
  zombie_swamp: {
    id:'zombie_swamp', name:'Болотный зомби', sprite:'ZOMBIE',
    level:43, type:'undead', zone:'swamp', sub:'ruins_swamp',
    hp:1093, atk:187, def:52, spd:8, eva:4,
    exp:359, gold:145,
    skill:'undead_chill',
    lore:'Болотный зомби. Помнит, что был человеком. Не помнит, кем именно.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 },
      { itemId:'potion_hp_med', chance:0.20, quantity:1 }
    ]
  },
  witch_swamp: {
    id:'witch_swamp', name:'Болотная ведьма', sprite:'WITCH',
    level:45, type:'humanoid', zone:'swamp', sub:'ruins_swamp',
    hp:1142, atk:195, def:56, spd:15, eva:12,
    exp:375, gold:220,
    skill:'humanoid_curse',
    lore:'Ведьма, что пила из Топей. Топи пили из неё в ответ. Теперь не различить, кто из них кто.',
    aiProfile:'trash',
    loot:[
      { itemId:'staff_crystal',  chance:0.005, quantity:1 },
      { itemId:'amulet_sapphire',chance:0.10, quantity:1 },
      { itemId:'mat_dust',       chance:0.30, quantity:2 }
    ]
  },
  lizard_warrior: {
    id:'lizard_warrior', name:'Ящер-воин', sprite:'LIZARD',
    level:46, type:'humanoid', zone:'swamp', sub:'ruins_swamp',
    hp:1166, atk:198, def:64, spd:16, eva:12,
    exp:383, gold:200,
    skill:'humanoid_pierce',
    lore:'Ящер-воин. Пришёл из мира, которого больше нет. Сражается за право остаться.',
    aiProfile:'trash',
    loot:[
      { itemId:'spear_guard',   chance:0.12, quantity:1 },
      { itemId:'chest_steel',   chance:0.005, quantity:1 },
      { itemId:'mat_thick_hide',chance:0.3, quantity:2 }
    ]
  },

  // --- Сердце Топей (ур. 46-48) — элита ---
  broodmother: {
    id:'broodmother', name:'Матка Мора', sprite:'BROODMOTHER',
    level:48, type:'beast', zone:'swamp', sub:'heart_swamp',
    hp:5130, atk:494, def:160, spd:14, eva:8,
    exp:8000, gold:2800,
    skill:'beast_spawn',
    lore:'Матка Мора. Рожает новых тварей каждый час. Три сотни лет. Она устала. Она не может остановиться.',
    aiProfile:'elite',
    loot:[
      { itemId:'belt_giant',     chance:0.03, quantity:1 },
      { itemId:'cloak_storm',    chance:0.03, quantity:1 },
      { itemId:'ring_star',      chance:0.03, quantity:1 },
      { itemId:'mat_dust',       chance:0.3, quantity:10 }
    ]
  },
  spawn_mora: {
    id:'spawn_mora', name:'Порождение Мора', sprite:'SPAWN',
    level:45, type:'beast', zone:'swamp', sub:'heart_swamp',
    hp:1142, atk:195, def:48, spd:18, eva:14,
    exp:375, gold:120,
    skill:'beast_bite',
    lore:'Порождение Мора. Живёт час. Умирает. Возвращается. Помнит только боль.',
    aiProfile:'trash',
    loot:[
      { itemId:'mat_essence', chance:0.3, quantity:2 }
    ]
  },

  // --- БОСС ЗОНЫ 8 ---
  mora_avatar: {
    id:'mora_avatar', name:'Аватар Мора', sprite:'MORA_BOSS',
    level:52, type:'beast', zone:'swamp', sub:'abyss_swamp',
    hp:29700, atk:650, def:260, spd:15, eva:10,
    exp:180000, gold:15000,
    skill:'boss_strike',
    isBoss:true,
    skills:['beast_plague','elemental_poison_nova'],
    lore:'Аватар Мора. Остаток осколка Бездны, что упал на Вейлан при Расколе. Кричит без звука триста лет.',
    aiProfile:'boss',
    phases:[
      { hpAbove:0.70, pattern:'debuff' },
      { hpAbove:0.30, pattern:'heavy' },
      { hpAbove:0.00, pattern:'ult_and_summon' }
    ],
    summons:['spawn_mora','spawn_mora','zombie_swamp'],
    loot:[
      { itemId:'belt_giant',     chance:0.03, quantity:1 },
      { itemId:'cloak_storm',    chance:0.03, quantity:1 },
      { itemId:'ring_star',      chance:0.03, quantity:1 },
      { itemId:'amulet_veilan',  chance:0.03, quantity:1 },
      { itemId:'potion_hp_large',chance:1.00, quantity:10 },
      { itemId:'shard_4',        chance:0.05, quantity:1 },
      { itemId:'mat_dust',       chance:0.3, quantity:20 }
    ]
  }

};

