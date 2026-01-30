import { apiWaystoneSpace } from "../lib/apiwaystone/apiWaystoneSpace";
import { apiWaystoneInfo } from "../lib/apiwaystone/apiWaystoneInfo";
import { world, system } from "@minecraft/server";
import { waystoneUi } from "../ui/mainUi";
const replaceBlock = ["minecraft:air", "minecraft:lava", "minecraft:water"];
world.beforeEvents.worldInitialize.subscribe((data) => {
    data.blockComponentRegistry.registerCustomComponent("ws:waystone", {
        beforeOnPlayerPlace: e => {
            const { block, dimension, player } = e;
            const up = block.above(1);
            if (!replaceBlock.includes(up.typeId) || up.location.y >= dimension.heightRange.max)
                return e.cancel = true;
            system.runTimeout(() => {
                apiWaystoneSpace.setOff(player, block);
                waystoneUi.createPoint(player, block);
            });
        },
        onPlayerInteract: e => {
            const { block: b, player } = e;
            const perm = b.permutation.getAllStates();
            const block = perm["ws:waystone"] == 1 ? b : b.below(1);
            if (!perm["ws:waystone_on"])
                return waystoneUi.createPoint(player, block);
            const waystone = apiWaystoneInfo.findWaystone(block);
            if (!waystone) {
                apiWaystoneSpace.setOff(player, block);
                player.playSound("note.bass", { location: b.location });
                return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.corrupted" });
            }
            if (!apiWaystoneInfo.claimPoint(player, waystone.value))
                return;
            if (player.isSneaking)
                return waystoneUi.settingsMenu(player, block, waystone);
            waystoneUi.waystoneList(player, waystone.value);
        }
    });
    data.itemComponentRegistry.registerCustomComponent("ws:warpstone", {
        onUse: ({ source: player }) => {
            if (player.getGameMode() == "creative") {
                player.setDynamicProperty("ws:warpstoneCooldown", Math.floor(new Date().getTime() / 1000) - 1);
                return waystoneUi.waystoneList(player);
            }
            const date = Math.floor(new Date().getTime() / 1000);
            const cooldownEnd = player.getDynamicProperty("ws:warpstoneCooldown") ?? new Date().getTime() / 1000 - 1;
            if (date > cooldownEnd)
                return waystoneUi.waystoneList(player);
            player.onScreenDisplay.setActionBar({ translate: "warpstone.warning.cooldown", with: [`${cooldownEnd - date}s`] });
        }
    });
});
