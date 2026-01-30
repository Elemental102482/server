import {
  world,
  system
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:totem_casting', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_totem_of_casting')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_totem_of_casting');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player)

      if (soulGauge < 15) {
        player.runCommandAsync('function artifact/totem_casting_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/totem_casting_vfx')
      }

      player.dimension.playSound('beacon.ambient', player.location, {
        pitch: 0.8
      });

      const nest = player.dimension.spawnEntity('dungeons:totem_of_casting', player.location);
    }
  });

});