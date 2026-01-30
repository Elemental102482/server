import {
  world,
  system
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:totem_shielding', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_totem_of_shielding')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_totem_of_shielding');
      }

      player.dimension.playSound('mob.evocation_illager.cast_spell', player.location, {
        pitch: 1.0
      });

      const nest = player.dimension.spawnEntity('dungeons:totem_of_shielding', player.location);
    }
  });

});