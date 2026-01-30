import {world, system, ItemStack, EnchantmentTypes, Dimension, EntityEquippableComponent, EquipmentSlot} from '@minecraft/server'
import {MinecraftDimensionTypes} from '@minecraft/vanilla-data';
import { Enchantments } from "./classes/Enchantments.js";
import {BackpackClosing, MainHandItemChange, PlayerHoldingBackpack} from "./CustomListeners.js"
import WorldManager from './WorldManager.js'
import portalUtils from './portalUtils.js';
import backpackUtils from './backpackUtils.js';
import itemUtils from './itemUtils.js';
import { sendDebugMsg } from './debugMsg.js';

const OVERWORLD_Y_OFFSET = -64;
const NETHER_Y_OFFSET = 0;
const END_Y_OFFSET = 0;
const BACKPACK_TELEPORT_HEIGHT = 1.5;

/*
system.beforeEvents.watchdogTerminate.subscribe((eventData)=>{
    eventData.cancel = true
})
*/
const holdingBackpackEvent = new PlayerHoldingBackpack()
const backpackClosingEvent = new BackpackClosing()


world.afterEvents.worldLoad.subscribe(()=>{
    system.runTimeout(()=>{
        BackpackMain()
    },20)
    // system.runInterval(()=>{
    //     world.sendMessage(JSON.stringify(WorldManager.getAllPlayers()))
    // },40)
})

world.afterEvents.playerJoin.subscribe(({playerId})=>{
    system.runTimeout(()=>{
        const player = world.getEntity(playerId)
        const heldItem = player.getComponent(EntityEquippableComponent.componentId).getEquipment(EquipmentSlot.Mainhand)
        if(heldItem?.typeId.includes("bps:backpack")){
            WorldManager.addPlayer(player)
        }
    },10)
})

world.afterEvents.playerLeave.subscribe(({playerName})=>{
    WorldManager.removePlayer(playerName)
})

function BackpackMain(){
    world.sendMessage(`§l§a[Backpack Plus] Addon Active!`)
    console.warn(`§l§a[Backpack Plus] Addon Active!`)
    WorldManager.updateAllBackpacks()

    //Item Changing Events
    world.afterEvents.playerInventoryItemChange.subscribe(({slot, beforeItemStack, itemStack, player})=>{
        const mainHandSlot = player.selectedSlotIndex
        if(!itemStack) return;
        if(mainHandSlot == slot){
            if(itemStack.typeId.includes("bps:backpack")){
                const lore = itemStack.getLore()
                sendDebugMsg(`Backpack got added in hotbar main hand slot.`)
                const propertyInterface = {
                    item: itemStack ? itemStack.typeId : undefined,
                    slot: mainHandSlot,
                    id: itemStack && lore.length > 0 ? lore[0] : undefined
                }
                const currentHeldItemStatusProperty = player.getDynamicProperty(`playerHeldItemStatus`)
                const previousData = currentHeldItemStatusProperty ? JSON.parse(currentHeldItemStatusProperty) : {};
                const newPropertyJson = JSON.stringify(propertyInterface)
                const inventory = player.getComponent("inventory").container
                onChanged(player, inventory, propertyInterface, previousData);
                player.setDynamicProperty(`playerHeldItemStatus`, newPropertyJson);

                if(itemStack?.typeId.includes("bps:backpack")){
                    WorldManager.addPlayer(player)
                }else{
                    WorldManager.removePlayer(player.name)
                }
            }
        }
    })
    world.afterEvents.playerHotbarSelectedSlotChange.subscribe(({player, itemStack : itemHolding})=>{
        const currentHeldItemStatusProperty = player.getDynamicProperty(`playerHeldItemStatus`)
        const inventory = player.getComponent("inventory").container
        const selectedSlot = player.selectedSlotIndex
        
        const propertyInterface = {
            item: itemHolding ? itemHolding.typeId : undefined,
            slot: selectedSlot,
            id: itemHolding && itemHolding.getLore().length > 0 ? itemHolding.getLore()[0] : undefined
        }
        
        const newPropertyJson = JSON.stringify(propertyInterface)
    
        if (!currentHeldItemStatusProperty || currentHeldItemStatusProperty !== newPropertyJson) {
            const previousData = currentHeldItemStatusProperty ? JSON.parse(currentHeldItemStatusProperty) : {};
            if (previousData.slot !== selectedSlot || previousData.item !== propertyInterface.item) {
                sendDebugMsg(`Changing slot`)
                onChanged(player, inventory, propertyInterface, previousData);
            }
            player.setDynamicProperty(`playerHeldItemStatus`, newPropertyJson);
        }

        if(itemHolding?.typeId.includes("bps:backpack")){
            WorldManager.addPlayer(player)
        }else{
            WorldManager.removePlayer(player.name)
        }
    })

    //Teleport Backpack Entity to Player
    holdingBackpackEvent.subscribe(({itemHolding, player})=>{
        const location = player.location
        const dimension = player.dimension
        const backpackID = itemHolding.getLore()[0]
        if(backpackID != undefined){
            let bpEntityQuery = {tags:[backpackID]}
            let bpEntities = backpackUtils.getBackpackEntityByQuery(bpEntityQuery)
            for(let bpEntity of bpEntities){
                if(portalUtils.checkForNearbyPortal(dimension, location)){
                    backpackUtils.closeBackpack(bpEntity)
                    continue
                }
                let newLocation = player.location
                newLocation.y = newLocation.y + BACKPACK_TELEPORT_HEIGHT
                bpEntity.teleport(newLocation)
            }
        }
    })        

    //Record Items When Backpack Close
    backpackClosingEvent.subscribe(({bpEntity})=>{
        sendDebugMsg(`Backpack Closing`)
        let bpEntityInventory = bpEntity.getComponent("inventory").container
        let lore = backpackUtils.recordBackpackItems(bpEntity.getTags()[0], bpEntityInventory, bpEntity)
        let playerQuery = {type:"minecraft:player", closest:1, location:bpEntity.location}
        let playerEntity = bpEntity.dimension.getEntities(playerQuery)
        for(let player of playerEntity){
            let inventory = player.getComponent("inventory").container
            let item = inventory.getItem(player.selectedSlotIndex)
            if(!item) continue               
            if(item.getLore()[0] != bpEntity.getTags()[0]) continue
            item.setLore(lore)
            inventory.setItem(player.selectedSlotIndex, item)
        }
        bpEntity.removeTag("close")
    })    

    //Manage Inactive Backpacks
    system.runInterval(()=>{
        let bpEntities = backpackUtils.getBackpackEntityByQuery({families:["bps"]})
        for(let bpEntity of bpEntities){
            const dimension = bpEntity.dimension
            let newLocation = bpEntity.location
            switch(dimension.id){
                case MinecraftDimensionTypes.Overworld:
                    if(newLocation.y == OVERWORLD_Y_OFFSET) continue
                    newLocation.y = OVERWORLD_Y_OFFSET
                    break
                case MinecraftDimensionTypes.Nether:
                    if(newLocation.y == NETHER_Y_OFFSET) continue
                    newLocation.y = NETHER_Y_OFFSET
                    break
                case MinecraftDimensionTypes.TheEnd:
                    if(newLocation.y == END_Y_OFFSET) continue
                    newLocation.y = END_Y_OFFSET
                    break
            }
            let playerQuery = {type:"minecraft:player", location:bpEntity.location, maxDistance:3}
            let players = bpEntity.dimension.getEntities(playerQuery)
            if(players.length==0){
                bpEntity.teleport(newLocation)
            }
        }
    },20)
}

