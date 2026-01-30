import {world, system} from "@minecraft/server"
import backpackUtils from "./backpackUtils"

system.afterEvents.scriptEventReceive.subscribe(({id, message, sourceEntity})=>{
    const idArr = id.split(":")
    const cmd = `!${idArr[0]} ${idArr[1]} ${message}`
    commands(cmd, sourceEntity)
})

function commands(message, sender){
    let cmd = message.split(" ")
    let isPlayerOP = true //sender.hasTag("op") ? true : false

    if(cmd.length>1){
        if(cmd[0].trim() == "!bps"){
            switch(cmd[1]){
                case "sudo":
                    const playerName = cmd[2]
                    if(playerName == null){
                        sender.sendMessage(`§cMust have a player name.`)
                        return
                    }
                    if(cmd[3] == null){
                        sender.sendMessage(`§cMust have a valid command.`)
                        return
                    }
                    if(cmd[4] == null) cmd[4] = ""
                    const command = ("!" + cmd[3].split(":").join(" ") + " " +cmd.splice(4).join(" ")).trim()
                    const player = world.getPlayers({name:playerName})
                    if(player.length){
                        commands(command, player[0])
                    }else{
                        sender.sendMessage(`§cPlayer does not exist.`)
                    }
                break

                case "refresh":
                    if(!isPlayerOP){
                        sender.sendMessage(`[Backpack+] OP required to use this command.`)
                        return
                    }
                    restartBackpackAddon()
                    sender.sendMessage(`§e[Backpack+] Restarted Backpack Addon.`)                 
                break

                case "clear":
                    if(cmd[2] == "bp"){
                        if(!isPlayerOP){
                            sender.sendMessage(`[Backpack+] OP required to use this command.`)
                            return
                        }
                        var bpQuery = {families:["backpack"]}
                        var bpEntities = backpackUtils.getBackpackEntityByQuery(bpQuery)
                        let count = 0
                        for(let bpEntity of bpEntities){
                            world.setDynamicProperty(bpEntity.getTags()[0], undefined)
                            bpEntity.kill()
                            count++                
                        }
                        sender.sendMessage(`§c[Backpack+] Cleared all ${count} backpacks.`)
                    }                    
                break
                
                case "clean":
                    if(!isPlayerOP){
                        sender.sendMessage(`[Backpack+] OP required to use this command.`)
                        return
                    }
                    const backpackQuery = {families:["backpack"]}
                    const backpackEntities2 = backpackUtils.getBackpackEntityByQuery(backpackQuery)
                    for(let bpEntity of backpackEntities2){
                        const bpInv = bpEntity.getComponent("inventory").container
                        if(bpInv.emptySlotsCount == bpInv.size){
                            sender.sendMessage(`§a[Backpack+] Empty Backpacks Removed!`)
                            bpEntity.remove()
                        }
                    }
                break

                case "reset":
                    var inv = sender.getComponent("inventory").container
                    var item = inv.getItem(sender.selectedSlotIndex)
                    if(!item){
                        sender.sendMessage(`§c[Backpack+] Hold a backpack item`)
                        return
                    }
                    if(!item.typeId.includes("backpack")){
                        sender.sendMessage(`§c[Backpack+] Hold a backpack item`)
                        return
                    }
                    inv.setItem(sender.selectedSlotIndex, new ItemStack(item.typeId))
                    sender.sendMessage(`§a[Backpack+] Backpack has been reset!`)
                break

                case "see":
                    if(!isPlayerOP){
                        sender.sendMessage(`[Backpack+] OP required to use this command.`)
                        return
                    }
                    var id = cmd[2]
                    var bpQuery = {tags:[`bps_id:${id}`]}
                    var bpEntities = backpackUtils.getBackpackEntityByQuery(bpQuery)
                    if(bpEntities.length==0){
                        sender.sendMessage(`§c[Backpack+] No backpack with that ID found!`)
                        return
                    }
                    for(let bpEntity of bpEntities){
                        let bpInv = bpEntity.getComponent("inventory").container
                        let itemList = "§eBackpack Items: "
                        for(let slot=0; slot<bpInv.size; slot++){
                            let item = bpInv.getItem(slot)
                            if(!item) continue
                            let itemName = ""
                            let itemNameArray = item.typeId.split(":")[1].split("_")
                            for(let itemStr of itemNameArray){
                                itemName +=  itemStr.charAt(0).toUpperCase() + itemStr.slice(1) + " ";
                            }
                            itemList += `§e${itemName.trim()} x${item.amount}§a, `
                        }
                        sender.sendMessage(itemList)
                    }
                break

                case "retrieve":
                    if(!isPlayerOP){
                        sender.sendMessage(`[Backpack+] OP required to use this command.`)
                        return
                    }
                    var id = cmd[2]
                    var bpQuery = {tags:[`bps_id:${id}`]}
                    var bpEntities = backpackUtils.getBackpackEntityByQuery(bpQuery)
                    if(bpEntities.length==0){
                        sender.sendMessage(`§c[Backpack+] No backpack with that ID found!`)
                        return
                    }
                    for(let bpEntity of bpEntities){
                        let bpInv = bpEntity.getComponent("inventory").container
                        for(let slot=0; slot<bpInv.size; slot++){
                            let item = bpInv.getItem(slot)
                            if(!item) continue
                            sender.dimension.spawnItem(item,sender.location)
                            bpInv.setItem(slot, undefined)
                        }                       
                    }                    
                    world.setDynamicProperty(`bps_id:${id}`, undefined)
                    sender.sendMessage(`§e[Backpack+] Successfully retrieve items.`)
                break

                case "set":
                    if(!isPlayerOP){
                        sender.sendMessage(`[Backpack+] OP required to use this command.`)
                        return
                    }
                    var id = cmd[2]
                    var inv = sender.getComponent("inventory").container
                    var item = inv.getItem(player.selectedSlotIndex)
                    if(!item){
                        sender.sendMessage(`§c[Backpack+] Hold a backpack item`)
                        return
                    }
                    if(!item.typeId.includes("backpack")){
                        sender.sendMessage(`§c[Backpack+] Hold a backpack item`)
                        return
                    }
                    item.setLore([`bps_id:${id}`])
                    inv.setItem(player.selectedSlotIndex, item)
                break

                case "delete":
                    if(!isPlayerOP){
                        sender.sendMessage(`[Backpack+] OP required to use this command.`)
                        return
                    }
                    var id = cmd[2]
                    var bpQuery = {tags:[`bps_id:${id}`]}
                    var bpEntities = backpackUtils.getBackpackEntityByQuery(bpQuery)
                    if(bpEntities.length==0){
                        sender.sendMessage(`§c[Backpack+] No backpack with that ID found!`)
                        return
                    }
                    for(let bpEntity of bpEntities){
                        let bpInv = bpEntity.getComponent("inventory").container
                        for(let slot=0; slot<bpInv.size; slot++){
                            if(item){
                                bpInv.setItem(slot, undefined)
                            }                           
                        }
                        bpEntity.kill()                    
                    }                 
                    world.setDynamicProperty(`bps_id:${id}`, undefined)
                    sender.sendMessage(`§e[Backpack+] Backpack Deleted.`)
                break

                case "debug":
                    let DynamicPropertyByteCount = world.getDynamicPropertyTotalByteCount()
                    sender.sendMessage(`Byte Count:` + DynamicPropertyByteCount)
                    let debugProperty = ""
                    for(let x=0; x<32767; x++){
                        debugProperty = debugProperty + "x"
                    }                    
                    world.setDynamicProperty("debug", debugProperty)
                    DynamicPropertyByteCount = world.getDynamicPropertyTotalByteCount()
                    sender.sendMessage(`After Debug Byte Count:` + DynamicPropertyByteCount)
                    world.setDynamicProperty("debug", undefined)
                break

                case "list":
                    let backpackEntities = sender.dimension.getEntities({families:["bps"]})
                    let idList = "§e[Backpack+] ID List: "
                    for(let backpackEntity of backpackEntities){
                        idList = idList + `${backpackEntity.getTags()[0].split(":")[1]}, ` 
                    }
                    sender.sendMessage(idList)
                break

                default:
                    commandList(sender)
            }
        }
    }else{
        if(cmd[0].trim() == "!bps"){
            commandList(sender)
        }
    }  
}

function commandList(sender){
    sender.sendMessage(`§e<Backpack+ Commands>`)       
    sender.sendMessage(`§ebps:reset - Reset the backpack item your holding.`)
    //if(isPlayerOP){
        sender.sendMessage(`§ebps:sudo <Player Name> <Backpack Command> - Execute a backpack command as another player.`)
        sender.sendMessage(`§ebps:clear bp - Deletes all backpacks and item recovery.`)
        sender.sendMessage(`§ebps:list - See all backpack IDs.`)
        sender.sendMessage(`§ebps:see <ID:int> - See specific backpack items.`)               
        sender.sendMessage(`§ebps:retrieve <ID:int> - Retrieve backpack items.`)
        sender.sendMessage(`§ebps:set <ID:int> - Manually set your backpack id.`)
        sender.sendMessage(`§ebps:delete <ID:int> - Delete backpack and recovery items.`)
        //sender.sendMessage(`§e!bps delete inactive - Delete inactive backpack and recovery items. Inactive backpacks are the those that don't have items.`)
    //}
}

function restartBackpackAddon(){
    system.clearRun(inactiveBpRun)
    backpackClosingEvent.unsubscribe()
    holdingBackpackEvent.unsubscribe()
    BackpackMain()
}