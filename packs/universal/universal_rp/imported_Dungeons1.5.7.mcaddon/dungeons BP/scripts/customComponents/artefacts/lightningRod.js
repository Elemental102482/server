import {
  world,
  system,
  ItemStack,
  EntityDamageCause
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_lightning_rod', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_lightning_wand')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_lightning_wand');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player)

      if (soulGauge < 8) {
        player.runCommandAsync('function artifact/lightning_rod_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/lightning_rod_vfx')
      }

      const entities = player.dimension.getEntities({
        location: player.location,
        maxDistance: 18,
        closest: 16,
        minDistance: 2,
        excludeFamilies: ['ignore']
      });

      if (!entities) return;

      for (const entity of entities) {
        if (!entity.matches({
            families: ['monster']
          }) && !entity.matches({
            families: ['player']
          })) continue;

        const loc = entity.location;
        entity.dimension.spawnParticle('dungeons:lightning_rod_circle_large', loc);
        entity.dimension.playSound('weapon.enchant.thundering', loc, {
          volume: 0.25
        });
        system.runTimeout(() => {
          entity.dimension.playSound('weapon.enchant.thundering', loc, {
            volume: 0.5
          });
        }, 10)
        system.runTimeout(() => {
          entity.dimension.playSound('weapon.enchant.thundering', loc, {
            volume: 1.0,
            pitch: 1.2
          });

          entity.dimension.spawnEntity('minecraft:lightning_bolt', {
            x: loc.x,
            y: loc.y + 1.33,
            z: loc.z
          });

          const damageRange = entity.dimension.getEntities({
            location: loc,
            maxDistance: 2.6,
            excludeFamilies: ['ignore']
          });

          for (const target of damageRange) {
            const damage = 20 - (Math.abs(target.location.x - loc.x) + Math.abs(target.location.y - loc.y) + Math.abs(target.location.z - loc.z));

            target.applyDamage(damage, {
              cause: EntityDamageCause.lightning,
              damagingEntity: player
            });

          }
        }, 20);
        return;
      }
    }
  });

initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_lightning_rod', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_lightning_wand')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_lightning_wand');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player)

      if (soulGauge < 8) {
        player.runCommandAsync('function artifact/lightning_rod_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/lightning_rod_vfx')
      }

      const entities = player.dimension.getEntities({
        location: player.location,
        maxDistance: 16,
        closest: 16,
        minDistance: 2,
        excludeFamilies: ['ignore']
      });

      if (!entities) return;

      for (const entity of entities) {
        if (!entity.matches({
            families: ['monster']
          }) && !entity.matches({
            families: ['player']
          })) continue;

        const loc = entity.location;
        entity.dimension.spawnParticle('dungeons:lightning_rod_circle', loc);
        entity.dimension.playSound('weapon.enchant.thundering', loc, {
          volume: 0.25
        });
        system.runTimeout(() => {
          entity.dimension.playSound('weapon.enchant.thundering', loc, {
            volume: 0.5
          });
        }, 8)
        system.runTimeout(() => {
          entity.dimension.playSound('weapon.enchant.thundering', loc, {
            volume: 1.0,
            pitch: 1.2
          });

          entity.dimension.spawnEntity('minecraft:lightning_bolt', {
            x: loc.x,
            y: loc.y + 1.33,
            z: loc.z
          });

          const damageRange = entity.dimension.getEntities({
            location: loc,
            maxDistance: 2.3,
            excludeFamilies: ['ignore']
          });

          for (const target of damageRange) {
            const damage = 24 - (Math.abs(target.location.x - loc.x) + Math.abs(target.location.y - loc.y) + Math.abs(target.location.z - loc.z));

            target.applyDamage(damage, {
              cause: EntityDamageCause.lightning,
              damagingEntity: player
            });

          }
        }, 16);
        return;
      }
    }
  });

});