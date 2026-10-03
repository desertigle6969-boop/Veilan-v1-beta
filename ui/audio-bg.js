// ============================================================
// ВЕЙЛАН — ФОНОВОЕ АУДИО (Media Session API)
// Позволяет музыке играть при блокировке экрана и в фоне
// ============================================================

(function() {
  if (!('mediaSession' in navigator)) {
    console.log('[audio-bg] Media Session не поддерживается');
    return;
  }

  function setupMediaSession() {
    if (!window.Audio_ || !Audio_.el) return;

    try {
      // Сообщаем системе: это медиаплеер
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Lordran Tapes',
        artist: 'Dark Fantasy OST',
        album: 'Вейлан',
        artwork: []
      });

      // Обработчики кнопок на экране блокировки / в шторке
      navigator.mediaSession.setActionHandler('play', function() {
        if (window.Audio_) Audio_.el.play().catch(function(){});
      });
      navigator.mediaSession.setActionHandler('pause', function() {
        if (window.Audio_) Audio_.el.pause();
      });
      navigator.mediaSession.setActionHandler('stop', function() {
        if (window.Audio_) { Audio_.el.pause(); Audio_.el.currentTime = 0; }
      });

      // Автопауза/автовозобновление
      navigator.mediaSession.setActionHandler('seekbackward', function() {});
      navigator.mediaSession.setActionHandler('seekforward', function() {});
      navigator.mediaSession.setActionHandler('previoustrack', function() {});
      navigator.mediaSession.setActionHandler('nexttrack', function() {});

      console.log('[audio-bg] Media Session настроен');
    } catch (e) {
      console.warn('[audio-bg] ошибка:', e.message);
    }
  }

  // Настраиваем, когда Audio_ будет готов
  var tries = 0;
  var check = setInterval(function() {
    tries++;
    if (window.Audio_ && Audio_.el) {
      clearInterval(check);
      setupMediaSession();
    }
    if (tries > 50) clearInterval(check);
  }, 200);

  // Обновляем статус при play
  if (window.Audio_) {
    var origStart = Audio_.start;
    Audio_.start = function() {
      origStart.call(Audio_);
      setTimeout(setupMediaSession, 100);
    };
  }

  console.log('[audio-bg] модуль загружен');
})();
