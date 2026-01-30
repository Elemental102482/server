import { world, TicksPerSecond, system, EntityDamageCause } from '@minecraft/server'
//trinkets 

//AEGIS TRINKET SYSTEM
const AegisProtectionDamage = [
    "entityAttack",
    "entityExplosion",
    "maceSmash",
    "projectile",
    "ramAttack",
    "sonicBoom",
]

// +5 Aegis Protection 3.2
// +4 Aegis Protection 2.5
// +3 Aegis Protection 2.2
// +2 Aegis Protection 1.5
// +1 Aegis Protection 1.2




//verdant_aegis
world.afterEvents.entityHurt.subscribe(data => {
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity
    const AegisProtectionDamageSource = data.damageSource.cause
    const IsAegisProtectionDamage = AegisProtectionDamage.includes(AegisProtectionDamageSource)

    if (IsAegisProtectionDamage) {
        player.applyKnockback({ x: -player.getViewDirection().x * 0.35, z: -player.getViewDirection().z * 0.35 }, 0.2);
    }

    if (player?.hasTag("novelty:cata:verdant_aegis") && IsAegisProtectionDamage && !player.getItemCooldown('verdant_aegis')) {
        let health = player.getComponent("minecraft:health");

        health.setCurrentValue(Math.min(health.currentValue + data.damage / 1.2, health.effectiveMax));
        mob.applyDamage(data.damage / 2, { damagingEntity: player, cause: "magic" });
        const maxHealth = health.effectiveMax;
        const restoredHealth = Math.min(health.currentValue, maxHealth);
        health.setCurrentValue(restoredHealth);
        player.applyKnockback({ x: -player.getViewDirection().x * -0.1, z: -player.getViewDirection().z * -0.1 }, 0.1);
        player.runCommand("playsound sound.aegis_protection @a[r=32] ^^^1 2 2 1")
        player.runCommand("particle cata:verdant_aegis_protecion ~ ~1 ~")
        player.startItemCooldown('verdant_aegis', 700)
    }
})

//blooming_aegis
world.afterEvents.entityHurt.subscribe(data => {
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity
    const AegisProtectionDamageSource = data.damageSource.cause
    const IsAegisProtectionDamage = AegisProtectionDamage.includes(AegisProtectionDamageSource)

    if (player?.hasTag("novelty:cata:blooming_aegis") && IsAegisProtectionDamage) {
        player.applyKnockback({ x: -player.getViewDirection().x * 0.35, z: -player.getViewDirection().z * 0.35 }, 0.2);
        mob.addEffect("poison", TicksPerSecond * 5, { amplifier: 0, showParticles: true });
    }

    if (player.hasTag("novelty:cata:blooming_aegis") && IsAegisProtectionDamage && !player.getItemCooldown('blooming_aegis')) {
        let health = player.getComponent("minecraft:health");

        health.setCurrentValue(Math.min(health.currentValue + data.damage / 1.5, health.effectiveMax));
        mob.applyDamage(data.damage / 1.5, { damagingEntity: player, cause: "magic" });
        mob.addEffect("poison", TicksPerSecond * 5, { amplifier: 0, showParticles: true });
        const maxHealth = health.effectiveMax;
        const restoredHealth = Math.min(health.currentValue, maxHealth);
        health.setCurrentValue(restoredHealth);
        player.applyKnockback({ x: -player.getViewDirection().x * -0.1, z: -player.getViewDirection().z * -0.1 }, 0.1);
        player.runCommand("playsound sound.aegis_protection @a[r=32] ^^^1 2 2 1")
        player.runCommand("particle cata:poison_cloud_emitter ~ ~1 ~")
        player.runCommand("particle cata:verdant_aegis_protecion ~ ~1 ~")
        player.startItemCooldown('blooming_aegis', 700)
    }
})

