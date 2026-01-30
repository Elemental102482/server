import { system, world, ItemStack, GameMode } from '@minecraft/server';


const itemsId = [
    'cata:recall_mirror',
];

world.beforeEvents.itemUse.subscribe(evb => {
    const { source: player, itemStack: itemUsed } = evb;
    if (!itemUsed) return;

    if (itemsId.includes(itemUsed.typeId)) {
        const playerEquippableComp = player.getComponent("equippable");
        if (!playerEquippableComp) return;
        if (player.matches({ gameMode: GameMode.creative })) return;
        const randomizeChance = Math.random() * 100;
        const itemEnchantmentComp = itemUsed.getComponent("minecraft:enchantable");
        const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
        const breakChance = 100 / (unbreakingLevel + 1);
        if (breakChance < randomizeChance) return;
        const itemUsedDurabilityComp = itemUsed.getComponent("durability");
        if (!itemUsedDurabilityComp) return;
        system.run(function () {
            const maxDurability = itemUsedDurabilityComp.maxDurability
            const currentDamage = itemUsedDurabilityComp.damage
            if (currentDamage >= maxDurability) {
                system.run(() => {
                    player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 })
                    playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
                });
            }
            else if (currentDamage < maxDurability) {
                system.run(() => {
                    itemUsedDurabilityComp.damage += 1;
                    playerEquippableComp.setEquipment("Mainhand", itemUsed);
                });
            }
        })
    }
})

