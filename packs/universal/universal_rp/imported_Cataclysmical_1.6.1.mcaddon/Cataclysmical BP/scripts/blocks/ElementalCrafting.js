import { world, ItemStack, system, } from '@minecraft/server';

//elemental_alter
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:elemental_alter_particle', {
    onTick({ player, block, dimension }) {
      const { x, y, z } = block;
      if (block.north(2).east(2).typeId === ("cata:alter_pedestal")
        && block.north(2).west(2).typeId === ("cata:alter_pedestal")
        && block.south(2).west(2).typeId === ("cata:alter_pedestal")
        && block.south(2).east(2).typeId === ("cata:alter_pedestal")) {
        dimension.runCommand(`particle cata:elemental_alter_emitter ${x} ${y} ${z} `)
      }
    }
  })
})

system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:elemental_alter_empty', {
    onPlayerInteract({ block, dimension, player }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'minecraft:experience_bottle') {
          block.setPermutation(block.permutation.withState('cata:powered', true));
          player.playSound('beacon.activate', { pitch: 2, location: player.location, volume: 0.4 })
          dimension.runCommand(`particle cata:elemental_alter_emitter ${x} ${y} ${z} `)
          player.runCommand(`clear @s minecraft:experience_bottle 0 1`)
        }
      }
    }
  })
})

system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:elemental_alter_powered', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const playerEquippableComp = player.getComponent("equippable");
      const equipment = player.getComponent('equippable'); {

        const random = Math.random()
        const selectedItem = equipment.getEquipment('Mainhand');

        //master_verdant_key
        if (selectedItem?.typeId == 'cata:verdant_key'
          && block.north(2).east(2).hasTag('alter_pedestal_floret')
          && block.north(2).west(2).hasTag('alter_pedestal_floret')
          && block.south(2).west(2).hasTag('alter_pedestal_floret')
          && block.south(2).east(2).hasTag('alter_pedestal_floret')
          && block.north(2).typeId === ('cata:floret_block')
          && block.east(2).typeId === ('cata:floret_block')
          && block.south(2).typeId === ('cata:floret_block')
          && block.west(2).typeId === ('cata:floret_block')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x} ${y} ${z - 2} air destroy`)
          dimension.runCommand(`setblock ${x} ${y} ${z + 2} air destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z} air destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z} air destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          player.runCommand(`give @s cata:master_verdant_key 1`)
          player.runCommand(`clear @s cata:verdant_key 0 1`)
        }
        //Floret Hatchet
        if (selectedItem?.typeId == 'cata:verdant_hatchet'
          && block.north(2).east(2).hasTag('alter_pedestal_floret')
          && block.north(2).west(2).hasTag('alter_pedestal_floret')
          && block.south(2).west(2).hasTag('alter_pedestal_floret')
          && block.south(2).east(2).hasTag('alter_pedestal_floret')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:floret_hatchet', 1));
        }
        //floret_ring
        if (selectedItem?.typeId == 'cata:empty_ring'
          && block.north(2).east(2).hasTag('alter_pedestal_floret')
          && block.north(2).west(2).hasTag('alter_pedestal_floret')
          && block.south(2).west(2).hasTag('alter_pedestal_floret')
          && block.south(2).east(2).hasTag('alter_pedestal_floret')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:floret_ring', 1));
        }
        //Morningstar
        if (selectedItem?.typeId == 'minecraft:netherite_sword'
          && block.north(2).east(2).hasTag('alter_pedestal_solar')
          && block.north(2).west(2).hasTag('alter_pedestal_solar')
          && block.south(2).west(2).hasTag('alter_pedestal_solar')
          && block.south(2).east(2).hasTag('alter_pedestal_solar')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:morningstar', 1));
        }
        //solar_ring
        if (selectedItem?.typeId == 'cata:empty_ring'
          && block.north(2).east(2).hasTag('alter_pedestal_solar')
          && block.north(2).west(2).hasTag('alter_pedestal_solar')
          && block.south(2).west(2).hasTag('alter_pedestal_solar')
          && block.south(2).east(2).hasTag('alter_pedestal_solar')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:solar_ring', 1));
        }
        //stellar_ring
        if (selectedItem?.typeId == 'cata:empty_ring'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:stellar_ring', 1));
        }
        //calibrated_stellar_core
        if (selectedItem?.typeId == 'cata:solar_core'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          player.runCommand(`give @s cata:calibrated_stellar_core 1`)
          player.runCommand(`clear @s cata:solar_core 0 1`)
        }
        //Stellar Dust
        if (selectedItem?.typeId == 'minecraft:glowstone_dust'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          dimension.runCommand(`summon xp_orb ${x} ${y + 0.5} ${z}`)
          player.runCommand(`give @s cata:stellar_dust 1`)
          player.runCommand(`clear @s minecraft:glowstone_dust 0 1`)
        }
        //Stellar Charm
        if (selectedItem?.typeId == 'cata:charm'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:stellar_charm', 1));
        }
        //stellar_greatsword
        if (selectedItem?.typeId == 'minecraft:iron_sword'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:stellar_greatsword', 1));
        }
        //Stellar Armor
        if (selectedItem?.typeId == 'minecraft:iron_helmet'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:stellar_helmet', 1));
        }
        if (selectedItem?.typeId == 'minecraft:iron_chestplate'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:stellar_chestplate', 1));
        }
        if (selectedItem?.typeId == 'minecraft:iron_leggings'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:stellar_leggings', 1));
        }
        if (selectedItem?.typeId == 'minecraft:iron_boots'
          && block.north(2).east(2).hasTag('alter_pedestal_astral')
          && block.north(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).west(2).hasTag('alter_pedestal_astral')
          && block.south(2).east(2).hasTag('alter_pedestal_astral')) {
          player.playSound('random.anvil_land', { pitch: 1.3, location: player.location, volume: 0.6 })
          dimension.runCommand(`setblock ${x - 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x + 2} ${y} ${z - 2} cata:alter_pedestal destroy`)
          dimension.runCommand(`setblock ${x - 2} ${y} ${z + 2} cata:alter_pedestal destroy`)
          block.setPermutation(block.permutation.withState('cata:powered', false));
          playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:stellar_boots', 1));
        }
      }
    }
  })
})

