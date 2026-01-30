import { apiWaystoneSpace } from "../lib/apiwaystone/apiWaystoneSpace";
import { world, system } from "@minecraft/server";
import { apiOrganize } from "../lib/apiOrganize";
import { apiInfo } from "../lib/apiInfo";
world.afterEvents.playerBreakBlock.subscribe(({ brokenBlockPermutation: blockPerm, block: b, dimension, itemStackBeforeBreak: item, player }) => {
    if (blockPerm.type.id.includes("ws:waystone_")) {
        if (!item?.getComponent("enchantable")?.hasEnchantment("minecraft:silk_touch") && player.getGameMode() != "creative")
            dimension.spawnItem(blockPerm.getItemStack(), apiWaystoneSpace.setCenterVector(b.location));
        if (!blockPerm.getState("ws:waystone_on"))
            return;
        const block = blockPerm.getState("ws:waystone") == 1 ? b : b.below(1);
        removeWaystone(dimension, block.location);
        player.playSound("beacon.deactivate", { location: block.location });
    }
});
const explosed = [];
world.afterEvents.blockExplode.subscribe(({ block: b, explodedBlockPermutation: blockPerm, dimension }) => {
    if (blockPerm.type.id.includes("ws:waystone_")) {
        const newPos = apiWaystoneSpace.getRelativeVector(b.location, blockPerm.getState("ws:waystone") == 1 ? 1 : -1);
        if (!explosed.includes(JSON.stringify(newPos))) {
            dimension.spawnItem(blockPerm.getItemStack(), apiWaystoneSpace.setCenterVector(b.location));
            const index = explosed.push(JSON.stringify(b.location)) - 1;
            system.runTimeout(() => { explosed.splice(index, 1); }, 20);
        }
        if (!blockPerm.getState("ws:waystone_on"))
            return;
        const block = blockPerm.getState("ws:waystone") == 1 ? b : b.below(1);
        removeWaystone(dimension, block.location);
    }
});
const pistonDirection = [["y", -1], ["y", 1], ["z", 1], ["z", -1], ["x", 1], ["x", -1]];
world.afterEvents.pistonActivate.subscribe(({ block, dimension, isExpanding, piston }) => {
    const increase = pistonDirection[block.permutation.getState("facing_direction")];
    const locations = piston.getAttachedBlocksLocations();
    system.runTimeout(() => {
        for (let pos of locations) {
            try {
                pos[increase[0]] += increase[1] * (isExpanding ? 1 : -1);
                const block = dimension.getBlock(pos);
                if (!block.typeId.includes("ws:waystone_"))
                    continue;
                dimension.setBlockType(pos, "minecraft:air");
                pos[increase[0]] += increase[1] * (isExpanding ? -1 : 1);
                removeWaystone(dimension, pos);
            }
            catch (e) {
                console.warn(e);
            }
        }
    }, 2);
});
export function removeWaystone(dimension, pos) {
    const publicWay = apiInfo.getAllWaystones(null, "public");
    const waystonePub = publicWay.findIndex(way => apiOrganize.sortPos(way.pos) == apiOrganize.sortPos(pos) && way.world == dimension.id);
    if (waystonePub != -1) {
        publicWay.splice(waystonePub, 1);
        return apiInfo.saveAllWaystones(null, publicWay, "public");
    }
    const allWaystonePrivate = apiInfo.getAllPrivatePoints();
    for (const id of Object.keys(allWaystonePrivate)) {
        const waystones = allWaystonePrivate[id];
        const waystoneIndex = waystones.findIndex(way => apiOrganize.sortPos(way.pos) == apiOrganize.sortPos(pos) && way.world == dimension.id);
        if (waystoneIndex == -1)
            continue;
        waystones.splice(waystoneIndex, 1);
        apiInfo.saveAllWaystones(id, waystones, "private");
    }
    const claimList = world.getDynamicPropertyIds().map(dyn => dyn.startsWith(`ws:${apiOrganize.sortPos(pos).replaceAll("\"", "'")}=`) ? dyn.replaceAll("\"", "'") : null).filter(value => value !== null);
    claimList.forEach(way => { world.setDynamicProperty(way, JSON.stringify([])); });
}
