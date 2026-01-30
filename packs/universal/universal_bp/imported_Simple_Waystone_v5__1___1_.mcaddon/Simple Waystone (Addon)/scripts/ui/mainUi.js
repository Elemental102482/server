import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { apiWaystoneSpace } from "../lib/apiwaystone/apiWaystoneSpace";
import { apiWaystoneInfo } from "../lib/apiwaystone/apiWaystoneInfo";
import { world, system } from "@minecraft/server";
import { apiOrganize } from "../lib/apiOrganize";
import { apiInfo } from "../lib/apiInfo";
import { removeWaystone } from "../functions/destroy";
export const organizeDimension = ["ui.waystone.settings.dropdown.organizeDimension.current", "ui.waystone.settings.dropdown.organizeDimension.world-nether-end", "ui.waystone.settings.dropdown.organizeDimension.world-end-nether", "ui.waystone.settings.dropdown.organizeDimension.nether-world-end", "ui.waystone.settings.dropdown.organizeDimension.nether-end-world", "ui.waystone.settings.dropdown.organizeDimension.end-world-nether", "ui.waystone.settings.dropdown.organizeDimension.end-nether-world"];
const organizePublic = ["ui.waystone.settings.dropdown.organizePublic.firstDimension", "ui.waystone.settings.dropdown.organizePublic.lastDimension", "ui.waystone.settings.dropdown.organizePublic.firstList", "ui.waystone.settings.dropdown.organizePublic.lastList"];
export const colorDimension = { "minecraft:overworld": "§2", "minecraft:nether": "§4", "minecraft:the_end": "§u" };
const xpSprite = ["", " - \ue700", " - \ue701", " - \ue702"];
export const waystoneUi = new class waystoneUi {
    createPoint(player, block, edit) {
        const form = new ModalFormData()
            .title(`ui.waystone.${edit ? "edit" : "create"}.title`)
            .textField("ui.waystone.create.textField", "ui.waystone.create.textFieldHold", edit ? edit.value.id : undefined);
        if (!edit)
            form.toggle("ui.waystone.create.toggle");
        form.submitButton("ui.waystone.create.button")
            .show(player).then(r => {
            if (r.canceled)
                return;
            const options = r.formValues;
            if (!options[0])
                return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.failCreateWaystone" });
            if (options[0].replaceAll(/§./g, "").replaceAll("§", "").length < 1)
                return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.failCreateWaystone" });
            //if(edit) return apiWaystoneInfo.editPoint(player, options, edit, apiInfo.getAllWaystones(player, edit.value.type))
            apiWaystoneInfo.createPoint(player, block, options, apiInfo.getAllWaystones(player, r.formValues[1] ? "public" : "private"));
            player.playSound("block.enchanting_table.use", { location: block.location });
        });
    }
    waystoneList(player, waystone) {
        const config = JSON.parse(player.getDynamicProperty("ws:waystoneConfig"));
        const waystones = apiOrganize.organizeDimension(player, apiInfo.getWaystoneList(player));
        const buttons = waystones.map(value => ({ id: `${colorDimension[value.world]}${value.id}§r${xpSprite[apiWaystoneSpace.calculateCost(player, value)]}`, cost: apiWaystoneSpace.calculateCost(player, value), type: value.type }));
        if (buttons.length < 1)
            return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.failFindWaystones" });
        const form = new ActionFormData()
            .title({ translate: "ui.waystone.list.title", with: [waystone ? ` - ${colorDimension[waystone.world]}${waystone.id}§r` : ""] })
            .body("ui.waystone.list.body");
        buttons.forEach(button => { config.showPublic ? form.button({ "rawtext": [{ "text": `${button.id}\n` }, { "translate": `ui.waystone.list.${button.type}` }] }) : form.button(button.id); });
        form.show(player).then(r => {
            if (r.canceled)
                return;
            const button = buttons[r.selection];
            const selected = waystones[r.selection];
            if (selected.id == waystone?.id)
                return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.tpCurrentWaystone" });
            if (player.level >= button.cost || player.getGameMode() == "creative") {
                if (!waystone)
                    player.setDynamicProperty("ws:warpstoneCooldown", Math.floor(new Date().getTime() / 1000) + 59);
                if (player.getGameMode() != "creative")
                    player.addLevels(-button.cost);
                player.teleport({ x: selected.pos.x + 0.5, y: selected.pos.y, z: selected.pos.z + 0.5 }, { dimension: world.getDimension(selected.world) });
                system.runTimeout(() => {
                    try {
                        const block = player.dimension.getBlock(selected.pos);
                        if (!block.typeId.includes("ws:waystone_")) {
                            removeWaystone(player.dimension, selected.pos);
                            player.onScreenDisplay.setActionBar({ translate: "waystone.warning.corrupted" });
                            player.playSound("note.bass", { location: waystone ? waystone.pos : player.location });
                        }
                    }
                    catch { }
                }, 20);
                return;
            }
            player.onScreenDisplay.setActionBar({ translate: "waystone.warning.insufficientXp" });
            player.playSound("note.bass", { location: waystone ? waystone.pos : player.location });
        });
    }
    settingsMenu(player, block, waystone) {
        const owner = waystone.value?.owner ?? player.id;
        if (owner != player.id)
            return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.notOwner" });
        new ActionFormData()
            .title("ui.waystone.settingsMenu.title")
            .body("ui.waystone.settingsMenu.body")
            //.button("ui.waystone.settingsMenu.button.edit")
            .button("ui.waystone.settingsMenu.title")
            .button("ui.waystone.removeWaystone.title")
            .show(player).then(r => {
            if (r.canceled)
                return;
            //if(r.selection == 0) return this.createPoint(player, block, waystone)
            if (r.selection == 0)
                return this.settingsWaystone(player);
            return this.removeWaystones(player);
        });
    }
    settingsWaystone(player) {
        const config = JSON.parse(player.getDynamicProperty("ws:waystoneConfig"));
        new ModalFormData()
            .title("ui.waystone.settingsMenu.title")
            .toggle("ui.waystone.settings.toggle.organize", config.organize)
            .dropdown("ui.waystone.settings.dropdown.organizeDimension", organizeDimension, config.organizeDimension)
            .dropdown("ui.waystone.settings.dropdown.showDimension", ["ui.waystone.settings.dropdown.showDimension.all", "ui.waystone.settings.dropdown.showDimension.world", "ui.waystone.settings.dropdown.showDimension.nether", "ui.waystone.settings.dropdown.showDimension.end"], config.showDimension)
            .dropdown("ui.waystone.settings.dropdown.organizePublic", organizePublic, config.organizePublic)
            .toggle("ui.waystone.settings.toggle.showPublic", config.showPublic)
            .submitButton("ui.waystone.create.button")
            .show(player).then(r => {
            if (r.canceled) {
                player.playSound("random.break", { location: player.location });
                return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.cancelSettings" });
            }
            const options = r.formValues;
            config.organize = options[0];
            config.organizeDimension = options[1];
            config.showDimension = options[2];
            config.organizePublic = options[3];
            config.showPublic = options[4];
            player.setDynamicProperty("ws:waystoneConfig", JSON.stringify(config));
            player.onScreenDisplay.setActionBar({ translate: "waystone.warning.saveSettings" });
            player.playSound("random.levelup", { location: player.location });
        });
    }
    removeWaystones(player) {
        const allWaystones = apiOrganize.organizeDimension(player, apiInfo.getWaystoneList(player, true));
        const myWaystones = allWaystones.filter(way => way.owner == player.id);
        if (myWaystones.length < 1) {
            player.playSound("note.bass");
            return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.failFindWaystones" });
        }
        const form = new ActionFormData()
            .title("ui.waystone.removeWaystone.title")
            .body("ui.waystone.removeWaystone.body");
        myWaystones.forEach(button => { form.button({ "rawtext": [{ "text": `${colorDimension[button.world]}${button.id}§r\n` }, { "translate": `ui.waystone.list.${button.type}` }] }); });
        form.show(player).then(r => {
            if (r.canceled)
                return;
            const selected = myWaystones[r.selection];
            new MessageFormData()
                .title("ui.waystone.removeWaystone.title")
                .body({ translate: "ui.waystone.removeWaystone.confirm.body", with: [`${colorDimension[selected.world]}${selected.id}§r`] })
                .button1("ui.waystone.no")
                .button2("ui.waystone.yes")
                .show(player).then(r => {
                if (r.canceled || r.selection == 0) {
                    player.playSound("random.break");
                    return player.onScreenDisplay.setActionBar({ translate: "waystone.warning.dontDeletedWaystones" });
                }
                removeWaystone(world.getDimension(selected.world), selected.pos);
                player.playSound("random.levelup");
                player.onScreenDisplay.setActionBar({ translate: "waystone.warning.deletedWaystones", with: [`${colorDimension[selected.world]}${selected.id}§r`] });
            });
        });
    }
};
