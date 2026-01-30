import { ItemStack, EquipmentSlot, EntityEquippableComponent, system } from '@minecraft/server';
const slabs = [
    { id: "cata:gneiss_brick_slab" },
    { id: "cata:flare_stone_brick_slab" },
    { id: "cata:asteroid_brick_slab" },
    { id: "cata:terrorite_brick_slab" },
];
system.beforeEvents.startup.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('component:on_player_destroy', {
        onPlayerDestroy: ({
            block,
            player,
            destroyedBlockPermutation: permutation,
        }) => {
            if (permutation.hasTag("stone")) {
                const equippable = player.getComponent(EntityEquippableComponent.componentId);
                const itemStack = equippable.getEquipment(EquipmentSlot.Mainhand);
                if (itemStack === void 0)
                    return;

                const isPickaxe = itemStack.hasTag("minecraft:is_pickaxe");
                if (!isPickaxe)
                    return;
            };

            player.dimension.spawnItem(
                new ItemStack(permutation.type.id), block.location
            );
        },
    });
});
