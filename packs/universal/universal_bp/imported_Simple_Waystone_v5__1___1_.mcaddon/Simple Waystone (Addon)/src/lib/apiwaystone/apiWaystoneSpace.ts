import { world, BlockPermutation, Block, Dimension, Player, Vector3 } from "@minecraft/server"
import { waystoneInfo } from "../../interfaces"
import { maxXpCost } from "../../variables"

export const apiWaystoneSpace = new class apiWaystoneSpace {
  setBlock(dimension: Dimension, type: string, pos: Vector3, permutation: Record<string, string | number | boolean>){
    dimension.setBlockPermutation(pos, BlockPermutation.resolve(type, permutation))
  }

  setOff(player: Player, block: Block){
    this.setBlock(player.dimension, block.typeId, block.location, {"ws:waystone": 1})
    this.setBlock(player.dimension, block.typeId, block.above(1).location, {"ws:waystone": 2})
  }

  setOn(player: Player, block: Block){
    this.setBlock(player.dimension, block.typeId, block.location, {"ws:waystone": 1, "ws:waystone_on": true})
    this.setBlock(player.dimension, block.typeId, block.above(1).location, {"ws:waystone": 2, "ws:waystone_on": true})
  }

  calculateCost(player: Player, waystone: waystoneInfo){
    if(maxXpCost == 0) return 0
    if(player.dimension.id != waystone.world) return 3
    const playerPos = player.location
    const waystonePos = waystone.pos
    const distance = Math.floor(Math.sqrt((waystonePos.x - playerPos.x) ** 2  + (waystonePos.z - playerPos.z) ** 2)) / 1500
    return distance < 3 ? Math.floor(distance) : 3
  }

  setCenterVector(vector: Vector3): Vector3 {
    vector["x"] += 0.5
    vector["z"] += 0.5
    return vector
  }

  getRelativeVector(vector: Vector3, vertical = 1): Vector3 {
    vector["y"] += vertical
    return vector
  }
}