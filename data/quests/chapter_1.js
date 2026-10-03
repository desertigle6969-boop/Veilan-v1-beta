// ============================================================
// ВЕЙЛАН — ГЛАВА 1: ПРОБУЖДЕНИЕ (Лагерь Серых Холмов)
// 6 квестов: 4 цепочка + 2 побочных
// ============================================================

const CHAPTER_1_QUESTS = {

  // ============================================================
  // ОСНОВНАЯ ЦЕПОЧКА
  // ============================================================

  ch1_01_rats: {
    id: 'ch1_01_rats',
    name: 'Голодные тени',
    chapter: 1,
    giver: 'hrod',
    type: 'kill',
    target: 'rat_grey',
    count: 3,
    requires: null,
    levelReq: 1,
    rewards: {
      exp: 50, gold: 15,
      items: [{ itemId: 'potion_hp_small', qty: 2 }]
    },
    desc: 'Хрод просит проредить крыс, которые лезут к его горну по ночам.',
    dialog: {
      start: 'Крысы сожрали мои последние угли. Убей трёх — и я дам тебе зелья.',
      progress: 'Крысы ещё живы. Считай сам.',
      complete: 'Хорошо. Держи. Приходи, когда захочешь ещё работы.'
    }
  },

  ch1_02_bandit: {
    id: 'ch1_02_bandit',
    name: 'Вожак',
    chapter: 1,
    giver: 'hrod',
    type: 'kill',
    target: 'bandit_leader',
    count: 1,
    requires: 'ch1_01_rats',
    levelReq: 5,
    rewards: {
      exp: 250, gold: 80,
      items: [{ itemId: 'sword_iron', qty: 1 }]
    },
    desc: 'Вожак Мародёров держит Лагерь в страхе. Хрод хочет, чтобы это прекратилось.',
    dialog: {
      start: 'Вожак мародёров сжёг мой прежний горн. Убей его. Он на алтаре, в глубине Лагеря.',
      progress: 'Вожак ещё дышит. Я слышу его смех отсюда.',
      complete: 'Он мёртв. Держи — этот меч я ковал для тебя.'
    }
  },

  ch1_03_letter: {
    id: 'ch1_03_letter',
    name: 'Письмо Ольдена',
    chapter: 1,
    giver: 'gunnar',
    type: 'kill',
    target: 'bandit_thug',
    count: 5,
    requires: 'ch1_02_bandit',
    levelReq: 5,
    rewards: {
      exp: 300, gold: 60,
      items: [{ itemId: 'mat_iron_ore', qty: 5 }]
    },
    desc: 'Гуннар говорит, что у громил мародёров есть письмо от Призрака Короля Ольдена. Он хочет его получить.',
    dialog: {
      start: 'У громил мародёров — письмо. С печатью Ольдена. Принеси мне пять — я выберу нужное.',
      progress: 'Пять писем. Не меньше. Печать — тонкая работа, надо смотреть.',
      complete: 'Вот это. Настоящее. Остальные — подделки. Держи руду — за работу.'
    }
  },

  ch1_04_rune: {
    id: 'ch1_04_rune',
    name: 'Руны Предтеч',
    chapter: 1,
    giver: 'hrod',
    type: 'fetch',
    target: 'mat_iron_ore',
    count: 5,
    requires: 'ch1_03_letter',
    levelReq: 5,
    rewards: {
      exp: 200, gold: 40,
      items: [{ itemId: 'potion_hp_med', qty: 1 }]
    },
    desc: 'Хрод хочет выковать что-то из железной руды. Говорит, помнит руны Предтеч.',
    dialog: {
      start: 'Пять кусков руды — и я покажу тебе, что значит руны Предтеч.',
      progress: 'Руда. Мне нужна руда, не обещания.',
      complete: 'Смотри. Это — не просто узор. Это память мира. Носи это. Может, пригодится.'
    }
  },

  // ============================================================
  // ПОБОЧНЫЕ КВЕСТЫ
  // ============================================================

  ch1_s1_supplies: {
    id: 'ch1_s1_supplies',
    name: 'Запасы',
    chapter: 1,
    giver: 'ingvar',
    type: 'fetch',
    target: 'food_meat',
    count: 3,
    requires: null,
    levelReq: 1,
    rewards: {
      exp: 80, gold: 25,
      items: [{ itemId: 'food_stew', qty: 2 }]
    },
    desc: 'Ингвар готовит похлёбку для беженцев. Мяса не хватает.',
    dialog: {
      start: 'В таверне — двенадцать ртов. Мяса хватит на два дня. Принеси три куска — я накормлю их ещё на неделю.',
      progress: 'Мясо. Три куска. Не заставляй их ждать.',
      complete: 'Хорошо. Вот твоя доля. И вот — от меня лично.'
    }
  },

  ch1_s2_orphan: {
    id: 'ch1_s2_orphan',
    name: 'Малой',
    chapter: 1,
    giver: 'refugee_child',
    type: 'kill',
    target: 'rat_big',
    count: 3,
    requires: null,
    levelReq: 2,
    rewards: {
      exp: 120, gold: 15,
      items: [{ itemId: 'mat_leather', qty: 3 }]
    },
    desc: 'Малой боится крыс-падальщиков. Они приходят к его постели по ночам.',
    dialog: {
      start: '...Они... они приходят. Большие. Убей их. Пожалуйста.',
      progress: '...Ещё?..',
      complete: '...Спасибо.'
    }
  },

  // ============================================================
  // РАСШИРЕНИЕ ГЛАВЫ 1
  // ============================================================

  ch1_03_altar: {
    id: 'ch1_03_altar',
    name: 'Алтарь',
    chapter: 1,
    giver: 'elder_valdorn',
    type: 'kill',
    target: 'shaman_outcast',
    count: 2,
    requires: 'ch1_02_bandit',
    levelReq: 4,
    rewards: {
      exp: 180, gold: 50,
      items: [{ itemId: 'potion_sp_small', qty: 2 }]
    },
    desc: 'Старейшина Орм хочет, чтобы шаманы-изгои перестали молиться на алтаре Мародёров. Он подозревает, что они поклоняются Бездне.',
    dialog: {
      start: 'На алтаре Лагеря — шаманы-изгои. Они молятся не Свету. Разберись.',
      progress: 'Империя не ждёт. Шаманы ещё живы.',
      complete: 'Хорошо. Не благодарю. Но запомню.'
    }
  },

  ch1_04_dog: {
    id: 'ch1_04_dog',
    name: 'Бешенство',
    chapter: 1,
    giver: 'ingvar',
    type: 'kill',
    target: 'camp_dog',
    count: 4,
    requires: 'ch1_s1_supplies',
    levelReq: 3,
    rewards: {
      exp: 120, gold: 30,
      items: [{ itemId: 'food_meat', qty: 3 }]
    },
    desc: 'Лагерные собаки взбесились. Они кусают беженцев у костра. Ингвар просит их прикончить.',
    dialog: {
      start: 'Собаки взбесились. Одна уже укусила ребёнка. Прикончи четырёх — я не могу смотреть, как они мучаются.',
      progress: 'Они всё ещё воют. Слышишь?',
      complete: 'Спасибо. Держи мяса — для тебя же.'
    }
  },

  ch1_s3_hide: {
    id: 'ch1_s3_hide',
    name: 'Шкуры',
    chapter: 1,
    giver: 'gunnar',
    type: 'fetch',
    target: 'mat_leather',
    count: 5,
    requires: null,
    levelReq: 1,
    rewards: {
      exp: 100, gold: 40,
      items: [{ itemId: 'potion_mp_small', qty: 2 }]
    },
    desc: 'Гуннар делает кожаную броню на продажу. Ему нужно пять кусков кожи.',
    dialog: {
      start: 'Пять кусков кожи. С крыс, с собак — не важно. Плачу сразу.',
      progress: 'Кожа. Пять штук. Я не торгуюсь дважды.',
      complete: 'Отлично. Вот твоё. Ещё принеси — ещё заплачу.'
    }
  },

  ch1_s4_dream: {
    id: 'ch1_s4_dream',
    name: 'Сон',
    chapter: 1,
    giver: 'refugee_child',
    type: 'kill',
    target: 'dog_wild',
    count: 2,
    requires: 'ch1_s2_orphan',
    levelReq: 3,
    rewards: {
      exp: 150, gold: 20,
      items: [{ itemId: 'mat_leather', qty: 2 }]
    },
    desc: 'Малой говорит, что дикие псы приходят к нему во сне. Он просит убить двух — "чтобы сон стал тише".',
    dialog: {
      start: '...Они... во сне. Убей двух. Наяву. Может, тогда...',
      progress: '...Тише?..',
      complete: '...Хорошо. Сегодня — не пришли.'
    }
  }

};

// Экспорт
window.CHAPTER_1_QUESTS = CHAPTER_1_QUESTS;
console.log('[chapter_1] загружено: ' + Object.keys(CHAPTER_1_QUESTS).length + ' квестов');
