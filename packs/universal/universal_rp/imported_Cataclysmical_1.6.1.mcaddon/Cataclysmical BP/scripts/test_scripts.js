import { system, world } from '@minecraft/server';

//full of old scripts that probly dont work at all lol



















import { world, system, TicksPerSecond } from "@minecraft/server";

//player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Ancient evil awakens...\"}]}') coming soon

const FamilyType = [
  "player",
]

system.runInterval(() => {
  let mob =
    world.getDimension('overworld').getEntities({ families: ['player'] }).concat(
      world.getDimension('nether').getEntities({ families: ['player'] }),
      world.getDimension('the_end').getEntities({ families: ['player'] })
    )

  mob.forEach(entity => {
    let family = entity.getComponent("family")
    let IsFamilyType = family.typeId.includes(FamilyType)
    if (IsFamilyType) {
      entity.runCommand("say rage is working")

    }
  })
}, 20)

//BASIC RELIC FUNCTION CODE
world.afterEvents.itemUse.subscribe((data) => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  if (selectedItem?.typeId === 'cata:RELIC_ITEM' && !player.hasTag('cata:RELIC_TAG') && !player.getItemCooldown('relic') && !player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§7Relic Added.')
    player.startItemCooldown('relic', 20)
    player.addTag('cata:RELIC_TAG')
    if (player.hasTag('relic2')) {
      player.addTag('relic3')
    } else if (player.hasTag('relic1')) {
      player.addTag('relic2')
    } else if (!player.hasTag('relic1')) {
      player.addTag('relic1')
    }

    //Run Basic Relic Add Code
    player.playSound('beacon.activate', { pitch: 3, location: player.location, volume: 0.4 })

  } else if (selectedItem?.typeId === 'cata:RELIC_ITEM' && player.hasTag('cata:RELIC_TAG') && !player.getItemCooldown('relic')) {
    player.onScreenDisplay.setActionBar('§7Relic Remove.')
    player.startItemCooldown('relic', 20)
    player.removeTag('cata:RELIC_TAG')
    if (player.hasTag('relic3')) {
      player.removeTag('relic3')
    } else if (player.hasTag('relic2')) {
      player.removeTag('relic2')
    } else if (player.hasTag('relic1')) {
      player.removeTag('relic1')
    }

    //Run Basic Relic Remove Code
    player.playSound('beacon.deactivate', { pitch: 3, location: player.location, volume: 0.4 })

  } else if (selectedItem?.typeId === 'cata:RELIC_ITEM' && player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§6Reached Limit of 3 Relics.')
    player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
  }
})
//BASIC RELIC FUNCTION CODE
//
//
//
//
//
//


//stellar_charm
world.afterEvents.itemUse.subscribe((data) => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  if (selectedItem?.typeId === 'cata:stellar_charm' && !player.hasTag('cata:stellar_charm') && !player.getItemCooldown('relic') && !player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§7Relic Added.')
    player.startItemCooldown('relic', 20)
    player.addTag('cata:stellar_charm')
    if (player.hasTag('relic2')) {
      player.addTag('relic3')
    } else if (player.hasTag('relic1')) {
      player.addTag('relic2')
    } else if (!player.hasTag('relic1')) {
      player.addTag('relic1')
    }

    //Run Basic Relic Add Code
    player.runCommand('particle cata:stellar_charm_activate ~ ~ ~ ')
    player.playSound('beacon.activate', { pitch: 3, location: player.location, volume: 0.4 })

  } else if (selectedItem?.typeId === 'cata:stellar_charm' && player.hasTag('cata:stellar_charm') && !player.getItemCooldown('relic')) {
    player.onScreenDisplay.setActionBar('§7Relic Remove.')
    player.startItemCooldown('relic', 20)
    player.removeTag('cata:stellar_charm')
    if (player.hasTag('relic3')) {
      player.removeTag('relic3')
    } else if (player.hasTag('relic2')) {
      player.removeTag('relic2')
    } else if (player.hasTag('relic1')) {
      player.removeTag('relic1')
    }

    //Run Basic Relic Remove Code
    player.runCommand('particle cata:stellar_charm_deactivate ~ ~ ~ ')
    player.playSound('beacon.deactivate', { pitch: 3, location: player.location, volume: 0.4 })


  } else if (selectedItem?.typeId === 'cata:stellar_charm' && player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§6Reached Limit of 3 Relics.')
    player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
  }
})
system.runInterval(
  () => {
    world.getAllPlayers().filter(
      (player) => {
        if (player.hasTag('cata:stellar_charm')) {
          player.runCommand('particle cata:astral_crit ~ ~ ~ ')
        }
      }
    )
  }, 60)
