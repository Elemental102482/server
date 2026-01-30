import { world, system, TicksPerSecond } from "@minecraft/server";

//player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Ancient evil awakens...\"}]}') coming soon

const MobID = [

  //floret
  "cata:feralbloom",
  "cata:gneiss_golem",
  "cata:verdant_sentinel",
  "cata:verdant_skeleton",

  //solar
  "cata:solarium",
  "cata:solar_tesla",
  "cata:eternal_seal",
  "cata:sun_tribunal",

  //lunar

  //msic
  "cata:stone_golem",
  "cata:plasma",
  "cata:skeleton_paladin",
  "cata:plasma_hive",
  "cata:plasma_hive",

]

//terror
world.afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity: player }, deadEntity: source }) => {
  if (!source) return;

  const random = Math.random()
  const mob = source.typeId
  const isMobID = MobID.includes(mob)

  let TerrorChance = 0.08
  let TerrorChanceMultiplier = TerrorChance + 2
  let TerrorChanceReduction = TerrorChance / 2


  if (isMobID) {
    if (player?.hasTag("novelty:cata:terror_eye") && random < TerrorChanceReduction || random < TerrorChance) { //0.02

      if (!player?.hasTag('HasTerrorStage1')) {
        //Terror Stage 1
        player.addTag("HasTerrorStage1")
        player.addEffect("darkness", TicksPerSecond * 8, { amplifier: 0, showParticles: false });
        player.runCommand("playsound sound.terror_ambient @a[r=32] ~ ~ ~ 1 1 1")
        player.runCommand(`particle cata:terror_stage ~ ~ ~`)

      } else if (!player?.hasTag('HasTerrorStage2')) {
        //Terror Stage 2
        player.addTag("HasTerrorStage2")
        player.addEffect("darkness", TicksPerSecond * 8, { amplifier: 0, showParticles: false });
        player.runCommand("playsound sound.terror_ambient @a[r=32] ~ ~ ~ 1 1 1")
        player.runCommand(`particle cata:terror_stage ~ ~ ~`)

      } else if (!player?.hasTag('HasTerrorStage3')) {
        //Terror Stage 3
        player.addTag("HasTerrorStage3")
        player.addEffect("darkness", TicksPerSecond * 8, { amplifier: 0, showParticles: false });
        player.addEffect("wither", TicksPerSecond * 6, { amplifier: 0, showParticles: false });
        player.runCommand("playsound sound.terror_ambient @a[r=32] ~ ~ ~ 1 1 1")
        player.runCommand(`particle cata:terror_stage ~ ~ ~`)

      } else if (!player?.hasTag('HasTerrorStage4')) {
        //Terror Stage 4
        player.addTag("HasTerrorStage4")
        player.addEffect("darkness", TicksPerSecond * 8, { amplifier: 0, showParticles: false });
        player.addEffect("wither", TicksPerSecond * 6, { amplifier: 1, showParticles: false });
        player.runCommand("playsound sound.terror_ambient @a[r=32] ~ ~ ~ 1 1 1")
        player.runCommand(`particle cata:terror_stage ~ ~ ~`)

      } else if (!player?.hasTag('HasTerrorStage5')) {
        //Terror Stage 5
        player.addTag("HasTerrorStage5")
        player.addEffect("darkness", TicksPerSecond * 8, { amplifier: 0, showParticles: false });
        player.addEffect("wither", TicksPerSecond * 6, { amplifier: 2, showParticles: false });
        player.runCommand('tellraw @s {\"rawtext\":[{\"text\":\"§5Cosmic Terrors are watching...\"}]}')
        player.runCommand("playsound sound.terror_ambient @a[r=32] ~ ~ ~ 1 1 1")
        player.runCommand(`particle cata:terror_stage ~ ~ ~`)


      } else if (player?.hasTag('HasTerrorStage5')) {
        //Terror Stage Spawn cosmic_terror
        player.removeTag("HasTerrorStage1")
        player.removeTag("HasTerrorStage2")
        player.removeTag("HasTerrorStage3")
        player.removeTag("HasTerrorStage4")
        player.removeTag("HasTerrorStage5")

        source.runCommand(`summon cata:cosmic_terror ~ ~ ~`)

      }
    }
  }
})

const TerrorDamage = [
  "entityAttack",
  "entityExplosion",
  "maceSmash",
  "projectile",
  "ramAttack",
  "sonicBoom",
]

world.afterEvents.entityHurt.subscribe(data => {
  let player = data.hurtEntity
  let mob = data.damageSource.damagingEntity
  const TerrorDamageSource = data.damageSource.cause
  const IsTerrorDamage = TerrorDamage.includes(TerrorDamageSource)
  const random = Math.random()

  if (IsTerrorDamage) {
    if (player.hasTag("HasTerrorStage5")) {
      player.applyDamage(data.damage + 5, { cause: "entityAttack" });
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      if (random < 0.5) {
        player.addEffect("wither", TicksPerSecond * 3, { amplifier: 0, showParticles: true });
      }

    } else if (player.hasTag("HasTerrorStage4")) {
      player.applyDamage(data.damage + 4, { cause: "entityAttack" });
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      if (random < 0.5) {
        player.addEffect("wither", TicksPerSecond * 3, { amplifier: 0, showParticles: true });
      }

    } else if (player.hasTag("HasTerrorStage3")) {
      player.applyDamage(data.damage + 3, { cause: "entityAttack" });
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)


    } else if (player.hasTag("HasTerrorStage2")) {
      player.applyDamage(data.damage + 2, { cause: "entityAttack" });
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)


    } else if (player.hasTag("HasTerrorStage1")) {
      player.applyDamage(data.damage + 1, { cause: "entityAttack" });
      player.runCommand(`particle cata:terror_stage_damage ~ ~ ~`)

    } else return
  } else return
})