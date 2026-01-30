import {
  world,
  system,
  EntityDamageCause,
  ItemStack
}

  from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:large_sweep', {
    onHitEntity(e) {
      //Assigns data from the component type to our script
      const attacker = e.attackingEntity;
      const target = e.hitEntity;
      //Stops script continuing if the attack did nothing
      if (!e.hadEffect) return;
      //If has cooldown, runs code to remove it
      let sweepCD = world.scoreboard.getObjective('sweepCD').getScore(attacker)
      if (sweepCD > 0) {
        if (sweepCD < 12) world.scoreboard.getObjective('sweepCD').setScore(attacker, 12)
        return;
      }
      world.scoreboard.getObjective('sweepCD').addScore(attacker, 12)
      target.runCommandAsync('function weapon/sweep_battlestaff_fx') //Particle and Sound
      //Grabs all mobs in a radius, and runs code in the forEach
      target.dimension.getEntities({
        location: target.location,
        maxDistance: 3,
        excludeFamilies: ['ignore']
      }).forEach(entity => {
        if (entity === target || entity === attacker) return; //Stops target and attacker being hit by sweep
        if (entity === undefined || !entity.isValid()) return; //prevents an error being thrown for trying to run effects on a dead mob
        if (entity.typeId === 'minecraft:item') return; //prevents items being destroyed
        //Sweep effects
        entity.applyKnockback(target.location.x, target.location.z, 0.66, 0.3);
        entity.applyDamage(7, {
          cause: EntityDamageCause.entityAttack,
          damagingEntity: attacker
        });
      });
    }
  }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:bone_club_sounds', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        if (!e.hadEffect) return;
        attacker.runCommandAsync('function weapon/bone_club_fx')
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:strong_knockback', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target || !target.isValid()) return;
        const xDif = target.location.x - attacker.location.x;
        const zDif = target.location.z - attacker.location.z;
        target.applyKnockback(xDif, zDif, 1, 0.23);
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:swirling_quick', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        attacker.runCommandAsync('function weapon/swirling')
        attacker.dimension.getEntities({
          location: attacker.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          const xDif = entity.location.x - attacker.location.x;
          const zDif = entity.location.z - attacker.location.z;
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(xDif, zDif, 0.25, 0.25);
          entity.applyDamage(5, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        })
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:swirling_standard', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        let swirlCD = world.scoreboard.getObjective('swirlCD').getScore(attacker)
        if (swirlCD > 0) {
          if (swirlCD < 20) world.scoreboard.getObjective('swirlCD').setScore(attacker, 20)
          return;
        }
        world.scoreboard.getObjective('swirlCD').addScore(attacker, 20)
        attacker.runCommandAsync('function weapon/swirling')
        attacker.dimension.getEntities({
          location: attacker.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          const xDif = entity.location.x - attacker.location.x;
          const zDif = entity.location.z - attacker.location.z;
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(xDif, zDif, 0.25, 0.25);
          entity.applyDamage(5, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:shockwave', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        let shockwaveCD = world.scoreboard.getObjective('shockwaveCD').getScore(attacker)
        if (shockwaveCD > 0) {
          if (shockwaveCD < 20) world.scoreboard.getObjective('shockwaveCD').setScore(attacker, 20)
          return;
        }
        world.scoreboard.getObjective('shockwaveCD').addScore(attacker, 20)
        const shockwave = Math.floor(Math.random() * 2);
        if (attacker.hasTag('dungeons:debug')) attacker.sendMessage(`${shockwave}`)
        if (shockwave == 1) return;
        target.runCommandAsync('function weapon/shockwave_fx')
        const xDif = target.location.x - attacker.location.x;
        const zDif = target.location.z - attacker.location.z;
        target.applyKnockback(xDif, zDif, 0.3, 0.6);
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          const xDif2 = entity.location.x - target.location.x;
          const zDif2 = entity.location.z - target.location.z;
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(xDif2, zDif2, 0.3, 0.5);
          entity.applyDamage(8, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:great_hammer_shockwave', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const item = e.itemStack;
        if (!e.hadEffect) return;
        let hammerCD = world.scoreboard.getObjective('hammerCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (hammerCD > 0) {
          if (hammerCD < 18) world.scoreboard.getObjective('hammerCD').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
          return;
        }
        world.scoreboard.getObjective('hammerCD').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
        target.runCommandAsync('function weapon/great_hammer_fx')
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(xDif, zDif, 0.77, 0.25);
          entity.applyDamage(7, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:stormlander_shockwave', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const item = e.itemStack;
        if (!e.hadEffect) return;
        let hammerCD = world.scoreboard.getObjective('hammerCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (hammerCD > 0) {
          if (hammerCD < 18) world.scoreboard.getObjective('hammerCD').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
          return;
        }
        world.scoreboard.getObjective('hammerCD').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
        target.runCommandAsync('function weapon/stormlander_fx')
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(xDif, zDif, 0.77, 0.25);
          entity.applyDamage(9, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
        const thundering = Math.floor(Math.random() * 3);
        if (attacker.hasTag('dungeons:debug')) attacker.sendMessage(`${thundering}`)
        if (thundering == 1) {
          target.runCommandAsync('function weapon/thundering_fx')
          target.dimension.getEntities({
            location: target.location,
            maxDistance: 5,
            closest: 3,
            excludeFamilies: ['ignore']
          }).forEach(entity => {
            if (entity === target || entity === attacker) return;
            if (entity === undefined || !entity.isValid()) return;
            if (entity.typeId === 'minecraft:item') return;
            entity.applyDamage(9, {
              cause: EntityDamageCause.lightning,
              damagingEntity: attacker
            });
          });
        }
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:gravity_hammer_shockwave', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const item = e.itemStack;
        if (!e.hadEffect) return;
        let hammerCD = world.scoreboard.getObjective('hammerCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (hammerCD > 0) {
          if (hammerCD < 18) world.scoreboard.getObjective('hammerCD').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
          return;
        }
        world.scoreboard.getObjective('hammerCD').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
        target.runCommandAsync('function weapon/gravity_hammer_fx')
        target.applyKnockback(0, 0, 0, 0.3);
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyDamage(9, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          excludeFamilies: ['ignore', 'gravity_immune']
        }).forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          var xDif2 = 0;
          var zDif2 = 0;
          if (xDif < 0) {
            xDif2 = xDif * -1
          }
          if (xDif >= 0) {
            xDif2 = xDif
          }
          if (zDif < 0) {
            zDif2 = zDif * -1
          }
          if (zDif >= 0) {
            zDif2 = zDif
          }
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:gravity_hammer_shockwave_spooky', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const item = e.itemStack;
        if (!e.hadEffect) return;
        let hammerCD = world.scoreboard.getObjective('hammerCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (hammerCD > 0) {
          if (hammerCD < 18) world.scoreboard.getObjective('hammerCD').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
          return;
        }
        world.scoreboard.getObjective('hammerCD').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 18)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
        target.runCommandAsync('function weapon/spooky_gravity_hammer_fx')
        target.applyKnockback(0, 0, 0, 0.3);
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyDamage(9, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          excludeFamilies: ['ignore', 'gravity_immune']
        }).forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          var xDif2 = 0;
          var zDif2 = 0;
          if (xDif < 0) {
            xDif2 = xDif * -1
          }
          if (xDif >= 0) {
            xDif2 = xDif
          }
          if (zDif < 0) {
            zDif2 = zDif * -1
          }
          if (zDif >= 0) {
            zDif2 = zDif
          }
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:short_cooldown', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        if (!e.hadEffect) return;
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (CT > 0) {
          if (CT < 8) world.scoreboard.getObjective('cooldownTime').setScore(attacker, 8)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 8)
        }
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 8)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 8)
        attacker.addEffect("weakness", 8, {
          amplifier: 2,
          showParticles: false
        });
        attacker.addEffect("mining_fatigue", 8, {
          amplifier: 0,
          showParticles: false
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:soul_siphon', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (attacker.typeId !== 'minecraft:player') return;
        const souls = world.scoreboard.getObjective('soulGauge').getScore(attacker)
        if (souls >= 100) return;
        const soul = Math.floor(Math.random() * 5);
        if (attacker.hasTag('dungeons:debug')) attacker.sendMessage(`roll : ${soul}`)
        if (soul > 0) return;
        if (target.matches({
          families: ['monster']
        })) {
          target.runCommandAsync('function weapon/soul_siphon_fx_target')
          attacker.runCommandAsync('function weapon/soul_siphon_fx_player')
          var soulsToGive = 3;
          if (attacker.hasTag('dungeons:verdant_armour')) {
            soulsToGive = soulsToGive * 2;
          }
          if (souls + soulsToGive <= 100) {
            world.scoreboard.getObjective('soulGauge').addScore(attacker, soulsToGive);
          } else {
            world.scoreboard.setObjective('soulGauge').addScore(attacker, 100)
          }


        }
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:obsidian_claymore', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        let obsidianCD = world.scoreboard.getObjective('obsidianCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (obsidianCD > 0) {
          if (obsidianCD < 40) world.scoreboard.getObjective('obsidianCD').setScore(attacker, 40)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 40)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 40)
          return;
        }
        world.scoreboard.getObjective('obsidianCD').addScore(attacker, 40)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 40)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 40)
        target.runCommandAsync('function weapon/obsidian_claymore_fx')
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(xDif, zDif, 1.2, 0.5);
          entity.applyDamage(8, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:starless_night', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        let obsidianCD = world.scoreboard.getObjective('obsidianCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (obsidianCD > 0) {
          if (obsidianCD < 40) world.scoreboard.getObjective('obsidianCD').setScore(attacker, 40)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 40)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 40)
          return;
        }
        world.scoreboard.getObjective('obsidianCD').addScore(attacker, 40)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 40)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 40)
        target.runCommandAsync('function weapon/starless_night_fx')
        const areaMonster = target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          families: ['monster'],
          excludeFamilies: ['mob']
        });
        const areaMob = target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          families: ['mob'],
          excludeFamilies: ['monster']
        });
        const areaDamage = target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          excludeFamilies: ['ignore']
        });
        areaDamage.forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          const knockbackModifier = (areaMob.length + areaMonster.length) * 0.25;
          const damageModifier = (areaMob.length + areaMonster.length) * 3;
          entity.applyKnockback(xDif, zDif, 1.2 + knockbackModifier, 0.5 + knockbackModifier / 3);
          entity.applyDamage(8 + damageModifier, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:sweep_attack', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const item = e.itemStack;
        if (!e.hadEffect) return;
        let sweepCD = world.scoreboard.getObjective('sweepCD').getScore(attacker)
        if (sweepCD > 0) {
          if (sweepCD < 15) world.scoreboard.getObjective('sweepCD').setScore(attacker, 15)
          return;
        }
        world.scoreboard.getObjective('sweepCD').addScore(attacker, 15)
        if (item.typeId === 'dungeons:rapier') target.runCommandAsync('function weapon/sweep_rapier_fx')
        if (item.typeId === 'dungeons:freezing_foil') target.runCommandAsync('function weapon/sweep_freeze_fx')
        if (item.typeId === 'dungeons:bee_stinger') target.runCommandAsync('function weapon/sweep_bee_fx')
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 1.25,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(target.location.x, target.location.z, 0.5, 0.25);
          entity.applyDamage(4, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:freezing', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        if (target.getEffect('slowness')) return;
        target.addEffect("slowness", 66, {
          amplifier: 2,
          showParticles: true
        });
        target.runCommandAsync('function weapon/freezing_fx')
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:freezing_spooky', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        if (target.getEffect('slowness')) return;
        target.addEffect("slowness", 66, {
          amplifier: 2,
          showParticles: true
        });
        target.runCommandAsync('function weapon/spooky_freezing_fx')
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:busy_bee', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        const bee = Math.floor(Math.random() * 10);
        if (attacker.hasTag('dungeons:debug')) attacker.sendMessage(`roll : ${bee}`)
        if (bee > 0) return;
        const pet = target.dimension.spawnEntity('dungeons:pet_bee', target.location);
        let beeTameable = pet.getComponent('minecraft:tameable')
        beeTameable.tame(attacker);
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:chains', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;

        function findChain(target, player) {
          let rand = Math.random();
          if (rand > 0.33) return;
          target.addTag('dungeons:chained');

          const damageRange = target.dimension.getEntities({
            location: target.location,
            maxDistance: 8,
            closest: 1,
            families: ['monster'],
            excludeTags: ['dungeons:chained']
          });
          for (const enemy of damageRange) {
            enemy.addEffect('slowness', 33, { amplifier: 9, showParticles: false });

            target.dimension.spawnParticle('dungeons:chain', target.location);
            target.dimension.playSound('block.bell.hit', target.location, { volume: 0.66, pitch: 2.5 });

            system.runTimeout(() => {
              findChain(enemy, player)
            }, 4);
          }

          system.runTimeout(() => {
            target.removeTag('dungeons:chained');
          }, 30);
        };


        findChain(target, attacker)
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:less_knockback', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        target.runCommandAsync('function weapon/scythe_fx')
        target.applyKnockback(attacker.location.x, attacker.location.z, 0.1, 0.1);
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:alylicleaver_sounds', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        attacker.dimension.playSound("weapon.alylicleaver.swing", attacker.location)
        if (!e.hadEffect) return;
        attacker.dimension.playSound("weapon.alylicleaver.hit", attacker.location)
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:dagger_multihit', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect || !target) return;
        var damage = 1;
        if (weapon.typeId === 'dungeons:daggers') {
          damage = damage + 4;
        } else if (weapon.typeId === 'dungeons:moon_daggers' || weapon.typeId === 'dungeons:sheer_daggers' || weapon.typeId === 'dungeons:frost_knives') {
          damage = damage + 6;
        } else {
          return;
        }
        const enchantable = weapon.getComponent('minecraft:enchantable');
        for (const enchantment of enchantable.getEnchantments()) {
          if (enchantment.type.id === 'sharpness') {
            damage = damage + Math.floor(enchantment.level * 1.25);
          }
          if (enchantment.type.id === 'smite') {
            if (target.matches({
              families: ['undead']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
          if (enchantment.type.id === 'bane_of_arthropods') {
            if (target.matches({
              families: ['arthropod']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
        }
        if (attacker.getEffect('strength')) {
          const strength = attacker.getEffect('strength').amplifier;
          damage = damage * Math.pow(1.3, strength) + ((Math.pow(1.3, strength) - 1) / 0.3);
        }
        if (attacker.getEffect('weakness')) {
          const weakness = attacker.getEffect('weakness').amplifier;
          damage = damage * Math.pow(0.8, weakness) + ((Math.pow(0.8, weakness) - 1) / 0.4);
        }
        if (damage < 0) damage = 0;
        attacker.dimension.playSound('weapon.daggers.hit', attacker.location, {
          volume: 0.6
        });
        attacker.playAnimation('animation.player.attack_daggers');
        system.runTimeout(() => {
          target.dimension.spawnParticle('dungeons:daggers_strike', target.location);
          attacker.dimension.playSound('weapon.daggers.hit', attacker.location, {
            volume: 0.3
          });
          target.applyDamage(damage, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
          if (weapon.typeId === 'dungeons:sheer_daggers') {
            attacker.runCommandAsync('function weapon/swirling')
            attacker.dimension.getEntities({
              location: attacker.location,
              maxDistance: 3,
              excludeFamilies: ['ignore']
            }).forEach(entity => {
              const xDif = entity.location.x - attacker.location.x;
              const zDif = entity.location.z - attacker.location.z;
              if (entity === target || entity === attacker) return;
              if (entity === undefined || !entity.isValid()) return;
              entity.applyKnockback(xDif, zDif, 0.25, 0.25);
              entity.applyDamage(4, {
                cause: EntityDamageCause.entityAttack,
                damagingEntity: attacker
              });
            })
          }
        }, 11);
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:weakening', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target || !target.isValid()) return;
        if (target.getEffect('weakness')) return;
        target.addEffect('weakness', 100);
        target.dimension.spawnParticle('dungeons:cauldron_summon', {
          x: target.location.x,
          y: target.location.y + 1,
          z: target.location.z
        });
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          families: ['monster']
        }).forEach(entity => {
          if (entity !== attacker) {
            entity.addEffect('weakness', 75);
          }
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:whip_vfx', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const loc = target.location;
        if (!e.hadEffect) return;
        if (world.scoreboard.getObjective('shadowTime').getScore(attacker) == 0) {
          attacker.playAnimation('animation.player.whip', {
            nextState: 'whip'
          });
        }
        target.dimension.playSound('weapon.whip.crack', target.location)
        system.runTimeout(() => {
          target.dimension.spawnParticle('dungeons:whip_crack', loc)
          target.dimension.spawnParticle('dungeons:whip_sparks', loc)
        }, 4);
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:whip_damage', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        const xDif = Math.abs(attacker.location.x - target.location.x);
        const yDif = Math.abs(attacker.location.y - target.location.y);
        const zDif = Math.abs(attacker.location.z - target.location.z);
        var damageBoost = 0;
        if (xDif > yDif && xDif > zDif) {
          damageBoost = xDif;
        } else if (yDif > xDif && yDif > zDif) {
          damageBoost = yDif;
        } else if (zDif > xDif && zDif > yDif) {
          damageBoost = zDif;
        } else {
          damageBoost = xDif;
        }
        if (damageBoost < 2) return;
        target.applyDamage(5 + damageBoost * 1.333, {
          cause: EntityDamageCause.entityAttack,
          damagingEntity: attacker
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:poison', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target) return;
        if (target.getEffect('fatal_poison')) return;
        target.addEffect("fatal_poison", 80, {
          amplifier: 1,
          showParticles: true
        });
        target.dimension.spawnParticle('dungeons:whip_poison', target.location)
        target.dimension.playSound('weapon.enchant.poison', target.location)
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:anchor_shockwave', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const item = e.itemStack;
        if (!e.hadEffect) return;
        let anchorCD = world.scoreboard.getObjective('anchorCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (anchorCD > 0) {
          if (anchorCD < 50) world.scoreboard.getObjective('anchorCD').setScore(attacker, 50)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 50)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 50)
          return;
        }
        world.scoreboard.getObjective('anchorCD').addScore(attacker, 50)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 50)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 50)
        target.runCommandAsync('function weapon/anchor_fx')
        target.applyKnockback(0, 0, 0, 0.3);
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyDamage(10, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          excludeFamilies: ['ignore', 'gravity_immune']
        }).forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          var xDif2 = 0;
          var zDif2 = 0;
          if (xDif < 0) {
            xDif2 = xDif * -1
          }
          if (xDif >= 0) {
            xDif2 = xDif
          }
          if (zDif < 0) {
            zDif2 = zDif * -1
          }
          if (zDif >= 0) {
            zDif2 = zDif
          }
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
        });
      }
    }),

    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:encrusted_anchor_shockwave', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const item = e.itemStack;
        if (!e.hadEffect) return;
        let anchorCD = world.scoreboard.getObjective('anchorCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (anchorCD > 0) {
          if (anchorCD < 50) world.scoreboard.getObjective('anchorCD').setScore(attacker, 50)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 50)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 50)
          return;
        }
        world.scoreboard.getObjective('anchorCD').addScore(attacker, 50)
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 50)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 50)
        target.runCommandAsync('function weapon/encrusted_anchor_fx')
        target.applyKnockback(0, 0, 0, 0.3);
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 3,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyDamage(11, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
          if (!entity.getEffect('fatal_poison')) {
            entity.addEffect("fatal_poison", 50, {
              amplifier: 1,
              showParticles: true
            });
            entity.dimension.spawnParticle('dungeons:whip_poison', entity.location)
          }

        });
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          excludeFamilies: ['ignore', 'gravity_immune']
        }).forEach(entity => {
          const xDif = entity.location.x - target.location.x;
          const zDif = entity.location.z - target.location.z;
          var xDif2 = 0;
          var zDif2 = 0;
          if (xDif < 0) {
            xDif2 = xDif * -1
          }
          if (xDif >= 0) {
            xDif2 = xDif
          }
          if (zDif < 0) {
            zDif2 = zDif * -1
          }
          if (zDif >= 0) {
            zDif2 = zDif
          }
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          entity.applyKnockback(-xDif, -zDif, (xDif2 + zDif2) / 2.1, 0.3);
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:bonus_water_damage', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect) return;
        if (!target) return;
        if (!target.isInWater) return;

        var damage = 1;
        if (weapon.typeId === 'dungeons:coral_blade') {
          damage = damage + 5;

        } else if (weapon.typeId === 'dungeons:sponge_striker') {
          damage = damage + 7;
        } else {
          return;
        }
        const enchantable = weapon.getComponent('minecraft:enchantable');
        for (const enchantment of enchantable.getEnchantments()) {
          if (enchantment.type.id === 'sharpness') {
            damage = damage + Math.floor(enchantment.level * 1.25);
          }
          if (enchantment.type.id === 'smite') {
            if (target.matches({
              families: ['undead']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
          if (enchantment.type.id === 'bane_of_arthropods') {
            if (target.matches({
              families: ['arthropod']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
        }
        if (attacker.getEffect('strength')) {
          const strength = attacker.getEffect('strength').amplifier;
          damage = damage * Math.pow(1.3, strength) + ((Math.pow(1.3, strength) - 1) / 0.3);
        }
        if (attacker.getEffect('weakness')) {
          const weakness = attacker.getEffect('weakness').amplifier;
          damage = damage * Math.pow(0.8, weakness) + ((Math.pow(0.8, weakness) - 1) / 0.4);
        }
        if (damage < 0) damage = 0;
        target.dimension.spawnParticle('dungeons:coral_blade', target.location);
        target.applyDamage(damage + 8, {
          cause: EntityDamageCause.entityAttack,
          damagingEntity: attacker
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:sponge_striker_damage', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect) return;
        if (!target) return;
        var damage = 1;
        if (weapon.typeId === 'dungeons:sponge_striker') {
          damage = damage + 7;
        } else {
          return;
        }
        const enchantable = weapon.getComponent('minecraft:enchantable');
        for (const enchantment of enchantable.getEnchantments()) {
          if (enchantment.type.id === 'sharpness') {
            damage = damage + Math.floor(enchantment.level * 1.25);
          }
          if (enchantment.type.id === 'smite') {
            if (target.matches({
              families: ['undead']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
          if (enchantment.type.id === 'bane_of_arthropods') {
            if (target.matches({
              families: ['arthropod']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
        }
        if (attacker.getEffect('strength')) {
          const strength = attacker.getEffect('strength').amplifier;
          damage = damage * Math.pow(1.3, strength) + ((Math.pow(1.3, strength) - 1) / 0.3);
        }
        if (attacker.getEffect('weakness')) {
          const weakness = attacker.getEffect('weakness').amplifier;
          damage = damage * Math.pow(0.8, weakness) + ((Math.pow(0.8, weakness) - 1) / 0.4);
        }
        if (damage < 0) damage = 0;

        var damageBoost = world.scoreboard.getObjective('spongeStrikerCharge').getScore(attacker);
        if (damageBoost <= 0) return;
        if (damageBoost >= 50) {
          damageBoost = 50;
        }
        target.applyDamage(damage + damageBoost, {
          cause: EntityDamageCause.entityAttack,
          damagingEntity: attacker
        });
        attacker.dimension.playSound('weapon.enchant.sponge_striker', attacker.location, {
          volume: (damageBoost / 25)
        });
        for (let i = 0; i < damageBoost; i++) {
          target.dimension.spawnParticle('dungeons:sponge_striker', target.location);
        }
        world.scoreboard.getObjective('spongeStrikerCharge').setScore(attacker, 0)
      }
    }),

    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:sawblade_damage', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect) return;
        if (!target) return;
        var damage = 1;
        if (weapon.typeId === 'dungeons:broken_sawblade') {
          damage = damage + 5;
        } else if (weapon.typeId === 'dungeons:mechanised_sawblade') {
          damage = damage + 6;
        } else {
          return;
        }

        let sawbladeCD = world.scoreboard.getObjective('sawbladeCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (sawbladeCD > 0) {
          if (sawbladeCD < 80) world.scoreboard.getObjective('sawbladeCD').setScore(attacker, 80)
          world.scoreboard.getObjective('cooldownTime').setScore(attacker, 80)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 80)
          return;
        }



        const rand = Math.floor(Math.random() * 20);

        if ((rand == 2 || rand == 1 && weapon.typeId === 'dungeons:broken_sawblade') || (rand == 1 && weapon.typeId === 'dungeons:mechanised_sawblade')) {

          attacker.dimension.playSound('weapon.enchant.sawblade_break', attacker.location);
          world.scoreboard.getObjective('sawbladeCD').addScore(attacker, 80)
          world.scoreboard.getObjective('cooldownTime').addScore(attacker, 80)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 80)

          world.scoreboard.getObjective('sawbladeCharge').setScore(attacker, 0)
          if (weapon.typeId === 'dungeons:broken_sawblade') target.dimension.spawnParticle('dungeons:sawblade_smoke', target.location);
          if (weapon.typeId === 'dungeons:mechanised_sawblade') target.dimension.spawnParticle('dungeons:sawblade_smoke_unique', target.location);

          return;
        }

        const enchantable = weapon.getComponent('minecraft:enchantable');
        for (const enchantment of enchantable.getEnchantments()) {
          if (enchantment.type.id === 'sharpness') {
            damage = damage + Math.floor(enchantment.level * 1.25);
          }
          if (enchantment.type.id === 'smite') {
            if (target.matches({
              families: ['undead']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
          if (enchantment.type.id === 'bane_of_arthropods') {
            if (target.matches({
              families: ['arthropod']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
        }
        if (attacker.getEffect('strength')) {
          const strength = attacker.getEffect('strength').amplifier;
          damage = damage * Math.pow(1.3, strength) + ((Math.pow(1.3, strength) - 1) / 0.3);
        }
        if (attacker.getEffect('weakness')) {
          const weakness = attacker.getEffect('weakness').amplifier;
          damage = damage * Math.pow(0.8, weakness) + ((Math.pow(0.8, weakness) - 1) / 0.4);
        }
        if (damage < 0) damage = 0;

        const damageBoost = world.scoreboard.getObjective('sawbladeCharge').getScore(attacker);
        if (damageBoost > 0)
          target.applyDamage(damage + damageBoost * 1.1, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        if (weapon.typeId === 'dungeons:broken_sawblade') {
          attacker.dimension.playSound('weapon.enchant.sawblade_attack', attacker.location, {
            volume: (damageBoost / 8)
          });
        } else if (weapon.typeId === 'dungeons:mechanised_sawblade') {
          attacker.dimension.playSound('weapon.enchant.sawblade_attack_unique', attacker.location, {
            volume: (damageBoost / 8)
          });
        }
        for (let i = 0; i < damageBoost; i++) {
          target.dimension.spawnParticle(weapon.typeId, target.location);
        }
        if (world.scoreboard.getObjective('sawbladeCharge').getScore(attacker) >= 20) return;

        world.scoreboard.getObjective('sawbladeCharge').addScore(attacker, 1)
      }
    }),

    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:gauntlets_multihit', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect || !target) return;
        var damage = 1;
        if (weapon.typeId === 'dungeons:gauntlets') {
          damage = damage + 5;
        } else if (weapon.typeId === 'dungeons:fighters_bindings' || weapon.typeId === 'dungeons:maulers' || weapon.typeId === 'dungeons:soul_fists') {
          damage = damage + 7;
        } else {
          return;
        }
        const enchantable = weapon.getComponent('minecraft:enchantable');
        for (const enchantment of enchantable.getEnchantments()) {
          if (enchantment.type.id === 'sharpness') {
            damage = damage + Math.floor(enchantment.level * 1.25);
          }
          if (enchantment.type.id === 'smite') {
            if (target.matches({
              families: ['undead']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
          if (enchantment.type.id === 'bane_of_arthropods') {
            if (target.matches({
              families: ['arthropod']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
        }
        if (attacker.getEffect('strength')) {
          const strength = attacker.getEffect('strength').amplifier;
          damage = damage * Math.pow(1.3, strength) + ((Math.pow(1.3, strength) - 1) / 0.3);
        }
        if (attacker.getEffect('weakness')) {
          const weakness = attacker.getEffect('weakness').amplifier;
          damage = damage * Math.pow(0.8, weakness) + ((Math.pow(0.8, weakness) - 1) / 0.4);
        }
        if (damage < 0) damage = 0;
        attacker.dimension.playSound('game.player.attack.strong', attacker.location, {
          volume: 0.6
        });
        system.runTimeout(() => {
          attacker.dimension.playSound('game.player.attackstrong', attacker.location, {
            volume: 0.4
          });
          target.applyDamage(damage, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
          if (weapon.typeId === 'dungeons:fighters_bindings') {

            system.runTimeout(() => {
              attacker.dimension.playSound('game.player.attack_strong', attacker.location, {
                volume: 0.2
              });
              target.applyDamage(damage, {
                cause: EntityDamageCause.entityAttack,
                damagingEntity: attacker
              });
              if (weapon.typeId === 'dungeons:sheer_daggers') {
              }
            }, 11);

          }
        }, 11);
      }
    }),

    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:glaive_sweep', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect) return;

        if (attacker.typeId !== 'minecraft:player') {
          attacker.dimension.playSound('weapon.glaive.swing', attacker.location, {
            volume: 0.4
          });
          return;
        }

        let glaiveCD = world.scoreboard.getObjective('glaiveCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (glaiveCD > 0) {
          if (glaiveCD < 18) world.scoreboard.getObjective('cooldownTime').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
          world.scoreboard.getObjective('glaiveCD').setScore(attacker, 18)
        }
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 18)
        world.scoreboard.getObjective('glaiveCD').setScore(attacker, 18)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 8)
        attacker.addEffect("weakness", 18, {
          amplifier: 2,
          showParticles: false
        });
        attacker.addEffect("mining_fatigue", 18, {
          amplifier: 0,
          showParticles: false
        });

        attacker.dimension.playSound('weapon.glaive.swing', attacker.location, {
          volume: 0.6
        });
        target.dimension.spawnParticle(`${weapon.typeId}_sweep`, target.location);

        target.dimension.getEntities({
          location: target.location,
          maxDistance: 1.5,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(target.location.x, target.location.z, 0.5, 0.25);
          entity.applyDamage(7, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:glaive_sweep_spooky', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect) return;

        if (attacker.typeId !== 'minecraft:player') {
          attacker.dimension.playSound('weapon.cackling_broom.swing', attacker.location, {
            volume: 0.4
          });
          return;
        }

        let glaiveCD = world.scoreboard.getObjective('glaiveCD').getScore(attacker)
        let CT = world.scoreboard.getObjective('cooldownTime').getScore(attacker)
        let CMAX = world.scoreboard.getObjective('cooldownMax').getScore(attacker)
        if (glaiveCD > 0) {
          if (glaiveCD < 18) world.scoreboard.getObjective('cooldownTime').setScore(attacker, 18)
          world.scoreboard.getObjective('cooldownMax').setScore(attacker, 18)
          world.scoreboard.getObjective('glaiveCD').setScore(attacker, 18)
        }
        world.scoreboard.getObjective('cooldownTime').addScore(attacker, 18)
        world.scoreboard.getObjective('glaiveCD').setScore(attacker, 18)
        world.scoreboard.getObjective('cooldownMax').setScore(attacker, 8)
        attacker.addEffect("weakness", 18, {
          amplifier: 2,
          showParticles: false
        });
        attacker.addEffect("mining_fatigue", 18, {
          amplifier: 0,
          showParticles: false
        });

        attacker.dimension.playSound('weapon.cackling_broom.swing', attacker.location, {
          volume: 0.6
        });
        target.dimension.spawnParticle(`${weapon.typeId}_sweep`, target.location);

        target.dimension.getEntities({
          location: target.location,
          maxDistance: 1.5,
          excludeFamilies: ['ignore']
        }).forEach(entity => {
          if (entity === target || entity === attacker) return;
          if (entity === undefined || !entity.isValid()) return;
          if (entity.typeId === 'minecraft:item') return;
          entity.applyKnockback(target.location.x, target.location.z, 0.5, 0.25);
          entity.applyDamage(7, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        });
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:poison_cloud', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        if (!e.hadEffect) return;
        if (!target || !target.isValid()) return;
        if (target.getEffect('fatal_poison')) return;
        target.addEffect('fatal_poison', 100);
        target.dimension.spawnParticle('dungeons:poison_cloud', {
          x: target.location.x,
          y: target.location.y + 1,
          z: target.location.z
        });
        target.dimension.playSound('weapon.enchant.poison', target.location)
        target.dimension.getEntities({
          location: target.location,
          maxDistance: 4,
          families: ['monster']
        }).forEach(entity => {
          if (entity !== attacker) {
            entity.addEffect('poison', 75);
          }
        });
      }
    }),

    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:echo', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect || !target) return;

        let echoCD = world.scoreboard.getObjective('echoCD').getScore(attacker)
        if (echoCD > 0) {
          return;
        }
        world.scoreboard.getObjective('echoCD').addScore(attacker, 40)

        var damage = 1;
        if (weapon.typeId === 'dungeons:swift_striker') {
          damage = damage + 5;
        } else {
          return;
        }
        const enchantable = weapon.getComponent('minecraft:enchantable');
        for (const enchantment of enchantable.getEnchantments()) {
          if (enchantment.type.id === 'sharpness') {
            damage = damage + Math.floor(enchantment.level * 1.25);
          }
          if (enchantment.type.id === 'smite') {
            if (target.matches({
              families: ['undead']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
          if (enchantment.type.id === 'bane_of_arthropods') {
            if (target.matches({
              families: ['arthropod']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
        }
        if (attacker.getEffect('strength')) {
          const strength = attacker.getEffect('strength').amplifier;
          damage = damage * Math.pow(1.3, strength) + ((Math.pow(1.3, strength) - 1) / 0.3);
        }
        if (attacker.getEffect('weakness')) {
          const weakness = attacker.getEffect('weakness').amplifier;
          damage = damage * Math.pow(0.8, weakness) + ((Math.pow(0.8, weakness) - 1) / 0.4);
        }
        if (damage < 0) damage = 0;

        system.runTimeout(() => {
          target.dimension.spawnParticle('dungeons:daggers_strike', target.location);
          attacker.dimension.playSound('weapon.daggers.hit', attacker.location, {
            volume: 0.3
          });
          target.applyDamage(damage, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        }, 11);
      }
    }),
    initEvent.itemComponentRegistry.registerCustomComponent('dungeons:void_multihit', {
      onHitEntity(e) {
        const attacker = e.attackingEntity;
        const target = e.hitEntity;
        const weapon = e.itemStack;
        if (!e.hadEffect || !target) return;
        var damage = 1;
        if (weapon.typeId === 'dungeons:void_touched_blades') {
          damage = damage + 4;
        } else if (weapon.typeId === 'dungeons:the_beginning_and_the_end') {
          damage = damage + 6;
        } else {
          return;
        }
        const enchantable = weapon.getComponent('minecraft:enchantable');
        for (const enchantment of enchantable.getEnchantments()) {
          if (enchantment.type.id === 'sharpness') {
            damage = damage + Math.floor(enchantment.level * 1.25);
          }
          if (enchantment.type.id === 'smite') {
            if (target.matches({
              families: ['undead']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
          if (enchantment.type.id === 'bane_of_arthropods') {
            if (target.matches({
              families: ['arthropod']
            })) {
              damage = damage + Math.floor(enchantment.level * 2.5);
            }
          }
        }
        if (attacker.getEffect('strength')) {
          const strength = attacker.getEffect('strength').amplifier;
          damage = damage * Math.pow(1.3, strength) + ((Math.pow(1.3, strength) - 1) / 0.3);
        }
        if (attacker.getEffect('weakness')) {
          const weakness = attacker.getEffect('weakness').amplifier;
          damage = damage * Math.pow(0.8, weakness) + ((Math.pow(0.8, weakness) - 1) / 0.4);
        }
        if (damage < 0) damage = 0;
        attacker.dimension.playSound('weapon.void_blades.hit', attacker.location, {
          volume: 0.6
        });
        attacker.playAnimation('animation.player.attack_void_blades');
        target.addEffect('slowness', 15, { amplifier: 3 });
        target.addEffect('weakness', 15, { amplifier: 0 });
        system.runTimeout(() => {
          target.dimension.spawnParticle('dungeons:void_blades_strike', target.location);
          attacker.dimension.playSound('weapon.void_blades.hit', attacker.location, {
            volume: 0.3,
            pitch: 0.5
          });
          target.applyDamage(damage * 1.5, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: attacker
          });
        }, 15);
      }
    })
});