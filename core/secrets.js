// ============================================================
// ВЕЙЛАН — СИСТЕМА ТАЙНЫХ ТРОФЕЕВ
// Каждый редкий моб убивается ОДИН раз. Каждый свиток ОДИН раз.
// Аксессуары крафтятся ОДИН раз. Никаких дюпов.
// ============================================================

(function() {

  function ensure(hero) {
    if (!hero) return null;
    if (!hero.consumedSecrets) hero.consumedSecrets = {};
    return hero.consumedSecrets;
  }

  // Мобы, которые уже убиты (запись по mobId)
  function isMobConsumed(hero, mobId) {
    if (!hero || !hero.consumedSecrets) return false;
    return !!hero.consumedSecrets[mobId];
  }

  // Записать убийство редкого моба
  function markMobConsumed(hero, mobId) {
    if (!hero || !mobId) return { ok: false };
    var cs = ensure(hero);
    cs[mobId] = {
      type: 'mob',
      at: Date.now()
    };
    if (window.Save && Save.saveState) Save.saveState();
    return { ok: true };
  }

  // Рецепты, которые уже скрафчены (по recipeId)
  function isRecipeConsumed(hero, recipeId) {
    if (!hero || !hero.consumedSecrets) return false;
    return !!hero.consumedSecrets['recipe_' + recipeId];
  }

  function markRecipeConsumed(hero, recipeId) {
    if (!hero || !recipeId) return { ok: false };
    var cs = ensure(hero);
    cs['recipe_' + recipeId] = {
      type: 'recipe',
      at: Date.now()
    };
    if (window.Save && Save.saveState) Save.saveState();
    return { ok: true };
  }

  // Свитки, которые прочитаны
  function isScrollConsumed(hero, scrollItemId) {
    if (!hero || !hero.consumedSecrets) return false;
    return !!hero.consumedSecrets['scroll_' + scrollItemId];
  }

  function markScrollConsumed(hero, scrollItemId) {
    if (!hero || !scrollItemId) return { ok: false };
    var cs = ensure(hero);
    cs['scroll_' + scrollItemId] = {
      type: 'scroll',
      at: Date.now()
    };
    if (window.Save && Save.saveState) Save.saveState();
    return { ok: true };
  }

  // Моб уже убит — не спавнить его снова
  function canSpawnSecretMob(hero, mobId) {
    if (!hero || !mobId) return false;
    return !isMobConsumed(hero, mobId);
  }

  // Рецепт доступен для крафта — не скрафчен, есть unlockItem
  function canCraftSecret(hero, recipe) {
    if (!hero || !recipe) return false;
    if (isRecipeConsumed(hero, recipe.id)) return false;
    if (!recipe.unlockItem) return false;
    if (!window.Inventory || !Inventory.hasItem) return false;
    return Inventory.hasItem(recipe.unlockItem, 1);
  }

  window.Secrets = {
    isMobConsumed: isMobConsumed,
    markMobConsumed: markMobConsumed,
    isRecipeConsumed: isRecipeConsumed,
    markRecipeConsumed: markRecipeConsumed,
    isScrollConsumed: isScrollConsumed,
    markScrollConsumed: markScrollConsumed,
    canSpawnSecretMob: canSpawnSecretMob,
    canCraftSecret: canCraftSecret
  };

  console.log('[secrets] система тайных трофеев готова');

})();
