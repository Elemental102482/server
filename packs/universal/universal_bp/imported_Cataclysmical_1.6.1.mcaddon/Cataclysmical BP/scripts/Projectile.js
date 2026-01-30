import * as server from "@minecraft/server"
import { TicksPerSecond } from "@minecraft/server";
const world = server.world


//projectile
world.afterEvents.entityHurt.subscribe(({ damageSource: { damagingEntity: source }, hurtEntity: player }) => {
    if (!source) return;
    const random = Math.random()
    const { x, z } = source.getViewDirection();
    if (source.typeId === 'cata:stellar_bolt') {
        if (random < 0.3) {
            player.applyDamage(10)
            player.runCommand("particle cata:astral_crit ~ ~ ~")
        } else if (random < 1) { return }
    }
    if (source.typeId === 'cata:terror_bolt') {
        source.runCommand('event entity @s explode')
    }
    if (source.typeId === 'cata:floret_bolt') {
        player.addEffect("poison", TicksPerSecond * 5, { amplifier: 2, showParticles: true });
    }
    if (source.typeId === 'cata:solar_bolt') {
        player.setOnFire(4)
    }
    if (source.typeId === 'cata:floret_bolt_heavy') {
        player.addEffect("poison", TicksPerSecond * 5, { amplifier: 2, showParticles: true });
    }
    if (source.typeId === 'cata:solar_laser') {
        player.setOnFire(5)
    }
    if (source.typeId === 'cata:solar_summon_bolt') {
        source.runCommand('event entity @s explode')
        player.setOnFire(5)
    }
    if (source.typeId === 'cata:spore_thrower') {
        source.runCommand('event entity @s explode')
        player.runCommand('particle cata:poison_cloud_emitter ~ ~ ~')
        player.addEffect("poison", TicksPerSecond * 5, { amplifier: 2, showParticles: true });
    }
});