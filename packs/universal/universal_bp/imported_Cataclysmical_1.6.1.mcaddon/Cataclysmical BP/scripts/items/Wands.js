import { world, TicksPerSecond, system } from '@minecraft/server'


//stellar
world.beforeEvents.itemUse.subscribe(({ source, itemStack }) => {
    if (source.typeId !== 'minecraft:player') return;

    const head = source.getHeadLocation();
    const view = source.getViewDirection();

    if (itemStack?.typeId === 'cata:stellar_wand') {
        system.run(() => {
            const entity = source.dimension.spawnEntity('cata:stellar_bolt', { x: head.x, y: head.y + 0.1, z: head.z });
            const projectile = entity.getComponent('projectile');

            projectile.owner = source;
            projectile.shoot({ x: view.x * 1, y: view.y * 1, z: view.z * 1 });
        });
    }
});


//floret_wand
world.beforeEvents.itemUse.subscribe(({ source, itemStack }) => {
    if (source.typeId !== 'minecraft:player') return;
    const selectedItem2 = source.getComponent('equippable').getEquipment('Offhand')

    const head = source.getHeadLocation();
    const view = source.getViewDirection();

    if (itemStack?.typeId === 'cata:floret_wand' && selectedItem2?.typeId === 'cata_floret_rune') {
        system.run(() => {
            const entity = source.dimension.spawnEntity('cata:floret_bolt', { x: head.x, y: head.y + 0.1, z: head.z });
            const projectile = entity.getComponent('projectile');

            projectile.owner = source;
            projectile.shoot({ x: view.x * 1, y: view.y * 1, z: view.z * 1 });
        });
    }
});

































//solar_wand
world.beforeEvents.itemUse.subscribe(({ source, itemStack }) => {

    if (source.typeId !== 'minecraft:player') return;

    const head = source.getHeadLocation();
    const view = source.getViewDirection();

    if (itemStack?.typeId === 'cata:solar_wand') {
        system.run(() => {
            const entity = source.dimension.spawnEntity('cata:solar_bolt', { x: head.x, y: head.y + 0.1, z: head.z });
            const projectile = entity.getComponent('projectile');

            projectile.owner = source;
            projectile.shoot({ x: view.x * 1, y: view.y * 1, z: view.z * 1 });
        });
    }
});
