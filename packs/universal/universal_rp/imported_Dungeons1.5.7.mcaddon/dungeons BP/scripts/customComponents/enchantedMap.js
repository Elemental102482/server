import {
  world

} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:enchanted_map', {
    onUse(e) {
      const player = e.source;
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');
      if (!selectedItem) return;
      if (!player.matches({gameMode: 'creative'})) {
        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
      }

      player.runCommandAsync('function loot/endersentMap');
    }
  });
});