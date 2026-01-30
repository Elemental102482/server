import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:eye_of_the_guardian', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_eye_of_the_guardian')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_eye_of_the_guardian');
      }


      let guardianEye = world.scoreboard.getObjective('guardianEye')

      if(guardianEye.getScore(player) > 0) {
        player.runCommandAsync('function artifact/eye_guardian_fail')
        return;
      }

      guardianEye.setScore(player, 70);
      player.addTag('dungeons:using_common_guardian');
      player.dimension.playSound('mob.guardian.death', player.location, { pitch: 1.6});
      system.runTimeout(() => {
        player.removeTag('dungeons:using_common_guardian');
      }, 71);
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:rare_eye_of_the_guardian', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_eye_of_the_guardian')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_eye_of_the_guardian');
      }


      let guardianEye = world.scoreboard.getObjective('guardianEye')

      if(guardianEye.getScore(player) > 0) {
        player.runCommandAsync('function artifact/eye_guardian_fail')
        return;
      }

      guardianEye.setScore(player, 120);
      player.addTag('dungeons:using_rare_guardian');
      player.dimension.playSound('mob.guardian.death', player.location, { pitch: 1.6});
      system.runTimeout(() => {
        player.removeTag('dungeons:using_rare_guardian');
      }, 121);
    }
  });

});