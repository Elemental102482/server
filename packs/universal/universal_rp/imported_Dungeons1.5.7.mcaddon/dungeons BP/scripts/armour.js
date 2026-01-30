import {
  world,
  system,
  EntityDamageCause,
  MolangVariableMap,
  ButtonState
}
  from "@minecraft/server";
// Wither Armour
world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId === "minecraft:player" && damageSource.hasTag('dungeons:wither_armour') && (deadEntity.matches(
    {
      families: ['monster']
    }) || deadEntity.matches(
      {
        families: ['mob']
      }))) {
    damageSource.dimension.spawnParticle('dungeons:lifesteal', damageSource.location)
    let hp = damageSource.getComponent('minecraft:health')
    hp.setCurrentValue(hp.currentValue + 2)
  }
});
// Gourdian
world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId === "minecraft:player" && damageSource.hasTag('dungeons:spooky_gourdian_armour') && (deadEntity.matches(
    {
      families: ['monster']
    }) || deadEntity.matches(
      {
        families: ['mob']
      }))) {
    damageSource.dimension.spawnParticle('dungeons:spooky_gourdian', damageSource.location)
    deadEntity.dimension.spawnParticle('dungeons:spooky_gourdian', deadEntity.location)
    let hp = damageSource.getComponent('minecraft:health')
    hp.setCurrentValue(hp.currentValue + 2)
  }
});
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:spooky_gourdian_armour"]
    })) {
    player.dimension.spawnParticle('dungeons:spooky_gourdian_idle', player.location)
  }
}, 20);
// Fox Armour is in the files for weapon cooldowns

//SNOW armour
world.afterEvents.effectAdd.subscribe((event) => {
  const entity = event.entity;
  if (!entity.hasTag('dungeons:snow_armour') && !entity.hasTag('dungeons:frost_armour')) {
    return;
  }
  const amplifier = event.effect.amplifier;
  const duration = event.effect.duration;
  const effectId = event.effect.typeId;
  let multiplier = 1;
  if (entity.hasTag(`dungeons:ignore_${effectId}`)) {
    entity.removeTag(`dungeons:ignore_${effectId}`)
    return;
  }
  if (entity.typeId !== 'minecraft:player') return;
  if (effectId === 'slowness') {
    multiplier = multiplier * 0.5;
  }
  else {
    return;
  }
  if (entity.hasTag('dungeons:debug')) entity.sendMessage(`${effectId} level ${amplifier + 1} for ${duration / 20}s. extended to ${Math.round((duration * multiplier) / 20)}`)
  entity.addTag(`dungeons:ignore_${effectId}`)
  entity.removeEffect(effectId);
  entity.addEffect(effectId, Math.ceil((duration * multiplier)),
    {
      amplifier: amplifier
    });
  system.runTimeout(() => {
    entity.removeTag(`dungeons:ignore_${effectId}`);
  }, 20);
});

