import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_satchel_of_snacks', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_satchel_of_snacks')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_satchel_of_snacks');
      }

      const healthRand = 3+Math.ceil(Math.random()*3);
      const foodRand = Math.ceil(Math.random()*3);

      player.dimension.playSound('random.eat', player.location);

      let hp = player.getComponent('minecraft:health');
      hp.setCurrentValue(hp.currentValue + healthRand)
      player.addEffect('saturation', foodRand, {showParticles: false});
    }
  });

  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_satchel_of_snacks', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_satchel_of_snacks')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_satchel_of_snacks');
      }

      const healthRand = 4+ Math.ceil(Math.random()*6);
      const foodRand = 3 + Math.ceil(Math.random()*3);

      player.dimension.playSound('random.eat', player.location);

      let hp = player.getComponent('minecraft:health');
      hp.setCurrentValue(hp.currentValue + healthRand)
      player.addEffect('saturation', foodRand, {showParticles: false});
    }
  });

});