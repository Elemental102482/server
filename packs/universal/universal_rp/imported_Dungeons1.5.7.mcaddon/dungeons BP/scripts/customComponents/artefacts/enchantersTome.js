import {
  world,
  system,
  ItemStack
} from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:enchanters_tome', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_enchanters_tome')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_enchanters_tome');
      }
      player.dimension.playSound('block.enchanting_table.use', player.location);
      const targets = player.dimension.getEntities({
        location: player.location,
        maxDistance: 16,
        families: ['enchantable_pet']
      });
      for (const mob of targets) {
        const owner = mob.getComponent('minecraft:tameable').tamedToPlayer;
        if (!owner) continue;
        if (owner !== player) continue;
        mob.triggerEvent('dungeons:pet_become_enchanted');
        mob.dimension.spawnParticle('dungeons:enchanted_tome', mob.location);
mob.addEffect('regeneration', 5, {amplifier: 4, showParticles: false});
      }
    }
  });
});