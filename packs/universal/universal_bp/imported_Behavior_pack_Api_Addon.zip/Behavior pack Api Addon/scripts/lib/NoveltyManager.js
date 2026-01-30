import { world, system, ItemTypes, ItemStack } from "@minecraft/server";

export const AccessoriesSlot = {
    Hat: "Hat",
    Belt: "Belt",
    Face: "Face",
    Hand: "Hand",
    Bracelet: "Bracelet",
    Trinket: "Trinket",
    Back: "Back",
    Neckless: "Neckless",
    Foot: "Foot",
    Spellbook: "Spellbook",
    Charm: "Charm"
}

const AccessoriesList = Object.keys(AccessoriesSlot);

const AccessoriesSlotInt = {
    Hat: [1],
    Belt: [7],
    Face: [0],
    Hand: [6, 8],
    Bracelet: [3, 5],
    Trinket: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    Back: [4],
    Neckless: [2],
    Foot: [9, 10],
    Spellbook: [11],
    Charm: [22, 23]
}

let SendData = {
    register: {
        Hat: [],
        Belt: [],
        Face: [],
        Hand: [],
        Bracelet: [],
        Trinket: [],
        Back: [],
        Neckless: [],
        Foot: [],
        Spellbook: [],
        Charm: []
    }
};

var AccessoriesPlayerData = {};

var send_tick;
var dimension;
var structure_manager;

system.run(()=>{
    dimension = world.getDimension("minecraft:overworld");
    structure_manager = world.structureManager;
})

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const sesion_id = generateUUID();

system.runInterval(()=>{
    if(send_tick != undefined){
        if(send_tick <= system.currentTick){
            let id = generateUUID();
            for(let split_data of JSON.stringify(SendData).match(/.{1,254}/g)){
                dimension.runCommand("scriptevent load_novelty_data:" + id + " " + split_data);
            }

            send_tick = undefined;
        }
    }
})

let all_item;

export class NoveltyManager {
    static registerAccessoriesItem(identifier, slot){
        SendData.register[slot].push(identifier);
        send_tick = system.currentTick + 1;
    };

    static registerAccessoriesItemFromTag(tag, slot){
        if(all_item == undefined){
            let all_item_id = ItemTypes.getAll();
            all_item = [];
            all_item_id.forEach(id=>{
                all_item.push(new ItemStack(id));
            })
        }

        all_item.forEach(item=>{
            if(item.hasTag(tag)) SendData.register[slot].push(item.typeId);
        })

        send_tick = system.currentTick + 1;
    };

    static getAccessories(player, slot, index = -1){
        if(AccessoriesPlayerData[player.id] == undefined) updateAccessories(player.id);
        if(AccessoriesSlotInt[slot].length > 1){
            let item_list = [];
            if(index == -1){
                AccessoriesSlotInt[slot].forEach(e=>{
                    item_list.push(AccessoriesPlayerData[player.id][e]);
                });
                return cloneAccessories(item_list);
            }else{
                return cloneAccessories(AccessoriesPlayerData[player.id][AccessoriesSlotInt[slot][index]]);
            }
        }else{
            return cloneAccessories(AccessoriesPlayerData[player.id][AccessoriesSlotInt[slot][0]]);
        }
    };

    static getAccessoriesSlot(player, slot, index = -1){
        if(AccessoriesPlayerData[player.id] == undefined) updateAccessories(player.id);
        if(AccessoriesSlotInt[slot].length > 1){
            let item_list = [];
            if(index == -1){
                AccessoriesSlotInt[slot].forEach(e=>{
                    let item_proxy = AccessoriesPlayerData[player.id][e];
                    if(item_proxy != undefined){
                        item_proxy = item_proxy.clone();
                        const originalSetDynamicProperty = item_proxy.setDynamicProperty;
                        item_proxy.setDynamicProperty = function(identifier, value){
                            originalSetDynamicProperty.call(this, identifier, value);
                            NoveltyManager.setItem(player, e, item_proxy);
                        };
                        item_proxy.hasItem = function(){
                            return true;
                        };
                    }else{
                        item_proxy = {};
                        item_proxy.hasItem = function(){
                            return false;
                        };
                    }
                    item_proxy.setItem = function(itemStack){
                        NoveltyManager.setItem(player, e, itemStack);
                    };

                    item_list.push(item_proxy);
                });
                return item_list;
            }else{
                let item_proxy = AccessoriesPlayerData[player.id][AccessoriesSlotInt[slot][index]];
                if(item_proxy != undefined){
                    item_proxy = item_proxy.clone();
                    const originalSetDynamicProperty = item_proxy.setDynamicProperty;
                    item_proxy.setDynamicProperty = function(identifier, value){
                        originalSetDynamicProperty.call(this, identifier, value);
                        NoveltyManager.setItem(player, AccessoriesSlotInt[slot][index], item_proxy);
                    };
                    item_proxy.hasItem = function(){
                        return true;
                    };
                }else{
                    item_proxy = {};
                    item_proxy.hasItem = function(){
                        return false;
                    };
                }
                item_proxy.setItem = function(itemStack){
                    NoveltyManager.setItem(player, AccessoriesSlotInt[slot][index], itemStack);
                };
                return item_proxy;
            }
        }else{
            let item_proxy = AccessoriesPlayerData[player.id][AccessoriesSlotInt[slot][0]];
            if(item_proxy != undefined){
                item_proxy = item_proxy.clone();
                const originalSetDynamicProperty = item_proxy.setDynamicProperty;
                item_proxy.setDynamicProperty = function(identifier, value){
                    originalSetDynamicProperty.call(this, identifier, value);
                    NoveltyManager.setItem(player, AccessoriesSlotInt[slot][0], item_proxy);
                };
                item_proxy.hasItem = function(){
                    return true;
                };
            }else{
                item_proxy = {};
                item_proxy.hasItem = function(){
                    return false;
                };
            }
            item_proxy.setItem = function(itemStack){
                NoveltyManager.setItem(player, AccessoriesSlotInt[slot][0], itemStack);
            };
            
            return item_proxy;
        }
    };