world.afterEvents.entityHurt.subscribe(({ damageSource: { damagingEntity: source }, hurtEntity: player }) => {
  if (!source) return;
  const { x, z } = source.getViewDirection();
  if (source.hasTag('cata:stellar_charm')) {
    const random = Math.random()
    if (random < 0.15) {
      source.addEffect("regeneration", TicksPerSecond * 10, { amplifier: 0, showParticles: false });
      source.runCommand('particle cata:stellar_charm_heart ~ ~ ~ ')
    } else if (random < 1) {
    }
  }
});
world.afterEvents.entityHurt.subscribe(event => {
  const equipmentInventory = event.hurtEntity.getComponent("equippable");
  if (event.hurtEntity?.typeId == 'minecraft:player' && event.hurtEntity.hasTag('cata:stellar_charm')) {
    event.damageSource.damagingEntity.applyDamage(3)
  }
})




//terror_ring
world.afterEvents.itemUse.subscribe((data) => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  if (selectedItem?.typeId === 'cata:terror_catalyst' && !player.hasTag('cata:terror_catalyst') && !player.getItemCooldown('relic') && !player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§7Relic Added.')
    player.startItemCooldown('relic', 20)
    player.addTag('cata:terror_catalyst')
    if (player.hasTag('relic2')) {
      player.addTag('relic3')
    } else if (player.hasTag('relic1')) {
      player.addTag('relic2')
    } else if (!player.hasTag('relic1')) {
      player.addTag('relic1')
    }

    //Run Basic Relic Add Code
    player.playSound('beacon.activate', { pitch: 3, location: player.location, volume: 0.4 })
    player.runCommand("particle cata:disruption_stage1 ~ ~1 ~")

  } else if (selectedItem?.typeId === 'cata:terror_catalyst' && player.hasTag('cata:terror_catalyst') && !player.getItemCooldown('relic')) {
    player.onScreenDisplay.setActionBar('§7Relic Remove.')
    player.startItemCooldown('relic', 20)
    player.removeTag('cata:terror_catalyst')
    if (player.hasTag('relic3')) {
      player.removeTag('relic3')
    } else if (player.hasTag('relic2')) {
      player.removeTag('relic2')
    } else if (player.hasTag('relic1')) {
      player.removeTag('relic1')
    }

    //Run Basic Relic Remove Code
    player.playSound('beacon.deactivate', { pitch: 3, location: player.location, volume: 0.4 })
    player.runCommand(`particle cata:catalyst_stabilizer ~ ~ ~`)

  } else if (selectedItem?.typeId === 'cata:terror_catalyst' && player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§6Reached Limit of 3 Relics.')
    player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
  }
})
system.runInterval(
  () => {
    world.getAllPlayers().filter(
      (player) => {
        if (player.hasTag('cata:terror_catalyst') && player.hasTag('DisruptableStage5')) {
          player.addEffect("health_boost", TicksPerSecond * 5, { amplifier: 4, showParticles: false });
        } else if (player.hasTag('cata:terror_catalyst') && player.hasTag('DisruptableStage4')) {
          player.addEffect("health_boost", TicksPerSecond * 5, { amplifier: 3, showParticles: false });
        } else if (player.hasTag('cata:terror_catalyst') && player.hasTag('DisruptableStage3')) {
          player.addEffect("health_boost", TicksPerSecond * 5, { amplifier: 2, showParticles: false });
        } else if (player.hasTag('cata:terror_catalyst') && player.hasTag('DisruptableStage2')) {
          player.addEffect("health_boost", TicksPerSecond * 5, { amplifier: 1, showParticles: false });
        } else if (player.hasTag('cata:terror_catalyst') && player.hasTag('DisruptableStage1')) {
          player.addEffect("health_boost", TicksPerSecond * 5, { amplifier: 0, showParticles: false });
        } else return
      }
    )
  }
)



