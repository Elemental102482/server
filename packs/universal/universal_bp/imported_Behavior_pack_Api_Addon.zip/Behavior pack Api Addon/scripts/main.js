import { world, system, EquipmentSlot, ItemStack, ItemTypes } from "@minecraft/server";
import { Vector } from "./Vector3";
import { AccessoriesSlot, NoveltyManager } from "./lib/NoveltyManager";

const Dimensions = [
    world.getDimension("minecraft:overworld"),
    world.getDimension("minecraft:nether"),
    world.getDimension("minecraft:the_end")
]
const ACCESORIES_SLOT_INT = [
    "Face","Hat","Necklace","Bracelet","Back","Bracelet","Hand","Belt","Hand","Foot","Foot","Spellbook","Trinket","Trinket","Trinket","Trinket","Trinket","Trinket","Trinket","Trinket","Trinket","Trinket", "Charm", "Charm"
]
const ALL_SLOT_LIST = [
    "Face","Hat","Necklace","Bracelet","Back","Hand","Belt","Foot","Spellbook","Trinket", "Charm"
]
const structure_manager = world.structureManager;
const ACCESSORIES_LENGTH = 24;

const AccesoriesSlotInt = {
    Hat: [1],
    Belt: [7],
    Face: [0],
    Hand: [6, 8],
    Bracelet: [3, 5],
    Trinket: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    Back: [4],
    Necklace: [2],
    Foot: [9, 10],
    Spellbook: [11],
    Charm: [22, 23]
}

const TagToRegister = {
    "novelty:is_hat": "Hat",
    "novelty:is_belt": "Belt",
    "novelty:is_face": "Face",
    "novelty:is_hand": "Hand",
    "novelty:is_bracelet": "Bracelet",
    "novelty:is_trinket": "Trinket",
    "novelty:is_back": "Back",
    "novelty:is_necklace": "Necklace",
    "novelty:is_neckless": "Necklace",
    "novelty:is_foot": "Foot",
    "novelty:is_spellbook": "Spellbook",
    "novelty:is_charm": "Charm"
}

const NoveltyItem = new ItemStack("nvy:novelty");
NoveltyItem.keepOnDeath = true;
NoveltyItem.lockMode = "inventory";

const NoveltyItemLocked = new ItemStack("nvy:novelty");
NoveltyItemLocked.keepOnDeath = true;
NoveltyItemLocked.lockMode = "slot";

let novelty_container = {};
let novelty_is_used = {};
let player_novelty_data = {};
let player_novelty_is_keep_on_death = {};
let item_category = {};

let novelty_database = {
    register: {
        Hat: ["minecraft:air"],
        Belt: ["minecraft:air"],
        Face: ["minecraft:air"],
        Hand: ["minecraft:air"],
        Bracelet: ["minecraft:air"],
        Trinket: ["minecraft:air"],
        Back: ["minecraft:air"],
        Necklace: ["minecraft:air"],
        Foot: ["minecraft:air"],
        Spellbook: ["minecraft:air"],
        Charm: ["minecraft:air"]
    },
    maxItemSlot: {}
};

ItemTypes.getAll().forEach(id => {
    let item = new ItemStack(id);
    item.getTags().forEach(tag=>{
        if(TagToRegister[tag] != undefined){
            let key = TagToRegister[tag];
            novelty_database.register[key].push(id.id);

            if(item_category[id.id] == undefined){
                item_category[id.id] = [ key ]
            }else{
                item_category[id.id].push(key);
            }
        }
    });
});

let compiled_data = {};

system.afterEvents.scriptEventReceive.subscribe(s=>{
    if(compiled_data[s.id]){
        compiled_data[s.id] += s.message;
    }else{
        compiled_data[s.id] = s.message;
    }
    
    try{
        let data = JSON.parse(compiled_data[s.id]);

        Object.keys(data.register).forEach(key=>{
            if(data.register[key].length > 0){
                novelty_database.register[key] = novelty_database.register[key].concat(data.register[key]);
                for(let item of data.register[key]){
                    if(item_category[item] == undefined){
                        item_category[item] = [ key ]
                    }else{
                        item_category[item].push(key);
                    }
                };
            }
        });

        Object.keys(data.maxItemSlot).forEach(key=>{
            novelty_database.maxItemSlot[key] = data.maxItemSlot[key];
            if(data.maxItemSlot[key].slot == undefined){
                novelty_database.maxItemSlot[key].slot = [...ALL_SLOT_LIST];
            }
        });

        delete compiled_data[s.id];
        console.log("[NoveltyDatabase] Successful add data to database");
    }catch(error){
        console.log("[NoveltyDatabase] Compiling data...");
    }
}, { namespaces: [ "load_novelty_data" ]})

