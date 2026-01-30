import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

const artefactData = [
  {
    artefactTypeId: "dungeons:totem_of_regeneration",
    artefactRareTypeId: "dungeons:rare_totem_of_regeneration",
    description: "Casts an area of healing for nearby players.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:soul_healer",
    artefactRareTypeId: "dungeons:rare_soul_healer",
    description: "Recovers health.",
    soulInfo: "\nConsumes 10 "
  },
  {
    artefactTypeId: "dungeons:iron_hide_amulet",
    artefactRareTypeId: "dungeons:rare_iron_hide_amulet",
    description: "Increases damage resistance.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:harvester",
    artefactRareTypeId: "dungeons:rare_harvester",
    description: "Creates a strong explosion.",
    soulInfo: "\nConsumes 15 "
  },
  {
    artefactTypeId: "dungeons:shock_powder",
    artefactRareTypeId: "dungeons:rare_shock_powder",
    description: "Stuns surrounding monsters.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:gong_of_weakening",
    artefactRareTypeId: "dungeons:rare_gong_of_weakening",
    description: "Weakens surrounding monsters.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:blast_fungus",
    artefactRareTypeId: "dungeons:rare_blast_fungus",
    description: "Launches bouncing explosives.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:totem_of_shielding",
    artefactRareTypeId: "dungeons:rare_totem_of_shielding",
    description: "Cast an area of resistance for nearby players.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:shadow_shifter",
    artefactRareTypeId: "dungeons:rare_shadow_shifter",
    description: "Grants shadow form.",
    soulInfo: "\nConsumes 8 "
  },
  {
    artefactTypeId: "dungeons:vexing_chant",
    artefactRareTypeId: "dungeons:rare_vexing_chant",
    description: "Summons helpful Vexes.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:satchel_of_elements",
    artefactRareTypeId: "dungeons:rare_satchel_of_elements",
    description: "Unleashes elemental attacks on monsters.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:wind_horn",
    artefactRareTypeId: "dungeons:rare_wind_horn",
    description: "Slows and launches nearby mobs.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:ice_wand",
    artefactRareTypeId: "dungeons:rare_ice_wand",
    description: "Creates chunks of ice.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:death_cap_mushroom",
    artefactRareTypeId: "dungeons:rare_death_cap_mushroom",
    description: "Increases attack power and speed.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:enchanted_grass",
    artefactRareTypeId: "dungeons:rare_enchanted_grass",
    description: "Summons a heroic sheep.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:corrupted_seeds",
    artefactRareTypeId: "dungeons:rare_corrupted_seeds",
    description: "Traps and poisons nearby monsters.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:boots_of_swiftness",
    artefactRareTypeId: "dungeons:rare_boots_of_swiftness",
    description: "Boosts your speed.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:lightning_rod",
    artefactRareTypeId: "dungeons:rare_lightning_rod",
    description: "Strike arcane lightning on foes.",
    soulInfo: "\nConsumes 8 "
  },
  {
    artefactTypeId: "dungeons:buzzy_nest",
    artefactRareTypeId: "dungeons:rare_buzzy_nest",
    description: "Places a nest of tamed bees.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:light_feather",
    artefactRareTypeId: "dungeons:rare_light_feather",
    description: "Stuns nearby mobs and launches you far.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:golem_kit",
    artefactRareTypeId: "dungeons:rare_golem_kit",
    description: "Summons an Iron Golem.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:updraft_tome",
    artefactRareTypeId: "dungeons:rare_updraft_tome",
    description: "Levitates up to 7 foes.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:enchanters_tome",
    artefactRareTypeId: "dungeons:rare_enchanters_tome",
    description: "Enchants your summoned mobs.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:scatter_mines",
    artefactRareTypeId: "dungeons:rare_scatter_mines",
    description: "Places deadly bombs on the floor.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:eye_of_the_guardian",
    artefactRareTypeId: "dungeons:rare_eye_of_the_guardian",
    description: "Fires a powerful laser.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:satchel_of_snacks",
    artefactRareTypeId: "dungeons:rare_satchel_of_snacks",
    description: "Replenishes health and hunger.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:satchel_of_elixirs",
    artefactRareTypeId: "dungeons:rare_satchel_of_elixirs",
    description: "Grants various effects.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:totem_of_casting",
    artefactRareTypeId: "dungeons:rare_totem_of_casting",
    description: "Reduces cooldowns in range.",
    soulInfo: "\nConsumes 15 "
  },
  {
    artefactTypeId: "dungeons:powershaker",
    artefactRareTypeId: "dungeons:rare_powershaker",
    description: "Adds area damage to each hit.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:corrupted_beacon",
    artefactRareTypeId: "dungeons:rare_corrupted_beacon",
    description: "Fires a soul beam.",
    soulInfo: "\nConsumes Variable "
  },
  {
    artefactTypeId: "dungeons:corrupted_pumpkin",
    artefactRareTypeId: "dungeons:corrupted_pumpkin",
    description: "Fires a soul beam.",
    soulInfo: "\nConsumes Variable "
  },
  {
    artefactTypeId: "dungeons:ghost_cloak",
    artefactRareTypeId: "dungeons:rare_ghost_cloak",
    description: "Grants temporary ghost form.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:soul_lantern",
    artefactRareTypeId: "dungeons:rare_soul_lantern",
    description: "Summons a friendly wizard to fight enemies.",
    soulInfo: "\nConsumes 13 "
  },
  {
    artefactTypeId: "dungeons:tome_of_duplication",
    artefactRareTypeId: "dungeons:rare_tome_of_duplication",
    description: "Copies a previously used artefact.",
    soulInfo: ""
  },
  {
    artefactTypeId: "dungeons:spinblade",
    artefactRareTypeId: "dungeons:spinblade",
    description: "Fires a boomerang-like projectile.",
    soulInfo: ""
  }
];

