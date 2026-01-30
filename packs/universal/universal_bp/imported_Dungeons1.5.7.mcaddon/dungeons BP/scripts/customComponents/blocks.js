import {
  world,
  system,
  EntityDamageCause
} from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe(initEvent => {

  initEvent.blockComponentRegistry.registerCustomComponent('dungeons:void_portal_frame', {

    onPlayerInteract(e) {
      const block = e.block;
      const player = e.player;
      const permutation = block.permutation;
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');
      if (!selectedItem) return;
      if (selectedItem.typeId !== 'dungeons:enchanted_eye_of_ender') return;
      if (!e.player.matches({ gameMode: 'creative' })) {
        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
      }
      const newPermutation = permutation.withState('dungeons:eye', 1);
      block.setPermutation(newPermutation);


      e.dimension.spawnParticle('dungeons:fill_frame', block.bottomCenter())
      e.dimension.playSound('block.end_portal_frame.fill', block, {
        volume: 0.3
      })
      player.runCommand('event entity @e[type=dungeons:void_portal,c=1,r=64] dungeons:eye_placed');
    }
  }),

    initEvent.blockComponentRegistry.registerCustomComponent('dungeons:precise_rotation', {
      beforeOnPlayerPlace(e) {
        const player = e.player;
        const y = player.getRotation().y;
        let rot = y + 360 * (y != Math.abs(y));
        rot = Math.round(rot / 22.5)
        rot = rot != 16 ? rot : 0
        e.permutationToPlace = e.permutationToPlace.withState('dungeons:rotation', rot);
      }
    }),
    initEvent.blockComponentRegistry.registerCustomComponent('dungeons:redstone_core', {
      onPlace(e) {
        const block = e.block;
        if (block.above().type.id === block.type.id || block.below().type.id === block.type.id) {
          block.dimension.runCommand(`setblock ${block.x} ${block.y} ${block.z} air destroy`)
          return;
        }

        const core = e.dimension.spawnEntity('dungeons:redstone_core', block.bottomCenter());
      },
      onPlayerDestroy(e) {
        const block = e.block.center();
        e.dimension.runCommandAsync(`particle dungeons:tuff ${block.x} ${block.y} ${block.z}`)
      },
      onPlayerInteract(e) {
        const block = e.block;
        const player = e.player;
        const entities = e.dimension.getEntitiesAtBlockLocation(block.location);
        for (const entity of entities) {
          if (entity.typeId === 'dungeons:redstone_core' && entity.hasTag('core:ready')) {
            entity.triggerEvent('dungeons:activate_core');
            system.runTimeout(() => {
              const nearbyMobs = block.dimension.getEntities({
                location: block.center(),
                maxDistance: 7,
                excludeFamilies: ['ignore']
              });
              for (const mob of nearbyMobs) {
                if (mob.isValid()) {
                  const xDif = mob.location.x - block.center().x;
                  const zDif = mob.location.z - block.center().z;
                  mob.applyKnockback(xDif, zDif, 1.2, 0.6);
                  if (mob.typeId !== "dungeons:redstone_monstrosity" && mob.typeId !== "dungeons:spooky_monstrosity") {
                    mob.applyDamage(30, {
                      cause: EntityDamageCause.entityExplosion,
                      damagingEntity: player
                    });
                  } else {
                    mob.applyDamage(60, {
                      cause: EntityDamageCause.magic,
                      damagingEntity: player
                    });
                  }
                }
              }
            }, 60) // waits 3 seconds for charge to finish
            return;
          }
          return;
        }
      },
      onTick(e) {
        const block = e.block;
        if (!block.isValid) return;
        const playerNear = e.dimension.getPlayers({
          location: block.center(),
          maxDistance: 16
        });
        if (!playerNear) return;
        const entities = e.dimension.getEntities({
          location: block.center(),
          maxDistance: 0.5
        });
        if (!entities || entities.length == 1) return;
        const core = e.dimension.spawnEntity('dungeons:redstone_core', block.bottomCenter());
        for (const entity of entities) {
          if (entity !== core && entity.typeId === 'dungeons:redstone_core') entity.remove();
        }
      }
    })
});