system.afterEvents.scriptEventReceive.subscribe(s=>{
    if(s.id == "novelty:update_item"){
        let data = s.message.split(' ');
        updateAccessories(data[1], data[0]);
    }
}, { namespaces: [ "novelty" ]});

let player_index_select = {};

world.afterEvents.playerInteractWithEntity.subscribe(s=>{
    if(s.target.typeId != "nvy:novelty_inventory") return;

    player_index_select[s.player.id] = s.player.selectedSlotIndex;
    novelty_is_used[s.player.id] = s.target;
    let dimension = s.player.dimension;
    let duration = 20;
    let run_id = system.runInterval(()=>{
        if(duration <= 0) system.clearRun(run_id);
        novelty_is_used[s.player.id] = s.target;
        duration--;
    });
    let inventory = s.target.getComponent("minecraft:inventory");
    let location = Vector.round(s.player.location);
    location.y = 0;
    let container = inventory.container;
    for(let i = 0; i < ACCESSORIES_LENGTH; i++){
        let structure = structure_manager.get("mystructure:nvy" + i + s.player.id);
        if(structure == undefined){
            container.setItem(i);
            continue;
        }else{
            structure_manager.place(structure, dimension, location, {
                includeEntities: true,
                includeBlocks: false
            });
            let item = dimension.getEntities({
                type: "minecraft:item",
                location: {
                    x: location.x + 0.5,
                    y: location.y + 0.5,
                    z: location.z + 0.5
                },
                tags: [ "nvy:item_buffer" ]
            })[0];
            if(item){
                container.setItem(i, item.getComponent("minecraft:item").itemStack);
                item.remove();
            }
        }
    }
    
    s.player.getComponent("minecraft:equippable").setEquipment(EquipmentSlot.Mainhand, NoveltyItemLocked);
});

let player_list_id = [];
let player_novelty_list_item_name = {};

system.runInterval(()=>{
    Dimensions.forEach(dimension =>{
        dimension.getEntities({
            type: "nvy:novelty_inventory"
        }).forEach(entity =>{
            if(!player_list_id.includes(entity.getDynamicProperty("novelty-source-id"))) entity.remove();
        });
    });
}, 10);

let saved_tag_list_per_slot = {};
let player_has_novelty = {};
let player_has_novelty_temp = {};
let player_has_novelty_in_cursor = {};