// Frost Armour
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:frost_armour"]
    })) {
    const nearbyMobs = player.dimension.getEntities(
      {
        location: player.location,
        maxDistance: 8,
        families: ['monster']
      });
    for (const mob of nearbyMobs) {
      mob.runCommandAsync('particle dungeons:element_freeze ~~1~')
      mob.addEffect("slowness", 30,
        {
          amplifier: 0,
          showParticles: false
        });
    }
  }
}, 30);
// VERDANT ARMOUR is in the files for souls and eternal knife
// EMBER Armour
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (!damageSource) {
    return;
  }
  if (!damageSource.isValid()) return;
  if (!hurtEntity.hasTag('dungeons:ember_armour')) {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause == "fireTick") return;
  damageSource.dimension.spawnParticle('dungeons:wildfire_flames',
    {
      x: damageSource.location.x,
      y: damageSource.location.y + 1,
      z: damageSource.location.z
    });
  hurtEntity.playSound('fire.ignite',
    {
      pitch: 1.5,
      volume: 0.3
    });
  damageSource.setOnFire(1 + (damage * 3), true);
  if (damage > 10) {
    damageSource.applyDamage(1 + (10 / 2),
      {
        cause: EntityDamageCause.fireTick,
        damagingEntity: hurtEntity
      });
  }
  else {
    damageSource.applyDamage(1 + (damage / 2),
      {
        cause: EntityDamageCause.fireTick,
        damagingEntity: hurtEntity
      });
  }
});
//SHADOW WALKER
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    if (player.isSprinting && player.hasTag("dungeons:shadow_walker_armour")) {
      player.addEffect("resistance", 3,
        {
          amplifier: 2,
          showParticles: false
        });
    }
  }
});
// Emerald
world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  if (!damageSource) {
    return;
  }
  if (damageSource.typeId === "minecraft:player" && (damageSource.hasTag('dungeons:emerald_armour') || damageSource.hasTag('dungeons:opulent_armour') || damageSource.hasTag('dungeons:gilded_glory_armour')) && (deadEntity.matches(
    {
      families: ['monster']
    }) || deadEntity.matches(
      {
        families: ['mob']
      }))) {
    deadEntity.dimension.spawnParticle('dungeons:emerald', deadEntity.location)
    damageSource.playSound('artefact.shadow_break',
      {
        pitch: 1.5,
        volume: 0.3
      });
    let hp = deadEntity.getComponent('minecraft:health')
    damageSource.addExperience(hp.defaultValue * 0.5);
  }
});
// Opulent Armour
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:opulent_armour"]
    })) {
    const playerLevel = player.level;
    system.runTimeout(() => {
      if (player.level > playerLevel) {
        player.dimension.spawnParticle('dungeons:emerald_shield', player.location)
        player.playSound('beacon.activate',
          {
            pitch: 1.5,
            volume: 0.3
          });
        player.addEffect('resistance', 100,
          {
            amplifier: 5
          });
      }
    }, 1);
  }
}, 1);
// Gilded Glory
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:gilded_glory_armour"]
    })) {
    const hp = player.getComponent('minecraft:health');
    if (player.level > 10 && hp.currentValue < (hp.defaultValue / 2)) {
      player.dimension.spawnParticle('dungeons:emerald_healing', player.location)
      player.playSound('beacon.activate',
        {
          pitch: 1,
          volume: 0.1
        });
      hp.setCurrentValue(hp.currentValue + 2)
      player.addLevels(-1);
    }
  }
}, 20);
// TURTLE ARMOUR
world.afterEvents.entityHealthChanged.subscribe((event) => {
  const player = event.entity;
  const oldValue = event.oldValue;
  const newValue = event.newValue;
  const dif = newValue - oldValue;
  if (player.typeId !== 'minecraft:player') {
    return;
  }
  if (!player.hasTag('dungeons:nimble_turtle_armour') && !player.hasTag('dungeons:turtle_armour')) {
    return;
  }
  if (newValue < oldValue) {
    return;
  }
  if (player.hasTag('dungeons:healing')) return;
  player.addTag('dungeons:healing');
  let hp = player.getComponent('minecraft:health')
  hp.setCurrentValue(hp.currentValue + (dif / 3));
  player.removeTag('dungeons:healing');
});
// NIMBLE TURTLE Armour
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (!hurtEntity.hasTag('dungeons:nimble_turtle_armour')) {
    return;
  }
  hurtEntity.dimension.spawnParticle('dungeons:swiftness', hurtEntity.location);
  hurtEntity.playSound('artefact.shadow_break',
    {
      pitch: 2,
      volume: 0.3
    });
  hurtEntity.addEffect('speed', 60,
    {
      amplifier: 2
    });
});
// SQUID INK
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (!damageSource) {
    return;
  }
  if (!damageSource.isValid()) return;
  if ((!hurtEntity.hasTag('dungeons:glow_squid_armour') && !hurtEntity.hasTag('dungeons:squid_armour')) || hurtEntity.hasTag('squid_ink_cooldown')) {
    return;
  }
  if (hurtEntity.hasTag('dungeons:squid_armour')) {
    hurtEntity.dimension.spawnParticle('dungeons:squid_ink', hurtEntity.location);
    hurtEntity.playSound('mob.squid.ink_squirt',
      {
        pitch: 1.0,
        volume: 0.6
      });
  }
  else {
    hurtEntity.dimension.spawnParticle('dungeons:glow_squid_ink', hurtEntity.location);
    hurtEntity.playSound('mob.glow_squid.ink_squirt',
      {
        pitch: 1.0,
        volume: 0.6
      });
  }
  const nearbyMobs = hurtEntity.dimension.getEntities(
    {
      location: hurtEntity.location,
      maxDistance: 4
    });
  for (const mob of nearbyMobs) {
    if (mob == damageSource) {
      mob.addEffect('weakness', 75);
      mob.addEffect('blindness', 40);
      break;
    }
  }
  hurtEntity.addTag('squid_ink_cooldown');
  system.runTimeout(() => {
    hurtEntity.removeTag('squid_ink_cooldown');
  }, 100);
});
// GLOW SQUID INK
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (!hurtEntity.hasTag('dungeons:glow_squid_armour')) {
    return;
  }
  system.runTimeout(() => {
    hurtEntity.addEffect('resistance', 7,
      {
        amplifier: 255,
        showParticles: false
      });
  }, 8);
  hurtEntity.dimension.spawnParticle('dungeons:glow_squid_sparkles', hurtEntity.location);
  hurtEntity.playSound('mob.glow_squid.ink_squirt',
    {
      pitch: 1.5,
      volume: 0.6
    });
});
// THIEF ARMOUR is in the files for cooldowns 
// SPIDER ARMOUR
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (!damageSource) {
    return;
  }
  if (!damageSource.isValid()) return;
  if (!damageSource.typeId === 'minecraft:player') return;
  if (!damageSource.hasTag('dungeons:spider_armour')) {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  let hp = damageSource.getComponent('minecraft:health')
  hp.setCurrentValue(hp.currentValue + damage * 0.07)
});
// SPROUT ARMOUR
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    if (player.isSprinting && (player.hasTag('dungeons:sprout_armour') || player.hasTag('dungeons:living_vines_armour'))) {
      const nearbyMobs = player.dimension.getEntities(
        {
          location: player.location,
          maxDistance: 3,
          closest: 5,
          families: ['monster']
        });
      for (const mob of nearbyMobs) {
        mob.dimension.spawnParticle('dungeons:whip_poison', mob.location)
        if (!mob.getEffect('slowness')) {
          mob.addEffect("slowness", 35,
            {
              amplifier: 2,
              showParticles: false
            });
        }
        if (!mob.getEffect('poison')) {
          mob.addEffect("poison", 40,
            {
              amplifier: 2,
              showParticles: false
            });
        }
      }
      const nearbyPlayers = player.dimension.getEntities(
        {
          location: player.location,
          maxDistance: 3,
          families: ['player']
        });
      for (const enemyplayer of nearbyPlayers) {
        if (enemyplayer !== player) {
          enemyplayer.dimension.spawnParticle('dungeons:whip_poison', enemyplayer.location)
          if (!enemyplayer.getEffect('slowness')) {
            enemyplayer.addEffect("slowness", 35,
              {
                amplifier: 1,
                showParticles: false
              });
          }
          if (!enemyplayer.getEffect('fatal_poison')) {
            enemyplayer.addEffect("fatal_poison", 40,
              {
                amplifier: 2,
                showParticles: false
              });
          }
        }
      }
    }
  }
}, 15);
// LIVING VINES ARMOUR
world.afterEvents.entityHurt.subscribe((event) => {
  const damaged = event.hurtEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (damage > 4 || cause != "magic") {
    return;
  }
  if (damaged.getEffect('poison') || damaged.getEffect('fatal_poison')) {
    const players = damaged.dimension.getPlayers(
      {
        tags: ['dungeons:living_vines_armour'],
        maxDistance: 10,
        location: damaged.location
      });
    for (const player of players) {
      let hp = player.getComponent('minecraft:health');
      if (hp.currentValue < hp.defaultValue) {
        let healing = (damage / 2) / players.length;
        hp.setCurrentValue(hp.currentValue + healing)
        let xDif = player.location.x - damaged.location.x;
        let zDif = player.location.x - damaged.location.z;
        let yDif = player.location.x - damaged.location.y;
        const molang = new MolangVariableMap();
        molang.setColorRGB('color',
          {
            red: 0.0,
            green: 1.0,
            blue: 0.0
          });
        molang.setVector3('direction',
          {
            x: xDif,
            y: yDif,
            z: zDif
          });
        molang.setFloat('particle_initial_speed', (Math.abs(xDif) + Math.abs(yDif) + Math.abs(zDif)));
        molang.setFloat('max_lifetime', 1);
        player.dimension.spawnParticle('minecraft:creaking_heart_trail', player.location, molang);
      }
    }
  }
});
// ENDER Armour
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  const damage = event.damage;
  if (!damageSource) {
    return;
  }
  if (!damageSource.isValid()) return;
  if (!hurtEntity.hasTag('dungeons:ender_armour')) {
    return;
  }
  let rand = Math.floor(Math.random() * 10);
  if (rand !== 5) return;
  hurtEntity.dimension.spawnParticle('dungeons:instant_teleoort',
    {
      x: hurtEntity.location.x,
      y: hurtEntity.location.y + 1,
      z: hurtEntity.location.z
    });
  hurtEntity.playSound('mob.enderman.portal',
    {
      pitch: 1.5,
      volume: 1.0
    });
  hurtEntity.runCommand('function random_teleport');
});
const positiveEffects = [
  'speed',
  'haste',
  'strength',
  'jump_boost',
  'regeneration',
  'resistance',
  'fire_resistance',
  'water_breathing',
  'invisibility',
  'night_vision',
  'health_boost',
  'absorption',
  'slow_falling',
  'conduit_power',
  'village_hero'
];
const negativeEffects = [
  'slowness',
  'mining_fatigue',
  'nausea',
  'blindness',
  'hunger',
  'weakness',
  'poison',
  'wither',
  'levitation',
  'fatal_poison',
  'bad_omen',
  'darkness',
  'trial_omen',
  'raid_omen',
  'oozing',
  'wind_charged',
  'infested',
  'weaving'
];
// ENTRRTAINER GARB & TROUBADOUR
world.afterEvents.effectAdd.subscribe((event) => {
  const entity = event.entity;
  if (!entity.hasTag('dungeons:entertainer_armour') && !entity.hasTag('dungeons:troubadour_armour')) {
    return;
  }
  const amplifier = event.effect.amplifier;
  const duration = event.effect.duration;
  const effectId = event.effect.typeId;
  let multiplier = 1;
  if (entity.hasTag(`dungeons:ignore_${effectId}`)) {
    entity.removeTag(`dungeons:ignore_${effectId}`)
    return;
  }
  if (entity.typeId !== 'minecraft:player') return;
  if (positiveEffects.includes(effectId)) {
    multiplier = multiplier * 1.3;
  }
  else if (entity.hasTag('dungeons:troubadour_armour') && negativeEffects.includes(effectId)) {
    multiplier = multiplier * 0.7;
  }
  else {
    return;
  }
  if (entity.hasTag('dungeons:debug')) entity.sendMessage(`${effectId} level ${amplifier + 1} for ${duration / 20}s. extended to ${Math.round((duration * multiplier) / 20)}`)
  entity.addTag(`dungeons:ignore_${effectId}`)
  entity.removeEffect(effectId);
  entity.addEffect(effectId, Math.ceil((duration * multiplier)),
    {
      amplifier: amplifier
    });
  system.runTimeout(() => {
    entity.removeTag(`dungeons:ignore_${effectId}`);
  }, 20);
});
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:troubadour_armour"]
    })) {
    player.dimension.spawnParticle('dungeons:troubadour', player.location);
  }
}, 30);
// Shulker Armour
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:shulker_armour"]
    })) {
    const nearbyMobs = player.dimension.getEntities(
      {
        location: player.location,
        maxDistance: 12,
        families: ['monster']
      });
    if (nearbyMobs.length >= 4) {
      player.addEffect("resistance", 40,
        {
          amplifier: 0,
          showParticles: true
        });
    }
  }
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:sturdy_shulker_armour"]
    })) {
    const nearbyMobs = player.dimension.getEntities(
      {
        location: player.location,
        maxDistance: 12,
        families: ['monster']
      });
    if (nearbyMobs.length >= 4) {
      player.addEffect("resistance", 40,
        {
          amplifier: 0,
          showParticles: true
        });
    }
  }
}, 40);
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:sturdy_shulker_armour"]
    })) {
    const nearbyMobs = player.dimension.getEntities(
      {
        location: player.location,
        maxDistance: 8,
        closest: 1,
        families: ['monster'],
        excludeFamilies: ['gravity_immune']
      });
    for (const mob of nearbyMobs) {
      mob.runCommandAsync('particle dungeons:shulker_stun ~~1~')
      mob.addEffect("slowness", 30,
        {
          amplifier: 3,
          showParticles: false
        });
      mob.addEffect("levitation", 30,
        {
          amplifier: 3,
          showParticles: true
        });
      player.playSound('mob.shulker.shoot',
        {
          pitch: 1.25,
          volume: 0.6
        });
    }
  }
}, 80);
// TELEPORT ROBE
world.afterEvents.playerButtonInput.subscribe((event) => {
  const player = event.player;
  const button = event.button;
  const newState = event.newButtonState;
  let inputInfo = player.inputInfo.lastInputModeUsed;
  if (!player.hasTag('dungeons:teleportation_armour') && !player.hasTag('dungeons:unstable_armour')) {
    return;
  }
  if (button === "Jump") return;
  if (newState === ButtonState.Released) return;
  if (player.hasTag('dungeons:debug')) {
    player.sendMessage(button);
    player.sendMessage(newState);
    player.sendMessage(inputInfo);
  }
  if (player.hasTag('dungeons:detect_double_sneak')) {
    player.removeTag('dungeons:detect_double_sneak');
    const raycast = player.getBlockFromViewDirection(
      {
        maxDistance: 48,
        includePassableBlocks: false,
        includeLiquidBlocks: true
      });
    if (!raycast) return;
    let tpCD = world.scoreboard.getObjective('tpCD').getScore(player)
    if (tpCD > 0) return;
    world.scoreboard.getObjective('tpCD').addScore(player, 40)
    player.dimension.spawnParticle('dungeons:instant_teleoort',
      {
        x: player.location.x,
        y: player.location.y + 1,
        z: player.location.z
      });
    player.dimension.spawnParticle('dungeons:ambush', player.location)
    player.dimension.playSound('mob.endermen.portal', player.location,
      {
        volume: 0.5
      });
    if (player.hasTag('dungeons:unstable_armour')) {
      const nearbyMobs = player.dimension.getEntities(
        {
          location: player.location,
          maxDistance: 5,
          families: ['monster']
        });
      for (const mob of nearbyMobs) {
        if (!player) {
          return;
        }
        if (mob.typeId === 'minecraft:item') continue;
        mob.applyDamage(10,
          {
            cause: EntityDamageCause.entityExplosion,
            damagingEntity: player
          });
      }
      player.runCommand('function weapon/exploding_fx')
    }
    const block = raycast.block.location;
    const faceLocation = raycast.faceLocation;
    const face = raycast.face;
    if ((face === "Up" || face === "Down") || !raycast.block.above().isAir) {
      player.tryTeleport(
        {
          x: block.x + faceLocation.x,
          y: block.y + faceLocation.y,
          z: block.z + faceLocation.z
        },
        {
          checkForBlocks: false
        });
    }
    else {
      player.tryTeleport(
        {
          x: block.x + 0.5,
          y: block.y + 1,
          z: block.z + 0.5
        },
        {
          checkForBlocks: false
        });
    }
    system.runTimeout(() => {
      player.dimension.spawnParticle('dungeons:instant_teleoort',
        {
          x: player.location.x,
          y: player.location.y + 1,
          z: player.location.z
        });
      player.dimension.spawnParticle('dungeons:ambush', player.location)
      player.dimension.playSound('mob.endermen.portal', player.location,
        {
          volume: 0.5
        });
    }, 1);
    return;
  }
  if (!player.hasTag('dungeons:detect_double_sneak')) {
    player.addTag('dungeons:detect_double_sneak');
    if (inputInfo === "Touch") {
      system.runTimeout(() => {
        if (player.hasTag('dungeons:detect_double_sneak')) player.removeTag('dungeons:detect_double_sneak');
      }, 10);
      return;
    }
    else {
      system.runTimeout(() => {
        if (player.hasTag('dungeons:detect_double_sneak')) player.removeTag('dungeons:detect_double_sneak');
      }, 5);
    }
  }
});

