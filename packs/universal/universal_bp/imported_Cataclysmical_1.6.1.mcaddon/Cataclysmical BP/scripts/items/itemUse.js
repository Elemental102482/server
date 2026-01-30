import { world, system, ItemStack, Player } from '@minecraft/server'
import { TicksPerSecond } from "@minecraft/server";

//phoenix_blade
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:phoenix_blade' && !player.getItemCooldown('phoenix_blade') && player.isSneaking) {
        player.startItemCooldown('phoenix_blade', 200)
        player.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        player.runCommand("summon cata:player_phantom_phoenix_blade ^^1^ facing ^^^90 move2")
        player.runCommand("summon cata:player_phantom_phoenix_blade ^^1^ facing ^^^-90 move2")
        player.runCommand("summon cata:player_phantom_phoenix_blade ^^1^ facing ^-90^^ move2")
        player.runCommand("summon cata:player_phantom_phoenix_blade ^^1^ facing ^90^^ move2")
    }
})


//sunlight and moonlight
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:sunlight' && !player.getItemCooldown('sunmoonlight')) {
        player.startItemCooldown('sunmoonlight', 20)
        player.runCommand("playsound sound.sunandmoonlight_change @a[r=14] ~ ~ ~ 1 1 1")
        player.runCommand("particle cata:moonlight_change ~ ~ ~")
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:moonlight', 1));
    }
})
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:moonlight' && !player.getItemCooldown('sunmoonlight') && !player.isSneaking) {
        player.startItemCooldown('sunmoonlight', 20)
        player.runCommand("playsound sound.sunandmoonlight_change @a[r=14] ~ ~ ~ 1 1 1")
        player.runCommand("particle cata:sunlight_change ~ ~ ~")
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('cata:sunlight', 1));
    } else if (selectedItem?.typeId === 'cata:moonlight' && !player.getItemCooldown('sunmoonlight') && player.isSneaking) {
        player.runCommand("summon cata:phantom_moonlight ~ ~1 ~")
        player.runCommand("particle cata:moonlight_second_attack ~ ~1 ~")
        player?.startItemCooldown('sunmoonlight', 120)
    }
})


//blazing_excalibur
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:blazing_excalibur' && !player.getItemCooldown('blazing_excalibur')) {
        player.startItemCooldown('blazing_excalibur', 500)
        player.startItemCooldown('blazing_excalibur_test', 60)
        player.runCommand("playsound sound.blazing_excalibur @a[r=14] ~ ~ ~ 3 1 1")
        player.runCommand("particle cata:sun_orb_explode ~ ~1 ~")
        player.runCommand("particle cata:blazing_excalibur_impact_emitter ~ ~ ~")
    }
})
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player.getItemCooldown('blazing_excalibur_test')) {
                    player.setOnFire(2)
                    player.removeEffect("fire_resistance")
                }
            }
        )
    }
)

//divine_scythe_of_heaven
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:divine_scythe_of_heaven' && !player.getItemCooldown('divine_scythe_of_heaven')) {
        player.startItemCooldown('divine_scythe_of_heaven', 400)
        player.runCommand("particle cata:sun_orb_explode ~ ~1 ~")
        player.runCommand("summon cata:sun_totem ^^1^2 facing ^^^-90")
    }
})

//bottles
world.afterEvents.itemCompleteUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:stellar_bottle') {
        player.addEffect("health_boost", TicksPerSecond * 180, { amplifier: 0, showParticles: true });
        player.addEffect("regeneration", TicksPerSecond * 120, { amplifier: 1, showParticles: true });
        player.runCommand("particle cata:astral_crit ~ ~ ~")
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:glass_bottle', 1));

    }
})
world.afterEvents.itemCompleteUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:solar_bottle') {
        player.addEffect("fire_resistance", TicksPerSecond * 600, { amplifier: 0, showParticles: true });
        player.addEffect("haste", TicksPerSecond * 120, { amplifier: 2, showParticles: true });
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:glass_bottle', 1));
    }
})


