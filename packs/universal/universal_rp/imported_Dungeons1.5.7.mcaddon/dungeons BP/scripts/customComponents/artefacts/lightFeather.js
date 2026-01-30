import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:light_feather', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_light_feather')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_light_feather');
      }


      player.dimension.playSound('wind_charge.burst', player.location, {
        pitch: 1.5
      });
      if(world.scoreboard.getObjective('shadowTime').getScore(player) == 0) {
       player.playAnimation('animation.player.roll', {
          blendOutTime: 2,
          nextState: 'lightFeather'
        });
      }
      player.dimension.spawnParticle('minecraft:wind_explosion_emitter', player.location);

      const targets = player.dimension.getEntities({
        location: player.location,
        maxDistance: 3.5,
        excludeFamilies: ['ignore']
      });

      for (const target of targets) {
        if (target === player) continue;

        target.addEffect('slowness', 25, {
          amplifier: 4
        });

      }
      player.addEffect('resistance', 25, {
        amplifier: 5,
        showParticles: false
      });

      const velocity = player.getViewDirection();

      if(player.isGliding) {
        player.applyKnockback(velocity.x, velocity.z, 2.5, 0.25);
      } else {
        player.applyKnockback(velocity.x, velocity.z, 5, 0.5);
      }

    }
  });

});