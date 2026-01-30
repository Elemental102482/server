import { EntityInventoryComponent, Player } from '@minecraft/server';

class players {
    constructor() {
        this.players = {};
        this.playerInventory = {};
    }

    /**
     * @param {Player} player 
     */
    
    addPlayer(player) {
        this.players[player.id] = player;     
    }
    
    getPlayers() {
        return this.players;
    }

    /**
     * @param {Player} player 
     */
    
    removePlayer(player) {
        if (this.players[player.id]) {
            delete this.players[player.id];
        } else {
            console.warn(`Player with id ${player.id} not found.`);
        }
    }

    /**
     * @param {Player} player 
     */

    addPlayerInventory(player) {
        this.playerInventory[player.id] = player.getComponent(EntityInventoryComponent.componentId).container;
    }

    /**
     * @param {Player} player 
     */

    removePlayerInventory(player) {
        if (this.playerInventory[player.id]) {
            delete this.playerInventory[player.id];
        } else {
            console.warn(`Player inventory with id ${player.id} not found.`);
        }
    }
}

export const playerManager = new players();