import {
  world,
  system,
  EntityDamageCause
} from "@minecraft/server";

const dimensionIds = ["overworld", "nether", "the_end"];

function findChainEnemy(target, player) {
  let rand = Math.random();
  if (rand > 0.33) return;
  target.addTag('dungeons:chained');
  const damageRange = target.dimension.getEntities({
    location: target.location,
    maxDistance: 8,
    closest: 1,
    families: ['player'],
    excludeTags: ['dungeons:chained']
  });
  for (const enemy of damageRange) {
    enemy.addEffect('slowness', 33, {
      amplifier: 9,
      showParticles: false
    });
    target.dimension.spawnParticle('dungeons:chain', target.location);
    target.dimension.playSound('block.bell.hit', target.location, {
      volume: 0.66,
      pitch: 2.5
    });
    system.runTimeout(() => {
      findChainEnemy(enemy, player)
    }, 4);
  }
  system.runTimeout(() => {
    target.removeTag('dungeons:chained');
  }, 30);
}
// WIND TOTEM
world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const mob = event.entity;
  const eventId = event.eventId;
  if (eventId !== 'dungeons:totem_timer') {
    return;
  }
  const hp = mob.getComponent('minecraft:health');
  if (!hp) {
    return;
  }
  if (hp.currentValue < 100) {
    if (!(mob.hasTag('wt_cd')) && Math.floor(Math.random() * 111) == 2) {
      mob.dimension.spawnEntity('dungeons:wind_totem_burst', mob.location);
      if (Math.floor(Math.random() * 8) == 2) {
        mob.dimension.spawnEntity('minecraft:pillager', {
          x: mob.location.x,
          y: mob.location.y,
          z: mob.location.z - 1
        });
      }
      mob.addTag('wt_cd');
      system.runTimeout(() => {
        mob.removeTag('wt_cd')
      }, 100);
      return;
    }
  }
  const nearby = mob.dimension.getPlayers({
    location: mob.location,
    maxDistance: 4
  });
  if (nearby.length == 0) return;
  mob.dimension.spawnParticle('dungeons:wind_totem_power', mob.location);
  hp.setCurrentValue(hp.currentValue - 1);
  const rand1 = Math.floor(Math.random() * 13) + 1;
  const rand2 = Math.floor(Math.random() * 100) + 1;
  const rand3 = Math.floor(Math.random() * 7) + 1;
  if ((!(mob.hasTag('wt_cd')) && rand1 == 1 && (1.15 * hp.currentValue) < rand2) || hp.currentValue == 66 || hp.currentValue == 33) {
    mob.dimension.spawnEntity('dungeons:wind_totem_burst', mob.location);
    if (rand3 == 1) {
      mob.dimension.spawnEntity('minecraft:vindicator', {
        x: mob.location.x,
        y: mob.location.y,
        z: mob.location.z - 1
      });
      mob.addTag('wt_cd');
      system.runTimeout(() => {
        mob.removeTag('wt_cd')
      }, 100);
    }
    if (rand3 == 2) {
      mob.dimension.spawnEntity('minecraft:pillager', {
        x: mob.location.x,
        y: mob.location.y,
        z: mob.location.z - 1
      });
      mob.dimension.spawnEntity('minecraft:pillager', {
        x: mob.location.x + 1,
        y: mob.location.y,
        z: mob.location.z
      });
      mob.addTag('wt_cd');
      system.runTimeout(() => {
        mob.removeTag('wt_cd')
      }, 200);
    }
    if (rand3 == 3) {
      mob.dimension.spawnEntity('minecraft:pillager', {
        x: mob.location.x,
        y: mob.location.y,
        z: mob.location.z - 1
      });
      mob.addTag('wt_cd');
      system.runTimeout(() => {
        mob.removeTag('wt_cd')
      }, 100);
    }
    if (rand3 == 4) {
      mob.dimension.spawnEntity('dungeons:windcaller', {
        x: mob.location.x,
        y: mob.location.y,
        z: mob.location.z - 1
      });
      mob.addTag('wt_cd');
      system.runTimeout(() => {
        mob.removeTag('wt_cd')
      }, 100);
    }
  }
})
//SPONGE STRIKER DAMAGE
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damage = event.damage;
  if (hurtEntity.typeId !== 'minecraft:player') return;
  const score = world.scoreboard.getObjective('spongeStrikerCharge').getScore(hurtEntity);
  if (Math.floor(damage) > 50) {
    world.scoreboard.getObjective('spongeStrikerCharge').setScore(hurtEntity, 50);
  } else if (Math.floor(damage) > score && score < 50) {
    world.scoreboard.getObjective('spongeStrikerCharge').setScore(hurtEntity, Math.ceil(damage));
  } else {
    world.scoreboard.getObjective('spongeStrikerCharge').addScore(hurtEntity, 1);
  }
});
//ANCIENT GUARDIAN VFX
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) return;
  if (cause == "thorns") return;
  if (damageSource.typeId === "dungeons:ancient_guardian") {
    hurtEntity.dimension.spawnParticle('dungeons:scatter_mine_boom', hurtEntity.location);
  }
});
//BONEBOW
system.runInterval(() => {
  for (let dimId of dimensionIds) {
    for (let entity of world.getDimension(dimId).getEntities({
      tags: ["dungeons:bonebow"]
    })) {
      let scale = entity.getComponent('minecraft:scale');
      if (scale.value < 6 && !entity.isOnGround) {
        scale.value = scale.value + 0.1;
      }
    }
  }
})
//VINE BOW
system.runInterval(() => {
  for (let dimId of dimensionIds) {
    for (let entity of world.getDimension(dimId).getEntities({
      tags: ["dungeons:twisting_vine_bow"]
    })) {
      if (!entity.isOnGround) {
        entity.dimension.spawnParticle('dungeons:poison_bow_trail', entity.location);
        const poison = entity.dimension.spawnEntity('dungeons:poison_trail', entity.location);
      }
    }
    for (let entity of world.getDimension(dimId).getEntities({
      tags: ["dungeons:weeping_vine_bow"]
    })) {
      if (!entity.isOnGround) {
        entity.dimension.spawnParticle('dungeons:poison_bow_trail', entity.location);
        const poison = entity.dimension.spawnEntity('dungeons:poison_trail', entity.location);
      }
    }
  }
})
// GUARDIAN EYE
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    let guardianEye = world.scoreboard.getObjective('guardianEye')
    let guardianEyePlayer = guardianEye.getScore(player);
    const item = player.getComponent("minecraft:equippable").getEquipment("Mainhand");
    if (guardianEyePlayer > 0) {
      if (!item) {
        guardianEye.setScore(player, 0);
        player.removeTag('dungeons:using_common_guardian');
        player.removeTag('dungeons:using_rare_guardian');
        player.dimension.playSound('mob.guardian.death', player.location, {
          pitch: 0.6
        });
        return;
      }
      if ((player.hasTag('dungeons:using_common_guardian') && (item.typeId !== 'dungeons:eye_of_the_guardian' && item.typeId !== 'dungeons:tome_of_duplication')) || (player.hasTag('dungeons:using_rare_guardian') && (item.typeId !== 'dungeons:rare_eye_of_the_guardian' && item.typeId !== 'dungeons:rare_tome_of_duplication'))) {
        guardianEye.setScore(player, 0);
        player.removeTag('dungeons:using_common_guardian');
        player.removeTag('dungeons:using_rare_guardian');
        player.dimension.playSound('mob.guardian.death', player.location, {
          pitch: 0.6
        });
        return;
      }
      player.addEffect('slowness', 10, {
        amplifier: 3,
        showParticles: false
      });
      const ammo = player.dimension.spawnEntity('dungeons:eye_guardian_ammo', player.getHeadLocation());
      const proj = ammo.getComponent('projectile');
      proj.owner = player;
      proj.shoot(player.getViewDirection());
      system.runTimeout(() => {
        ammo.remove()
      }, 25);
      guardianEye.addScore(player, -1);
    }
  }
}, 1);
//FUNGUS THROWER VFX
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) return;
  if (damageSource.typeId === "dungeons:piglin_fungus_thrower") {
    hurtEntity.dimension.spawnParticle('dungeons:nethershroom_boom', hurtEntity.location);
  }
});
//HOGLIN AOE
world.afterEvents.entityHitEntity.subscribe((event) => {
  const hurtEntity = event.hitEntity;
  const damageSource = event.damagingEntity;
  if (damageSource.typeId === "minecraft:hoglin") {
    const xDif = hurtEntity.location.x - damageSource.location.x;
    const zDif = hurtEntity.location.z - damageSource.location.z;
    hurtEntity.applyKnockback(xDif, zDif, 1.8, 0.64);
    damageSource.addEffect('slowness', 17, {
      amplifier: 7,
      showParticles: false
    });
  }
});
// CORRUPTED BEACON
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    let beam = world.scoreboard.getObjective('corruptBeacon')
    let beamPlayer = beam.getScore(player);
    const item = player.getComponent("minecraft:equippable").getEquipment("Mainhand");
    if (beamPlayer > 0) {
      if (!item) {
        beam.setScore(player, 0);
        player.removeTag('dungeons:using_common_beacon');
        player.removeTag('dungeons:using_rare_beacon');
        player.dimension.playSound('beacon.deactivate', player.location, {
          pitch: 0.5
        });
        return;
      }
      if ((player.hasTag('dungeons:using_common_beacon') && (item.typeId !== 'dungeons:corrupted_beacon' && item.typeId !== 'dungeons:tome_of_duplication')) || (player.hasTag('dungeons:using_rare_beacon') && (item.typeId !== 'dungeons:rare_corrupted_beacon' && item.typeId !== 'dungeons:rare_tome_of_duplication'))) {
        beam.setScore(player, 0);
        player.removeTag('dungeons:using_common_beacon');
        player.removeTag('dungeons:using_rare_beacon');
        player.dimension.playSound('beacon.deactivate', player.location, {
          pitch: 0.5
        });
        return;
      }
      if (beamPlayer == 1) {
        let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player);
        if (soulGauge < 1) {
          player.runCommandAsync('function artifact/corrupted_beacon_fail')
          beam.setScore(player, 0);
          player.removeTag('dungeons:using_common_beacon');
          player.removeTag('dungeons:using_rare_beacon');
          player.dimension.playSound('beacon.deactivate', player.location, {
            pitch: 0.5
          });
          return;
        } else if (player.hasTag('dungeons:using_common_beacon')) {
          beam.addScore(player, 4);
          player.runCommandAsync('function artifact/corrupted_beacon_vfx')
        } else if (player.hasTag('dungeons:using_rare_beacon')) {
          beam.addScore(player, 6);
          player.runCommandAsync('function artifact/corrupted_beacon_vfx')
        }
      }
      player.addEffect('slowness', 10, {
        amplifier: 3,
        showParticles: false
      });
      const ammo = player.dimension.spawnEntity('dungeons:corrupted_beacon_ammo', player.getHeadLocation());
      const proj = ammo.getComponent('projectile');
      proj.owner = player;
      proj.shoot(player.getViewDirection());
      system.runTimeout(() => {
        ammo.remove()
      }, 25);
      beam.addScore(player, -1);
    }
  }
}, 1);
// VOID
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damage = event.damage;
  if (!hurtEntity) return;
  let block = hurtEntity.dimension.getBlock(hurtEntity.location);
  let up = block.above();
  if (block.typeId !== 'dungeons:void_fluid' && up.typeId !== 'dungeons:void_fluid') return;
  if (hurtEntity.typeId !== 'minecraft:player' && hurtEntity.typeId !== 'dungeons:dummy') return;
  hurtEntity.addEffect('slowness', 60, {
    amplifier: 3,
    showParticles: false
  });
  let hp = hurtEntity.getComponent('minecraft:health')
  if (!hp) {
    console.warn('Entity does not have health component');
    return;
  }
  if (hp.currentValue - damage < 1) {
    hp.setCurrentValue(1)
  } else {
    hp.setCurrentValue(hp.currentValue - damage)
  }
});
//ENDERSENT POISON
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) return;
  if (cause != "entityAttack") return;
  if (damageSource.hasTag('dungeons:enchant_poison_cloud')) {
    hurtEntity.dimension.spawnParticle('dungeons:whip_poison', hurtEntity.location);
    hurtEntity.addEffect('poison', 100, {
      amplifier: 1
    });
  }
});
//ENDERSENT WEAKENING
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) return;
  if (cause != "entityAttack") return;
  if (damageSource.hasTag('dungeons:enchant_weakening')) {
    if (!hurtEntity || !hurtEntity.isValid()) return;
    if (hurtEntity.getEffect('weakness')) return;
    hurtEntity.addEffect('weakness', 300);
    hurtEntity.dimension.spawnParticle('dungeons:cauldron_summon', {
      x: hurtEntity.location.x,
      y: hurtEntity.location.y + 1,
      z: hurtEntity.location.z
    });
    hurtEntity.dimension.getEntities({
      location: hurtEntity.location,
      maxDistance: 4,
      families: ['player']
    }).forEach(entity => {
      if (entity !== damageSource) {
        entity.addEffect('weakness', 225);
      }
    });
  }
});
// ENDERSENT CRITICAL
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }
  if (!damageSource.isValid() || !hurtEntity.isValid()) return;
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (!damageSource.hasTag('dungeons:critical_hit_enchant')) {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const critical = Math.floor(Math.random() * 10);
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
// ENDERSENT COMMITTED
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (hurtEntity.hasTag('prevent_effect')) return;
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  if (!damageSource.hasTag('dungeons:enchant_committed')) {
    return;
  }
  let hp = hurtEntity.getComponent('minecraft:health')
  if (!hp) {
    console.warn('Entity does not have health component');
    return;
  }
  if ((hp.currentValue + damage) < hp.defaultValue) {
    hurtEntity.addTag('prevent_effect')
    if (damage + (hp.defaultValue - ((hp.currentValue + damage)) * 1.6) < (damage * 2.5)) {
      hurtEntity.applyDamage(damage + ((hp.defaultValue - (hp.currentValue + damage)) * 1.6), {
        cause: cause,
        damagingEntity: damageSource
      });
    } else {
      hurtEntity.applyDamage(damage + (damage * 2.5), {
        cause: cause,
        damagingEntity: damageSource
      });
    }
    system.runTimeout(() => {
      hurtEntity.removeTag('prevent_effect')
    }, 1)
  }
});
// ENCHANT RAMPAGING
// Rampaging
world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if (!damageSource) {
    return;
  }
  if (deadEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  if (damageSource.hasTag('dungeons:enchant_rampaging') && (deadEntity.matches({
    families: ['monster']
  }) || deadEntity.matches({
    families: ['mob']
  }) || deadEntity.matches({
    families: ['player']
  }))) {
    damageSource.dimension.spawnParticle('dungeons:death_cap', damageSource.location)
    damageSource.addEffect('strength', 100)
    damageSource.addEffect('speed', 100)
  }
});
// ENDERSENT CHAINS
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }
  if (!damageSource.isValid() || !hurtEntity.isValid()) return;
  if (hurtEntity.hasTag('dungeons:chained')) return;
  if (!damageSource.hasTag('dungeons:chains_enchant')) {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  findChainEnemy(hurtEntity, damageSource)
});
// ENDERSENT SHOCKWAVE
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }
  if (!damageSource.isValid() || !hurtEntity.isValid()) return;
  if (!damageSource.hasTag('dungeons:shockwave_enchant')) {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  hurtEntity.runCommandAsync('function weapon/shockwave_fx')
  const xDif = hurtEntity.location.x - damageSource.location.x;
  const zDif = hurtEntity.location.z - damageSource.location.z;
  hurtEntity.applyKnockback(xDif, zDif, 0.3, 0.6);
  hurtEntity.dimension.getEntities({
    location: hurtEntity.location,
    maxDistance: 3,
    excludeFamilies: ['monster', 'ignore']
  }).forEach(entity => {
    const xDif2 = entity.location.x - hurtEntity.location.x;
    const zDif2 = entity.location.z - hurtEntity.location.z;
    if (entity === hurtEntity || entity === damageSource) return;
    if (entity === undefined || !entity.isValid()) return;
    if (entity.typeId === 'minecraft:item') return;
    entity.applyKnockback(xDif2, zDif2, 0.45, 0.75);
    entity.applyDamage(8, {
      cause: EntityDamageCause.entityExplosion,
      damagingEntity: damageSource
    });
  });
});
// ENDERSENT THUNDERING
world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource || !hurtEntity) {
    return;
  }

  if (!damageSource.isValid() || !hurtEntity.isValid()) return;
  if (!damageSource.hasTag('dungeons:thundering_enchant')) {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  const thundering = Math.floor(Math.random() * 3);
  if (thundering == 1) {
    hurtEntity.applyDamage(damage + 4, {
      cause: EntityDamageCause.lightning,
      damagingEntity: damageSource
    });
    hurtEntity.runCommandAsync('function weapon/thundering_fx')
    hurtEntity.dimension.getEntities({
      location: hurtEntity.location,
      maxDistance: 6,
      closest: 3,
      excludeFamilies: ['monster', 'ignore']
    }).forEach(entity => {
      if (entity === hurtEntity || entity === damageSource) return;
      if (entity === undefined || !entity.isValid()) return;
      if (entity.typeId === 'minecraft:item') return;
      entity.applyDamage(10, {
        cause: EntityDamageCause.lightning,
        damagingEntity: damageSource
      });
    });
  }
});

