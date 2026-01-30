import { world, ItemStack, system } from '@minecraft/server';


//place and destroy
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_monolith_place', {
    onPlace({ player, block, dimension }) {
      const { x, y, z } = block;

      if (block.above().isAir) {
        dimension.runCommand(`setblock ${x} ${y + 1} ${z} cata:solar_monolith_top`)
      } else {
        dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`)
      }
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_monolith_top_destroy', {
    onPlayerBreak({ block, dimension, player }) {
      const { x, y, z } = block;
      dimension.runCommand(`setblock ${x} ${y - 1} ${z} air destroy`)
    }
  })
})
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_monolith_bottom_destroy', {
    onPlayerBreak({ block, dimension, player }) {
      const { x, y, z } = block;
      dimension.runCommand(`setblock ${x} ${y + 1} ${z} air destroy`)
    }
  })
})

//Activate
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_monolith_activate', {
    onPlayerInteract({ block, player, dimension }) {
      const { x, y, z } = block;
      const equipment = player.getComponent('equippable'); {
        const selectedItem = equipment.getEquipment('Mainhand');
        if (selectedItem?.typeId == 'cata:solar_element') {

          block.setPermutation(block.permutation.withState('cata:solar_monolith_activate', true));

          dimension.runCommand(`setblock ${x} ${y + 1} ${z} cata:solar_monolith_top ["cata:solar_monolith_activate" = true ] replace`)
          dimension.runCommand(`summon cata:solar_monolith_dummy ${x} ${y} ${z}`)

          player.playSound('respawn_anchor.charge', { pitch: 0.7, location: player.location, volume: 0.5 })

          player.runCommand(`clear @s cata:solar_element 0 1`)
        }
      }
    }
  })
})

//Deactivate
system.beforeEvents.startup.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('component:solar_monolith_tick', {
    onTick({ player, block, dimension }) {
      const { x, y, z } = block;
      dimension.runCommand(`setblock ${x} ${y + 1} ${z} cata:solar_monolith_top`)
      dimension.runCommand(`setblock ${x} ${y} ${z} cata:solar_monolith_bottom`)
    }
  })
})