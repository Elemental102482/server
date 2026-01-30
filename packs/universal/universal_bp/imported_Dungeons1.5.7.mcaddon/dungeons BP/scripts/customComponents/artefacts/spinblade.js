import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:spinblade', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if (item.hasTag('dungeons:tome_of_duplication')) {
        if (!player.hasTag('tod:used_spinblade')) return;
      }

      for (const tag of player.getTags()) {
        if (tag.substring(0, 9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if (!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_spinblade');
      }

      const ammo = player.dimension.spawnEntity('dungeons:spinblade_projectile', player.getHeadLocation());
      const proj = ammo.getComponent('projectile');
      proj.owner = player;
      proj.shoot(player.getViewDirection());
    }
  });

});