//cauldron
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:cauldron_armour"]
    })) {
    player.dimension.spawnParticle('dungeons:cauldron_armour', player.location)
  }
}, 30);



// Ghost Armour
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:ghostly_armour"]
    })) {
    if (player.isSprinting) {
      player.addEffect("speed", 4, { amplifier: 0, showParticles: false });
      player.addEffect("resistance", 4, { amplifier: 0, showParticles: false });
      player.addEffect("invisibility", 4, { amplifier: 0, showParticles: false });
      player.addEffect("weakness", 4, { amplifier: 0, showParticles: false });
      player.playAnimation('animation.shadow', { nextState: 'shadowForm' });
      player.dimension.spawnParticle("dungeons:ghostly_smoke", player.location)
    }
  }
});


// Ghost kindler Armour
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:ghost_kindler_armour"]
    })) {
    if (player.isSprinting) {
      player.addEffect("speed", 4, { amplifier: 0, showParticles: false });
      player.addEffect("resistance", 4, { amplifier: 0, showParticles: false });
      player.addEffect("invisibility", 4, { amplifier: 0, showParticles: false });
      player.addEffect("weakness", 4, { amplifier: 0, showParticles: false });
      player.playAnimation('animation.shadow', { nextState: 'shadowForm' });
      player.dimension.spawnParticle("dungeons:ghostly_smoke_red", player.location)

      const nearbyMobs = player.dimension.getEntities(
        {
          location: player.location,
          maxDistance: 3,
          closest: 5,
          families: ['monster']
        });
      for (const mob of nearbyMobs) {
        const fire = mob.getComponent("minecraft:onfire")
        if (!fire) {
          mob.applyDamage(4, { cause: EntityDamageCause.fire, damagingEntity: player })
          mob.setOnFire(Math.floor(Math.random() * 4) + 4, true)
          mob.dimension.spawnParticle('dungeons:ghostly_kindler_burn', mob.location)
          player.dimension.spawnParticle('dungeons:cloaked_skull_idle', player.location)
        }
      }
      const nearbyPlayers = player.dimension.getEntities(
        {
          location: player.location,
          maxDistance: 3,
          families: ['player']
        });
      for (const enemyplayer of nearbyPlayers) {
        if (enemyplayer !== player) {
          const fire = enemyplayer.getComponent("minecraft:onfire")
          if (!fire) {
            enemyplayer.applyDamage(3, { cause: EntityDamageCause.fire, damagingEntity: player })
            enemyplayer.setOnFire(Math.floor(Math.random() * 4) + 2, true)
            enemyplayer.dimension.spawnParticle('dungeons:ghostly_kindler_burn', enemyplayer.location)
            player.dimension.spawnParticle('dungeons:cloaked_skull_idle', player.location)
          }
        }
      }
    }
  }
});