//floret_ring
world.afterEvents.itemUse.subscribe((data) => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  if (selectedItem?.typeId === 'cata:floret_ring' && !player.hasTag('cata:floret_ring') && !player.getItemCooldown('relic') && !player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§7Relic Added.')
    player.startItemCooldown('relic', 20)
    player.addTag('cata:floret_ring')
    if (player.hasTag('relic2')) {
      player.addTag('relic3')
    } else if (player.hasTag('relic1')) {
      player.addTag('relic2')
    } else if (!player.hasTag('relic1')) {
      player.addTag('relic1')
    }

    //Run Basic Relic Add Code
    player.playSound('beacon.activate', { pitch: 3, location: player.location, volume: 0.4 })
    player.runCommand('particle cata:floret_relic_activate ~ ~ ~')

  } else if (selectedItem?.typeId === 'cata:floret_ring' && player.hasTag('cata:floret_ring') && !player.getItemCooldown('relic')) {
    player.onScreenDisplay.setActionBar('§7Relic Remove.')
    player.startItemCooldown('relic', 20)
    player.removeTag('cata:floret_ring')
    if (player.hasTag('relic3')) {
      player.removeTag('relic3')
    } else if (player.hasTag('relic2')) {
      player.removeTag('relic2')
    } else if (player.hasTag('relic1')) {
      player.removeTag('relic1')
    }

    //Run Basic Relic Remove Code
    player.playSound('beacon.deactivate', { pitch: 3, location: player.location, volume: 0.4 })
    player.runCommand('particle cata:floret_relic_deactivate ~ ~ ~')

  } else if (selectedItem?.typeId === 'cata:floret_ring' && player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§6Reached Limit of 3 Relics.')
    player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
  }
})
world.afterEvents.entityDie.subscribe((data) => {
  const random = Math.random()
  const player = data.damageSource.damagingEntity
  const mob = data.deadEntity
  const mobID = data.deadEntity.typeId
  if (player?.typeId === 'minecraft:player' && player?.hasTag('cata:floret_ring')) {
    if (mobID === 'minecraft:zombie' ||
      mobID === 'minecraft:bogged' ||
      mobID === 'minecraft:drowned' ||
      mobID === 'minecraft:zombie_pigman' ||
      mobID === 'minecraft:zombie_villager' ||
      mobID === 'minecraft:husk' ||
      mobID === 'minecraft:stray' ||
      mobID === 'minecraft:zombie_horse' ||
      mobID === 'minecraft:skeleton' ||
      mobID === 'minecraft:skeleton_horse' ||
      mobID === 'minecraft:verdant_skeleton' ||
      mobID === 'minecraft:zoglin' ||
      mobID === 'minecraft:phantom' ||
      mobID === 'minecraft:wither' ||
      mobID === 'minecraft:wither_skeleton') {
      mob.runCommand('summon xp_orb ~ ~0.2 ~')
      mob.runCommand('summon xp_orb ~ ~0.2 ~')
      mob.runCommand('summon xp_orb ~ ~0.2 ~')
      mob.runCommand('summon xp_orb ~ ~0.2 ~')
      mob.runCommand('particle cata:floret_ore_emitter ~ ~1.3 ~')
      if (random < 0.10) {
        mob.runCommand('summon cata:verdant_skeleton ~ ~ ~ ~ ~ become_summon')
        mob.runCommand('particle cata:floret_ore_emitter ~ ~1.3 ~')
      }

    } else return
  } else return
})