system.runInterval(()=>{
    player_list_id = [];
    for(let playerData of world.getPlayers()){
        let cursor = playerData.getComponent("minecraft:cursor_inventory");
        if(cursor.item == undefined || cursor.item.typeId != "nvy:novelty"){
            player_has_novelty_in_cursor[playerData.id] = false;
        }else{
            player_has_novelty_in_cursor[playerData.id] = true;
            player_has_novelty_temp[playerData.id] = true;
        }

        if(player_novelty_list_item_name[playerData.id] == undefined) player_novelty_list_item_name[playerData.id] = [];
        try {
            let part = system.currentTick % 6;
            let inventory = playerData.getComponent("minecraft:inventory").container;
            let insert_novelty = false;
            if(inventory.emptySlotsCount == 36){
                if(!player_has_novelty_in_cursor[playerData.id]){
                    inventory.addItem(NoveltyItem);
                    insert_novelty = true;
                }
            }else{
                if(part == 0 && player_has_novelty[playerData.id] != undefined && player_has_novelty[playerData.id] === false && inventory.emptySlotsCount > 0 && !player_has_novelty_in_cursor[playerData.id]){
                    inventory.addItem(NoveltyItem);
                    insert_novelty = true;
                }
            }
            if(part == 0){
                player_has_novelty[playerData.id] = insert_novelty ? true : player_has_novelty_temp[playerData.id];
                player_has_novelty_temp[playerData.id] = false;
            }
            

            for(let i = 0; i < 6; i++){
                let item = inventory.getSlot(i+part*6);
                if(item.hasItem() && item != undefined && item_category[item.typeId] != undefined){
                    let has_desc = false;
                    let lores = item.getLore();
                    for(let lore of lores){
                        if(lore.startsWith("§r§6Slot:§e ")){
                            has_desc = true;
                            break;
                        }
                    }
                    if(!has_desc){
                        if(item_category[item.typeId].length == 1){
                            lores.unshift("§r§6Slot:§e " + item_category[item.typeId][0]);
                        }else{
                            let slot_name = "§r§6Slot:§e";
                            item_category[item.typeId].forEach(category=>{
                                slot_name += " " + category;
                            })
                            lores.unshift(slot_name);
                        }
                        item.setLore(lores);
                    }
                }
                if(item.hasItem() && item.typeId == "nvy:novelty"){
                    if(player_has_novelty_temp[playerData.id]){
                        inventory.setItem(i+part*6);
                    }else{
                        player_has_novelty_temp[playerData.id] = true;
                    }
                }
            }
        }catch(error){}
        
        player_list_id.push(playerData.id);
        let dimension = playerData.dimension;

        let force_remove = false;
        let equipable = playerData.getComponent("minecraft:equippable");
        let mainhand = equipable.getEquipmentSlot(EquipmentSlot.Mainhand);
        if(mainhand.isValid() && mainhand.hasItem() && mainhand.typeId == "nvy:novelty"){
            let novelty_id = playerData.getDynamicProperty("novelty-id");
            if(novelty_id == undefined){
                let entity = dimension.spawnEntity("nvy:novelty_inventory", playerData.getHeadLocation());
                entity.nameTag = "6d3ce9af-bb97-4ade-92b7-5b964d20f16c";
                entity.getComponent("minecraft:tameable").tame(playerData);
                entity.setDynamicProperty("novelty-source-id", playerData.id);
                playerData.setDynamicProperty("novelty-id", entity.id);
            }else{
                let entity = world.getEntity(novelty_id);
                if(entity){
                    entity.teleport(Vector.add(playerData.getHeadLocation(), Vector.multiply(playerData.getViewDirection(), 0.5)));
                }else{
                    playerData.setDynamicProperty("novelty-id");
                }
            }
        }else{
            let novelty_id = playerData.getDynamicProperty("novelty-id");
            if(novelty_id != undefined){
                let entity = world.getEntity(novelty_id);
                system.runTimeout(()=>{
                    if(entity) entity.remove();
                }, 1);
                playerData.setDynamicProperty("novelty-id");
                force_remove = true;
            }
        }

        if(novelty_is_used[playerData.id] != undefined){
            novelty_container[playerData.id] = novelty_is_used[playerData.id]?.getComponent("minecraft:inventory")?.container || undefined;
            if(!novelty_is_used[playerData.id].isValid() || !novelty_is_used[playerData.id].getProperty("nvy:open_inv") || force_remove){
                if(novelty_is_used[playerData.id].isValid() && (!novelty_is_used[playerData.id].getProperty("nvy:open_inv") || force_remove)){
                    let inventory = novelty_is_used[playerData.id].getComponent("minecraft:inventory");
                    let container = inventory.container;
                    for(let i = 0; i < ACCESSORIES_LENGTH; i++){
                        let item = container.getItem(i);
                        if(item != undefined){
                            player_novelty_data[playerData.id][i] = item.typeId;
                            player_novelty_is_keep_on_death[playerData.id][i] = item.keepOnDeath;
                        }else{
                            player_novelty_data[playerData.id][i] = undefined;
                        }
                    }

                    novelty_is_used[playerData.id].runCommand("scriptevent novelty:update " + playerData.id);//buat duplikatnya baru run commandnya
                    playerData.getComponent("minecraft:inventory").container.setItem(player_index_select[playerData.id], NoveltyItem);
                }
                novelty_is_used[playerData.id] = undefined;
                novelty_container[playerData.id] = undefined;
                delete saved_tag_list_per_slot[playerData.id];
            }else{
                if(!novelty_is_used[playerData.id].isValid()) return;
                let location = Vector.round(playerData.location);
                location.y = 0;
                let inventory = novelty_is_used[playerData.id].getComponent("minecraft:inventory");
                let container = inventory.container;

                let slot_max_tag_list = Object.keys(novelty_database.maxItemSlot);

                let tag_list_per_slot = {
                    "Face": {},
                    "Hat": {},
                    "Necklace": {},
                    "Bracelet": {},
                    "Back": {},
                    "Hand": {},
                    "Belt": {},
                    "Foot": {},
                    "Spellbook": {},
                    "Trinket": {}, 
                    "Charm": {},
                }
                if(saved_tag_list_per_slot[playerData.id] == undefined){
                    saved_tag_list_per_slot[playerData.id] = { ...tag_list_per_slot };
                }

                for(let i = 0; i < ACCESSORIES_LENGTH; i++){
                    let item = container.getItem(i);

                    if(item != undefined && !novelty_database.register[ACCESORIES_SLOT_INT[i]].includes(item.typeId)){
                        let swaped = false;
                        if(item_category[item.typeId] != undefined){
                            for(let category of item_category[item.typeId]){
                                for(let slot of  AccesoriesSlotInt[category]){
                                    if(container.getItem(slot) == undefined){
                                        container.swapItems(i, slot, container);
                                        swaped = true;
                                        item = undefined;
                                        break;
                                    }
                                }
                                if(swaped) break;
                            }
                        }

                        if(!swaped){
                            container.setItem(i);
                            dimension.spawnItem(item, playerData.location);
                            item = undefined;
                        }
                    }

                    if(item != undefined && player_novelty_list_item_name[playerData.id][i] != item.typeId){
                        let pass = true;
                        let tags = item.getTags();

                        for(let tag_selected of slot_max_tag_list){
                            if(tags.includes(tag_selected)){
                                let data = novelty_database.maxItemSlot[tag_selected];
                                let total_tag = 0;
                                data.slot.forEach(slot =>{
                                    if(saved_tag_list_per_slot[playerData.id][slot][tag_selected] != undefined){
                                        total_tag += saved_tag_list_per_slot[playerData.id][slot][tag_selected];
                                    }
                                })
                                if(total_tag >= data.amount){
                                    container.setItem(i);
                                    dimension.spawnItem(item, playerData.location);
                                    item = undefined;
                                    pass = false;
                                    break;
                                }
                            }
                        }
                    }

                    structure_manager.delete("mystructure:nvy" + i + playerData.id);
                    if(item != undefined){
                        let item_entity = dimension.spawnItem(item, {
                            x: location.x + 0.5,
                            y: location.y + 0.5,
                            z: location.z + 0.5
                        });
                        item_entity.addTag("nvy:item_buffer");
                        item_entity.addTag("nvy:id " + playerData.id + " " + i);
                        structure_manager.createFromWorld("mystructure:nvy" + i + playerData.id, dimension, location, Vector.add(location, { x: 1, y: 1, z: 1 }), {
                            includeEntities: true,
                            includeBlocks: false
                        });

                        item_entity.remove();

                        item.getTags().forEach(tag =>{
                            if(tag_list_per_slot[ACCESORIES_SLOT_INT[i]][tag] == undefined){
                                tag_list_per_slot[ACCESORIES_SLOT_INT[i]][tag] = 1;
                            }else{
                                tag_list_per_slot[ACCESORIES_SLOT_INT[i]][tag] += 1;
                            }
                        })
                    }
                    player_novelty_list_item_name[playerData.id][i] = (item != undefined) ? item.typeId : undefined;
                }
                saved_tag_list_per_slot[playerData.id] = tag_list_per_slot;
            }
        }
    }
});

