import {
  world,
  system,
  EntityDamageCause
}
  from "@minecraft/server";

// Critical Hit

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:critical_hit')) {
    return;
  }

  const critical = Math.floor(Math.random() * 10);
  if (damageSource.hasTag('dungeons:debug')) damageSource.sendMessage(`roll : ${critical}`)
  if (critical == 1) {

    hurtEntity.runCommandAsync('function weapon/critical_hit_fx')

    hurtEntity.addTag('prevent_effect')
    hurtEntity.applyDamage(damage * 1.5, {
      cause: cause,
      damagingEntity: damageSource
    });

    system.runTimeout(() => {
      hurtEntity.removeTag('prevent_effect')
    }, 1)

  }

});

// Critical Hit (Spooky)

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:critical_hit_spooky')) {
    return;
  }

  const critical = Math.floor(Math.random() * 10);
  if (damageSource.hasTag('dungeons:debug')) damageSource.sendMessage(`roll : ${critical}`)
  if (critical == 1) {

    hurtEntity.runCommandAsync('function weapon/spooky_critical_hit_fx')

    hurtEntity.addTag('prevent_effect')
    hurtEntity.applyDamage(damage * 1.5, {
      cause: cause,
      damagingEntity: damageSource
    });

    system.runTimeout(() => {
      hurtEntity.removeTag('prevent_effect')
    }, 1)

  }

});

// Enigma Resonator

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:enigma_resonator')) {
    return;
  }

  const critical = Math.floor(Math.random() * 400);
  const souls = world.scoreboard.getObjective('soulGauge').getScore(damageSource);

  if (damageSource.hasTag('dungeons:debug')) damageSource.sendMessage(`roll : ${critical}`)
  if (critical < souls) {

    hurtEntity.runCommandAsync('function weapon/enigma_resonator_fx')

    hurtEntity.addTag('prevent_effect')
    hurtEntity.applyDamage(damage * 1.5, {
      cause: cause,
      damagingEntity: damageSource
    });

    system.runTimeout(() => {
      hurtEntity.removeTag('prevent_effect')
    }, 1)

  }

});

// Burning

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:burning')) {
    return;
  }

  const isFire = hurtEntity.setOnFire(damage * 2.4, true)
  if (!isFire) return;
  damageSource.playSound('mob.ghast.fireball', {
    pitch: 1.05,
    volume: 0.33
  })

});

// Stunning

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:stunning')) {
    return;
  }

  hurtEntity.runCommandAsync('function weapon/stunning')

});

// Committed

const committedWeapons = [
  'dungeons:growing_staff'
];

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:committed')) {
    return;
  }

  let hp = hurtEntity.getComponent('minecraft:health')

  if (!hp) {
    console.warn('Entity does not have health component');
    return;
  }

  if ((hp.currentValue + damage) < hp.defaultValue) {

    hurtEntity.addTag('prevent_effect')
    if (damage + (hp.defaultValue - ((hp.currentValue + damage)) * 0.2) < 20) {
      hurtEntity.applyDamage(damage + ((hp.defaultValue - (hp.currentValue + damage)) * 1.2), {
        cause: cause,
        damagingEntity: damageSource
      });
    } else {
      hurtEntity.applyDamage(20, {
        cause: cause,
        damagingEntity: damageSource
      });
    }

    system.runTimeout(() => {
      hurtEntity.removeTag('prevent_effect')
    }, 1)
  }

});

// Illagers Bane

const illagersBaneWeapons = [
  'dungeons:bone_cudgel'
];

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (!hurtEntity.matches({
    families: ['illager']
  })) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:illagers_bane')) {
    return;
  }

  hurtEntity.runCommandAsync('function weapon/illagers_bane_fx')
  hurtEntity.addTag('prevent_effect')
  hurtEntity.applyDamage((damage * 1.75), {
    cause: cause,
    damagingEntity: damageSource
  });

  system.runTimeout(() => {
    hurtEntity.removeTag('prevent_effect')
  }, 1)

});

// Smiting