//solar_ring
world.afterEvents.itemUse.subscribe((data) => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  if (selectedItem?.typeId === 'cata:solar_ring' && !player.hasTag('cata:solar_ring') && !player.getItemCooldown('relic') && !player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§7Relic Added.')
    player.startItemCooldown('relic', 20)
    player.addTag('cata:solar_ring')
    if (player.hasTag('relic2')) {
      player.addTag('relic3')
    } else if (player.hasTag('relic1')) {
      player.addTag('relic2')
    } else if (!player.hasTag('relic1')) {
      player.addTag('relic1')
    }

    //Run Basic Relic Add Code
    player.playSound('beacon.activate', { pitch: 3, location: player.location, volume: 0.4 })

  } else if (selectedItem?.typeId === 'cata:solar_ring' && player.hasTag('cata:solar_ring') && !player.getItemCooldown('relic')) {
    player.onScreenDisplay.setActionBar('§7Relic Remove.')
    player.startItemCooldown('relic', 20)
    player.removeTag('cata:solar_ring')
    if (player.hasTag('relic3')) {
      player.removeTag('relic3')
    } else if (player.hasTag('relic2')) {
      player.removeTag('relic2')
    } else if (player.hasTag('relic1')) {
      player.removeTag('relic1')
    }

    //Run Basic Relic Remove Code
    player.playSound('beacon.deactivate', { pitch: 3, location: player.location, volume: 0.4 })

  } else if (selectedItem?.typeId === 'cata:solar_ring' && player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§6Reached Limit of 3 Relics.')
    player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
  }
})




//calamity_ring
world.afterEvents.itemUse.subscribe((data) => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  if (selectedItem?.typeId === 'cata:calamity_ring' && !player.hasTag('cata:calamity_ring') && !player.getItemCooldown('relic') && !player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§7Relic Added.')
    player.startItemCooldown('relic', 20)
    player.addTag('cata:calamity_ring')
    if (player.hasTag('relic2')) {
      player.addTag('relic3')
    } else if (player.hasTag('relic1')) {
      player.addTag('relic2')
    } else if (!player.hasTag('relic1')) {
      player.addTag('relic1')
    }

    //Run Basic Relic Add Code
    player.playSound('beacon.activate', { pitch: 3, location: player.location, volume: 0.4 })
    player.runCommand('particle cata:floret_relic_activate ~ ~ ~')

  } else if (selectedItem?.typeId === 'cata:calamity_ring' && player.hasTag('cata:calamity_ring') && !player.getItemCooldown('relic')) {
    player.onScreenDisplay.setActionBar('§7Relic Remove.')
    player.startItemCooldown('relic', 20)
    player.removeTag('cata:calamity_ring')
    if (player.hasTag('relic3')) {
      player.removeTag('relic3')
    } else if (player.hasTag('relic2')) {
      player.removeTag('relic2')
    } else if (player.hasTag('relic1')) {
      player.removeTag('relic1')
    }

    //Run Basic Relic Remove Code
    player.playSound('beacon.deactivate', { pitch: 3, location: player.location, volume: 0.4 })
    player.runCommand('particle cata:floret_relic_deactivate ~ ~ ~')

  } else if (selectedItem?.typeId === 'cata:calamity_ring' && player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§6Reached Limit of 3 Relics.')
    player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
  }
})
world.afterEvents.entityHurt.subscribe((data) => {
  const player = data.hurtEntity
  if (player.typeId === 'minecraft:player' && player.hasTag('cata:calamity_ring')) {
    player.applyDamage(9999)
  } else return
})
//const Health = player.getComponent('health')
//Health.currentValue < 10




const DisruptableBlocks = [
  "minecraft:stone",
  "cata:gneiss"
];

world.afterEvents.playerBreakBlock.subscribe((event => {
  const block = event.block;
  const blockId = block.typeId;

  if (DisruptableBlocks.includes(blockId)) {
    console.warn("TerrorSystem")
  }
}))

world.afterEvents.playerSpawn.subscribe((event => {
  event.player.runCommand('give @s minecraft:nether_star')
}))