system.runInterval(()=>{
    for(let playerData of world.getPlayers()){
        let register_id = [];
        playerData.getTags().forEach(tag=>{
            if(tag.startsWith("novelty:")){
                let item_name = tag.substr(8);
                if(!player_novelty_data[playerData.id].includes(item_name) || item_name == "undefined"){
                    playerData.removeTag(tag);
                }else{
                    register_id.push(item_name);
                }
            }
        });
        player_novelty_data[playerData.id].forEach(item=>{
            if(!register_id.includes(item) && item != undefined){
                playerData.addTag("novelty:" + item);
            }
        })
    }
    
}, 5)

world.afterEvents.entityDie.subscribe(s=>{
    if(world.gameRules.keepInventory) return;
    let dimension = s.deadEntity.dimension;
    let location = s.deadEntity.location;

    let keep_on_death = player_novelty_is_keep_on_death[s.deadEntity.id];

    for(let i = 0; i < ACCESSORIES_LENGTH; i++){
        if(keep_on_death[i]) continue;
        let structure = structure_manager.get("mystructure:nvy" + i + s.deadEntity.id);
        if(structure != undefined){
            try{
                structure_manager.place(structure, dimension, location, {
                    includeEntities: true,
                    includeBlocks: false
                });
            }catch(err){}
            structure_manager.delete("mystructure:nvy" + i + s.deadEntity.id);
        }
    }
    updateAccessories(s.deadEntity.id);
}, {entityTypes: [ "minecraft:player" ]});


