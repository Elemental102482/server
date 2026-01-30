import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:vexing_chant', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_vexing_chant')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_vexing_chant');
      }

          player.runCommandAsync('function artifact/vexing_chant')
          const vex0 = player.dimension.spawnEntity('dungeons:guardian_vex', player.location);
          const vex1 = player.dimension.spawnEntity('dungeons:guardian_vex', player.location);
          const vex2 = player.dimension.spawnEntity('dungeons:guardian_vex', player.location);

          let vexTameable0 = vex0.getComponent('minecraft:tameable')
          vexTameable0.tame(player);
          let vexTameable1 = vex1.getComponent('minecraft:tameable')
          vexTameable1.tame(player);
          let vexTameable2 = vex2.getComponent('minecraft:tameable')
          vexTameable2.tame(player);
    }
  });

});