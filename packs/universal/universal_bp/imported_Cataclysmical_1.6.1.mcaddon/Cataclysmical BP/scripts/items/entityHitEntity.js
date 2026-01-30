import { world, TicksPerSecond, system } from '@minecraft/server'


world.afterEvents.entityHitEntity.subscribe(data => {

    const mobEvent = data.hitEntity
    const playerEvent = data.damagingEntity

    let invi = playerEvent.getComponent("inventory")?.container
    let items = invi?.getItem(data?.damagingEntity?.selectedSlotIndex)

    const velocity = playerEvent.getVelocity();
    const random = Math.random()

    //nebulous_greatsword
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:nebulous_greatsword') {
        if (playerEvent.getItemCooldown('nebulous_meter_test')) {
            mobEvent.runCommand("playsound sound.sword_impact @a[r=32] ~ ~ ~ 0.9 1 1")
            mobEvent.runCommand("playsound sound.sunandmoonlight_change @a[r=14] ~ ~ ~ 0.8 1.3 1")
            mobEvent.runCommand("particle cata:nebulous_greatsword_impact ~ ~ ~")
            mobEvent.runCommand("particle cata:nebulous_greatsword_impact ~ ~ ~")
            playerEvent.runCommand("/camerashake add @p 0.1 0.3 positional")
            mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.5);
            mobEvent.applyDamage(35, { cause: "entityAttack" })
            const nearbyEntities = playerEvent.dimension.getEntities({
                location: playerEvent.location,
                maxDistance: 4,
                excludeFamilies: ["player"]
            });
            for (const entity of nearbyEntities) {
                if (entity.hasComponent("health")) {
                    entity.applyDamage(25, { cause: "entityAttack" })
                    entity.runCommand("particle cata:nebulous_greatsword_impact ~ ~ ~")
                    entity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.5);
                }
            }
        } else {
            mobEvent.runCommand("particle cata:nebulous_greatsword_impact ~ ~ ~")
            mobEvent.runCommand("playsound sound.powerful_sword_swing @a[r=32] ~ ~ ~ 0.9 1 1")
            mobEvent.runCommand("playsound sound.sword_impact @a[r=32] ~ ~ ~ 0.9 1 1")
        }
    }

    //anchor
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:anchor') {
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * 1.5, z: -playerEvent.getViewDirection().z * 1.5 }, 0.5);
    }

    //bonebreaker
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:bonebreaker') {
        if (!playerEvent.getItemCooldown('bonebreaker')) {
            system.waitTicks(1).then(() => {
                mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.2, z: -playerEvent.getViewDirection().z * 0.2 }, 0.5);
                mobEvent.runCommand("particle cata:bonebreaker ~ ~ ~")
                mobEvent.runCommand("playsound entity.wither_skeleton.hurt @a[r=32] ~ ~ ~ 1 1.2 1")
                mobEvent.addEffect("weakness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                mobEvent.addEffect("slowness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
            })
        }
    }

    //phoenix_blade
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:phoenix_blade') {
        if (!playerEvent.getItemCooldown('phoenix_blade')) {
            playerEvent.runCommand("/summon cata:player_phantom_phoenix_blade ^^2^ facing ^^^90 move1")
            playerEvent.startItemCooldown('phoenix_blade', 40)
        }
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -1.5, z: -playerEvent.getViewDirection().z * -1.5 }, 0.3);
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        playerEvent.runCommand("playsound sound.electric_blade @a[r=15] ~ ~ ~ 0.4 1 1")
        mobEvent.setOnFire(4)
    }

    //verdant_greatsword
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:verdant_greatsword') {
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.9, z: -playerEvent.getViewDirection().z * -0.9 }, 0.3);
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (random < 0.5 && !playerEvent.getItemCooldown('verdant_greatsword')) {
            mobEvent.runCommand('summon cata:verdant_sentinel_arm_summon ~ ~ ~ ~ ~90')
            playerEvent.startItemCooldown('verdant_greatsword', 60)
        } else if (random < 0.5 && !playerEvent.getItemCooldown('verdant_greatsword')) {
            mobEvent.runCommand('summon cata:verdant_sentinel_arm_summon ~ ~ ~ ~ ~-90')
            playerEvent.startItemCooldown('verdant_greatsword', 60)
        } else if (random < 0.5 && !playerEvent.getItemCooldown('verdant_greatsword')) {
            mobEvent.runCommand('summon cata:verdant_sentinel_arm_summon ~ ~ ~ ~ ~180')
            playerEvent.startItemCooldown('verdant_greatsword', 60)
        } else if (random < 1 && !playerEvent.getItemCooldown('verdant_greatsword')) {
            mobEvent.runCommand('summon cata:verdant_sentinel_arm_summon ~ ~ ~ ~ ~-180')
            playerEvent.startItemCooldown('verdant_greatsword', 60)
        }
    }

    //exodius_greatsword
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:exodius_greatsword') {
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.7, z: -playerEvent.getViewDirection().z * -0.7 }, 0.3);
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")

        if (random < 0.3 && !playerEvent.getItemCooldown('exodius_greatsword')) {
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^^^90 floret")
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^90^^90 floret")
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^-90^^90 floret")
            playerEvent.runCommand("playsound sound.sunandmoonlight_change @a[r=14] ~ ~ ~ 0.7 1.5 1")
            playerEvent.startItemCooldown('exodius_greatsword', 40)

        } else if (random < 0.5 && !playerEvent.getItemCooldown('exodius_greatsword')) {
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^^^90 solar")
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^90^^90 solar")
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^-90^^90 solar")
            playerEvent.runCommand("playsound sound.sunandmoonlight_change @a[r=14] ~ ~ ~ 0.7 1.5 1")
            playerEvent.startItemCooldown('exodius_greatsword', 40)

        } else if (random < 1 && !playerEvent.getItemCooldown('exodius_greatsword')) {
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^^^90 lunar")
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^90^^90 lunar")
            playerEvent.runCommand("/summon cata:exodius_elements ^^1^ facing ^-90^^90 lunar")
            playerEvent.runCommand("playsound sound.sunandmoonlight_change @a[r=14] ~ ~ ~ 0.7 1.5 1")
            playerEvent.startItemCooldown('exodius_greatsword', 40)

        }
    }

    //Greatswords
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:wooden_greatsword') {
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (random < 0.4) {
            mobEvent.applyDamage(7, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:greatsword_crit ~ ~ ~")
            mobEvent.runCommand("playsound step.amethyst_block @a[r=24] ~ ~ ~ 3 0.7 10")
        }
    }
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:stone_greatsword') {
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (random < 0.4) {
            mobEvent.applyDamage(8, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:greatsword_crit ~ ~ ~")
            mobEvent.runCommand("playsound step.amethyst_block @a[r=24] ~ ~ ~ 3 0.7 10")
        }
    }
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:iron_greatsword') {
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (random < 0.4) {
            mobEvent.applyDamage(9, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:greatsword_crit ~ ~ ~")
            mobEvent.runCommand("playsound step.amethyst_block @a[r=24] ~ ~ ~ 3 0.7 10")
        }
    }
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:diamond_greatsword') {
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (random < 0.4) {
            mobEvent.applyDamage(10, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:greatsword_crit ~ ~ ~")
            mobEvent.runCommand("playsound step.amethyst_block @a[r=24] ~ ~ ~ 3 0.7 10")
        }
    }
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:netherite_greatsword') {
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (random < 0.4) {
            mobEvent.applyDamage(11, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:greatsword_crit ~ ~ ~")
            mobEvent.runCommand("playsound step.amethyst_block @a[r=24] ~ ~ ~ 3 0.7 10")
        }
    }


    //platinum_greatsword and halberd
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:platinum_greatsword') {
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.9, z: -playerEvent.getViewDirection().z * -0.9 }, 0.3);
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (mobEvent.typeId === 'cata:stone_golem' ||
            mobEvent.typeId === 'cata:feralbloom' ||
            mobEvent.typeId === 'cata:solarium' ||
            mobEvent.typeId === 'cata:verdant_sentinel' ||
            mobEvent.typeId === 'cata:verdant_skeleton' ||
            mobEvent.typeId === 'cata:gneiss_golem' ||
            mobEvent.typeId === 'cata:solar_tesla') {

            mobEvent.applyDamage(10, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:greatsword_crit ~ ~ ~")
        }
    }
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:platinum_halberd') {
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -1, z: -playerEvent.getViewDirection().z * -1 }, 0.3);
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (mobEvent.typeId === 'cata:stone_golem' ||
            mobEvent.typeId === 'cata:feralbloom' ||
            mobEvent.typeId === 'cata:solarium' ||
            mobEvent.typeId === 'cata:verdant_sentinel' ||
            mobEvent.typeId === 'cata:verdant_skeleton' ||
            mobEvent.typeId === 'cata:gneiss_golem' ||
            mobEvent.typeId === 'cata:solar_tesla') {

            mobEvent.applyDamage(12, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:greatsword_crit ~ ~ ~")
        }
    }


    //stellar_greatsword
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:stellar_greatsword') {
        if (random < 0.30) {
            mobEvent.applyDamage(10, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:stellar_greatsword_star_crit ~ ~ ~")
            playerEvent.runCommand("particle cata:stellar_greatsword_emitter ^^0.1^1.2")
            const nearbyEntities = playerEvent.dimension.getEntities({
                location: playerEvent.location,
                maxDistance: 4,
                excludeFamilies: ["player"]
            });
            for (const entity of nearbyEntities) {
                if (entity.hasComponent("health")) {
                    entity.applyDamage(5, { cause: "entityAttack" })
                    entity.runCommand("particle cata:stellar_greatsword_crit ~ ~ ~")
                    entity.runCommand("particle cata:stellar_greatsword_star_crit ~ ~ ~")
                    entity.runCommand("playsound mace.smash_air @a[r=10] ~ ~ ~ 0.4 1.3 1")
                    entity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.5);
                }
            }
        } else if (random < 1) {
            playerEvent.runCommand("particle cata:stellar_greatsword_emitter ^^0.1^1.2")
            mobEvent.runCommand('playsound step.amethyst_block @a[r=24] ~ ~ ~ 10 1.6 10')
            return
        }
    }

    //stellar_mace
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:stellar_mace') {
        if (!playerEvent.getItemCooldown('stellar_mace')) {
            mobEvent.applyDamage(18, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:stellar_mace_hit ~ ~ ~")
            mobEvent.runCommand("particle cata:stellar_mace_astral_hit ~ ~ ~")
            mobEvent.runCommand("particle cata:stellar_greatsword_star_crit ~ ~ ~")
            playerEvent.runCommand("particle cata:stellar_greatsword_emitter ^^0.1^1.2")
            mobEvent.runCommand("playsound mace.smash_air @a[r=10] ~ ~ ~ 1 0.8 1")
            playerEvent.startItemCooldown('stellar_mace', 20)
            const nearbyEntities = playerEvent.dimension.getEntities({
                location: mobEvent.location,
                maxDistance: 8,
                excludeFamilies: ["player"]
            });
            for (const entity of nearbyEntities) {
                if (entity.hasComponent("health")) {
                    entity.applyDamage(12, { cause: "entityAttack" })
                    entity.runCommand("playsound mace.smash_air @a[r=10] ~ ~ ~ 1 0.8 1")
                    entity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.2, z: -playerEvent.getViewDirection().z * -0.2 }, 0.8);
                }
            }
        } else if (playerEvent.getItemCooldown('stellar_mace')) {
            playerEvent.runCommand("particle cata:stellar_greatsword_emitter ^^0.1^1.2")
            mobEvent.runCommand('playsound step.amethyst_block @a[r=24] ~ ~ ~ 10 1.6 10')
            playerEvent.startItemCooldown('stellar_mace', 60)
            playerEvent.addEffect("weakness", TicksPerSecond * 3, { amplifier: 5, showParticles: false });
            return
        }
    }


    //meowclysm
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:meowclysm') {
        playerEvent.runCommand("playsound sound.electric_blade @a[r=15] ~ ~ ~ 0.4 1 1")
        playerEvent.runCommand("playsound sound.meowclysm @a[r=15] ~ ~ ~ 0.4 1 1")
    }


    //blazing_excalibur
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:blazing_excalibur' ||
        items?.typeId == 'cata:sunlight') {
        if (playerEvent.getItemCooldown('blazing_excalibur_test')) {
            mobEvent.applyDamage(26, { cause: "entityAttack" })
            mobEvent.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
            mobEvent.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
            mobEvent.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
            mobEvent.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
        }
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.4, z: -playerEvent.getViewDirection().z * -0.4 }, 0.3);
        mobEvent.setOnFire(6)
        mobEvent.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
        playerEvent.runCommand("playsound sound.electric_blade @a[r=15] ~ ~ ~ 0.4 1 1")
        const nearbyEntities = mobEvent.dimension.getEntities({
            location: mobEvent.location,
            maxDistance: 4,
            excludeFamilies: ["player"]
        });
        for (const entity of nearbyEntities) {
            if (entity.hasComponent("health")) {
                if (playerEvent.getItemCooldown('blazing_excalibur_test')) {
                    entity.applyDamage(15, { cause: "entityAttack" })
                    entity.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
                    entity.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
                    entity.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
                    entity.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
                } else {
                    entity.applyDamage(4, { cause: "entityAttack" })
                }
                entity.setOnFire(3)
                entity.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
                entity.applyKnockback({ x: -mobEvent.getViewDirection().x * -0.2, z: -mobEvent.getViewDirection().z * -0.2 }, 0.3);
            }
        }

    }


    //divine_scythe_of_heaven
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:divine_scythe_of_heaven') {
        if (!playerEvent.getItemCooldown('divine_scythe_of_heaven')) {
            playerEvent.startItemCooldown('divine_scythe_of_heaven', 40)
            playerEvent.runCommand("/summon cata:phantom_divine_scythe_of_heaven ^^1^ facing ^^^90")
            playerEvent.runCommand("/summon cata:phantom_divine_scythe_of_heaven ^^1.4^ facing ^90^^90")
            playerEvent.runCommand("/summon cata:phantom_divine_scythe_of_heaven ^^1.4^ facing ^-90^^90")
        }
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.5, z: -playerEvent.getViewDirection().z * -0.5 }, 0.3);
        mobEvent.setOnFire(12)
        mobEvent.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
        playerEvent.runCommand("playsound sound.electric_blade @a[r=15] ~ ~ ~ 0.4 0.8 1")
        const nearbyEntities = mobEvent.dimension.getEntities({
            location: mobEvent.location,
            maxDistance: 12,
            excludeFamilies: ["player"]
        });
        for (const entity of nearbyEntities) {
            if (entity.hasComponent("health")) {
                entity.applyDamage(10, { cause: "entityAttack" })
                entity.setOnFire(6)
                entity.runCommand("particle cata:blazing_excalibur_impact ~ ~ ~")
                entity.applyKnockback({ x: -mobEvent.getViewDirection().x * -0.2, z: -mobEvent.getViewDirection().z * -0.2 }, 0.3);
            }
        }

    }


    //floret_hatchet
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:floret_hatchet'
        && !playerEvent.getItemCooldown('elemental_weapon')) {
        const nearbyEntities = playerEvent.dimension.getEntities({
            location: playerEvent.location,
            maxDistance: 4,
            excludeFamilies: ["player"]
        });
        for (const entity of nearbyEntities) {
            if (entity.hasComponent("health")) {
                entity.applyDamage(5, { cause: "entityAttack" })
                entity.runCommand("particle cata:poison_dust ~ ~1 ~")
                entity.addEffect("poison", TicksPerSecond * 5, { amplifier: 2, showParticles: true });
                mobEvent.addEffect("slowness", TicksPerSecond * 5, { amplifier: 2, showParticles: true });
                entity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.5);
            }
        }
        playerEvent.runCommand("playsound sound.large_sword_swing @a[r=10] ~ ~ ~ 0.3 1.7 1")
        playerEvent.startItemCooldown('elemental_weapon', 30)
        mobEvent.runCommand("particle cata:poison_dust ~ ~1 ~")
        playerEvent.runCommand("particle cata:poison_sweep ^^0.1^1.2")
    } else if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:floret_hatchet'
        && playerEvent.getItemCooldown('elemental_weapon')) {
        mobEvent.addEffect('poison', 3 * 1)
        playerEvent.runCommand("playsound sound.small_sword_swing @a[r=12] ~ ~ ~ 1.4 0.7 1")
    }

    //everbloom
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:everbloom') {
        const nearbyEntities = playerEvent.dimension.getEntities({
            location: playerEvent.location,
            maxDistance: 8,
            excludeFamilies: ["player"]
        });
        for (const entity of nearbyEntities) {
            if (entity.hasComponent("health")) {
                entity.applyDamage(2, { cause: "entityAttack" })
                entity.runCommand("particle cata:poison_dust ~ ~1 ~")
                entity.runCommand("particle cata:floret_bolt_impact ~ ~1 ~")
                entity.addEffect("poison", TicksPerSecond * 5, { amplifier: 3, showParticles: false });
                entity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.5);
            }
        }
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        mobEvent.runCommand("particle cata:poison_dust ~ ~1 ~")
        if (!playerEvent.getItemCooldown('everbloom')) {
            playerEvent.runCommand("/summon cata:exodius_elements ^^0.6^ facing ^^^90 floret")
            playerEvent.runCommand("/summon cata:exodius_elements ^^0.6^ facing ^90^^90 floret")
            playerEvent.runCommand("/summon cata:exodius_elements ^^0.6^ facing ^-90^^90 floret")
            playerEvent.startItemCooldown('everbloom', 40)
        }
    }


    //morningstar
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:morningstar'
        && !playerEvent.getItemCooldown('elemental_weapon')) {
        playerEvent.startItemCooldown('elemental_weapon', 100)
        playerEvent.runCommand("playsound sound.solar_swing @a[r=10] ~ ~ ~ 0.3 1 1")
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.7);
        mobEvent.runCommand("particle cata:morningstar_impact ~ ~1 ~")
        mobEvent.setOnFire(4)
        mobEvent.applyDamage(18, { cause: "entityAttack" })
    } else if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:morningstar'
        && playerEvent.getItemCooldown('elemental_weapon')) {
        mobEvent.setOnFire(2)
        playerEvent.runCommand("playsound sound.small_sword_swing @a[r=12] ~ ~ ~ 0.8 0.7 1")
    }

    //verdant_blade
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:verdant_blade') {
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        playerEvent.runCommand('particle cata:verdant_sweep ^^0.1^1.8')
        if (!playerEvent.getItemCooldown('verdant_blade')) {
            playerEvent.startItemCooldown('verdant_blade', 200)
            mobEvent.addEffect("weakness", TicksPerSecond * 3, { amplifier: 1, showParticles: true });
            mobEvent.addEffect("slowness", TicksPerSecond * 3, { amplifier: 0, showParticles: true });
            mobEvent.applyDamage(12, { cause: "entityAttack" })

        }
        mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -1, z: -playerEvent.getViewDirection().z * -1 }, 0.3);
        const nearbyEntities = mobEvent.dimension.getEntities({
            location: playerEvent.location,
            maxDistance: 4,
            excludeFamilies: ["player"]
        });
        for (const entity of nearbyEntities) {
            if (entity.hasComponent("health")) {
                entity.applyDamage(5, { cause: "entityAttack" })
                entity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.5);
            }
        }
    }


    //cata:phantasma_greatsword
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:phantasma_greatsword') {
        playerEvent.runCommand("playsound sound.massive_weapon_swing @a[r=10] ~ ~ ~ 1 1.7 1")
        if (playerEvent.hasTag('HasTerrorStage5')) {
            mobEvent.applyDamage(12, { cause: "entityAttack" })
            mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.8, z: -playerEvent.getViewDirection().z * -0.8 }, 0.2);
            mobEvent.runCommand(`particle cata:phantasma_stabilizer_bolt ~ ~ ~`)
            mobEvent.runCommand(`particle cata:phantasma_stabilizer ~ ~ ~`)
            mobEvent.runCommand(`particle cata:phantasma_stabilizer_bolt ~ ~ ~`)
            mobEvent.runCommand(`particle cata:phantasma_stabilizer ~ ~ ~`)

        } else if (playerEvent.hasTag('HasTerrorStage4')) {
            mobEvent.applyDamage(10, { cause: "entityAttack" })
            mobEvent.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.4, z: -playerEvent.getViewDirection().z * -0.4 }, 0.2);
            mobEvent.runCommand(`particle cata:phantasma_stabilizer_bolt ~ ~ ~`)
            mobEvent.runCommand(`particle cata:phantasma_stabilizer ~ ~ ~`)

        } else if (playerEvent.hasTag('HasTerrorStage3')) {
            mobEvent.applyDamage(8, { cause: "entityAttack" })
            mobEvent.runCommand(`particle cata:phantasma_stabilizer_bolt ~ ~ ~`)
            mobEvent.runCommand(`particle cata:phantasma_stabilizer ~ ~ ~`)

        } else if (playerEvent.hasTag('HasTerrorStage2')) {
            mobEvent.applyDamage(6, { cause: "entityAttack" })
            mobEvent.runCommand(`particle cata:phantasma_stabilizer_bolt ~ ~ ~`)
            mobEvent.runCommand(`particle cata:phantasma_stabilizer ~ ~ ~`)

        } else if (playerEvent.hasTag('HasTerrorStage1')) {
            mobEvent.applyDamage(4, { cause: "entityAttack" })
            mobEvent.runCommand(`particle cata:phantasma_stabilizer_bolt ~ ~ ~`)
            mobEvent.runCommand(`particle cata:phantasma_stabilizer ~ ~ ~`)

        } else return
    } else { return }
})

