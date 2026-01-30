import {
  world,
  system
} from "@minecraft/server";

const allScores = [
  'cooldownMax',
  'cooldownTime',
  'hammerCD',
  'obsidianCD',
  'shadowTime',
  'shockwaveCD',
  'soulGauge',
  'sweepCD',
  'swirlCD',
  'anchorCD',
  'spongeStrikerCharge',
  'guardianEye',
  'sawbladeCharge',
  'sawbladeCD',
  'powershaker_t',
  'powershaker_u',
  'corruptBeacon',
  'corruptPumpkin',
  'glaiveCD',
  'echoCD',
  'tpCD',
  'dungeons:music'
];

world.afterEvents.worldInitialize.subscribe(e => {

  for (const score of allScores) {
    if (!world.scoreboard.getObjective(score)) {
      world.scoreboard.addObjective(score)
    }
  }
});

world.afterEvents.playerSpawn.subscribe(e => {
  let player = e.player;
  if (e.initialSpawn === false) return;

  player.removeTag('dungeons:tempest_warn');
  player.removeTag('dungeons:guardian_warn');
  player.removeTag('dungeons:spooky_warn');
  player.removeTag('dungeons:vhoe_warn');
  player.removeTag('dungeons:sword_block');
  player.removeTag('dungeons:using_common_guardian');
  player.removeTag('dungeons:using_rare_guardian');
  player.removeTag('dungeons:using_common_beacon');
  player.removeTag('dungeons:using_rare_beacon');

  for (const score of allScores) {
    world.scoreboard.getObjective(score).addScore(player, 0);


    system.runTimeout(() => {
      player.addTag('aly:dungeons_enabled');
    }, 10);
    // Aly advancements compatibility 

  }
});
