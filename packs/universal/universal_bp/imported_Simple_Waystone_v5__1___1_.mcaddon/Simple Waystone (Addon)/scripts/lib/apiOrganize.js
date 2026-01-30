import { organizeDimension } from "../ui/mainUi";
const showDimension = [["minecraft:overworld", "minecraft:nether", "minecraft:the_end"], ["minecraft:overworld"], ["minecraft:nether"], ["minecraft:the_end"]];
const dimensionList = { "world": "minecraft:overworld", "nether": "minecraft:nether", "end": "minecraft:the_end" };
const currentDimension = { "minecraft:overworld": 1, "minecraft:nether": 3, "minecraft:the_end": 5 };
export const apiOrganize = new class apiOrganize {
    organize(list, type) {
        const waystones = list;
        if (!type)
            return waystones.sort((a, z) => { return a.id.localeCompare(z.id); });
        return waystones.sort((a, z) => { return z.id.localeCompare(a.id); });
    }
    organizeDimension(player, list) {
        const config = JSON.parse(player.getDynamicProperty("ws:waystoneConfig"));
        const publicWay = list.filter(value => value.type == "public").filter(value => showDimension[config.showDimension].includes(value.world));
        const privateWay = list.filter(value => value.type == "private").filter(value => showDimension[config.showDimension].includes(value.world));
        const order = organizeDimension[config.organizeDimension == 0 ? currentDimension[player.dimension.id] : config.organizeDimension].replace("ui.waystone.settings.dropdown.organizeDimension.", "").split("-").map(value => (`${dimensionList[value]}`));
        const wayPublic = publicWay.sort((a, b) => order.indexOf(a.world) - order.indexOf(b.world));
        const wayPrivate = privateWay.sort((a, b) => order.indexOf(a.world) - order.indexOf(b.world));
        const sortedFirst = [...wayPublic, ...wayPrivate];
        const sortedLast = [...wayPrivate, ...wayPublic];
        if (config.organizePublic < 2)
            return config.organizePublic == 0 ? sortedFirst.sort((a, b) => order.indexOf(a.world) - order.indexOf(b.world)) : sortedLast.sort((a, b) => order.indexOf(a.world) - order.indexOf(b.world));
        return config.organizePublic == 2 ? sortedFirst : sortedLast;
    }
    sameNames(name, waystones, index) {
        const waystonesName = waystones.map(obj => obj.id);
        let newName = name;
        if (typeof index == "number")
            waystonesName.splice(index, 1);
        let counter = 1;
        while (waystonesName.includes(newName)) {
            newName = `${name} (${counter})`;
            counter++;
        }
        return newName;
    }
    sortPos(pos) { return JSON.stringify({ x: pos.x, y: pos.y, z: pos.z }); }
};
