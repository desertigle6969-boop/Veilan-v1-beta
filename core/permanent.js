// ============================================================
// ВЕЙЛАН — ПОСТОЯННЫЕ БАФЫ (свитки, редкие награды)
// Дают навсегда +к стату. Сохраняются в сейве.
// ============================================================

(function() {

  // Список допустимых статов
  var ALLOWED = ['str','dex','con','int','men','wit','atk','def','mag','crit','hp','mp','sp'];

  function ensure(hero) {
    if (!hero) return null;
    if (!hero.permanent) hero.permanent = {};
    for (var i = 0; i < ALLOWED.length; i++) {
      var s = ALLOWED[i];
      if (typeof hero.permanent[s] !== 'number') hero.permanent[s] = 0;
    }
    return hero.permanent;
  }

  // Применить постоянный баф (используется свитками)
  function applyPermanent(hero, stat, value) {
    if (!hero || !stat || typeof value !== 'number') return { ok:false, reason:'bad_args' };
    if (ALLOWED.indexOf(stat) === -1) return { ok:false, reason:'bad_stat' };
    var p = ensure(hero);
    p[stat] = (p[stat] || 0) + value;
    if (window.Hero && Hero.recalcHeroStats) Hero.recalcHeroStats(hero, false);
    if (window.Save && Save.saveState) Save.saveState();
    return { ok:true, stat:stat, total:p[stat], added:value };
  }

  // Прочитать постоянный баф
  function getPermanentStat(hero, stat) {
    if (!hero || !hero.permanent || !stat) return 0;
    return hero.permanent[stat] || 0;
  }

  // Сумма всех постоянных бафов (для отладки / отображения)
  function getAllPermanent(hero) {
    var p = ensure(hero);
    var out = {};
    for (var i = 0; i < ALLOWED.length; i++) {
      if (p[ALLOWED[i]] > 0) out[ALLOWED[i]] = p[ALLOWED[i]];
    }
    return out;
  }

  window.Permanent = {
    applyPermanent: applyPermanent,
    getPermanentStat: getPermanentStat,
    getAllPermanent: getAllPermanent,
    ALLOWED: ALLOWED
  };

  console.log('[permanent] система постоянных бафов готова');

})();
