import {
  world,
  system
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_shadow_shifter', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_shadow_shifter')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_shadow_shifter');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player)

      if (soulGauge < 8) {
        player.runCommandAsync('function artifact/shadow_shifter_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/shadow_shifter_common')
      }
    }
  });

  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_shadow_shifter', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_shadow_shifter')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_shadow_shifter');
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player)

      if (soulGauge < 8) {
        player.runCommandAsync('function artifact/shadow_shifter_fail')
        let cd = item.getComponent('cooldown');
        player.startItemCooldown(cd.cooldownCategory, 20);
        return;
      } else {
        player.runCommandAsync('function artifact/shadow_shifter_rare')
      }
    }
  });
});