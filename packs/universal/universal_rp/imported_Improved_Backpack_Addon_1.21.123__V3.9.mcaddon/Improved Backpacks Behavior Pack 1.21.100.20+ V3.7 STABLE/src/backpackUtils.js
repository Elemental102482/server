import {world, EntityQueryOptions, Container, Entity, ItemStack, Player, system} from "@minecraft/server"
import itemUtils from "./itemUtils";
import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";

const DimensionList = [MinecraftDimensionTypes.Overworld, MinecraftDimensionTypes.Nether, MinecraftDimensionTypes.TheEnd]

/**
 * 
 * @param {EntityQueryOptions} query 
 * @returns {Entity[]}
 */
function getBackpackEntityByQuery(query){
    let dimensions = DimensionList;
    let entityList = [];
    for (let dimension of dimensions) {
        const bpEntities = world.getDimension(dimension).getEntities(query);
        if (bpEntities.length) {
            entityList = entityList.concat(bpEntities);
        }
    }
    return entityList;
}

/**
 * 
 * @param {ItemStack} item 
 * @returns {String}
 */
function getBackpackContainerName(item){
    let typeId = item.typeId
    switch(typeId){
        case "bps:backpack":
            return "Small Backpack"
        case "bps:backpack_medium":
            return "Medium Backpack"
        case "bps:backpack_big":
            return "Big Backpack"
        case "bps:backpack_xl":
            return "XL Backpack"
    }
}

/**
 * 
 * @param {ItemStack} item 
 * @returns {String}
 */
function getBackpackContainerSize(item){
    let typeId = item.typeId
    switch(typeId){
        case "bps:backpack":
            return "small"
        case "bps:backpack_medium":
            return "medium"
        case "bps:backpack_big":
            return "big"
        case "bps:backpack_xl":
            return "xl"
    }
}

/**
 * 
 * @param {Number} id 
 * @param {Container} inventory 
 * @param {Entity} bpEntity 
 * @returns {String[]}
 */
function recordBackpackItems(id, inventory, bpEntity) {
    let count = 0;
    let countOverflow = 0;
    const backupItemList = [];
    const lore = [`${id}`];

    for (let slot = 0; slot < inventory.size; slot++) {
        const item = inventory.getItem(slot);
        if (!item) continue;

        // Handle forbidden items
        if (itemUtils.isForbiddenItem(item)) {
            bpEntity.dimension.spawnItem(item, bpEntity.location);
            inventory.setItem(slot, undefined);
            continue;
        }

        // Add item properties to backup list
        backupItemList.push(itemUtils.getItemProperties(item));

        // Build lore for the first 5 items
        if (count < 5) {
            lore.push(itemUtils.formatItemForLore(item));
        } else {
            countOverflow++;
        }
        count++;
    }

    // Add overflow message to lore
    if (countOverflow > 0) {
        lore.push(`§7and ${countOverflow} more...`);
    }

    // Save backup item list as a dynamic property
    world.setDynamicProperty(`${id}`, JSON.stringify(backupItemList));
    return lore;
}

/**
 * 
 * @param {Player} player 
 * @param {ItemStack} bpItem 
 */
function openBackpack(player, bpItem) {
    const bpLore = bpItem.getLore();
    const bpId = bpLore[0];
    let bpOldEntities = getBackpackEntityByQuery({ tags: [bpId] });

    if (bpOldEntities.length === 0) {
        player.sendMessage(`§c[Backpack+] Unable to retrieve backpack items.`);
        player.sendMessage(`§c[Backpack+] Will attempt to recover items.`);
        bpOldEntities = recoverBackpackItems(player, bpId);
        if (!bpOldEntities) return;
    }

    const bpEntity = player.dimension.spawnEntity("bps:container_entity_temp", player.location);
    bpEntity.triggerEvent(getBackpackContainerSize(bpItem));
    const bpInventory = bpEntity.getComponent("inventory").container;

    for (const bpOldEntity of bpOldEntities) {
        const bpOldEntityInventory = bpOldEntity.getComponent("inventory").container;
        transferBackpackItems(bpOldEntityInventory, bpInventory);
        bpOldEntity.remove();
        try {
            bpOldEntity.triggerEvent("despawn2");
        } catch (e) {
            // Handle potential errors silently
        }
    }
    
    bpEntity.addTag(bpId);
    const rename = renameBackpackContainer(bpEntity, bpItem)
    if(!rename){
        console.warn(`[Improved Backpack] Name has been changed.`)
    }
}

