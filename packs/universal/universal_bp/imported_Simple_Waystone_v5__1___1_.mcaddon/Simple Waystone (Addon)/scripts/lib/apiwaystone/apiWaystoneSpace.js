import { BlockPermutation } from "@minecraft/server";
import { maxXpCost } from "../../variables";
export const apiWaystoneSpace = new class apiWaystoneSpace {
    setBlock(dimension, type, pos, permutation) {
        dimension.setBlockPermutation(pos, BlockPermutation.resolve(type, permutation));
    }
    setOff(player, block) {
        this.setBlock(player.dimension, block.typeId, block.location, { "ws:waystone": 1 });
        this.setBlock(player.dimension, block.typeId, block.above(1).location, { "ws:waystone": 2 });
    }
    setOn(player, block) {
        this.setBlock(player.dimension, block.typeId, block.location, { "ws:waystone": 1, "ws:waystone_on": true });
        this.setBlock(player.dimension, block.typeId, block.above(1).location, { "ws:waystone": 2, "ws:waystone_on": true });
    }
    calculateCost(player, waystone) {
        if (maxXpCost == 0)
            return 0;
        if (player.dimension.id != waystone.world)
            return 3;
        const playerPos = player.location;
        const waystonePos = waystone.pos;
        const distance = Math.floor(Math.sqrt((waystonePos.x - playerPos.x) ** 2 + (waystonePos.z - playerPos.z) ** 2)) / 1500;
        return distance < 3 ? Math.floor(distance) : 3;
    }
    setCenterVector(vector) {
        vector["x"] += 0.5;
        vector["z"] += 0.5;
        return vector;
    }
    getRelativeVector(vector, vertical = 1) {
        vector["y"] += vertical;
        return vector;
    }
};
