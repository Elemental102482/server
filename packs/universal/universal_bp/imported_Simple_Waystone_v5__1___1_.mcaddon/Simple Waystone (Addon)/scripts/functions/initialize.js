import { world } from "@minecraft/server";
export const defaultConfig = {
    organize: false,
    organizeDimension: 0,
    showDimension: 0,
    organizePublic: 0,
    showPublic: true
};
world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
    if (!initialSpawn)
        return;
    if (!player.getDynamicProperty("ws:waystoneConfig")) {
        world.setDynamicProperty(`ws:waystonePrivate${player.id}=0`, JSON.stringify([]));
        player.setDynamicProperty("ws:waystoneConfig", JSON.stringify(defaultConfig));
    }
    if (!world.getDynamicProperty("ws:waystonePublic=0")) {
        world.setDynamicProperty("ws:waystonePublic=0", JSON.stringify([]));
    }
});
