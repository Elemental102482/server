import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:common_corrupted_beacon', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_corrupted_beacon')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_corrupted_beacon');
      }

      let beam = world.scoreboard.getObjective('corruptBeacon')

      if(beam.getScore(player) > 0) {
        player.runCommandAsync('function artifact/eye_guardian_fail')
        return;
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player);

      if (soulGauge < 1) {
        player.runCommandAsync('function artifact/corrupted_beacon_fail')
        return;
      }

      beam.setScore(player, 5);
      player.runCommandAsync('function weapon/illagers_bane_fx')
      player.addTag('dungeons:using_common_beacon');
      player.dimension.playSound('beacon.activate', player.location, {
        pitch: 0.5
      });
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_corrupted_beacon', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_corrupted_beacon')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_corrupted_beacon');
      }

      let beam = world.scoreboard.getObjective('corruptBeacon')


      if(beam.getScore(player) > 0) {
        player.runCommandAsync('function artifact/eye_guardian_fail')
        return;
      }

      let soulGauge = world.scoreboard.getObjective('soulGauge').getScore(player);

      if (soulGauge < 1) {
        player.runCommandAsync('function artifact/corrupted_beacon_fail')
        return;
      }

      beam.setScore(player, 5);
      player.runCommandAsync('function weapon/illagers_bane_fx')
      player.addTag('dungeons:using_rare_beacon');
      player.dimension.playSound('beacon.activate', player.location, {
        pitch: 0.5
      });
    }
  });

});