import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:golem_kit', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_golem_kit')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_golem_kit');
      }

      player.dimension.playSound('random.anvil_use', player.location, {
        pitch: 0.75
      });

      const nest = player.dimension.spawnEntity('dungeons:pet_iron_golem', player.location);

      let tameable = nest.getComponent('minecraft:tameable')
      tameable.tame(player);
    }
  });

});