import {
  world,
  system,
  ItemStack,
  EntityDamageCause
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_harvester', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;
      const dim = player.dimension;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_harvester')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_harvester');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player)

      if (soulGauge < 15) {
        player.runCommandAsync('function artifact/harvester_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/harvester_vfx')
      }

      dim.playSound('beacon.activate', player.location, {
        volume: 0.5,
        pitch: 1.8
      });

      dim.spawnParticle('dungeons:harvester_blast', player.location);
      dim.spawnParticle('dungeons:harvester_blast2', player.location);
      system.runTimeout(() => {
        dim.spawnParticle('dungeons:harvester_flames', player.location);

        dim.playSound('shriek.sculk.shrieker', player.location, {
          volume: 0.9,
          pitch: 0.8
        });

        dim.playSound('random.explode', player.location, {
          volume: 1.1,
          pitch: 0.7
        });

        const damageRange = dim.getEntities({
          location: player.location,
          maxDistance: 5,
          excludeFamilies: ['ignore']
        });

        for (const target of damageRange) {
          if (target === player) continue;

          if(target.typeId === 'minecraft:player') {
            target.applyDamage(10, {
              cause: EntityDamageCause.entityExplosion,
              damagingEntity: player
            });
            target.applyDamage(5, {
              cause: EntityDamageCause.magic,
              damagingEntity: player
            });
          } else {
            target.applyDamage(15, {
              cause: EntityDamageCause.magic,
              damagingEntity: player
            });
          }

        }

      }, 6)
    }
  });

  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_harvester', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;
      const dim = player.dimension;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_harvester')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_harvester');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player)

      if (soulGauge < 15) {
        player.runCommandAsync('function artifact/harvester_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/harvester_vfx')
      }

      dim.playSound('beacon.activate', player.location, {
        volume: 0.5,
        pitch: 1.8
      });

      dim.spawnParticle('dungeons:harvester_blast', player.location);
      dim.spawnParticle('dungeons:harvester_blast2', player.location);
      system.runTimeout(() => {
        dim.spawnParticle('dungeons:harvester_flames', player.location);

        dim.playSound('shriek.sculk.shrieker', player.location, {
          volume: 0.9,
          pitch: 0.8
        });

        dim.playSound('random.explode', player.location, {
          volume: 1.1,
          pitch: 0.7
        });

        const damageRange = dim.getEntities({
          location: player.location,
          maxDistance: 5.5,
          excludeFamilies: ['ignore']
        });

        for (const target of damageRange) {
          if (target === player) continue;

          if(target.typeId === 'minecraft:player') {
            target.applyDamage(13, {
              cause: EntityDamageCause.entityExplosion,
              damagingEntity: player
            });
            target.applyDamage(7, {
              cause: EntityDamageCause.magic,
              damagingEntity: player
            });
          } else {
            target.applyDamage(20, {
              cause: EntityDamageCause.magic,
              damagingEntity: player
            });
          }

        }

      }, 6)
    }
  });

});