// Cloaked Skull Armour
system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:cloaked_skull_armour"]
    })) {
    if (player.isSprinting) {
      player.addEffect("speed", 4, { amplifier: 0, showParticles: false });
      player.addEffect("resistance", 4, { amplifier: 0, showParticles: false });
      player.addEffect("invisibility", 4, { amplifier: 0, showParticles: false });
      player.addEffect("weakness", 4, { amplifier: 0, showParticles: false });
      player.playAnimation('animation.shadow', { nextState: 'shadowForm' });
      player.dimension.spawnParticle("dungeons:ghostly_smoke_black", player.location)

      const nearbyMobs = player.dimension.getEntities(
        {
          location: player.location,
          maxDistance: 3,
          closest: 5,
          families: ['monster']
        });
      for (const mob of nearbyMobs) {
        const fire = mob.getComponent("minecraft:onfire")
        if (!fire) {
          mob.applyDamage(4, { cause: EntityDamageCause.fire, damagingEntity: player })
          mob.setOnFire(Math.floor(Math.random() * 4) + 4, true)
          mob.dimension.spawnParticle('dungeons:ghostly_kindler_burn', mob.location)
          player.dimension.spawnParticle('dungeons:cloaked_skull_idle', player.location)
        }
      }
      const nearbyPlayers = player.dimension.getEntities(
        {
          location: player.location,
          maxDistance: 3,
          families: ['player']
        });
      for (const enemyplayer of nearbyPlayers) {
        if (enemyplayer !== player) {
          const fire = enemyplayer.getComponent("minecraft:onfire")
          if (!fire) {
            enemyplayer.applyDamage(3, { cause: EntityDamageCause.fire, damagingEntity: player })
            enemyplayer.setOnFire(Math.floor(Math.random() * 4) + 2, true)
            enemyplayer.dimension.spawnParticle('dungeons:ghostly_kindler_burn', enemyplayer.location)
            player.dimension.spawnParticle('dungeons:cloaked_skull_idle', player.location)
          }
        }
      }
    }
  }
});

system.runInterval(() => {
  for (const player of world.getPlayers(
    {
      tags: ["dungeons:cloaked_skull_armour"]
    })) {
    if (!player.isSprinting) player.dimension.spawnParticle('dungeons:cloaked_skull_idle', player.location)
  }
}, 10);