//solar_aegis
world.afterEvents.entityHurt.subscribe(data => {
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity
    const AegisProtectionDamageSource = data.damageSource.cause
    const IsAegisProtectionDamage = AegisProtectionDamage.includes(AegisProtectionDamageSource)

    if (player?.hasTag("novelty:cata:solar_aegis") && IsAegisProtectionDamage) {
        player.applyKnockback({ x: -player.getViewDirection().x * 0.20, z: -player.getViewDirection().z * 0.20 }, 0.15);
        mob.setOnFire(3)
    }

    if (player.hasTag("novelty:cata:solar_aegis") && IsAegisProtectionDamage && !player.getItemCooldown('solar_aegis')) {
        let health = player.getComponent("minecraft:health");

        health.setCurrentValue(Math.min(health.currentValue + data.damage / 1.5, health.effectiveMax));
        mob.applyDamage(data.damage / 1.3, { damagingEntity: player, cause: "magic" });
        mob.setOnFire(8)
        const maxHealth = health.effectiveMax;
        const restoredHealth = Math.min(health.currentValue, maxHealth);
        health.setCurrentValue(restoredHealth);
        player.applyKnockback({ x: -player.getViewDirection().x * -0.1, z: -player.getViewDirection().z * -0.1 }, 0.1);
        player.runCommand("playsound sound.aegis_protection @a[r=32] ^^^1 2 2 1")
        player.runCommand("particle cata:solar_ore_explosion ~ ~1 ~")
        player.startItemCooldown('solar_aegis', 600)
    }
})


//misc

//astro_jelly_in_a_bottle
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player?.hasTag("novelty:cata:astro_jelly_in_a_bottle") && !player.getItemCooldown('astro_jelly_in_a_bottle')) {
                    if (player.isJumping && player.isFalling && !player.isOnGround && player.isSneaking) {
                        player.applyKnockback({ x: -player.getViewDirection().x * 0.1, z: -player.getViewDirection().z * 0.1 }, 1);
                        player.addEffect("slow_falling", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                        player.startItemCooldown('astro_jelly_in_a_bottle', 100)
                        player.runCommand("particle cata:astro_jelly_in_a_bottle ~ ~ ~")
                    }
                }
            }
        )
    }
)

//sun_engine
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player?.hasTag("novelty:cata:sun_engine")) {
                    const Health = player.getComponent('health')
                    if (Health.currentValue < 10) {
                        const nearbyEntities = player.dimension.getEntities({
                            location: player.location,
                            maxDistance: 8,
                            excludeFamilies: ["player"],
                            excludeTypes: ["nvy:novelty_inventory", "villager"]
                        });
                        for (const entity of nearbyEntities) {
                            if (entity.hasComponent("health")) {
                                entity.setOnFire(5)
                                entity.applyDamage(3, { cause: "entityAttack" })
                                entity.runCommand(`particle cata:solar_tesla_coil ~ ~ ~ `)
                            }
                        }
                    }
                }
            }
        )
    }, 20)

//verdant_ring
world.afterEvents.entityHurt.subscribe(data => {
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity

    if (player?.hasTag("novelty:cata:verdant_ring") && data.damageSource.damagingProjectile) {
        let health = player.getComponent("minecraft:health");
        health.setCurrentValue(Math.min(health.currentValue + data.damage / 2, health.effectiveMax));
        const maxHealth = health.effectiveMax;
        const restoredHealth = Math.min(health.currentValue, maxHealth);
        health.setCurrentValue(restoredHealth);
        player.runCommand("playsound random.anvil_land @a[r=32] ~ ~ ~ 0.2 2 1")
    }
})

//floret_ring
world.afterEvents.entityDie.subscribe((data) => {
    const player = data.damageSource.damagingEntity
    const mob = data.deadEntity
    if (player?.hasTag("novelty:cata:floret_ring") && mob.matches({ families: ["undead"] })
        && !player.getItemCooldown('floret_ring')) {
        mob.runCommand('particle cata:floret_ore_emitter ~ ~1.3 ~')
        mob.runCommand('summon cata:verdant_skeleton ~ ~ ~ ~ ~ become_summon')
        mob.runCommand('particle cata:floret_ore_emitter ~ ~1.3 ~')
        mob.runCommand("playsound trial_spawner.spawn_mob @a[r=32] ~ ~ ~ 2 1.3 1")
        player.startItemCooldown('floret_ring', 1200)
    }
})

