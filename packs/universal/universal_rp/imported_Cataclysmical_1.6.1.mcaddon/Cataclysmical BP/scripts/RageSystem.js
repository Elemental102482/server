import { world, system, TicksPerSecond } from "@minecraft/server";

//player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Ancient evil awakens...\"}]}') coming soon

system.runInterval(() => {
    let mob =
        world.getDimension('overworld').getEntities({ families: ['player'] }).concat(
            world.getDimension('nether').getEntities({ families: ['player'] }),
            world.getDimension('the_end').getEntities({ families: ['player'] })
        )

    mob.forEach(entity => {
        //rageable
        console.warn("testable is working")
    })
}, 20)
