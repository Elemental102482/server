import { world, system } from '@minecraft/server'

world.afterEvents.entityHurt.subscribe(data => {
  const entity = data.hurtEntity;
  const damage = data.damage;

  if (!entity || !entity.getComponent("minecraft:health") || damage <= 0) return;

  const inventory = entity.getComponent("minecraft:equippable");
  if (!inventory) return;

  const armorSlots = ["Head", "Chest", "Legs", "Feet"];
  let totalToughness = 0;

  for (const slot of armorSlots) {
    const item = inventory.getEquipment(slot);
    if (!item || !item.getTags) continue;

    const tags = item.getTags();
    for (const tag of tags) {
      if (tag.startsWith("cata:toughness-")) {
        const val = parseFloat(tag.split("-")[1]);
        if (!isNaN(val)) totalToughness += val;
      }
    }
  }

  if (totalToughness <= 0) return;

  const extraReductionRatio = Math.min(1, ((4 * damage) / (totalToughness + 8)) / 25); //Official formula from Minecraft armor wiki
  const extraMitigation = damage * extraReductionRatio;

  const health = entity.getComponent("minecraft:health");
  const maxHealth = health.effectiveMax;

  const restoredHealth = Math.min(health.currentValue + extraMitigation, maxHealth);
  health.setCurrentValue(restoredHealth);

  //console.warn(`Toughness: ${totalToughness}, originalDamage: ${damage}, restoredDamage: ${extraMitigation.toFixed(2)}`);
});