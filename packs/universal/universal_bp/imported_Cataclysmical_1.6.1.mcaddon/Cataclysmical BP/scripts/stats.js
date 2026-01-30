import { WeaponStatsSerializer } from "./IPC/weapon_stats.ipc";
import { IPC, PROTO } from './IPC/ipc';
import { world, system } from "@minecraft/server";

const weaponStats = [
    {
        id: "cata:bonebreaker",
        attackSpeed: 1,
        damage: 12,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item, target }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:anchor",
        attackSpeed: 1,
        damage: 7,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:nebulous_greatsword",
        attackSpeed: 1.3,
        damage: 15,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:wooden_greatsword",
        attackSpeed: 1.4,
        damage: 5,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:stone_greatsword",
        attackSpeed: 1.4,
        damage: 6,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:iron_greatsword",
        attackSpeed: 1.4,
        damage: 7,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:diamond_greatsword",
        attackSpeed: 1.4,
        damage: 8,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:netherite_greatsword",
        attackSpeed: 1.4,
        damage: 9,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:divine_scythe_of_heaven",
        attackSpeed: 1.4,
        damage: 25,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:meowclysm",
        attackSpeed: 1.4,
        damage: 25,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:moonlight",
        attackSpeed: 1.6,
        damage: 15,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:phantasma_greatsword",
        attackSpeed: 1.6,
        damage: 2,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:phoenix_blade",
        attackSpeed: 1,
        damage: 14,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:platinum_greatsword",
        attackSpeed: 1.6,
        damage: 6,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:platinum_halberd",
        attackSpeed: 0.9,
        damage: 8,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:sunlight",
        attackSpeed: 1.6,
        damage: 12,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:verdant_blade",
        attackSpeed: 1,
        damage: 9,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:verdant_greatsword",
        attackSpeed: 1.6,
        damage: 12,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:verdant_hatchet",
        attackSpeed: 1,
        damage: 5,
        isWeapon: true,
        sweep: true,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:verdant_sword",
        attackSpeed: 1.6,
        damage: 7,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:blazing_excalibur",
        attackSpeed: 1.5,
        damage: 12,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:stellar_greatsword",
        attackSpeed: 1.5,
        damage: 7,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:exodius_greatsword",
        attackSpeed: 1.5,
        damage: 15,
        isWeapon: true,
        sweep: true,
        disableShield: false,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:everbloom",
        attackSpeed: 1,
        damage: 10,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:floret_hatchet",
        attackSpeed: 1.2,
        damage: 7,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:morningstar",
        attackSpeed: 1,
        damage: 8,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
    {
        id: "cata:stellar_mace",
        attackSpeed: 1,
        damage: 18,
        isWeapon: true,
        sweep: false,
        disableShield: true,
        beforeEffect: ({ mc, player, item }) => {
            const equippableComp = player.getComponent("equippable");
            const mainhand = equippableComp?.getEquipment("Mainhand");
            equippableComp.setEquipment("Mainhand", item);
        }
    },
]

world.afterEvents.worldLoad.subscribe(event => {
    IPC.send("sweep-and-slash:register-weapons", PROTO.Array(WeaponStatsSerializer), weaponStats)
})