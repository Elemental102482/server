import {
  world,
  system,
  ItemStack
} from "@minecraft/server";

/*sup nerd
this aint coming to the addon anytime soon
literally just testing
cos
it entered my mind
and like
why not? right?
im bored as rn
so
gimme a break
ya?
cya
*/

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id !== "dungeons:gild") return;
  const player = event.sourceEntity;
  const message = event.message;
  const enchant = message.charAt(0).toUpperCase() + message.slice(1)
  const hand = player.getComponent('minecraft:equippable').getEquipmentSlot('Mainhand')

  hand.nameTag = "§r§e" + hand.nameTag + "§r"
  hand.setLore([`§r§7${enchant} `])
  hand.setDynamicProperty("dungeons:gild", enchant)
})