/**
 * 
 * @param {Entity} backpackEntity 
 * @param {Player} player 
 * @param {*} propertyDataOld 
 */

function closeBackpack(backpackEntity, player, propertyDataOld){
    let newLocation = backpackEntity.location
    newLocation.y = backpackEntity.dimension.heightRange.min
    backpackEntity.teleport(newLocation)
}

/**
 * 
 * @param {Entity} backpackEntity 
 * @param {ItemStack} backpackItem
 * @returns {Boolean}
 */
function renameBackpackContainer(backpackEntity, backpackItem){
    if(backpackEntity.isValid){
        backpackEntity.nameTag = getBackpackContainerName(backpackItem);
        return true
    }
    return false
}

/**
 * 
 * @param {Player} player 
 * @param {number} backpackId 
 * @param {*} callback 
 */

function handleBackpackEntities(player, backpackId, callback) {
  if (!backpackId) return;

  const bpEntityQuery = { tags: [backpackId] };
  const bpEntities = player.dimension.getEntities(bpEntityQuery);

  // If your callback returns a promise, this will await each one in series.
  // If callback is synchronous, `await`ing it just wraps it in a resolved promise.
  for (const bpEntity of bpEntities) {
    callback(bpEntity, player);
  }
}

/**
 * 
 * @param {Player} player 
 * @param {number} id 
 * @returns {Boolean}
 */

function recoverBackpackItems(player, id) {
    const itemProperties = world.getDynamicProperty(id);

    if (itemProperties) {
        const playerInv = player.getComponent("inventory").container;
        const bpEntity = player.dimension.spawnEntity("bps:container_entity_temp", player.location);
        const selectedItem = playerInv.getItem(player.selectedSlotIndex);
        
        bpEntity.addTag(id);
        bpEntity.nameTag = getBackpackContainerName(selectedItem);
        bpEntity.triggerEvent(getBackpackContainerSize(selectedItem));

        const bpInv = bpEntity.getComponent("inventory").container;
        const itemPropertiesParse = JSON.parse(itemProperties);

        for (const itemProperty of itemPropertiesParse) {
            const item = new ItemStack(itemProperty.id, itemProperty.amount);
            
            if (itemProperty.name) item.nameTag = itemProperty.name;
            if (itemProperty.lore) item.setLore(itemProperty.lore);
            if (itemProperty.durability) item.getComponent("durability").damage = itemProperty.durability;
            if (itemProperty.enchant) {
                for (const enchant of itemProperty.enchant) {
                    Enchantments.addEnchant(item, { type: EnchantmentTypes.get(enchant.enchantName), level: enchant.level });
                }
            }
            
            bpInv.addItem(item);
        }

        player.sendMessage(`§e[Backpack+] Items successfully recovered.`);
        return [bpEntity];
    } else {
        player.sendMessage(`§c[Backpack+] Unable to find recovery backup.`);
        return false;
    }
}

/**
 * 
 * @param {Container} sourceInventory 
 * @param {Container} targetInventory 
 */

function transferBackpackItems(sourceInventory, targetInventory) {
    for (let index = 0; index < sourceInventory.size; index++) {
        const item = sourceInventory.getItem(index);
        if (item) {
            targetInventory.setItem(index, item);
            sourceInventory.setItem(index, undefined);
        }
    }
}

export default {
    getBackpackEntityByQuery,
    recordBackpackItems,
    closeBackpack,
    openBackpack,
    getBackpackContainerName,
    getBackpackContainerSize,
    handleBackpackEntities
}