import { EntityEquippableComponent, EquipmentSlot, Direction, GameMode, system } from "@minecraft/server";
const slabs = [
    { id: "cata:gneiss_brick_slab" },
    { id: "cata:flare_stone_brick_slab" },
    { id: "cata:asteroid_brick_slab" },
    { id: "cata:terrorite_brick_slab" },
];

system.beforeEvents.startup.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('component:on_interact', {
        onPlayerInteract: ({ block, player, face }) => {
            const equippable = player.getComponent(EntityEquippableComponent.componentId);
            const itemStack = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
            if (itemStack === void 0)
                return;

            const isDouble = block.permutation.getState("cata:double");
            if (block.typeId !== itemStack.typeId || isDouble)
                return;

            const verticalHalf = block.permutation.getState("minecraft:vertical_half");
            const isBottomUp = (verticalHalf === "bottom") && (face === Direction.Up);
            const isTopDown = (verticalHalf === "top") && (face === Direction.Down);
            if (!isBottomUp && !isTopDown)
                return;

            if (player.getGameMode() !== GameMode.creative) {
                if (itemStack.amount == 1) {
                    itemStack.setItem(void 0);
                }
                else itemStack.amount--;
            };

            block.setPermutation(
                block.permutation.withState("cata:double", true),
            );
            player.playSound("use.stone");
        },
    });
});