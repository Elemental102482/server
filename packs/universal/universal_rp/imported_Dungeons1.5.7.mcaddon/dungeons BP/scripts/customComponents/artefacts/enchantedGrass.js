import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:enchanted_grass', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_enchanted_grass')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_enchanted_grass');
      }

      player.runCommandAsync('function artifact/enchanted_grass')

      const nest = player.dimension.spawnEntity('dungeons:enchanted_sheep', player.location);

      let tameable = nest.getComponent('minecraft:tameable')
      tameable.tame(player);
    }
  });

});