system.runInterval(() => world.getAllPlayers().forEach(player => {
  const hand = player.getComponent('minecraft:equippable').getEquipmentSlot('Mainhand')
  if (!hand.hasItem() || hand.maxAmount !== 1) return
  if (hand.getLore().length !== 0) {
    return;
  }
  const foundArtefact = artefactData.find(artefact => artefact.artefactTypeId === hand.type.id || artefact.artefactRareTypeId === hand.type.id);
  if (!foundArtefact) return;
  hand.setLore([`§7${foundArtefact.description}§c${foundArtefact.soulInfo}`])
}), 4)




const weaponData = [
  {
    uniqueTypeId: "dungeons:highlands_axe",
    enchant: "Stunning"
  },
  {
    uniqueTypeId: "dungeons:firebrand",
    enchant: "Burning"
  },
  {
    uniqueTypeId: "dungeons:growing_staff",
    enchant: "Committed"
  },
  {
    uniqueTypeId: "dungeons:battlestaff_of_terror",
    enchant: "Exploding"
  },
  {
    uniqueTypeId: "dungeons:bone_cudgel",
    enchant: "Illagers Bane"
  },
  {
    uniqueTypeId: "dungeons:great_axeblade",
    enchant: "Swirling"
  },
  {
    uniqueTypeId: "dungeons:broadsword",
    enchant: "Sharpened"
  },
  {
    uniqueTypeId: "dungeons:heartstealer",
    enchant: "Leeching"
  },
  {
    uniqueTypeId: "dungeons:whirlwind",
    enchant: "Shockwave"
  },
  {
    uniqueTypeId: "dungeons:cursed_axe",
    enchant: "Exploding"
  },
  {
    uniqueTypeId: "dungeons:hammer_of_gravity",
    enchant: "Gravity"
  },
  {
    uniqueTypeId: "dungeons:stormlander",
    enchant: "Thundering"
  },
  {
    uniqueTypeId: "dungeons:masters_katana",
    enchant: "Critical Hit"
  },
  {
    uniqueTypeId: "dungeons:dark_katana",
    enchant: "Smiting"
  },
  {
    uniqueTypeId: "dungeons:truthseeker",
    enchant: "Committed"
  },
  {
    uniqueTypeId: "dungeons:eternal_knife",
    enchant: "Soul Siphon"
  },
  {
    uniqueTypeId: "dungeons:starless_night",
    enchant: "Shared Pain"
  },
  {
    uniqueTypeId: "dungeons:bee_stinger",
    enchant: "Busy Bee"
  },
  {
    uniqueTypeId: "dungeons:freezing_foil",
    enchant: "Freezing"
  },
  {
    uniqueTypeId: "dungeons:jailors_scythe",
    enchant: "Chains"
  },
  {
    uniqueTypeId: "dungeons:frost_scythe",
    enchant: "Freezing"
  },
  {
    uniqueTypeId: "dungeons:moon_daggers",
    enchant: "Enigma Resonator"
  },
  {
    uniqueTypeId: "dungeons:sheer_daggers",
    enchant: "Swirling"
  },
  {
    uniqueTypeId: "dungeons:frost_knives",
    enchant: "Freezing"
  },
  {
    uniqueTypeId: "dungeons:nameless_blade",
    enchant: "Weakening"
  },
  {
    uniqueTypeId: "dungeons:dancers_sword",
    enchant: "Rampaging"
  },
  {
    uniqueTypeId: "dungeons:hawkbrand",
    enchant: "Critical Hit"
  },
  {
    uniqueTypeId: "dungeons:diamond_sword",
    enchant: "Sharpened"
  },
  {
    uniqueTypeId: "dungeons:vine_whip",
    enchant: "Poison"
  },
  {
    uniqueTypeId: "dungeons:resolute_tempest_knife",
    enchant: "Committed"
  },
  {
    uniqueTypeId: "dungeons:chill_gale_knife",
    enchant: "Freezing"
  },
  {
    uniqueTypeId: "dungeons:encrusted_anchor",
    enchant: "Poison"
  },
  {
    uniqueTypeId: "dungeons:sponge_striker",
    enchant: "Soaks up damage"
  },
  {
    uniqueTypeId: "dungeons:mechanised_sawblade",
    enchant: "Resiliance"
  },
  {
    uniqueTypeId: "dungeons:maulers",
    enchant: "Rampaging"
  },
  {
    uniqueTypeId: "dungeons:soul_fists",
    enchant: "Enigma Resonator"
  },
  {
    uniqueTypeId: "dungeons:fighters_bindings",
    enchant: "Triple Attacks"
  },
  {
    uniqueTypeId: "dungeons:grave_bane",
    enchant: "Smiting"
  },
  {
    uniqueTypeId: "dungeons:venom_glaive",
    enchant: "Poison Cloud"
  },
  {
    uniqueTypeId: "dungeons:swift_striker",
    enchant: "Echo"
  },
  {
    uniqueTypeId: "dungeons:the_beginning_and_the_end",
    enchant: "Leeching"
  },



  {
    uniqueTypeId: "dungeons:guardian_bow",
    enchant: "Knockback"
  },
  {
    uniqueTypeId: "dungeons:red_snake",
    enchant: "Fuse Shot"
  },
  {
    uniqueTypeId: "dungeons:firebolt_thrower",
    enchant: "Quick Charge"
  },
  {
    uniqueTypeId: "dungeons:imploding_crossbow",
    enchant: "Gravity"
  },
  {
    uniqueTypeId: "dungeons:soul_hunter_crossbow",
    enchant: "Enigma Resonator"
  },
  {
    uniqueTypeId: "dungeons:corrupted_crossbow",
    enchant: "Critical Hit"
  },
  {
    uniqueTypeId: "dungeons:feral_soul_crossbow",
    enchant: "Enigma Resonator"
  },
  {
    uniqueTypeId: "dungeons:voidcaller",
    enchant: "Gravity"
  },
  {
    uniqueTypeId: "dungeons:winters_touch",
    enchant: "Stunning"
  },
  {
    uniqueTypeId: "dungeons:burst_gale_bow",
    enchant: "Quick Drawing"
  },
  {
    uniqueTypeId: "dungeons:echo_of_the_valley",
    enchant: "Ricochet"
  },
  {
    uniqueTypeId: "dungeons:bonebow",
    enchant: "Growing"
  },
  {
    uniqueTypeId: "dungeons:twin_bow",
    enchant: "Ricochet"
  },
  {
    uniqueTypeId: "dungeons:nautical_crossbow",
    enchant: "Piercing"
  },
  {
    uniqueTypeId: "dungeons:weeping_vine_bow",
    enchant: "Quick Drawing"
  },
  {
    uniqueTypeId: "dungeons:pride_of_the_piglins",
    enchant: "Piercing"
  },
  {
    uniqueTypeId: "dungeons:doom_crossbow",
    enchant: "Piercing"
  },
  {
    uniqueTypeId: "dungeons:slayer_crossbow",
    enchant: "Ricochet"
  },
  {
    uniqueTypeId: "dungeons:nocturnal_bow",
    enchant: "Tempo Theft"
  },
  {
    uniqueTypeId: "dungeons:bow_of_lost_souls",
    enchant: "Bonus Shot"
  },
  {
    uniqueTypeId: "dungeons:call_of_the_void",
    enchant: "Fuse Shot"
  },
  {
    uniqueTypeId: "dungeons:veiled_crossbow",
    enchant: "Shadow Barb"
  }
];

