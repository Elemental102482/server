import { world } from "@minecraft/server";
import { defaultConfig } from "../functions/initialize";
import { apiOrganize } from "./apiOrganize";
export const apiInfo = new class apiInfo {
    getAllWaystones(player, type) {
        const config = (player ? JSON.parse(player.getDynamicProperty("ws:waystoneConfig")) : defaultConfig);
        switch (type) {
            case "private":
                return apiOrganize.organize(this.getPrivateWaypoint(player.id), config.organize);
            case "public":
                return apiOrganize.organize(this.getPublicWaypoint(), config.organize);
            default:
                return [...apiOrganize.organize(this.getPublicWaypoint(), config.organize), ...apiOrganize.organize(this.getPrivateWaypoint(player.id), config.organize)];
        }
    }
    getAllPrivatePoints() {
        const dynamics = world.getDynamicPropertyIds().map(str => str.startsWith("ws:waystonePrivate") ? str : null).filter(value => value !== null);
        const waystones = {};
        dynamics.forEach(dyn => {
            const id = dyn.replace("ws:waystonePrivate", "").split("=")[0];
            if (!waystones[id])
                waystones[id] = [];
            const wayInfo = JSON.parse(world.getDynamicProperty(dyn));
            waystones[id].push(...wayInfo.map(info => ({ id: info[0], pos: { x: info[1][0], y: info[1][1], z: info[1][2] }, world: info[2], owner: info[3], type: info[4] })));
        });
        return waystones;
    }
    getPrivateWaypoint(id) {
        const dynamics = world.getDynamicPropertyIds();
        const wayPrivate = [];
        dynamics.forEach(way => {
            if (way.startsWith(`ws:waystonePrivate${id}=`)) {
                const privateInfo = JSON.parse(world.getDynamicProperty(way));
                wayPrivate.push(...privateInfo.map(info => ({ id: info[0], pos: { x: info[1][0], y: info[1][1], z: info[1][2] }, world: info[2], owner: info[3], type: info[4] })));
            }
        });
        return wayPrivate;
    }
    getPublicWaypoint() {
        const dynamics = world.getDynamicPropertyIds();
        const wayPublic = [];
        dynamics.forEach(way => {
            if (way.startsWith("ws:waystonePublic=")) {
                const publicInfo = JSON.parse(world.getDynamicProperty(way));
                wayPublic.push(...publicInfo.map(info => ({ id: info[0], pos: { x: info[1][0], y: info[1][1], z: info[1][2] }, world: info[2], owner: info[3], type: info[4] })));
            }
        });
        return wayPublic;
    }
    saveWaystone(id, waystone, waystones, type) {
        waystones.unshift(waystone);
        return this.saveAllWaystones(id, waystones, type);
    }
    saveAllWaystones(id, waystones, type) {
        let list = waystones;
        for (let i = 0; i < Math.floor(waystones.length / (32767 / 300)) + 1; i++) {
            let temp = [];
            for (let i2 = 0; i2 < Math.floor(32767 / 300); i2++) {
                if (!list[0])
                    break;
                if (JSON.stringify(list[0]).length > 300)
                    continue;
                const first = list.shift();
                temp.push([first.id, [first.pos.x, first.pos.y, first.pos.z], first.world, first.owner, first.type]);
            }
            const newType = `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`;
            world.setDynamicProperty(`ws:waystone${newType}${type == "public" ? "" : id}=${i + 1}`, JSON.stringify([]));
            world.setDynamicProperty(`ws:waystone${newType}${type == "public" ? "" : id}=${i}`, JSON.stringify(temp));
        }
        return true;
    }
    getAllClaimWaystone(id) {
        const claimList = world.getDynamicPropertyIds().map(way => way.startsWith(`ws:{'x':`) ? way : null).filter(value => value !== null);
        const waystonesPos = [];
        claimList.forEach(list => {
            const way = JSON.parse(world.getDynamicProperty(list));
            if (way.includes(id))
                waystonesPos.push(list.replace("ws:", "").replaceAll("'", "\"").split("=")[0]);
        });
        if (waystonesPos.length < 1)
            return [];
        const privateWay = [];
        const allWaystones = this.getAllPrivatePoints();
        Object.keys(allWaystones).forEach(id => {
            privateWay.push(...allWaystones[id].map(way => waystonesPos.includes(JSON.stringify(way.pos)) ? way : null).filter(value => value !== null));
        });
        return privateWay;
    }
    getClaimWaystones(pos) {
        const dynamics = world.getDynamicPropertyIds().map(way => way.startsWith(`ws:${apiOrganize.sortPos(pos).replaceAll("\"", "'")}=`) ? way.replaceAll("\"", "'") : null).filter(value => value !== null);
        const claimList = [];
        dynamics.forEach(way => { claimList.push(...JSON.parse(world.getDynamicProperty(way))); });
        return claimList;
    }
    saveClaimWaystones(pos, id) {
        const claimList = this.getClaimWaystones(pos);
        claimList.unshift(id);
        const reduce = claimList.reduce((acc, player) => {
            if (!acc.includes(player))
                acc.push(player);
            return acc;
        }, []);
        const list = reduce;
        for (let i = 0; i < Math.floor(reduce.length / (32767 / 650)) + 1; i++) {
            let temp = [];
            for (let i2 = 0; i2 < Math.floor(32767 / 650); i2++) {
                if (!list[0])
                    break;
                if (JSON.stringify(list[0]).length > 650)
                    continue;
                temp.push(list.shift());
            }
            world.setDynamicProperty(`ws:${apiOrganize.sortPos(pos).replaceAll("\"", "'")}=${i + 1}`, JSON.stringify([]));
            world.setDynamicProperty(`ws:${apiOrganize.sortPos(pos).replaceAll("\"", "'")}=${i}`, JSON.stringify(temp));
        }
        return true;
    }
    getWaystoneList(player, ignoreConfig = false) {
        const config = JSON.parse(player.getDynamicProperty("ws:waystoneConfig"));
        const publicWay = (ignoreConfig ? true : config.showPublic) ? this.getAllWaystones(player, "public") : [];
        const privateWay = this.getAllWaystones(player, "private");
        const claimWay = this.getAllClaimWaystone(player.id);
        return apiOrganize.organize([...publicWay, ...privateWay, ...claimWay], config.organize);
    }
};
