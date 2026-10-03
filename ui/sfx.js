// ============================================================
// ВЕЙЛАН — ЗВУКОВЫЕ ЭФФЕКТЫ (SFX)
// Отдельный модуль от фоновой музыки (audio.js)
// Уважает настройку sound из STATE.settings
// ============================================================

(function() {
  var sounds = {
    // === БОЙ ===
    combat_start:     'audio/sfx/combat/combat_start_human.ogg',
    hit_auto:         'audio/sfx/combat/hero_attack_new.mp3',
    hit_skill:        'audio/sfx/combat/hit_skill.ogg',
    miss:             'audio/sfx/combat/miss.ogg',
    mob_attack:       'audio/sfx/combat/mob_hit_new.mp3',
    mob_attack_2:     'audio/sfx/combat/mob_hit_new.mp3',
    mob_attack_beast: 'audio/sfx/combat/mob_hit_new.mp3',
    mob_attack_murloc:'audio/sfx/combat/mob_hit_new.mp3',

    // === ЗАКЛИНАНИЯ ===
    cast_start:  'audio/sfx/spells/cast_start.ogg',
    cast_holy:   'audio/sfx/spells/cast_holy.ogg',
    cast_shadow: 'audio/sfx/spells/cast_shadow.ogg',
    magic_hit:   'audio/sfx/spells/magic_hit.mp3',
    heal:        'audio/sfx/spells/heal_new.mp3',
    shield:      'audio/sfx/spells/shield_success.ogg',
    debuff:      'audio/sfx/spells/debuff.mp3',

    // === ИНТЕРФЕЙС / СОБЫТИЯ ===
    level_up:     'audio/sfx/ui/level_up.ogg',
    quest_accept: 'audio/sfx/ui/quest_accept.ogg',
    click:        'audio/sfx/ui/click.mp3',
    shop:         'audio/sfx/ui/shop.mp3',
    craft:        'audio/sfx/ui/craft.mp3',
    inv_open:     'audio/sfx/ui/inv_open.ogg',
    close:        'audio/sfx/ui/close.mp3',
    inv_close:    'audio/sfx/ui/inv_close.ogg',
    death_male:   'audio/sfx/ui/player_death_male.ogg',
    death_female: 'audio/sfx/ui/player_death_female.ogg'
  };

  // Кэш Audio-объектов (не создаём каждый раз заново)
  var cache = {};

  function isEnabled() {
    if (!window.STATE || !STATE.settings) return true;
    return STATE.settings.sound !== false;
  }

  function getVolume() {
    if (window.Audio_ && typeof Audio_.volume === 'number') return Audio_.volume;
    return 0.5;
  }

  function play(name, volumeMult) {
    if (!isEnabled()) return;
    var path = sounds[name];
    if (!path) return;

    try {
      var a = cache[name];
      if (!a) {
        a = new Audio(path + '?v=2');
        cache[name] = a;
      }
      // Перезапускаем с начала, если уже играет
      try { a.currentTime = 0; } catch (e) {}
      a.volume = Math.max(0, Math.min(1, getVolume() * (volumeMult || 1)));
      a.play().catch(function(){});
    } catch (e) {}
  }

  // Случайный вариант (для mob_attack — 3 разных звука)
  function playRandom(names, volumeMult) {
    if (!names || names.length === 0) return;
    var n = names[Math.floor(Math.random() * names.length)];
    play(n, volumeMult);
  }

  // Глобальный клик по любой кнопке
  document.addEventListener('click', function(ev) {
    var el = ev.target;
    while (el && el !== document.body) {
      if (el.tagName === 'BUTTON') {
        play('click', 0.6);
        return;
      }
      el = el.parentNode;
    }
  }, true);

  window.SFX = {
    play: play,
    playRandom: playRandom,
    sounds: sounds,
    cache: cache
  };

  console.log('[sfx] модуль загружен, звуков: ' + Object.keys(sounds).length);
})();
