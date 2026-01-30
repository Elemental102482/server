import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:tome_of_duplication', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          return;
        }
      }
      player.sendMessage('§7You must use a different artefact before this one in order to duplicate its effect!');

      let cd = item.getComponent('cooldown');
      player.startItemCooldown(cd.cooldownCategory, 20);
    }
  });

});