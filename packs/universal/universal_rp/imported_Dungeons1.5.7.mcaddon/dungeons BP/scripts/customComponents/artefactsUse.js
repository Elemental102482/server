import {
  world,
  system,
  ItemStack
} from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:dynamic_cooldown', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;
      let cd = item.getComponent('cooldown');
      var mult = 1;

      if (player.hasTag('dungeons:evocation_armour') || player.hasTag('dungeons:ember_armour') || player.hasTag('dungeons:verdant_armour')) {
        mult = mult*0.7;
      }

      if (player.hasTag('dungeons:guard_armour') || player.hasTag('dungeons:ender_armour')) {
        mult = mult*0.85;
      }

      const totemCasting = player.dimension.getEntities({
        location: player.location,
        maxDistance: 3,
        families: ['totem_casting']
      });

      if (totemCasting.length >= 1) {
        mult = mult*0.3;
      }

      if(mult < 0.1) {
        mult = 0.1;
      }

      player.startItemCooldown(cd.cooldownCategory, Math.floor(cd.cooldownTicks * mult));

      if(!item.hasTag('dungeons:soul_artefact') && !item.hasTag('dungeons:tome_of_duplication')) {
        if(player.hasTag('dungeons:root_rot_armour')) {
          player.dimension.playSound('random.eat', player.location, {volume: 0.3});
          player.addEffect('saturation', 1, {showParticles: false});
        } else if (player.hasTag('dungeons:black_spot_armour')) {
          player.dimension.playSound('random.eat', player.location, {volume: 0.3});
          let hp = player.getComponent('minecraft:health');
          hp.setCurrentValue(hp.currentValue + 1)
          player.addEffect('saturation', 1, {showParticles: false});
        } else if (player.hasTag('dungeons:golden_piglin_armour')) {
          player.dimension.playSound('random.eat', player.location, {volume: 0.3});
          let hp = player.getComponent('minecraft:health');
          hp.setCurrentValue(hp.currentValue + 1)
        } 
      }

      if (player.hasTag('dungeons:debug')) {
        player.sendMessage(`You have used the ${item.typeId}`);
        player.sendMessage(`Cooldown :§e${cd.cooldownTicks/20}s`);
        if (mult !== 1) {
          player.sendMessage(`Modified Cooldown :§e${Math.floor(cd.cooldownTicks*mult)/20}s`);
          player.sendMessage(`Cooldown Modifier :§b${mult}x`);
        }
      }
    }
  });
});