//stellar_charm
world.afterEvents.entityDie.subscribe((data) => {
    const player = data.damageSource.damagingEntity
    const mob = data.deadEntity
    if (player?.hasTag("novelty:cata:stellar_charm") && !player.getItemCooldown('stellar_charm')
        && mob.matches({ families: ["undead"] })) {

        mob.runCommand('particle cata:stellar_charm_heart ~ ~ ~ ')
        player.addEffect("regeneration", TicksPerSecond * 5, { amplifier: 0, showParticles: true });
        player.startItemCooldown('stellar_charm', 100)
    }
})

//solar_ring
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player?.hasTag("novelty:cata:solar_ring") && !player.getItemCooldown('solar_ring')) {
                    const Health = player.getComponent('health')
                    if (Health.currentValue < 10) {
                        player.runCommand("playsound sound.blazing_excalibur @a[r=14] ~ ~ ~ 3 1.3 1")
                        player.runCommand("particle cata:solar_ore_explosion ~ ~1 ~")
                        player.addEffect("fire_resistance", TicksPerSecond * 20, { amplifier: 0, showParticles: true });
                        player.addEffect("strength", TicksPerSecond * 20, { amplifier: 0, showParticles: true });
                        player.startItemCooldown('solar_ring', 600)
                    }
                }
            }
        )
    }, 20)

//calibrated_stellar_core
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player?.hasTag("novelty:cata:calibrated_stellar_core") && !player.getItemCooldown('calibrated_stellar_core')) {
                    const Health = player.getComponent('health')
                    if (Health.currentValue < 18) {
                        player.addEffect("regeneration", TicksPerSecond * 2, { amplifier: 0, showParticles: true });
                        const nearbyEntities = player.dimension.getEntities({
                            location: player.location,
                            maxDistance: 8,
                            excludeFamilies: ["mob", "inanimate"],
                            excludeTypes: ["nvy:novelty_inventory"]
                        });
                        for (const entity of nearbyEntities) {
                            if (entity.typeId === ("player")) {
                                entity.addEffect("regeneration", TicksPerSecond * 2, { amplifier: 0, showParticles: true });
                            }
                        }
                    }
                }
            }
        )
    }, 20)
world.afterEvents.entityHurt.subscribe(data => {
    let random = Math.random()
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity

    if (player?.hasTag("novelty:cata:calibrated_stellar_core")) {
        player.startItemCooldown('calibrated_stellar_core', 100)

    }
})

//phantasma_ring
world.afterEvents.entityDie.subscribe((data) => {
    const player = data.damageSource.damagingEntity
    const mob = data.deadEntity
    if (player?.hasTag("novelty:cata:phantasma_ring")) {

    } if (player?.hasTag("HasTerrorStage5") && player.hasTag("novelty:cata:phantasma_ring")) {
        mob.runCommand("particle cata:phantasma_ring ~ ~ ~")
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)

    } else if (player?.hasTag("HasTerrorStage4") && player.hasTag("novelty:cata:phantasma_ring")) {
        mob.runCommand("particle cata:phantasma_ring ~ ~ ~")
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)

    } else if (player?.hasTag("HasTerrorStage3") && player.hasTag("novelty:cata:phantasma_ring")) {
        mob.runCommand("particle cata:phantasma_ring ~ ~ ~")
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)

    } else if (player?.hasTag("HasTerrorStage2") && player.hasTag("novelty:cata:phantasma_ring")) {
        mob.runCommand("particle cata:phantasma_ring ~ ~ ~")
        mob.runCommand(`summon xp_orb ~ ~ ~`)
        mob.runCommand(`summon xp_orb ~ ~ ~`)

    } else if (player?.hasTag("HasTerrorStage1") && player.hasTag("novelty:cata:phantasma_ring")) {
        mob.runCommand("particle cata:phantasma_ring ~ ~ ~")
        mob.runCommand(`summon xp_orb ~ ~ ~`)

    }
})

//floret_necklace
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player?.hasTag("novelty:cata:floret_necklace")) {
                    player.removeEffect("poison");
                    player.removeEffect("fatal_poison")
                    player.removeEffect("wither")
                }
            }
        )
    }, 20)

//gauntlet code
world.afterEvents.entityHurt.subscribe(data => {
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity

    if (mob?.hasTag("novelty:cata:testable")) {
        player.applyDamage(data.damage + 2, { damagingEntity: player, cause: "entityAttack" });
    }
})