//VHOE PULL

system.runInterval(() => {
  for (let dimId of dimensionIds) {
    for (let entity of world.getDimension(dimId).getEntities({
      tags: ["dungeons:vhoe_pull"]
    })) {
      entity.dimension.spawnParticle('dungeons:vhoe_pull', entity.location);
      entity.dimension.getEntities({
        location: entity.location,
        maxDistance: 17.5,
        families: ['player']
      }).forEach(target => {
        target.dimension.spawnParticle('dungeons:vhoe_sucking', target.location);
      });
      entity.dimension.getEntities({
        location: entity.location,
        maxDistance: 64,
        minDistance: 6,
        families: ['player']
      }).forEach(pulled => {
        const xDif = pulled.location.x - entity.location.x;
        const zDif = pulled.location.z - entity.location.z;
        var mult = 4;
        var mult2 = 1;

        if (pulled.typeId === 'minecraft:player' && pulled.isFlying) return;
        if (pulled.isSprinting) {
          mult = mult * 0.5;
        }
        if (!pulled.isOnGround) {
          mult2 = mult2 * 1.5;
          mult = mult * 0.35;
        }

        pulled.applyKnockback(-xDif, -zDif, 0.17 * mult, 0.02 * mult2);
      });
    }
  }
}, 3);

//VHOE BIG BANG
system.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const entity = event.sourceEntity;
  const message = event.message;
  if (id === 'dungeons:big_bang_attack') {
    var value = parseInt(message);
    if (!value) {
      console.warn('No damage specified for big-bang');
      return;
    }
    if (!entity.hasTag('dungeons:vhoe_locked_in')) {
      value = value / 3;
    }
    entity.addTag('dungeons:vhoe_locked_in')

    system.runTimeout(() => {
      entity.dimension.spawnParticle('dungeons:big_bang_explosion', entity.location);
      entity.dimension.spawnParticle('dungeons:big_bang_explosion_small', entity.location);
      system.runTimeout(() => {
        entity.dimension.spawnParticle('dungeons:big_bang_stars', entity.location);
        entity.dimension.playSound('ambient.weather.the_end_light_flash', entity.location, {
          volume: 100,
          pitch: 2.5
        });
        entity.dimension.getEntities({
          location: entity.location,
          maxDistance: 17.5,
          families: ['player']
        }).forEach(target => {
          target.applyDamage(value, {
            cause: EntityDamageCause.magic,
            damagingEntity: entity
          });
          if (target.typeId === 'minecraft:player') {
            target.runCommand('camerashake add @s 1 1 positional')
          }
        });
        entity.dimension.getEntities({
          location: entity.location,
          maxDistance: 15,
          families: ['player']
        }).forEach(kb_target => {
          const xDif = kb_target.location.x - entity.location.x;
          const zDif = kb_target.location.z - entity.location.z;
          kb_target.applyKnockback(xDif, zDif, 1, 0.3);
        });
      }, 7);
    }, 20);
  }
});