world.afterEvents.itemCompleteUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:floret_bottle') {
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:glass_bottle', 1));
        player.removeEffect("slowness")
        player.removeEffect("mining_fatigue")
        player.removeEffect("instant_damage")
        player.removeEffect("nausea")
        player.removeEffect("blindness")
        player.removeEffect("hunger")
        player.removeEffect("weakness")
        player.removeEffect("poison")
        player.removeEffect("wither")
        player.removeEffect("bad_omen")
        player.removeEffect("darkness")
        player.removeEffect("infested")
        player.removeEffect("oozing")
        player.removeEffect("weaving")
        player.removeEffect("raid_omen")
        player.removeEffect("trial_omen")
    }
})
world.afterEvents.itemCompleteUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:phantasma_bottle') {
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:glass_bottle', 1));
        if (player.hasTag('HasTerrorStage5')) {
            player.addEffect("health_boost", TicksPerSecond * 120, { amplifier: 4, showParticles: true });
            player.addEffect("regeneration", TicksPerSecond * 120, { amplifier: 1, showParticles: true });
        } else if (player.hasTag('HasTerrorStage4')) {
            player.addEffect("health_boost", TicksPerSecond * 100, { amplifier: 3, showParticles: true });
            player.addEffect("regeneration", TicksPerSecond * 100, { amplifier: 1, showParticles: true });
        } else if (player.hasTag('HasTerrorStage3')) {
            player.addEffect("health_boost", TicksPerSecond * 80, { amplifier: 2, showParticles: true });
            player.addEffect("regeneration", TicksPerSecond * 80, { amplifier: 1, showParticles: true });
        } else if (player.hasTag('HasTerrorStage2')) {
            player.addEffect("health_boost", TicksPerSecond * 60, { amplifier: 1, showParticles: true });
            player.addEffect("regeneration", TicksPerSecond * 60, { amplifier: 1, showParticles: true });
        } else if (player.hasTag('HasTerrorStage1')) {
            player.addEffect("health_boost", TicksPerSecond * 40, { amplifier: 0, showParticles: true });
            player.addEffect("regeneration", TicksPerSecond * 40, { amplifier: 0, showParticles: true });
        } else {
            player.addEffect("health_boost", TicksPerSecond * 20, { amplifier: 0, showParticles: true });
            player.addEffect("regeneration", TicksPerSecond * 20, { amplifier: 0, showParticles: true });
        }
    }
})
world.afterEvents.itemCompleteUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:terror_bottle') {
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:glass_bottle', 1));
        player.addEffect("wither", TicksPerSecond * 10, { amplifier: 2, showParticles: true });
        if (!player?.hasTag('HasTerrorStage1')) {
            player.addTag("HasTerrorStage1")

        } else if (!player.hasTag('HasTerrorStage2')) {
            player.addTag("HasTerrorStage2")

        } else if (!player?.hasTag('HasTerrorStage3')) {
            player.addTag("HasTerrorStage3")

        } else if (!player?.hasTag('HasTerrorStage4')) {
            player.addTag("HasTerrorStage4")

        } else if (!player?.hasTag('HasTerrorStage5')) {
            player.addTag("HasTerrorStage5")
            player.onScreenDisplay.setActionBar('§aTerror Stage Limit')
        }
    }
})
world.afterEvents.itemCompleteUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:lunar_bottle') {
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:glass_bottle', 1));
        const nearbyEntities = player.dimension.getEntities({
            location: player.location,
            maxDistance: 10,
            excludeFamilies: ["player"]
        });
        for (const entity of nearbyEntities) {
            if (entity.hasComponent("health")) {
                entity.applyKnockback({ x: -entity.getViewDirection().x * 10, z: -entity.getViewDirection().z * 10 }, 0.5);
                player.runCommand("playsound breeze_wind_charge.burst @a[r=10] ~ ~ ~ 1 1.3 1")
            }
        }
    }
})