system.runInterval(() => world.getAllPlayers().forEach(player => {
  const hand2 = player.getComponent('minecraft:equippable').getEquipmentSlot('Mainhand')
  if (!hand2.hasItem() || hand2.maxAmount !== 1) return
  if (hand2.getLore().length !== 0) {
    return;
  }
  const foundWeapon = weaponData.find(unique => unique.uniqueTypeId === hand2.type.id);
  if (!foundWeapon) return;
  hand2.setLore([`§r§7${foundWeapon.enchant} `])
}), 4)




const armourData = [
  {
    helmetTypeId: "dungeons:titans_shroud_helmet",
    chestplateTypeId: "dungeons:titans_shroud_chestplate",
    leggingsTypeId: "dungeons:titans_shroud_leggings",
    bootsTypeId: "dungeons:titans_shroud_boots",
    enchant: "20% Damage Reduction"
  },
  {
    helmetTypeId: "dungeons:fox_helmet",
    chestplateTypeId: "dungeons:fox_chestplate",
    leggingsTypeId: "dungeons:fox_leggings",
    bootsTypeId: "dungeons:fox_boots",
    enchant: "Halves Weapon Cooldowns"
  },
  {
    helmetTypeId: "dungeons:black_wolf_helmet",
    chestplateTypeId: "dungeons:black_wolf_chestplate",
    leggingsTypeId: "dungeons:black_wolf_leggings",
    bootsTypeId: "dungeons:black_wolf_boots",
    enchant: "Boosts Attack Strength"
  },
  {
    helmetTypeId: "dungeons:frost_helmet",
    chestplateTypeId: "dungeons:frost_chestplate",
    leggingsTypeId: "dungeons:frost_leggings",
    bootsTypeId: "dungeons:frost_boots",
    enchant: "Slows enemies"
  },
  {
    helmetTypeId: "dungeons:wither_helmet",
    chestplateTypeId: "dungeons:wither_chestplate",
    leggingsTypeId: "dungeons:wither_leggings",
    bootsTypeId: "dungeons:wither_boots",
    enchant: "Leeching"
  },
  {
    helmetTypeId: "dungeons:ember_helmet",
    chestplateTypeId: "dungeons:ember_chestplate",
    leggingsTypeId: "dungeons:ember_leggings",
    bootsTypeId: "dungeons:ember_boots",
    enchant: "Burns attacking enemies"
  },
  {
    helmetTypeId: "dungeons:verdant_helmet",
    chestplateTypeId: "dungeons:verdant_chestplate",
    leggingsTypeId: "dungeons:verdant_leggings",
    bootsTypeId: "dungeons:verdant_boots",
    enchant: "Doubles collected souls"
  },
  {
    helmetTypeId: "dungeons:shadow_walker_helmet",
    chestplateTypeId: "dungeons:shadow_walker_chestplate",
    leggingsTypeId: "dungeons:shadow_walker_leggings",
    bootsTypeId: "dungeons:shadow_walker_boots",
    enchant: "Damage resistance while sprinting"
  },
  {
    helmetTypeId: "dungeons:opulent_helmet",
    chestplateTypeId: "dungeons:opulent_chestplate",
    leggingsTypeId: "dungeons:opulent_leggings",
    bootsTypeId: "dungeons:opulent_boots",
    enchant: "Prevents damage after level up"
  },
  {
    helmetTypeId: "dungeons:gilded_glory_helmet",
    chestplateTypeId: "dungeons:gilded_glory_chestplate",
    leggingsTypeId: "dungeons:gilded_glory_leggings",
    bootsTypeId: "dungeons:gilded_glory_boots",
    enchant: "Converts levels into health"
  },
  {
    helmetTypeId: "dungeons:nimble_turtle_helmet",
    chestplateTypeId: "dungeons:nimble_turtle_chestplate",
    leggingsTypeId: "dungeons:nimble_turtle_leggings",
    bootsTypeId: "dungeons:nimble_turtle_boots",
    enchant: "Boosts speed when injured"
  },
  {
    helmetTypeId: "dungeons:glow_squid_helmet",
    chestplateTypeId: "dungeons:glow_squid_chestplate",
    leggingsTypeId: "dungeons:glow_squid_leggings",
    bootsTypeId: "dungeons:glow_squid_boots",
    enchant: "Boosted damage immunity"
  },
  {
    helmetTypeId: "dungeons:spider_helmet",
    chestplateTypeId: "dungeons:spider_chestplate",
    leggingsTypeId: "dungeons:spider_leggings",
    bootsTypeId: "dungeons:spider_boots",
    enchant: "Lifesteal Aura"
  },
  {
    helmetTypeId: "dungeons:living_vines_helmet",
    chestplateTypeId: "dungeons:living_vines_chestplate",
    leggingsTypeId: "dungeons:living_vines_leggings",
    bootsTypeId: "dungeons:living_vines_boots",
    enchant: "Poison Heal Aura"
  },
  {
    helmetTypeId: "dungeons:black_spot_helmet",
    chestplateTypeId: "dungeons:black_spot_chestplate",
    leggingsTypeId: "dungeons:black_spot_leggings",
    bootsTypeId: "dungeons:black_spot_boots",
    enchant: "Artefact use grants healing"
  },
  {
    helmetTypeId: "dungeons:golden_piglin_helmet",
    chestplateTypeId: "dungeons:golden_piglin_chestplate",
    leggingsTypeId: "dungeons:golden_piglin_leggings",
    bootsTypeId: "dungeons:golden_piglin_boots",
    enchant: "Artefact use grants healing"
  },
  {
    helmetTypeId: "dungeons:ender_helmet",
    chestplateTypeId: "dungeons:ender_chestplate",
    leggingsTypeId: "dungeons:ender_leggings",
    bootsTypeId: "dungeons:ender_boots",
    enchant: "May teleport you away from danger"
  },
  {
    helmetTypeId: "dungeons:troubadour_helmet",
    chestplateTypeId: "dungeons:troubadour_chestplate",
    leggingsTypeId: "dungeons:troubadour_leggings",
    bootsTypeId: "dungeons:troubadour_boots",
    enchant: "Negative Status Reduction"
  },
  {
    helmetTypeId: "dungeons:sturdy_shulker_helmet",
    chestplateTypeId: "dungeons:sturdy_shulker_chestplate",
    leggingsTypeId: "dungeons:sturdy_shulker_leggings",
    bootsTypeId: "dungeons:sturdy_shulker_boots",
    enchant: "Levitates and stuns nearby foes"
  },
  {
    helmetTypeId: "dungeons:unstable_helmet",
    chestplateTypeId: "dungeons:unstable_chestplate",
    leggingsTypeId: "dungeons:unstable_leggings",
    bootsTypeId: "dungeons:unstable_boots",
    enchant: "Explosive Teleportation"
  },
  {
    helmetTypeId: "dungeons:full_metal_helmet",
    chestplateTypeId: "dungeons:full_metal_chestplate",
    leggingsTypeId: "dungeons:full_metal_leggings",
    bootsTypeId: "dungeons:full_metal_boots",
    enchant: "Boosts Attack Strength"
  },
  {
    helmetTypeId: "dungeons:ghost_kindler_helmet",
    chestplateTypeId: "dungeons:ghost_kindler_chestplate",
    leggingsTypeId: "dungeons:ghost_kindler_leggings",
    bootsTypeId: "dungeons:ghost_kindler_boots",
    enchant: "Burning Sprint Aura"
  }
];