//VHOE DEATH FX
system.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const entity = event.sourceEntity;
  if (id === 'dungeons:vhoe_death') {

    system.runTimeout(() => {
      entity.dimension.getEntities({
        location: entity.location,
        maxDistance: 64,
        type: 'minecraft:player'
      }).forEach(target => {
        target.runCommand('camerashake add @s 0.44 1.2 positional')
      });

      system.runTimeout(() => {
        entity.dimension.getEntities({
          location: entity.location,
          maxDistance: 64,
          type: 'minecraft:player'
        }).forEach(target => {
          target.runCommand('camerashake add @s 2 5 positional')
          target.runCommand('camera @s fade time 3 4 6 color 255 255 255 ')
        });
      }, 24);
    }, 60);
  }
});

// VHOE Death Anim
world.afterEvents.entityDie.subscribe((event) => {
  const deadEntity = event.deadEntity;
  if (deadEntity.typeId === "dungeons:vengeful_heart_of_ender") {
    const dead = deadEntity.dimension.spawnEntity('dungeons:vengeful_heart_of_ender_death', deadEntity.location);
    dead.setRotation(deadEntity.getRotation());
    deadEntity.addEffect("invisibility", 80, {
      amplifier: 1,
      showParticles: false
    });
    deadEntity.remove();
    let hp = dead.getComponent('minecraft:health');
    hp.setCurrentValue(1);
  }
});

