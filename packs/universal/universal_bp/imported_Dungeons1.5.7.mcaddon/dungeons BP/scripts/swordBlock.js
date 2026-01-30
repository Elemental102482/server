import {
  world,
  system,
  ItemStack
}
  from "@minecraft/server";
const ignoreBlock = [
  'anvil',
  'campfire',
  'contact',
  'drowning',
  'fall',
  'fallingBlock',
  'fire',
  'fireTick',
  'flyIntoWall',
  'freezing',
  'lava',
  'lightning',
  'magic',
  'magma',
  'none',
  'selfDestruct',
  'sonicBoom',
  'soulCampfire',
  'stalagmite',
  'stalactite',
  'starve',
  'suffocation',
  'suicide',
  'temperature',
  'void',
  'wither'
];
world.afterEvents.itemStartUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  if (player.hasTag('dungeons:sword_block')) return;
  if (!item.hasTag('dungeons:blockable_weapon')) return;
  player.addTag('dungeons:sword_block');
});
world.afterEvents.itemStopUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  if (!player.hasTag('dungeons:sword_block')) return;
  player.removeTag('dungeons:sword_block');
});
system.runInterval(() => {
  for (const player of world.getPlayers({
    tags: ["dungeons:sword_block"]
  })) {
    if (world.scoreboard.getObjective('shadowTime').getScore(player) == 0) {
      player.playAnimation('animation.player.block', {
        blendOutTime: 0.33,
        nextState: 'swordBlock'
      })
    }
  }
});
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (!hurtEntity) return;
  if (hurtEntity.typeId !== 'minecraft:player') return;
  if (!hurtEntity.hasTag('dungeons:sword_block')) return;
  if (ignoreBlock.includes(cause)) return;
  let hp = hurtEntity.getComponent('minecraft:health');
  hp.setCurrentValue(hp.currentValue + (damage / 2));
  hurtEntity.playSound('weapon.sword.parry', {
    pitch: 1,
    location: hurtEntity.location,
    volume: 1
  })
  hurtEntity.addEffect("strength", 10, { showParticles: false })
  const item = hurtEntity.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!item) return;
  if (!item.hasTag('dungeons:blockable_weapon')) {
    player.removeTag('dungeons:sword_block');
    return;
  }
  let durability = item.getComponent("durability");
  if (!durability) return;
  var weaponDamage = 1;
  if (damage >= 4) {
    weaponDamage += Math.floor(damage);
  }
  durability.damage += weaponDamage;
  const maxDurability = durability.maxDurability
  const currentDamage = durability.damage
  if (currentDamage >= maxDurability) {
    hurtEntity.playSound('random.break', {
      pitch: 1,
      location: hurtEntity.location,
      volume: 1
    })
    hurtEntity.getComponent("minecraft:equippable").setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
  } else {
    item.getComponent('cooldown').startCooldown(hurtEntity);
    hurtEntity.getComponent("minecraft:equippable").setEquipment("Mainhand", item);
  }
});