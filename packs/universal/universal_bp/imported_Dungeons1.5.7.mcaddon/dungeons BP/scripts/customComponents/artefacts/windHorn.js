import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_wind_horn', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_wind_horn')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_wind_horn');
      }

      player.runCommand('function artifact/wind_horn_common');
    }
  });

  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_wind_horn', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_wind_horn')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_wind_horn');
      }

      player.runCommand('function artifact/wind_horn_rare');
    }
  });

});