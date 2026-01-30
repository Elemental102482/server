import {
  world,
  system,
  ItemStack,
  EntityDamageCause
} from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_powershaker', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_powershaker')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_powershaker');
      }
      player.dimension.spawnParticle('dungeons:party_flair', player.location)
      player.dimension.playSound('random.fuse', player.location, {
        volume: 0.7,
        pitch: 2.5
      });
      let timeLeft = world.scoreboard.getObjective('powershaker_t')
      let usesLeft = world.scoreboard.getObjective('powershaker_u')

      if(timeLeft.getScore(player) > 0) {
        player.runCommandAsync('function artifact/powershaker_fail')
        return;
      }
      usesLeft.setScore(player, 5);
      timeLeft.setScore(player, 200);
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_powershaker', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;
      
      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_powershaker')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_powershaker');
      }

player.dimension.spawnParticle('dungeons:party_flair', player.location)
      player.dimension.playSound('random.fuse', player.location, {
        volume: 0.7,
        pitch: 2.5
      });
      let timeLeft = world.scoreboard.getObjective('powershaker_t');
      let usesLeft = world.scoreboard.getObjective('powershaker_u');

      if(timeLeft.getScore(player) > 0) {
        player.runCommandAsync('function artifact/powershaker_fail')
        return;
      }

      usesLeft.setScore(player, 5);
      timeLeft.setScore(player, 300);
    }
  });
});


// TIMER
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    let usesLeft = world.scoreboard.getObjective('powershaker_u').getScore(player);
    let timeLeft = world.scoreboard.getObjective('powershaker_t')
    let timeLeftPlayer = timeLeft.getScore(player);
    if (timeLeftPlayer > 0) {
      timeLeft.addScore(player, -1);
      player.addEffect('strength', 1);
    } else if(timeLeftPlayer <= 0 && usesLeft > 0) {
      world.scoreboard.getObjective('powershaker_u').setScore(player, 0);
    }
  }
}, 1);

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage;
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

  if(damageSource.hasTag('powershaker_cooldown')) return;

  let timeLeft = world.scoreboard.getObjective('powershaker_t')
  let usesLeft = world.scoreboard.getObjective('powershaker_u')

  if(usesLeft.getScore(damageSource) <= 0 || timeLeft.getScore(damageSource) <= 0) return;

  hurtEntity.dimension.spawnParticle('dungeons:party_boom', hurtEntity.location);
        hurtEntity.dimension.playSound('random.explode', hurtEntity.location, {
          volume: 0.5,
          pitch: 1.5
        });

  hurtEntity.dimension.getEntities({
    location: hurtEntity.location,
    maxDistance: 3.5,
    excludeFamilies: ['ignore']
  }).forEach(entity => {
    if (entity === hurtEntity || entity === damageSource) return;
    if (entity === undefined || !entity.isValid()) return;
     if (entity.typeId === 'minecraft:item') return;
          entity.applyDamage(4 + Math.floor(damage*0.66), {
            cause: EntityDamageCause.entityExplosion,
            damagingEntity: damageSource
          });
        });

  usesLeft.addScore(damageSource, -1);
  damageSource.addTag('powershaker_cooldown');
  system.runTimeout(() => {
    damageSource.removeTag('powershaker_cooldown')
  }, 8)
});