system.runInterval(() => world.getAllPlayers().forEach(player => {
  const hand = player.getComponent('minecraft:equippable').getEquipmentSlot('Mainhand')
  if (!hand.hasItem() || hand.maxAmount !== 1) return
  if (hand.getLore().length !== 0) {
    if (hand.type.id == "dungeons:fox_helmet" || hand.type.id == "dungeons:fox_chestplate" || hand.type.id == "dungeons:fox_leggings" || hand.type.id == "dungeons:fox_boots") {
      for (const lore of hand.getLore()) {
        if (lore == "§r§7Boosts Sprint Speed ") {
          hand.setLore()
        }
      }
    }
    return;
  }
  const foundItem = armourData.find(unique => unique.helmetTypeId === hand.type.id || unique.chestplateTypeId === hand.type.id || unique.leggingsTypeId === hand.type.id || unique.bootsTypeId === hand.type.id);
  if (!foundItem) return;
  hand.setLore([`§r§7${foundItem.enchant} `])
}), 4)



const limitedData = [
  {
    uniqueTypeId: "dungeons:skull_scythe",
    enchant: "Freezing"
  },
  {
    uniqueTypeId: "dungeons:bonehead_hammer",
    enchant: "Gravity"
  },
  {
    uniqueTypeId: "dungeons:sinister_sword",
    enchant: "Critical Hit"
  },
  {
    uniqueTypeId: "dungeons:haunted_bow",
    enchant: "Ricochet"
  },
  {
    uniqueTypeId: "dungeons:cackling_broom",
    enchant: "Smiting"
  },
  {
    uniqueTypeId: "dungeons:webbed_bow",
    enchant: "Stunning"
  },
  {
    uniqueTypeId: "dungeons:shrieking_crossbow",
    enchant: "Shadow Barb"
  }
];

