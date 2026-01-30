import {
  world,
  system,
  EntityDamageCause
} from "@minecraft/server";
const arrows = [
  'minecraft:arrow',
  'dungeons:burning_arrow',
  'dungeons:harpoon_arrow',
  'dungeons:torment_arrow',
  'dungeons:thundering_arrow'
];

function findRicochet(target, player, arrow, damage, mult) {
  let rand = Math.random();
  if (rand > 0.75) return;
  target.addTag('dungeons:ricocheted');
  const damageRange = target.dimension.getEntities({
    location: target.location,
    maxDistance: 12,
    closest: 1,
    families: ['monster'],
    excludeTags: ['dungeons:ricocheted']
  });
  for (const enemy of damageRange) {
    enemy.applyDamage((mult * damage) / 2, {
      cause: "entityAttack",
      damagingEntity: player
    });
    target.dimension.spawnParticle('dungeons:ricochet_shot', target.location);
    target.dimension.playSound('weapon.enchant.ricochet', target.location);
    system.runTimeout(() => {
      findRicochet(enemy, player, arrow, damage, mult)
    }, 4);
  }
  system.runTimeout(() => {
    target.removeTag('dungeons:ricocheted');
  }, 30);
}

function findTwinShot(target, player, arrow, damage, mult) {
  target.addTag('dungeons:ricocheted');
  const damageRange = target.dimension.getEntities({
    location: target.location,
    maxDistance: 8,
    closest: 1,
    families: ['monster'],
    excludeTags: ['dungeons:ricocheted']
  });
  for (const enemy of damageRange) {
    enemy.applyDamage((mult * damage), {
      cause: "entityAttack",
      damagingEntity: player
    });
    target.dimension.spawnParticle('dungeons:ricochet_shot', target.location);
    target.dimension.playSound('weapon.enchant.ricochet', target.location);
  }
  system.runTimeout(() => {
    target.removeTag('dungeons:ricocheted');
  }, 30);
}
world.afterEvents.itemReleaseUse.subscribe((e) => {
  const bow = e.itemStack;
  const player = e.source;
  if ((bow.typeId === 'minecraft:crossbow' || bow.hasTag('dungeons:crossbow')) && player.typeId === 'minecraft:player') {
    player.playSound('crossbow.loading.end', {
      volume: 0.44
    });
  }
  if (bow.typeId === 'minecraft:bow' || bow.hasTag('dungeons:bow')) {
    const nearbyArrow = player.dimension.getEntities({
      location: player.location,
      maxDistance: 16,
      closest: 1,
      families: ['arrow'],
      excludeTags: ['dungeons:arrow']
    });
    if (!nearbyArrow) return;
    if (arrows.includes(nearbyArrow[0].typeId)) {
      nearbyArrow[0].addTag(`${bow.typeId}`);
      nearbyArrow[0].addTag(`dungeons:piercing_0`);
      nearbyArrow[0].addTag(`dungeons:arrow`);
      const enchantable = bow.getComponent('minecraft:enchantable');
      for (const enchantment of enchantable.getEnchantments()) {
        if (enchantment.type.id === 'piercing') {
          nearbyArrow[0].addTag(`dungeons:piercing_${enchantment.level}`);
          nearbyArrow[0].removeTag(`dungeons:piercing_0`);
        }
      }
      if (bow.typeId == "dungeons:shrieking_crossbow") {
        player.dimension.playSound("weapon.shrieking_crossbow.shoot", player.location)
      }
    }
  }
});
world.afterEvents.itemUse.subscribe((e) => {
  const bow = e.itemStack;
  const player = e.source;
  if (bow.typeId === 'minecraft:crossbow' || bow.hasTag('dungeons:crossbow')) {
    const nearbyArrow = player.dimension.getEntities({
      location: player.location,
      maxDistance: 20,
      closest: 1,
      families: ['arrow'],
      excludeTags: ['dungeons:arrow']
    });
    if (nearbyArrow.length < 1) return;
    if (arrows.includes(nearbyArrow[0].typeId)) {
      nearbyArrow[0].addTag(`${bow.typeId}`);
      nearbyArrow[0].addTag(`dungeons:piercing_0`);
      nearbyArrow[0].addTag(`dungeons:arrow`);
      const enchantable = bow.getComponent('minecraft:enchantable');
      for (const enchantment of enchantable.getEnchantments()) {
        if (enchantment.type.id === 'piercing' && (bow.typeId === 'dungeons:nautical_crossbow' || bow.typeId === 'dungeons:pride_of_the_piglins')) {
          nearbyArrow[0].addTag(`dungeons:piercing_${enchantment.level + 2}`);
          nearbyArrow[0].removeTag(`dungeons:piercing_0`);
        } else if (enchantment.type.id === 'piercing') {
          nearbyArrow[0].addTag(`dungeons:piercing_${enchantment.level}`);
          nearbyArrow[0].removeTag(`dungeons:piercing_0`);
        }
      }
      if ((bow.typeId === 'dungeons:nautical_crossbow' || bow.typeId === 'dungeons:pride_of_the_piglins') && arrow.hasTag(`dungeons:piercing_0`)) {
        nearbyArrow[0].add(`dungeons:piercing_2`);
        nearbyArrow[0].removeTag(`dungeons:piercing_0`);
      }

      if (bow.typeId == "dungeons:shrieking_crossbow") {
        player.dimension.playSound("weapon.shrieking_crossbow.shoot", player.location)
      }
    }
  }
});
world.afterEvents.entityHurt.subscribe((e) => {
  const target = e.hurtEntity;
  const player = e.damageSource.damagingEntity;
  const arrow = e.damageSource.damagingProjectile;
  if (!player || !arrow) return;
  if (arrow.isValid() === false) return;
  const dim = arrow.dimension;
  const damage = e.damage;
  if (!arrow.hasTag('dungeons:arrow')) return;
  //DEBUG
  if (player.hasTag('dungeons:debug')) {
    const tags = arrow.getTags();
    for (const tag of tags) {
      world.sendMessage(`${tag}`);
    }
  }
  if (!arrow.hasTag('dungeons:pierced')) {
    //TWINSHOT
    if (arrow.hasTag('dungeons:bow_of_lost_souls')) {
      findTwinShot(target, player, arrow, damage, 1);
    }
    //TEMPOTHEFT
    if (arrow.hasTag('dungeons:nocturnal_bow')) {
      let slowness = target.getEffect("slowness");
      let speed = player.getEffect("speed");
      if (!slowness) {
        target.addTag(`dungeons:ignore_slowness`);
        target.addEffect("slowness", 80, {
          amplifier: 1,
          showParticles: true
        });
      } else if (slowness.amplifier < 4) {
        target.addTag(`dungeons:ignore_${slowness.typeId}`);
        target.addEffect("slowness", slowness.duration + 40, {
          amplifier: slowness.amplifier + 1,
          showParticles: true
        });
      } else {
        target.addTag(`dungeons:ignore_${slowness.typeId}`);
        target.addEffect("slowness", slowness.duration + 40, {
          amplifier: slowness.amplifier,
          showParticles: true
        });
      }
      if (!speed) {
        player.addTag(`dungeons:ignore_speed`);
        player.addEffect("speed", 80, {
          amplifier: 0,
          showParticles: true
        });
      } else if (speed.amplifier < 4) {
        player.addTag(`dungeons:ignore_${speed.typeId}`);
        player.addEffect("speed", speed.duration + 40, {
          amplifier: speed.amplifier + 1,
          showParticles: true
        });
      } else {
        player.addTag(`dungeons:ignore_${speed.typeId}`);
        player.addEffect("speed", speed.duration + 40, {
          amplifier: speed.amplifier,
          showParticles: true
        });
      }
      player.dimension.spawnParticle('dungeons:swiftness', player.location)
      system.runTimeout(() => {
        player.removeTag(`dungeons:ignore_speed`);
        target.removeTag(`dungeons:ignore_slowness`);
      }, 1);
    }
    //VEILED CROSSBOW
    if (arrow.hasTag('dungeons:veiled_crossbow') && player.hasTag('dungeons:exited_shadow_form')) {
      target.applyDamage(damage * 3, {
        damagingProjectile: arrow,
        damagingEntity: player
      });
    }
    //SHRIEKING CROSSBOW
    if (arrow.hasTag('dungeons:shrieking_crossbow') && player.hasTag('dungeons:exited_shadow_form')) {
      target.applyDamage(damage * 3, {
        damagingProjectile: arrow,
        damagingEntity: player
      });
    }
    //COG CROSSBOW
    if (arrow.hasTag('dungeons:pride_of_the_piglins') || arrow.hasTag('dungeons:cog_crossbow')) {
      target.applyDamage(damage * 1.5, {
        damagingProjectile: arrow,
        damagingEntity: player
      });
    }
    //HEAVY CROSSBOW
    if (arrow.hasTag('dungeons:heavy_crossbow') || arrow.hasTag('dungeons:doom_crossbow') || arrow.hasTag('dungeons:slayer_crossbow')) {
      target.applyDamage(damage * 1.25, {
        damagingProjectile: arrow,
        damagingEntity: player
      });
    }
    //SLAYER RICOCHET
    if (arrow.hasTag('dungeons:slayer_crossbow')) {
      findRicochet(target, player, arrow, damage, 1.25);
    }
    //HARPOON CROSSBOW
    if (arrow.hasTag('dungeons:harpoon_crossbow') || arrow.hasTag('dungeons:nautical_crossbow')) {
      if (arrow.typeId === 'dungeons:harpoon_arrow') {
        target.applyDamage(damage * 1.5, {
          damagingProjectile: arrow,
          damagingEntity: player
        });
      }
    }
    //BONEBOW
    if (arrow.hasTag('dungeons:bonebow')) {
      const scale = arrow.getComponent('minecraft:scale').value;
      if (scale > 1.43) {
        target.applyDamage(damage * (scale * 0.7), {
          damagingProjectile: arrow,
          damagingEntity: player
        });
      }
    }
    //WIND BOW
    if (arrow.hasTag('dungeons:wind_bow') || arrow.hasTag('dungeons:burst_gale_bow') || arrow.hasTag('dungeons:echo_of_the_valley')) {
      const xDif = target.location.x - player.location.x;
      const zDif = target.location.z - player.location.z;
      var xDif2 = 0;
      var zDif2 = 0;
      if (xDif < 0) {
        xDif2 = xDif * -1
      }
      if (xDif >= 0) {
        xDif2 = xDif
      }
      if (zDif < 0) {
        zDif2 = zDif * -1
      }
      if (zDif >= 0) {
        zDif2 = zDif
      }
      if (target === undefined || !target.isValid()) return;
      if ((xDif2 + zDif2) / 3.6 < 4) {
        target.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 3.6, 0.6);
      } else {
        target.applyKnockback(-xDif, -zDif, 4, 0.6);
      }
      dim.spawnParticle('minecraft:wind_explosion_emitter', {
        x: target.location.x,
        y: target.location.y + 1,
        z: target.location.z
      });
      dim.playSound('wind_charge.burst', {
        x: target.location.x,
        y: target.location.y + 1,
        z: target.location.z
      }, {
        volume: 0.9,
        pitch: 1
      });
    }
    //RICOCHET
    if (arrow.hasTag('dungeons:echo_of_the_valley') || arrow.hasTag('dungeons:twin_bow') || arrow.hasTag('dungeons:haunted_bow')) {
      findRicochet(target, player, arrow, damage, 1);
    }
    //KNOCKBACK
    if (arrow.hasTag('dungeons:guardian_bow') || arrow.hasTag('dungeons:doom_crossbow')) {
      const xDif = target.location.x - player.location.x;
      const zDif = target.location.z - player.location.z;
      target.applyKnockback(xDif, zDif, 1.4, 0.345);
    }
    //SNOW BOW
    if (arrow.hasTag('dungeons:snow_bow')) {
      if (target.getEffect('slowness')) return;
      target.addEffect("slowness", 66, {
        amplifier: 2,
        showParticles: true
      });
      target.runCommandAsync('function weapon/freezing_fx')
    }
    //Webbed Bow
    if (arrow.hasTag('dungeons:webbed_bow')) {
      if (target.getEffect('slowness')) return;
      target.runCommandAsync('function weapon/stun_fx')
      target.dimension.spawnParticle("dungeons:webbed_bow", target.location)
      target.addEffect("slowness", 20, {
        amplifier: 9,
        showParticles: true
      });
      target.addEffect("weakness", 20, {
        amplifier: 9,
        showParticles: false
      });
      system.runTimeout(() => {
        target.addEffect("slowness", 46, {
          amplifier: 2,
          showParticles: true
        });
      }, 20)
    }
    //WINTERS TOUCH
    if (arrow.hasTag('dungeons:winters_touch')) {
      if (target.getEffect('slowness')) return;
      target.runCommandAsync('function weapon/freezing_fx')
      target.runCommandAsync('function weapon/stun_fx')
      target.addEffect("slowness", 20, {
        amplifier: 9,
        showParticles: true
      });
      target.addEffect("weakness", 20, {
        amplifier: 9,
        showParticles: false
      });
      system.runTimeout(() => {
        target.addEffect("slowness", 46, {
          amplifier: 2,
          showParticles: true
        });
      }, 20)
    }
    //Call of the Void
    if (arrow.hasTag('dungeons:call_of_the_void')) {
      dim.spawnParticle('dungeons:imploding_crossbow', target.location);
      dim.playSound('random.explode', target.location);
      const damageRange = dim.getEntities({
        location: target.location,
        maxDistance: 3,
        excludeFamilies: ['ignore']
      });
      for (const entity of damageRange) {
        if (entity === player) continue;
        if (entity.typeId === 'minecraft:item') continue;
        entity.applyDamage(8, {
          cause: EntityDamageCause.entityExplosion,
          damagingEntity: arrow
        });
      }
    }
    //VOID BOW
    if (arrow.hasTag('dungeons:void_bow') || arrow.hasTag('dungeons:call_of_the_void')) {
      if (target.getEffect('weakness')) return;
      target.addEffect("weakness", 300, {
        amplifier: 1,
        showParticles: true
      });
      target.runCommandAsync('function weapon/illagers_bane_fx')
    }
    //Exploding Crossbow/Red Snake
    if (arrow.hasTag('dungeons:exploding_crossbow') || arrow.hasTag('dungeons:firebolt_thrower') || arrow.hasTag('dungeons:red_snake')) {
      dim.spawnParticle('dungeons:exploding_crossbow', target.location);
      dim.playSound('random.explode', target.location);
      const damageRange = dim.getEntities({
        location: target.location,
        maxDistance: 3,
        excludeFamilies: ['ignore']
      });
      for (const entity of damageRange) {
        if (entity === player) continue;
        entity.applyDamage(8, {
          cause: EntityDamageCause.entityExplosion,
          damagingEntity: arrow
        });
      }
    }
    //Imploding Crossbow
    if (arrow.hasTag('dungeons:imploding_crossbow')) {
      dim.spawnParticle('dungeons:imploding_crossbow', target.location);
      dim.playSound('random.explode', target.location);
      dim.spawnParticle('dungeons:gravity', {
        x: target.location.x,
        y: target.location.y + 0.45,
        z: target.location.z
      });
      dim.playSound('mob.endermen.portal', target.location)
      const damageRange = dim.getEntities({
        location: target.location,
        maxDistance: 3,
        excludeFamilies: ['ignore']
      });
      for (const entity of damageRange) {
        if (entity === player) continue;
        if (entity.typeId === 'minecraft:item') continue;
        entity.applyDamage(8, {
          cause: EntityDamageCause.entityExplosion,
          damagingEntity: arrow
        });
      }
      dim.getEntities({
        location: target.location,
        maxDistance: 6,
        excludeFamilies: ['ignore', 'gravity_immune']
      }).forEach(entity => {
        const xDif = entity.location.x - target.location.x;
        const zDif = entity.location.z - target.location.z;
        var xDif2 = 0;
        var zDif2 = 0;
        if (xDif < 0) {
          xDif2 = xDif * -1
        }
        if (xDif >= 0) {
          xDif2 = xDif
        }
        if (zDif < 0) {
          zDif2 = zDif * -1
        }
        if (zDif >= 0) {
          zDif2 = zDif
        }
        if (entity === target || entity === player) return;
        if (entity === undefined || !entity.isValid()) return;
        entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
      });
    }
    //GRAVITY
    if (arrow.hasTag('dungeons:voidcaller')) {
      dim.spawnParticle('dungeons:gravity', {
        x: target.location.x,
        y: target.location.y + 0.45,
        z: target.location.z
      });
      dim.playSound('mob.endermen.portal', target.location)
      dim.getEntities({
        location: target.location,
        maxDistance: 6,
        excludeFamilies: ['ignore', 'gravity_immune']
      }).forEach(entity => {
        const xDif = entity.location.x - target.location.x;
        const zDif = entity.location.z - target.location.z;
        var xDif2 = 0;
        var zDif2 = 0;
        if (xDif < 0) {
          xDif2 = xDif * -1
        }
        if (xDif >= 0) {
          xDif2 = xDif
        }
        if (zDif < 0) {
          zDif2 = zDif * -1
        }
        if (zDif >= 0) {
          zDif2 = zDif
        }
        if (entity === target || entity === player) return;
        if (entity === undefined || !entity.isValid()) return;
        entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
      });
    }
    //ENIGMA RESONATOR
    if (arrow.hasTag('dungeons:feral_soul_crossbow') || arrow.hasTag('dungeons:soul_hunter_crossbow')) {
      const critical = Math.floor(Math.random() * 400);
      const souls = world.scoreboard.getObjective('soulGauge').getScore(player);
      if (player.hasTag('dungeons:debug')) player.sendMessage(`roll : ${critical}`)
      if (critical < souls) {
        target.runCommandAsync('function weapon/enigma_resonator_fx')
        target.addTag('prevent_effect')
        target.applyDamage(damage * 1.5, {
          damagingProjectile: arrow,
          damagingEntity: player
        });
        system.runTimeout(() => {
          target.removeTag('prevent_effect')
        }, 1)
      }
    }
    // CRITICAL HIT
    if (arrow.hasTag('dungeons:corrupted_crossbow')) {
      const critical = Math.floor(Math.random() * 10);
      if (player.hasTag('dungeons:debug')) player.sendMessage(`roll : ${critical}`)
      if (critical == 1) {
        target.runCommandAsync('function weapon/critical_hit_fx')
        target.addTag('prevent_effect')
        target.applyDamage(10, {
          damagingProjectile: arrow,
          damagingEntity: player
        });
        system.runTimeout(() => {
          target.removeTag('prevent_effect')
        }, 1)
      }
    }
    // PIERCING ENCHANT CODE
    if (arrow.hasTag('dungeons:piercing_0')) {
      arrow.addTag('dungeons:pierced');
      arrow.remove();
      return;
    }
    if (arrow.hasTag('dungeons:piercing_1')) {
      arrow.removeTag('dungeons:piercing_1');
      arrow.addTag('dungeons:piercing_0');
      arrow.addTag('dungeons:pierced');
      return;
    }
    if (arrow.hasTag('dungeons:piercing_2')) {
      arrow.removeTag('dungeons:piercing_2');
      arrow.addTag('dungeons:piercing_1');
      arrow.addTag('dungeons:pierced');
      return;
    }
    if (arrow.hasTag('dungeons:piercing_3')) {
      arrow.removeTag('dungeons:piercing_3');
      arrow.addTag('dungeons:piercing_2');
      arrow.addTag('dungeons:pierced');
      return;
    }
    if (arrow.hasTag('dungeons:piercing_4')) {
      arrow.removeTag('dungeons:piercing_4');
      arrow.addTag('dungeons:piercing_3');
      arrow.addTag('dungeons:pierced');
      return;
    }
    if (arrow.hasTag('dungeons:piercing_5')) {
      arrow.removeTag('dungeons:piercing_5');
      arrow.addTag('dungeons:piercing_4');
      arrow.addTag('dungeons:pierced');
      return;
    }
    if (arrow.hasTag('dungeons:piercing_6')) {
      arrow.removeTag('dungeons:piercing_6');
      arrow.addTag('dungeons:piercing_5');
      arrow.addTag('dungeons:pierced');
      return;
    }
  }
});
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
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (damageSource.typeId === "minecraft:player" && heldItem.hasTag('dungeons:shadow_shot') && (deadEntity.matches({
    families: ['player']
  }) || deadEntity.matches({
    families: ['mob']
  }))) {
    damageSource.dimension.spawnParticle('dungeons:elixir_shadow', damageSource.location);
    damageSource.runCommandAsync('function weapon/shadow_shot')
  }
});

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
  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) return;
  if (damageSource.typeId === "minecraft:player" && heldItem.hasTag('dungeons:shadow_shot_spooky') && (deadEntity.matches({
    families: ['player']
  }) || deadEntity.matches({
    families: ['mob']
  }))) {
    damageSource.dimension.spawnParticle('dungeons:elixir_shadow_spooky', damageSource.location);
    damageSource.runCommandAsync('function weapon/shadow_shot_spooky')
  }
});
world.afterEvents.projectileHitBlock.subscribe((e) => {
  const arrow = e.projectile;
  if (arrow.isValid() === false) return;
  const player = e.source;
  const dim = arrow.dimension;
  if (!arrow.hasTag('dungeons:arrow')) return;
  //DEBUG
  if (player.hasTag('dungeons:debug')) {
    const tags = arrow.getTags();
    for (const tag of tags) {
      world.sendMessage(`${tag}`);
    }
  }
  if (!arrow.hasTag('dungeons:pierced')) {
    //Exploding Crossbow / Redsnake
    if (arrow.hasTag('dungeons:exploding_crossbow') || arrow.hasTag('dungeons:firebolt_thrower') || arrow.hasTag('dungeons:red_snake')) {
      dim.spawnParticle('dungeons:exploding_crossbow', arrow.location);
      dim.playSound('random.explode', arrow.location);
      const damageRange = dim.getEntities({
        location: arrow.location,
        maxDistance: 3,
        excludeFamilies: ['ignore']
      });
      for (const entity of damageRange) {
        if (entity === player) continue;
        if (entity.typeId === 'minecraft:item') continue;
        entity.applyDamage(8, {
          cause: EntityDamageCause.entityExplosion,
          damagingEntity: arrow
        });
      }
    }
    //Call of the void
    if (arrow.hasTag('dungeons:call_of_the_void')) {
      dim.spawnParticle('dungeons:imploding_crossbow', arrow.location);
      dim.playSound('random.explode', arrow.location);
      const damageRange = dim.getEntities({
        location: arrow.location,
        maxDistance: 3,
        excludeFamilies: ['ignore']
      });
      for (const entity of damageRange) {
        if (entity === player) continue;
        if (entity.typeId === 'minecraft:item') continue;
        entity.applyDamage(8, {
          cause: EntityDamageCause.entityExplosion,
          damagingEntity: arrow
        });
      }
    }
    //Imploding Crossbow
    if (arrow.hasTag('dungeons:imploding_crossbow')) {
      dim.spawnParticle('dungeons:imploding_crossbow', arrow.location);
      dim.playSound('random.explode', arrow.location);
      dim.spawnParticle('dungeons:gravity', {
        x: arrow.location.x,
        y: arrow.location.y + 0.45,
        z: arrow.location.z
      });
      dim.playSound('mob.endermen.portal', arrow.location)
      const damageRange = dim.getEntities({
        location: arrow.location,
        maxDistance: 3,
        excludeFamilies: ['ignore']
      });
      for (const entity of damageRange) {
        if (entity === player) continue;
        if (entity.typeId === 'minecraft:item') continue;
        entity.applyDamage(8, {
          cause: EntityDamageCause.entityExplosion,
          damagingEntity: arrow
        });
      }
      dim.getEntities({
        location: arrow.location,
        maxDistance: 6,
        excludeFamilies: ['ignore', 'gravity_immune']
      }).forEach(entity => {
        const xDif = entity.location.x - arrow.location.x;
        const zDif = entity.location.z - arrow.location.z;
        var xDif2 = 0;
        var zDif2 = 0;
        if (xDif < 0) {
          xDif2 = xDif * -1
        }
        if (xDif >= 0) {
          xDif2 = xDif
        }
        if (zDif < 0) {
          zDif2 = zDif * -1
        }
        if (zDif >= 0) {
          zDif2 = zDif
        }
        if (entity === player) return;
        if (entity === undefined || !entity.isValid()) return;
        entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
      });
    }
    //GRAVITY
    if (arrow.hasTag('dungeons:voidcaller')) {
      dim.spawnParticle('dungeons:gravity', {
        x: arrow.location.x,
        y: arrow.location.y + 0.45,
        z: arrow.location.z
      });
      dim.playSound('mob.endermen.portal', arrow.location)
      dim.getEntities({
        location: arrow.location,
        maxDistance: 6,
        excludeFamilies: ['ignore', 'gravity_immune']
      }).forEach(entity => {
        const xDif = entity.location.x - arrow.location.x;
        const zDif = entity.location.z - arrow.location.z;
        var xDif2 = 0;
        var zDif2 = 0;
        if (xDif < 0) {
          xDif2 = xDif * -1
        }
        if (xDif >= 0) {
          xDif2 = xDif
        }
        if (zDif < 0) {
          zDif2 = zDif * -1
        }
        if (zDif >= 0) {
          zDif2 = zDif
        }
        if (entity === player) return;
        if (entity === undefined || !entity.isValid()) return;
        entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
      });
    }
  }
  arrow.addTag('dungeons:pierced');
});