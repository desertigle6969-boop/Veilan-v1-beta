// ============================================================
// ВЕЙЛАН — ЗОНЫ (часть 2: 7-12)
// Кузни, Топи, Мост, Разлом, Крепость, Сердце
// ============================================================

const ZONES_PART2 = {

  // ================= ЗОНА 7: КУЗНИ ГРАННА =================
  forges: {
    id: 'forges',
    name: 'Кузни Гранна',
    levelRange: [34, 46],
    type: 'combat',
    unlocked: false,
    unlockCondition: 'Победить Ледяного Вирма',
    lore: 'Подгорные кузни Гранн работали тысячу лет до Раскола. Сейчас в них льют не металл, а магию — жрецы Гранн, что остались здесь, пытаются выковать новую Завесу. У них получается что-то другое. Что-то, что ходит по коридорам и убивает.',
    location: 'Глубины под Пиками Хлада',
    safety: 'dangerous',
    sublocations: [
      {
        id: 'halls',
        name: 'Кузнечные залы',
        levelRange: [34, 37],
        lore: 'Безумные кузнецы всё ещё куют. Они не помнят, зачем начали.',
        mobs: ['smith_mad', 'golem_magma', 'dog_hell'],
        boss: null
      },
      {
        id: 'furnace',
        name: 'Печи',
        levelRange: [38, 40],
        lore: 'Воздух дрожит от жара. Железные конструкты стоят на страже того, что уже мертво.',
        mobs: ['construct_iron', 'elemental_fire', 'traitor_grann'],
        boss: null
      },
      {
        id: 'secret',
        name: 'Тайная кузня',
        levelRange: [41, 42],
        lore: 'Здесь Хрод куёт то, что не должен был. Мастер-Кузнец не любит гостей.',
        mobs: ['master_smith', 'guard_rune', 'golem_magma'],
        boss: null
      },
      {
        id: 'heart',
        name: 'Сердце Кузни',
        levelRange: [43, 46],
        lore: 'Титан Кузни — не живое и не мёртвое. Он — воплощение огня, что жжёт триста лет.',
        mobs: [],
        boss: 'forge_titan'
      }
    ]
  },

  // ================= ЗОНА 8: ТОПИ МОРА =================
  swamp: {
    id: 'swamp',
    name: 'Топи Мора',
    levelRange: [40, 52],
    type: 'combat',
    unlocked: false,
    unlockCondition: 'Победить Титана Кузни',
    lore: 'Топи — не естественные болота. Они выросли на месте падения осколка Бездны — куска, что упал на Вейлан вместе с Расколом. Вода здесь живая, растения — тоже. И они хотят жрать. Местные называют это «Мор» — от древнего «пожирающий».',
    location: 'Южные гиблые земли',
    safety: 'dangerous',
    sublocations: [
      {
        id: 'rot',
        name: 'Гнилые болота',
        levelRange: [40, 43],
        lore: 'Каждый шаг утопает в жиже. Слизни ползут к тебе неспешно, но верно.',
        mobs: ['slug_giant', 'toad_venom', 'cultist_mora'],
        boss: null
      },
      {
        id: 'ruins_swamp',
        name: 'Гниющие развалины',
        levelRange: [43, 46],
        lore: 'Здесь стояла деревня. Теперь стоят только зомби. И ведьма — за старшую.',
        mobs: ['zombie_swamp', 'witch_swamp', 'lizard_warrior'],
        boss: null
      },
      {
        id: 'heart_swamp',
        name: 'Сердце Топей',
        levelRange: [46, 48],
        lore: 'Матка Мора производит новых тварей каждый час. Она не остановится, пока жива.',
        mobs: ['broodmother', 'spawn_mora', 'slug_giant'],
        boss: null
      },
      {
        id: 'abyss_swamp',
        name: 'Провал Мора',
        levelRange: [49, 52],
        lore: 'Аватар Мора — то, что осталось от осколка Бездны. Он кричит без звука.',
        mobs: [],
        boss: 'mora_avatar'
      }
    ]
  },

  // ================= ЗОНА 9: МОСТ ВЕТРОВ =================
  bridge: {
    id: 'bridge',
    name: 'Мост Ветров',
    levelRange: [46, 58],
    type: 'combat',
    unlocked: false,
    unlockCondition: 'Победить Аватара Мора',
    lore: 'Между двумя парящими островами Вейлана натянут Мост — не из дерева, не из камня. Из самой Завесы, которую держали Предтечи. Сейчас Завеса тонка, и по Мосту ходят ветра, что помнят имена тех, кто по нему шёл. Иногда они говорят.',
    location: 'Между Лагером Серых Холмов и Разломом',
    safety: 'dangerous',
    sublocations: [
      {
        id: 'platforms',
        name: 'Парящие платформы',
        levelRange: [46, 49],
        lore: 'Духи ветра танцуют между платформами. Грифоны держатся в стороне от них.',
        mobs: ['elemental_air', 'griffon_wild', 'storm_archer'],
        boss: null
      },
      {
        id: 'thunder',
        name: 'Грозовая зона',
        levelRange: [50, 53],
        lore: 'Здесь вечная гроза. Молнии бьют в одно место. Там что-то стоит.',
        mobs: ['elemental_lightning', 'wyvern', 'guardian_air'],
        boss: null
      },
      {
        id: 'spire',
        name: 'Шпиль',
        levelRange: [54, 56],
        lore: 'Громовой Титан стоит на шпиле. Он не нападает первым. Ждёт, когда ты подойдёшь.',
        mobs: ['titan_storm', 'elemental_air_elite', 'wyvern'],
        boss: null
      },
      {
        id: 'core_bridge',
        name: 'Сердце Моста',
        levelRange: [56, 58],
        lore: 'Владыка Гроз — тот, кто держит Мост. Если он падёт, Мост падёт тоже.',
        mobs: [],
        boss: 'storm_lord'
      }
    ]
  },

  // ================= ЗОНА 10: РАЗЛОМ БЕЗДНЫ =================
  rift: {
    id: 'rift',
    name: 'Разлом Бездны',
    levelRange: [54, 68],
    type: 'combat',
    unlocked: false,
    unlockCondition: 'Победить Владыку Гроз',
    lore: 'Здесь Завеса порвана окончательно. Бездна смотрит на тебя — и ты смотришь на неё. Тот, кто долго смотрит в Разлом, начинает видеть в нём себя. И это «я» улыбается и машет рукой.',
    location: 'Край мира, где Завеса не держится',
    safety: 'dangerous',
    sublocations: [
      {
        id: 'edge',
        name: 'Край Разлома',
        levelRange: [54, 57],
        lore: 'Земля здесь обрывается. За ней — ничего. Но оттуда что-то лезет.',
        mobs: ['abyss_crawler', 'void_wraith', 'rift_guard'],
        boss: null
      },
      {
        id: 'shards',
        name: 'Осколки миров',
        levelRange: [58, 62],
        lore: 'Куски других миров падают сюда с неба. Не все — мёртвые.',
        mobs: ['thing_unnamed', 'void_knight', 'shard_colossus'],
        boss: null
      },
      {
        id: 'deep_rift',
        name: 'Глубина Разлома',
        levelRange: [63, 66],
        lore: 'Малый Пожиратель — не самый страшный. Самый страшный — тот, что его создал.',
        mobs: ['devourer_lesser', 'void_priest', 'void_knight'],
        boss: null
      },
      {
        id: 'heart_rift',
        name: 'Сердце Разлома',
        levelRange: [67, 68],
        lore: 'Пожиратель помнит Вейлан до Раскола. И хочет вернуть его — целиком, съев.',
        mobs: [],
        boss: 'devourer'
      }
    ]
  },

  // ================= ЗОНА 11: КРЕПОСТЬ ТЭРНА =================
  fortress: {
    id: 'fortress',
    name: 'Крепость Тэрна',
    levelRange: [62, 78],
    type: 'combat',
    unlocked: false,
    unlockCondition: 'Победить Пожирателя',
    lore: 'Тэрн Вероломный построил эту крепость за год до Раскола. Он знал, что произойдёт. Он готовился. Семь дверей — семь комнат его жизни. В конце — трон. На троне — он.',
    location: 'Парящая Цитадель над Разломом',
    safety: 'dangerous',
    sublocations: [
      {
        id: 'road',
        name: 'Дорога к Крепости',
        levelRange: [62, 64],
        lore: 'Дорога через выжженную пустошь. Ветер несёт пепел.',
        mobs: ['automaton_guard', 'rune_knight'],
        boss: null
      },
      {
        id: 'gate',
        name: 'Внешние врата',
        levelRange: [62, 66],
        lore: 'Автоматоны не спрашивают имён.',
        mobs: ['automaton_guard', 'rune_knight', 'trap_mage'],
        boss: null
      },
      {
        id: 'mother',
        name: 'Первая дверь. Комната матери',
        levelRange: [65, 66],
        lore: 'Здесь жила она. Всё, что осталось — деревянный конь.',
        mobs: ['iron_sentinel', 'trap_mage'],
        boss: null
      },
      {
        id: 'precursors',
        name: 'Вторая дверь. Палата Предтеч',
        levelRange: [66, 67],
        lore: 'Стеклянные сосуды. В каждом — душа.',
        mobs: ['iron_sentinel', 'chaos_knight'],
        boss: null
      },
      {
        id: 'children',
        name: 'Третья дверь. Огонь, в котором спят дети',
        levelRange: [67, 68],
        lore: 'Огонь горит, но не жжёт. В нём спят дети.',
        mobs: ['titan_guard', 'iron_sentinel'],
        boss: null
      },
      {
        id: 'nirna',
        name: 'Четвёртая дверь. Комната, где идёт снег',
        levelRange: [68, 69],
        lore: 'Здесь всегда идёт снег. Нирна стоит у окна.',
        mobs: ['chaos_knight', 'rune_priest'],
        boss: null
      },
      {
        id: 'olden',
        name: 'Пятая дверь. Комната Ольдена',
        levelRange: [69, 70],
        lore: 'Ольден сидит за столом. Дневник открыт.',
        mobs: ['chaos_knight', 'iron_sentinel'],
        boss: null
      },
      {
        id: 'office',
        name: 'Шестая дверь. Кабинет',
        levelRange: [70, 71],
        lore: 'Карты, планы, записи. Он готовился триста лет.',
        mobs: ['rune_priest', 'titan_guard'],
        boss: null
      },
      {
        id: 'cell',
        name: 'Седьмая дверь. Клетка Асгейра',
        levelRange: [71, 72],
        lore: 'Здесь сидел тот, кто выжил.',
        mobs: ['chaos_knight', 'titan_guard'],
        boss: null
      },
      {
        id: 'throne',
        name: 'Тронный зал Тэрна',
        levelRange: [73, 78],
        lore: 'Здесь сидит он. Не аватар — сам. Он не встаёт. Пока.',
        mobs: ['rune_priest', 'chaos_knight', 'titan_guard'],
        boss: 'turn_avatar'
      }
    ]
  },

  // ================= ЗОНА 12: СЕРДЦЕ ВЕЙЛАНА =================
  heart: {
    id: 'heart',
    name: 'Сердце Вейлана',
    levelRange: [70, 80],
    type: 'final',
    unlocked: false,
    unlockCondition: 'Победить Аватара Тэрна',
    lore: 'Здесь был Изначальный Свет. Здесь же он был расколот. Это ядро мира — то, что осталось от него. Здесь Завеса так тонка, что ты видишь всех, кто когда-либо жил. И все они смотрят на тебя. Скоро решится, жить Вейлану или нет.',
    location: 'Ядро мира, вне пространства',
    safety: 'dangerous',
    sublocations: [
      {
        id: 'threshold',
        name: 'Порог',
        levelRange: [70, 74],
        lore: 'Стражи света и тьмы стоят по обе стороны. Ты должен пройти между ними. За ними — Тетор.',
        mobs: ['light_guardian', 'dark_guardian', 'guardian_balance'],
        boss: 'tetor_demon'
      },
      {
        id: 'core',
        name: 'Эхо Прошлого',
        levelRange: [75, 77],
        lore: 'Эхо тех, кого ты убил, встречает тебя здесь. Они не мстят. Они просто помнят.',
        mobs: ['echo_olden', 'echo_leviathan', 'echo_titan'],
        boss: 'olden_servant',
        requiredKey: 'key_first'
      },
      {
        id: 'final',
        name: 'Последний Рубеж',
        levelRange: [78, 79],
        lore: 'Вестники Света и Тьмы — последние, кто стоит между тобой и Тэрном.',
        mobs: ['herald_light', 'herald_dark', 'guardian_balance'],
        boss: 'thing_unnamed',
        requiredKey: 'key_second'
      },
      {
        id: 'core_final',
        name: 'Сердце Тэрна',
        levelRange: [80, 80],
        lore: 'Здесь. Сейчас. Тэрн Истинный не аватар, не эхо — он сам. Он смотрит на тебя и улыбается. Он ждал.',
        mobs: [],
        boss: 'turn_true',
        requiredKey: 'key_third'
      }
    ]
  }

};
