const ITEMS = Object.assign({}, ITEMS_WEAPON, ITEMS_ARMOR, ITEMS_MISC, ITEMS_SECRET, ITEMS_TIER8);

function getItem(id) { return ITEMS[id] || null; }
function getItemsByType(type) { return Object.values(ITEMS).filter(i => i.type === type); }
function getItemsBySlot(slot) { return Object.values(ITEMS).filter(i => i.slot === slot); }
function getItemsForLevel(level) { return Object.values(ITEMS).filter(i => i.levelReq && i.levelReq <= level); }
function rollLoot(lootTable, dropBonus = 0) {
  const drops = [];
  for (const entry of lootTable) {
    const roll = Math.random();
    const chance = entry.chance + (entry.chance * dropBonus);
    if (roll < chance) drops.push({ itemId: entry.itemId, quantity: entry.quantity || 1 });
  }
  return drops;
}
// Множители продажи по редкости (сколько игрок получает от cost)
const SELL_MULT = {
  common:    0.30,
  uncommon:  0.40,
  rare:      0.50,
  epic:      0.60,
  legendary: 0.70,
  unique:    0.80,
  secret:    0.80
};

// Множители покупки по редкости (наценка торговца)
const BUY_MULT = {
  common:    1.00,
  uncommon:  1.15,
  rare:      1.30,
  epic:      1.50,
  legendary: 1.75,
  unique:    2.00,
  secret:    2.00
};

function getSellPrice(item) {
  if (!item) return 0;
  // Экипировка (оружие, броня, аксессуары) продаётся за фиксированные 5 золота
  var EQUIP_TYPES = ['weapon', 'armor', 'accessory'];
  if (EQUIP_TYPES.indexOf(item.type) !== -1) return 5;
  const mult = SELL_MULT[item.rarity] || 0.30;
  return Math.floor((item.cost || 0) * mult);
}

function getBuyPrice(item) {
  if (!item) return 0;
  const mult = BUY_MULT[item.rarity] || 1.00;
  return Math.floor((item.cost || 0) * mult);
}
function canEquip(hero, item) {
  if (!item.classReq || item.classReq.length === 0) return true;
  return item.classReq.includes(hero.classId);
}
function meetsLevelReq(hero, item) { return hero.level >= (item.levelReq || 1); }