//alter_pedestal
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_astral', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:astral_alloy') {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_astral', true));
          player.playSound('respawn_anchor.charge', { pitch: 1.5, location: player.location, volume: 0.2 })
          player.runCommand(`clear @s cata:astral_alloy 0 1`)
        }
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_astral_remove', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (player.isSneaking) {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_astral', false));
          dimension.runCommand(`loot spawn ${x} ${y + 1} ${z} loot "alter/astral_alloy"`)
        }
      }
    }
  })
})

system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_floret', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:floret_element') {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_floret', true));
          player.playSound('respawn_anchor.charge', { pitch: 1.5, location: player.location, volume: 0.2 })
          player.runCommand(`clear @s cata:floret_element 0 1`)
        }
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_floret_remove', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (player.isSneaking) {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_floret', false));
          dimension.runCommand(`loot spawn ${x} ${y + 1} ${z} loot "alter/floret_element"`)
        }
      }
    }
  })
})

system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_solar', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:solar_element') {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_solar', true));
          player.playSound('respawn_anchor.charge', { pitch: 1.5, location: player.location, volume: 0.2 })
          player.runCommand(`clear @s cata:solar_element 0 1`)
        }
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_solar_remove', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (player.isSneaking) {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_solar', false));
          dimension.runCommand(`loot spawn ${x} ${y + 1} ${z} loot "alter/solar_element"`)
        }
      }
    }
  })
})

system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_lunar', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:lunar_element') {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_lunar', true));
          player.playSound('respawn_anchor.charge', { pitch: 1.5, location: player.location, volume: 0.2 })
          player.runCommand(`clear @s cata:lunar_element 0 1`)
        }
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:alter_pedestal_lunar_remove', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (player.isSneaking) {
          block.setPermutation(block.permutation.withState('cata:alter_pedestal_lunar', false));
          dimension.runCommand(`loot spawn ${x} ${y + 1} ${z} loot "alter/lunar_element"`)
        }
      }
    }
  })
})
