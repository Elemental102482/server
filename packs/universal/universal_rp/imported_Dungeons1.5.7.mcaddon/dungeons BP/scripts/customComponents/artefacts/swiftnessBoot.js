import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_boots_of_swiftness', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_boots_of_swiftness')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_boots_of_swiftness');
      }
          player.dimension.spawnParticle('dungeons:swiftness', player.location)
          player.dimension.playSound('armor.equip_leather', player.location, {
            pitch: 1.5
          });

          player.addEffect('speed', 65, {
            amplifier: 1
          });
    }
  });

  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_boots_of_swiftness', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_boots_of_swiftness')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_boots_of_swiftness');
      }
          player.dimension.spawnParticle('dungeons:swiftness', player.location)
          player.dimension.playSound('armor.equip_leather', player.location, {
            pitch: 1.5
          });

          player.addEffect('speed', 90, {
            amplifier: 1
          });
    }
  });

});