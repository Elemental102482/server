import { system, world} from '@minecraft/server'
import { MinecraftDimensionTypes } from '@minecraft/vanilla-data'

class WorldModel{
    constructor(){
        this.backpackDebugging = false
        this.allPlayers = []
        this.backpackEntities = []
        this.backpackEvents = []
    }
    
    updateAllPlayers(){
        this.allPlayers = world.getAllPlayers()
    }

    updateAllBackpacks(){
        this.backpackEntities = []
        const dimensions = [MinecraftDimensionTypes.Overworld, MinecraftDimensionTypes.Nether, MinecraftDimensionTypes.TheEnd]
        for(let dimension of dimensions){
            let bpEntities = world.getDimension(dimension).getEntities({type:"bps:container_entity_temp"})
            for(let bp of bpEntities){
                this.backpackEntities.push(bp)
            }
        }
    }

    addBackpackEvent(eventObject){
        this.backpackEvents.push(eventObject)
    }

    addPlayer(player){
        this.allPlayers.push(player)
    }

    removePlayer(playerName){
        try{
            this.allPlayers = this.allPlayers.filter(player => player.name != playerName)
        }catch(e){
            console.warn(e)
        }
    }

    removePlayerIndex(index){
        try{
            this.allPlayers.splice(index, 1)
        }catch(e){
            console.warn(e)
        }
    }

    addBackpack(backpack){
        this.backpackEntities.push(backpack)
    }

    getAllBackpacks(){
        return this.backpackEntities
    }

    getBackpacksWithTag(tag) {
        return this.backpackEntities.filter(bpEntity => bpEntity.isValid && bpEntity.hasTag(tag));
    }

    getAllPlayers(){
        return this.allPlayers
    }
}

const sharedWorldModel = new WorldModel();

export default sharedWorldModel;