world.afterEvents.itemUse.subscribe((data => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  const selectedItem2 = player.getComponent('equippable').getEquipment('Offhand')
  const velocity = player.getVelocity();
  if (!player.isSneaking || player.isSneaking) {
    if (selectedItem?.typeId === 'cata:stellar_wand' && !player.getItemCooldown('wand')) {
      player.startItemCooldown('wand', 20)
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.3 2.5 1")
      let launchVel = 0.7;
      const velocity = player.getViewDirection();
      let headLoc = player.getHeadLocation();
      const arrow = player.dimension.spawnEntity('cata:stellar_bolt', { x: headLoc.x + velocity.x, y: headLoc.y + velocity.y, z: headLoc.z + velocity.z });
      const projectileComp = arrow.getComponent('minecraft:projectile');
      projectileComp?.shoot({ x: velocity.x * launchVel, y: velocity.y * launchVel, z: velocity.z * launchVel });
    }
  }
}))

world.afterEvents.itemUse.subscribe((data => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  const selectedItem2 = player.getComponent('equippable').getEquipment('Offhand')
  const velocity = player.getVelocity();
  if (!player.isSneaking) {
    if (selectedItem?.typeId === 'cata:floret_wand' && !player.getItemCooldown('wand')) {
      player.startItemCooldown('wand', 20)
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.3 1.8 1")
      let launchVel = 1;
      const velocity = player.getViewDirection();
      let headLoc = player.getHeadLocation();
      const arrow = player.dimension.spawnEntity('cata:floret_bolt', { x: headLoc.x + velocity.x, y: headLoc.y + velocity.y, z: headLoc.z + velocity.z });
      const projectileComp = arrow.getComponent('minecraft:projectile');
      projectileComp?.shoot({ x: velocity.x * launchVel, y: velocity.y * launchVel, z: velocity.z * launchVel });
    }
  }
  if (player.isSneaking) {
    if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_projectile1'
      && !player.getItemCooldown('wand') && !player.getItemCooldown('tablet')) {
      player.startItemCooldown('wand', 20)
      player.startItemCooldown('tablet', 60)
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.3 1.8 1")
      let launchVel = 1;
      const velocity = player.getViewDirection();
      let headLoc = player.getHeadLocation();
      const arrow = player.dimension.spawnEntity('cata:floret_bolt_heavy', { x: headLoc.x + velocity.x, y: headLoc.y + velocity.y, z: headLoc.z + velocity.z });
      const projectileComp = arrow.getComponent('minecraft:projectile');
      projectileComp?.shoot({ x: velocity.x * launchVel, y: velocity.y * launchVel, z: velocity.z * launchVel });
    } else if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_projectile1'
      && !player.getItemCooldown('wand') && player.getItemCooldown('tablet')) {
      player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
      player.onScreenDisplay.setActionBar("Tablet on cooldown.")
    }
  }
  if (player.isSneaking) {
    if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_conjure1'
      && !player.getItemCooldown('wand') && !player.getItemCooldown('tablet')) {
      player.startItemCooldown('wand', 20)
      player.startItemCooldown('tablet', 120)
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.3 1.8 1")
      const { x: dirX, z: dirZ } = player.getViewDirection();
      const offsetDistance = 2;
      const knockbackLocation = {
        x: player.location.x + dirX * offsetDistance,
        y: player.location.y,
        z: player.location.z + dirZ * offsetDistance,
      }
      const nearbyEntities = player.dimension.getEntities({
        location: knockbackLocation,
        maxDistance: 4,
      });
      for (const entity of nearbyEntities) {
        if (entity === player) continue;
        const { x, z } = player.getViewDirection();
        if (entity.hasComponent('health')) {
          entity.addEffect("fatal_poison", TicksPerSecond * 2, { amplifier: 1, showParticles: true });
          entity.runCommand("particle cata:poison_dust ~ ~1 ~")
          entity.applyDamage(6, { cause: "entityAttack" })
        }
      }
    } else if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_conjure1'
      && player.getItemCooldown('wand') || !player.getItemCooldown('wand') && player.getItemCooldown('tablet')) {
      player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
      player.onScreenDisplay.setActionBar("Tablet on cooldown.")
    }
  }
  if (player.isSneaking) {
    if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_conjure2'
      && !player.getItemCooldown('wand') && !player.getItemCooldown('tablet')) {
      player.startItemCooldown('wand', 20)
      player.startItemCooldown('tablet', 60)
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.3 1.8 1")
      const { x: dirX, z: dirZ } = player.getViewDirection();
      const offsetDistance = 2;
      const knockbackLocation = {
        x: player.location.x + dirX * offsetDistance,
        y: player.location.y,
        z: player.location.z + dirZ * offsetDistance,
      }
      const nearbyEntities = player.dimension.getEntities({
        location: knockbackLocation,
        maxDistance: 8,
      });
      for (const entity of nearbyEntities) {
        if (entity === player) continue;
        const { x, z } = player.getViewDirection();
        if (entity.hasComponent('health')) {
          entity.runCommand("summon cata:feral_fang ~ ~ ~")
        }
      }
    } else if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_conjure2'
      && player.getItemCooldown('wand') || !player.getItemCooldown('wand') && player.getItemCooldown('tablet')) {
      player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
      player.onScreenDisplay.setActionBar("Tablet on cooldown.")
    }
  }
}))



