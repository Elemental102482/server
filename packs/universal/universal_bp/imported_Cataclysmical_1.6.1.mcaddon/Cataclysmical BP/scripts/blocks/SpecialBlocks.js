import { world, ItemStack, system } from '@minecraft/server';
import { TicksPerSecond } from "@minecraft/server";

//blank, a place holder
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:blank', {
    onStepOn({ block }) {
      //blank
    }
  })
})

//ancient_pot
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:ancient_pot_break', {
    onPlayerBreak({ block, dimension, player }) {
      player.playSound('shatter.decorated_pot', { pitch: 1, location: player.location, volume: 3 })
    }
  })
})

//floret_ore
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:floret_ore_emitter', {
    onTick({ block, dimension }) {
      const { x, y, z } = block;
      if (block?.above()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:floret_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.below()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:floret_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.north()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:floret_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.east()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:floret_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.south()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:floret_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.west()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:floret_ore_emitter ${x} ${y} ${z} `);

      } else return
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:floret_ore_explosion', {
    onPlayerBreak({ block, dimension, player }) {
      const { x, y, z } = block;
      const random = Math.random()
      if (player.hasTag("novelty:cata:floret_absorption")) {
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
      }
      if (random < 0.6) {
        dimension.runCommand(`particle cata:floret_ore_emitter ${x} ${y} ${z}`);
        dimension.runCommand(`particle cata:floret_ore_explosion ${x} ${y} ${z}`);
        dimension.runCommand(`summon cata:floret_ore_explosion ${x} ${y} ${z}`)
        player.playSound('sound.feral_gas', { pitch: 1, location: player.location, volume: 0.6 })
      } else return
    }
  })
})

//solar_ore
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_ore_emitter', {
    onTick({ block, dimension }) {
      const { x, y, z } = block;
      if (block?.above().typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.below()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.north()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.east()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.south()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y} ${z} `);

      } else if (block?.west()?.typeId === ('minecraft:air')) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y} ${z} `);

      } else return
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_ore_explosion', {
    onPlayerBreak({ block, dimension, player }) {
      const { x, y, z } = block;
      const random = Math.random()
      if (player.hasTag("novelty:cata:solar_absorption")) {
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
        dimension.runCommand(`summon xp_orb ${x} ${y} ${z}`)
      }
      if (random < 0.5) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y} ${z}`);
        dimension.runCommand(`particle cata:solar_ore_explosion ${x} ${y} ${z}`);
        dimension.runCommand(`summon cata:solar_ore_explosion ${x} ${y} ${z}`)
        player.playSound('sound.solar_explosion', { pitch: 1, location: player.location, volume: 0.5 })
      } else return
    }
  })
})


//astral_dust
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:astral_dust_emitter', {
    onTick({ block, dimension, player }) {
      const random = Math.random()
      const { x, y, z } = block;
      if (random < 0.50) {
        if (block.above().typeId === ('cata:asteroid')) {
          dimension.runCommand(`particle cata:astral_dust_emitter ${x} ${y} ${z} `);
        }
      }
    }
  })
})


