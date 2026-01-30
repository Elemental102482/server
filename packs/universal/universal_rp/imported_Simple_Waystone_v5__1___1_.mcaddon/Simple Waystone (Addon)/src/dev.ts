import { world } from "@minecraft/server"
import { apiInfo } from "./lib/apiInfo"
import { waystoneUi } from "./ui/mainUi"

world.afterEvents.itemUse.subscribe(({source: player, itemStack: item}) => {
  if(player.hasTag("dev") && item.typeId == "minecraft:stick"){
    world.sendMessage(`${JSON.stringify(world.getDynamicPropertyIds())}`)
    world.sendMessage(`§l§cPublic:§r ${JSON.stringify(apiInfo.getPublicWaypoint())}`)
    world.sendMessage(`§l§cPrivate:§r ${JSON.stringify(apiInfo.getPrivateWaypoint(player.id))}`)
    //player.setDynamicProperty("ws:waystoneConfig", JSON.stringify({
    //  organize: false,
    //  organizeDimension: 0,
    //  showDimension: 0,
    //  organizePublic: 0,
    //  showPublic: true
    //}))
  }
  if(player.hasTag("dev") && item.typeId == "minecraft:diamond_sword"){
    world.setDynamicProperty(`ws:waystonePrivate${player.id}=0`, JSON.stringify([]))
    //world.setDynamicProperty("ws:waystonePublic=0", JSON.stringify([]))
  }
  if(player.hasTag("dev") && item.typeId == "minecraft:golden_sword"){
    world.clearDynamicProperties()
  }
  if(player.hasTag("dev") && item.typeId == "minecraft:wooden_sword"){
    waystoneUi.createPoint(player, player.dimension.getBlock(player.location))
  }
})

world.afterEvents.entityHitBlock.subscribe(({damagingEntity: player, hitBlock: block}) => {
  if(player.hasTag("dev") && block.typeId.includes("ws:waystone")){
    world.sendMessage(`Claim - ${JSON.stringify(apiInfo.getClaimWaystones(block.location))}`)
  }
})