//solar
world.afterEvents.itemUse.subscribe((data => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  const selectedItem2 = player.getComponent('equippable').getEquipment('Offhand')
  const velocity = player.getVelocity();
  if (!player.isSneaking) {
    if (selectedItem?.typeId === 'cata:solar_wand' && !player.getItemCooldown('wand')) {
      player.startItemCooldown('wand', 15)
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.5 1.5 1")
      let launchVel = 1;
      const velocity = player.getViewDirection();
      let headLoc = player.getHeadLocation();
      const arrow = player.dimension.spawnEntity('cata:solar_bolt', { x: headLoc.x + velocity.x, y: headLoc.y + velocity.y, z: headLoc.z + velocity.z });
      const projectileComp = arrow.getComponent('minecraft:projectile');
      projectileComp?.shoot({ x: velocity.x * launchVel, y: velocity.y * launchVel, z: velocity.z * launchVel });
    }
  }
  if (player.isSneaking) {
    if (selectedItem?.typeId === 'cata:solar_wand' && selectedItem2?.typeId === 'cata:solar_tablet_projectile1' && !player.getItemCooldown('wand')) {
      player.startItemCooldown('wand', 120)
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.5 1.5 1")
      let launchVel = 0.5;
      const velocity = player.getViewDirection();
      let headLoc = player.getHeadLocation();
      const arrow = player.dimension.spawnEntity('cata:solar_orb', { x: headLoc.x + velocity.x, y: headLoc.y + velocity.y, z: headLoc.z + velocity.z });
      const projectileComp = arrow.getComponent('minecraft:projectile');
      projectileComp?.shoot({ x: velocity.x * launchVel, y: velocity.y * launchVel, z: velocity.z * launchVel });
    }
  }
  if (player.isSneaking) {
    if (selectedItem?.typeId === 'cata:solar_wand' && selectedItem2?.typeId === 'cata:solar_tablet_conjure1' && !player.getItemCooldown('wand')) {
      player.startItemCooldown('wand', 40)
      player.runCommand("playsound sound.wand @a[r=10] ~ ~ ~ 0.5 1.5 1")
      player.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
      const { x: dirX, z: dirZ } = player.getViewDirection();
      const offsetDistance = 2;
      const knockbackLocation = {
        x: player.location.x + dirX * offsetDistance,
        y: player.location.y,
        z: player.location.z + dirZ * offsetDistance,
      }
      const nearbyEntities = player.dimension.getEntities({
        location: knockbackLocation,
        maxDistance: 8,
      });
      for (const entity of nearbyEntities) {
        if (entity === player) continue;

        const { x, z } = player.getViewDirection();

        if (entity.hasComponent('health')) {
          entity.setOnFire(3)
          entity.applyKnockback({ x: -player.getViewDirection().x * 0.4, z: -player.getViewDirection().z * 0.4 }, 0.5);
          entity.runCommand("playsound sound.solar_swing @a[r=10] ~ ~ ~ 0.5 1.5 1")
          entity.runCommand("particle cata:morningstar_solar_flame ~ ~1 ~")
          entity.applyDamage(7, { cause: "entityAttack" })
        }
      }
    }
  }
}))