//gneiss door lock
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:gneiss_door_unlock', {
    onPlayerInteract({ player, block, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:master_verdant_key') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          player.runCommand(`execute if block ${x} ${y + 1} ${z} cata:gneiss_door run setblock ${x} ${y + 1} ${z} air destroy`)
          player.runCommand(`execute if block ${x} ${y - 1} ${z} cata:gneiss_door run setblock ${x} ${y - 1} ${z} air destroy`)
          player.runCommand(`execute if block ${x} ${y} ${z - 1} cata:gneiss_door run setblock ${x} ${y} ${z - 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y} ${z + 1} cata:gneiss_door run setblock ${x} ${y} ${z + 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y - 1} ${z - 1} cata:gneiss_door run setblock ${x} ${y - 1} ${z - 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y - 1} ${z + 1} cata:gneiss_door run setblock ${x} ${y - 1} ${z + 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y + 1} ${z + 1} cata:gneiss_door run setblock ${x} ${y + 1} ${z + 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y + 1} ${z - 1} cata:gneiss_door run setblock ${x} ${y + 1} ${z - 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y + 2} ${z + 1} cata:gneiss_door run setblock ${x} ${y + 2} ${z + 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y + 2} ${z - 1} cata:gneiss_door run setblock ${x} ${y + 2} ${z - 1} air destroy`)
          player.runCommand(`execute if block ${x} ${y + 2} ${z} cata:gneiss_door run setblock ${x} ${y + 2} ${z} air destroy`)
          player.runCommand(`setblock ${x} ${y} ${z} air destroy`)
          player.runCommand(`execute if block ${x + 1} ${y} ${z} cata:gneiss_door run setblock ${x + 1} ${y} ${z} air destroy`)
          player.runCommand(`execute if block ${x + 1} ${y + 1} ${z} cata:gneiss_door run setblock ${x + 1} ${y + 1} ${z} air destroy`)
          player.runCommand(`execute if block ${x + 1} ${y + 2} ${z} cata:gneiss_door run setblock ${x + 1} ${y + 2} ${z} air destroy`)
          player.runCommand(`execute if block ${x + 1} ${y - 1} ${z} cata:gneiss_door run setblock ${x + 1} ${y - 1} ${z} air destroy`)
          player.runCommand(`execute if block ${x + -1} ${y} ${z} cata:gneiss_door run setblock ${x + -1} ${y} ${z} air destroy`)
          player.runCommand(`execute if block ${x + -1} ${y + 1} ${z} cata:gneiss_door run setblock ${x + -1} ${y + 1} ${z} air destroy`)
          player.runCommand(`execute if block ${x + -1} ${y + 2} ${z} cata:gneiss_door run setblock ${x + -1} ${y + 2} ${z} air destroy`)
          player.runCommand(`execute if block ${x + -1} ${y - 1} ${z} cata:gneiss_door run setblock ${x + -1} ${y - 1} ${z} air destroy`)
          player.playSound('sound.verdant_door_unlock', { pitch: 1.2, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:master_verdant_key 0 1`)
        }
      }
    }
  })
})


//verdant_crusher interact
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:verdant_crusher', {
    onPlayerInteract({ block, dimension, player }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:floret_element') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 0.5} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          player.playSound('block.grindstone.use', { pitch: 1, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:floret_element 0 1`)
        }
        if (selectedItem?.typeId == 'cata:polished_feralplast') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          player.playSound('block.grindstone.use', { pitch: 1, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:polished_feralplast 0 1`)
        }
        if (selectedItem?.typeId == 'cata:feralplast_brick') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          player.playSound('block.grindstone.use', { pitch: 1, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:feralplast_brick 0 1`)
        }
        if (selectedItem?.typeId == 'cata:feral_roots_placer') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          player.playSound('block.grindstone.use', { pitch: 1, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:feral_roots_placer 0 1`)
        }
        if (selectedItem?.typeId == 'cata:floret_ore') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          player.playSound('block.grindstone.use', { pitch: 1, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:floret_ore 0 1`)
        }
        if (selectedItem?.typeId == 'cata:floret_block') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          player.playSound('block.grindstone.use', { pitch: 1, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:floret_block 0 1`)
        }
        if (selectedItem?.typeId == 'cata:feralplast') {
          dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
          dimension.runCommand(`summon xp_orb ${x} ${y + 1} ${z}`)
          player.playSound('block.grindstone.use', { pitch: 1, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:feralplast 0 1`)
        }
      }
    }
  });
});


