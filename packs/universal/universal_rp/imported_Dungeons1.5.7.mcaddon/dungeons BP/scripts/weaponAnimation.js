import {
  world,
  system
} from "@minecraft/server";
const greatswords = [
  'dungeons:claymore',
  'dungeons:broadsword',
  'dungeons:great_axeblade',
  'dungeons:heartstealer',
  'dungeons:bone_club',
  'dungeons:bone_cudgel',
  'dungeons:anchor',
  'dungeons:encrusted_anchor',
  'dungeons:obsidian_claymore',
  'dungeons:starless_night'
];

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const heldItem = player.getComponent("minecraft:equippable").getEquipment("Mainhand");
    if (!heldItem) return;
    if (greatswords.includes(heldItem.typeId)) {
      if(player.isSwimming) return;
      //if(player.getVelocity().x > 0.1 || player.getVelocity().z > 0.1) return;
      
      if(world.scoreboard.getObjective('shadowTime').getScore(player) > 0) return;
player.playAnimation('animation.player.greatsword_hold', { blendOutTime: 0.6, nextState: 'claymoreHold'})
      continue;
    }
  }
});