function updateAccessories(id, slot = -1){
    let player = world.getEntity(id);
    let location = {
        x: Math.round(player.location.x + Math.random() * 32 - 16),
        y: 0,
        z: Math.round(player.location.z + Math.random() * 32 - 16)
    }
    if(player.dimension.getBlock(location) == undefined){
        system.runTimeout(()=>{
            updateAccessories(id);
        }, 1)
        return;
    }
    if(slot == -1){
        let item_list = [];
        let item_list_is_keep_on_death = [];
        for (let i = 0; i < ACCESSORIES_LENGTH; i++) {
            let structure = structure_manager.get("mystructure:nvy" + i + player.id);
            if(structure != undefined){
                structure_manager.place(structure, player.dimension, location, {
                    includeEntities: true,
                    includeBlocks: false
                });
                let item = player.dimension.getEntities({
                    type: "minecraft:item",
                    location: {
                        x: location.x + 0.5,
                        y: location.y + 0.5,
                        z: location.z + 0.5
                    },
                    tags: [ "nvy:item_buffer" ]
                })[0];
                if(item){
                    let item_temp = item.getComponent("minecraft:item").itemStack;
                    item_list[i] = item_temp.typeId;
                    item_list_is_keep_on_death[i] = item_temp.keepOnDeath;
                    if(novelty_container[id]) novelty_container[id].setItem(Number(i), item_temp);
                    item.remove();
                }
            }else{
                item_list[i] = undefined;
                item_list_is_keep_on_death[i] = false;
            }
        }
        player_novelty_data[id] = item_list;
        player_novelty_is_keep_on_death[id] = item_list_is_keep_on_death;
    }else{
        let item_list = player_novelty_data[id];
        let item_list_is_keep_on_death = player_novelty_is_keep_on_death[id];
        let structure = structure_manager.get("mystructure:nvy" + slot + player.id);
        if(structure != undefined){
            structure_manager.place(structure, player.dimension, location, {
                includeEntities: true,
                includeBlocks: false
            });
            let item = player.dimension.getEntities({
                type: "minecraft:item",
                location: {
                    x: location.x + 0.5,
                    y: location.y + 0.5,
                    z: location.z + 0.5
                },
                tags: [ "nvy:item_buffer" ]
            })[0];
            if(item){
                let item_temp = item.getComponent("minecraft:item").itemStack;
                item_list[slot] = item_temp.typeId;
                item_list_is_keep_on_death[slot] = item_temp.keepOnDeath;
                if(novelty_container[id]) novelty_container[id].setItem(Number(slot), item_temp);
                item.remove();
            }
        }else{
            item_list[slot] = undefined;
            item_list_is_keep_on_death[slot] = false;
        }
        player_novelty_data[id] = item_list;
        player_novelty_is_keep_on_death[id] = item_list_is_keep_on_death;
    }
}

world.getPlayers().forEach(s=>{
    updateAccessories(s.id);
})

world.afterEvents.playerJoin.subscribe(s=>{
    updateAccessories(s.playerId);
    let player = world.getEntity(s.playerId);
    if(!player.getDynamicProperty("has_novelty")){
        player.setDynamicProperty("has_novelty", true);
        
        let inventory = player.getComponent("minecraft:inventory").container;
        if(inventory.getItem(8) != undefined){
            inventory.addItem(NoveltyItem);
        }else{
            inventory.setItem(8, NoveltyItem);
        }
    }
    
    let equipable = player.getComponent("minecraft:equippable");
    let mainhand = equipable.getEquipmentSlot(EquipmentSlot.Mainhand);
    if(mainhand.hasItem() && mainhand.typeId == "nvy:novelty" && mainhand.lockMode == "slot") equipable.setEquipment(EquipmentSlot.Mainhand, NoveltyItem);
});