//phantasma_stabilizer
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:phantasma_stabilizer', {
    onPlayerInteract({ block, dimension, player }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:ectoplasm') {
          if (player.hasTag('HasTerrorStage5')) {

            player.onScreenDisplay.setActionBar('§7Terror Stage is now 4')
            player.removeTag("HasTerrorStage5")
            dimension.runCommand(`particle cata:phantasma_stabilizer_bolt ${x} ${y} ${z}`)
            dimension.runCommand(`particle cata:phantasma_stabilizer ${x} ${y} ${z}`)
            player.playSound('block.phantasma_stabilizer', { pitch: 1, location: player.location, volume: 1 })
            player.runCommand(`clear @s cata:ectoplasm 0 1`)
          } else if (player.hasTag('HasTerrorStage4')) {

            player.onScreenDisplay.setActionBar('§7Terror Stage is now 3')
            player.removeTag("HasTerrorStage4")
            dimension.runCommand(`particle cata:phantasma_stabilizer_bolt ${x} ${y} ${z}`)
            dimension.runCommand(`particle cata:phantasma_stabilizer ${x} ${y} ${z}`)
            player.playSound('block.phantasma_stabilizer', { pitch: 1, location: player.location, volume: 1 })
            player.runCommand(`clear @s cata:ectoplasm 0 1`)

          } else if (player.hasTag('HasTerrorStage3')) {

            player.onScreenDisplay.setActionBar('§7Terror Stage is now 2')
            player.removeTag("HasTerrorStage3")
            dimension.runCommand(`particle cata:phantasma_stabilizer_bolt ${x} ${y} ${z}`)
            dimension.runCommand(`particle cata:phantasma_stabilizer ${x} ${y} ${z}`)
            player.playSound('block.phantasma_stabilizer', { pitch: 1, location: player.location, volume: 1 })
            player.runCommand(`clear @s cata:ectoplasm 0 1`)

          } else if (player.hasTag('HasTerrorStage2')) {

            player.onScreenDisplay.setActionBar('§7Terror Stage is now 1')
            player.removeTag("HasTerrorStage2")
            dimension.runCommand(`particle cata:phantasma_stabilizer_bolt ${x} ${y} ${z}`)
            dimension.runCommand(`particle cata:phantasma_stabilizer ${x} ${y} ${z}`)
            player.playSound('block.phantasma_stabilizer', { pitch: 1, location: player.location, volume: 1 })
            player.runCommand(`clear @s cata:ectoplasm 0 1`)

          } else if (player.hasTag('HasTerrorStage1')) {

            player.onScreenDisplay.setActionBar('§7Terror Stage is now 0')
            player.removeTag("HasTerrorStage1")
            dimension.runCommand(`particle cata:phantasma_stabilizer_bolt ${x} ${y} ${z}`)
            dimension.runCommand(`particle cata:phantasma_stabilizer ${x} ${y} ${z}`)
            player.playSound('block.phantasma_stabilizer', { pitch: 1, location: player.location, volume: 1 })
            player.runCommand(`clear @s cata:ectoplasm 0 1`)

          } else if (!player.hasTag('HasTerrorStage1')) { return }
        } else if (!player.isSneaking || player.isSneaking) {
          if (player.hasTag('HasTerrorStage5')) {
            player.onScreenDisplay.setActionBar('§7Terror is Stage 5')
            player.startItemCooldown('terror_detector', 20)
            player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
          } else if (player.hasTag('HasTerrorStage4')) {
            player.onScreenDisplay.setActionBar('§7Terror is Stage 4')
            player.startItemCooldown('terror_detector', 20)
            player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
          } else if (player.hasTag('HasTerrorStage3')) {
            player.onScreenDisplay.setActionBar('§7Terror is Stage 3')
            player.startItemCooldown('terror_detector', 20)
            player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
          } else if (player.hasTag('HasTerrorStage2')) {
            player.onScreenDisplay.setActionBar('§7Terror is Stage 2')
            player.startItemCooldown('terror_detector', 20)
            player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
          } else if (player.hasTag('HasTerrorStage1')) {
            player.onScreenDisplay.setActionBar('§7Terror is Stage 1')
            player.startItemCooldown('terror_detector', 20)
            player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
          } else {
            player.startItemCooldown('terror_detector', 20)
            player.onScreenDisplay.setActionBar('§7Terror is Stage 0')
            player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
          }
        }
      }
    }
  });
});

//solar_tesla_coil
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_tesla_coil', {
    onTick({ block, dimension }) {
      const { x, y, z } = block;
      const nearbyEntities = block.dimension.getEntities({
        location: block.location,
        maxDistance: 5,
        excludeFamilies: ["player"]
      });
      for (const entity of nearbyEntities) {
        if (entity.hasComponent('health') && !entity.hasTag("solar_protection") && block.below().typeId !== ('cata:solar_ore')) {
          dimension.runCommand(`particle cata:solar_tesla_coil ${x} ${y} ${z} `)
          entity.runCommand(`playsound sound.tesla_coil_zap @a[r=12] ${x} ${y} ${z}`)
          entity.runCommand(`particle cata:solar_ore_emitter ${x} ${y + 1} ${z} `)
          entity.applyDamage(8, { cause: "entityAttack" })
          entity.setOnFire(1)
        } else if (entity.hasComponent('health') && !entity.hasTag("solar_protection") && block.below().typeId === ('cata:solar_ore')) {
          const random = Math.random()
          if (random < 0.30) {
            dimension.runCommand(`setblock ${x} ${y - 1} ${z} cata:flare_stone destroy `)
          } else if (random < 1) {

          }
          dimension.runCommand(`particle cata:solar_ore_explosion ${x} ${y} ${z}`);
          dimension.runCommand(`particle cata:solar_tesla_coil ${x} ${y} ${z} `)
          entity.runCommand(`playsound sound.solar_explosion @a[r=12] ${x} ${y} ${z}`)
          entity.runCommand(`playsound sound.tesla_coil_zap @a[r=12] ${x} ${y} ${z}`)
          entity.runCommand(`particle cata:solar_ore_emitter ${x} ${y + 1} ${z} `)
          entity.applyDamage(12, { cause: "entityAttack" })
          entity.setOnFire(2)
        }
      }
    }
  })
})

//occult_alter
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:occult_alter', {
    onPlayerInteract({ block, player, dimension }) {
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:solar_core') {

          block.setPermutation(block.permutation.withState('cata:activated', true));
          player.playSound('respawn_anchor.charge', { pitch: 1.2, location: player.location, volume: 0.5 })
          player.runCommand(`clear @s cata:solar_core 0 1`)
          const { x, y, z } = block;
          dimension.runCommand(`summon cata:solar_core_beam ${x} ${y} ${z}`)
        }
      }
    }
  })
})

