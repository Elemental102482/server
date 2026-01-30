import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:satchel_of_elixirs', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_satchel_of_elixirs')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_satchel_of_elixirs');
      }


      const potion = Math.ceil(Math.random()*3);

      player.dimension.playSound('bottle.fill', player.location);

      if(potion <= 1) {
        player.dimension.spawnParticle('dungeons:elixir_strength', player.location);
        player.addEffect('strength', 400);
      }
      if(potion == 2) {
        player.dimension.spawnParticle('dungeons:elixir_speed', player.location);
        player.addEffect('speed', 550);
      }
      if(potion == 3) {
        player.dimension.spawnParticle('dungeons:elixir_shadow', player.location);
        player.runCommandAsync('function artifact/shadow_elixir')
      }
    }
  });

});