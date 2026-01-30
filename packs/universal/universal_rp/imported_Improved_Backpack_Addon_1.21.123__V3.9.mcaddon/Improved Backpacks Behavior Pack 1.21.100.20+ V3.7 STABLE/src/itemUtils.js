import {Container, Dimension, ItemStack, world} from "@minecraft/server"
import { Enchantments } from "./classes/Enchantments";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { sendDebugMsg } from "./debugMsg";

let forbiddentItems = [
    "bps:backpack_big", "bps:backpack_medium", "bps:backpack_xl", "bps:backpack"
]

const colorTypes = [
  "light_gray",
  "red",
  "blue",
  "cyan",
  "gray",
  "lime",
  "pink",
  "black",
  "brown",
  "green",
  "white",
  "orange",
  "purple",
  "undyed",
  "yellow",
  "magenta",
  "light_blue"
];

function addShulkerTypesToForbiddenItems(){
    const baseItem = `minecraft:undyed_shulker_box`
    colorTypes.forEach((color)=>{
        const type = baseItem.replace("undyed_", `${color}_`)
        forbiddentItems.push(type)
    })
    forbiddentItems.push(baseItem)
}

function addBundleTypesToForbiddenItems(){
    const baseItem = `minecraft:xbundle`
    colorTypes.forEach((color)=>{
        const type = baseItem.replace("x", `${color}_`)
        forbiddentItems.push(type)
    })
    forbiddentItems.push(`minecraft:bundle`)
}

addBundleTypesToForbiddenItems()
addShulkerTypesToForbiddenItems()

/**
 * 
 * @param {ItemStack} item 
 * @returns {String}
 */
function formatItemForLore(item) {
    const itemName = item.typeId
        .split(":")[1]
        .split("_")
        .map(str => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" ");
    return `§7${itemName} x${item.amount}`;
}

/**
 * 
 * @param {Container} inventory 
 * @param {import("@minecraft/server").Vector3} location 
 * @param {Dimension} dimension 
 */
function handleForbiddenItems(inventory, location, dimension) {
    sendDebugMsg(`Handling Forbidden Items`)
    for(let forbiddenItem of forbiddentItems){
        const forbiddenItemStack = new ItemStack(forbiddenItem)
        const hasForbiddenItem = inventory.contains(forbiddenItemStack)
        if(hasForbiddenItem){
            const itemSlotNumber = inventory.find(forbiddenItem)
            const item = inventory.getItem(itemSlotNumber)
            dimension.spawnItem(item, location);
            inventory.setItem(slot, undefined);
        }else{
            break;
        }
    }
}

/**
 * @typedef {Object} ItemProperties
 * @property {string} id - The item type ID
 * @property {string|undefined} name - The name tag of the item
 * @property {number} amount - The item count
 * @property {string[]|undefined} lore - The lore text, if present
 * @property {number|undefined} durability - Damage value if item has durability
 * @property {Array<{enchantName: string, level: number}>} enchant - List of enchantments
 */
/**
 * 
 * @param {ItemStack} item 
 * @returns {ItemProperties}
 */
function getItemProperties(item) {
    const itemInterface = {
        id: item.typeId,
        name: item.nameTag || undefined,
        amount: item.amount,
        lore: item.getLore().length > 0 ? item.getLore() : undefined,
        durability: item.hasComponent("durability") ? item.getComponent("durability").damage : undefined,
        enchant: []
    };

    const enchantList = Enchantments.getEnchants(item);
    if (enchantList.length > 0) {
        itemInterface.enchant = enchantList.map(enchant => ({
            enchantName: enchant.type.id,
            level: enchant.level
        }));
    }

    return itemInterface;
}

/**
 * 
 * @param {ItemStack} item 
 * @returns {Boolean}
 */
function isForbiddenItem(item) {
    return forbiddentItems.some(itemName => item.typeId.includes(itemName));
}

export default {
    handleForbiddenItems,
    getItemProperties,
    isForbiddenItem,
    formatItemForLore
}