//terrorite_rock
world.beforeEvents.itemUse.subscribe(({ source, itemStack }) => {
    if (source.typeId !== 'minecraft:player') return;


    const head = source.getHeadLocation();
    const view = source.getViewDirection();

    if (itemStack?.typeId === 'cata:terrorite_rock') {
        system.run(() => {
            const entity = source.dimension.spawnEntity('cata:terrorite_rock', { x: head.x, y: head.y + 0.1, z: head.z });
            const projectile = entity.getComponent('projectile');

            projectile.owner = source;
            projectile.shoot({ x: view.x * 0.7, y: view.y * 0.7, z: view.z * 0.7 });
            source.runCommand('playanimation @s animation.cataclysmplayer.wand_use')
            if (source.getGameMode() !== "creative") {
                source.runCommand(`clear @s cata:terrorite_rock 0 1`)
            }
        });
    }
});


//terror_detector
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:terror_detector' && !player.getItemCooldown('terror_detector')) {
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
})



//ray_gun
world.beforeEvents.itemUse.subscribe(({ source, itemStack }) => {
    const player = source
    const random = Math.random()

    if (source.typeId !== 'minecraft:player') return;

    const head = source.getHeadLocation();
    const view = source.getViewDirection();

    if (itemStack?.typeId === 'cata:ray_gun' && !player.getItemCooldown('ray_gun')) {
        if (random < 0.03) {
            system.run(() => {
                player.runCommand("particle cata:ray_gun_overload ~ ~ ~")
                player.runCommand("particle cata:small_impact ~ ~1.5 ~")
                player.runCommand('tag @s add ray_gun_overload')
                player.runCommand("particle cata:massive_impact ~ ~0.5 ~")
                player.runCommand("playsound sound.ray_gun_overload @a[r=10] ~ ~ ~ 1 1 1")
                player.startItemCooldown('ray_gun', 100)
                player.setOnFire(4)
            })
        } else if (random < 1) {
            system.run(() => {
                const entity = source.dimension.spawnEntity('cata:solar_laser', { x: head.x, y: head.y + 0.1, z: head.z });
                const projectile = entity.getComponent('projectile');

                projectile.owner = source;
                projectile.shoot({ x: view.x * 4, y: view.y * 3, z: view.z * 4 });
                player.runCommand("playsound sound.laser_shoot @a[r=10] ~ ~ ~ 0.5 1 1")
            });
        }
    }
});
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
                if (selectedItem?.typeId === 'cata:ray_gun' && player.getItemCooldown('ray_gun') &&
                    player.hasTag('ray_gun_overload')) {
                    const random = Math.random()
                    if (random < 0.05) {
                        player.setOnFire(1)
                        player.runCommand('particle cata:ray_gun_overload_emitter ~ ~ ~')
                    } else if (random < 1) {
                        player.runCommand('particle cata:ray_gun_overload_emitter ~ ~ ~')
                    }
                }
            }
        )
    }, 10)
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
                if (!player.getItemCooldown('ray_gun')) {
                    player.runCommand('tag @s remove ray_gun_overload')
                }
            }
        )
    }, 10)



//spore_thrower
world.beforeEvents.itemUse.subscribe(({ source, itemStack }) => {
    if (source.typeId !== 'minecraft:player') return;

    const head = source.getHeadLocation();
    const view = source.getViewDirection();

    if (itemStack?.typeId === 'cata:spore_thrower' && !source.getItemCooldown('spore_thrower')) {
        system.run(() => {
            const entity = source.dimension.spawnEntity('cata:spore_thrower', { x: head.x, y: head.y + 0.1, z: head.z });
            const projectile = entity.getComponent('projectile');

            projectile.owner = source;
            projectile.shoot({ x: view.x * 1, y: view.y * 1, z: view.z * 1 });

            source.startItemCooldown('spore_thrower', 10)
            source.runCommand('playsound sound.feral_gas @s ~ ~ ~ 0.4 1.5 1')
        });
    }
});

//terror_skull_launcher
world.beforeEvents.itemUse.subscribe(({ source, itemStack }) => {
    if (source.typeId !== 'minecraft:player') return;

    const head = source.getHeadLocation();
    const view = source.getViewDirection();

    if (itemStack?.typeId === 'cata:terror_skull_launcher' && !source.getItemCooldown('terror_skull_launcher')) {
        system.run(() => {
            const entity = source.dimension.spawnEntity('cata:terror_skull_launcher', { x: head.x, y: head.y + 0.1, z: head.z });
            const projectile = entity.getComponent('projectile');

            projectile.owner = source;
            projectile.shoot({ x: view.x * 1, y: view.y * 1, z: view.z * 1 });

            source.startItemCooldown('terror_skull_launcher', 40)
            source.runCommand("playsound mob.spirit_scream @a[r=32] ~ ~ ~ 0.5 0.8 1")
        });
    }
});

