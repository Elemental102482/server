import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:corrupted_pumpkin', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if (item.hasTag('dungeons:tome_of_duplication')) {
        if (!player.hasTag('tod:used_corrupted_pumpkin')) return;
      }

      for (const tag of player.getTags()) {
        if (tag.substring(0, 9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if (!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_corrupted_pumpkin');
      }

      let beam = world.scoreboard.getObjective('corruptPumpkin')


      if (beam.getScore(player) > 0) {
        player.runCommandAsync('function artifact/eye_guardian_fail')
        return;
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player);

      if (soulGauge < 1) {
        player.runCommandAsync('function artifact/corrupted_beacon_fail')
        return;
      }

      beam.setScore(player, 5);
      player.addTag('dungeons:using_corrupted_pumpkin');
      player.dimension.playSound('artefact.corrupted_pumpkin', player.location, {
        pitch: 1
      });
    }
  });

});