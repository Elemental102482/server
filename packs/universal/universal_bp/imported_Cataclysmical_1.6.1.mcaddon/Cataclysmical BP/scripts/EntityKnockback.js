import * as server from "@minecraft/server"
import { TicksPerSecond, system } from "@minecraft/server";
const world = server.world


const FireDamage = [
    "cata:solar_tesla_summon",
    "cata:solarium",
    "cata:sun_tribunal",
    "cata:sun_tribunal_phantom_blade",
    "cata:sun_tribunal_double_dash_attck",
    "cata:sun_totem",
    "cata:sun_tribunal_chaos_attack1",
]


//mob knockback 
world.afterEvents.entityHurt.subscribe(({ damageSource: { damagingEntity: source }, hurtEntity: player }) => {
    if (!source) return;
    const { x, z } = source.getViewDirection();
    const isEntity = player.hasComponent('health')

    //Mob attacks that set on fire

    const FireDamageSource = source.typeId
    const IsFireDamage = FireDamage.includes(FireDamageSource)
    if (IsFireDamage && isEntity) {
        player.setOnFire(4)
    }


    if (isEntity && source.typeId === 'cata:stone_golem') {
        player.applyKnockback({ x: -source.getViewDirection().x * -4, z: -source.getViewDirection().z * -4 }, 0.2);
        player.addEffect("weakness", TicksPerSecond * 5, { amplifier: 3, showParticles: false });
        player.addEffect("slowness", TicksPerSecond * 5, { amplifier: 3, showParticles: false });

    }
    if (isEntity && source.typeId === 'cata:solarium') {
        player.applyKnockback({ x: -source.getViewDirection().x * -1.5, z: -source.getViewDirection().z * -1.5 }, 0.4);

    }
    if (isEntity && source.typeId === 'cata:cosmic_terror') {
        player.applyKnockback({ x: -source.getViewDirection().x * -1.5, z: -source.getViewDirection().z * -1.5 }, 0.4);
        player.addEffect("weakness", TicksPerSecond * 5, { amplifier: 2, showParticles: false });
        player.addEffect("wither", TicksPerSecond * 5, { amplifier: 0, showParticles: false });

    }
    if (isEntity && source.typeId === 'cata:sun_tribunal') {
        player.applyKnockback({ x: -source.getViewDirection().x * -6.5, z: -source.getViewDirection().z * -6.5 }, 1);
        source.triggerEvent("flawed_fight")
        player.addEffect("weakness", TicksPerSecond * 3, { amplifier: 0, showParticles: false });
        player.addEffect("slowness", TicksPerSecond * 3, { amplifier: 0, showParticles: false });
        player.addEffect("wither", TicksPerSecond * 3, { amplifier: 0, showParticles: false });
        player.removeEffect("strength")
        player.removeEffect("resistance")
        player.removeEffect("fire_resistance")
        player.removeEffect("absorption")
        player.removeEffect("invisibility")

    }
    if (isEntity && source.typeId === 'cata:sun_tribunal_double_dash_attck') {
        player.applyKnockback({ x: -source.getViewDirection().x * -1.5, z: -source.getViewDirection().z * -1.5 }, 2.5);


    }
    if (source.typeId === 'cata:sun_totem') {
        player.applyKnockback({ x: -source.getViewDirection().x * -0.1, z: -source.getViewDirection().z * -0.1 }, 0);

        player.runCommand("particle cata:blazing_excalibur_impact_emitter ~ ~ ~")

    }
    if (isEntity && source.typeId === 'cata:sun_tribunal_chaos_attack1') {
        player.applyKnockback({ x: -source.getViewDirection().x * -2, z: -source.getViewDirection().z * -2 }, 2.5);

    }
    if (isEntity && source.typeId === 'cata:cosmic_terror_heavy_attack') {
        player.applyKnockback({ x: -source.getViewDirection().x * -0.5, z: -source.getViewDirection().z * -0.5 }, 1.5);

    }
    if (isEntity && source.typeId === 'cata:solar_tesla' && source.typeId === 'cata:eternal_seal') {
        player.applyKnockback({ x: -source.getViewDirection().x * -2, z: -source.getViewDirection().z * -2 }, 0.6);

    }
    if (isEntity && source.typeId === 'cata:skeleton_paladin') {
        player.applyKnockback({ x: -source.getViewDirection().x * -2, z: -source.getViewDirection().z * -2 }, 0.4);

    }
    //exodius elements
    const Health = source.getComponent('health')
    if (isEntity && Health?.currentValue === 100 && source?.typeId === 'cata:exodius_armor_elements' || Health.currentValue === 100 && source.typeId === 'cata:exodius_elements') {
        player.addEffect("slowness", TicksPerSecond * 5, { amplifier: 3, showParticles: false });
        player.addEffect("poison", TicksPerSecond * 5, { amplifier: 3, showParticles: false });

    } else if (isEntity && Health.currentValue === 101 && source.typeId === 'cata:exodius_armor_elements' || Health.currentValue === 101 && source.typeId === 'cata:exodius_elements') {
        player.setOnFire(4)

    } else if (isEntity && Health.currentValue === 102 && source.typeId === 'cata:exodius_armor_elements' || Health.currentValue === 102 && source.typeId === 'cata:exodius_elements') {
        player.addEffect("weakness", TicksPerSecond * 5, { amplifier: 3, showParticles: false });
        player.applyKnockback({ x: -source.getViewDirection().x * -0.5, z: -source.getViewDirection().z * -0.5 }, 1);

    }

    if (source.typeId === 'cata:verdant_sentinel') {
        source.triggerEvent("flawed_fight")
        player.addEffect("weakness", TicksPerSecond * 3, { amplifier: 2, showParticles: false });
        player.addEffect("slowness", TicksPerSecond * 3, { amplifier: 2, showParticles: false });
    }
    if (source.typeId === 'cata:plasma_hive' || source.typeId === 'cata:plasma') {
        source.runCommand('particle cata:plasma_summon ~ ~0 ~')
        source.runCommand('playsound mob.vex.charge @a[r=24] ~ ~ ~')
    }
});
//knockback tags
world.afterEvents.entityHurt.subscribe(({ damageSource: { damagingEntity: source }, hurtEntity: player }) => {
    if (!source) return;
    const { x, z } = source.getViewDirection();
    if (source.hasTag('normal_attack')) {
        player.applyKnockback({ x: -source.getViewDirection().x * -2, z: -source.getViewDirection().z * -2 }, 0.3);
    }
    if (source.hasTag('heavy_attack')) {
        player.applyKnockback({ x: -source.getViewDirection().x * -3, z: -source.getViewDirection().z * -3 }, 0.8);
    }
    if (source.hasTag('mega_attack')) {
        player.applyKnockback({ x: -source.getViewDirection().x * -5, z: -source.getViewDirection().z * -5 }, 1);
    }
    if (source.hasTag('super_attack')) {
        player.applyKnockback({ x: -source.getViewDirection().x * -7, z: -source.getViewDirection().z * -7 }, 2);
    }
});
world.afterEvents.entityHurt.subscribe(({ damageSource: { damagingEntity: source }, hurtEntity: player }) => {
    if (!source) return; // Ensure the damaging entity exists.
    const { x: dirX, z: dirZ } = source.getViewDirection(); // Get direction vector of the source.
    const offsetDistance = 2; // Distance in front of the source where knockback is applied.
    // Calculate the adjusted location slightly in front of the source.
    const knockbackLocation = {
        x: source.location.x + dirX * offsetDistance,
        y: source.location.y,
        z: source.location.z + dirZ * offsetDistance,
    };
    // Get all entities near the adjusted location.
    const nearbyEntities = source.dimension.getEntities({
        location: knockbackLocation,
        maxDistance: 4.4, // Radius of effect.
    });
    for (const entity of nearbyEntities) {
        if (entity === source) continue; // Skip the source entity itself.

        const { x, z } = source.getViewDirection(); // Reuse direction for knockback.

        // Apply knockback based on the tag of the source entity.
        if (source.typeId === 'gneiss_golem') {
            entity.applyKnockback({ x: -source.getViewDirection().x * -6, z: -source.getViewDirection().z * -6 }, 2);
            entity.applyDamage(40, { cause: "entityAttack" });
        }
    }
});

