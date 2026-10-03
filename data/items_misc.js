// ============================================================
// ВЕЙЛАН — АКСЕССУАРЫ, РАСХОДНИКИ, КНИГИ, ОСКОЛКИ, МАТЕРИАЛЫ
// ============================================================

const ITEMS_MISC = {

  // ========== КОЛЬЦА ==========
  ring_copper:    { id:'ring_copper',    name:'Медное кольцо',      desc:'Первый заработок.',                        type:'accessory', slot:'ring1', tier:1, rarity:'common',    stats:{str:1},            levelReq:1,  classReq:[], cost:30,   bonuses:[], sprite:'ring_copper'    },
  ring_silver:    { id:'ring_silver',    name:'Серебряное кольцо',  desc:'С гравировкой из двух слов.',              type:'accessory', slot:'ring1', tier:2, rarity:'uncommon',  stats:{str:2, dex:2},     levelReq:10, classReq:[], cost:220,  bonuses:[], sprite:'ring_silver'    },
  ring_ruby:      { id:'ring_ruby',      name:'Кольцо с рубином',   desc:'Рубин горит чужим огнём.',                 type:'accessory', slot:'ring1', tier:3, rarity:'rare',      stats:{str:4, crit:3},    levelReq:25, classReq:[], cost:950,  bonuses:['fire_dmg_10'], sprite:'ring_ruby'      },
  ring_star:      { id:'ring_star',      name:'Кольцо Звезды',      desc:'Внутри — осколок упавшей звезды.',         type:'accessory', slot:'ring1', tier:4, rarity:'epic',      stats:{str:7, crit:6, wit:4}, levelReq:45, classReq:[], cost:3200, bonuses:['mana_burn_15'], sprite:'ring_star'    },

  // ========== АМУЛЕТЫ ==========
  amulet_wood:    { id:'amulet_wood',    name:'Деревянный оберег',  desc:'От сглаза. Не помогает.',                  type:'accessory', slot:'amulet', tier:1, rarity:'common',    stats:{men:2},            levelReq:1,  classReq:[], cost:35,   bonuses:[], sprite:'amulet_wood'    },
  amulet_bone:    { id:'amulet_bone',    name:'Костяной амулет',    desc:'Чей-то палец. Внука? Врага?',              type:'accessory', slot:'amulet', tier:2, rarity:'uncommon',  stats:{men:4, con:2},     levelReq:10, classReq:[], cost:240,  bonuses:[], sprite:'amulet_bone'    },
  amulet_sapphire:{ id:'amulet_sapphire',name:'Сапфировый амулет',  desc:'Холодный на ощупь. Даже летом.',           type:'accessory', slot:'amulet', tier:3, rarity:'rare',      stats:{men:7, int:5, mp:30}, levelReq:25, classReq:[], cost:1050, bonuses:['mp_regen_15'], sprite:'amulet_sapphire'},
  amulet_veilan:  { id:'amulet_veilan',  name:'Амулет Вейлана',     desc:'Осколок Зари в оправе из серебра.',        type:'accessory', slot:'amulet', tier:4, rarity:'epic',      stats:{men:12, int:10, mp:80, wit:5}, levelReq:45, classReq:[], cost:3400, bonuses:['spell_power_20'], sprite:'amulet_veilan'},

  // ========== ПОЯСА ==========
  belt_rope:      { id:'belt_rope',      name:'Верёвочный пояс',    desc:'Держит штаны. Пока.',                      type:'accessory', slot:'belt', tier:1, rarity:'common',    stats:{con:1},            levelReq:1,  classReq:[], cost:20,   bonuses:[], sprite:'belt_rope'      },
  belt_leather:   { id:'belt_leather',   name:'Кожаный пояс',       desc:'Крепкий. Много карманов.',                 type:'accessory', slot:'belt', tier:2, rarity:'uncommon',  stats:{con:3, str:2},     levelReq:10, classReq:[], cost:200,  bonuses:[], sprite:'belt_leather'   },
  belt_iron:      { id:'belt_iron',      name:'Железный пояс',      desc:'С пряжкой в виде волчьей головы.',         type:'accessory', slot:'belt', tier:3, rarity:'rare',      stats:{con:6, str:4, def:8}, levelReq:25, classReq:[], cost:980, bonuses:['def_flat_10'], sprite:'belt_iron'      },
  belt_giant:     { id:'belt_giant',     name:'Пояс Гиганта',       desc:'Найден в руинах. Слишком велик для тебя.', type:'accessory', slot:'belt', tier:4, rarity:'epic',      stats:{con:12, str:8, def:18, hp:100}, levelReq:45, classReq:[], cost:3300, bonuses:['hp_bonus_15'], sprite:'belt_giant'     },

  // ========== ЗЕЛЬЯ HP ==========
  potion_hp_small:  { id:'potion_hp_small',  name:'Малое зелье HP',  desc:'Восстанавливает 15% HP.',  type:'consumable', stack:20, effect:{hpPct:0.15}, levelReq:1,  cost:25,  rarity:'common',   sprite:'potion_hp_small'  },
  potion_hp_med:    { id:'potion_hp_med',    name:'Среднее зелье HP',desc:'Восстанавливает 35% HP.',  type:'consumable', stack:20, effect:{hpPct:0.35}, levelReq:15, cost:80,  rarity:'uncommon', sprite:'potion_hp_med'    },
  potion_hp_large:  { id:'potion_hp_large',  name:'Большое зелье HP',desc:'Восстанавливает 60% HP.',  type:'consumable', stack:20, effect:{hpPct:0.60}, levelReq:30, cost:220, rarity:'rare',     sprite:'potion_hp_large'  },

  // ========== ЗЕЛЬЯ MP ==========
  potion_mp_small:  { id:'potion_mp_small',  name:'Малое зелье MP',  desc:'Восстанавливает 20% MP.',  type:'consumable', stack:20, effect:{mpPct:0.20}, levelReq:1,  cost:30,  rarity:'common',   sprite:'potion_mp_small'  },
  potion_mp_med:    { id:'potion_mp_med',    name:'Среднее зелье MP',desc:'Восстанавливает 40% MP.',  type:'consumable', stack:20, effect:{mpPct:0.40}, levelReq:15, cost:90,  rarity:'uncommon', sprite:'potion_mp_med'    },
  potion_mp_large:  { id:'potion_mp_large',  name:'Большое зелье MP',desc:'Восстанавливает 70% MP.',  type:'consumable', stack:20, effect:{mpPct:0.70}, levelReq:30, cost:250, rarity:'rare',     sprite:'potion_mp_large'  },

  // ========== ЗЕЛЬЯ SP ==========
  potion_sp_small:  { id:'potion_sp_small',  name:'Малое зелье SP',  desc:'Восстанавливает 30 SP.',   type:'consumable', stack:20, effect:{spFlat:30},  levelReq:1,  cost:40,  rarity:'common',   sprite:'potion_sp_small'  },
  potion_sp_large:  { id:'potion_sp_large',  name:'Большое зелье SP',desc:'Восстанавливает 70 SP.',   type:'consumable', stack:20, effect:{spFlat:70},  levelReq:25, cost:150, rarity:'uncommon', sprite:'potion_sp_large'  },

  // ========== ЕДА ==========
  food_bread:       { id:'food_bread',       name:'Хлеб',            desc:'Восстанавливает 10% HP и MP вне боя.', type:'consumable', stack:30, effect:{hpPct:0.10, mpPct:0.10}, levelReq:1, cost:8,   rarity:'common',   sprite:'food_bread'   },
  food_meat:        { id:'food_meat',        name:'Вяленое мясо',    desc:'Восстанавливает 25% HP вне боя.',      type:'consumable', stack:30, effect:{hpPct:0.25}, levelReq:10, cost:35,  rarity:'common',   sprite:'food_meat'    },
  food_stew:        { id:'food_stew',        name:'Похлёбка',        desc:'Восстанавливает 40% HP и 30% MP вне боя.', type:'consumable', stack:15, effect:{hpPct:0.40, mpPct:0.30}, levelReq:20, cost:120, rarity:'uncommon', sprite:'food_stew' },

  // ========== РУНЫ (магические одноразовые усилители) ==========
  rune_rage:      { id:'rune_rage',      name:'Руна Ярости',    desc:'+30% ATK на следующий бой.',    lore:'Высечена в граните кровью берсерка.', type:'consumable', stack:10, effect:{buffAtk:0.30}, levelReq:10, cost:150, rarity:'uncommon', sprite:'rune_rage'      },
  rune_stone:     { id:'rune_stone',     name:'Руна Камня',     desc:'+30% DEF на следующий бой.',    lore:'Камень не треснет. Камень не сдастся.', type:'consumable', stack:10, effect:{buffDef:0.30}, levelReq:10, cost:150, rarity:'uncommon', sprite:'rune_stone'     },
  rune_wind:      { id:'rune_wind',      name:'Руна Ветра',     desc:'+25% уклонения на бой.',         lore:'Дыши глубже. Ветер подскажет.', type:'consumable', stack:10, effect:{buffEva:0.25}, levelReq:25, cost:280, rarity:'rare',     sprite:'rune_wind'      },
  rune_accuracy:  { id:'rune_accuracy',  name:'Руна Точности',  desc:'+15% крита на бой.',             lore:'Не промахнись. Второго шанса не будет.', type:'consumable', stack:10, effect:{buffCrit:15}, levelReq:15, cost:200, rarity:'uncommon', sprite:'rune_accuracy'  },
  rune_life:      { id:'rune_life',      name:'Руна Жизни',     desc:'+10% регенерации HP/ход на бой.', lore:'Осколок первого ростка Вейлана.', type:'consumable', stack:10, effect:{buffRegen:0.10}, levelReq:30, cost:320, rarity:'rare',     sprite:'rune_life'      },

  // ========== СВИТКИ ==========
  scroll_return:  { id:'scroll_return',  name:'Свиток Возврата',  desc:'Возвращает в последний город.',     lore:'Слова, которые помнят дорогу домой.', type:'consumable', stack:10, effect:{teleport:true}, levelReq:1, cost:60, rarity:'uncommon', sprite:'scroll_return'  },
  scroll_cleanse: { id:'scroll_cleanse', name:'Свиток Очищения', desc:'Снимает все дебаффы.',                lore:'Слова Нирны, которые смывают порчу.', type:'consumable', stack:10, effect:{cleanse:true},  levelReq:15, cost:120, rarity:'uncommon', sprite:'scroll_cleanse' },

  // ========== КНИГИ СКИЛЛОВ ==========
  book_heal_extra:  { id:'book_heal_extra',  name:'Книга: Второе Дыхание', desc:'Изучить скилл: раз в бой восстанавливает 30% HP.', type:'book', skillId:'heal_extra', levelReq:20, cost:2500, rarity:'rare', sprite:'book_heal_extra' },
  book_stun_bash:   { id:'book_stun_bash',   name:'Книга: Оглушающий Удар', desc:'Изучить скилл: 130% урона + оглушение 1 ход.',     type:'book', skillId:'stun_bash',  levelReq:20, cost:2500, rarity:'rare', sprite:'book_stun_bash' },
  book_shield_all:  { id:'book_shield_all',  name:'Книга: Стена Щитов',    desc:'Изучить скилл: щит 20% HP всем союзникам, 3 хода.', type:'book', skillId:'shield_all', levelReq:25, cost:3200, rarity:'rare', sprite:'book_shield_all' },

  // ========== ОСКОЛКИ ЗАРИ ==========
  shard_1: { id:'shard_1', name:'Осколок Зари I',  desc:'Фрагмент разбитого Света. +5% ко всему опыту.', type:'shard', bonus:{expMult:0.05}, levelReq:1,  cost:0, rarity:'legendary', sprite:'shard_1' },
  shard_2: { id:'shard_2', name:'Осколок Зари II', desc:'Пульсирует теплом. +10% к золоту.',             type:'shard', bonus:{goldMult:0.10}, levelReq:15, cost:0, rarity:'legendary', sprite:'shard_2' },
  shard_3: { id:'shard_3', name:'Осколок Зари III',desc:'Шепчет имена. +10% ко всем статам.',            type:'shard', bonus:{statMult:0.10}, levelReq:30, cost:0, rarity:'legendary', sprite:'shard_3' },
  shard_4: { id:'shard_4', name:'Осколок Зари IV', desc:'Горит в глазах. +15% к урону.',                 type:'shard', bonus:{dmgMult:0.15},  levelReq:45, cost:0, rarity:'legendary', sprite:'shard_4' },
  shard_5: { id:'shard_5', name:'Осколок Зари V',  desc:'Голос Предтеч. +20% к HP.',                     type:'shard', bonus:{hpMult:0.20},   levelReq:55, cost:0, rarity:'legendary', sprite:'shard_5' },

  // ========== МАТЕРИАЛЫ ==========
  mat_iron_ore:   { id:'mat_iron_ore',   name:'Железная руда',  desc:'Основа всего.',             type:'material', stack:99, levelReq:1, cost:5,   rarity:'common',   sprite:'mat_iron_ore'   },
  mat_steel_ore:  { id:'mat_steel_ore',  name:'Стальная руда',  desc:'Крепче железа.',             type:'material', stack:99, levelReq:10,cost:20,  rarity:'common',   sprite:'mat_steel_ore'  },
  mat_mithril:    { id:'mat_mithril',    name:'Мифрил',        desc:'Легче стали, крепче стали.', type:'material', stack:50, levelReq:25,cost:120, rarity:'uncommon', sprite:'mat_mithril'    },
  mat_leather:    { id:'mat_leather',    name:'Кожа',          desc:'Свежая.',                    type:'material', stack:99, levelReq:1, cost:4,   rarity:'common',   sprite:'mat_leather'    },
  mat_thick_hide: { id:'mat_thick_hide', name:'Толстая кожа',  desc:'С элитного зверя.',          type:'material', stack:50, levelReq:15,cost:35,  rarity:'uncommon', sprite:'mat_thick_hide' },
  mat_essence:    { id:'mat_essence',    name:'Эссенция',      desc:'Магический концентрат.',     type:'material', stack:50, levelReq:10,cost:60,  rarity:'uncommon', sprite:'mat_essence'    },
  word_of_turn:  { id:'word_of_turn',  name:'Слово Тэрна', desc:'Два слога, которые Ольден слышал триста лет назад. «...-ан-Тэрн».', lore:'Не заклинание. Ключ. Первый слог забыт — его помнит только жрец Мора.', type:'material', stack:1, levelReq:1, cost:0, rarity:'legendary', sprite:'word_of_turn' },

  mat_dust:       { id:'mat_dust',       name:'Звёздная пыль', desc:'Собрана с неба.',            type:'material', stack:50, levelReq:20,cost:150, rarity:'rare',     sprite:'mat_dust'       }

};
