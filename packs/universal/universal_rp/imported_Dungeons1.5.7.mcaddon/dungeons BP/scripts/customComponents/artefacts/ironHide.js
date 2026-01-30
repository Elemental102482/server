import {
  world,
  system,
  ItemStack
} from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_iron_hide_amulet', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_iron_hide_amulet')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_iron_hide_amulet');
      }
      player.dimension.spawnParticle('dungeons:daggers_strike', player.location)
      player.dimension.playSound('random.anvil_land', player.location, {
        volume: 0.7,
        pitch: 0.5
      });
      player.addEffect('resistance', 120, {
        amplifier: 1
      });
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_iron_hide_amulet', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_iron_hide_amulet')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_iron_hide_amulet');
      }
      player.dimension.spawnParticle('dungeons:daggers_strike', player.location)
      player.dimension.playSound('random.anvil_land', player.location, {
        volume: 0.7,
        pitch: 0.5
      });
      player.addEffect('resistance', 160, {
        amplifier: 1
      });
    }
  });
});