const smitingWeapons = [
  'dungeons:dark_katana'
];

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (!hurtEntity.matches({
    families: ['undead']
  })) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:smiting') && heldItem.getDynamicProperty("dungeons:gild") !== "Smiting") {
    return;
  }

  hurtEntity.runCommandAsync('function weapon/smiting_fx')
  hurtEntity.addTag('prevent_effect')
  hurtEntity.applyDamage((damage * 1.2), {
    cause: cause,
    damagingEntity: damageSource
  });

  system.runTimeout(() => {
    hurtEntity.removeTag('prevent_effect')
  }, 1)

});

// Unchanting

const unchantingWeapons = [];

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (!hurtEntity.matches({
    families: ['enchanted']
  })) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:unchanting')) {
    return;
  }

  hurtEntity.runCommandAsync('function weapon/unchanting_fx')
  hurtEntity.addTag('prevent_effect')
  hurtEntity.applyDamage((damage * 2.2), {
    cause: cause,
    damagingEntity: damageSource
  });
  system.runTimeout(() => {
    hurtEntity.removeTag('prevent_effect')
  }, 1)
});

// Ambush

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:ambush')) {
    return;
  }

  if (!damageSource.getEffect('invisibility')) return;

  hurtEntity.runCommandAsync('function weapon/ambush_fx')

  hurtEntity.addTag('prevent_effect')
  hurtEntity.applyDamage(damage * 1.33, {
    cause: cause,
    damagingEntity: damageSource
  });

  system.runTimeout(() => {
    hurtEntity.removeTag('prevent_effect')
  }, 1)



});

// Exploding

const explodingWeapons = [
  'dungeons:cursed_axe',
  'dungeons:battlestaff_of_terror'
];

world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;

  if (!damageSource) {
    return;
  }
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (deadEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (!heldItem.hasTag('dungeons:exploding')) {
    return;
  }

  let hp = deadEntity.getComponent('minecraft:health')

  if (!hp) {
    console.warn('Entity does not have health component');
    return;
  }

  const nearbyMobs = deadEntity.dimension.getEntities({
    location: deadEntity.location,
    maxDistance: 5,
    families: ['monster']
  });

  system.runTimeout(() => {

    for (const mob of nearbyMobs) {
      if (!deadEntity) {
        return;
      }
      if (mob.typeId === 'minecraft:item') continue;
      mob.applyDamage((hp.defaultValue * 0.33), {
        cause: EntityDamageCause.entityExplosion,
        damagingEntity: damageSource
      });
    }
    deadEntity.runCommandAsync('function weapon/exploding_fx')

  }, 18) // waits 0.9 seconds for death to finish

});

// Leeching

const leechingWeapons = [
  'dungeons:heartstealer'
];

world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId !== 'minecraft:player') return

  if (deadEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (damageSource.typeId === "minecraft:player" && heldItem.hasTag('dungeons:leeching') && (deadEntity.matches({
    families: ['monster']
  }) || deadEntity.matches({
    families: ['mob']
  }))) {
    deadEntity.dimension.spawnParticle('dungeons:leeching', deadEntity.location)
    let hp = damageSource.getComponent('minecraft:health')
    hp.setCurrentValue(hp.currentValue + 2)
  }
});

// Rampaging

world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId !== 'minecraft:player') return

  if (deadEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (damageSource.typeId === "minecraft:player" && heldItem.hasTag('dungeons:rampaging') && (deadEntity.matches({
    families: ['monster']
  }) || deadEntity.matches({
    families: ['mob']
  }))) {
    damageSource.dimension.spawnParticle('dungeons:death_cap', damageSource.location)
    damageSource.addEffect('strength', 100)
    damageSource.addEffect('speed', 100)
  }
});


// Rushdown

world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId !== 'minecraft:player') return

  if (deadEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (damageSource.typeId === "minecraft:player" && heldItem.hasTag('dungeons:rushdown') && (deadEntity.matches({
    families: ['monster']
  }) || deadEntity.matches({
    families: ['mob']
  }))) {
    damageSource.dimension.spawnParticle('dungeons:swiftness', damageSource.location)
    damageSource.addEffect('speed', 60, { amplifier: 2 })
  }
});