import {
  world

} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:bottle_of_souls', {
    onConsume(e) {
      const player = e.source;

      player.dimension.playSound('ominous_bottle.end_use', player.location);
      let soulGauge = world.scoreboard.getObjective('soulGauge')
      if(soulGauge.getScore(player) >= 100) return;
      soulGauge.setScore(player, 100)
      player.onScreenDisplay.setActionBar(`§b${soulGauge.getScore(player)}§s Souls `)
        player.dimension.spawnParticle('dungeons:soul2', player.location);
        player.dimension.spawnParticle('dungeons:soul2', player.location);
        player.dimension.spawnParticle('dungeons:soul2', player.location);
        player.dimension.spawnParticle('dungeons:soul2', player.location);
    }
  });
});