//VHOE Cutscene leave
system.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const entity = event.sourceEntity;
  if (id === 'dungeons:delay_cutscene_end') {

    system.runTimeout(() => {
      entity.runCommand('function cutscene/exit_cutscene')
    }, 280);
  }
});

//Spinblade Return
system.runInterval(() => {
  for (let dimId of dimensionIds) {
    for (let entity of world.getDimension(dimId).getEntities({
      tags: ["dungeons:spinblade_returning"]
    })) {
      const proj = entity.getComponent('projectile');
      const owner = proj.owner
      if (owner !== undefined) {
        entity.runCommand(`tp ^^0.2^1 facing ${owner.name}`)
      }
    }
  }
}, 1)

//halloween checker
system.afterEvents.scriptEventReceive.subscribe((event) => {
  const id = event.id;
  const entity = event.sourceEntity;
  if (id == "dungeons:check_spooky") {
    const month = new Date().getMonth();
    if (month == 9) {
      entity.triggerEvent("dungeons:start_waking_spooky")
    } else {
      entity.triggerEvent("dungeons:start_waking")
    }
  }
})

//Haunted BOW
system.runInterval(() => {
  for (let dimId of dimensionIds) {
    for (let entity of world.getDimension(dimId).getEntities({
      tags: ["dungeons:haunted_bow"]
    })) {
      if (!entity.isOnGround) {
        entity.dimension.spawnParticle('dungeons:haunted_arrow', entity.location);
      }
    }
    for (let entity of world.getDimension(dimId).getEntities({
      tags: ["dungeons:shrieking_crossbow"]
    })) {
      if (!entity.isOnGround) {
        entity.dimension.spawnParticle('dungeons:haunted_arrow', entity.location);
      }
    }
  }
})


