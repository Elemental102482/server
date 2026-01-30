import { world, system, EquipmentSlot } from "@minecraft/server";
import { TicksPerSecond } from "@minecraft/server";

system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (player, block) => {
                const equipmentInventory = player.getComponent("equippable");
                if (equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "cata:verdant_helmet" || equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "cata:verdant_chestplate") {
                    player.removeEffect("poison");
                    player.removeEffect("fatal_poison")
                }
                if (equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "cata:verdant_chestplate") {
                    player.addEffect("slowness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                    player.addEffect("weakness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                    player.addEffect("resistance", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                }
                if (equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "cata:stellar_helmet"
                    && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "cata:stellar_chestplate"
                    && equipmentInventory.getEquipment(EquipmentSlot.Legs)?.typeId == "cata:stellar_leggings"
                    && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId == "cata:stellar_boots"
                ) {
                    player.addEffect("health_boost", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
                }
            },
        );
    },
);

world.afterEvents.entityHurt.subscribe(event => {
    const equipmentInventory = event.hurtEntity.getComponent("equippable");
    if (event.hurtEntity?.typeId == 'minecraft:player' && equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "cata:stellar_helmet"
        && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "cata:stellar_chestplate"
        && equipmentInventory.getEquipment(EquipmentSlot.Legs)?.typeId == "cata:stellar_leggings"
        && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId == "cata:stellar_boots") {
        const random = Math.random()
        if (random < 0.50) {
            event.damageSource.damagingEntity.runCommand("particle cata:astral_weapon_emitter ~ ~ ~")
            event.damageSource.damagingEntity.applyDamage(3)
            event.damageSource.damagingEntity.runCommand("playsound random.explode @a[r=10] ~ ~ ~ 0.05 1.9 0.1")
        } else if (random < 1) return {

        }
    }
})
world.afterEvents.entityHurt.subscribe(event => {
    const playerEvent = event.hurtEntity
    const equipmentInventory = event.hurtEntity.getComponent("equippable");
    if (event.hurtEntity?.typeId == 'minecraft:player' && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "cata:verdant_chestplate") {
        event.hurtEntity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.1, z: -playerEvent.getViewDirection().z * -0.1 }, 0.1);
    }
})

world.afterEvents.entityHurt.subscribe(event => {
    const equipmentInventory = event.hurtEntity.getComponent("equippable");
    const random = Math.random()
    const playerEvent = event.hurtEntity

    if (event.hurtEntity?.typeId == 'minecraft:player'
        && equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "cata:exodius_helmet"
        && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "cata:exodius_chestplate"
        && equipmentInventory.getEquipment(EquipmentSlot.Legs)?.typeId == "cata:exodius_leggings"
        && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId == "cata:exodius_boots") {
        event.hurtEntity.applyKnockback({ x: -playerEvent.getViewDirection().x * -0.1, z: -playerEvent.getViewDirection().z * -0.1 }, 0.1);


        if (!event.hurtEntity.getItemCooldown('exodius_set_bonus')) {
            if (random < 0.2) {
                //floret
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^^^90 floret")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^90 floret")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^90 floret")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^-90 floret")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^ floret")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^ floret")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^^^-90 floret")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^-90 floret")
                event.hurtEntity.startItemCooldown('exodius_set_bonus', 200)
                event.hurtEntity.removeEffect("poison");
                event.hurtEntity.removeEffect("fatal_poison")
                event.hurtEntity.addEffect("regeneration", TicksPerSecond * 10, { amplifier: 0, showParticles: true });
                event.hurtEntity.runCommand("playsound sound.blazing_excalibur @a[r=10] ~ ~ ~ 2 2 1")
                event.hurtEntity.runCommand("particle cata:floret_exodius_armor ~ ~1 ~")


            } else if (random < 0.5) {
                //solar
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^^^90 solar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^90 solar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^90 solar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^-90 solar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^ solar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^ solar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^^^-90 solar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^-90 solar")
                event.hurtEntity.startItemCooldown('exodius_set_bonus', 200)
                event.hurtEntity.removeEffect("wither")
                event.hurtEntity.addEffect("fire_resistance", TicksPerSecond * 25, { amplifier: 0, showParticles: true });
                event.hurtEntity.runCommand("playsound sound.blazing_excalibur @a[r=10] ~ ~ ~ 2 2 1")
                event.hurtEntity.runCommand("particle cata:solar_exodius_armor ~ ~1 ~")


            } else if (random < 1) {
                //lunar
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^^^90 lunar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^90 lunar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^90 lunar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^-90 lunar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^ lunar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^-90^^ lunar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^^^-90 lunar")
                event.hurtEntity.runCommand("/summon cata:exodius_armor_elements ^^1.2^ facing ^90^^-90 lunar")
                event.hurtEntity.startItemCooldown('exodius_set_bonus', 200)
                event.hurtEntity.removeEffect("levitation")
                event.hurtEntity.addEffect("resistance", TicksPerSecond * 10, { amplifier: 0, showParticles: true });
                event.hurtEntity.runCommand("playsound sound.blazing_excalibur @a[r=10] ~ ~ ~ 2 2 1")
                event.hurtEntity.runCommand("particle cata:lunar_exodius_armor ~ ~1 ~")


            } else return
        }
    }
})

