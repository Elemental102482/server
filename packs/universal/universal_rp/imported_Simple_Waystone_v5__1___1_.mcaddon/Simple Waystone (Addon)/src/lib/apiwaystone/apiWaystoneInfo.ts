import { waystoneEdit, waystoneForm, waystoneInfo } from "../../interfaces"
import { world, Block, Player, Vector3 } from "@minecraft/server"
import { apiWaystoneSpace } from "./apiWaystoneSpace"
import { colorDimension } from "../../ui/mainUi"
import { apiOrganize } from "../apiOrganize"
import { apiInfo } from "../apiInfo"

export const apiWaystoneInfo = new class apiWaystoneInfo {
  createPoint(player: Player, block: Block, info: waystoneForm, waystones: waystoneInfo[]){
    const name = apiOrganize.sameNames(info[0], waystones)
    if(!apiInfo.saveWaystone(player.id, {id: name, pos: block.location, world: player.dimension.id, owner: player.id, type: info[1] ? "public" : "private"}, waystones, info[1] ? "public" : "private")) return
    apiWaystoneSpace.setOn(player, block)
    player.onScreenDisplay.setActionBar({translate: "waystone.warning.createWaystone", with: [`${colorDimension[player.dimension.id]}${name}`]})
  }

  claimPoint(player: Player, waystone: waystoneInfo): boolean {
    if(waystone.type == "public") return true
    if(waystone.owner == player.id) return true
    const claimList: string[] = apiInfo.getClaimWaystones(waystone.pos)
    if(claimList.includes(player.id)) return true
    player.onScreenDisplay.setActionBar({translate: "waystone.warning.claimWaystone", with: [`${colorDimension[waystone.world]}${waystone.id}`]})
    player.playSound("random.levelup")
    return !apiInfo.saveClaimWaystones(waystone.pos, player.id)
  }

  editPoint(player: Player, info: waystoneForm, edit: waystoneEdit, waystones: waystoneInfo[]){
    const name = apiOrganize.sameNames(info[0], waystones, edit.index)
    waystones.splice(edit.index, 1)
    apiInfo.saveWaystone(player.id, {id: name, pos: edit.value.pos, world: player.dimension.id, owner: edit.value.owner, type: edit.value.type}, waystones, edit.value?.owner ? "public" : "private")
  }

  findWaystone(pos: Vector3){
    const waystones: { public: waystoneInfo[], [key: string]: waystoneInfo[] } = { public: apiInfo.getPublicWaypoint(), ...apiInfo.getAllPrivatePoints() }
    const waystone: { value: waystoneInfo | null, index: number | null } = {value: null, index: null}
    for(const id of Object.keys(waystones)){
      if(waystones[id].some(way => apiOrganize.sortPos(pos) == apiOrganize.sortPos(way.pos))){
        const index = waystones[id].findIndex(way => apiOrganize.sortPos(pos) == apiOrganize.sortPos(way.pos))
        waystone.value = waystones[id][index]
        waystone.index = index
        break
      }
    }
    if(!waystone.value) return
    return waystone
  }
}