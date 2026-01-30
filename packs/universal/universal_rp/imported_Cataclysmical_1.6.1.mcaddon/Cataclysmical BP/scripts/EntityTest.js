import * as server from "@minecraft/server"
import { TicksPerSecond, system } from "@minecraft/server";
const world = server.world

system.runInterval(() => {
    let mob =
        world.getDimension('overworld').getEntities({ families: ['sun_tribunal_phantom_blade'] }).concat(
            world.getDimension('nether').getEntities({ families: ['sun_tribunal_phantom_blade'] }),
            world.getDimension('the_end').getEntities({ families: ['sun_tribunal_phantom_blade'] })
        )

    mob.forEach(entity => {
        if (entity.getDynamicProperty("strafe_direction") === undefined) entity.setDynamicProperty("strafe_direction", Math.random() * 360)
        else entity.setDynamicProperty("strafe_direction", (entity.getDynamicProperty("strafe_direction") + 5) % 360)
        entity.applyImpulse({
            x: -entity.getViewDirection().x * -0.25,
            y: 0,
            z: -entity.getViewDirection().z * -0.25,
        })
    })
})

system.runInterval(() => {
    let mob =
        world.getDimension('overworld').getEntities({ families: ['cosmic_terror_skull'] }).concat(
            world.getDimension('nether').getEntities({ families: ['cosmic_terror_skull'] }),
            world.getDimension('the_end').getEntities({ families: ['cosmic_terror_skull'] })
        )

    mob.forEach(entity => {
        if (entity.getDynamicProperty("strafe_direction") === undefined) entity.setDynamicProperty("strafe_direction", Math.random() * 360)
        else entity.setDynamicProperty("strafe_direction", (entity.getDynamicProperty("strafe_direction") + 5) % 360)
        entity.applyImpulse({
            x: -entity.getViewDirection().x * -0.20,
            y: 0,
            z: -entity.getViewDirection().z * -0.20,
        })
    })
})

system.runInterval(() => {
    let mob =
        world.getDimension('overworld').getEntities({ families: ['exodius_armor_elements'] }).concat(
            world.getDimension('nether').getEntities({ families: ['exodius_armor_elements'] }),
            world.getDimension('the_end').getEntities({ families: ['exodius_armor_elements'] })
        )

    mob.forEach(entity => {
        if (entity.getDynamicProperty("strafe_direction") === undefined) entity.setDynamicProperty("strafe_direction", Math.random() * 360)
        else entity.setDynamicProperty("strafe_direction", (entity.getDynamicProperty("strafe_direction") + 5) % 360)
        entity.applyImpulse({
            x: -entity.getViewDirection().x * -0.10,
            y: 0,
            z: -entity.getViewDirection().z * -0.10,
        })
    })
})

system.runInterval(() => {
    let mob =
        world.getDimension('overworld').getEntities({ families: ['debuff_immunity'] }).concat(
            world.getDimension('nether').getEntities({ families: ['debuff_immunity'] }),
            world.getDimension('the_end').getEntities({ families: ['debuff_immunity'] })
        )

    mob.forEach(entity => {
        entity.removeEffect("slowness")
        entity.removeEffect("mining_fatigue")
        entity.removeEffect("instant_damage")
        entity.removeEffect("blindness")
        entity.removeEffect("wither")
        entity.removeEffect("infested")
        entity.removeEffect("bad_omen")
    })
}, 20)