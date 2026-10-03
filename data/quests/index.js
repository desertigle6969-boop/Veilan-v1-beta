// ============================================================
// ВЕЙЛАН — КВЕСТЫ (сборка)
// Главы подключаются по мере написания
// ============================================================

const QUESTS = Object.assign(
  {},
  window.CHAPTER_1_QUESTS || {},
  window.CHAPTER_2_QUESTS || {},
  window.CHAPTER_3_QUESTS || {},
  window.CHAPTER_4_QUESTS || {},
  window.CHAPTER_5_QUESTS || {},
  window.CHAPTER_6_QUESTS || {},
  window.CHAPTER_7_QUESTS || {},
  window.CHAPTER_8_QUESTS || {},
  window.CHAPTER_9_QUESTS || {},
  window.CHAPTER_10_QUESTS || {},
  window.CHAPTER_11_QUESTS || {},
  window.CHAPTER_12_QUESTS || {},
  window.MINI_QUESTS || {},
  window.SETTLEMENT_QUESTS || {}
);

window.QUESTS = QUESTS;

console.log('[quests] загружено: ' + Object.keys(QUESTS).length + ' квестов');
