// ============================================================
// ВЕЙЛАН — СКИЛЛЫ МОБОВ
// Используются в бою. Формат как у скиллов игрока,
// но цели всегда 'enemy' (по игроку).
// ============================================================

const SKILLS_MOB = {

  // ========== БАЗОВЫЕ ПО ТИПАМ ==========
  beast_bite: {
    id:'beast_bite', name:'Укус', desc:'Базовый укус зверя.',
    target:'enemy', type:'phys', power:1.0,
    status:null, special:null
  },
  beast_tear: {
    id:'beast_tear', name:'Разрыв', desc:'140% урона + кровотечение 3 хода.',
    target:'enemy', type:'phys', power:1.4,
    status:{id:'bleed', chance:0.7, dur:3}, special:null
  },
  beast_poison: {
    id:'beast_poison', name:'Ядовитый укус', desc:'100% урона + яд 4 хода.',
    target:'enemy', type:'phys', power:1.0,
    status:{id:'poison', chance:0.9, dur:4}, special:null
  },
  beast_drain: {
    id:'beast_drain', name:'Высасывание', desc:'90% урона, лечит моба на 50% нанесённого.',
    target:'enemy', type:'mag', power:0.9,
    status:null, special:'drain_50'
  },
  beast_crush: {
    id:'beast_crush', name:'Сокрушение', desc:'150% урона.',
    target:'enemy', type:'phys', power:1.5,
    status:null, special:null
  },
  beast_charge: {
    id:'beast_charge', name:'Рывок', desc:'130% урона + оглушение 30%.',
    target:'enemy', type:'phys', power:1.3,
    status:{id:'stun', chance:0.30, dur:1}, special:null
  },
  beast_freeze: {
    id:'beast_freeze', name:'Ледяной укус', desc:'120% урона + заморозка 30%.',
    target:'enemy', type:'mag', power:1.2,
    status:{id:'freeze', chance:0.30, dur:1}, special:null
  },
  beast_shock: {
    id:'beast_shock', name:'Электроудар', desc:'130% урона + шок 2 хода.',
    target:'enemy', type:'mag', power:1.3,
    status:{id:'shock', chance:0.7, dur:2}, special:null
  },
  beast_burn: {
    id:'beast_burn', name:'Обжигающий укус', desc:'120% урона + поджог 3 хода.',
    target:'enemy', type:'mag', power:1.2,
    status:{id:'burn', chance:0.8, dur:3}, special:null
  },
  beast_dive: {
    id:'beast_dive', name:'Пикирование', desc:'160% урона.',
    target:'enemy', type:'phys', power:1.6,
    status:null, special:null
  },
  beast_tidal: {
    id:'beast_tidal', name:'Волна', desc:'170% урона по одной цели + 80% по остальным.',
    target:'all_enemy', type:'mag', power:1.7,
    status:null, special:'aoe_split'
  },
  beast_plague: {
    id:'beast_plague', name:'Чума', desc:'150% урона + яд 5 ходов всем.',
    target:'all_enemy', type:'mag', power:1.5,
    status:{id:'poison', chance:1.0, dur:5}, special:null
  },
  beast_spawn: {
    id:'beast_spawn', name:'Порождение', desc:'Призывает 2 порождения на 3 хода.',
    target:'self', type:'summon', power:0,
    status:null, special:'summon_spawn_mora'
  },

  // ========== ГУМАНОИДЫ ==========
  humanoid_strike: {
    id:'humanoid_strike', name:'Точный удар', desc:'110% урона, игнор 20% брони.',
    target:'enemy', type:'phys', power:1.1,
    status:null, special:'ignore_def_20'
  },
  humanoid_cleave: {
    id:'humanoid_cleave', name:'Рассекающий удар', desc:'150% урона.',
    target:'enemy', type:'phys', power:1.5,
    status:null, special:null
  },
  humanoid_pierce: {
    id:'humanoid_pierce', name:'Пробивающий удар', desc:'130% урона, игнор 40% брони.',
    target:'enemy', type:'phys', power:1.3,
    status:null, special:'ignore_def_40'
  },
  humanoid_curse: {
    id:'humanoid_curse', name:'Проклятие', desc:'-25% ATK игроку на 3 хода + 100% маг. урона.',
    target:'enemy', type:'mag', power:1.0,
    status:{id:'atk_down', chance:0.8, dur:3}, special:null
  },
  humanoid_holy: {
    id:'humanoid_holy', name:'Святой удар', desc:'140% маг. урона.',
    target:'enemy', type:'mag', power:1.4,
    status:null, special:null
  },
  humanoid_rune_smash: {
    id:'humanoid_rune_smash', name:'Рунный удар', desc:'160% урона + оглушение 40%.',
    target:'enemy', type:'phys', power:1.6,
    status:{id:'stun', chance:0.40, dur:1}, special:null
  },
  humanoid_lightning_shot: {
    id:'humanoid_lightning_shot', name:'Грозовой выстрел', desc:'130% урона + шок.',
    target:'enemy', type:'mag', power:1.3,
    status:{id:'shock', chance:0.6, dur:2}, special:null
  },
  humanoid_arcane_burst: {
    id:'humanoid_arcane_burst', name:'Магический взрыв', desc:'150% маг. урона всем.',
    target:'all_enemy', type:'mag', power:1.5,
    status:null, special:null
  },
  humanoid_dark_cleave: {
    id:'humanoid_dark_cleave', name:'Тёмное рассечение', desc:'180% урона.',
    target:'enemy', type:'phys', power:1.8,
    status:null, special:null
  },

  // ========== НЕЖИТЬ ==========
  undead_chill: {
    id:'undead_chill', name:'Могильный холод', desc:'100% урона + замедление (SPD -30%) 3 хода.',
    target:'enemy', type:'mag', power:1.0,
    status:{id:'slow', chance:0.9, dur:3}, special:null
  },
  undead_drain: {
    id:'undead_drain', name:'Похищение души', desc:'110% урона, лечит моба на 60% нанесённого.',
    target:'enemy', type:'mag', power:1.1,
    status:null, special:'drain_60'
  },
  undead_fire: {
    id:'undead_fire', name:'Могильный огонь', desc:'130% урона + поджог 2 хода.',
    target:'enemy', type:'mag', power:1.3,
    status:{id:'burn', chance:0.7, dur:2}, special:null
  },
  undead_royal_strike: {
    id:'undead_royal_strike', name:'Королевский удар', desc:'170% урона, игнор 50% брони.',
    target:'enemy', type:'mag', power:1.7,
    status:null, special:'ignore_def_50'
  },
  undead_cleave: {
    id:'undead_cleave', name:'Могильный разрез', desc:'160% урона всем.',
    target:'all_enemy', type:'phys', power:1.6,
    status:null, special:null
  },
  undead_summon_army: {
    id:'undead_summon_army', name:'Зов мёртвых', desc:'Призывает 3 скелета на 3 хода.',
    target:'self', type:'summon', power:0,
    status:null, special:'summon_skeletons'
  },

  // ========== ЭЛЕМЕНТАЛИ ==========
  elemental_smash: {
    id:'elemental_smash', name:'Удар стихии', desc:'140% урона.',
    target:'enemy', type:'mag', power:1.4,
    status:null, special:null
  },
  elemental_quake: {
    id:'elemental_quake', name:'Землетрясение', desc:'170% урона всем.',
    target:'all_enemy', type:'mag', power:1.7,
    status:null, special:null
  },
  elemental_burn: {
    id:'elemental_burn', name:'Вспышка огня', desc:'130% урона + поджог 4 хода.',
    target:'enemy', type:'mag', power:1.3,
    status:{id:'burn', chance:1.0, dur:4}, special:null
  },
  elemental_freeze: {
    id:'elemental_freeze', name:'Ледяная хватка', desc:'120% урона + заморозка 50%.',
    target:'enemy', type:'mag', power:1.2,
    status:{id:'freeze', chance:0.50, dur:1}, special:null
  },
  elemental_poison: {
    id:'elemental_poison', name:'Отравление', desc:'100% урона + яд 5 ходов.',
    target:'enemy', type:'mag', power:1.0,
    status:{id:'poison', chance:1.0, dur:5}, special:null
  },
  elemental_gust: {
    id:'elemental_gust', name:'Порыв ветра', desc:'120% урона + 30% уклонения себе на 2 хода.',
    target:'enemy', type:'mag', power:1.2,
    status:null, special:'self_eva_buff'
  },
  elemental_tornado: {
    id:'elemental_tornado', name:'Смерч', desc:'150% урона всем + шок.',
    target:'all_enemy', type:'mag', power:1.5,
    status:{id:'shock', chance:0.5, dur:2}, special:null
  },
  elemental_shock: {
    id:'elemental_shock', name:'Электрический разряд', desc:'130% урона + шок 3 хода.',
    target:'enemy', type:'mag', power:1.3,
    status:{id:'shock', chance:1.0, dur:3}, special:null
  },
  elemental_chain_lightning: {
    id:'elemental_chain_lightning', name:'Цепная молния', desc:'200% урона + шок всем.',
    target:'all_enemy', type:'mag', power:2.0,
    status:{id:'shock', chance:0.8, dur:3}, special:null
  },
  elemental_avalanche: {
    id:'elemental_avalanche', name:'Лавина', desc:'180% урона + заморозка 50%.',
    target:'all_enemy', type:'mag', power:1.8,
    status:{id:'freeze', chance:0.5, dur:1}, special:null
  },
  elemental_meteor: {
    id:'elemental_meteor', name:'Метеор', desc:'220% урона одной цели + 100% остальным.',
    target:'all_enemy', type:'mag', power:2.2,
    status:null, special:'aoe_split'
  },
  elemental_inferno_ring: {
    id:'elemental_inferno_ring', name:'Кольцо Инферно', desc:'250% урона + поджог 5 ходов всем.',
    target:'all_enemy', type:'mag', power:2.5,
    status:{id:'burn', chance:1.0, dur:5}, special:null
  },
  elemental_tsunami: {
    id:'elemental_tsunami', name:'Цунами', desc:'200% урона всем + замедление.',
    target:'all_enemy', type:'mag', power:2.0,
    status:{id:'slow', chance:1.0, dur:3}, special:null
  },
  elemental_poison_nova: {
    id:'elemental_poison_nova', name:'Ядовитая нова', desc:'180% урона + яд 6 ходов всем.',
    target:'all_enemy', type:'mag', power:1.8,
    status:{id:'poison', chance:1.0, dur:6}, special:null
  },
  elemental_holy_smash: {
    id:'elemental_holy_smash', name:'Священный удар', desc:'160% урона.',
    target:'enemy', type:'mag', power:1.6,
    status:null, special:null
  },
  elemental_holy_judgment: {
    id:'elemental_holy_judgment', name:'Суд Света', desc:'250% урона всем.',
    target:'all_enemy', type:'mag', power:2.5,
    status:null, special:null
  },
  elemental_storm_judgment: {
    id:'elemental_storm_judgment', name:'Громовой Суд', desc:'УЛЬТ. 300% урона всем + шок.',
    target:'all_enemy', type:'mag', power:3.0,
    status:{id:'shock', chance:1.0, dur:3}, special:'ult'
  },
  elemental_thunder_pillar: {
    id:'elemental_thunder_pillar', name:'Столб Грома', desc:'250% урона одной цели.',
    target:'enemy', type:'mag', power:2.5,
    status:null, special:null
  },

  // ========== КОНСТРУКТЫ ==========
  construct_slam: {
    id:'construct_slam', name:'Удар конструкта', desc:'140% урона + оглушение 30%.',
    target:'enemy', type:'phys', power:1.4,
    status:{id:'stun', chance:0.30, dur:1}, special:null
  },
  construct_barrage: {
    id:'construct_barrage', name:'Залп', desc:'3 удара по 70% всем.',
    target:'all_enemy', type:'mag', power:0.7, hits:3,
    status:null, special:null
  },
  construct_quake: {
    id:'construct_quake', name:'Ударная волна', desc:'180% урона всем + оглушение 40%.',
    target:'all_enemy', type:'phys', power:1.8,
    status:{id:'stun', chance:0.40, dur:1}, special:null
  },
  construct_balance: {
    id:'construct_balance', name:'Равновесие', desc:'140% урона + снимает 1 дебафф с себя.',
    target:'enemy', type:'mag', power:1.4,
    status:null, special:'self_cleanse_1'
  },
  construct_annihilate: {
    id:'construct_annihilate', name:'Аннигиляция', desc:'220% урона одной цели + 80% остальным.',
    target:'all_enemy', type:'mag', power:2.2,
    status:null, special:'aoe_split'
  },
  construct_final_judgment: {
    id:'construct_final_judgment', name:'Финальный Суд', desc:'УЛЬТ. 350% урона всем.',
    target:'all_enemy', type:'mag', power:3.5,
    status:null, special:'ult'
  },
  construct_dark_apocalypse: {
    id:'construct_dark_apocalypse', name:'Тёмный Апокалипсис', desc:'УЛЬТ. 400% урона всем + поджог + яд.',
    target:'all_enemy', type:'mag', power:4.0,
    status:{id:'burn', chance:1.0, dur:5}, special:'ult'
  },
  construct_world_breaker: {
    id:'construct_world_breaker', name:'Разрушитель Миров', desc:'УЛЬТ. 500% урона всем.',
    target:'all_enemy', type:'mag', power:5.0,
    status:null, special:'ult'
  },
  construct_void_incarnate: {
    id:'construct_void_incarnate', name:'Воплощение Пустоты', desc:'УЛЬТ. 600% урона всем + отнимает 50% MP.',
    target:'all_enemy', type:'mag', power:6.0,
    status:null, special:'ult_mp_burn'
  },

  // ========== БЕЗДНА ==========
  abyss_devour: {
    id:'abyss_devour', name:'Пожирание', desc:'130% урона, лечит моба на 70%.',
    target:'enemy', type:'mag', power:1.3,
    status:null, special:'drain_70'
  },
  abyss_drain: {
    id:'abyss_drain', name:'Выкачивание', desc:'120% урона + снижает MP игрока на 20%.',
    target:'enemy', type:'mag', power:1.2,
    status:null, special:'mp_drain_20'
  },
  abyss_smash: {
    id:'abyss_smash', name:'Удар Бездны', desc:'160% урона.',
    target:'enemy', type:'mag', power:1.6,
    status:null, special:null
  },
  abyss_mind_crush: {
    id:'abyss_mind_crush', name:'Разрыв разума', desc:'150% урона + -30% точности 3 хода.',
    target:'enemy', type:'mag', power:1.5,
    status:{id:'blind', chance:0.8, dur:3}, special:null
  },
  abyss_cleave: {
    id:'abyss_cleave', name:'Тёмное рассечение', desc:'170% урона.',
    target:'enemy', type:'phys', power:1.7,
    status:null, special:null
  },
  abyss_quake: {
    id:'abyss_quake', name:'Разлом', desc:'200% урона всем.',
    target:'all_enemy', type:'mag', power:2.0,
    status:null, special:null
  },
  abyss_curse: {
    id:'abyss_curse', name:'Проклятие Бездны', desc:'140% урона + -30% защиты 3 хода.',
    target:'enemy', type:'mag', power:1.4,
    status:{id:'def_down', chance:0.9, dur:3}, special:null
  },
  abyss_dark_smash: {
    id:'abyss_dark_smash', name:'Тёмный удар', desc:'160% урона.',
    target:'enemy', type:'mag', power:1.6,
    status:null, special:null
  },
  abyss_dark_judgment: {
    id:'abyss_dark_judgment', name:'Тёмный Суд', desc:'250% урона всем.',
    target:'all_enemy', type:'mag', power:2.5,
    status:null, special:null
  },
  abyss_consume: {
    id:'abyss_consume', name:'Поглощение', desc:'200% урона, лечит моба на 80%.',
    target:'enemy', type:'mag', power:2.0,
    status:null, special:'drain_80'
  },
  abyss_annihilation: {
    id:'abyss_annihilation', name:'Аннигиляция Бездны', desc:'УЛЬТ. 400% урона всем + яд 5 ходов.',
    target:'all_enemy', type:'mag', power:4.0,
    status:{id:'poison', chance:1.0, dur:5}, special:'ult'
  },
  abyss_swallow_all: {
    id:'abyss_swallow_all', name:'Поглотить Всё', desc:'УЛЬТ. 500% урона + лечит моба на 100% нанесённого.',
    target:'all_enemy', type:'mag', power:5.0,
    status:null, special:'ult'
  },

  // ========== ОСОБЫЕ (боссы) ==========
  beast_bite_boss: {
    id:'beast_bite_boss', name:'Смертельный укус', desc:'180% урона + кровотечение 5 ходов.',
    target:'enemy', type:'phys', power:1.8,
    status:{id:'bleed', chance:1.0, dur:5}, special:null
  },
  boss_strike: {
    id:'boss_strike', name:'Удар Босса', desc:'Базовый удар босса, 200% урона.',
    target:'enemy', type:'phys', power:2.0,
    status:null, special:null
  },
  plant_root: {
    id:'plant_root', name:'Корни', desc:'100% урона + обездвиживание 1 ход.',
    target:'enemy', type:'mag', power:1.0,
    status:{id:'root', chance:0.7, dur:1}, special:null
  },
  plant_wrath: {
    id:'plant_wrath', name:'Гнев Природы', desc:'УЛЬТ. 300% урона всем.',
    target:'all_enemy', type:'mag', power:3.0,
    status:null, special:'ult'
  },
  plant_regen: {
    id:'plant_regen', name:'Регенерация', desc:'Восстанавливает боссу 30% HP.',
    target:'self', type:'heal', power:0.30,
    status:null, special:null
  },
  dragon_breath_ice: {
    id:'dragon_breath_ice', name:'Ледяное Дыхание', desc:'УЛЬТ. 350% урона всем + заморозка 50%.',
    target:'all_enemy', type:'mag', power:3.5,
    status:{id:'freeze', chance:0.5, dur:2}, special:'ult'
  },
  dragon_wing_storm: {
    id:'dragon_wing_storm', name:'Взмах Крыла', desc:'250% урона всем + отброс (оглушение 1 ход).',
    target:'all_enemy', type:'phys', power:2.5,
    status:{id:'stun', chance:0.6, dur:1}, special:null
  },
  dragon_breath_lightning: {
    id:'dragon_breath_lightning', name:'Грозовой вздох', desc:'180% урона + шок 3 хода.',
    target:'enemy', type:'mag', power:1.8,
    status:{id:'shock', chance:1.0, dur:3}, special:null
  }

};

function getMobSkill(id) { return SKILLS_MOB[id] || null; }

// ============================================================
// ОБЪЕДИНЕНИЕ С ФИНАЛЬНЫМИ СКИЛЛАМИ БОССОВ
// ============================================================
if (window.SKILLS_FINAL) {
  Object.assign(SKILLS_MOB, SKILLS_FINAL);
}

window.SKILLS_MOB = SKILLS_MOB;