//recall_mirror
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')

    if (selectedItem?.typeId === 'cata:recall_mirror' && !player.getItemCooldown('recall_mirror')) {
        let SpawnPoint = player.getSpawnPoint()
        if (SpawnPoint) {
            player.teleport({ x: SpawnPoint.x, y: SpawnPoint.y, z: SpawnPoint.z }, { dimension: SpawnPoint.dimension, checkForBlocks: true });
            player.startItemCooldown('recall_mirror', 300)

            const playerEquippableComp = player.getComponent("equippable");

            let inventory = player.getComponent("inventory").container;
            const item = inventory.getItem(player.selectedSlotIndex);

            const itemDurability = item.getComponent("durability");

            const currentDamage = itemDurability.damage
            const maxDurability = itemDurability.maxDurability
            if (currentDamage >= maxDurability) {
                system.run(() => {
                    player.playSound('random.break', { pitch: 1.3, location: player.location, volume: 1 })
                    playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
                });
            } else {
                itemDurability.damage += 1;
                inventory.setItem(player.selectedSlotIndex, item);
            }

            system.waitTicks(5).then(() => {
                player.runCommand("playsound mob.endermen.portal @s ~ ~ ~ 1 0.9 1")
            })
        }
    }
})
world.afterEvents.entityHurt.subscribe(data => {
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity
    if (player.typeId === 'player') {
        player?.startItemCooldown('recall_mirror', 300)
    }
})

//cosmic_fragment
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:cosmic_fragment' && player?.hasTag('HasTerrorStage5')) {
        playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
        player.removeTag("HasTerrorStage1")
        player.removeTag("HasTerrorStage2")
        player.removeTag("HasTerrorStage3")
        player.removeTag("HasTerrorStage4")
        player.removeTag("HasTerrorStage5")
        player.runCommand(`summon cata:cosmic_terror ~ ~ ~`)
    } else if (selectedItem?.typeId === 'cata:cosmic_fragment' && !player?.hasTag('HasTerrorStage5')) {
        player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§cRequires Terror stage 5 to activate...\"}]}')
    }
})

world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    const playerEquippableComp = player.getComponent("equippable");
    const selectedItem = player.getComponent('equippable').getEquipment('Mainhand')
    if (selectedItem?.typeId === 'cata:nebulous_greatsword' && player?.hasTag('HasNebulousMeter5')) {
        player.removeTag("HasNebulousMeter1")
        player.removeTag("HasNebulousMeter2")
        player.removeTag("HasNebulousMeter3")
        player.removeTag("HasNebulousMeter4")
        player.removeTag("HasNebulousMeter5")
        player.runCommand("playsound sound.nebulous_greatsword_song @a[r=32] ~ ~ ~ 1 1 1")
        player.startItemCooldown('nebulous_meter_test', 200)
        player.startItemCooldown('nebulous_greatsword', 800)
        player.runCommand("/camerashake add @p 0.3 1 positional")
        player.runCommand("/camerashake add @p 0.3 1 rotational")
        player.runCommand("particle cata:nebulous_greatsword_power ~ ~ ~")
        player.runCommand("playsound sound.blazing_excalibur @a[r=32] ~ ~ ~ 3 0.8 1")
    } else if (selectedItem?.typeId === 'cata:nebulous_greatsword' && !player?.hasTag('HasNebulousMeter5')) {
        player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§cRequires Full Bar\"}]}')
    }
})
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player.getItemCooldown('nebulous_meter_test')) {
                    player.runCommand("particle cata:nebulous_greatsword_activate ~ ~ ~")
                    player.runCommand("particle cata:nebulous_greatsword_activate1 ~ ~ ~")
                    player.addEffect("regeneration", TicksPerSecond * 4, { amplifier: 1, showParticles: false });
                }
            }
        )
    }
)