//area_knockback tags
world.afterEvents.entityHurt.subscribe(({ damageSource: { damagingEntity: source }, hurtEntity: player }) => {
    if (!source) return; // Ensure the damaging entity exists.
    const { x: dirX, z: dirZ } = source.getViewDirection(); // Get direction vector of the source.
    const offsetDistance = 2; // Distance in front of the source where knockback is applied.
    // Calculate the adjusted location slightly in front of the source.
    const knockbackLocation = {
        x: source.location.x + dirX * offsetDistance,
        y: source.location.y,
        z: source.location.z + dirZ * offsetDistance,
    };
    // Get all entities near the adjusted location.
    const nearbyEntities = source.dimension.getEntities({
        location: knockbackLocation,
        maxDistance: 3.5, // Radius of effect.
    });
    for (const entity of nearbyEntities) {
        if (entity === source) continue; // Skip the source entity itself.

        const { x, z } = source.getViewDirection(); // Reuse direction for knockback.

        // Apply knockback based on the tag of the source entity.
        if (source.hasTag('area_normal_attack')) {
            entity.applyKnockback({ x: -source.getViewDirection().x * -1.25, z: -source.getViewDirection().z * -1.25 }, 0.5);
            entity.applyDamage(10, { cause: "entityAttack" });
        }
        if (source.hasTag('area_heavy_attack')) {
            entity.applyKnockback({ x: -source.getViewDirection().x * -7, z: -source.getViewDirection().z * -7 }, 0.5);
            entity.applyDamage(15, { cause: "entityAttack" });
        }
        if (source.hasTag('area_super_attack')) {
            entity.applyKnockback({ x: -source.getViewDirection().x * -7, z: -source.getViewDirection().z * -7 }, 2);
            entity.applyDamage(10, { cause: "entityAttack" });
        }
    }
});