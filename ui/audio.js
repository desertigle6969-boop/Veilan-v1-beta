// ============================================================
// ВЕЙЛАН — АУДИО
// Плейлист Lordran Tapes: Parish → Awakening → Burial Gift
// Принудительный запуск, после последнего трека — тишина (без цикла)
// ============================================================

(function() {
  if (!window.Audio) {
    console.error('Audio не поддерживается');
    return;
  }

  var Audio_ = {
    el: null,
    volume: 0.08,
    enabled: true,
    started: false,
    ambientEl: null,
    ambientName: null,
    ambientVolume: 0.35,

    playlist: [
      'audio/WAV_The_Parish_loop.wav',
      'audio/WAV_The_Awakening_loop.wav',
      'audio/WAV_Burial_Gift_loop.wav'
    ],
    trackIndex: 0,
    finished: false,

    init: function() {
      if (this.el) return;
      this.el = document.createElement('audio');
      this.el.loop = false;
      this.el.playsInline = true;
      this.el.setAttribute('playsinline', '');
      this.el.volume = this.volume;
      this.el.src = this.playlist[0];
      this.el.preload = 'auto';

      var self = this;

      // По окончании трека — следующий. После последнего — тишина.
      this.el.addEventListener('ended', function() {
        // Зацикливание: после последнего трека — снова первый
        if (self.trackIndex >= self.playlist.length - 1) {
          self.trackIndex = 0;
        } else {
          self.trackIndex += 1;
        }
        self.el.src = self.playlist[self.trackIndex];
        self.el.load();
        if (self.enabled) {
          self.el.play().catch(function(){});
        }
      });

      // Если браузер поставил на паузу — вернуть (кроме завершения плейлиста)
      this.el.addEventListener('pause', function() {
        if (self.enabled && self.started && !self.finished && !self.el.ended) {
          setTimeout(function() {
            if (self.enabled && self.el.paused && !self.finished) {
              self.el.play().catch(function(){});
            }
          }, 150);
        }
      });

      document.body.appendChild(this.el);

      if (window.STATE && STATE.settings) {
        if (STATE.settings.volume !== undefined) {
          this.volume = Math.max(0, Math.min(1, STATE.settings.volume)) * 0.35;
          this.el.volume = this.volume;
        }
        if (STATE.settings.soundEnabled !== undefined) {
          this.enabled = STATE.settings.soundEnabled;
        }
      }
    },

    // Принудительный запуск — пробует играть при любом взаимодействии
    start: function() {
      this.init();
      if (!this.enabled) return;
      if (this.started || this.finished) return;
      var self = this;
      this.el.play().then(function() {
        self.started = true;
        console.log('[audio] play ok');
      }).catch(function(e) {
        // Браузер заблокировал автоплей — попробуем на следующем тапе
        console.warn('[audio] play failed:', e.message);
      });
    },

    stop: function() {
      if (this.el) {
        this.el.pause();
        this.el.currentTime = 0;
        this.started = false;
      }
    },

    toggle: function() {
      this.init();
      if (this.enabled) {
        this.enabled = false;
        this.el.pause();
        this.started = false;
        return false;
      } else {
        this.enabled = true;
        if (!this.finished) {
          this.el.play().catch(function(){});
          this.started = true;
        }
        return true;
      }
    },

    setVolume: function(v) {
      this.volume = Math.max(0, Math.min(1, v));
      if (this.el) this.el.volume = this.volume;
    },

    setTrackIndex: function(i) {
      if (i < 0 || i >= this.playlist.length) return;
      this.trackIndex = i;
      this.finished = false;
      this.init();
      this.el.src = this.playlist[i];
      this.el.load();
      if (this.enabled && this.started) {
        this.el.play().catch(function(){});
      }
    }
  };

  // ===== ЭМБИЕНТ (фоновый звук локации) =====
  Audio_.ambient = function(name, url, volume) {
    if (!this.enabled) return;
    if (this.ambientName === name && this.ambientEl && !this.ambientEl.paused) return;
    // Если уже играет другой — остановить
    if (this.ambientEl) {
      this.ambientEl.pause();
      this.ambientEl.src = '';
    }
    this.ambientEl = new Audio(url);
    this.ambientEl.loop = true;
    this.ambientEl.volume = (volume !== undefined ? volume : this.ambientVolume);
    this.ambientName = name;
    this.ambientEl.play().catch(function(){});
  };

  Audio_.stopAmbient = function() {
    if (this.ambientEl) {
      this.ambientEl.pause();
      this.ambientEl.src = '';
      this.ambientEl = null;
      this.ambientName = null;
    }
  };

  window.Audio_ = Audio_;

  // Принудительный запуск: пробуем на любом взаимодействии, пока не заиграет
  var tryStart = function() {
    Audio_.start();
    // Если уже играет или завершён — снимаем обработчики
    if (Audio_.started || Audio_.finished) {
      document.removeEventListener('touchstart', tryStart);
      document.removeEventListener('click', tryStart);
      document.removeEventListener('keydown', tryStart);
    }
  };
  document.addEventListener('touchstart', tryStart);
  document.addEventListener('click', tryStart);
  document.addEventListener('keydown', tryStart);

  // Плюс попытка сразу при загрузке (вдруг браузер разрешит)
  setTimeout(function() { Audio_.start(); }, 500);

  console.log('[audio] модуль загружен (плейлист Lordran Tapes, зациклен)');
})();