system.runInterval(
  () => {
    world.getAllPlayers().filter(
      (player) => {
        const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
        const selectedItem2 = player.getComponent('equippable').getEquipment('Offhand')
        if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_conjure1' && player.isSneaking) {
          player.runCommand('particle cata:feral_tablet_dis4_emitter ~ ~ ~')
        }
        if (selectedItem?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata:floret_tablet_conjure2' && player.isSneaking) {
          player.runCommand('particle cata:feral_tablet_dis8_emitter ~ ~ ~')
        }
        if (selectedItem?.typeId === 'cata:solar_wand' && selectedItem2?.typeId === 'cata:solar_tablet_conjure1' && player.isSneaking) {
          player.runCommand('particle cata:solar_tablet_dis8_emitter ~ ~ ~')
        }
      }
    )
  }
)


//overloaded_solar_core
world.afterEvents.itemUse.subscribe((data) => {
  const player = data.source
  const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
  if (selectedItem?.typeId === 'cata:overloaded_solar_core' && !player.hasTag('cata:overloaded_solar_core') && !player.getItemCooldown('relic') && !player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§7Relic Added.')
    player.startItemCooldown('relic', 20)
    player.addTag('cata:overloaded_solar_core')
    if (player.hasTag('relic2')) {
      player.addTag('relic3')
    } else if (player.hasTag('relic1')) {
      player.addTag('relic2')
    } else if (!player.hasTag('relic1')) {
      player.addTag('relic1')
    }

    //Run Basic Relic Add Code
    player.runCommand("particle cata:overloaded_solar_core_activate ~ ~1 ~")

  } else if (selectedItem?.typeId === 'cata:overloaded_solar_core' && player.hasTag('cata:overloaded_solar_core') && !player.getItemCooldown('relic')) {
    player.onScreenDisplay.setActionBar('§7Relic Remove.')
    player.startItemCooldown('relic', 20)
    player.removeTag('cata:overloaded_solar_core')
    if (player.hasTag('relic3')) {
      player.removeTag('relic3')
    } else if (player.hasTag('relic2')) {
      player.removeTag('relic2')
    } else if (player.hasTag('relic1')) {
      player.removeTag('relic1')
    }
    //Run Basic Relic Remove Code
    player.runCommand(`particle cata:overloaded_solar_core_deactivate ~ ~ ~`)

  } else if (selectedItem?.typeId === 'cata:overloaded_solar_core' && player.hasTag('relic3')) {
    player.onScreenDisplay.setActionBar('§6Reached Limit of 3 Relics.')
    player.runCommand("playsound note.bass @s ~ ~ ~ 0.3 1.3 1")
  }
})
system.runInterval(
  () => {
    world.getAllPlayers().filter(
      (player) => {
        const Health = player.getComponent('health')
        if (Health.currentValue < 10 && player.hasTag('cata:overloaded_solar_core') && !player.hasTag('cata:overloaded_solar_core_cooldown')) {
          player.addTag('cata:overloaded_solar_core_cooldown')
          const nearbyEntities = player.dimension.getEntities({
            location: player.location,
            maxDistance: 8,
            excludeFamilies: ["player"]
          });
          for (const entity of nearbyEntities) {
            if (entity.hasComponent("health")) {
              entity.applyDamage(12, { cause: "entityAttack" })
              player.runCommand('particle cata:solar_ore_explosion ~ ~ ~')
              entity.applyKnockback({ x: -player.getViewDirection().x * -2, z: -player.getViewDirection().z * -2 }, 0.3);
            }
          }
        }
      }
    )
  }
)
system.runInterval(
  () => {
    world.getAllPlayers().filter(
      (player) => {
        if (player.hasTag('cata:overloaded_solar_core_cooldown')) {
          player.removeTag('cata:overloaded_solar_core_cooldown')
        }
      }
    )
  }, 300)











