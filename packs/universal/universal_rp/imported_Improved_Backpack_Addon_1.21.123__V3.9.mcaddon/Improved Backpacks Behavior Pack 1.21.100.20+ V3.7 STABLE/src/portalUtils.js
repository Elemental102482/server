import {world} from "@minecraft/server"

/**
 * 
 * @param {Dimension} Dimension 
 * @param {import("@minecraft/server").Vector3} Location 
 * @returns {Boolean}
 */
function checkForNearbyPortal(Dimension, Location){
    const newLocation = Location
    newLocation.y += 1
    try{
        const currentPositionBlock = Dimension.getBlock(newLocation)
        const blockList = [
            currentPositionBlock,
            currentPositionBlock.above(1),
            currentPositionBlock.below(1),
            currentPositionBlock.north(1),
            currentPositionBlock.south(1),
            currentPositionBlock.east(1),
            currentPositionBlock.west(1)
        ]
        for(const block of blockList){
            if(block.typeId.includes("portal")){
                return true
            }
        }
    }catch(e){}
    return false
}

export default {
    checkForNearbyPortal
}