world.afterEvents.entityDie.subscribe((data) => {
    const playerEvent = data.damageSource.damagingEntity
    const mobEvent = data.deadEntity
    let invi = playerEvent?.getComponent("inventory")?.container
    let items = invi?.getItem(playerEvent?.selectedSlotIndex)
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:sunlight' &&
        !playerEvent?.getItemCooldown('sunmoonlight')) {
        playerEvent?.startItemCooldown('sunmoonlight', 120)
        mobEvent.runCommand('summon cata:sun_orb ~ ~1 ~')
    }
})

world.afterEvents.entityDie.subscribe((data) => {
    const playerEvent = data.damageSource.damagingEntity
    const mobEvent = data.deadEntity
    let invi = playerEvent?.getComponent("inventory")?.container
    let items = invi?.getItem(playerEvent?.selectedSlotIndex)
    if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:nebulous_greatsword') {
        if (playerEvent.hasTag('HasNebulousMeter5') && !player.getItemCooldown('nebulous_meter_test')) {

        } else if (playerEvent.hasTag('HasNebulousMeter4') && !playerEvent.getItemCooldown('nebulous_meter_test')) {
            playerEvent.addTag("HasNebulousMeter5")

        } else if (playerEvent.hasTag('HasNebulousMeter3') && !playerEvent.getItemCooldown('nebulous_meter_test')) {
            playerEvent.addTag("HasNebulousMeter4")

        } else if (playerEvent.hasTag('HasNebulousMeter2') && !playerEvent.getItemCooldown('nebulous_meter_test')) {
            playerEvent.addTag("HasNebulousMeter3")

        } else if (playerEvent.hasTag('HasNebulousMeter1') && !playerEvent.getItemCooldown('nebulous_meter_test')) {
            playerEvent.addTag("HasNebulousMeter2")

        } else if (!playerEvent.hasTag('HasNebulousMeter1') && !playerEvent.getItemCooldown('nebulous_meter_test')) {
            playerEvent.addTag("HasNebulousMeter1")
            playerEvent.runCommand("playsound note.chime @s ~ ~ ~ 0.6 1.5 1")
        }
    }
})
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                let playerEvent = player
                let invi = playerEvent?.getComponent("inventory")?.container
                let items = invi?.getItem(playerEvent?.selectedSlotIndex)
                if (playerEvent?.typeId == "minecraft:player" && items?.typeId == 'cata:nebulous_greatsword') {
                    if (playerEvent.hasTag('HasNebulousMeter5')) {
                        playerEvent.onScreenDisplay.setActionBar("")

                    } else if (playerEvent.hasTag('HasNebulousMeter4')) {
                        playerEvent.onScreenDisplay.setActionBar("")

                    } else if (playerEvent.hasTag('HasNebulousMeter3')) {
                        playerEvent.onScreenDisplay.setActionBar("")

                    } else if (playerEvent.hasTag('HasNebulousMeter2')) {
                        playerEvent.onScreenDisplay.setActionBar("")

                    } else if (playerEvent.hasTag('HasNebulousMeter1')) {
                        playerEvent.onScreenDisplay.setActionBar("")

                    } else if (!playerEvent.hasTag('HasNebulousMeter1')) {
                        playerEvent.onScreenDisplay.setActionBar("")
                    }
                }
            }
        )
    }, 20)