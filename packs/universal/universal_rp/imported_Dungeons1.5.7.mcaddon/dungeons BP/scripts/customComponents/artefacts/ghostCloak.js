import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_ghost_cloak', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_ghost_cloak')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_ghost_cloak');
      }

          player.dimension.spawnParticle('dungeons:ambush', player.location)
          player.dimension.playSound('armor.equip_leather', player.location, {
            pitch: 1.5
          });

          player.addEffect('speed', 40, {
            amplifier: 0,
            showParticles: false
          });
          player.addEffect('resistance', 40, {
            amplifier: 1,
            showParticles: true
          });
          player.addEffect('invisibility', 40, {
            amplifier: 0,
            showParticles: false
          });
    }
  });

  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_ghost_cloak', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_ghost_cloak')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_ghost_cloak');
      }
          player.dimension.spawnParticle('dungeons:ambush', player.location)
          player.dimension.playSound('armor.equip_leather', player.location, {
            pitch: 1.5
          });

          player.addEffect('speed', 40, {
            amplifier: 1,
            showParticles: false
          });
          player.addEffect('resistance', 40, {
            amplifier: 1,
            showParticles: true
          });
          player.addEffect('invisibility', 40, {
            amplifier: 0,
            showParticles: false
          });
    }
  });

});