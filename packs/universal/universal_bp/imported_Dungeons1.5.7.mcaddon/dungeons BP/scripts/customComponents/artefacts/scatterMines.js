import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:scatter_mines', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_scatter_mines')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_scatter_mines');
      }

      player.dimension.playSound('weapon.enchant.exploding', player.location, {
        pitch: 1.5
      });

      const loc1 = player.dimension.getTopmostBlock({x: player.location.x+1.5, z: player.location.z}, player.location.y).bottomCenter();
      const loc2 = player.dimension.getTopmostBlock({x: player.location.x-1.5, z: player.location.z-1.5}, player.location.y).bottomCenter();
      const loc3 = player.dimension.getTopmostBlock({x: player.location.x-1.5, z: player.location.z+1.5}, player.location.y).bottomCenter();

      if(loc1.y - player.location.y <= 5 && loc1.y - player.location.y >= -5) {
        const mine1 = player.dimension.spawnEntity('dungeons:player_scatter_mine', {x:loc1.x, y:loc1.y+1, z:loc1.z});
        let tameable1 = mine1.getComponent('minecraft:tameable')
        tameable1.tame(player);
      }
      if(loc2.y - player.location.y <= 5 && loc2.y - player.location.y >= -5) {
        const mine2 = player.dimension.spawnEntity('dungeons:player_scatter_mine', {x:loc2.x, y:loc2.y+1, z:loc2.z});
        let tameable2 = mine2.getComponent('minecraft:tameable')
        tameable2.tame(player);
      }
      if(loc3.y - player.location.y <= 5 && loc3.y - player.location.y >= -5) {
        const mine3 = player.dimension.spawnEntity('dungeons:player_scatter_mine', {x:loc3.x, y:loc3.y+1, z:loc3.z});
        let tameable3 = mine3.getComponent('minecraft:tameable')
        tameable3.tame(player);
      }

    }
  });

});