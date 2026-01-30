import { system, world} from '@minecraft/server'
import WorldManager from './WorldManager.js'

//Not Being Use
export class MainHandItemChange {
    constructor() {
        this.running = true
    }

    subscribe(method) {
        const playerSlotIndex = {}
        this.run = system.runInterval(() => {
            const allPlayers = WorldManager.getAllPlayers()
            for (const player of allPlayers) {
                if (!player.isValid) continue
                const mainhandSlot = player.selectedSlotIndex
                const oldMainhandSlot = playerSlotIndex[player.id]?.slot

                if (mainhandSlot !== oldMainhandSlot) {
                    method({mainhandSlot, oldMainhandSlot, player})
                }

                playerSlotIndex[player.id] = { slot: mainhandSlot }
            }
        })
    }

    unsubscribe() {
        this.running = false
        system.clearRun(this.run)
    }
}

export class PlayerHoldingBackpack{
    constructor(){
        this.running = true
    }

    subscribe(method){
        this.run = system.runInterval(()=>{
            let index = 0
            let allPlayers = WorldManager.getAllPlayers();
            for(let player of allPlayers){
                if(!player.isValid){
                    WorldManager.removePlayerIndex(index)
                    break;
                }
                index++
                const container = player.getComponent("inventory").container
                const itemHolding = container.getItem(player.selectedSlotIndex)
                if(itemHolding){
                    if(itemHolding.typeId.includes("bps:backpack")){
                        method({itemHolding, player})
                    }
                }          
            }
        })
    }

    unsubscribe(){
        this.running = false
        system.clearRun(this.run)
    }
}

export class BackpackClosing{
    constructor(){
        this.running = true
    }

    subscribe(method){
        this.run = system.runInterval(()=>{
            const backpackEntities = WorldManager.getBackpacksWithTag("close")
            if(backpackEntities.length>0){
                backpackEntities.forEach(bpEntity => {
                    method({ bpEntity });
                });          
            }
        })
    }

    unsubscribe(){
        this.running = false
        system.clearRun(this.run)
    }
}