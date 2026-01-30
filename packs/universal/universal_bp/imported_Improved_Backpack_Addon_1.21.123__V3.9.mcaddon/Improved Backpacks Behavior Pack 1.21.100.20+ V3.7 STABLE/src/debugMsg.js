import { world } from "@minecraft/server";
import WorldManager from './WorldManager.js'

export function sendDebugMsg(msg){
    if(WorldManager.backpackDebugging){
        world.sendMessage(`§a§l[Backpack Debug] §r${msg}`)
    }
}