system.runInterval(() => world.getAllPlayers().forEach(player => {
  const hand = player.getComponent('minecraft:equippable').getEquipmentSlot('Mainhand')
  if (!hand.hasItem() || hand.maxAmount !== 1) return
  if (hand.getLore().length !== 0) {
    return;
  }
  const foundItem = limitedData.find(limited => limited.uniqueTypeId === hand.type.id);
  if (!foundItem) return;
  hand.setLore([`§r§7${foundItem.enchant} `])
}), 4)


const limitedArmourData = [
  {
    helmetTypeId: "dungeons:spooky_gourdian_helmet",
    chestplateTypeId: "dungeons:spooky_gourdian_chestplate",
    leggingsTypeId: "dungeons:spooky_gourdian_leggings",
    bootsTypeId: "dungeons:spooky_gourdian_boots",
    enchant: "Leeching"
  },
  {
    helmetTypeId: "dungeons:cauldron_helmet",
    chestplateTypeId: "dungeons:cauldron_chestplate",
    leggingsTypeId: "dungeons:cauldron_leggings",
    bootsTypeId: "dungeons:cauldron_boots",
    enchant: "Boosts Attack Strength"
  },
  {
    helmetTypeId: "dungeons:cloaked_skull_helmet",
    chestplateTypeId: "dungeons:cloaked_skull_chestplate",
    leggingsTypeId: "dungeons:cloaked_skull_leggings",
    bootsTypeId: "dungeons:cloaked_skull_boots",
    enchant: "Burning Sprint Aura"
  }
];

system.runInterval(() => world.getAllPlayers().forEach(player => {
  const hand = player.getComponent('minecraft:equippable').getEquipmentSlot('Mainhand')
  if (!hand.hasItem() || hand.maxAmount !== 1) return
  if (hand.getLore().length !== 0) {
    return;
  }
  const foundItem = limitedArmourData.find(unique => unique.helmetTypeId === hand.type.id || unique.chestplateTypeId === hand.type.id || unique.leggingsTypeId === hand.type.id || unique.bootsTypeId === hand.type.id);
  if (!foundItem) return;
  hand.setLore([`§r§7${foundItem.enchant} `])
}), 4)