//verdant_vault
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:verdant_vault', {
    onPlayerInteract({ player, block, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:verdant_key') {
          player.playSound('vault.insert_item', { pitch: 0.7, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:verdant_key 0 1`)
          block.setPermutation(block.permutation.withState('cata:activate', true));
        } else if (selectedItem?.typeId !== 'cata:verdant_key') {
          player.playSound('vault.insert_item_fail', { pitch: 0.7, location: player.location, volume: 1 })
        }
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:verdant_vault_break', {
    onTick({ block, dimension }) {
      const { x, y, z } = block;
      dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`)
      dimension.runCommand(`loot spawn ${x} ${y + 1} ${z} loot "chests/verdant_vault"`)
      dimension.runCommand(`particle cata:verdant_crusher ${x} ${y} ${z}`)
    }
  })
})

//platinum_vault
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:platinum_vault', {
    onPlayerInteract({ player, block, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:platinum_key') {
          player.playSound('vault.insert_item', { pitch: 1.2, location: player.location, volume: 1 })
          player.runCommand(`clear @s cata:platinum_key 0 1`)
          block.setPermutation(block.permutation.withState('cata:activate', true));
        } else if (selectedItem?.typeId !== 'cata:platinum_key') {
          player.playSound('vault.insert_item_fail', { pitch: 1.2, location: player.location, volume: 1 })
        }
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:platinum_vault_break', {
    onTick({ block, dimension }) {
      const { x, y, z } = block;
      dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`)
      dimension.runCommand(`loot spawn ${x} ${y + 1} ${z} loot "chests/platinum_vault"`)
    }
  })
})


//emberglow
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:emberglow_stepon', {
    onStepOn({ block, entity, dimension }) {
      const { x, y, z } = block;
      if (entity.hasComponent('health') && !entity.hasComponent('minecraft:fire_immune')) {
        dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y + 2} ${z} `);
        block.setPermutation(block.permutation.withState('cata:stepon', true));
        entity.applyDamage(18, { cause: "entityAttack" })
        entity.setOnFire(5)
        entity.runCommand(`playsound sound.tesla_coil_zap @a[r=12] ${x} ${y} ${z}`)
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:emberglow', {
    onTick({ block, dimension, player }) {
      const { x, y, z } = block;
      const nearbyEntities = block.dimension.getEntities({
        location: block.location,
        maxDistance: 2,
        excludeFamilies: ["solar"]
      });
      for (const entity of nearbyEntities) {
        if (entity.hasComponent('health')) {
          entity.runCommand(`playsound sound.tesla_coil_zap @a[r=12] ${x} ${y} ${z}`)
          dimension.runCommand(`particle cata:solar_ore_emitter ${x} ${y + 2} ${z} `);
          entity.applyDamage(18, { cause: "entityAttack" })
          entity.setOnFire(5)
        }
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:emberglow_stepoff', {
    onStepOff({ block, entity, dimension }) {
      const { x, y, z } = block;
      block.setPermutation(block.permutation.withState('cata:stepon', false));
    }
  })
})

//sealed_heart
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:sealed_heart', {
    onPlayerInteract({ block, player, dimension }) {
      if (block.north(6).hasTag('occult_alter_is_powered') &&
        block.east(6).hasTag('occult_alter_is_powered') &&
        block.south(6).hasTag('occult_alter_is_powered') &&
        block.west(6).hasTag('occult_alter_is_powered') &&
        block.north(5).east(5).hasTag('occult_alter_is_powered') &&
        block.south(5).west(5).hasTag('occult_alter_is_powered') &&
        block.north(5).west(5).hasTag('occult_alter_is_powered') &&
        block.south(5).east(5).hasTag('occult_alter_is_powered')) {
        //Start Event
        const { x, y, z } = block;

        dimension.runCommand(`summon cata:occult_alter_activated ${x} ${y} ${z}`)
        dimension.runCommand(`setblock ${x} ${y} ${z} air`)
        dimension.runCommand(`setblock ${x} ${y} ${z + 6} cata:occult_alter`)
        dimension.runCommand(`setblock ${x} ${y} ${z - 6} cata:occult_alter`)
        dimension.runCommand(`setblock ${x + 6} ${y} ${z} cata:occult_alter`)
        dimension.runCommand(`setblock ${x - 6} ${y} ${z} cata:occult_alter`)
        dimension.runCommand(`setblock ${x + 5} ${y} ${z + 5} cata:occult_alter`)
        dimension.runCommand(`setblock ${x - 5} ${y} ${z + 5} cata:occult_alter`)
        dimension.runCommand(`setblock ${x + 5} ${y} ${z - 5} cata:occult_alter`)
        dimension.runCommand(`setblock ${x - 5} ${y} ${z - 5} cata:occult_alter`)
        player.runCommand(`event entity @e occult_alter_activated_despawn`)

      } else {
        //Event Fails
      }
    }
  })
})