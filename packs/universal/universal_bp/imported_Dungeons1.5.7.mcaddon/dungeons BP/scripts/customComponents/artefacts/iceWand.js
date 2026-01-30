import {
  world,
  system
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:ice_wand', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_ice_wand')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_ice_wand');
      }
          const iceChunkRayCast = player.getBlockFromViewDirection({
            maxDistance: 24,
            includePassableBlocks: false,
            includeLiquidBlocks: true
          });
          if (!iceChunkRayCast) {
            player.runCommandAsync('summon dungeons:ice_chunk_player ^^^24')
            return;
          }
          player.dimension.spawnEntity('dungeons:ice_chunk_player', iceChunkRayCast.block.location);
    }
  });
});