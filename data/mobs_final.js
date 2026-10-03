// ============================================================
// ВЕЙЛАН — ФИНАЛЬНЫЕ МОБЫ (Храм Душ)
// Зал 1: Тетор. Зал 2: Ольден. Коридор: треш. Трон: Тэрн.
// ============================================================

const MOBS_FINAL = {

  // ============================================================
  // ЗАЛ 1 — ТЕТОР, ДЕМОН-ХРАНИТЕЛЬ ПЕРВОГО КЛЮЧА
  // ============================================================
  tetor_demon: {
    id:'tetor_demon', name:'Тетор', sprite:'TETOR_DEMON',
    level:55, type:'demon', zone:'heart', sub:'threshold',
    hp:25000, atk:180, def:95, spd:22, eva:18,
    exp:25000, gold:5000,
    skills:['pоzhiranie', 'dark_wings', 'rage_of_turn'],
    lore:'Тетор был первым Предтечей, которого съел Тэрн. Триста лет назад. Он был охотником. Он любил лес. Он любил жену. Тэрн забрал его. Но Тетор не умер — он стал частью. И вот теперь он здесь, сторож первого ключа. Он помнит, кем был. И ненавидит себя за то, что стал.',
    aiProfile:'boss',
    isBoss:true,
    loot:[
      { itemId:'blade_tetor',       chance:1.0, quantity:1 },
      { itemId:'ring_tetor_hunt',   chance:1.0, quantity:1 },
      { itemId:'shard_tetor_horn',  chance:1.0, quantity:1 },
      { itemId:'essence_void',      chance:1.0, quantity:5 },
      { itemId:'key_first',         chance:1.0, quantity:1 }
    ]
  },

  // ============================================================
  // ЗАЛ 2 — МЁРТВЫЙ ОЛЬДЕН, ВТОРОЙ КЛЮЧ
  // ============================================================
  olden_servant: {
    id:'olden_servant', name:'Мёртвый Ольден', sprite:'OLDEN_SERVANT',
    level:57, type:'undead', zone:'heart', sub:'core',
    hp:30000, atk:200, def:110, spd:18, eva:14,
    exp:32000, gold:6500,
    skills:['silent_strike', 'memory_of_friend', 'crown_curse'],
    lore:'Король Валдорна. Друг Тэрна. Тот, кого ты убил в Руинах — и думал, что освободил. Ты освободил тело. Душу Тэрн оставил себе. Триста лет. Он сидит на троне Храма Душ. Молчит. Рот зашит. Но внутри — он помнит. Он помнит всё.',
    aiProfile:'boss',
    isBoss:true,
    loot:[
      { itemId:'crown_olden',         chance:1.0, quantity:1 },
      { itemId:'sword_olden_memory',  chance:1.0, quantity:1 },
      { itemId:'essence_void',        chance:1.0, quantity:8 },
      { itemId:'key_second',          chance:1.0, quantity:1 }
    ]
  },

  // ============================================================
  // ТРОННЫЙ ЗАЛ — ТЭРН ИСТИННЫЙ, ФИНАЛЬНЫЙ БОСС
  // ============================================================
  turn_true: {
    id:'turn_true', name:'Тэрн Истинный', sprite:'TURN_TRUE',
    level:60, type:'demon', zone:'heart', sub:'core_final',
    hp:200000, atk:260, def:140, spd:20, eva:16,
    exp:80000, gold:15000,
    skills:['soul_absorb', 'void_wall', 'time_rift', 'sword_scream', 'abyss_rage'],
    lore:'Мальчик двенадцати лет, который взял проклятый меч, чтобы контролировать Бездну. Меч взял его вместо. Триста лет. Он не он. Но где-то внутри — тот мальчик ещё есть. Он плачет. Он ждёт, чтобы кто-то пришёл и остановил.',
    aiProfile:'boss',
    isBoss:true,
    loot:[
      { itemId:'shard_of_soulsword',   chance:1.0, quantity:1 },
      { itemId:'turn_sigil_lost',      chance:1.0, quantity:1 },
      { itemId:'ring_of_broken_oath',  chance:1.0, quantity:1 },
      { itemId:'essence_void',         chance:1.0, quantity:20 },
      { itemId:'key_third',            chance:1.0, quantity:1 }
    ]
  },

  // ============================================================
  // ТРЕШ КОРИДОРА ПУСТОТЫ
  // ============================================================

  void_wraith: {
    id:'void_wraith', name:'Призрак Пустоты', sprite:'VOID_WRAITH',
    level:54, type:'undead', zone:'heart', sub:'final',
    hp:3200, atk:120, def:60, spd:26, eva:22,
    exp:1800, gold:280,
    skill:'void_touch',
    lore:'Душа Предтечи, поглощённая Тэрном. Она не ушла. Она кричит. Триста лет.',
    aiProfile:'trash',
    loot:[
      { itemId:'essence_void',   chance:1.0, quantity:1 },
      { itemId:'mat_essence',    chance:0.6, quantity:2 }
    ]
  },

  abyss_crawler: {
    id:'abyss_crawler', name:'Ползун Бездны', sprite:'ABYSS_CRAWLER',
    level:54, type:'aberration', zone:'heart', sub:'final',
    hp:2800, atk:140, def:55, spd:30, eva:20,
    exp:1600, gold:240,
    skill:'abyss_bite',
    lore:'Тварь из Бездны. Пришла, когда Тэрн разломал Завесу. Не ушла. Ей здесь нравится.',
    aiProfile:'trash',
    loot:[
      { itemId:'essence_void',   chance:1.0, quantity:1 },
      { itemId:'mat_dust',       chance:0.4, quantity:1 }
    ]
  },

  shard_colossus: {
    id:'shard_colossus', name:'Осколочный Колосс', sprite:'SHARD_COLOSSUS',
    level:56, type:'construct', zone:'heart', sub:'final',
    hp:6500, atk:170, def:120, spd:12, eva:8,
    exp:2800, gold:420,
    skill:'shard_slam',
    lore:'Осколки мира, сросшиеся в одно. Ходит медленно. Бьёт тяжело.',
    aiProfile:'elite',
    loot:[
      { itemId:'essence_void',   chance:1.0, quantity:2 },
      { itemId:'mat_mithril',    chance:0.5, quantity:2 }
    ]
  },

  void_knight: {
    id:'void_knight', name:'Рыцарь Пустоты', sprite:'VOID_KNIGHT',
    level:56, type:'humanoid', zone:'heart', sub:'final',
    hp:4800, atk:190, def:100, spd:18, eva:16,
    exp:2400, gold:380,
    skill:'void_slash',
    lore:'Страж Тэрна. Один из тех, кто служил ему ещё до Раскола. Остался верен. Даже когда перестал быть человеком.',
    aiProfile:'elite',
    loot:[
      { itemId:'essence_void',   chance:1.0, quantity:2 },
      { itemId:'mat_dust',       chance:0.5, quantity:2 }
    ]
  },

  devourer_lesser: {
    id:'devourer_lesser', name:'Малый Пожиратель', sprite:'DEVOURER_LESSER',
    level:56, type:'aberration', zone:'heart', sub:'final',
    hp:5200, atk:210, def:70, spd:24, eva:18,
    exp:2600, gold:400,
    skill:'devour',
    lore:'Дитя Пожирателя, что стоял у Разлома. Тэрн отпустил его сюда — есть тех, кто доходит. Он ест. Медленно. Как хозяин.',
    aiProfile:'elite',
    loot:[
      { itemId:'essence_void',   chance:1.0, quantity:2 },
      { itemId:'mat_essence',    chance:0.5, quantity:3 }
    ]
  },

  void_priest: {
    id:'void_priest', name:'Жрец Пустоты', sprite:'VOID_PRIEST',
    level:55, type:'humanoid', zone:'heart', sub:'core',
    hp:3600, atk:150, def:75, spd:20, eva:14,
    skill:'void_heal',
    lore:'Жрец, что служил Тэрну. Молится Бездне. Бездна не слышит — но он всё равно молится.',
    aiProfile:'elite',
    loot:[
      { itemId:'essence_void',   chance:1.0, quantity:1 },
      { itemId:'scroll_cleanse', chance:0.4, quantity:1 }
    ]
  },

  thing_unnamed: {
    id:'thing_unnamed', name:'Безымянное', sprite:'THING_UNNAMED',
    level:57, type:'aberration', zone:'heart', sub:'final',
    hp:7200, atk:230, def:90, spd:22, eva:20,
    exp:3400, gold:520,
    skill:'void_grasp',
    lore:'У него нет имени. Тэрн не дал. У него нет лица. Тэрн не дал. У него есть только голод. Тэрн дал.',
    aiProfile:'elite',
    loot:[
      { itemId:'essence_void',   chance:1.0, quantity:3 },
      { itemId:'mat_mithril',    chance:0.4, quantity:2 }
    ]
  }

};

window.MOBS_FINAL = MOBS_FINAL;
console.log('[mobs_final] загружено: ' + Object.keys(MOBS_FINAL).length + ' мобов');
