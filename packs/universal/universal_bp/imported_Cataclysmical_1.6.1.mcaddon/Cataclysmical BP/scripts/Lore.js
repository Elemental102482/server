
import { world, system } from "@minecraft/server"

const lores = {
	//"cata:": [""],

	//trinkets
	"cata:phantasma_necklace": ["§r§6Cooldown:§e 45", "§r§7Summons 2 baby Plasmas for each", "§r§7stage of Terror when below 5 hearts"],
	"cata:stellar_ring": ["§r§6Cooldown:§e 4", "§r§7Chance to deal +3 Astral Crit Damage"],
	"cata:sun_necklace": ["§r§7Gain Health Boost II, Fire Resistance", "§r§7and Resistance"],
	"cata:sun_ring": ["§r§7+2 Attack Damage and set mobs on fire"],
	"cata:solar_necklace": ["§r§7Gain Fire Resistance and Resistance", "§r§7in the nether but gives Weakness in", "§r§7other Dimensions"],
	"cata:terror_eye": ["§r§7Reduces Terror Chance by half"],
	"cata:stellar_necklace": ["§r§7Gain Slow Falling when falling"],
	"cata:floret_necklace": ["§r§7Immunity to Poison and Wither"],
	"cata:phantasma_ring": ["§r§7Double xp for each stage of Terror"],
	"cata:calibrated_stellar_core": ["§r§6Cooldown:§e 5", "§r§7Gain Regeneration when below 8 hearts", "§r§7Regenerates players around you", "§r§7Has a cooldown when hurt"],
	"cata:solar_ring": ["§r§6Cooldown:§e 30", "§r§7Gain a burst of Fire Resistance", "§r§7and Strength when below 5 hearts"],
	"cata:stellar_charm": ["§r§6Cooldown:§e 5", "§r§7Gain Regeneration from", "§r§7killing undead mobs"],
	"cata:solar_absorption": ["§r§7Solar Ore gives xp"],
	"cata:floret_absorption": ["§r§7Floret Ore gives xp"],
	"cata:floret_ring": ["§r§6Cooldown:§e 60", "§r§7Summons a Verdant Minion ", "§r§7when killing undead mobs"],
	"cata:verdant_ring": ["§r§7Damage Reduction from Projectiles"],
	"cata:sun_engine": ["§r§7Burns any mob near the player", "§r§7when below 5 hearts"],
	"cata:astro_jelly_in_a_bottle": ["§r§6Cooldown:§e 5", "§r§7Gives the player a double jump"],
	"cata:solar_aegis": ["§r§6Cooldown:§e 30", "§r§7+3 Aegis Protection", "§r§7Greater Knockback Resistance", "§r§7Burns mobs on hurt"],
	"cata:blooming_aegis": ["§r§6Cooldown:§e 35", "§r§7+2 Aegis Protection", "§r§7Lesser Knockback Resistance", "§r§7Poison mobs on hurt"],
	"cata:verdant_aegis": ["§r§6Cooldown:§e 35", "§r§7+1 Aegis Protection", "§r§7Lesser Knockback Resistance"],

	//items
	"cata:nebulous_greatsword": ["", "§r§7On Kill Mob:", "§r§8 Fills up the Nebulous Meter", "§r§7On Right Click:", "§r§8 When the Meter is full the player gains Regeneration", "§r§8 and +20 Damage for 15 seconds"],
	"cata:cosmic_fragment": ["", "§r§7On Right Click:", "§r§8 Attracts Unwanted Attention..."],
	"cata:recall_mirror": ["", "§r§7On Right Click:", "§r§8 Teleport to your set Spawn Point"],
	"cata:morningstar": ["", "§r§7On Hurt Mob:", "§r§8 Deal a solar burst dealing +10 Damage"],
	"cata:floret_hatchet": ["", "§r§7On Hurt Mob:", "§r§8 Stun mobs and deal poison aoe Damage "],
	"cata:everbloom": ["", "§r§7On Hurt Mob:", "§r§8 Poison aoe Damage ", "§r§8 Summons 3 Floret Elements"],
	"cata:sunflare_pickaxe": ["§r§cChampion Item"],
	"cata:divine_scythe_of_heaven": ["§r§eScythe from the Heavens", "", "§r§7On Hurt Mob:", "§r§8 Summons a 3 Phantom Scythes", "§r§7On Right Click:", "§r§8 Summons a Sun Totem", "§r§8 burning every mob in a 16x16 area", "§r§cFlawless Item"],
	"cata:exodius_greatsword": ["", "§r§7On Hurt Mob:", "§r§8 Summons 3 Elements", "§r§8 each Element does something different"],
	"cata:phoenix_blade": ["", "§r§7On Hurt Mob:", "§r§8 Summons a Phantom Blade", "§r§7On Right Click:", "§r§8 Hold Crouch to summon 4 Phantom Blades", "§r§cChampion Item"],
	"cata:moonlight": ["", "§r§7On Right Click:", "§r§8 Hold Crouch to summon", "§r§8 a Phantom Blade", "", "§r§7Right click to summon §eSunlight"],
	"cata:sunlight": ["", "§r§7On Hurt Mob:", "§r§8 Mobs Summon a Sun Orb on death Breaking", "§r§8 the orb will deal Area Damage to all mobs", "", "§r§7Right click to summon §bMoonlight"],
	"cata:wooden_greatsword": ["§r§9+2 Crit Damage",],
	"cata:stone_greatsword": ["§r§9+2 Crit Damage",],
	"cata:iron_greatsword": ["§r§9+2 Crit Damage",],
	"cata:diamond_greatsword": ["§r§9+2 Crit Damage",],
	"cata:netherite_greatsword": ["§r§9+2 Crit Damage",],
	"cata:anchor": ["§r§7Dumbest weapon of all time", "", "§r§7On Hurt Mob:", "§r§8 Pulls mobs to the player", "§r§eCommunity Item"],
	"cata:meowclysm": ["§r§7Greatest weapon of all time", "", "§r§7On Hurt Mob:", "§r§8 Makes cat noises!", "§r§dDeveloper Item"],
	"cata:bonebreaker": ["", "§r§7On Hurt Mob:", "§r§8 Deals slowness and weakness"],
	"cata:verdant_blade": ["", "§r§7On Hurt Mob:", "§r§8 Deals extra Damage, slowness and weakness", "§r§cChampion Item"],
	"cata:stellar_mace": ["", "§r§7On Hurt Mob:", "§r§8 Attacking when on cooldown gives Weakness"],
	"cata:terror_guide": ["", "§r§bTerror System Guide", "§r§7 Killing elemental mobs can increase Terror.", "§r§7 Mobs do +1 Damage for each stage. Going Passed", "§r§7 stage 5 will attract unwanted attention and reset.", "§r§a There are ways to remove or control Terror.", "", "§r§cHave Fun!"],
	"cata:verdant_greatsword": ["§r§7Holds the soul of the Verdant Sentinel", "", "§r§7On Hurt Mob:", "§r§8 Summons a Verdant Sentinal fist", "§r§cFlawless Item"],
	"cata:terrorite_rock": ["", "§r§9+20 Projectile Damage", "§r§7Just a rock..."],
	"cata:platinum_greatsword": ["§r§9+4 Attack Damage to Elemental Mobs"],
	"cata:platinum_halberd": ["§r§9+4 Attack Damage to Elemental Mobs"],
	"cata:blazing_excalibur": ["", "§r§7On Right Click:", "§r§8 Set your heart ablaze", "§r§8 Deal +14 Damage while being scorched"],
	"cata:floret_wand": ["", "§r§9+10 Projectile Damage"],
	"cata:solar_wand": ["", "§r§9+13 Projectile Damage"],
	"cata:terror_skull_launcher": ["", "§r§9+20 Projectile Damage"],
	"cata:stellar_greatsword": ["§r§9+3 Astral Crit Damage"],
	"cata:stellar_wand": ["", "§r§9+7 Projectile Damage", "§r§9+3 Astral Crit Damage"],
	"cata:ray_gun": ["", "§r§9+10 Projectile Damage", "", "§r§7On Right Click:", "§r§8 Chance to overload when shooting"],
	"cata:sealed_heart": ["§r§8Place in the center of a Ancient Alter", "§r§8Right Click to summon the Sun God"],
	"cata:spore_thrower": ["", "§r§9+14 Projectile Damage"],
	"cata:terror_detector": ["", "§r§7On Right Click:", "§r§8 Shows Terror Stages"],
	"cata:phantasma_greatsword": ["", "§r§7On Hurt Mob:", "§r§8 Does 2 extra attack Damage for ", "§r§8 each stage of Terror"],
	"cata:stellar_helmet": ["", "§r§7Full Set Bonus:", "§r§8 Gives 2 extra Hearts ", "§r§8 and Built-in Thorns"],
	"cata:stellar_chestplate": ["", "§r§7Full Set Bonus:", "§r§8 Gives 2 extra Hearts ", "§r§8 and Built-in Thorns"],
	"cata:stellar_leggings": ["", "§r§7Full Set Bonus:", "§r§8 Gives 2 extra Hearts ", "§r§8 and Built-in Thorns"],
	"cata:stellar_boots": ["", "§r§7Full Set Bonus:", "§r§8 Gives 2 extra Hearts ", "§r§8 and Built-in Thorns"],

	"cata:exodius_helmet": ["", "§r§7Full Set Bonus:", "§r§8 Summons a burst of Elements on hurt", "§r§8 on Burst the player is given", "§r§8 a effect based of the element"],
	"cata:exodius_chestplate": ["", "§r§7Full Set Bonus:", "§r§8 Summons a burst of Elements on hurt", "§r§8 on Burst the player is given", "§r§8 a effect based of the element"],
	"cata:exodius_leggings": ["", "§r§7Full Set Bonus:", "§r§8 Summons a burst of Elements on hurt", "§r§8 on Burst the player is given", "§r§8 a effect based of the element"],
	"cata:exodius_boots": ["", "§r§7Full Set Bonus:", "§r§8 Summons a burst of Elements on hurt", "§r§8 on Burst the player is given", "§r§8 a effect based of the element"],

	"cata:verdant_helmet": ["", "§r§7Set Bonus:", "§r§8 Removes all poisonous effects"],
	"cata:verdant_chestplate": ["", "§r§7Set Bonus:", "§r§8 Removes all poisonous effects", "§r§8 Gives Resistance, slowness and weakness"]
};

system.runInterval(() => {
	for (const player of world.getPlayers()) {
		const playerInv = player.getComponent("inventory").container;
		const items = Array.from({ length: playerInv.size })
			.map((_, i) => playerInv.getItem(i));
		items.forEach((item, slot) => {
			if (item?.typeId in lores) {
				if (item.getLore() == "") {
					const lore = lores[item.typeId]
						.map(line => typeof line === 'function' ? line(player) : line);
					item.setLore(lore);
					playerInv.setItem(slot, item);
				}
			}
		})
	}
}, 1);

world.afterEvents.playerSpawn.subscribe((event => {
	if (!event.player.hasTag('Spawn_item')) {
		event.player.runCommand('give @s cata:terror_guide')
		event.player.runCommand('give @s cata:terror_detector')
		event.player.addTag('Spawn_item')
	}
}))
