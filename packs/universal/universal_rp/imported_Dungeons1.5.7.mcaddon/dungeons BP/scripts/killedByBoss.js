import {
  world,
  system,
  EntityDamageCause
} from "@minecraft/server";
const bosses = [
  'dungeons:redstone_monstrosity',
  'dungeons:nameless_one',
  'dungeons:mooshroom_monstrosity',
  'dungeons:wretched_wraith',
  'dungeons:corrupted_cauldron',
  'dungeons:jungle_abomination',
  'dungeons:tempest_golem',
  'dungeons:ancient_guardian',
  'dungeons:boss_wildfire',
  'dungeons:spiked_eye',
  'dungeons:savage_eye',
  'dungeons:reaping_eye',
  'dungeons:ravenous_eye',
  'dungeons:blight_eye',
  'dungeons:binding_eye',
  'dungeons:vengeful_heart_of_ender',
  'dungeons:obsidian_monstrosity',
  'dungeons:spooky_monstrosity'
];

world.afterEvents.entityDie.subscribe((event) => {
  const entity = event.deadEntity;
  if (entity.typeId !== 'minecraft:player') return;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause;
  if(!damageSource) return;

  if(bosses.includes(damageSource.typeId)) {
    let hp = damageSource.getComponent('minecraft:health');
    if(hp.currentValue > hp.defaultValue-20) {
      hp.setCurrentValue(hp.defaultValue)
    } else {
      hp.setCurrentValue(hp.currentValue + 20)
    }

  }

});