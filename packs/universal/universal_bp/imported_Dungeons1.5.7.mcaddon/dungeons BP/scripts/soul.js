import {
  world,
  system
} from "@minecraft/server";

// Soul Collection

world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  if (!damageSource) return;
  if (damageSource.typeId !== 'minecraft:player') return;

  var soulCount = 0;
  if (world.scoreboard.getObjective('soulGauge').getScore(damageSource) >= 100) return;

  if (Math.floor(Math.random() * 5) == 1) {
    soulCount = soulCount + 1;
  }

  if (!damageSource) {
    return;
  }
  if (damageSource.typeId === "minecraft:player" && (deadEntity.matches({
    families: ['monster']
  }))) {
    const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
    if (!heldItem) return;
    if (heldItem.hasTag('dungeons:soul_collection')) {
      soulCount = soulCount + 1;
    }
    if (damageSource.hasTag('dungeons:verdant_armour')) {
      soulCount = soulCount * 2;
    }

    if (soulCount < 1) return;

    system.runTimeout(() => {
      for (let i = 0; i < soulCount; i++) {
        deadEntity.dimension.spawnParticle('dungeons:soul2', deadEntity.location);
      }
      let soulGauge = world.scoreboard.getObjective('soulGauge')

      soulGauge.addScore(damageSource, soulCount)
      let soulGaugePlayer = world.scoreboard.getObjective('soulGauge').getScore(damageSource);

      if (soulGaugePlayer > 100) soulGauge.setScore(damageSource, 100)
      if (soulGaugePlayer < 0) soulGauge.setScore(damageSource, 0)
      damageSource.onScreenDisplay.setActionBar(`§b${soulGaugePlayer}§s Souls `)

    }, 18) // waits 0.9 seconds for death to finish

  }
});

world.afterEvents.entityDie.subscribe((event) => {
  const entity = event.deadEntity;
  if (entity.typeId !== 'minecraft:player') return;
  if (world.gameRules.keepInventory === true) return;

  let soulGauge = world.scoreboard.getObjective('soulGauge');
  let soulGaugePlayer = soulGauge.getScore(entity);
  if (soulGaugePlayer < 34) {
    soulGauge.setScore(entity, 0)
  } else {
    soulGauge.addScore(entity, -33)
  }

});