async function onChanged(player, playerInventory, propertyDataCurrent, propertyDataOld) {
    const currentItem = playerInventory.getItem(propertyDataCurrent.slot);
    const oldBackpackId = propertyDataOld.id;
    if (currentItem && currentItem.typeId.includes("bps:backpack")) {
        let lore = currentItem.getLore();
        
        if (lore.length === 0) { // Create New Backpack ID
            sendDebugMsg(`Create new backpack`)
            const bpId = `bps_id:${(Date.now() + Math.floor(Math.random() * 10000)).toString().slice(-4)}`;
            currentItem.setLore([bpId]);
            playerInventory.setItem(propertyDataCurrent.slot, currentItem);
            
            const bpEntity = player.dimension.spawnEntity("bps:container_entity_temp", player.location);
            bpEntity.triggerEvent(backpackUtils.getBackpackContainerSize(currentItem));
            bpEntity.addTag(bpId);
            bpEntity.nameTag = backpackUtils.getBackpackContainerName(currentItem);

            WorldManager.updateAllBackpacks();
        } else { // Open Old Backpack
            sendDebugMsg(`Opening Old Backpack`)
            backpackUtils.handleBackpackEntities(player, oldBackpackId, bpEntity => backpackUtils.closeBackpack(bpEntity, player, propertyDataOld));
            backpackUtils.openBackpack(player, currentItem);
            WorldManager.updateAllBackpacks();
        }
    } else if (currentItem) { // Handle forbidden items
        sendDebugMsg(`Handling Forbidden Items`)
        backpackUtils.handleBackpackEntities(player, oldBackpackId, bpEntity => {
            const bpEntityInv = bpEntity.getComponent("inventory").container;
            itemUtils.handleForbiddenItems(bpEntityInv, bpEntity.location, bpEntity.dimension);
            backpackUtils.closeBackpack(bpEntity, player, propertyDataOld);
        });
    } else if (oldBackpackId) { // Handle old backpack with no current item
        sendDebugMsg(`Handle old backpack with no items on hand`)
        backpackUtils.handleBackpackEntities(player, oldBackpackId, bpEntity => {
            const bpEntityInv = bpEntity.getComponent("inventory").container;
            itemUtils.handleForbiddenItems(bpEntityInv, bpEntity.location, bpEntity.dimension);
            backpackUtils.closeBackpack(bpEntity, player, propertyDataOld);
        });
    }
}