//stellar_necklace
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player?.hasTag("novelty:cata:stellar_necklace") && player.isFalling) {
                    player.addEffect("slow_falling", TicksPerSecond * 4, { amplifier: 0, showParticles: false });
                }
            }
        )
    }, 20)

//solar_necklace
system.runInterval(() => {
    let mob = world?.getDimension('nether').getEntities({ tags: ['novelty:cata:solar_necklace'] })

    mob.forEach(entity => {
        entity?.addEffect("resistance", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
        entity?.addEffect("fire_resistance", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    })
}, 20)
system.runInterval(() => {
    let mob =
        world?.getDimension('overworld').getEntities({ tags: ['novelty:cata:solar_necklace'] }).concat(
            world?.getDimension('the_end').getEntities({ tags: ['novelty:cata:solar_necklace'] })
        )

    mob.forEach(entity => {
        entity?.addEffect("weakness", TicksPerSecond * 2, { amplifier: 1, showParticles: false });
    })
}, 20)

//sun_ring
world.afterEvents.entityHurt.subscribe(data => {
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity

    if (mob?.hasTag("novelty:cata:sun_ring")) {
        player.applyDamage(data.damage + 2, { damagingEntity: player, cause: "entityAttack" });
        player.setOnFire(3, true)
    }
})

//sun_necklace
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player) => {
                if (player?.hasTag("novelty:cata:sun_necklace")) {
                    player.addEffect("health_boost", TicksPerSecond * 2, { amplifier: 1, showParticles: false });
                    player.addEffect("fire_resistance", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                    player.addEffect("resistance", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                }
            }
        )
    }, 20)

//stellar_ring
world.afterEvents.entityHurt.subscribe(data => {
    let random = Math.random()
    let player = data.hurtEntity
    let mob = data.damageSource.damagingEntity

    if (mob?.hasTag("novelty:cata:stellar_ring") && !mob.getItemCooldown('stellar_ring')) {
        if (random < 0.3) {
            player.applyDamage(data.damage + 3, { damagingEntity: player, cause: "entityAttack" });
            player.runCommand("particle cata:stellar_greatsword_crit ~ ~ ~")
            mob.startItemCooldown('stellar_ring', 80)
        }
    }
})

//phantasma_necklace
world.afterEvents.entityHurt.subscribe((data) => {
    const player = data.hurtEntity
    const mob = data.damageSource.damagingEntity
    if (player?.hasTag("novelty:cata:phantasma_necklace")) {
        const Health = player.getComponent('health')
        if (Health.currentValue < 10) {
            if (player?.hasTag("HasTerrorStage5") && player.hasTag("novelty:cata:phantasma_necklace") && !player.getItemCooldown('phantasma_necklace')) {
                player.runCommand("particle cata:phantasma_ring ~ ~ ~")
                player.startItemCooldown('phantasma_necklace', 900)
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("say test4")


            } else if (player?.hasTag("HasTerrorStage4") && player.hasTag("novelty:cata:phantasma_necklace") && !player.getItemCooldown('phantasma_necklace')) {
                player.runCommand("particle cata:phantasma_ring ~ ~ ~")
                player.startItemCooldown('phantasma_necklace', 900)
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")


            } else if (player?.hasTag("HasTerrorStage3") && player.hasTag("novelty:cata:phantasma_necklace") && !player.getItemCooldown('phantasma_necklace')) {
                player.runCommand("particle cata:phantasma_ring ~ ~ ~")
                player.startItemCooldown('phantasma_necklace', 900)
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")


            } else if (player?.hasTag("HasTerrorStage2") && player.hasTag("novelty:cata:phantasma_necklace") && !player.getItemCooldown('phantasma_necklace')) {
                player.runCommand("particle cata:phantasma_ring ~ ~ ~")
                player.startItemCooldown('phantasma_necklace', 900)
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")


            } else if (player?.hasTag("HasTerrorStage1") && player.hasTag("novelty:cata:phantasma_necklace") && !player.getItemCooldown('phantasma_necklace')) {
                player.runCommand("particle cata:phantasma_ring ~ ~ ~")
                player.startItemCooldown('phantasma_necklace', 900)
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")
                player.runCommand("summon cata:plasma ~ ~ ~ facing ~ ~ ~ is_summon")

            }
        }
    }
})