    static getAllAccessories(player){
        if(AccessoriesPlayerData[player.id] == undefined) return [];
        return cloneAccessories(AccessoriesPlayerData[player.id]);
    };

    static getAllAccessoriesSlot(player){
        if(AccessoriesPlayerData[player.id] == undefined) return [];
        let items = [];
        for(let i = 0; i < AccessoriesPlayerData[player.id].length; i++){
            let item_proxy = AccessoriesPlayerData[player.id][i];
            if(item_proxy != undefined){
                item_proxy = item_proxy.clone();
                const originalSetDynamicProperty = item_proxy.setDynamicProperty;
                item_proxy.setDynamicProperty = function(identifier, value){
                    originalSetDynamicProperty.call(this, identifier, value);
                    NoveltyManager.setItem(player, i, item_proxy);
                };
                item_proxy.hasItem = function(){
                    return true;
                };
            }else{
                item_proxy = {};
                item_proxy.hasItem = function(){
                    return false;
                };
            }
            item_proxy.setItem = function(itemStack){
                NoveltyManager.setItem(player, i, itemStack);
            };
            items.push(item_proxy);
        }
        return items;
    };

    static setItem(player, slot, itemStack){
        structure_manager.delete("mystructure:nvy" + slot + player.id);
        player.runCommand("scriptevent novelty:update_item " + slot + " " + player.id + " " + sesion_id);

        if(itemStack == undefined){
            AccessoriesPlayerData[player.id][slot] = undefined;
            return;
        }
        AccessoriesPlayerData[player.id][slot] = itemStack.clone();
        let location = {
            x: Math.round(player.location.x + Math.random() * 32 - 16),
            y: 0,
            z: Math.round(player.location.z + Math.random() * 32 - 16)
        }

        let item_entity = player.dimension.spawnItem(itemStack, {
            x: location.x + 0.5,
            y: location.y + 0.5,
            z: location.z + 0.5
        });
        item_entity.addTag("nvy:item_buffer");
        structure_manager.createFromWorld("mystructure:nvy" + slot + player.id, player.dimension, location, {
                x: location.x + 1,
                y: location.y + 1,
                z: location.z + 1
            }, {
            includeEntities: true,
            includeBlocks: false
        });

        item_entity.remove();
    }
}

system.afterEvents.scriptEventReceive.subscribe(s=>{
    if(s.id == "novelty:update"){
        AccessoriesPlayerData[s.message] = [];
        let inventory = s.sourceEntity.getComponent("minecraft:inventory");
        let container = inventory.container;
        for(let i = 0; i < container.size; i++){
            AccessoriesPlayerData[s.message][i] = container.getItem(i);
        }
    }else if(s.id == "novelty:update_item"){
        let data = s.message.split(' ');
        if(data[2] == sesion_id) return;

        let player = world.getEntity(data[1]);
        let location = {
            x: Math.round(player.location.x + Math.random() * 32 - 16),
            y: 0,
            z: Math.round(player.location.z + Math.random() * 32 - 16)
        }
        let structure = structure_manager.get("mystructure:nvy" + data[0] + data[1]);
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
                AccessoriesPlayerData[data[1]][data[0]] = item.getComponent("minecraft:item").itemStack;
                item.remove();
            }
        }else{
            AccessoriesPlayerData[data[1]][data[0]] = undefined;
        }

    }
}, { namespaces: [ "novelty" ]});

function cloneAccessories(items){
    if(Array.isArray(items)){
        let clone = [];
        items.forEach(item=>{
            if(item != undefined){
                clone.push(item.clone());
            }else{
                clone.push(undefined);
            }
        })
        return clone;
    }else{
        if(items != undefined){
            return items.clone();
        }else{
            return undefined;;
        }
    }
}

function updateAccessories(id, slot = undefined){
    let player = world.getEntity(id);
    let item_list = [];
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
    if(slot == undefined){
        for (let i = 0; i < 24; i++) {
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
                    item_list[i] = item_temp;
                    item.remove();
                }
            }else{
                item_list[i] = undefined;
            }
        }
        AccessoriesPlayerData[id] = item_list;
    }else{
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
                item_list[slot] = item_temp;
                item.remove();
            }
        }else{
            item_list[slot] = undefined;
        }
    }
}

world.afterEvents.playerJoin.subscribe(s=>{
    updateAccessories(s.playerId);
})

world.afterEvents.entityDie.subscribe(s=>{
    system.runTimeout(()=>{
        updateAccessories(s.deadEntity.id);
    }, 1);
}, {entityTypes: [ "minecraft:player" ]})