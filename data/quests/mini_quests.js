// ============================================================
// ВЕЙЛАН — МАЛЫЕ КВЕСТЫ МАЛЫХ СТОЯНОК
// 12 коротких живых заданий
// ============================================================

const MINI_QUESTS = {

  // ========== ГУННЛАУГ (Дозорная вышка, camp) ==========
  mini_watchtower_rats: {
    id: 'mini_watchtower_rats',
    name: 'Крыса на посту',
    chapter: 'mini',
    giver: 'camp_watchman',
    type: 'kill',
    target: 'rat_grey',
    count: 2,
    requires: null,
    levelReq: 2,
    rewards: {
      exp: 80, gold: 20,
      items: [{ itemId: 'food_bread', qty: 2 }]
    },
    desc: 'Крысы прогрызли опору вышки. Гуннлауг не может спуститься — он не покидает пост.',
    dialog: {
      start: 'Крысы прогрызли опору. Ещё две — и вышка упадёт. Убей двух — я не могу спуститься. Никогда не спускаюсь.',
      progress: 'Они грызут. Слышишь?',
      complete: 'Хорошо. Теперь постоит. Держи хлеб — у меня всё равно нет места его хранить.'
    }
  },

  // ========== СКÁЛЬД (Костровище, camp) ==========
  mini_hermit_wood: {
    id: 'mini_hermit_wood',
    name: 'Хворост для костра',
    chapter: 'mini',
    giver: 'camp_hermit',
    type: 'fetch',
    target: 'mat_leather',
    count: 2,
    requires: null,
    levelReq: 1,
    rewards: {
      exp: 60, gold: 15,
      items: [{ itemId: 'mat_dust', qty: 1 }]
    },
    desc: 'Скáльд просит принести шкур — на растопку. Он не объясняет, зачем.',
    dialog: {
      start: 'Принеси мне шкур. Двух. Не спрашивай зачем — я жгу странное, это давняя привычка.',
      progress: 'Шкуры. Я жду у костра.',
      complete: 'Хорошо. Посиди. Огонь запомнит тебя. Это не всегда плохо.'
    }
  },

  // ========== ХЕЛЬГЕ (Древний Алтарь, forest) ==========
  mini_old_altar_essence: {
    id: 'mini_old_altar_essence',
    name: 'Обряд памяти',
    chapter: 'mini',
    giver: 'forest_pilgrim',
    type: 'fetch',
    target: 'mat_essence',
    count: 2,
    requires: null,
    levelReq: 9,
    rewards: {
      exp: 150, gold: 40,
      items: [{ itemId: 'mat_dust', qty: 2 }]
    },
    desc: 'Хельге хочет провести обряд памяти у Алтаря. Ему нужна эссенция.',
    dialog: {
      start: 'Я хочу помолиться. За них. Всех. Но у меня нет эссенции — а без неё алтарь не отвечает. Принеси мне две капли — и я вспомню их имена.',
      progress: 'Эссенция. Ещё нет?',
      complete: 'Спасибо. Я вспомнил. Все двадцать имён. Может, теперь — дойду.'
    }
  },

  // ========== БРАНД (Заброшенная Штольня, mines) ==========
  mini_collapsed_ore: {
    id: 'mini_collapsed_ore',
    name: 'Кирка для камня',
    chapter: 'mini',
    giver: 'mines_survivor',
    type: 'fetch',
    target: 'mat_iron_ore',
    count: 3,
    requires: null,
    levelReq: 12,
    rewards: {
      exp: 200, gold: 50,
      items: [{ itemId: 'mat_steel_ore', qty: 2 }]
    },
    desc: 'Бранду нужна руда — чтобы выковать кирку. Чтобы выкопать друга.',
    dialog: {
      start: 'Три куска руды. Я выкую кирку. У меня больше нет сил бить камнем. А он — там. Двенадцать лет там.',
      progress: 'Руда. Пожалуйста.',
      complete: 'Хорошо. Иди. Мне надо работать. Молча.'
    }
  },

  // ========== ПРИЗРАК (Проклятый Дозор, ruins) ==========
  mini_ruins_skeletons: {
    id: 'mini_ruins_skeletons',
    name: 'Смена караула',
    chapter: 'mini',
    giver: 'ruins_watcher',
    type: 'kill',
    target: 'skeleton_guard',
    count: 3,
    requires: null,
    levelReq: 17,
    rewards: {
      exp: 250, gold: 60,
      items: [{ itemId: 'mat_dust', qty: 2 }]
    },
    desc: 'Скелеты бродят у башни. Призрак не может их прогнать — они тоже мертвы, как и он. Но он хочет тишины.',
    dialog: {
      start: 'Они ходят. Они тоже мертвы — но не знают об этом. Я знаю. Я хочу тишины. Три скелета — три ночи без шагов.',
      progress: 'Ещё ходят.',
      complete: 'Спасибо. Теперь — тихо. Я постою.'
    }
  },

  // ========== МОЛЧАЛЬНИК (Молчаливая Паперть, temple) ==========
  mini_temple_silence: {
    id: 'mini_temple_silence',
    name: 'Молчание в ответ',
    chapter: 'mini',
    giver: 'temple_silent',
    type: 'talk',
    target: 'temple_silent',
    count: 1,
    requires: null,
    levelReq: 22,
    rewards: {
      exp: 200, gold: 0,
      items: [{ itemId: 'potion_mp_med', qty: 1 }]
    },
    desc: 'Молчальник не может говорить. Но он хочет, чтобы кто-то посидел рядом. Просто так.',
    dialog: {
      start: '...',
      progress: '...',
      complete: '...'
    }
  },

  // ========== ХАЛЬДИР (Ветхая Застава, peaks) ==========
  mini_peaks_wyrm: {
    id: 'mini_peaks_wyrm',
    name: 'Вирм-детёныш',
    chapter: 'mini',
    giver: 'peaks_veteran',
    type: 'kill',
    target: 'wyrm_frost',
    count: 1,
    requires: null,
    levelReq: 28,
    rewards: {
      exp: 400, gold: 100,
      items: [{ itemId: 'mat_thick_hide', qty: 3 }]
    },
    desc: 'Молодой вирм подошёл к заставе. Хальдир не может его убить — рука не поднимается. Но если вирм вырастет, он убьёт всех.',
    dialog: {
      start: 'Вирм. Молодой. Я его видел — он ещё не умеет дышать холодом. Мне пятьдесят восемь. Рука не поднимается. Убей ты. Не потому, что я слаб. Потому что я — боюсь.',
      progress: 'Он ещё там.',
      complete: 'Хорошо. Я вижу — ты сделал. Спасибо. Держи шкуры — на память. Я не хочу их видеть.'
    }
  },

  // ========== ГАМЛИ (Угасший Горн, forges) ==========
  mini_forges_coal: {
    id: 'mini_forges_coal',
    name: 'Уголь для горна',
    chapter: 'mini',
    giver: 'forges_old_smith',
    type: 'fetch',
    target: 'mat_dust',
    count: 3,
    requires: null,
    levelReq: 34,
    rewards: {
      exp: 350, gold: 80,
      items: [{ itemId: 'mat_mithril', qty: 1 }]
    },
    desc: 'Гамли хочет попробовать зажечь горн. Ему нужна пыль — «уголь из-под земли».',
    dialog: {
      start: 'Пыль. Три горсти. Я хочу попробовать снова. Тринадцатый раз. Если не получится — я оставлю попытки. Но я хочу попробовать.',
      progress: 'Пыль. Ещё нет?',
      complete: 'Спасибо. Иди. Не смотри — если не получится, я не хочу, чтобы ты видел.'
    }
  },

  // ========== СНОРРИ (Гнилая Пристань, swamp) ==========
  mini_swamp_leech: {
    id: 'mini_swamp_leech',
    name: 'Пиявки на пароме',
    chapter: 'mini',
    giver: 'swamp_ferryman',
    type: 'kill',
    target: 'spider_venom',
    count: 3,
    requires: null,
    levelReq: 40,
    rewards: {
      exp: 400, gold: 120,
      items: [{ itemId: 'potion_hp_med', qty: 2 }]
    },
    desc: 'Пиявки прицепились к днищу парома. Снорри не может отплыть.',
    dialog: {
      start: 'Пиявки. Три штуки. Под днищем. Я не могу их снять — руки не достают. Убей их. Или мы оба здесь останемся.',
      progress: 'Они ещё там. Паром не плывёт.',
      complete: 'Хорошо. Садись — перевезу. Куда хочешь.'
    }
  },

  // ========== АЛЬВ (Одинокий Пикет, bridge) ==========
  mini_bridge_food: {
    id: 'mini_bridge_food',
    name: 'Забыл поесть',
    chapter: 'mini',
    giver: 'bridge_sentry',
    type: 'fetch',
    target: 'food_bread',
    count: 3,
    requires: null,
    levelReq: 46,
    rewards: {
      exp: 300, gold: 70,
      items: [{ itemId: 'potion_sp_small', qty: 2 }]
    },
    desc: 'Альв стоит на посту пятнадцать лет. Он забыл, когда ел последний раз. Он всё ещё стоит.',
    dialog: {
      start: 'Еда?.. Я не помню… когда. Три дня? Пять? У меня приказ — не отходить. Но я голоден. Принеси хлеба — я съем, стоя. Приказ не нарушу.',
      progress: 'Стою. Жду.',
      complete: 'Спасибо. Я поем. Стоя.'
    }
  },

  // ========== СИГМУНД (Тихий Наблюдатель, rift) ==========
  mini_rift_scrolls: {
    id: 'mini_rift_scrolls',
    name: 'Бумага для записей',
    chapter: 'mini',
    giver: 'rift_observer',
    type: 'fetch',
    target: 'scroll_cleanse',
    count: 2,
    requires: null,
    levelReq: 52,
    rewards: {
      exp: 500, gold: 140,
      items: [{ itemId: 'scroll_return', qty: 1 }]
    },
    desc: 'Сигмунд записывает каждое измерение Разлома. Но бумага кончилась.',
    dialog: {
      start: 'Мне нужна бумага. Две скрутки. Я не могу писать на камне — а память уже не та. Разлом растёт. Я должен записать.',
      progress: 'Бумага. Ещё нет.',
      complete: 'Хорошо. Иди. Я буду писать. Не мешай.'
    }
  },

  // ========== АСГЕЙР (Передовой Рубеж, fortress) ==========
  mini_fortress_hides: {
    id: 'mini_fortress_hides',
    name: 'Повязки для раненых',
    chapter: 'mini',
    giver: 'fortress_scout',
    type: 'fetch',
    target: 'mat_thick_hide',
    count: 3,
    requires: null,
    levelReq: 58,
    rewards: {
      exp: 600, gold: 180,
      items: [{ itemId: 'potion_hp_large', qty: 2 }]
    },
    desc: 'Асгейр перевязывает раненых сам. Кожа кончилась.',
    dialog: {
      start: 'Три шкуры. Потолще. У меня четверо раненых. Один умрёт, если не перевяжу к утру. Я не могу уйти — Тэрн рядом. Принеси.',
      progress: 'Шкуры. Умоляю.',
      complete: 'Спасибо. Он выживет. Я — тоже. Может быть.'
    }
  }

};

window.MINI_QUESTS = MINI_QUESTS;
console.log('[mini_quests] загружено: ' + Object.keys(MINI_QUESTS).length + ' квестов');
