import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:buzzy_nest', {
    onUse(e) {
      const player = e.source;
      const item = e.itemStack;

      if(item.hasTag('dungeons:tome_of_duplication')) {
        if(!player.hasTag('tod:used_buzzy_nest')) return;
      }

      for(const tag of player.getTags()) {
        if(tag.substring(0,9) === 'tod:used_') {
          player.removeTag(tag)
        }
      }
      if(!item.hasTag('dungeons:tome_of_duplication')) {
        player.addTag('tod:used_buzzy_nest');
      }

      player.dimension.playSound('jump.stone', player.location, {
        pitch: 0.75
      });

      const nest = player.dimension.spawnEntity('dungeons:buzzy_nest', player.location);

      let tameable = nest.getComponent('minecraft:tameable')
      tameable.tame(player);
    }
  });

});

world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const mob = event.entity;
  const eventId = event.eventId;
  if (eventId !== 'dungeons:spawn_bee') {
    return;
  }
  const owner = mob.getComponent('minecraft:tameable').tamedToPlayer;
  if (!owner) return;

  const bee = mob.dimension.spawnEntity('dungeons:pet_bee', {x: mob.location.x, y: mob.location.y+1, z: mob.location.z});

  let tameable = bee.getComponent('minecraft:tameable')
  tameable.tame(owner);


mob.dimension.playSound('block.beehive.exit', mob.location);
      mob.playAnimation('animation.buzzy_nest.spawn_bee');
});