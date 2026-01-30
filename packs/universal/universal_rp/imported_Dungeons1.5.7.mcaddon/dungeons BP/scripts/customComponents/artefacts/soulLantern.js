import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:soul_lantern', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_soul_lantern')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_soul_lantern');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player);

      if (soulGauge < 13) {
        player.runCommandAsync('function artifact/soul_lantern_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/soul_lantern_vfx')
      }

      const nest = player.dimension.spawnEntity('dungeons:soul_wizard', player.location);

      let tameable = nest.getComponent('minecraft:tameable')
      tameable.tame(player);
    }
  });

});