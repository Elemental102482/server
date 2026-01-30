import {
  world,
  system,
  ItemStack,
  EntityDamageCause
} from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:updraft_tome', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;
      const dim = player.dimension;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_updraft_tome')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_updraft_tome');
      }

      dim.playSound('beacon.activate', player.location, {
        volume: 0.5,
        pitch: 1.8
      });
      system.runTimeout(() => {
        dim.playSound('wind_charge.burst', player.location, {
          volume: 0.9,
          pitch: 0.5
        });
        const damageRange = dim.getEntities({
          location: player.location,
          minDistance: 0.5,
          maxDistance: 10,
          closest: 7,
          excludeFamilies: ['inanimate', 'ignore']
        });
        for (const target of damageRange) {
          if (target === player) continue;
          if (!target.matches({
              families: ['monster']
            }) && !target.matches({
              families: ['player']
            })) return;
            target.dimension.spawnParticle('minecraft:wind_explosion_emitter', {x: target.location.x, y: target.location.y+1, z: target.location.z});
          dim.playSound('wind_charge.burst', {x: target.location.x, y: target.location.y+1, z: target.location.z}, {
            volume: 0.9,
            pitch: 1
          });
          target.applyDamage(5, {
            cause: EntityDamageCause.entityExplosion,
            damagingEntity: player
          });
          target.applyKnockback(0, 0, 0, 1.3);
        }
      }, 10)
    }
  });
});