// CORRUPTED PUMPKIN
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    let beam = world.scoreboard.getObjective('corruptPumpkin')
    let beamPlayer = beam.getScore(player);
    const item = player.getComponent("minecraft:equippable").getEquipment("Mainhand");
    if (beamPlayer > 0) {
      if (!item) {
        beam.setScore(player, 0);
        player.removeTag('dungeons:using_corrupted_pumpkin');
        player.dimension.playSound('beacon.deactivate', player.location, {
          pitch: 0.5
        });
        return;
      }
      if ((player.hasTag('dungeons:using_corrupted_pumpkin') && (item.typeId !== 'dungeons:corrupted_pumpkin' && item.typeId !== 'dungeons:rare_tome_of_duplication' && item.typeId !== 'dungeons:tome_of_duplication'))) {
        beam.setScore(player, 0);
        player.removeTag('dungeons:using_corrupted_pumpkin');
        player.dimension.playSound('beacon.deactivate', player.location, {
          pitch: 0.5
        });
        return;
      }
      if (beamPlayer == 1) {
        let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player);
        if (soulGauge < 1) {
          player.runCommandAsync('function artifact/corrupted_beacon_fail')
          beam.setScore(player, 0);
          player.removeTag('dungeons:using_corrupted_pumpkin');
          player.dimension.playSound('beacon.deactivate', player.location, {
            pitch: 0.5
          });
          return;
        } else if (player.hasTag('dungeons:using_corrupted_pumpkin')) {
          beam.addScore(player, 6);
          player.runCommandAsync('function artifact/corrupted_beacon_vfx')
        }
      }
      player.addEffect('slowness', 10, {
        amplifier: 3,
        showParticles: false
      });
      const ammo = player.dimension.spawnEntity('dungeons:corrupted_pumpkin_ammo', player.getHeadLocation());
      const proj = ammo.getComponent('projectile');
      proj.owner = player;
      proj.shoot(player.getViewDirection());
      system.runTimeout(() => {
        ammo.remove()
      }, 25);
      beam.addScore(player, -1);
    }
  }
}, 1);