world.afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity: player }, deadEntity: source }) => {
  if (!source) return;
  const random = Math.random()

  if (player?.typeId === 'minecraft:player' &&
    source?.typeId === 'cata:feralbloom' ||
    source?.typeId === 'cata:solarium' ||
    source?.typeId === 'cata:solar_tesla' ||
    source?.typeId === 'cata:gneiss_golem' ||
    source?.typeId === 'cata:verdant_sentinel' ||
    source?.typeId === 'cata:stone_golem' ||
    source?.typeId === 'cata:verdant_skeleton') { //  target_dummy:target_dummy_entity (for testing)

    if (random < 0.02) {

      if (!player?.hasTag('DisruptableStage1')) {
        player.runCommand('tag @s add DisruptableStage1')
        player.runCommand(`particle cata:disruption_stage1 ~ ~ ~`)
      } else if (!player.hasTag('DisruptableStage2')) {
        player.runCommand('tag @s add DisruptableStage2')
        player.runCommand(`particle cata:disruption_stage2 ~ ~ ~`)
        player.addEffect("darkness", TicksPerSecond * 6, { amplifier: 0, showParticles: false });
        player.runCommand("playsound sound.disruption_ambient @a[r=32] ~ ~ ~ 0.8 1 1")

      } else if (!player?.hasTag('DisruptableStage3')) {
        player.runCommand('tag @s add DisruptableStage3')
        player.runCommand(`particle cata:disruption_stage3 ~ ~ ~`)
        player.addEffect("darkness", TicksPerSecond * 6, { amplifier: 0, showParticles: false });
        player.addEffect("wither", TicksPerSecond * 5, { amplifier: 1, showParticles: false });
        player.runCommand("playsound sound.disruption_ambient @a[r=32] ~ ~ ~ 0.8 1 1")

      } else if (!player?.hasTag('DisruptableStage4')) {
        player.runCommand('tag @s add DisruptableStage4')
        player.runCommand(`particle cata:disruption_stage4 ~ ~ ~`)
        player.addEffect("darkness", TicksPerSecond * 6, { amplifier: 0, showParticles: false });
        player.addEffect("wither", TicksPerSecond * 5, { amplifier: 2, showParticles: false });
        player.runCommand("playsound sound.disruption_ambient @a[r=32] ~ ~ ~ 0.8 1 1")


      } else if (!player?.hasTag('DisruptableStage5')) {
        player.runCommand('tag @s add DisruptableStage5')
        player.runCommand(`particle cata:disruption_stage5 ~ ~ ~`)
        player.addEffect("darkness", TicksPerSecond * 6, { amplifier: 0, showParticles: false });
        player.runCommand("playsound sound.disruption_ambient @a[r=32] ~ ~ ~ 0.8 1 1")
        if (random < 0.50) {
          player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Cosmic Terrors are watching...\"}]}')
        } else if (random < 0.50) {
          player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Cosmic Terrors are listening...\"}]}')
        } else if (random < 0.50) {
          player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Cosmic Terrors are awakening...\"}]}')
        } else if (random < 0.50) {
          player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Cosmic Terrors are waiting...\"}]}')
        } else if (random < 1) { return }

      } else if (player?.hasTag('DisruptableStage5')) {
        player.runCommand('tag @s remove DisruptableStage1')
        player.runCommand('tag @s remove DisruptableStage2')
        player.runCommand('tag @s remove DisruptableStage3')
        player.runCommand('tag @s remove DisruptableStage4')
        player.runCommand('tag @s remove DisruptableStage5')
        player.runCommand(`particle cata:disruption_stage5 ~ ~ ~`)
        source.runCommand(`summon cata:cosmic_terror ~ ~ ~`)
      }
    } else if (random < 1) {
      return
    } else { return }
  } else { return }
})
system.runInterval(
  () => {
    world.getAllPlayers().filter(
      (player) => {
        if (player.hasTag('novelty:cata:stellar_charm')) {
          player.runCommand("say working")
        }
      }
    )
  }, 5)

