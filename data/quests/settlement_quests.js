// ============================================================
// ВЕЙЛАН — КВЕСТЫ ГЛАВНЫХ ПОСЕЛЕНИЙ
// 15 квестов для 9 городов/деревень
// ============================================================

const SETTLEMENT_QUESTS = {

  // ============================================================
  // СХРОН ОЛЬДЕНА (ruins) — Хранитель
  // ============================================================
  sq_hideout_names: {
    id: 'sq_hideout_names',
    name: 'Имена забытых',
    chapter: 'settlement',
    giver: 'olden_keeper',
    type: 'kill',
    target: 'skeleton_warrior',
    count: 3,
    requires: null,
    levelReq: 17,
    rewards: {
      exp: 400, gold: 120,
      items: [{ itemId: 'mat_dust', qty: 3 }]
    },
    desc: 'Хранитель просит развеять скелетов-воинов. Он помнит их имена — но не может вспомнить их лица.',
    dialog: {
      start: 'Три скелета. Три воина. Я помню их имена — Хальд, Гунн, Свен. Я не помню их лиц. Я хочу упокоить их — но не могу выйти. Убей их. Я скажу имена, когда ты вернёшься.',
      progress: 'Они всё ещё ходят. Я слышу их шаги во сне.',
      complete: 'Ты сделал. Хальд, Гунн, Свен. Теперь они — имена. А не скелеты. Спасибо.'
    }
  },

  // ============================================================
  // СКИТ МОРА (temple) — Отец Северин
  // ============================================================
  sq_mora_ritual: {
    id: 'sq_mora_ritual',
    name: 'Последний обряд',
    chapter: 'settlement',
    giver: 'mora_priest',
    type: 'fetch',
    target: 'mat_essence',
    count: 3,
    requires: null,
    levelReq: 22,
    rewards: {
      exp: 500, gold: 130,
      items: [{ itemId: 'potion_mp_large', qty: 2 }]
    },
    desc: 'Отец Северин готовит последний обряд. Для него нужна эссенция — «дыхание живых».',
    dialog: {
      start: 'Три капли эссенции. Я хочу провести последний обряд — не для Мора, для себя. Я хочу понять, что я ещё живой. Эссенция — дыхание. Принеси его.',
      progress: 'Эссенция. Ещё нет.',
      complete: 'Хорошо. Я подышу. Правда, дышу. Спасибо. Может, ещё поживу немного.'
    }
  },

  sq_mora_pilgrim: {
    id: 'sq_mora_pilgrim',
    name: 'Дойти до конца',
    chapter: 'settlement',
    giver: 'mora_pilgrim',
    type: 'kill',
    target: 'priest_corrupt',
    count: 2,
    requires: null,
    levelReq: 22,
    rewards: {
      exp: 400, gold: 100,
      items: [{ itemId: 'scroll_cleanse', qty: 2 }]
    },
    desc: 'Ансельм идёт к Храму двадцать лет. На пути — порченые жрецы. Он не может их обойти.',
    dialog: {
      start: 'Я иду. Двадцать лет. Они — на пути. Порченые жрецы. Я не могу их обойти — дорога одна. Убей двух. Может, тогда — дойду.',
      progress: 'Ещё иду. Ещё жив.',
      complete: 'Спасибо. Может, теперь — точно дойду. Или сверну. Не знаю. Спасибо.'
    }
  },

  // ============================================================
  // ЛАГЕРЬ ЛЕДОРУКОВ (peaks) — Халвар
  // ============================================================
  sq_peaks_hunt: {
    id: 'sq_peaks_hunt',
    name: 'След вирма',
    chapter: 'settlement',
    giver: 'peaks_hunter',
    type: 'kill',
    target: 'wyvern',
    count: 2,
    requires: null,
    levelReq: 28,
    rewards: {
      exp: 600, gold: 180,
      items: [{ itemId: 'mat_thick_hide', qty: 4 }]
    },
    desc: 'Халвар идёт по следу Ледяного Вирма. Но сначала надо убрать двух вивёрнов — прислужников.',
    dialog: {
      start: 'Два вивёрна. Они служат Вирму. Я не могу подойти — они чуют меня за версту. Убей их. Тогда я смогу пройти к логову.',
      progress: 'Вивёрны ещё там. Они знают, что я иду.',
      complete: 'Хорошо. След открыт. Теперь — Вирм. Скоро.'
    }
  },

  // ============================================================
  // КУЗНИ ГНОМОВ (forges) — Дурин + Кари
  // ============================================================
  sq_forges_mithril: {
    id: 'sq_forges_mithril',
    name: 'Огонь не гаснет',
    chapter: 'settlement',
    giver: 'forge_master',
    type: 'fetch',
    target: 'mat_mithril',
    count: 5,
    requires: null,
    levelReq: 34,
    rewards: {
      exp: 700, gold: 200,
      items: [{ itemId: 'mat_essence', qty: 4 }]
    },
    desc: 'Дурин ковал Завесу. Ему нужен мифрил — чтобы выковать что-то, что помнит Предтеч.',
    dialog: {
      start: 'Пять кусков мифрила. Я выкую — не оружие. Я выкую память. Ты не поймёшь, пока не увидишь. Принеси.',
      progress: 'Мифрил. Ещё нет.',
      complete: 'Смотри. Это — осколок Завесы. Он ещё горит. Носи. Может, пригодится.'
    }
  },

  sq_forges_apprentice: {
    id: 'sq_forges_apprentice',
    name: 'Первый молот',
    chapter: 'settlement',
    giver: 'forge_apprentice',
    type: 'kill',
    target: 'golem_iron',
    count: 2,
    requires: null,
    levelReq: 34,
    rewards: {
      exp: 500, gold: 120,
      items: [{ itemId: 'mat_steel_ore', qty: 5 }]
    },
    desc: 'Кари хочет выковать свой первый молот. Для этого ему нужна железная руда — но големы в тоннелях.',
    dialog: {
      start: 'Я хочу выковать молот. Мой. Первый. Но големы — два — сидят в тоннеле, где руда. Я не могу пройти. Убей их — и я сделаю первый молот.',
      progress: 'Големы ещё там? Я жду.',
      complete: 'Ух! Спасибо! Теперь — мой молот! Буду ковать! Когда-нибудь. Может.'
    }
  },

  // ============================================================
  // СТОЯНКА НА КОЧЕ (swamp) — Кром
  // ============================================================
  sq_swamp_voice: {
    id: 'sq_swamp_voice',
    name: 'Голос топей',
    chapter: 'settlement',
    giver: 'swamp_bolotnik',
    type: 'kill',
    target: 'jelly_poison',
    count: 3,
    requires: null,
    levelReq: 40,
    rewards: {
      exp: 800, gold: 220,
      items: [{ itemId: 'mat_essence', qty: 3 }]
    },
    desc: 'Кром говорит, что топи не могут «говорить» — их глушат ядовитые медузы. Он просит убрать их.',
    dialog: {
      start: 'Три медузы. Они — глушат. Топи хотят говорить — но не могут. Убей их. Тогда я услышу, что топи помнят.',
      progress: 'Ещё глушат.',
      complete: 'Слышу. Топи говорят. Они помнят… тебя. Не спрашивай, откуда. Просто помнят.'
    }
  },

  // ============================================================
  // ЗАСТАВА МОСТА (bridge) — Роальд + Свен
  // ============================================================
  sq_bridge_ghosts: {
    id: 'sq_bridge_ghosts',
    name: 'Никого не пропускать',
    chapter: 'settlement',
    giver: 'bridge_officer',
    type: 'kill',
    target: 'ghost_civilian',
    count: 3,
    requires: null,
    levelReq: 46,
    rewards: {
      exp: 900, gold: 250,
      items: [{ itemId: 'mat_dust', qty: 4 }]
    },
    desc: 'Приказы Империи — никого не пропускать. Даже мёртвых. Даже тех, кто хочет вернуться домой.',
    dialog: {
      start: 'Приказ — никого не пропускать. Даже мёртвых. Три призрака хотят домой. Но они — уже не люди. Я должен остановить их. Не могу. Убей их. Это приказ.',
      progress: 'Они идут. Ещё идут.',
      complete: 'Спасибо. Я запишу в журнал: «Трое. Имена неизвестны.» Так и надо.'
    }
  },

  sq_bridge_medic: {
    id: 'sq_bridge_medic',
    name: 'Перевязки',
    chapter: 'settlement',
    giver: 'bridge_medic',
    type: 'fetch',
    target: 'mat_thick_hide',
    count: 3,
    requires: null,
    levelReq: 46,
    rewards: {
      exp: 700, gold: 180,
      items: [{ itemId: 'potion_hp_large', qty: 3 }]
    },
    desc: 'Свен перевязывает раненых. Кожа кончилась — а раненые ещё приходят.',
    dialog: {
      start: 'Три шкуры. Потолще. Я не могу перевязывать тканью — они умирают от заражения. Умоляю.',
      progress: 'Шкуры. Я жду.',
      complete: 'Спасибо. Двое выживут. Один — нет. Но это уже не моя вина.'
    }
  },

  // ============================================================
  // КРАЙ РАЗЛОМА (rift) — Валентий
  // ============================================================
  sq_rift_sample: {
    id: 'sq_rift_sample',
    name: 'Образец Разлома',
    chapter: 'settlement',
    giver: 'rift_magister',
    type: 'kill',
    target: 'abyss_crawler',
    count: 3,
    requires: null,
    levelReq: 52,
    rewards: {
      exp: 1200, gold: 300,
      items: [{ itemId: 'mat_essence', qty: 5 }]
    },
    desc: 'Валентий хочет образец сущности, что вылезает из Разлома. Живой — если получится.',
    dialog: {
      start: 'Три ползуна. Мне нужен хотя бы один — живой. Если умрут — возьми эссенцию из тела. Это тоже данные.',
      progress: 'Образец. Жду.',
      complete: 'Прекрасно. Я вскрою его и посмотрю, что внутри. Не смотри — это не для глаз.'
    }
  },

  // ============================================================
  // ЛАГЕРЬ ОСАДЫ (fortress) — Торвальд + Хельга
  // ============================================================
  sq_fortress_last: {
    id: 'sq_fortress_last',
    name: 'Последний рывок',
    chapter: 'settlement',
    giver: 'fortress_officer',
    type: 'kill',
    target: 'void_knight',
    count: 3,
    requires: null,
    levelReq: 58,
    rewards: {
      exp: 1500, gold: 400,
      items: [{ itemId: 'mat_mithril', qty: 5 }]
    },
    desc: 'Рыцари Пустоты — элита Тэрна. Торвальд хочет проредить их до штурма.',
    dialog: {
      start: 'Три Рыцаря Пустоты. Они — Тэрна. Самые сильные. Мы не победим, если они будут стоять на стенах. Убей трёх. Это не приказ — это просьба.',
      progress: 'Рыцари ещё живы. Каждый час — потеря.',
      complete: 'Хорошо. Мы сможем прорваться. Может быть. Спасибо.'
    }
  },

  sq_fortress_blades: {
    id: 'sq_fortress_blades',
    name: 'Клинки для мёртвых',
    chapter: 'settlement',
    giver: 'fortress_smith',
    type: 'fetch',
    target: 'mat_steel_ore',
    count: 5,
    requires: null,
    levelReq: 58,
    rewards: {
      exp: 1200, gold: 320,
      items: [{ itemId: 'potion_hp_large', qty: 4 }]
    },
    desc: 'Хельга куёт клинки для мёртвых. Не для живых — они не вернутся.',
    dialog: {
      start: 'Пять кусков стали. Я выкую пять клинков. Не для нас. Для тех, кто умрёт. Чтобы они ушли с оружием.',
      progress: 'Сталь. Ещё нет.',
      complete: 'Спасибо. Вот клинки. Один — твой. Остальные — им.'
    }
  },

  // ============================================================
  // ПОРОГ СЕРДЦА (heart) — Странник
  // ============================================================
  sq_heart_first: {
    id: 'sq_heart_first',
    name: 'Первый шаг',
    chapter: 'settlement',
    giver: 'stranger',
    type: 'talk',
    target: 'stranger',
    count: 1,
    requires: null,
    levelReq: 65,
    rewards: {
      exp: 2000, gold: 500,
      items: [{ itemId: 'mat_dust', qty: 5 }]
    },
    desc: 'Странник ждёт тебя у Порога Сердца. Он хочет поговорить — прежде чем ты пойдёшь дальше.',
    dialog: {
      start: 'Ты дошёл. Хорошо. Сядь. Нам надо поговорить — прежде чем ты откроешь последнюю дверь. Я скажу тебе одну правду. Одна правда. Потом — сам решай.',
      progress: 'Ещё не время. Сначала сядь.',
      complete: 'Хорошо. Теперь ты знаешь. Иди. Последняя дверь — твоя.'
    }
  }

};

window.SETTLEMENT_QUESTS = SETTLEMENT_QUESTS;
console.log('[settlement_quests] загружено: ' + Object.keys(SETTLEMENT_QUESTS).length + ' квестов');
