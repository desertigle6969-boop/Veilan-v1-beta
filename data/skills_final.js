// ============================================================
// ВЕЙЛАН — СКИЛЛЫ ФИНАЛЬНЫХ БОССОВ (Храм Душ)
// Формат как у SKILLS_MOB. Цели всегда 'enemy' (по игроку).
// ============================================================

const SKILLS_FINAL = {

  // ============================================================
  // ТЕТОР — ДЕМОН-ХРАНИТЕЛЬ (Зал 1)
  // ============================================================

  pozhiranie: {
    id:'pozhiranie', name:'Пожирание', desc:'180% урона, лечит Тетора на 30% нанесённого.',
    target:'enemy', type:'phys', power:1.8,
    status:null, special:'drain_30', cooldown:15
  },

  dark_wings: {
    id:'dark_wings', name:'Тёмные крылья', desc:'150% урона + оглушение 30%.',
    target:'enemy', type:'phys', power:1.5,
    status:{id:'stun', chance:0.30, dur:1}, special:null, cooldown:20
  },

  rage_of_turn: {
    id:'rage_of_turn', name:'Ярость Тэрна', desc:'Бафф: +50% атаки, +30% скорости. До конца боя.',
    target:'self', type:'buff', power:0,
    status:null, special:'rage_50_30', cooldown:999, triggerOnLowHp:0.30
  },

  // ============================================================
  // ОЛЬДЕН — МЁРТВЫЙ КОРОЛЬ (Зал 2)
  // ============================================================

  silent_strike: {
    id:'silent_strike', name:'Немой удар', desc:'130% урона. Тихий.',
    target:'enemy', type:'phys', power:1.3,
    status:null, special:null, cooldown:8
  },

  memory_of_friend: {
    id:'memory_of_friend', name:'Воспоминание о дружбе', desc:'Призыв образа Тэрна. Урон 200%.',
    target:'enemy', type:'mag', power:2.0,
    status:null, special:'summon_turn', cooldown:30
  },

  crown_curse: {
    id:'crown_curse', name:'Проклятие короны', desc:'Дебафф: игрок получает +100% урона 10 сек.',
    target:'enemy', type:'debuff', power:0,
    status:{id:'vulnerable', chance:1.0, dur:10}, special:'crown', cooldown:40
  },

  // ============================================================
  // ТЭРН ИСТИННЫЙ — ФИНАЛЬНЫЙ БОСС
  // ============================================================

  soul_absorb: {
    id:'soul_absorb', name:'Поглощение душ', desc:'Призыв трёх душ Предтеч. Каждая бьёт 100%.',
    target:'enemy', type:'mag', power:1.0, hits:3,
    status:null, special:'summon_three_souls', cooldown:45
  },

  void_wall: {
    id:'void_wall', name:'Стена Бездны', desc:'Тюрьма 10 сек. 80% урона каждый ход.',
    target:'enemy', type:'mag', power:0.8,
    status:{id:'void_wall', chance:1.0, dur:10}, special:'trap', cooldown:60
  },

  time_rift: {
    id:'time_rift', name:'Разлом времени', desc:'Сцены из прошлого. -30% урона игрока на 15 сек.',
    target:'enemy', type:'mag', power:0,
    status:{id:'weakened', chance:1.0, dur:15}, special:'time_scenes', cooldown:50
  },

  sword_scream: {
    id:'sword_scream', name:'Крик меча', desc:'Оглушение 5 сек. + урон 200%.',
    target:'enemy', type:'mag', power:2.0,
    status:{id:'stun', chance:1.0, dur:5}, special:'four_skulls_scream', cooldown:90, triggerOnLowHp:0.40
  },

  abyss_rage: {
    id:'abyss_rage', name:'Ярость Бездны', desc:'Бафф: +100% атаки, +50% скорости. До конца боя.',
    target:'self', type:'buff', power:0,
    status:null, special:'rage_100_50', cooldown:999, triggerOnLowHp:0.15
  }

};

window.SKILLS_FINAL = SKILLS_FINAL;
console.log('[skills_final] загружено: ' + Object.keys(SKILLS_FINAL).length + ' скиллов');
