import {
  world,
  system
} from "@minecraft/server";
import {
  ActionFormData
} from "@minecraft/server-ui";
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('dungeons:book_of_heroes', {
    onUse(e) {
      const player = e.source;
      player.playSound('item.book.page_turn');
      const player_souls = world.scoreboard.getObjective("soulGauge").getScore(player)
      let CATEGORIES = new ActionFormData();
      CATEGORIES.title("The Book of Heroes");
      CATEGORIES.body(`This book will reveal all you need to know about the weapons, artefacts and armour of Alylica's Dungeons\n\nCurrent Souls : §b${player_souls}/100`);
      CATEGORIES.button("Melee Weapons", "textures/ui/form/weapon");
      CATEGORIES.button("Ranged Weapons", "textures/ui/form/bow");
      CATEGORIES.button("Armour", "textures/ui/form/armour");
      CATEGORIES.button("Artefacts", "textures/ui/form/artefact");
      CATEGORIES.show(player).then(r => {
        player.playSound('item.book.page_turn');
        if (r.canceled) return;
        switch (r.selection) {
          case 0:
            let MELEE = new ActionFormData();
            MELEE.title("Melee Weapons");
            MELEE.body("No hero is fit to fight without their trusty weapon by their side.");
            if (player.hasTag('dungeons:collected_longsword')) {
              MELEE.button("Longswords", "textures/items/weapon/sword")
            } else {
              MELEE.button("Longswords", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_katana')) {
              MELEE.button("Katanas", "textures/items/weapon/katana")
            } else {
              MELEE.button("Katanas", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_claymore')) {
              MELEE.button("Claymores", "textures/items/weapon/claymore")
            } else {
              MELEE.button("Claymores", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_cutlass')) {
              MELEE.button("Cutlasses", "textures/items/weapon/cutlass")
            } else {
              MELEE.button("Cutlasses", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_daggers')) {
              MELEE.button("Daggers", "textures/items/weapon/daggers")
            } else {
              MELEE.button("Daggers", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_rapier')) {
              MELEE.button("Rapiers", "textures/items/weapon/rapier")
            } else {
              MELEE.button("Rapiers", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_glaive')) {
              MELEE.button("Glaives", "textures/items/weapon/glaive")
            } else {
              MELEE.button("Glaives", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_battlestaff')) {
              MELEE.button("Battlestaves", "textures/items/weapon/battlestaff")
            } else {
              MELEE.button("Battlestaves", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_cleaving_axe')) {
              MELEE.button("Cleaving Axes", "textures/items/weapon/axe")
            } else {
              MELEE.button("Cleaving Axes", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_double_axe')) {
              MELEE.button("Double Axes", "textures/items/weapon/double_axe")
            } else {
              MELEE.button("Double Axes", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_coral_blade')) {
              MELEE.button("Coral Blades", "textures/items/weapon/coral_blade")
            } else {
              MELEE.button("Coral Blades", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_tempest_knife')) {
              MELEE.button("Tempest Knives", "textures/items/weapon/tempest_knife")
            } else {
              MELEE.button("Tempest Knives", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_soul_knife')) {
              MELEE.button("Soul Knives", "textures/items/weapon/soul_knife")
            } else {
              MELEE.button("Soul Knives", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_soul_scythe')) {
              MELEE.button("Soul Scythes", "textures/items/weapon/soul_scythe")
            } else {
              MELEE.button("Soul Scythes", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_gauntlets')) {
              MELEE.button("Gauntlets", "textures/items/weapon/gauntlets")
            } else {
              MELEE.button("Gauntlets", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_whip')) {
              MELEE.button("Whips", "textures/items/weapon/whip")
            } else {
              MELEE.button("Whips", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_broken_sawblade')) {
              MELEE.button("Sawblades", "textures/items/weapon/broken_sawblade")
            } else {
              MELEE.button("Sawblades", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_hammer')) {
              MELEE.button("Hammers", "textures/items/weapon/great_hammer")
            } else {
              MELEE.button("Hammers", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_anchor')) {
              MELEE.button("Anchors", "textures/items/weapon/anchor")
            } else {
              MELEE.button("Anchors", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_bone_club')) {
              MELEE.button("Bone Clubs", "textures/items/weapon/bone_club")
            } else {
              MELEE.button("Bone Clubs", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_backstabber')) {
              MELEE.button("Backstabber", "textures/items/weapon/backstabber")
            } else {
              MELEE.button("Backstabbers", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_void_touched_blades')) {
              MELEE.button("Void Blades", "textures/items/weapon/void_touched_blades")
            } else {
              MELEE.button("Void Blades", "textures/ui/form/locked_weapon")
            }
            if (player.hasTag('dungeons:collected_obsidian_claymore')) {
              MELEE.button("Obsidian Claymores", "textures/items/weapon/obsidian_claymore")
            } else {
              MELEE.button("Obsidian Claymores", "textures/ui/form/locked_weapon")
            }
            MELEE.show(player).then(r => {
              player.playSound('item.book.page_turn');
              if (r.canceled) return;
              switch (r.selection) {
                case 0:
                  if (!player.hasTag('dungeons:collected_longsword')) break;
                  let LONGSWORDS = new ActionFormData();
                  LONGSWORDS.title("Longswords");
                  LONGSWORDS.body("Well rounded weapons suitable for any foe.\n\n Able to reduce incoming damage with interact key");
                  if (player.hasTag('dungeons:collected_longsword')) {
                    LONGSWORDS.button("Longsword", "textures/items/weapon/sword")
                  } else {
                    LONGSWORDS.button("Longsword", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_diamond_longsword')) {
                    LONGSWORDS.button("Diamond Longsword", "textures/items/weapon/diamond_sword")
                  } else {
                    LONGSWORDS.button("Diamond Longsword", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_hawkbrand')) {
                    LONGSWORDS.button("Hawkbrand", "textures/items/weapon/hawkbrand")
                  } else {
                    LONGSWORDS.button("Hawkbrand", "textures/ui/form/locked_weapon")
                  }

                  if (player.hasTag('dungeons:collected_sinister_sword')) {
                    LONGSWORDS.button("Sinister Sword ", "textures/items/weapon/sinister_sword")
                  }


                  LONGSWORDS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_longsword')) break;
                        let LONGSWORDS1 = new ActionFormData();
                        LONGSWORDS1.title("Longsword");
                        LONGSWORDS1.body("A sturdy and reliable blade.\n\n Can Block attacks\n\n Damage : \n Durability : 303");
                        LONGSWORDS1.button("Close")
                        LONGSWORDS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_diamond_longsword')) break;
                        let LONGSWORDS2 = new ActionFormData();
                        LONGSWORDS2.title("Diamond Longsword");
                        LONGSWORDS2.body("The Diamond Longsword is the true mark of a hero and an accomplished adventurer.\n\n Can Block attacks\n Boosted Damage\n\n Damage : \n Durability : 1561");
                        LONGSWORDS2.button("Close")
                        LONGSWORDS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_hawkbrand')) break;
                        let LONGSWORDS3 = new ActionFormData();
                        LONGSWORDS3.title("Hawkbrand");
                        LONGSWORDS3.body("The Hawkbrand is the legendary sword of proven warriors.\n\n Can Block attacks\n 10%% Critical Hit Chance\n\n Damage : \n Durability : 1561");
                        LONGSWORDS3.button("Close")
                        LONGSWORDS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 3:
                        if (!player.hasTag('dungeons:collected_sinister_sword')) break;
                        let LONGSWORDS4 = new ActionFormData();
                        LONGSWORDS4.title("Sinister Sword");
                        LONGSWORDS4.body("The Sinister Sword, drawn to those who face the spookiest of nights, cuts through the night with a howl.\n\n Special event item\n\n Can Block attacks\n 10%% Critical Hit Chance\n\n Damage : \n Durability : 1561");
                        LONGSWORDS4.button("Close")
                        LONGSWORDS4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 1:
                  if (!player.hasTag('dungeons:collected_katana')) break;
                  let KATANAS = new ActionFormData();
                  KATANAS.title("Katanas");
                  KATANAS.body("Powerful blades with a lower durability, A risky weapon for the most precise wielder.\n\n");
                  if (player.hasTag('dungeons:collected_katana')) {
                    KATANAS.button("Katana", "textures/items/weapon/katana")
                  } else {
                    KATANAS.button("Katana", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_dark_katana')) {
                    KATANAS.button("Dark Katana", "textures/items/weapon/dark_katana")
                  } else {
                    KATANAS.button("Dark Katana", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_masters_katana')) {
                    KATANAS.button("Masters Katana", "textures/items/weapon/master_katana")
                  } else {
                    KATANAS.button("Masters Katana", "textures/ui/form/locked_weapon")
                  }
                  KATANAS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_katana')) break;
                        let KATANAS1 = new ActionFormData();
                        KATANAS1.title("Katana");
                        KATANAS1.body("A blade fit for expert warriors and fighters, its blade is crafted to inflict precision damage.\n\n Damage : \n Durability : 199");
                        KATANAS1.button("Close")
                        KATANAS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_dark_katana')) break;
                        let KATANAS2 = new ActionFormData();
                        KATANAS2.title("Dark Katana");
                        KATANAS2.body("A blade that will not rest until the battle has been won.\n\n Boosted Damage to undead\n\n Damage : \n Durability : 1199");
                        KATANAS2.button("Close")
                        KATANAS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_masters_katana')) break;
                        let KATANAS3 = new ActionFormData();
                        KATANAS3.title("Masters Katana");
                        KATANAS3.body("The Master's Katana has existed throughout the ages, appearing to heroes at the right moment.\n\n 10%% Critical Hit Chance\n\n Damage : \n Durability : 1199");
                        KATANAS3.button("Close")
                        KATANAS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 2:
                  if (!player.hasTag('dungeons:collected_claymore')) break;
                  let CLAYMORES = new ActionFormData();
                  CLAYMORES.title("Claymores");
                  CLAYMORES.body("Great in size and in strength, the claymore is known to pack a punch.\n\n Enhanced Knockback");
                  if (player.hasTag('dungeons:collected_claymore')) {
                    CLAYMORES.button("Claymore", "textures/items/weapon/claymore")
                  } else {
                    CLAYMORES.button("Claymore", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_heartstealer')) {
                    CLAYMORES.button("Heartstealer", "textures/items/weapon/heartstealer")
                  } else {
                    CLAYMORES.button("Heartstealer", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_broadsword')) {
                    CLAYMORES.button("Broadsword", "textures/items/weapon/broadsword")
                  } else {
                    CLAYMORES.button("Broadsword", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_great_axeblade')) {
                    CLAYMORES.button("Great Axeblade", "textures/items/weapon/great_axeblade")
                  } else {
                    CLAYMORES.button("Great Axeblade", "textures/ui/form/locked_weapon")
                  }
                  CLAYMORES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_claymore')) break;
                        let CLAYMORES1 = new ActionFormData();
                        CLAYMORES1.title("Claymore");
                        CLAYMORES1.body("A massive sword that seems impossibly heavy yet rests easily in a just warrior's hands.\n\n Enhanced Knockback\n\n Damage : \n Durability : 555");
                        CLAYMORES1.button("Close")
                        CLAYMORES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_heartstealer')) break;
                        let CLAYMORES2 = new ActionFormData();
                        CLAYMORES2.title("Heartstealer");
                        CLAYMORES2.body("Gifted to one of the illager's most distinguished generals upon their conquest of the Squid Coast - this runeblade is infused with dark witchcraft.\n\n Enhanced Knockback\n Defeated monsters grant healing\n\n Damage : \n Durability : 1861");
                        CLAYMORES2.button("Close")
                        CLAYMORES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_broadsword')) break;
                        let CLAYMORES3 = new ActionFormData();
                        CLAYMORES3.title("Broadsword");
                        CLAYMORES3.body("Only those with the strength of a champion and the heart of a hero can carry this massive blade.\n\n Enhanced Knockback\n Boosted Damage\n\n Damage : \n Durability : 1861");
                        CLAYMORES3.button("Close")
                        CLAYMORES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 3:
                        if (!player.hasTag('dungeons:collected_great_axeblade')) break;
                        let CLAYMORES4 = new ActionFormData();
                        CLAYMORES4.title("Great Axeblade");
                        CLAYMORES4.body("A lucky blacksmith turned a workshop blunder into a battlefield wonder, fusing two weapons into something new.\n\n Enhanced Knockback\n Spinning area damage\n\n Damage : \n Durability : 1861");
                        CLAYMORES4.button("Close")
                        CLAYMORES4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 3:
                  if (!player.hasTag('dungeons:collected_cutlass')) break;
                  let CUTLASSES = new ActionFormData();
                  CUTLASSES.title("Cutlasses");
                  CUTLASSES.body("All-rounder weapons that excel in any swift fighter's hands.\n\n");
                  if (player.hasTag('dungeons:collected_cutlass')) {
                    CUTLASSES.button("Cutlass", "textures/items/weapon/cutlass")
                  } else {
                    CUTLASSES.button("Cutlass", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_dancers_sword')) {
                    CUTLASSES.button("Dancers Sword", "textures/items/weapon/dancers_sword")
                  } else {
                    CUTLASSES.button("Dancers Sword", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_nameless_blade')) {
                    CUTLASSES.button("Nameless Blade", "textures/items/weapon/nameless_blade")
                  } else {
                    CUTLASSES.button("Nameless Blade", "textures/ui/form/locked_weapon")
                  }
                  CUTLASSES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_cutlass')) break;
                        let CUTLASSES1 = new ActionFormData();
                        CUTLASSES1.title("Cutlass");
                        CUTLASSES1.body("This curved blade, wielded by the warriors of the Squid Coast, requires a steady hand in battle.\n\n Damage : \n Durability : 210");
                        CUTLASSES1.button("Close")
                        CUTLASSES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_dancers_sword')) break;
                        let CUTLASSES2 = new ActionFormData();
                        CUTLASSES2.title("Dancers Sword");
                        CUTLASSES2.body("Warriors who view battle as a dance with death prefer double-bladed swords.\n\n Boosts power after defeating a foe\n\n Damage : \n Durability : 1320");
                        CUTLASSES2.button("Close")
                        CUTLASSES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_nameless_blade')) break;
                        let CUTLASSES3 = new ActionFormData();
                        CUTLASSES3.title("Nameless Blade");
                        CUTLASSES3.body("This deadly blade's story was lost to the endless sands of time.\n\n Attacks weaken nearby foes\n\n Damage : \n Durability : 1320");
                        CUTLASSES3.button("Close")
                        CUTLASSES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 4:
                  if (!player.hasTag('dungeons:collected_daggers')) break;
                  let DAGGERS = new ActionFormData();
                  DAGGERS.title("Daggers");
                  DAGGERS.body("Weak on their own, Daggers can devastate enemies when paired together.\n\n Twin Attacks");
                  if (player.hasTag('dungeons:collected_daggers')) {
                    DAGGERS.button("Daggers", "textures/items/weapon/daggers")
                  } else {
                    DAGGERS.button("Daggers", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_sheer_daggers')) {
                    DAGGERS.button("Sheer Daggers", "textures/items/weapon/sheer_daggers")
                  } else {
                    DAGGERS.button("Sheer Daggers", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_moon_daggers')) {
                    DAGGERS.button("Moon Daggers", "textures/items/weapon/moon_daggers")
                  } else {
                    DAGGERS.button("Moon Daggers", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_frost_knives')) {
                    DAGGERS.button("Fangs of Frost", "textures/items/weapon/frost_knives")
                  } else {
                    DAGGERS.button("Fangs of Frost", "textures/ui/form/locked_weapon")
                  }
                  DAGGERS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_daggers')) break;
                        let DAGGERS1 = new ActionFormData();
                        DAGGERS1.title("Daggers");
                        DAGGERS1.body("Daggers are the weapon of cravens - or so folk say.\n\n Twin Attacks\n\n Damage : \n Durability : 180");
                        DAGGERS1.button("Close")
                        DAGGERS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_sheer_daggers')) break;
                        let DAGGERS2 = new ActionFormData();
                        DAGGERS2.title("Sheer Daggers");
                        DAGGERS2.body("Even the simplest of farmers can wield these Sheer Daggers with savage results.\n\n Twin Attacks\n Spinning area damage\n\n Damage : \n Durability : 1861");
                        DAGGERS2.button("Close")
                        DAGGERS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_moon_daggers')) break;
                        let DAGGERS3 = new ActionFormData();
                        DAGGERS3.title("Moon Daggers");
                        DAGGERS3.body("These curved blades shine like the crescent moon on a dark night.\n\n Twin Attacks\n Boosted  Collection\n Critical hit rate rises with Souls\n\n Damage : \n Durability : 1861");
                        DAGGERS3.button("Close")
                        DAGGERS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 3:
                        if (!player.hasTag('dungeons:collected_frost_knives')) break;
                        let DAGGERS4 = new ActionFormData();
                        DAGGERS4.title("Fangs of Frost");
                        DAGGERS4.body("These lauded twin daggers of the northern mountains are known to freeze their foes to solid ice.\n\n Twin Attacks\n Attacks slow mobs\n\n Damage : \n Durability : 1861");
                        DAGGERS4.button("Close")
                        DAGGERS4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 5:
                  if (!player.hasTag('dungeons:collected_rapier')) break;
                  let RAPIERS = new ActionFormData();
                  RAPIERS.title("Rapiers");
                  RAPIERS.body("Small but Swift, Rapiers are most efficient dealing with large crowds.\n\n Sweeping attacks");
                  if (player.hasTag('dungeons:collected_rapier')) {
                    RAPIERS.button("Rapier", "textures/items/weapon/rapier")
                  } else {
                    RAPIERS.button("Rapier", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_freezing_foil')) {
                    RAPIERS.button("Freezing Foil", "textures/items/weapon/freezing_foil")
                  } else {
                    RAPIERS.button("Freezing Foil", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_bee_stinger')) {
                    RAPIERS.button("Bee Stinger", "textures/items/weapon/bee_stinger")
                  } else {
                    RAPIERS.button("Bee Stinger", "textures/ui/form/locked_weapon")
                  }
                  RAPIERS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_rapier')) break;
                        let RAPIERS1 = new ActionFormData();
                        RAPIERS1.title("Rapier");
                        RAPIERS1.body("The rapier, a nimble and narrow blade, strikes with quick ferocity.\n\n Sweeping attacks\n\n Damage : \n Durability : 133");
                        RAPIERS1.button("Close")
                        RAPIERS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_freezing_foil')) break;
                        let RAPIERS2 = new ActionFormData();
                        RAPIERS2.title("Freezing Foil");
                        RAPIERS2.body("This needle-like blade is cold to the touch and makes quick work of any cut.\n\n Sweeping attacks\n Attacks slow mobs\n\n Damage : \n Durability : 1011");
                        RAPIERS2.button("Close")
                        RAPIERS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_bee_stinger')) break;
                        let RAPIERS3 = new ActionFormData();
                        RAPIERS3.title("Bee Stinger");
                        RAPIERS3.body("The Bee Stinger, a swift blade inspired by a bee's barb, can draw friendly bees into the fray to fight alongside you.\n\n Sweeping attacks\n Attacks may summon bees\n\n Damage : \n Durability : 1011");
                        RAPIERS3.button("Close")
                        RAPIERS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 6:
                  if (!player.hasTag('dungeons:collected_glaive')) break;
                  let GLAIVES = new ActionFormData();
                  GLAIVES.title("Glaives");
                  GLAIVES.body("Powerful and ancient weapons that still hold up today with powerful slashing attacks.\n\n 0.9s Attack Speed\n Sweeping attacks");
                  if (player.hasTag('dungeons:collected_glaive')) {
                    GLAIVES.button("Glaive", "textures/items/weapon/glaive")
                  } else {
                    GLAIVES.button("Glaive", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_grave_bane')) {
                    GLAIVES.button("Grave Bane", "textures/items/weapon/grave_bane")
                  } else {
                    GLAIVES.button("Grave Bane", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_venom_glaive')) {
                    GLAIVES.button("Venom Glaive", "textures/items/weapon/venom_glaive")
                  } else {
                    GLAIVES.button("Venom Glaive", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_cackling_broom')) {
                    GLAIVES.button("Cackling Broom ", "textures/items/weapon/cackling_broom")
                  }

                  GLAIVES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_glaive')) break;
                        let GLAIVES1 = new ActionFormData();
                        GLAIVES1.title("Glaive");
                        GLAIVES1.body("The Glaive, wielded by the servants of the Nameless One, is a weapon with style and power.\n\n 0.9s Attack Speed\n Sweeping attacks\n\n Damage : \n Durability : 322");
                        GLAIVES1.button("Close")
                        GLAIVES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_grave_bane')) break;
                        let GLAIVES2 = new ActionFormData();
                        GLAIVES2.title("Grave Bane");
                        GLAIVES2.body("A relic from ages of darkness, this glaive radiates potent magical energy to ward off the undead.\n\n 0.9s Attack Speed\n Sweeping attacks\n Boosted Damage to undead\n\n Damage : \n Durability : 1599");
                        GLAIVES2.button("Close")
                        GLAIVES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_venom_glaive')) break;
                        let GLAIVES3 = new ActionFormData();
                        GLAIVES3.title("Venom Glaive");
                        GLAIVES3.body("A toxic cloud seems to follow the Venom Glaive wherever it goes.\n\n 0.9s Attack Speed\n Sweeping attacks\n Attacks poison nearby foes\n\n Damage : \n Durability : 1599");
                        GLAIVES3.button("Close")
                        GLAIVES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 3:
                        if (!player.hasTag('dungeons:collected_cackling_broom')) break;
                        let GLAIVES4 = new ActionFormData();
                        GLAIVES4.title("Cackling Broom");
                        GLAIVES4.body("Sweep your enemies off their feet with the Cackling Broom.\n\n Special event item\n\n 0.9s Attack Speed\n Sweeping attacks\n Boosted Damage to undead\n\n Damage : \n Durability : 1599");
                        GLAIVES4.button("Close")
                        GLAIVES4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 7:
                  if (!player.hasTag('dungeons:collected_battlestaff')) break;
                  let BATTLESTAVES = new ActionFormData();
                  BATTLESTAVES.title("Battlestaves");
                  BATTLESTAVES.body("Large weapons, battlestaves require great skill to master their sweeping attacks.\n\n Large Sweeping attacks");
                  if (player.hasTag('dungeons:collected_battlestaff')) {
                    BATTLESTAVES.button("Battlestaff", "textures/items/weapon/battlestaff")
                  } else {
                    BATTLESTAVES.button("Battlestaff", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_growing_staff')) {
                    BATTLESTAVES.button("Growing Staff", "textures/items/weapon/growing_staff")
                  } else {
                    BATTLESTAVES.button("Growing Staff", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_battlestaff_of_terror')) {
                    BATTLESTAVES.button("Battlestaff of Terror", "textures/items/weapon/battlestaff_of_terror")
                  } else {
                    BATTLESTAVES.button("Battlestaff of Terror", "textures/ui/form/locked_weapon")
                  }
                  BATTLESTAVES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_battlestaff')) break;
                        let BATTLESTAVES1 = new ActionFormData();
                        BATTLESTAVES1.title("Battlestaff");
                        BATTLESTAVES1.body("The battlestaff is a perfectly balanced staff that is ready for any battle.\n\n Large Sweeping attacks\n\n Damage : \n Durability : 100");
                        BATTLESTAVES1.button("Close")
                        BATTLESTAVES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_growing_staff')) break;
                        let BATTLESTAVES2 = new ActionFormData();
                        BATTLESTAVES2.title("Freezing Foil");
                        BATTLESTAVES2.body("A staff that grows and shifts as it attacks, the Growing Staff is unpredictable and powerful.\n\n Large Sweeping attacks\n Increased damage to wounded mobs\n\n Damage : \n Durability : 800");
                        BATTLESTAVES2.button("Close")
                        BATTLESTAVES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_battlestaff_of_terror')) break;
                        let BATTLESTAVES3 = new ActionFormData();
                        BATTLESTAVES3.title("Battlestaff of Terror");
                        BATTLESTAVES3.body("This staff overwhelms its target in battle to explosive effect.\n\n Large Sweeping attacks\n Defeated mobs explode\n\n Damage : \n Durability : 800");
                        BATTLESTAVES3.button("Close")
                        BATTLESTAVES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 8:
                  if (!player.hasTag('dungeons:collected_cleaving_axe')) break;
                  let AXES = new ActionFormData();
                  AXES.title("Cleaving Axes");
                  AXES.body("The Cleaving Axe is typically suited better for fighting then wood-work.\n\n");
                  if (player.hasTag('dungeons:collected_cleaving_axe')) {
                    AXES.button("Cleaving Axe", "textures/items/weapon/axe")
                  } else {
                    AXES.button("Cleaving Axe", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_highlands_axe')) {
                    AXES.button("Highlands Axe", "textures/items/weapon/highlands_axe")
                  } else {
                    AXES.button("Highlands Axe", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_firebrand')) {
                    AXES.button("Firebrand", "textures/items/weapon/firebrand")
                  } else {
                    AXES.button("Firebrand", "textures/ui/form/locked_weapon")
                  }
                  AXES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_cleaving_axe')) break;
                        let AXES1 = new ActionFormData();
                        AXES1.title("Cleaving Axe");
                        AXES1.body("The axe is an effective weapon, favored by the relentless Vindicators of the Illager's army.\n\n Damage : \n Durability : 289");
                        AXES1.button("Close")
                        AXES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_highlands_axe')) break;
                        let AXES2 = new ActionFormData();
                        AXES2.title("Highland Axe");
                        AXES2.body("Expertly crafted and a polished weapon of war, the Highland Axe also makes a daring backscratcher.\n\n Chance to stun mobs\n\n Damage : \n Durability : 1622");
                        AXES2.button("Close")
                        AXES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_firebrand')) break;
                        let AXES3 = new ActionFormData();
                        AXES3.title("Firebrand");
                        AXES3.body("Crafted in the blackest depths of the Fiery Forge and enchanted with fiery powers.\n\n Attacks burn mobs\n\n Damage : \n Durability : 1622");
                        AXES3.button("Close")
                        AXES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 9:
                  if (!player.hasTag('dungeons:collected_double_axe')) break;
                  let DOUBLEAXES = new ActionFormData();
                  DOUBLEAXES.title("Double Axes");
                  DOUBLEAXES.body("Heavy weapons that deliver powerful swirling strikes.\n\n Spinning area damage");
                  if (player.hasTag('dungeons:collected_double_axe')) {
                    DOUBLEAXES.button("Double Axe", "textures/items/weapon/double_axe")
                  } else {
                    DOUBLEAXES.button("Double Axe", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_cursed_axe')) {
                    DOUBLEAXES.button("Cursed Axe", "textures/items/weapon/cursed_axe")
                  } else {
                    DOUBLEAXES.button("Cursed Axe", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_whirlwind')) {
                    DOUBLEAXES.button("Whirlwind", "textures/items/weapon/whirlwind")
                  } else {
                    DOUBLEAXES.button("Whirlwind", "textures/ui/form/locked_weapon")
                  }
                  DOUBLEAXES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_double_axe')) break;
                        let DOUBLEAXES1 = new ActionFormData();
                        DOUBLEAXES1.title("Double Axe");
                        DOUBLEAXES1.body("A devastating weapon fit for barbaric fighters.\n\n Spinning area damage\n\n Damage : \n Durability : 400");
                        DOUBLEAXES1.button("Close")
                        DOUBLEAXES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_cursed_axe')) break;
                        let DOUBLEAXES2 = new ActionFormData();
                        DOUBLEAXES2.title("Cursed Axe");
                        DOUBLEAXES2.body("This cursed, poisonous axe leaves their victims sick for years with just a single scratch.\n\n Spinning area damage\n Defeated mobs explode\n\n Damage : \n Durability : 1739");
                        DOUBLEAXES2.button("Close")
                        DOUBLEAXES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_whirlwind')) break;
                        let DOUBLEAXES3 = new ActionFormData();
                        DOUBLEAXES3.title("Whirlwind");
                        DOUBLEAXES3.body("Whirlwind, forged during an epic windstorm, is a double-bladed axe that levitates slightly.\n\n Spinning area damage\n Attacks may deal bonus area damage\n\n Damage : \n Durability : 1739");
                        DOUBLEAXES3.button("Close")
                        DOUBLEAXES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 10:
                  if (!player.hasTag('dungeons:collected_coral_blade')) break;
                  let CORALS = new ActionFormData();
                  CORALS.title("Coral Blades");
                  CORALS.body("Formed from sharpened coral, these blades are a necessity for diving below the waves.\n\n Stronger against foes in water");
                  if (player.hasTag('dungeons:collected_coral_blade')) {
                    CORALS.button("Coral Blade", "textures/items/weapon/coral_blade")
                  } else {
                    CORALS.button("Coral Blade", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_sponge_striker')) {
                    CORALS.button("Spong Striker", "textures/items/weapon/sponge_striker")
                  } else {
                    CORALS.button("Sponge Striker", "textures/ui/form/locked_weapon")
                  }
                  CORALS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_coral_blade')) break;
                        let CORALS1 = new ActionFormData();
                        CORALS1.title("Coral Blade");
                        CORALS1.body("The Coral Blade cuts through enemies with stinging accuracy..\n\n Stronger against foes in water\n\n Damage : \n Durability : 115");
                        CORALS1.button("Close")
                        CORALS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_sponge_striker')) break;
                        let CORALS2 = new ActionFormData();
                        CORALS2.title("Sponge Striker");
                        CORALS2.body("This blade may look colourless and dead, but it soaks up energy in combat and expels it in a powerful burst.\n\n Stronger against foes in water\n Adds damage you receive to next attack\n\n Damage : \n Durability : 915");
                        CORALS2.button("Close")
                        CORALS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 11:
                  if (!player.hasTag('dungeons:collected_tempest_knife')) break;
                  let TEMPESTKNIVES = new ActionFormData();
                  TEMPESTKNIVES.title("Tempest Knives");
                  TEMPESTKNIVES.body("While these knives may not be the greatest blades, they grant their wielder exceptional grace.\n\n Defeated mobs boost speed\n 0.5s Attack Speed");
                  if (player.hasTag('dungeons:collected_tempest_knife')) {
                    TEMPESTKNIVES.button("Tempest Knife", "textures/items/weapon/tempest_knife")
                  } else {
                    TEMPESTKNIVES.button("Tempest Knife", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_resolute_tempest_knife')) {
                    TEMPESTKNIVES.button("Resolute Tempest Knife", "textures/items/weapon/resolute_tempest_knife")
                  } else {
                    TEMPESTKNIVES.button("Resolute Tempest Knife", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_chill_gale_knife')) {
                    TEMPESTKNIVES.button("Chill Gale Knife", "textures/items/weapon/chill_gale_knife")
                  } else {
                    TEMPESTKNIVES.button("Chill Gale Knife", "textures/ui/form/locked_weapon")
                  }
                  TEMPESTKNIVES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_tempest_knife')) break;
                        let TEMPESTKNIVES1 = new ActionFormData();
                        TEMPESTKNIVES1.title("Tempest Knife");
                        TEMPESTKNIVES1.body("This knife slices through enemies like the winds that cuts between the mountaintops.\n\n Defeated mobs boost speed\n 0.5s Attack Speed\n\n Damage : \n Durability : 206");
                        TEMPESTKNIVES1.button("Close")
                        TEMPESTKNIVES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_resolute_tempest_knife')) break;
                        let TEMPESTKNIVES2 = new ActionFormData();
                        TEMPESTKNIVES2.title("Resolute Tempest Knife");
                        TEMPESTKNIVES2.body("Passed down by nomads who roam the mountain peaks, this knife has been used in countless battles.\n\n Defeated mobs boost speed\n 0.5s Attack Speed\n Increased damage to wounded mobs\n\n Damage : \n Durability : 1237");
                        TEMPESTKNIVES2.button("Close")
                        TEMPESTKNIVES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_chill_gale_knife')) break;
                        let TEMPESTKNIVES3 = new ActionFormData();
                        TEMPESTKNIVES3.title("Chill Gale Knife");
                        TEMPESTKNIVES3.body("Created from the never-melting ice atop the mountain peaks, this knife is forever icy to the touch.\n\n Defeated mobs boost speed\n 0.5s Attack Speed\n Attacks slow mobs\n\n Damage : \n Durability : 1237");
                        TEMPESTKNIVES3.button("Close")
                        TEMPESTKNIVES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;

                case 12:
                  if (!player.hasTag('dungeons:collected_soul_knife')) break;
                  let SOULKNIVES = new ActionFormData();
                  SOULKNIVES.title("Soul Knives");
                  SOULKNIVES.body("Slow to strike and fuelled by the power of souls, these weapons require a powerful will to master.\n\n Boosted  Collection\n 0.5s Attack Speed");
                  if (player.hasTag('dungeons:collected_soul_knife')) {
                    SOULKNIVES.button("Soul Knife", "textures/items/weapon/soul_knife")
                  } else {
                    SOULKNIVES.button("Soul Knife", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_eternal_knife')) {
                    SOULKNIVES.button("Eternal Knife", "textures/items/weapon/eternal_knife")
                  } else {
                    SOULKNIVES.button("Eternal Knife", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_truthseeker')) {
                    SOULKNIVES.button("Truthseeker", "textures/items/weapon/truthseeker")
                  } else {
                    SOULKNIVES.button("Truthseeker", "textures/ui/form/locked_weapon")
                  }
                  SOULKNIVES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_soul_knife')) break;
                        let SOULKNIVES1 = new ActionFormData();
                        SOULKNIVES1.title("Soul Knife");
                        SOULKNIVES1.body("A ceremonial knife that uses magical energy to hold the wrath of souls inside its blade.\n\n Boosted  Collection\n 0.5s Attack Speed\n\n Damage : \n Durability : 412");
                        SOULKNIVES1.button("Close")
                        SOULKNIVES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_eternal_knife')) break;
                        let SOULKNIVES2 = new ActionFormData();
                        SOULKNIVES2.title("Eternal Knife");
                        SOULKNIVES2.body("A disturbing aura surrounds this knife, as if it has existed for all time and will outlive us all.\n\n Boosted  Collection\n 0.5s Attack Speed\n Attacks may grant bonus souls\n\n Damage : \n Durability : 1666");
                        SOULKNIVES2.button("Close")
                        SOULKNIVES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_truthseeker')) break;
                        let SOULKNIVES3 = new ActionFormData();
                        SOULKNIVES3.title("Truthseeker");
                        SOULKNIVES3.body("The warden of Highblock Keep kept this unpleasant blade by their side during interrogations.\n\n Boosted  Collection\n 0.5s Attack Speed\n Increased damage to wounded mobs\n\n Damage : \n Durability : 1666");
                        SOULKNIVES3.button("Close")
                        SOULKNIVES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 13:
                  if (!player.hasTag('dungeons:collected_soul_scythe')) break;
                  let SOULSCYTHES = new ActionFormData();
                  SOULSCYTHES.title("Soul Scythes");
                  SOULSCYTHES.body("Souls imbued into these weapons fuel myths of them guarding the deceased to the afterlife.\n\n Boosted  Collection\n Decreased Knockback\n 0.5s Attack Speed");
                  if (player.hasTag('dungeons:collected_soul_scythe')) {
                    SOULSCYTHES.button("Soul Scythe", "textures/items/weapon/soul_scythe")
                  } else {
                    SOULSCYTHES.button("Soul Scythe", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_frost_scythe')) {
                    SOULSCYTHES.button("Frost Scythe", "textures/items/weapon/frost_scythe")
                  } else {
                    SOULSCYTHES.button("Frost Scythe", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_jailors_scythe')) {
                    SOULSCYTHES.button("Jailors Scythe", "textures/items/weapon/jailors_scythe")
                  } else {
                    SOULSCYTHES.button("Jailors Scythe", "textures/ui/form/locked_weapon")
                  }

                  if (player.hasTag('dungeons:collected_skull_scythe')) {
                    SOULSCYTHES.button("Skull Scythe ", "textures/items/weapon/skull_scythe")
                  }

                  SOULSCYTHES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_soul_scythe')) break;
                        let SOULSCYTHES1 = new ActionFormData();
                        SOULSCYTHES1.title("Soul Scythe");
                        SOULSCYTHES1.body("A cruel reaper of souls, the Soul Scythe is unsentimental in its work.\n\n Boosted  Collection\n Decreased Knockback\n 0.5s Attack Speed\n\n Damage : \n Durability : 699");
                        SOULSCYTHES1.button("Close")
                        SOULSCYTHES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_frost_scythe')) break;
                        let SOULSCYTHES2 = new ActionFormData();
                        SOULSCYTHES2.title("Frost Scythe");
                        SOULSCYTHES2.body("The Frost Scythe is an indestructible blade that is freezing to the touch and never seems to melt.\n\n Boosted  Collection\n Decreased Knockback\n 0.5s Attack Speed\n Attacks slow mobs\n\n Damage : \n Durability : 1722");
                        SOULSCYTHES2.button("Close")
                        SOULSCYTHES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_jailors_scythe')) break;
                        let SOULSCYTHES3 = new ActionFormData();
                        SOULSCYTHES3.title("Jailors Scythe");
                        SOULSCYTHES3.body("This scythe belonged to the terror of Highblock Keep, the Jailor.\n\n Boosted  Collection\n Decreased Knockback\n 0.5s Attack Speed\n Attacks can bind and chain enemies\n\n Damage : \n Durability : 1722");
                        SOULSCYTHES3.button("Close")
                        SOULSCYTHES3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;

                      case 3:
                        if (!player.hasTag('dungeons:collected_skull_scythe')) break;
                        let SOULSCYTHES4 = new ActionFormData();
                        SOULSCYTHES4.title("Skull Scythe");
                        SOULSCYTHES4.body("Don't ask what unnatural creature's bones were used to build this weapon. You don't want to know.\n\n Special event item\n\n Boosted  Collection\n Decreased Knockback\n 0.5s Attack Speed\n Attacks slow mobs\n\n Damage : \n Durability : 1722");
                        SOULSCYTHES4.button("Close")
                        SOULSCYTHES4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;

                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 14:
                  if (!player.hasTag('dungeons:collected_gauntlets')) break;
                  let GAUNTLETS = new ActionFormData();
                  GAUNTLETS.title("Gauntlets");
                  GAUNTLETS.body("These ancient weapons add a powerful flair to any warriors battle style.\n\n Twin Attacks");
                  if (player.hasTag('dungeons:collected_gauntlets')) {
                    GAUNTLETS.button("Gauntlets", "textures/items/weapon/gauntlets")
                  } else {
                    GAUNTLETS.button("Gauntlets", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_maulers')) {
                    GAUNTLETS.button("Maulers", "textures/items/weapon/maulers")
                  } else {
                    GAUNTLETS.button("Maulers", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_soul_fists')) {
                    GAUNTLETS.button("Soul Fists", "textures/items/weapon/soul_fists")
                  } else {
                    GAUNTLETS.button("Soul Fists", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_fighters_bindings')) {
                    GAUNTLETS.button("Fighters Bindings", "textures/items/weapon/fighters_bindings")
                  } else {
                    GAUNTLETS.button("Fighters Bindings", "textures/ui/form/locked_weapon")
                  }
                  GAUNTLETS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_gauntlets')) break;
                        let GAUNTLETS1 = new ActionFormData();
                        GAUNTLETS1.title("Gauntlets");
                        GAUNTLETS1.body("Gauntlets call back to an ancient style of hand to hand combat.\n\n Twin Attacks\n\n Damage : \n Durability : 300");
                        GAUNTLETS1.button("Close")
                        GAUNTLETS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_maulers')) break;
                        let GAUNTLETS2 = new ActionFormData();
                        GAUNTLETS2.title("Maulers");
                        GAUNTLETS2.body("These claw-like weapons, wielded by ancient Illager soldiers, are savage in battle.\n\n Twin Attacks\n Boosts power after defeating a foe\n\n Damage : \n Durability : 1222");
                        GAUNTLETS2.button("Close")
                        GAUNTLETS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_soul_fists')) break;
                        let GAUNTLETS3 = new ActionFormData();
                        GAUNTLETS3.title("Soul Fists");
                        GAUNTLETS3.body("Soul Fists are gauntlets clad with great gemstones, each containing a powerful soul.\n\n Twin Attacks\n Boosted  Collection\n Critical hit rate rises with Souls\n\n Damage : \n Durability : 1222");
                        GAUNTLETS3.button("Close")
                        GAUNTLETS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 3:
                        if (!player.hasTag('dungeons:collected_fighters_bindings')) break;
                        let GAUNTLETS4 = new ActionFormData();
                        GAUNTLETS4.title("Fighters Bindings");
                        GAUNTLETS4.body("Made in the wilds beyond the mountains, these gauntlets have been worn by warriors for centuries.\n\n Twin Attacks\n Adds a third attack\n\n Damage : \n Durability : 1222");
                        GAUNTLETS4.button("Close")
                        GAUNTLETS4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 15:
                  if (!player.hasTag('dungeons:collected_whip')) break;
                  let WHIPS = new ActionFormData();
                  WHIPS.title("Whips");
                  WHIPS.body("Whips are an old-fashioned weapon that gets stronger when striking at range.\n\n Stronger at long range");
                  if (player.hasTag('dungeons:collected_whip')) {
                    WHIPS.button("Whip", "textures/items/weapon/whip")
                  } else {
                    WHIPS.button("Whip", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_vine_whip')) {
                    WHIPS.button("Vine Whip", "textures/items/weapon/vine_whip")
                  } else {
                    WHIPS.button("Vine Whip", "textures/ui/form/locked_weapon")
                  }
                  WHIPS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_whip')) break;
                        let WHIPS1 = new ActionFormData();
                        WHIPS1.title("Whip");
                        WHIPS1.body("A whip made of sturdy rope, very dangerous in the right hands.\n\n Stronger at long range\n\n Damage : \n Durability : 177");
                        WHIPS1.button("Close")
                        WHIPS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_vine_whip')) break;
                        let WHIPS2 = new ActionFormData();
                        WHIPS2.title("Vine Whip");
                        WHIPS2.body("A sturdy whip made from thick, thorn-laden vines capable of poisoning anything it touches. Be careful not to scratch yourself!\n\n Stronger at long range\n Attacks poison mobs\n\n Damage : \n Durability : 1239");
                        WHIPS2.button("Close")
                        WHIPS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 16:
                  if (!player.hasTag('dungeons:collected_broken_sawblade')) break;
                  let SAWBLADES = new ActionFormData();
                  SAWBLADES.title("Sawblades");
                  SAWBLADES.body("Incredibly risky weapons wielded by utter maniacs.. no offence of course.\n\n Deals +1  with each hit\n Attacks have a chance to overheat");
                  if (player.hasTag('dungeons:collected_broken_sawblade')) {
                    SAWBLADES.button("Broken Sawblade", "textures/items/weapon/broken_sawblade")
                  } else {
                    SAWBLADES.button("Broken Sawblade", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_mechanised_sawblade')) {
                    SAWBLADES.button("Mechanised Sawblade", "textures/items/weapon/mechanised_sawblade")
                  } else {
                    SAWBLADES.button("Mechanised Sawblade", "textures/ui/form/locked_weapon")
                  }
                  SAWBLADES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_whip')) break;
                        let SAWBLADES1 = new ActionFormData();
                        SAWBLADES1.title("Broken Sawblade");
                        SAWBLADES1.body("The Broken Sawblade has been ravaged by time, but it still does considerable damage.\n\n Deals +1  with each hit \n Attacks have 8%% chance to overheat\n\n Damage : \n Durability : 150");
                        SAWBLADES1.button("Close")
                        SAWBLADES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_mechanised_sawblade')) break;
                        let SAWBLADES2 = new ActionFormData();
                        SAWBLADES2.title("Mechanised Sawblade");
                        SAWBLADES2.body("The Mechanised Sawblade still glows from the fires of the Nether where it was forged.\n\n Deals +1  with each hit\n Attacks have a 4%% chance to overheat\n\n Damage : \n Durability : 912");
                        SAWBLADES2.button("Close")
                        SAWBLADES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 17:
                  if (!player.hasTag('dungeons:collected_hammer')) break;
                  let HAMMERS = new ActionFormData();
                  HAMMERS.title("Hammers");
                  HAMMERS.body("Huge, Hulking weapons only wielded by those worthy of their strength.\n\n Large area damage\n 0.9s Attack Speed");
                  if (player.hasTag('dungeons:collected_hammer')) {
                    HAMMERS.button("Great Hammer", "textures/items/weapon/great_hammer")
                  } else {
                    HAMMERS.button("Great Hammer", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_stormlander')) {
                    HAMMERS.button("Stormlander", "textures/items/weapon/stormlander")
                  } else {
                    HAMMERS.button("Stormlander", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_hammer_of_gravity')) {
                    HAMMERS.button("Hammer of Gravity", "textures/items/weapon/hammer_of_gravity")
                  } else {
                    HAMMERS.button("Hammer of Gravity", "textures/ui/form/locked_weapon")
                  }

                  if (player.hasTag('dungeons:collected_bonehead_hammer')) {
                    HAMMERS.button("Bonehead Hammer ", "textures/items/weapon/bonehead_hammer")
                  }

                  HAMMERS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_hammer')) break;
                        let HAMMERS1 = new ActionFormData();
                        HAMMERS1.title("Great Hammer");
                        HAMMERS1.body("Blacksmiths and soldiers alike use the Great Hammer for its strength in forging and in battle.\n\n Large area damage\n 0.9s Attack Speed\n\n Damage : \n Durability : 1120");
                        HAMMERS1.button("Close")
                        HAMMERS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_stormlander')) break;
                        let HAMMERS2 = new ActionFormData();
                        HAMMERS2.title("Stormlander");
                        HAMMERS2.body("The Stormlander, enchanted with the power of the raging storm, is a treasure of the Illagers.\n\n Large area damage\n 0.9s Attack Speed\n Attacks may zap nearby mobs\n\n Damage : \n Durability : 2004");
                        HAMMERS2.button("Close")
                        HAMMERS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_hammer_of_gravity')) break;
                        let HAMMERS3 = new ActionFormData();
                        HAMMERS3.title("Hammer of Gravity");
                        HAMMERS3.body("A hammer, embedded with a crystal that harnesses the power of gravity, that is incredibly powerful.\n\n Large area damage\n 0.9s Attack Speed\n Attacks pull in enemies\n\n Damage : \n Durability : 2004");
                        HAMMERS3.button("Close")
                        HAMMERS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;

                      case 3:
                        if (!player.hasTag('dungeons:collected_bonehead_hammer')) break;
                        let HAMMERS4 = new ActionFormData();
                        HAMMERS4.title("Bonehead Hammer");
                        HAMMERS4.body("Fashioned in the likeness of a familiar foe, this hammer pulls your opponent towards their doom.\n\n Special event item\n\n Large area damage\n 0.9s Attack Speed\n Attacks pull in enemies\n\n Damage : \n Durability : 2004");
                        HAMMERS4.button("Close")
                        HAMMERS4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;

                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 18:
                  if (!player.hasTag('dungeons:collected_anchor')) break;
                  let ANCHORS = new ActionFormData();
                  ANCHORS.title("Anchors");
                  ANCHORS.body("Powerhouse weapons that make the strongest of ships come to a stop.\n\n Large area damage\n Attacks pull in enemies\n 2.5s Attack Speed");
                  if (player.hasTag('dungeons:collected_anchor')) {
                    ANCHORS.button("Anchor", "textures/items/weapon/anchor")
                  } else {
                    ANCHORS.button("Anchor", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_encrusted_anchor')) {
                    ANCHORS.button("Encrusted Anchor", "textures/items/weapon/encrusted_anchor")
                  } else {
                    ANCHORS.button("Encrusted Anchor", "textures/ui/form/locked_weapon")
                  }
                  ANCHORS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_anchor')) break;
                        let ANCHORS1 = new ActionFormData();
                        ANCHORS1.title("Anchor");
                        ANCHORS1.body("Those strong enough to wield the Anchor in battle follow the tradition of legendary seafaring warriors.\n\n Large area damage\n Attacks pull in enemies\n 2.5s Attack Speed\n\n Damage : \n Durability : 1341");
                        ANCHORS1.button("Close")
                        ANCHORS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_encrusted_anchor')) break;
                        let ANCHORS2 = new ActionFormData();
                        ANCHORS2.title("Encrusted Anchor");
                        ANCHORS2.body("This Encrusted Anchor was lost at sea long ago and has become harsh and corrosive during its ages of neglect.\n\n Large area damage\n Attacks pull in enemies\n 2.5s Attack Speed\n Attacks poison mobs\n\n Damage : \n Durability : 1957");
                        ANCHORS2.button("Close")
                        ANCHORS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 19:
                  if (!player.hasTag('dungeons:collected_bone_club')) break;
                  let BONECLUBS = new ActionFormData();
                  BONECLUBS.title("Bone Clubs");
                  BONECLUBS.body("Forged in the flames of the nether, these clubs are barbaric and brutal.\n\n Enhanced Knockback");
                  if (player.hasTag('dungeons:collected_bone_club')) {
                    BONECLUBS.button("Bone Club", "textures/items/weapon/bone_club")
                  } else {
                    BONECLUBS.button("Bone Club", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_bone_cudgel')) {
                    BONECLUBS.button("Bone Cudgel", "textures/items/weapon/bone_cudgel")
                  } else {
                    BONECLUBS.button("Bone Cudgel", "textures/ui/form/locked_weapon")
                  }
                  BONECLUBS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_bone_club')) break;
                        let BONECLUBS1 = new ActionFormData();
                        BONECLUBS1.title("Bone Club");
                        BONECLUBS1.body("Those who wield a Bone Club prefer as less-subtle approach to problem-solving.\n\n Enhanced Knockback\n Damage : \n Durability : 800");
                        BONECLUBS1.button("Close")
                        BONECLUBS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_bone_cudgel')) break;
                        let BONECLUBS2 = new ActionFormData();
                        BONECLUBS2.title("Bone Cudgel");
                        BONECLUBS2.body("The Bone Cudgel is old enough to be considered an ancient treasure, but still menacing even by modern standards.\n\n Enhanced Knockback\n Boosted damage against illagers\n\n Damage : \n Durability : 1963");
                        BONECLUBS2.button("Close")
                        BONECLUBS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 20:
                  if (!player.hasTag('dungeons:collected_backstabber')) break;
                  let BACKSTABBERS = new ActionFormData();
                  BACKSTABBERS.title("Backstabbers");
                  BACKSTABBERS.body("The name comes from the use of weapons like these to sever historic alliances.\n\n Boosted damage while invisible");
                  if (player.hasTag('dungeons:collected_backstabber')) {
                    BACKSTABBERS.button("Backstabber", "textures/items/weapon/backstabber")
                  } else {
                    BACKSTABBERS.button("Backstabber", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_swift_striker')) {
                    BACKSTABBERS.button("Swift Striker", "textures/items/weapon/swift_striker")
                  } else {
                    BACKSTABBERS.button("Swift Striker", "textures/ui/form/locked_weapon")
                  }
                  BACKSTABBERS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_backstabber')) break;
                        let BACKSTABBERS1 = new ActionFormData();
                        BACKSTABBERS1.title("Backstabber");
                        BACKSTABBERS1.body("The preferred blade of thieves and assassins, the Backstabber is a must in any rogue's pack.\n\n Boosted damage while invisible\n Damage : \n Durability : 401");
                        BACKSTABBERS1.button("Close")
                        BACKSTABBERS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_swift_striker')) break;
                        let BACKSTABBERS2 = new ActionFormData();
                        BACKSTABBERS2.title("Swift Striker");
                        BACKSTABBERS2.body("A blade for those who know that the surest way to victory is to strike without being seen.\n\n Boosted damage while invisible\n Sometimes performs two attacks\n\n Damage : \n Durability : 1621");
                        BACKSTABBERS2.button("Close")
                        BACKSTABBERS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 21:
                  if (!player.hasTag('dungeons:collected_void_touched_blades')) break;
                  let VOIDBLADES = new ActionFormData();
                  VOIDBLADES.title("Void Blades");
                  VOIDBLADES.body("These blades are said to have been first formed between a cosmic rift, leading to their magical properties.\n\n Twin Attacks\n First attack weakens foes, second deals boosted damage");
                  if (player.hasTag('dungeons:collected_void_touched_blades')) {
                    VOIDBLADES.button("Void Touched Blades", "textures/items/weapon/void_touched_blades")
                  } else {
                    VOIDBLADES.button("Void Touched Blades", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_the_beginning_and_the_end')) {
                    VOIDBLADES.button("The Beginning and The End", "textures/items/weapon/the_beginning_and_the_end")
                  } else {
                    VOIDBLADES.button("The Beginning and The End", "textures/ui/form/locked_weapon")
                  }
                  VOIDBLADES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_void_touched_blades')) break;
                        let VOIDBLADES1 = new ActionFormData();
                        VOIDBLADES1.title("Void Touched Blades");
                        VOIDBLADES1.body("These Blades are infused with a disturbing purpose after countless ages trapped in The End.\n\n Twin Attacks\n First attack weakens foes, second deals boosted damage\n\n Damage : \n Durability : 333");
                        VOIDBLADES1.button("Close")
                        VOIDBLADES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_the_beginning_and_the_end')) break;
                        let VOIDBLADES2 = new ActionFormData();
                        VOIDBLADES2.title("The Beginning and The End");
                        VOIDBLADES2.body("Forged by survivors of a doomed expedition to The End, these twin blades carry dark secrets.\n\n Twin Attacks\n First attack weakens foes, second deals boosted damage\n Defeated monsters grant healing\n\n Damage : \n Durability : 2023");
                        VOIDBLADES2.button("Close")
                        VOIDBLADES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 22:
                  if (!player.hasTag('dungeons:collected_obsidian_claymore')) break;
                  let OBSIDIANCLAYMORES = new ActionFormData();
                  OBSIDIANCLAYMORES.title("Obsidian Claymores");
                  OBSIDIANCLAYMORES.body("These nigh-indestructible weapon are said to originate from a rift between worlds.\n\n Massive area damage\n 2.0s Attack Speed");
                  if (player.hasTag('dungeons:collected_obsidian_claymore')) {
                    OBSIDIANCLAYMORES.button("Obsidian Claymore", "textures/items/weapon/obsidian_claymore")
                  } else {
                    OBSIDIANCLAYMORES.button("Obsidian Claymore", "textures/ui/form/locked_weapon")
                  }
                  if (player.hasTag('dungeons:collected_starless_night')) {
                    OBSIDIANCLAYMORES.button("The Starless Night", "textures/items/weapon/starless_night")
                  } else {
                    OBSIDIANCLAYMORES.button("The Starless Night", "textures/ui/form/locked_weapon")
                  }
                  OBSIDIANCLAYMORES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_obsidian_claymore')) break;
                        let OBSIDIANCLAYMORES1 = new ActionFormData();
                        OBSIDIANCLAYMORES1.title("Obsidian Claymore");
                        OBSIDIANCLAYMORES1.body("This massive blade cleaves even the thickest shulker shells with style and ease.\n\n Massive area damage\n 2.0s Attack Speed\n\n Damage : \n Durability : 1500");
                        OBSIDIANCLAYMORES1.button("Close")
                        OBSIDIANCLAYMORES1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_starless_night')) break;
                        let OBSIDIANCLAYMORES2 = new ActionFormData();
                        OBSIDIANCLAYMORES2.title("The Starless Night");
                        OBSIDIANCLAYMORES2.body("The Starless Night is haunted by echoes of pain that linger within the pitch-black blade.\n\n Massive area damage\n 2.0s Attack Speed\n Increases damage with more targets\n\n Damage : \n Durability : 3500");
                        OBSIDIANCLAYMORES2.button("Close")
                        OBSIDIANCLAYMORES2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                default:
                  break;
              }
            }).catch((e) => {
              console.error(e, e.stack);
            });
            break;
          case 1:
            let RANGED = new ActionFormData();
            RANGED.title("Ranged Weapons");
            RANGED.body("Ranged weapons are a necessity for taking on powerful foes.");
            if (player.hasTag('dungeons:collected_bow')) {
              RANGED.button("Bows", "textures/items/ranged/bow/standby")
            } else {
              RANGED.button("Bows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_longbow')) {
              RANGED.button("Longbows", "textures/items/ranged/longbow/standby")
            } else {
              RANGED.button("Longbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_snow_bow')) {
              RANGED.button("Snow Bows", "textures/items/ranged/snow_bow/standby")
            } else {
              RANGED.button("Snow Bows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_soul_bow')) {
              RANGED.button("Soul Bows", "textures/items/ranged/soul_bow/standby")
            } else {
              RANGED.button("Soul Bows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_wind_bow')) {
              RANGED.button("Wind Bows", "textures/items/ranged/wind_bow/standby")
            } else {
              RANGED.button("Wind Bows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_twisting_vine_bow')) {
              RANGED.button("Nether Vine Bows", "textures/items/ranged/twisting_vine_bow/standby")
            } else {
              RANGED.button("Nether Vine Bows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_void_bow')) {
              RANGED.button("Void Bows", "textures/items/ranged/void_bow/standby")
            } else {
              RANGED.button("Void Bows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_crossbow')) {
              RANGED.button("Crossbows", "textures/items/ranged/crossbow/standby")
            } else {
              RANGED.button("Crossbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_burst_crossbow')) {
              RANGED.button("Burst Crossbows", "textures/items/ranged/burst_crossbow/standby")
            } else {
              RANGED.button("Burst Crossbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_soul_crossbow')) {
              RANGED.button("Soul Crossbows", "textures/items/ranged/soul_crossbow/standby")
            } else {
              RANGED.button("Soul Crossbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_heavy_crossbow')) {
              RANGED.button("Heavy Crossbows", "textures/items/ranged/heavy_crossbow/standby")
            } else {
              RANGED.button("Heavy Crossbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_exploding_crossbow')) {
              RANGED.button("Exploding Crossbows", "textures/items/ranged/exploding_crossbow/standby")
            } else {
              RANGED.button("Exploding Crossbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_cog_crossbow')) {
              RANGED.button("Cog Crossbows", "textures/items/ranged/cog_crossbow/standby")
            } else {
              RANGED.button("Cog Crossbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_harpoon_crossbow')) {
              RANGED.button("Harpoon Crossbows", "textures/items/ranged/harpoon_crossbow/standby")
            } else {
              RANGED.button("Harpoon Crossbows", "textures/ui/form/locked_bow")
            }
            if (player.hasTag('dungeons:collected_shadow_crossbow')) {
              RANGED.button("Shadow Crossbows", "textures/items/ranged/shadow_crossbow/standby")
            } else {
              RANGED.button("Shadow Crossbows", "textures/ui/form/locked_bow")
            }
            RANGED.show(player).then(r => {
              player.playSound('item.book.page_turn');
              if (r.canceled) return;
              switch (r.selection) {
                case 0:
                  if (!player.hasTag('dungeons:collected_bow')) break;
                  let BOWS = new ActionFormData();
                  BOWS.title("Bows");
                  BOWS.body("A classic choice, we all know how these work.\n\n");
                  if (player.hasTag('dungeons:collected_bow')) {
                    BOWS.button("Bow", "textures/items/ranged/bow/standby")
                  } else {
                    BOWS.button("Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_bonebow')) {
                    BOWS.button("Bonebow", "textures/items/ranged/bone_bow/standby")
                  } else {
                    BOWS.button("Bonebow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_twin_bow')) {
                    BOWS.button("Twin Bow", "textures/items/ranged/twin_bow/standby")
                  } else {
                    BOWS.button("Twin Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_haunted_bow')) {
                    BOWS.button("Haunted Bow ", "textures/items/ranged/haunted_bow/standby")
                  }


                  BOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_bow')) break;
                        let BOWS1 = new ActionFormData();
                        BOWS1.title("Bow");
                        BOWS1.body("A simple but well-rounded piece of weaponry. The hunters of the plains say that a bow doesn't let you down, unlike other trinkets.\n\n Draw Time : 1s\n Durability : 306");
                        BOWS1.button("Close")
                        BOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_bonebow')) break;
                        let BOWS2 = new ActionFormData();
                        BOWS2.title("Bonebow");
                        BOWS2.body("The Bonebow is the pride of many Villagers, crafted within the walls of their humble village.\n\n Arrows get bigger and stronger overtime\n\n Draw Time : 1s\n Durability : 612");
                        BOWS2.button("Close")
                        BOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_twin_bow')) break;
                        let BOWS3 = new ActionFormData();
                        BOWS3.title("Twin Bow");
                        BOWS3.body("The Twin Bow is the champion of the hero who finds themselves outnumbered and alone.\n\n Arrows bounce between nearby monsters\n\n Draw Time : 1s\n Durability : 612");
                        BOWS3.button("Close")
                        BOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 3:
                        if (!player.hasTag('dungeons:collected_haunted_bow')) break;
                        let BOWS4 = new ActionFormData();
                        BOWS4.title("Haunted Bow");
                        BOWS4.body("What indescribable horror! The creeping tentacles of this bow reach for the unknowable Void.\n\n Special event item\n\n Arrows bounce between nearby monsters\n\n Draw Time : 1s\n Durability : 612");
                        BOWS4.button("Close")
                        BOWS4.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 1:
                  if (!player.hasTag('dungeons:collected_longbow')) break;
                  let LONGBOWS = new ActionFormData();
                  LONGBOWS.title("Longbows");
                  LONGBOWS.body("These sturdy bows are great for trained hunters.\n\n");
                  if (player.hasTag('dungeons:collected_longbow')) {
                    LONGBOWS.button("Longbow", "textures/items/ranged/longbow/standby")
                  } else {
                    LONGBOWS.button("Longbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_guardian_bow')) {
                    LONGBOWS.button("Guardian Bow", "textures/items/ranged/guardian_bow/standby")
                  } else {
                    LONGBOWS.button("Guardian Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_red_snake')) {
                    LONGBOWS.button("Red Snake", "textures/items/ranged/red_snake/standby")
                  } else {
                    LONGBOWS.button("Red Snake", "textures/ui/form/locked_bow")
                  }


                  LONGBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_longbow')) break;
                        let LONGBOWS1 = new ActionFormData();
                        LONGBOWS1.title("Longbow");
                        LONGBOWS1.body("The Longbow, crafted for hunting rather than battle, is still useful in a fight.\n\n Draw Time : 1.5s\n Durability : 421");
                        LONGBOWS1.button("Close")
                        LONGBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_guardian_bow')) break;
                        let LONGBOWS2 = new ActionFormData();
                        LONGBOWS2.title("Guardian Bow");
                        LONGBOWS2.body("Forges from fossilised coral, the Guardian Bow is a remnant from sunken civilisations of lost ages.\n\n Arrows have increased knockback\n\n Draw Time : 1.5s\n Durability : 741");
                        LONGBOWS2.button("Close")
                        LONGBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_red_snake')) break;
                        let LONGBOWS3 = new ActionFormData();
                        LONGBOWS3.title("Red Snake");
                        LONGBOWS3.body("The Red Snake radiates an explosive heat, making it a deadly fire risk in the dry, desert lands.\n\n Arrows will explode on hit\n\n Draw Time : 1.5s\n Durability : 741");
                        LONGBOWS3.button("Close")
                        LONGBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 2:
                  if (!player.hasTag('dungeons:collected_snow_bow')) break;
                  let SNOWBOWS = new ActionFormData();
                  SNOWBOWS.title("Snow Bows");
                  SNOWBOWS.body("These chilling bows are forged from carved ice, it's recommended you wear some gloves.\n\n Arrows slow mobs");
                  if (player.hasTag('dungeons:collected_snow_bow')) {
                    SNOWBOWS.button("Snow Bow", "textures/items/ranged/snow_bow/standby")
                  } else {
                    SNOWBOWS.button("Snow Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_winters_touch')) {
                    SNOWBOWS.button("Winter's Touch", "textures/items/ranged/winters_touch/standby")
                  } else {
                    SNOWBOWS.button("Winter's Touch", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_webbed_bow')) {
                    SNOWBOWS.button("Webbed Bow ", "textures/items/ranged/webbed_bow/standby")
                  }


                  SNOWBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_snow_bow')) break;
                        let SNOWBOWS1 = new ActionFormData();
                        SNOWBOWS1.title("Snow Bow");
                        SNOWBOWS1.body("Those who face the Snow Bow in battle must also prepare to face the chill of freezing wintery winds.\n\n Arrows slow mobs\n Draw Time : 1.25s\n Durability : 361");
                        SNOWBOWS1.button("Close")
                        SNOWBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_winters_touch')) break;
                        let SNOWBOWS2 = new ActionFormData();
                        SNOWBOWS2.title("Winter's Touch");
                        SNOWBOWS2.body("Arrows fired from this legendary bow are said to be carried by the winter winds themselves.\n\n Arrows slow mobs\n Arrows stun foes for 1s\n\n Draw Time : 1.25s\n Durability : 591");
                        SNOWBOWS2.button("Close")
                        SNOWBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_webbed_bow')) break;
                        let SNOWBOWS3 = new ActionFormData();
                        SNOWBOWS3.title("Webbed Bow");
                        SNOWBOWS3.body("Crafted from the webs of mighty spiders, the Webbed Bow will get you out of any sticky situation.\n\n Special event item\n\n Arrows slow mobs\n Arrows stun foes for 1s\n\n Draw Time : 1.25s\n Durability : 591");
                        SNOWBOWS3.button("Close")
                        SNOWBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 3:
                  if (!player.hasTag('dungeons:collected_soul_bow')) break;
                  let SOULBOWS = new ActionFormData();
                  SOULBOWS.title("Soul Bows");
                  SOULBOWS.body("Historically used by practitioners of soul magic to collect souls from afar.\n\n Boosted  Collection");
                  if (player.hasTag('dungeons:collected_soul_bow')) {
                    SOULBOWS.button("Soul Bow", "textures/items/ranged/soul_bow/standby")
                  } else {
                    SOULBOWS.button("Soul Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_nocturnal_bow')) {
                    SOULBOWS.button("Nocturnal Bow", "textures/items/ranged/nocturnal_bow/standby")
                  } else {
                    SOULBOWS.button("Nocturnal Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_bow_of_lost_souls')) {
                    SOULBOWS.button("Bow of Lost Souls", "textures/items/ranged/bow_of_lost_souls/standby")
                  } else {
                    SOULBOWS.button("Bow of Lost Souls", "textures/ui/form/locked_bow")
                  }


                  SOULBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_soul_bow')) break;
                        let SOULBOWS1 = new ActionFormData();
                        SOULBOWS1.title("Soul Bow");
                        SOULBOWS1.body("The Soul Bow shimmers with all the beauty and fury of an attacking Vex.\n\n Boosted  Collection\n Draw Time : 0.75s\n Durability : 198");
                        SOULBOWS1.button("Close")
                        SOULBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_nocturnal_bow')) break;
                        let SOULBOWS2 = new ActionFormData();
                        SOULBOWS2.title("Nocturnal Bow");
                        SOULBOWS2.body("The souls bound to this bow guide the arrows to their targets and cause it to glow slightly.\n\n Boosted  Collection\n Arrows slow foes and speed you up\n\n Draw Time : 0.75s\n Durability : 502");
                        SOULBOWS2.button("Close")
                        SOULBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_bow_of_lost_souls')) break;
                        let SOULBOWS3 = new ActionFormData();
                        SOULBOWS3.title("Bow of Lost Souls");
                        SOULBOWS3.body("This bow, made of cursed bones, strips the living of their very souls.\n\n Boosted  Collection\n Arrows will hit two enemies\n\n Draw Time : 0.75s\n Durability : 502");
                        SOULBOWS3.button("Close")
                        SOULBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 4:
                  if (!player.hasTag('dungeons:collected_wind_bow')) break;
                  let WINDBOWS = new ActionFormData();
                  WINDBOWS.title("Wind Bows");
                  WINDBOWS.body("It is said these bows were first formed for the guards of the fabled Gale Sanctum.\n\n Arrows pull mobs towards you");
                  if (player.hasTag('dungeons:collected_wind_bow')) {
                    WINDBOWS.button("Wind Bow", "textures/items/ranged/wind_bow/standby")
                  } else {
                    WINDBOWS.button("Wind Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_burst_gale_bow')) {
                    WINDBOWS.button("Burst Gale Bow", "textures/items/ranged/burst_gale_bow/standby")
                  } else {
                    WINDBOWS.button("Burst Gale Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_echo_of_the_valley')) {
                    WINDBOWS.button("Echo of the Valley", "textures/items/ranged/echo_of_the_valley/standby")
                  } else {
                    WINDBOWS.button("Echo of the Valley", "textures/ui/form/locked_bow")
                  }


                  WINDBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_wind_bow')) break;
                        let WINDBOWS1 = new ActionFormData();
                        WINDBOWS1.title("Wind Bow");
                        WINDBOWS1.body("A mesmerising bow that captures the power of the wind to fire mighty Gale Arrows.\n\n Arrows pull mobs towards you\n Draw Time : 1.5s\n Durability : 399");
                        WINDBOWS1.button("Close")
                        WINDBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_burst_gale_bow')) break;
                        let WINDBOWS2 = new ActionFormData();
                        WINDBOWS2.title("Burst Gale Bow");
                        WINDBOWS2.body("A bow infused with the force of a rolling wind which can flare up in an instant.\n\n Arrows pull mobs towards you\n Drawing arrows has no slow-down\n\n Draw Time : 1.5s\n Durability : 698");
                        WINDBOWS2.button("Close")
                        WINDBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_echo_of_the_valley')) break;
                        let WINDBOWS3 = new ActionFormData();
                        WINDBOWS3.title("Echo of the Valley");
                        WINDBOWS3.body("This bow calls upon the twisting winds of the hidden valley where it was first strung.\n\n Arrows pull mobs towards you\n Arrows bounce between nearby monsters\n\n Draw Time : 1.5s\n Durability : 698");
                        WINDBOWS3.button("Close")
                        WINDBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 5:
                  if (!player.hasTag('dungeons:collected_twisting_vine_bow')) break;
                  let VINEBOWS = new ActionFormData();
                  VINEBOWS.title("Nether Vine Bows");
                  VINEBOWS.body("These bows have been used by ancient nether hunters for centuries, and have a distinctive smell too...\n\n Arrows leave a poison trail");
                  if (player.hasTag('dungeons:collected_twisting_vine_bow')) {
                    VINEBOWS.button("Twisting Vine Bow", "textures/items/ranged/twisting_vine_bow/standby")
                  } else {
                    VINEBOWS.button("Twisting Vine Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_weeping_vine_bow')) {
                    VINEBOWS.button("Weeping Vine Bow", "textures/items/ranged/weeping_vine_bow/standby")
                  } else {
                    VINEBOWS.button("Weeping Vine Bow", "textures/ui/form/locked_bow")
                  }


                  VINEBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_twisting_vine_bow')) break;
                        let VINEBOWS1 = new ActionFormData();
                        VINEBOWS1.title("Twisting Vine Bow");
                        VINEBOWS1.body("This bow writhes within your grasp as if trying to wrap its tendrils around everything in its path.\n\n Arrows leave a poison trail\n Draw Time : 2s\n Durability : 199");
                        VINEBOWS1.button("Close")
                        VINEBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_weeping_vine_bow')) break;
                        let VINEBOWS2 = new ActionFormData();
                        VINEBOWS2.title("Weeping Vine Bow");
                        VINEBOWS2.body("The Weeping Vine Bow's toxic vines create a poisonous haze on the battlefield.\n\n Arrows leave a poison trail\n Drawing arrows has no slow-down\n\n Draw Time : 2s\n Durability : 461");
                        VINEBOWS2.button("Close")
                        VINEBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 6:
                  if (!player.hasTag('dungeons:collected_void_bow')) break;
                  let VOIDBOWS = new ActionFormData();
                  VOIDBOWS.title("Void Bows");
                  VOIDBOWS.body("These bows channel the corruption forged from the end of the world.\n\n Arrows weaken mobs");
                  if (player.hasTag('dungeons:collected_void_bow')) {
                    VOIDBOWS.button("Void Bow", "textures/items/ranged/void_bow/standby")
                  } else {
                    VOIDBOWS.button("Void Bow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_call_of_the_void')) {
                    VOIDBOWS.button("Call of the Void", "textures/items/ranged/call_of_the_void/standby")
                  } else {
                    VOIDBOWS.button("Call of the Void", "textures/ui/form/locked_bow")
                  }


                  VOIDBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_void_bow')) break;
                        let VOIDBOWS1 = new ActionFormData();
                        VOIDBOWS1.title("Void Bow");
                        VOIDBOWS1.body("When you pluck the string of the Void Bow, an unsettling silence reverberates across the battlefield.\n\n Arrows weaken mobs\n Draw Time : 1s\n Durability : 333");
                        VOIDBOWS1.button("Close")
                        VOIDBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_call_of_the_void')) break;
                        let VOIDBOWS2 = new ActionFormData();
                        VOIDBOWS2.title("Call of the Void");
                        VOIDBOWS2.body("You can feel the Void whispering from deep within this bow, but behind that sound is another voice in the darkness.\n\n Arrows weaken mobs\n Arrows will explode on hit\n\n Draw Time : 1s\n Durability : 567");
                        VOIDBOWS2.button("Close")
                        VOIDBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 7:
                  if (!player.hasTag('dungeons:collected_crossbow')) break;
                  let CROSSBOWS = new ActionFormData();
                  CROSSBOWS.title("Crossbows");
                  CROSSBOWS.body("Considered by some to be a more elegant weapon for a more civilised age.\n\n");
                  if (player.hasTag('dungeons:collected_crossbow')) {
                    CROSSBOWS.button("Crossbow", "textures/items/ranged/crossbow/standby")
                  } else {
                    CROSSBOWS.button("Crossbow", "textures/ui/form/locked_bow")
                  }


                  CROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_crossbow')) break;
                        let CROSSBOWS1 = new ActionFormData();
                        CROSSBOWS1.title("Crossbow");
                        CROSSBOWS1.body("The crossbow is the ranger weapon of the Illagers and is a common sight among Pillager warriors.\n\n Draw Time : 1.25s\n Durability : 464");
                        CROSSBOWS1.button("Close")
                        CROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 8:
                  if (!player.hasTag('dungeons:collected_burst_crossbow')) break;
                  let BURSTCROSSBOWS = new ActionFormData();
                  BURSTCROSSBOWS.title("Burst Crossbows");
                  BURSTCROSSBOWS.body("These are built for quick fire in the heat of battle.\n\n");
                  if (player.hasTag('dungeons:collected_burst_crossbow')) {
                    BURSTCROSSBOWS.button("Burst Crossbow", "textures/items/ranged/burst_crossbow/standby")
                  } else {
                    BURSTCROSSBOWS.button("Burst Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_corrupted_crossbow')) {
                    BURSTCROSSBOWS.button("Corrupted Crossbow", "textures/items/ranged/corrupted_crossbow/standby")
                  } else {
                    BURSTCROSSBOWS.button("Corrupted Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_soul_hunter_crossbow')) {
                    BURSTCROSSBOWS.button("Soul Hunter Crossbow", "textures/items/ranged/soul_hunter_crossbow/standby")
                  } else {
                    BURSTCROSSBOWS.button("Soul Hunter Bow", "textures/ui/form/locked_bow")
                  }


                  BURSTCROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_burst_crossbow')) break;
                        let BURSTCROSSBOWS1 = new ActionFormData();
                        BURSTCROSSBOWS1.title("Burst Crossbow");
                        BURSTCROSSBOWS1.body("A tactical crossbow favoured by warriors and hunters alike, the Burst Crossbow is a powerful tool for any hero.\n\n Draw Time : 0.5s\n Durability : 465");
                        BURSTCROSSBOWS1.button("Close")
                        BURSTCROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_corrupted_crossbow')) break;
                        let BURSTCROSSBOWS2 = new ActionFormData();
                        BURSTCROSSBOWS2.title("Corrupted Crossbow");
                        BURSTCROSSBOWS2.body("This crossbow has a subtle but corrupting power that is suitable for thieves and nimble warriors alike.\n\n 10%% Critical Hit Chance\n\n Draw Time : 0.5s\n Durability : 651");
                        BURSTCROSSBOWS2.button("Close")
                        BURSTCROSSBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_soul_hunter_crossbow')) break;
                        let BURSTCROSSBOWS3 = new ActionFormData();
                        BURSTCROSSBOWS3.title("Soul Hunter Crossbow");
                        BURSTCROSSBOWS3.body("This crossbow, crafted in a forge rich with souls, thrives when an abundance of souls are nearby.\n\n Boosted  Collection\n Critical hit rate rises with Souls\n\n Draw Time : 0.5s\n Durability : 651");
                        BURSTCROSSBOWS3.button("Close")
                        BURSTCROSSBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 9:
                  if (!player.hasTag('dungeons:collected_soul_crossbow')) break;
                  let SOULCROSSBOWS = new ActionFormData();
                  SOULCROSSBOWS.title("Soul Crossbows");
                  SOULCROSSBOWS.body("Magical crossbows made to harness souls, nobody truly knows the reason behind their origin.\n\n Boosted  Collection");
                  if (player.hasTag('dungeons:collected_soul_crossbow')) {
                    SOULCROSSBOWS.button("Soul Crossbow", "textures/items/ranged/soul_crossbow/standby")
                  } else {
                    SOULCROSSBOWS.button("Soul Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_feral_soul_crossbow')) {
                    SOULCROSSBOWS.button("Feral Soul Crossbow", "textures/items/ranged/feral_soul_crossbow/standby")
                  } else {
                    SOULCROSSBOWS.button("Feral Soul Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_voidcaller')) {
                    SOULCROSSBOWS.button("Voidcaller", "textures/items/ranged/voidcaller/standby")
                  } else {
                    SOULCROSSBOWS.button("Voidcaller", "textures/ui/form/locked_bow")
                  }


                  SOULCROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_soul_crossbow')) break;
                        let SOULCROSSBOWS1 = new ActionFormData();
                        SOULCROSSBOWS1.title("Soul Crossbow");
                        SOULCROSSBOWS1.body("The Soul Crossbow was crafted by the mysterious Evokers of the Woodland Mansions.\n\n Boosted  Collection\n Draw Time : 1.25s\n Durability : 281");
                        SOULCROSSBOWS1.button("Close")
                        SOULCROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_feral_soul_crossbow')) break;
                        let SOULCROSSBOWS2 = new ActionFormData();
                        SOULCROSSBOWS2.title("Feral Soul Crossbow");
                        SOULCROSSBOWS2.body("If you listen closely you can hear the souls inside the crossbow, usually ridiculing you.\n\n Boosted  Collection\n Critical hit rate rises with Souls\n\n Draw Time : 1.25s\n Durability : 461");
                        SOULCROSSBOWS2.button("Close")
                        SOULCROSSBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_voidcaller')) break;
                        let SOULCROSSBOWS3 = new ActionFormData();
                        SOULCROSSBOWS3.title("Voidcaller");
                        SOULCROSSBOWS3.body("This weapon calls out to souls that are trapped between this world and the next.\n\n Boosted  Collection\n Arrows pull in nearby mobs on hit\n\n Draw Time : 1.25s\n Durability : 461");
                        SOULCROSSBOWS3.button("Close")
                        SOULCROSSBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 10:
                  if (!player.hasTag('dungeons:collected_heavy_crossbow')) break;
                  let HEAVYCROSSBOWS = new ActionFormData();
                  HEAVYCROSSBOWS.title("Heavy Crossbows");
                  HEAVYCROSSBOWS.body("A lot goes into making a weapon this powerful.\n\n All Arrows have slightly boosted damage");
                  if (player.hasTag('dungeons:collected_heavy_crossbow')) {
                    HEAVYCROSSBOWS.button("Heavy Crossbow", "textures/items/ranged/heavy_crossbow/standby")
                  } else {
                    HEAVYCROSSBOWS.button("Heavy Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_doom_crossbow')) {
                    HEAVYCROSSBOWS.button("Doom Crossbow", "textures/items/ranged/doom_crossbow/standby")
                  } else {
                    HEAVYCROSSBOWS.button("Doom Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_slayer_crossbow')) {
                    HEAVYCROSSBOWS.button("Slayer Crossbow", "textures/items/ranged/slayer_crossbow/standby")
                  } else {
                    HEAVYCROSSBOWS.button("Slayer Crossbow", "textures/ui/form/locked_bow")
                  }


                  HEAVYCROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_heavy_crossbow')) break;
                        let HEAVYCROSSBOWS1 = new ActionFormData();
                        HEAVYCROSSBOWS1.title("Heavy Crossbow");
                        HEAVYCROSSBOWS1.body("The weighted crossbow is a damage-dealing menace and a real threat from a ranged distance.\n\n All Arrows have slightly boosted damage\n Draw Time : 1.5s\n Durability : 696");
                        HEAVYCROSSBOWS1.button("Close")
                        HEAVYCROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_doom_crossbow')) break;
                        let HEAVYCROSSBOWS2 = new ActionFormData();
                        HEAVYCROSSBOWS2.title("Doom Crossbow");
                        HEAVYCROSSBOWS2.body("Many thought that the Doom Crossbow was just a myth, but this time the rumors turned out to be true.\n\n All Arrows have slightly boosted damage\n Arrows have increased knockback.\n\n Draw Time : 1.5s\n Durability : 963");
                        HEAVYCROSSBOWS2.button("Close")
                        HEAVYCROSSBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_slayer_crossbow')) break;
                        let HEAVYCROSSBOWS3 = new ActionFormData();
                        HEAVYCROSSBOWS3.title("Slayer Crossbow");
                        HEAVYCROSSBOWS3.body("The Slayer Crossbow is the treasured heirloom of many legendary hunters\n\n All Arrows have slightly boosted damage\n Arrows bounce between nearby monsters.\n\n Draw Time : 1.5s\n Durability : 963");
                        HEAVYCROSSBOWS3.button("Close")
                        HEAVYCROSSBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 11:
                  if (!player.hasTag('dungeons:collected_exploding_crossbow')) break;
                  let EXPLODINGCROSSBOWS = new ActionFormData();
                  EXPLODINGCROSSBOWS.title("Exploding Crossbows");
                  EXPLODINGCROSSBOWS.body("This explosive launcher is a marvel of modern technology.\n\n Arrows will explode on hit");
                  if (player.hasTag('dungeons:collected_exploding_crossbow')) {
                    EXPLODINGCROSSBOWS.button("Exploding Crossbow", "textures/items/ranged/exploding_crossbow/standby")
                  } else {
                    EXPLODINGCROSSBOWS.button("Exploding Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_imploding_crossbow')) {
                    EXPLODINGCROSSBOWS.button("Imploding Crossbow", "textures/items/ranged/imploding_crossbow/standby")
                  } else {
                    EXPLODINGCROSSBOWS.button("Imploding Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_firebolt_thrower')) {
                    EXPLODINGCROSSBOWS.button("Firebolt Thrower", "textures/items/ranged/firebolt_thrower/standby")
                  } else {
                    EXPLODINGCROSSBOWS.button("Firebolt Thrower", "textures/ui/form/locked_bow")
                  }


                  EXPLODINGCROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_exploding_crossbow')) break;
                        let EXPLODINGCROSSBOWS1 = new ActionFormData();
                        EXPLODINGCROSSBOWS1.title("Exploding Crossbow");
                        EXPLODINGCROSSBOWS1.body("The power of TNT fused with the latest in archery design resulted in this devastating crossbow.\n\n Arrows explode on hit\n Draw Time : 2s\n Durability : 489");
                        EXPLODINGCROSSBOWS1.button("Close")
                        EXPLODINGCROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_imploding_crossbow')) break;
                        let EXPLODINGCROSSBOWS2 = new ActionFormData();
                        EXPLODINGCROSSBOWS2.title("Imploding Crossbow");
                        EXPLODINGCROSSBOWS2.body("The Imploding Crossbow has been magically fine-tuned to maximise the impact of the explosion.\n\n Arrows explode on hit\n Arrows pull in nearby mobs on hit\n\n Draw Time : 2s\n Durability : 721");
                        EXPLODINGCROSSBOWS2.button("Close")
                        EXPLODINGCROSSBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_firebolt_thrower')) break;
                        let EXPLODINGCROSSBOWS3 = new ActionFormData();
                        EXPLODINGCROSSBOWS3.title("Firebolt Thrower");
                        EXPLODINGCROSSBOWS3.body("The Firebolt Thrower launched chaos in a chain reaction of exploding arrows.\n\n Arrows explode on hit\n 33%% Faster draw speed\n\n Draw Time : 1.32s\n Durability : 721");
                        EXPLODINGCROSSBOWS3.button("Close")
                        EXPLODINGCROSSBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 12:
                  if (!player.hasTag('dungeons:collected_cog_crossbow')) break;
                  let COGCROSSBOWS = new ActionFormData();
                  COGCROSSBOWS.title("Cog Crossbows");
                  COGCROSSBOWS.body("The mechanisms in the crossbow let arrows be fired and great speed and with extreme power.\n\n All Arrows have boosted damage");
                  if (player.hasTag('dungeons:collected_cog_crossbow')) {
                    COGCROSSBOWS.button("Cog Crossbow", "textures/items/ranged/cog_crossbow/standby")
                  } else {
                    COGCROSSBOWS.button("Cog Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_pride_of_the_piglins')) {
                    COGCROSSBOWS.button("Pride of the Piglins", "textures/items/ranged/pride_of_the_piglins/standby")
                  } else {
                    COGCROSSBOWS.button("Pride of the Piglins", "textures/ui/form/locked_bow")
                  }


                  COGCROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_harpoon_crossbow')) break;
                        let COGCROSSBOWS1 = new ActionFormData();
                        COGCROSSBOWS1.title("Cog Crossbow");
                        COGCROSSBOWS1.body("The gears of this ancient Cog Crossbow still turn up smoothly, making it a reliable weapon choice to this day.\n\n All Arrows have boosted damage\n Draw Time : 2s\n Durability : 500");
                        COGCROSSBOWS1.button("Close")
                        COGCROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_pride_of_the_piglins')) break;
                        let COGCROSSBOWS2 = new ActionFormData();
                        COGCROSSBOWS2.title("Pride of the Piglins");
                        COGCROSSBOWS2.body("Found in the farthest reaches of the Nether, the Pride of the Piglins is both vintage and vicious.\n\n All Arrows have boosted damage\n Arrows pierce through mobs.\n\n Draw Time : 2s\n Durability : 861");
                        COGCROSSBOWS2.button("Close")
                        COGCROSSBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 13:
                  if (!player.hasTag('dungeons:collected_harpoon_crossbow')) break;
                  let HARPOONCROSSBOWS = new ActionFormData();
                  HARPOONCROSSBOWS.title("Harpoon Crossbows");
                  HARPOONCROSSBOWS.body("These weapons have been used by divers for many years.\n\n Harpoon Arrows have boosted damage");
                  if (player.hasTag('dungeons:collected_harpoon_crossbow')) {
                    HARPOONCROSSBOWS.button("Harpoon Crossbow", "textures/items/ranged/harpoon_crossbow/standby")
                  } else {
                    HARPOONCROSSBOWS.button("Harpoon Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_nautical_crossbow')) {
                    HARPOONCROSSBOWS.button("Nautical Crossbow", "textures/items/ranged/nautical_crossbow/standby")
                  } else {
                    HARPOONCROSSBOWS.button("Nautical Crossbow", "textures/ui/form/locked_bow")
                  }


                  HARPOONCROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_harpoon_crossbow')) break;
                        let HARPOONCROSSBOWS1 = new ActionFormData();
                        HARPOONCROSSBOWS1.title("Harpoon Crossbow");
                        HARPOONCROSSBOWS1.body("The Harpoon Crossbow can shoot harpoons that cut through wind and water with devastating power.\n\n Harpoon Arrows have boosted damage\n Draw Time : 1.5s\n Durability : 321");
                        HARPOONCROSSBOWS1.button("Close")
                        HARPOONCROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_nautical_crossbow')) break;
                        let HARPOONCROSSBOWS2 = new ActionFormData();
                        HARPOONCROSSBOWS2.title("Nautical Crossbow");
                        HARPOONCROSSBOWS2.body("Why harpoon one enemy when you can harpoon many!\n\n Harpoon Arrows have boosted damage\n Arrows pierce through mobs.\n\n Draw Time : 1.5s\n Durability : 512");
                        HARPOONCROSSBOWS2.button("Close")
                        HARPOONCROSSBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 14:
                  if (!player.hasTag('dungeons:collected_shadow_crossbow')) break;
                  let SHADOWCROSSBOWS = new ActionFormData();
                  SHADOWCROSSBOWS.title("Shadow Crossbows");
                  SHADOWCROSSBOWS.body("Those who use these crossbows for too long are said to be consumed by their very shadow...\n\n Defeated mobs grant shadow form");
                  if (player.hasTag('dungeons:collected_shadow_crossbow')) {
                    SHADOWCROSSBOWS.button("Shadow Crossbow", "textures/items/ranged/shadow_crossbow/standby")
                  } else {
                    SHADOWCROSSBOWS.button("Shadow Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_veiled_crossbow')) {
                    SHADOWCROSSBOWS.button("Veiled Crossbow", "textures/items/ranged/veiled_crossbow/standby")
                  } else {
                    SHADOWCROSSBOWS.button("Veiled Crossbow", "textures/ui/form/locked_bow")
                  }
                  if (player.hasTag('dungeons:collected_shrieking_crossbow')) {
                    SHADOWCROSSBOWS.button("Shrieking Crossbow ", "textures/items/ranged/shrieking_crossbow/standby")
                  }


                  SHADOWCROSSBOWS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_shadow_crossbow')) break;
                        let SHADOWCROSSBOWS1 = new ActionFormData();
                        SHADOWCROSSBOWS1.title("Shadow Crossbow");
                        SHADOWCROSSBOWS1.body("Those who wish to use the Shadow Crossbow must train in total darkness before wielding it.\n\n Defeated mobs grant shadow form\n Draw Time : 1.3s\n Durability : 444");
                        SHADOWCROSSBOWS1.button("Close")
                        SHADOWCROSSBOWS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_veiled_crossbow')) break;
                        let SHADOWCROSSBOWS2 = new ActionFormData();
                        SHADOWCROSSBOWS2.title("Veiled Crossbow");
                        SHADOWCROSSBOWS2.body("The Veiled Crossbow cloaks the wielder in shadow, perfect for those who prefer to go unnoticed (and undefeated)\n\n Defeated mobs grant shadow form\n Arrows in shadow form deal 3x damage.\n\n Draw Time : 1.3s\n Durability : 888");
                        SHADOWCROSSBOWS2.button("Close")
                        SHADOWCROSSBOWS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_shrieking_crossbow')) break;
                        let SHADOWCROSSBOWS3 = new ActionFormData();
                        SHADOWCROSSBOWS3.title("Shrieking Crossbow");
                        SHADOWCROSSBOWS3.body("As you wield this unsettling weapon, you might find yourself succumbing to the darkness and becoming one with the night.\n\n Special event item\n\n Defeated mobs grant shadow form\n Arrows in shadow form deal 3x damage.\n\n Draw Time : 1.3s\n Durability : 888");
                        SHADOWCROSSBOWS3.button("Close")
                        SHADOWCROSSBOWS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                default:
                  break;
              }
            }).catch((e) => {
              console.error(e, e.stack);
            });
            break;
          case 2:
            let ARMOUR = new ActionFormData();
            ARMOUR.title("Armour");
            ARMOUR.body("A good set of armour will defer even the toughest blows.");
            if (player.hasTag('dungeons:collected_dark_armour')) {
              ARMOUR.button("Dark Armours", "textures/items/armor/helmet_dark")
            } else {
              ARMOUR.button("Dark Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_grim_armour')) {
              ARMOUR.button("Grim Armours", "textures/items/armor/helmet_grim")
            } else {
              ARMOUR.button("Grim Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_snow_armour')) {
              ARMOUR.button("Snow Armours", "textures/items/armor/helmet_snow")
            } else {
              ARMOUR.button("Snow Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_emerald_armour')) {
              ARMOUR.button("Emerald Armours", "textures/items/armor/helmet_emerald")
            } else {
              ARMOUR.button("Emerald Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_guard_armour')) {
              ARMOUR.button("Guard Armours", "textures/items/armor/helmet_guard")
            } else {
              ARMOUR.button("Guard Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_plate_armour')) {
              ARMOUR.button("Plate Armours", "textures/items/armor/helmet_plate")
            } else {
              ARMOUR.button("Plate Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_piglin_armour')) {
              ARMOUR.button("Piglin Armours", "textures/items/armor/helmet_piglin")
            } else {
              ARMOUR.button("Piglin Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_shulker_armour')) {
              ARMOUR.button("Shulker Armours", "textures/items/armor/helmet_shulker")
            } else {
              ARMOUR.button("Shulker Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_thief_armour')) {
              ARMOUR.button("Thief Armours", "textures/items/armor/helmet_thief")
            } else {
              ARMOUR.button("Thief Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_ghostly_armour')) {
              ARMOUR.button("Ghostly Armours", "textures/items/armor/helmet_ghostly")
            } else {
              ARMOUR.button("Ghostly Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_entertainer_armour')) {
              ARMOUR.button("Entertainer Garbs", "textures/items/armor/helmet_entertainer")
            } else {
              ARMOUR.button("Entertainer Garbs", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_evocation_armour')) {
              ARMOUR.button("Evocation Robes", "textures/items/armor/helmet_evocation")
            } else {
              ARMOUR.button("Evocation Robes", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_teleportation_armour')) {
              ARMOUR.button("Teleportation Robes", "textures/items/armor/helmet_teleportation")
            } else {
              ARMOUR.button("Teleportation Robes", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_sprout_armour')) {
              ARMOUR.button("Sprout Armours", "textures/items/armor/helmet_sprout")
            } else {
              ARMOUR.button("Sprout Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_root_rot_armour')) {
              ARMOUR.button("Root Armours", "textures/items/armor/helmet_root_rot")
            } else {
              ARMOUR.button("Root Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_wolf_armour')) {
              ARMOUR.button("Wolf Armours", "textures/items/armor/helmet_wolf")
            } else {
              ARMOUR.button("Wolf Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_ocelot_armour')) {
              ARMOUR.button("Ocelot Armours", "textures/items/armor/helmet_ocelot")
            } else {
              ARMOUR.button("Ocelot Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_turtle_armour')) {
              ARMOUR.button("Turtle Armours", "textures/items/armor/helmet_turtle")
            } else {
              ARMOUR.button("Turtle Armours", "textures/ui/form/locked_armour")
            }
            if (player.hasTag('dungeons:collected_squid_armour')) {
              ARMOUR.button("Squid Armours", "textures/items/armor/helmet_squid")
            } else {
              ARMOUR.button("Squid Armours", "textures/ui/form/locked_armour")
            }
            ARMOUR.show(player).then(r => {
              player.playSound('item.book.page_turn');
              if (r.canceled) return;
              switch (r.selection) {
                case 0:
                  if (!player.hasTag('dungeons:collected_dark_armour')) break;
                  let DARKARMOURS = new ActionFormData();
                  DARKARMOURS.title("Dark Armours");
                  DARKARMOURS.body("Forged in fire, these armour sets are seriously tough.\n\n");
                  if (player.hasTag('dungeons:collected_dark_armour')) {
                    DARKARMOURS.button("Dark Armour", "textures/items/armor/helmet_dark")
                  } else {
                    DARKARMOURS.button("Dark Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_titans_shroud_armour')) {
                    DARKARMOURS.button("Titans Shroud", "textures/items/armor/helmet_titans_shroud")
                  } else {
                    DARKARMOURS.button("Titans Shroud", "textures/ui/form/locked_armour")
                  }
                  DARKARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_dark_armour')) break;
                        let DARKARMOURS1 = new ActionFormData();
                        DARKARMOURS1.title("Dark Armour");
                        DARKARMOURS1.body("Dark Armour, made in the blackest depths of the Fiery Forge, is worn by the Illager royal guard.\n\n Total Protection : \n Avg Durability : 306");
                        DARKARMOURS1.button("Close")
                        DARKARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_titans_shroud_armour')) break;
                        let DARKARMOURS2 = new ActionFormData();
                        DARKARMOURS2.title("Titans Shroud");
                        DARKARMOURS2.body("The inspiring tales of the Titans Shroud armour have passed through Villages for generations.\n\n +20%% Damage Reduction\n\n Total Protection : x22\n Avg Durability : 760");
                        DARKARMOURS2.button("Close")
                        DARKARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 1:
                  if (!player.hasTag('dungeons:collected_grim_armour')) break;
                  let GRIMARMOURS = new ActionFormData();
                  GRIMARMOURS.title("Grim Armours");
                  GRIMARMOURS.body("These unsettling armour sets were built from the scraps of the Nameless Ones vanguard legion.\n\n");
                  if (player.hasTag('dungeons:collected_grim_armour')) {
                    GRIMARMOURS.button("Grim Armour", "textures/items/armor/helmet_grim")
                  } else {
                    GRIMARMOURS.button("Grim Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_wither_armour')) {
                    GRIMARMOURS.button("Wither Armour", "textures/items/armor/helmet_wither")
                  } else {
                    GRIMARMOURS.button("Wither Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_spooky_gourdian')) {
                    GRIMARMOURS.button("The Spooky Gourdian ", "textures/items/armor/helmet_spooky_gourdian")
                  }
                  GRIMARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_grim_armour')) break;
                        let GRIMARMOURS1 = new ActionFormData();
                        GRIMARMOURS1.title("Grim Armour");
                        GRIMARMOURS1.body("Grim Armour invokes a sense of dread for the one who wears it and to those who face it in battle.\n\n Total Protection : \n Avg Durability : 202");
                        GRIMARMOURS1.button("Close")
                        GRIMARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_wither_armour')) break;
                        let GRIMARMOURS2 = new ActionFormData();
                        GRIMARMOURS2.title("Wither Armour");
                        GRIMARMOURS2.body("Wither Armour, crafted with the parts of slain enemies, was made to terrify the wearer's enemies.\n\n Defeated monsters grant healing \n\n Total Protection : x18\n Avg Durability : 542");
                        GRIMARMOURS2.button("Close")
                        GRIMARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;

                      case 2:
                        if (!player.hasTag('dungeons:collected_spooky_gourdian')) break;
                        let GRIMARMOURS3 = new ActionFormData();
                        GRIMARMOURS3.title("The Spooky Gourdian");
                        GRIMARMOURS3.body("Those who wear the mantle of The Spooky Gourdian become the legendary terror of Pumpkin Pastures!\n\n Special event item\n\n Defeated monsters grant healing\n\n Total Protection : x18\n Avg Durability : 542");
                        GRIMARMOURS3.button("Close")
                        GRIMARMOURS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 2:
                  if (!player.hasTag('dungeons:collected_snow_armour')) break;
                  let SNOWARMOURS = new ActionFormData();
                  SNOWARMOURS.title("Snow Armours");
                  SNOWARMOURS.body("Built from condensed ice, only the bravest warriors can wear these without getting chilly.\n\n -50%% Slowness Duration");
                  if (player.hasTag('dungeons:collected_snow_armour')) {
                    SNOWARMOURS.button("Snow Armour", "textures/items/armor/helmet_snow")
                  } else {
                    SNOWARMOURS.button("Snow Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_frost_armour')) {
                    SNOWARMOURS.button("Frost Armour", "textures/items/armor/helmet_frost")
                  } else {
                    SNOWARMOURS.button("Frost Armour", "textures/ui/form/locked_armour")
                  }
                  SNOWARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_snow_armour')) break;
                        let SNOWARMOURS1 = new ActionFormData();
                        SNOWARMOURS1.title("Snow Armour");
                        SNOWARMOURS1.body("A suit of armour that was tempered in snowmelt, protecting the wearer from the harsh cold of the tundra.\n\n -50%% Slowness Duration\n Total Protection : \n Avg Durability : 112");
                        SNOWARMOURS1.button("Close")
                        SNOWARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_frost_armour')) break;
                        let SNOWARMOURS2 = new ActionFormData();
                        SNOWARMOURS2.title("Frost Armour");
                        SNOWARMOURS2.body("This legendary armour, forged from ice that never melts, makes the wearer feel as if they are one with winter.\n\n -50%% Slowness Duration\n Periodically slows nearby monsters\n\n Total Protection : x20\n Avg Durability : 440");
                        SNOWARMOURS2.button("Close")
                        SNOWARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;

                case 3:
                  if (!player.hasTag('dungeons:collected_emerald_armour')) break;
                  let EMERALDARMOURS = new ActionFormData();
                  EMERALDARMOURS.title("Emerald Armours");
                  EMERALDARMOURS.body("Long carried through myth and legends, these armours are cherished by villagers everywhere.\n\n Defeated mobs grant bonus experience");
                  if (player.hasTag('dungeons:collected_emerald_armour')) {
                    EMERALDARMOURS.button("Emerald Gear", "textures/items/armor/helmet_emerald")
                  } else {
                    EMERALDARMOURS.button("Emerald Gear", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_opulent_armour')) {
                    EMERALDARMOURS.button("Opulent Armour", "textures/items/armor/helmet_opulent")
                  } else {
                    EMERALDARMOURS.button("Opulent Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_gilded_glory_armour')) {
                    EMERALDARMOURS.button("Gilded Glory", "textures/items/armor/helmet_gilded_glory")
                  } else {
                    EMERALDARMOURS.button("Gilded Glory", "textures/ui/form/locked_armour")
                  }
                  EMERALDARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_emerald_armour')) break;
                        let EMERALDARMOURS1 = new ActionFormData();
                        EMERALDARMOURS1.title("Emerald Armour");
                        EMERALDARMOURS1.body("Legend says as you wear the Emerald Armour during your adventures, it calls magical energy to you as if by chance.\n\n Defeated mobs grant bonus experience\n Total Protection : \n Avg Durability : 303");
                        EMERALDARMOURS1.button("Close")
                        EMERALDARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_opulent_armour')) break;
                        let EMERALDARMOURS2 = new ActionFormData();
                        EMERALDARMOURS2.title("Opulent Armour");
                        EMERALDARMOURS2.body("Opulent Armour, originally designed more for show than for combat, thrives in the presence of magical experience.\n\n Defeated mobs grant bonus experience\n Levelling up grants damage immunity\n Total Protection : x22\n Avg Durability : 703");
                        EMERALDARMOURS2.button("Close")
                        EMERALDARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_gilded_glory_armour')) break;
                        let EMERALDARMOURS3 = new ActionFormData();
                        EMERALDARMOURS3.title("Gilded Glory");
                        EMERALDARMOURS3.body("Even death itself has to pause and admire the charms of the legendary Gilded Glory armour.\n\n Defeated mobs grant bonus experience\n Converts levels into health when wounded\n Total Protection : x22\n Avg Durability : 703");
                        EMERALDARMOURS3.button("Close")
                        EMERALDARMOURS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 4:
                  if (!player.hasTag('dungeons:collected_guard_armour')) break;
                  let GUARDARMOURS = new ActionFormData();
                  GUARDARMOURS.title("Guard Armours");
                  GUARDARMOURS.body("These sturdy suits have historically been worn by soldiers and castle guards alike.\n\n -15%% Artefact Cooldown Duration");
                  if (player.hasTag('dungeons:collected_guard_armour')) {
                    GUARDARMOURS.button("Guard Armours", "textures/items/armor/helmet_guard")
                  } else {
                    GUARDARMOURS.button("Guard Armours", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_ender_armour')) {
                    GUARDARMOURS.button("Ender Armours", "textures/items/armor/helmet_ender")
                  } else {
                    GUARDARMOURS.button("Ender Armours", "textures/ui/form/locked_armour")
                  }
                  GUARDARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_guard_armour')) break;
                        let GUARDARMOURS1 = new ActionFormData();
                        GUARDARMOURS1.title("Guard Armour");
                        GUARDARMOURS1.body("Cheap armour made in bulk, the Guard's Armour is a common sight in the villages of the Overworld.\n\n -15%% Artefact Cooldown Duration\n Total Protection : \n Avg Durability : 256");
                        GUARDARMOURS1.button("Close")
                        GUARDARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_ender_armour')) break;
                        let GUARDARMOURS2 = new ActionFormData();
                        GUARDARMOURS2.title("Ender Armour");
                        GUARDARMOURS2.body("Not much is known about this curious little armour set, but it certainly makes people wonder about what could've been, whatever that means...\n\n -15%% Artefact Cooldown Duration\n 10%% chance to teleport you away when attacked\n\n Total Protection : x19\n Avg Durability : 644");
                        GUARDARMOURS2.button("Close")
                        GUARDARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 5:
                  if (!player.hasTag('dungeons:collected_plate_armour')) break;
                  let PLATEARMOURS = new ActionFormData();
                  PLATEARMOURS.title("Plate Armours");
                  PLATEARMOURS.body("Super dense armour that is as hard to break as it is to move in.\n\n -15%% Movement Speed");
                  if (player.hasTag('dungeons:collected_plate_armour')) {
                    PLATEARMOURS.button("Plate Armour", "textures/items/armor/helmet_plate")
                  } else {
                    PLATEARMOURS.button("Plate Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_full_metal_armour')) {
                    PLATEARMOURS.button("Full Metal Armour", "textures/items/armor/helmet_full_metal")
                  } else {
                    PLATEARMOURS.button("Full Metal Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_cauldron_armour')) {
                    PLATEARMOURS.button("Cauldron Armour ", "textures/items/armor/helmet_cauldron")
                  }
                  PLATEARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_plate_armour')) break;
                        let PLATEARMOURS1 = new ActionFormData();
                        PLATEARMOURS1.title("Plate Armour");
                        PLATEARMOURS1.body("Plate armor turns the average soldier into a fortress but comes with reduced mobility.\n\n -15%% Movement Speed\n Total Protection : \n Avg Durability : 457");
                        PLATEARMOURS1.button("Close")
                        PLATEARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_full_metal_armour')) break;
                        let PLATEARMOURS2 = new ActionFormData();
                        PLATEARMOURS2.title("Full Metal Armour");
                        PLATEARMOURS2.body("Full Metal Armor is destined for the great defenders of the Overworld.\n\n -15%% Movement Speed\n Boosts Attack Power\n\n Total Protection : x24\n Avg Durability : 757");
                        PLATEARMOURS2.button("Close")
                        PLATEARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;

                      case 2:
                        if (!player.hasTag('dungeons:collected_cauldron_armour')) break;
                        let PLATEARMOURS3 = new ActionFormData();
                        PLATEARMOURS3.title("Cauldron Armour");
                        PLATEARMOURS3.body("The Cauldron Armor was created with camouflage in mind, but what it lacks in stealth it makes up for in bubbly charm.\n\n Special event item\n\n -15%% Movement Speed\n Boosts Attack Power\n\n Total Protection : x24\n Avg Durability : 757");
                        PLATEARMOURS3.button("Close")
                        PLATEARMOURS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 6:
                  if (!player.hasTag('dungeons:collected_piglin_armour')) break;
                  let PIGLINARMOURS = new ActionFormData();
                  PIGLINARMOURS.title("Piglin Armours");
                  PIGLINARMOURS.body("These armours were worn by ancient savages of the Nether tribes.\n\n");
                  if (player.hasTag('dungeons:collected_piglin_armour')) {
                    PIGLINARMOURS.button("Piglin Gear", "textures/items/armor/helmet_piglin")
                  } else {
                    PIGLINARMOURS.button("Piglin Gear", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_golden_piglin_armour')) {
                    PIGLINARMOURS.button("Golden Piglin Armour", "textures/items/armor/helmet_golden_piglin")
                  } else {
                    PIGLINARMOURS.button("Golden Piglin Armour", "textures/ui/form/locked_armour")
                  }
                  PIGLINARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_piglin_armour')) break;
                        let PIGLINARMOURS1 = new ActionFormData();
                        PIGLINARMOURS1.title("Piglin Armour");
                        PIGLINARMOURS1.body("Wearing the Piglin Armour is almost enough to make one feel at home in the Nether. Almost.\n\n Total Protection : \n Avg Durability : 138");
                        PIGLINARMOURS1.button("Close")
                        PIGLINARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_golden_piglin_armour')) break;
                        let PIGLINARMOURS2 = new ActionFormData();
                        PIGLINARMOURS2.title("Golden Piglin Armour");
                        PIGLINARMOURS2.body("The Golden Piglin Armour combines a piglin's two favorite things: not dying and gold.\n\n Replenishes health from (non-soul) artefact use\n Total Protection : x20\n Avg Durability : 288");
                        PIGLINARMOURS2.button("Close")
                        PIGLINARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 7:
                  if (!player.hasTag('dungeons:collected_shulker_armour')) break;
                  let SHULKERARMOURS = new ActionFormData();
                  SHULKERARMOURS.title("Shulker Armours");
                  SHULKERARMOURS.body("Puzzling armour forged from The End, designed to be nigh indestructible.\n\n +20%% Damage Reduction when swarmed");
                  if (player.hasTag('dungeons:collected_shulker_armour')) {
                    SHULKERARMOURS.button("Shulker Armours", "textures/items/armor/helmet_shulker")
                  } else {
                    SHULKERARMOURS.button("Shulker Armours", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_sturdy_shulker_armour')) {
                    SHULKERARMOURS.button("Sturdy Shulker Armours", "textures/items/armor/helmet_sturdy_shulker")
                  } else {
                    SHULKERARMOURS.button("Sturdy Shulker Armours", "textures/ui/form/locked_armour")
                  }
                  SHULKERARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_shulker_armour')) break;
                        let SHULKERARMOURS1 = new ActionFormData();
                        SHULKERARMOURS1.title("Shulker Armour");
                        SHULKERARMOURS1.body("Shulker Armour rivals even the toughest steel plate.\n\n +20%% Damage Reduction when swarmed\n Total Protection : \n Avg Durability : 407");
                        SHULKERARMOURS1.button("Close")
                        SHULKERARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_sturdy_shulker_armour')) break;
                        let SHULKERARMOURS2 = new ActionFormData();
                        SHULKERARMOURS2.title("Sturdy Shulker Armour");
                        SHULKERARMOURS2.body("They say the best defense is a good offense, but good luck breaking through this bulwark.\n\n +20%% Damage Reduction when swarmed\n Periodically levitates nearby foes\n\n Total Protection : x24\n Avg Durability : 605");
                        SHULKERARMOURS2.button("Close")
                        SHULKERARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 8:
                  if (!player.hasTag('dungeons:collected_thief_armour')) break;
                  let THIEFARMOURS = new ActionFormData();
                  THIEFARMOURS.title("Thief Armours");
                  THIEFARMOURS.body("These armours have long seen use by crooks and outcasts.\n\n -25%% Attack Cooldown Duration");
                  if (player.hasTag('dungeons:collected_thief_armour')) {
                    THIEFARMOURS.button("Thief Armour", "textures/items/armor/helmet_thief")
                  } else {
                    THIEFARMOURS.button("Thief Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_spider_armour')) {
                    THIEFARMOURS.button("Spider Armour", "textures/items/armor/helmet_spider")
                  } else {
                    THIEFARMOURS.button("Spider Armour", "textures/ui/form/locked_armour")
                  }
                  THIEFARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_thief_armour')) break;
                        let THIEFARMOURS1 = new ActionFormData();
                        THIEFARMOURS1.title("Thief Armour");
                        THIEFARMOURS1.body("This armour is light, nimble, and smells faintly of sulfur.\n\n -25%% Weapon Cooldown Duration\n Total Protection : \n Avg Durability : 186");
                        THIEFARMOURS1.button("Close")
                        THIEFARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_spider_armour')) break;
                        let THIEFARMOURS2 = new ActionFormData();
                        THIEFARMOURS2.title("Spider Armour");
                        THIEFARMOURS2.body("Spider Armour, created by master thieves, is inspired by the agile talents of the spider.\n\n -25%% Weapon Cooldown Duration\n Steals 7% of health you damage from mobs\n\n Total Protection : x17\n Avg Durability : 409");
                        THIEFARMOURS2.button("Close")
                        THIEFARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 9:
                  if (!player.hasTag('dungeons:collected_ghostly_armour')) break;
                  let GHOSTARMOURS = new ActionFormData();
                  GHOSTARMOURS.title("Ghostly Armours");
                  GHOSTARMOURS.body("Armours made by powerful necromancers, wearing it makes you uneasy.\n\n Enter ghost mode when sprinting");
                  if (player.hasTag('dungeons:collected_ghostly_armour')) {
                    GHOSTARMOURS.button("Ghostly Armour", "textures/items/armor/helmet_ghostly")
                  } else {
                    GHOSTARMOURS.button("Ghostly Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_ghost_kindler_armour')) {
                    GHOSTARMOURS.button("Ghost Kindler", "textures/items/armor/helmet_ghost_kindler")
                  } else {
                    GHOSTARMOURS.button("Ghost Kindler", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_cloaked_skull_armour')) {
                    GHOSTARMOURS.button("Cloaked Skull ", "textures/items/armor/helmet_cloaked_skull")
                  }
                  GHOSTARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_ghostly_armour')) break;
                        let GHOSTARMOURS1 = new ActionFormData();
                        GHOSTARMOURS1.title("Ghostly Armour");
                        GHOSTARMOURS1.body("Those who wear Ghostly Armor may feel their bodies briefly disconnect from the physical world, but are quickly snapped back to reality.\n\n Enter ghost mode when sprinting\n Total Protection : \n Avg Durability : 202");
                        GHOSTARMOURS1.button("Close")
                        GHOSTARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_ghost_kindler_armour')) break;
                        let GHOSTARMOURS2 = new ActionFormData();
                        GHOSTARMOURS2.title("Ghost Kindler");
                        GHOSTARMOURS2.body("Strange flames follow the shifting form of those who wear the Ghost Kindler armor.\n\n Enter ghost mode when sprinting\n Sprinting burns nearby mobs\n\n Total Protection : x15\n Avg Durability : 565");
                        GHOSTARMOURS2.button("Close")
                        GHOSTARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_cloaked_skull_armour')) break;
                        let GHOSTARMOURS3 = new ActionFormData();
                        GHOSTARMOURS3.title("Cloaked Skull");
                        GHOSTARMOURS3.body("Shroud your scary skeletal form with a creepy cloak, still scary!\n\n Special event item\n\n Enter ghost mode when sprinting\n Sprinting burns nearby mobs\n\n Total Protection : x15\n Avg Durability : 565");
                        GHOSTARMOURS3.button("Close")
                        GHOSTARMOURS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 10:
                  if (!player.hasTag('dungeons:collected_entertainer_armour')) break;
                  let ENTERTAINERARMOURS = new ActionFormData();
                  ENTERTAINERARMOURS.title("Entertainer's Garbs");
                  ENTERTAINERARMOURS.body("It may not be the best defence, but we both know this is the most stylish choice.\n\n +30%% Positive Effect Duration");
                  if (player.hasTag('dungeons:collected_entertainer_armour')) {
                    ENTERTAINERARMOURS.button("Entertainer's Garb", "textures/items/armor/helmet_entertainer")
                  } else {
                    ENTERTAINERARMOURS.button("Entertainer's Garb", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_troubadour_armour')) {
                    ENTERTAINERARMOURS.button("The Troubadour", "textures/items/armor/helmet_troubadour")
                  } else {
                    ENTERTAINERARMOURS.button("The Troubadour", "textures/ui/form/locked_armour")
                  }
                  ENTERTAINERARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_entertainer_armour')) break;
                        let ENTERTAINERARMOURS1 = new ActionFormData();
                        ENTERTAINERARMOURS1.title("Entertainer's Garb");
                        ENTERTAINERARMOURS1.body("Defensive? Sure. Fabulous? ABSOLUTELY.\n\n +30%% Positive Effect Duration\n Total Protection : \n Avg Durability : 169");
                        ENTERTAINERARMOURS1.button("Close")
                        ENTERTAINERARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_troubadour_armour')) break;
                        let ENTERTAINERARMOURS2 = new ActionFormData();
                        ENTERTAINERARMOURS2.title("The Troubadour");
                        ENTERTAINERARMOURS2.body("Why leave your adoring fans wanting more when you can wow them with this inspirational outfit?\n\n +30%% Positive Effect Duration\n -30%% Negative Effect Durarion\n\n Total Protection : x17\n Avg Durability : 468");
                        ENTERTAINERARMOURS2.button("Close")
                        ENTERTAINERARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 11:
                  if (!player.hasTag('dungeons:collected_evocation_armour')) break;
                  let EVOCATIONARMOURS = new ActionFormData();
                  EVOCATIONARMOURS.title("Evocation Robes");
                  EVOCATIONARMOURS.body("Brave soul-channellers once wore these fine robes.\n\n -30%% Artefact Cooldown Duration");
                  if (player.hasTag('dungeons:collected_evocation_armour')) {
                    EVOCATIONARMOURS.button("Evocation Robes", "textures/items/armor/helmet_evocation")
                  } else {
                    EVOCATIONARMOURS.button("Evocation Robes", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_ember_armour')) {
                    EVOCATIONARMOURS.button("Ember Robes", "textures/items/armor/helmet_ember")
                  } else {
                    EVOCATIONARMOURS.button("Ember Robes", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_verdant_armour')) {
                    EVOCATIONARMOURS.button("Verdant Robes", "textures/items/armor/helmet_verdant")
                  } else {
                    EVOCATIONARMOURS.button("Verdant Robes", "textures/ui/form/locked_armour")
                  }
                  EVOCATIONARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_evocation_armour')) break;
                        let EVOCATIONARMOURS1 = new ActionFormData();
                        EVOCATIONARMOURS1.title("Evocation Robes");
                        EVOCATIONARMOURS1.body("Potent magical runes are weaved into the fabric of these robes, their origins and powers are shrouded in mystery.\n\n -30%% Artefact Cooldown Duration\n Total Protection : \n Avg Durability : 121");
                        EVOCATIONARMOURS1.button("Close")
                        EVOCATIONARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_ember_armour')) break;
                        let EVOCATIONARMOURS2 = new ActionFormData();
                        EVOCATIONARMOURS2.title("Ember Robes");
                        EVOCATIONARMOURS2.body("The Ember Robe was created by Illager Evokers to distinguish themselves from the common guard.\n\n -30%% Artefact Cooldown Duration\n Ignites monsters that attack you\n\n Total Protection : x17\n Avg Durability : 371");
                        EVOCATIONARMOURS2.button("Close")
                        EVOCATIONARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_verdant_armour')) break;
                        let EVOCATIONARMOURS3 = new ActionFormData();
                        EVOCATIONARMOURS3.title("Verdant Robes");
                        EVOCATIONARMOURS3.body("Those who don the Verdant Robe soon find that they can commune with souls more than ever before.\n\n -30%% Artefact Cooldown Duration\n Doubles all collected \n\n Total Protection : x17\n Avg Durability : 371");
                        EVOCATIONARMOURS3.button("Close")
                        EVOCATIONARMOURS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 12:
                  if (!player.hasTag('dungeons:collected_teleportation_armour')) break;
                  let TELEPORTATIONARMOURS = new ActionFormData();
                  TELEPORTATIONARMOURS.title("Teleportation Robes");
                  TELEPORTATIONARMOURS.body("These robes, styled after a legendary fighter, possess incredible power in the right hands.\n\n Double tap sneak to teleport");
                  if (player.hasTag('dungeons:collected_teleportation_armour')) {
                    TELEPORTATIONARMOURS.button("Teleportation Robes", "textures/items/armor/helmet_teleportation")
                  } else {
                    TELEPORTATIONARMOURS.button("Teleportation Robes", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_unstable_armour')) {
                    TELEPORTATIONARMOURS.button("Unstable Robes", "textures/items/armor/helmet_unstable")
                  } else {
                    TELEPORTATIONARMOURS.button("Unstable Robes", "textures/ui/form/locked_armour")
                  }
                  TELEPORTATIONARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_teleportation_armour')) break;
                        let TELEPORTATIONARMOURS1 = new ActionFormData();
                        TELEPORTATIONARMOURS1.title("Teleportation Robes");
                        TELEPORTATIONARMOURS1.body("The Teleportation Robes were made by those who devoted their lives to studying the enigmas of the End.\n\n Double tap sneak to teleport\n Total Protection : \n Avg Durability : 171");
                        TELEPORTATIONARMOURS1.button("Close")
                        TELEPORTATIONARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_unstable_armour')) break;
                        let TELEPORTATIONARMOURS2 = new ActionFormData();
                        TELEPORTATIONARMOURS2.title("Unstable Robes");
                        TELEPORTATIONARMOURS2.body("This Enderobe sparks with static as you sashay across the battlefield.\n\n Double tap sneak to teleport\n Creates an explosion after teleporting\n\n Total Protection : x20\n Avg Durability : 471");
                        TELEPORTATIONARMOURS2.button("Close")
                        TELEPORTATIONARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 13:
                  if (!player.hasTag('dungeons:collected_sprout_armour')) break;
                  let SPROUTARMOURS = new ActionFormData();
                  SPROUTARMOURS.title("Sprout Armours");
                  SPROUTARMOURS.body("This disgusting armour is coated in powerful poisonous spores.\n\n Poisons nearby foes as you sprint");
                  if (player.hasTag('dungeons:collected_sprout_armour')) {
                    SPROUTARMOURS.button("Sprout Armour", "textures/items/armor/helmet_sprout")
                  } else {
                    SPROUTARMOURS.button("Sprout Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_living_vines_armour')) {
                    SPROUTARMOURS.button("Living Vines Armour", "textures/items/armor/helmet_living_vines")
                  } else {
                    SPROUTARMOURS.button("Living Vines Armour", "textures/ui/form/locked_armour")
                  }
                  SPROUTARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_sprout_armour')) break;
                        let SPROUTARMOURS1 = new ActionFormData();
                        SPROUTARMOURS1.title("Sprout Armour");
                        SPROUTARMOURS1.body("The dark vines of the Sprout Armour continue to grow even in complete darkness.\n\n Poisons nearby foes as you sprint\n Total Protection : \n Avg Durability : 136");
                        SPROUTARMOURS1.button("Close")
                        SPROUTARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_living_vines_armour')) break;
                        let SPROUTARMOURS2 = new ActionFormData();
                        SPROUTARMOURS2.title("Living Vines Armour");
                        SPROUTARMOURS2.body("This armour is made from the living vines of a plant which grows only on the battlefield.\n\n Poisons nearby foes as you sprint\n Steals 50%% of health from mobs taking poison damage\n\n Total Protection : x16\n Avg Durability : 445");
                        SPROUTARMOURS2.button("Close")
                        SPROUTARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 14:
                  if (!player.hasTag('dungeons:collected_root_rot_armour')) break;
                  let ROOTARMOURS = new ActionFormData();
                  ROOTARMOURS.title("Root Rot Armours");
                  ROOTARMOURS.body("Armour like this was formed by roots and plants overtaking the armour of fallen worries.\n\n Replenishes hunger from artefact use");
                  if (player.hasTag('dungeons:collected_root_rot_armour')) {
                    ROOTARMOURS.button("Root Rot Armour", "textures/items/armor/helmet_root_rot")
                  } else {
                    ROOTARMOURS.button("Root Rot Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_black_spot_armour')) {
                    ROOTARMOURS.button("Black Spot Armour", "textures/items/armor/helmet_black_spot")
                  } else {
                    ROOTARMOURS.button("Black Spot Armour", "textures/ui/form/locked_armour")
                  }
                  ROOTARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_root_rot_armour')) break;
                        let ROOTARMOURS1 = new ActionFormData();
                        ROOTARMOURS1.title("Root Rot Armour");
                        ROOTARMOURS1.body("Twisted roots form this aberrant armour, it's malevolent nature evident.\n\n Replenishes hunger from (non-soul) artefact use\n\n Total Protection : \n Avg Durability : 237");
                        ROOTARMOURS1.button("Close")
                        ROOTARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_black_spot_armour')) break;
                        let ROOTARMOURS2 = new ActionFormData();
                        ROOTARMOURS2.title("Black Spot Armour");
                        ROOTARMOURS2.body("This decaying armour has an unsettling presence, as if it's watching you.\n\n Replenishes hunger from (non-soul) artefact use\n Replenishes health from (non-soul) artefact use\n\n Total Protection : x19\n Avg Durability : 633");
                        ROOTARMOURS2.button("Close")
                        ROOTARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 15:
                  if (!player.hasTag('dungeons:collected_wolf_armour')) break;
                  let WOLFARMOURS = new ActionFormData();
                  WOLFARMOURS.title("Wolf Armours");
                  WOLFARMOURS.body("These barbaric sets of armour were invented by a fierce tribe from ancient times.\n\n");
                  if (player.hasTag('dungeons:collected_wolf_armour')) {
                    WOLFARMOURS.button("Wolf Armour", "textures/items/armor/helmet_wolf")
                  } else {
                    WOLFARMOURS.button("Wolf Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_black_wolf_armour')) {
                    WOLFARMOURS.button("Black Wolf Armour", "textures/items/armor/helmet_black_wolf")
                  } else {
                    WOLFARMOURS.button("Black Wolf Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_fox_armour')) {
                    WOLFARMOURS.button("Fox Armour", "textures/items/armor/helmet_fox")
                  } else {
                    WOLFARMOURS.button("Fox Armour", "textures/ui/form/locked_armour")
                  }
                  WOLFARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_wolf_armour')) break;
                        let WOLFARMOURS1 = new ActionFormData();
                        WOLFARMOURS1.title("Wolf Armour");
                        WOLFARMOURS1.body("Many warriors wear the heads of wolves into battle to strike fear into the hearts of their enemies.\n\n Total Protection : \n Avg Durability : 101");
                        WOLFARMOURS1.button("Close")
                        WOLFARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_black_wolf_armour')) break;
                        let WOLFARMOURS2 = new ActionFormData();
                        WOLFARMOURS2.title("Black Wolf Armour");
                        WOLFARMOURS2.body("The wolf who strikes from the shadows lives to tell the tale.\n\n Boosts attack power\n\n Total Protection : x16\n Avg Durability : 502");
                        WOLFARMOURS2.button("Close")
                        WOLFARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 2:
                        if (!player.hasTag('dungeons:collected_fox_armour')) break;
                        let WOLFARMOURS3 = new ActionFormData();
                        WOLFARMOURS3.title("Fox Armour");
                        WOLFARMOURS3.body("Ancient Villager tribes created this armour to honor the fox, who is a great and agile warrior.\n\n -50%% Weapon Cooldown Duration\n\n Total Protection : x16\n Avg Durability : 502");
                        WOLFARMOURS3.button("Close")
                        WOLFARMOURS3.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 16:
                  if (!player.hasTag('dungeons:collected_ocelot_armour')) break;
                  let OCELOTARMOURS = new ActionFormData();
                  OCELOTARMOURS.title("Ocelot Armours");
                  OCELOTARMOURS.body("These garments are said to be some of the oldest sets of armour discovered.\n\n");
                  if (player.hasTag('dungeons:collected_ocelot_armour')) {
                    OCELOTARMOURS.button("Ocelot Armour", "textures/items/armor/helmet_ocelot")
                  } else {
                    OCELOTARMOURS.button("Ocelot Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_shadow_walker_armour')) {
                    OCELOTARMOURS.button("Shadow Walker", "textures/items/armor/helmet_shadow_walker")
                  } else {
                    OCELOTARMOURS.button("Shadow Walker", "textures/ui/form/locked_armour")
                  }
                  OCELOTARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_ocelot_armour')) break;
                        let OCELOTARMOURS1 = new ActionFormData();
                        OCELOTARMOURS1.title("Ocelot Armour");
                        OCELOTARMOURS1.body("You feel a rush of pure adrenaline surge through your body when you wear this Ocelot's pelt.\n\n Total Protection : \n Avg Durability : 138");
                        OCELOTARMOURS1.button("Close")
                        OCELOTARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_shadow_walker_armour')) break;
                        let OCELOTARMOURS2 = new ActionFormData();
                        OCELOTARMOURS2.title("Shadow Walker");
                        OCELOTARMOURS2.body("The legendary black Ocelot was as graceful as it was deadly. When you wear its pelt, you feel like your enemies are left chasing your shadow.\n\n +60%% Damage Reduction while sprinting\n\n Total Protection : x18\n Avg Durability : 413");
                        OCELOTARMOURS2.button("Close")
                        OCELOTARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;

                case 17:
                  if (!player.hasTag('dungeons:collected_turtle_armour')) break;
                  let TURTLEARMOURS = new ActionFormData();
                  TURTLEARMOURS.title("Turtle Armours");
                  TURTLEARMOURS.body("Who doesn't want to look like a turtle? The sturdy shell definitely adds to any look\n\n +33%% Healing Aura");
                  if (player.hasTag('dungeons:collected_turtle_armour')) {
                    TURTLEARMOURS.button("Turtle Armour", "textures/items/armor/helmet_turtle")
                  } else {
                    TURTLEARMOURS.button("Turtle Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_nimble_turtle_armour')) {
                    TURTLEARMOURS.button("Nimble Turtle Armour", "textures/items/armor/helmet_nimble_turtle")
                  } else {
                    TURTLEARMOURS.button("Nimble Turtle Armour", "textures/ui/form/locked_armour")
                  }
                  TURTLEARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_turtle_armour')) break;
                        let TURTLEARMOURS1 = new ActionFormData();
                        TURTLEARMOURS1.title("Turtle Armour");
                        TURTLEARMOURS1.body("The Turtle Armour is inspired by the hardy and protective shell of the humble turtle.\n\n +33%% Healing Aura\n\n Total Protection : \n Avg Durability : 414");
                        TURTLEARMOURS1.button("Close")
                        TURTLEARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_nimble_turtle_armour')) break;
                        let TURTLEARMOURS2 = new ActionFormData();
                        TURTLEARMOURS2.title("Nimble Turtle Armour");
                        TURTLEARMOURS2.body("This armour is made from the dense (but surprisingly light) shells of turtles who lived at crushing depths.\n\n +33%% Healing Aura\n +60%% speed after being injured\n\n Total Protection : x20\n Avg Durability : 655");
                        TURTLEARMOURS2.button("Close")
                        TURTLEARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 18:
                  if (!player.hasTag('dungeons:collected_squid_armour')) break;
                  let SQUIDARMOURS = new ActionFormData();
                  SQUIDARMOURS.title("Squid Armours");
                  SQUIDARMOURS.body("Outfits like these, made from the slippery skin of a squid, are perfect for ocean encounters \n\n Spews ink to blind attackers");
                  if (player.hasTag('dungeons:collected_squid_armour')) {
                    SQUIDARMOURS.button("Squid Armour", "textures/items/armor/helmet_squid")
                  } else {
                    SQUIDARMOURS.button("Squid Armour", "textures/ui/form/locked_armour")
                  }
                  if (player.hasTag('dungeons:collected_glow_squid_armour')) {
                    SQUIDARMOURS.button("Glow Squid Armour", "textures/items/armor/helmet_glow_squid")
                  } else {
                    SQUIDARMOURS.button("Glow Squid Armour", "textures/ui/form/locked_armour")
                  }
                  SQUIDARMOURS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                    switch (r.selection) {
                      case 0:
                        if (!player.hasTag('dungeons:collected_squid_armour')) break;
                        let SQUIDARMOURS1 = new ActionFormData();
                        SQUIDARMOURS1.title("Squid Armour");
                        SQUIDARMOURS1.body("It was easy to make this jet black armour look cool. The hard part was securing the ink sacs.\n\n Spews ink to blind attackers\n\n Total Protection : \n Avg Durability : 180");
                        SQUIDARMOURS1.button("Close")
                        SQUIDARMOURS1.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      case 1:
                        if (!player.hasTag('dungeons:collected_glow_squid_armour')) break;
                        let SQUIDARMOURS2 = new ActionFormData();
                        SQUIDARMOURS2.title("Glow Squid Armour");
                        SQUIDARMOURS2.body("Those who hunt elusive glow squids wear this armour to blend in with their beautiful prey.\n\n Spews ink to blind attackers\n +50%% Damage Immunity time\n\n Total Protection : x17\n Avg Durability : 477");
                        SQUIDARMOURS2.button("Close")
                        SQUIDARMOURS2.show(player).then(r => {
                          player.playSound('item.book.page_turn');
                          if (r.canceled) return;
                        }).catch(e => {
                          console.error(e, e.stack);
                        });
                        break;
                      default:
                    }
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                default:
              }
            }).catch(e => {
              console.error(e, e.stack);
            });
            break;
          case 3:
            let ARTEFACT = new ActionFormData();
            ARTEFACT.title("Artefacts");
            ARTEFACT.body("A mastery of artefacts can be the turn the tide in any battle.");
            if (player.hasTag('dungeons:collected_harvester')) {
              ARTEFACT.button("Harvester", "textures/items/artifact/harvester")
            } else {
              ARTEFACT.button("Harvester", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_satchel_of_elements')) {
              ARTEFACT.button("Satchel of Elements", "textures/items/artifact/satchel_of_elements")
            } else {
              ARTEFACT.button("Satchel of Elements", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_ice_wand')) {
              ARTEFACT.button("Ice Wand", "textures/items/artifact/ice_wand")
            } else {
              ARTEFACT.button("Ice Wand", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_lightning_rod')) {
              ARTEFACT.button("Lightning Wand", "textures/items/artifact/lightning_rod")
            } else {
              ARTEFACT.button("Lightning Wand", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_scatter_mines')) {
              ARTEFACT.button("Scatter Mines", "textures/items/artifact/scatter_mines")
            } else {
              ARTEFACT.button("Scatter Mines", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_blast_fungus')) {
              ARTEFACT.button("Blast Fungus", "textures/items/artifact/blast_fungus")
            } else {
              ARTEFACT.button("Blast Fungus", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_eye_of_the_guardian')) {
              ARTEFACT.button("Eye of the Guardian", "textures/items/artifact/eye_of_the_guardian")
            } else {
              ARTEFACT.button("Eye of the Guardian", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_corrupted_beacon')) {
              ARTEFACT.button("Corrupted Beacon", "textures/items/artifact/corrupted_beacon")
            } else {
              ARTEFACT.button("Corrupted Beacon", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_updraft_tome')) {
              ARTEFACT.button("Updraft Tome", "textures/items/artifact/updraft_tome")
            } else {
              ARTEFACT.button("Updraft Tome", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_spinblade')) {
              ARTEFACT.button("Spinblade", "textures/items/artifact/spinblade")
            } else {
              ARTEFACT.button("Spinblade", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_soul_healer')) {
              ARTEFACT.button("Soul Healer", "textures/items/artifact/soul_healer")
            } else {
              ARTEFACT.button("Soul Healer", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_totem_of_regeneration')) {
              ARTEFACT.button("Totem of Regeneration", "textures/items/artifact/totem_regen")
            } else {
              ARTEFACT.button("Totem of Regeneration", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_iron_hide_amulet')) {
              ARTEFACT.button("Iron Hide Amulet", "textures/items/artifact/iron_hide")
            } else {
              ARTEFACT.button("Iron Hide Amulet", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_death_cap_mushroom')) {
              ARTEFACT.button("Death Cap Mushroom", "textures/items/artifact/death_cap")
            } else {
              ARTEFACT.button("Death Cap Mushroom", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_boots_of_swiftness')) {
              ARTEFACT.button("Boots of Swiftness", "textures/items/artifact/boots_swiftness")
            } else {
              ARTEFACT.button("Boots of Swiftness", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_ghost_cloak')) {
              ARTEFACT.button("Ghost Cloak", "textures/items/artifact/ghost_cloak")
            } else {
              ARTEFACT.button("Ghost Cloak", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_light_feather')) {
              ARTEFACT.button("Light Feather", "textures/items/artifact/light_feather")
            } else {
              ARTEFACT.button("Light Feather", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_totem_of_shielding')) {
              ARTEFACT.button("Totem of Shielding", "textures/items/artifact/totem_shield")
            } else {
              ARTEFACT.button("Totem of Shielding", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_totem_of_casting')) {
              ARTEFACT.button("Totem of Casting", "textures/items/artifact/totem_casting")
            } else {
              ARTEFACT.button("Totem of Casting", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_satchel_of_snacks')) {
              ARTEFACT.button("Satchel of Snacks", "textures/items/artifact/satchel_of_snacks")
            } else {
              ARTEFACT.button("Satchel of Snacks", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_satchel_of_elixirs')) {
              ARTEFACT.button("Satchel of Elixirs", "textures/items/artifact/satchel_of_elixirs")
            } else {
              ARTEFACT.button("Satchel of Elixirs", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_powershaker')) {
              ARTEFACT.button("Powershaker", "textures/items/artifact/powershaker")
            } else {
              ARTEFACT.button("Powershaker", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_shadow_shifter')) {
              ARTEFACT.button("Shadow Shifter", "textures/items/artifact/shadow_shifter")
            } else {
              ARTEFACT.button("Shadow Shifter", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_shock_powder')) {
              ARTEFACT.button("Shock Powder", "textures/items/artifact/shock_powder")
            } else {
              ARTEFACT.button("Shock Powder", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_gong_of_weakening')) {
              ARTEFACT.button("Gong of Weakening", "textures/items/artifact/gong_weakening")
            } else {
              ARTEFACT.button("Gong of Weakening", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_wind_horn')) {
              ARTEFACT.button("Wind Horn", "textures/items/artifact/wind_horn")
            } else {
              ARTEFACT.button("Wind Horn", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_corrupted_seeds')) {
              ARTEFACT.button("Corrupted Seeds", "textures/items/artifact/corrupted_seeds")
            } else {
              ARTEFACT.button("Corrupted Seeds", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_enchanters_tome')) {
              ARTEFACT.button("Enchanters Tome", "textures/items/artifact/enchanters_tome")
            } else {
              ARTEFACT.button("Enchanters Tome", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_enchanted_grass')) {
              ARTEFACT.button("Enchanted Grass", "textures/items/artifact/enchanted_grass")
            } else {
              ARTEFACT.button("Enchanted Grass", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_buzzy_nest')) {
              ARTEFACT.button("Buzzy Nest", "textures/items/artifact/buzzy_nest")
            } else {
              ARTEFACT.button("Buzzy Nest", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_golem_kit')) {
              ARTEFACT.button("Golem Kit", "textures/items/artifact/golem_kit")
            } else {
              ARTEFACT.button("Golem Kit", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_soul_lantern')) {
              ARTEFACT.button("Soulfire Lantern", "textures/items/artifact/soul_lantern")
            } else {
              ARTEFACT.button("Soulfire Lantern", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_vexing_chant')) {
              ARTEFACT.button("Vexing Chant", "textures/items/artifact/vexing_chant")
            } else {
              ARTEFACT.button("Vexing Chant", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_tome_of_duplication')) {
              ARTEFACT.button("Tome of Duplication", "textures/items/artifact/tome_of_duplication")
            } else {
              ARTEFACT.button("Tome of Duplication", "textures/ui/form/locked_artefact")
            }
            if (player.hasTag('dungeons:collected_corrupted_pumpkin')) {
              ARTEFACT.button("Corrupted Pumpkin ", "textures/items/artifact/corrupted_pumpkin")
            }

            ARTEFACT.show(player).then(r => {
              player.playSound('item.book.page_turn');
              if (r.canceled) return;
              switch (r.selection) {
                case 0:
                  if (!player.hasTag('dungeons:collected_harvester')) break;
                  let HARVESTER = new ActionFormData();
                  HARVESTER.title("Harvester");
                  HARVESTER.body("The Harvester siphons the souls of the dead, before releasing them into a cluster hex of power.\n\n Creates a huge magical explosion\n Consumes 15 \n Cooldown : 4s\n\n Damage : \n Rare Damage : ");
                  HARVESTER.button("Close")
                  HARVESTER.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 1:
                  if (!player.hasTag('dungeons:collected_satchel_of_elements')) break;
                  let SATCHELELEMENTS = new ActionFormData();
                  SATCHELELEMENTS.title("Satchel of Elements");
                  SATCHELELEMENTS.body("Mysteries surround this primordial satchel. Will it unleash fire, ice, or something a lot less nice?\n\n Will either slow down, catch fire to, or strike lightning damage onto 7 nearby foes\n\n Cooldown : 12s\n Rare Cooldown : 9s");
                  SATCHELELEMENTS.button("Close")
                  SATCHELELEMENTS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 2:
                  if (!player.hasTag('dungeons:collected_ice_wand')) break;
                  let ICEWAND = new ActionFormData();
                  ICEWAND.title("Ice Wand");
                  ICEWAND.body("The Ice Wand was trapped in a tomb of ice for ages, sealed away by those who feared its power.\n\n Creates large ice blocks that can crush your foe.\n Damage : \n Stun Duration : 1s\n\n Cooldown : 15s\n Rare Cooldown : 10s");
                  ICEWAND.button("Close")
                  ICEWAND.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 3:
                  if (!player.hasTag('dungeons:collected_lightning_rod')) break;
                  let LIGHTNINGROD = new ActionFormData();
                  LIGHTNINGROD.title("Lightning Wand");
                  LIGHTNINGROD.body("Crafted by Illager Geomancers, this item is enchanted with the power of a storming sky.\n\n Strikes arcane lightning around a nearby foe\n Consumes 8 \n Cooldown : 5s\n\n Damage : \n Rare Damage : ");
                  LIGHTNINGROD.button("Close")
                  LIGHTNINGROD.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 4:
                  if (!player.hasTag('dungeons:collected_scatter_mines')) break;
                  let SCATTERMINES = new ActionFormData();
                  SCATTERMINES.title("Scatter Mines");
                  SCATTERMINES.body("Set your enemies up for a surprise of a lifetime with the explosive power of Scatter Mines.\n\n Places 3 explosive mines that deal huge damage when stepped on\n Damage : \n Cooldown : 40s\n Rare Cooldown : 32s");
                  SCATTERMINES.button("Close")
                  SCATTERMINES.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 5:
                  if (!player.hasTag('dungeons:collected_blast_fungus')) break;
                  let BLASTFUNGUS = new ActionFormData();
                  BLASTFUNGUS.title("Blast Fungus");
                  BLASTFUNGUS.body("Only the bravest of warriors carry the Blast Fungus. Not just because of its toxic spores, but because it smells awful.\n\n Launches 3 rolling fungi that explode shortly after tossing them\n Damage : \n Cooldown : 18s\n Rare Cooldown : 14s");
                  BLASTFUNGUS.button("Close")
                  BLASTFUNGUS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 6:
                  if (!player.hasTag('dungeons:collected_eye_of_the_guardian')) break;
                  let GUARDIANEYE = new ActionFormData();
                  GUARDIANEYE.title("Eye of the Guardian");
                  GUARDIANEYE.body("The Eye of the Guardian holds a power that awakens in the hands of a worthy hero.\n\n Fires a continuous laser beam\n Cooldown : 15s\n Duration : 3.5s\n Rare Duration : 6s");
                  GUARDIANEYE.button("Close")
                  GUARDIANEYE.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 7:
                  if (!player.hasTag('dungeons:collected_corrupted_beacon')) break;
                  let CORRUPTEDBEACON = new ActionFormData();
                  CORRUPTEDBEACON.title("Corrupted Beacon");
                  CORRUPTEDBEACON.body("The Corrupted Beacon holds immense power within. It waits for the moment to unleash its wrath.\n\n Fires a continuous laser beam for as long as you have souls, cancels if unequipped.\n Consumes  over time\n Cooldown : 1s\n Soul Consumption Rate : 5/s\n Rare Consumption Rate : 3.3/s");
                  CORRUPTEDBEACON.button("Close")
                  CORRUPTEDBEACON.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 8:
                  if (!player.hasTag('dungeons:collected_updraft_tome')) break;
                  let UPDRAFTTOME = new ActionFormData();
                  UPDRAFTTOME.title("Updraft Tome");
                  UPDRAFTTOME.body("An ancient book filled with illegible glyphs, you feel a strange breeze as you flip the pages.\n\n Damages up to 7 nearby foes, launching them into the air\n Damage : \n Cooldown : 15s\n Rare Cooldown : 10s");
                  UPDRAFTTOME.button("Close")
                  UPDRAFTTOME.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 9:
                  if (!player.hasTag('dungeons:collected_spinblade')) break;
                  let SPINBLADE = new ActionFormData();
                  SPINBLADE.title("Spinblade");
                  SPINBLADE.body("This whirling weapon spins across the battlefield, slicing through enemies in its path.\n\n Launches a spinning projectile that flys back and forth\n Damage : \n Cooldown : 8s\n Rare Cooldown : 7s");
                  SPINBLADE.button("Close")
                  SPINBLADE.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 10:
                  if (!player.hasTag('dungeons:collected_soul_healer')) break;
                  let SOULHEALER = new ActionFormData();
                  SOULHEALER.title("Soul Healer");
                  SOULHEALER.body("The Soul Healer amulet is cold to the touch and trembles with the power of souls.\n\n Restores health\n Consumes 10 \n Cooldown : 6s\n\n Health Restored : \n Rare Health Restored : ");
                  SOULHEALER.button("Close")
                  SOULHEALER.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 11:
                  if (!player.hasTag('dungeons:collected_totem_of_regeneration')) break;
                  let TOTEMREGEN = new ActionFormData();
                  TOTEMREGEN.title("Totem of Regeneration");
                  TOTEMREGEN.body("This hand-crafted wooden figurine radiates a warmth like that of a crackling campfire, healing those who gather around it.\n\n Places a totem that restores health to those nearby\n Duration : 8s\n\n Cooldown : 30s\n Rare Cooldown : 22s");
                  TOTEMREGEN.button("Close")
                  TOTEMREGEN.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 12:
                  if (!player.hasTag('dungeons:collected_iron_hide_amulet')) break;
                  let IRONHIDE = new ActionFormData();
                  IRONHIDE.title("Iron Hide Amulet");
                  IRONHIDE.body("The Iron Hide Amulet is both ancient and timeless. Sand mysteriously and endlessly slips through the cracks in the iron.\n\n Reduces damage taken by 60%% for a short period\n Cooldown : 25s\n\n Duration : 6s\n Rare Duration : 8s");
                  IRONHIDE.button("Close")
                  IRONHIDE.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 13:
                  if (!player.hasTag('dungeons:collected_death_cap_mushroom')) break;
                  let DEATHCAP = new ActionFormData();
                  DEATHCAP.title("Death Cap Mushroom");
                  DEATHCAP.body("Eaten by daring warriors before battle, the Death Cap Mushroom drives fighters into a frenzy.\n\n Boosts movement speed and attack power\n Cooldown : 40s\n\n Duration : 9s\n Rare Duration : 12s");
                  DEATHCAP.button("Close")
                  DEATHCAP.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 14:
                  if (!player.hasTag('dungeons:collected_boots_of_swiftness')) break;
                  let BOOTSSWIFTNESS = new ActionFormData();
                  BOOTSSWIFTNESS.title("Boots of Swiftness");
                  BOOTSSWIFTNESS.body("Boots blessed with enchantments to allow for swift movements. Useful in uncertain times such as these.\n\n Boosts movement speed\n Cooldown : 5s\n\n Duration : 3.25s\n Rare Duration : 4.5s");
                  BOOTSSWIFTNESS.button("Close")
                  BOOTSSWIFTNESS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 15:
                  if (!player.hasTag('dungeons:collected_ghost_cloak')) break;
                  let GHOSTCLOAK = new ActionFormData();
                  GHOSTCLOAK.title("Ghost Cloak");
                  GHOSTCLOAK.body("The souls trapped within the Ghost Cloak are protective, but they radiate a sense of melancholy.\n\n Boosts movement speed, resistance and grants invisibility\n Cooldown : 7s\n Duration : 2s\n\n Speed Boost : 1.2x\n Rare Speed Boost : 1.4x");
                  GHOSTCLOAK.button("Close")
                  GHOSTCLOAK.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 16:
                  if (!player.hasTag('dungeons:collected_light_feather')) break;
                  let LIGHTFEATHER = new ActionFormData();
                  LIGHTFEATHER.title("Light Feather");
                  LIGHTFEATHER.body("No one knows what mysterious creature this feather came from, but it is as beautiful and powerful.\n\n Launches you forward and slows down nearby mobs\n Slowness duration : 1.25s\n\n Cooldown : 5s\n Rare Cooldown : 4s");
                  LIGHTFEATHER.button("Close")
                  LIGHTFEATHER.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 17:
                  if (!player.hasTag('dungeons:collected_totem_of_shielding')) break;
                  let TOTEMSHEILD = new ActionFormData();
                  TOTEMSHEILD.title("Totem of Shielding");
                  TOTEMSHEILD.body("This totem radiates powerful energy that bursts forth as a protective shield around those near it.\n\n Places a totem that reduces damage taken by 80%% for those nearby\n Duration : 7s\n\n Cooldown : 33s\n Rare Cooldown : 25s");
                  TOTEMSHEILD.button("Close")
                  TOTEMSHEILD.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 18:
                  if (!player.hasTag('dungeons:collected_totem_of_casting')) break;
                  let TOTEMCAST = new ActionFormData();
                  TOTEMCAST.title("Totem of Casting");
                  TOTEMCAST.body("All who are near this totem feel an invigorating aura around their artefacts.\n\n Places a totem that reduces artefact cooldown lengths by 70%% for those nearby\n Consumes 15 \n Duration : 7.5s\n\n Cooldown : 15s\n Rare Cooldown : 12s");
                  TOTEMCAST.button("Close")
                  TOTEMCAST.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 19:
                  if (!player.hasTag('dungeons:collected_satchel_of_snacks')) break;
                  let SATCHELSNACKS = new ActionFormData();
                  SATCHELSNACKS.title("Satchel of Snacks");
                  SATCHELSNACKS.body("The Satchel of Snacks provides a treat when you need it the most!\n\n Restores health and hunger on use\n Cooldown : 25s\n\n Health Restored :  - \n Rare Health Restored :  - ");
                  SATCHELSNACKS.button("Close")
                  SATCHELSNACKS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 20:
                  if (!player.hasTag('dungeons:collected_satchel_of_elixirs')) break;
                  let SATCHELELIXIRS = new ActionFormData();
                  SATCHELELIXIRS.title("Satchel of Elixirs");
                  SATCHELELIXIRS.body("The Satchel of Elixirs always contains the exact potions you need! (Well, atleast, the exact potions it thinks you need, which is still pretty helpful.)\n\n Grants a random potion effect on use\n Speed Duration : 25s\n Strength Duration : 20s\n Shadow Form Duration : 10s\n\n Cooldown : 30s\n Rare Cooldown : 22s");
                  SATCHELELIXIRS.button("Close")
                  SATCHELELIXIRS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 21:
                  if (!player.hasTag('dungeons:collected_powershaker')) break;
                  let POWERSHAKER = new ActionFormData();
                  POWERSHAKER.title("Powershaker");
                  POWERSHAKER.body("The Powershaker is a smashing good time, though it may not be as fun for your enemies.\n\n Grants a powerful area damage to up to 5 attacks\n Area Damage : 66%% of melee\n Cooldown : 30s\n\n Duration : 10s\n Rare Duration : 15s");
                  POWERSHAKER.button("Close")
                  POWERSHAKER.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 22:
                  if (!player.hasTag('dungeons:collected_shadow_shifter')) break;
                  let SHADOWSHIFTER = new ActionFormData();
                  SHADOWSHIFTER.title("Shadow Shifter");
                  SHADOWSHIFTER.body("The Shadow Shifter grants you Shadow Form, which allows you to stay out of sight.\n\n Grants shadow form, making you invisible and extremely powerful until your next strike\n Consumes 8 \n Cooldown : 15s\n\n Duration : 14s\n Rare Duration : 19s");
                  SHADOWSHIFTER.button("Close")
                  SHADOWSHIFTER.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 23:
                  if (!player.hasTag('dungeons:collected_shock_powder')) break;
                  let SHOCKPOWDER = new ActionFormData();
                  SHOCKPOWDER.title("Shock Powder");
                  SHOCKPOWDER.body("Shock Powder is a reliable tool for those who wish to make a swift exit.\n\n Prevents nearby foes from moving on the ground\n Cooldown : 15s\n\n Duration : 4s\n Rare Duration : 6s");
                  SHOCKPOWDER.button("Close")
                  SHOCKPOWDER.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 24:
                  if (!player.hasTag('dungeons:collected_gong_of_weakening')) break;
                  let GONGWEAKENING = new ActionFormData();
                  GONGWEAKENING.title("Gong of Weakening");
                  GONGWEAKENING.body("This ancient gong, marked with the symbols of a nameless kingdom, feels safe in your hands but emits a menacing hum to those nearby.\n\n Reduces enemy attack strength\n Cooldown : 25s\n\n Duration : 7s\n Rare Duration : 10s");
                  GONGWEAKENING.button("Close")
                  GONGWEAKENING.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 25:
                  if (!player.hasTag('dungeons:collected_wind_horn')) break;
                  let WINDHORN = new ActionFormData();
                  WINDHORN.title("Wind Horn");
                  WINDHORN.body("When the Wind Horn echoes throughout the forests of the Overworld the creatures of the night tremble with fear.\n\n Launches those nearby away from you and inflicts slowness\n Cooldown : 10s\n\n Launch Strength : 1.6\n Rare Launch Strength : 2");
                  WINDHORN.button("Close")
                  WINDHORN.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 26:
                  if (!player.hasTag('dungeons:collected_corrupted_seeds')) break;
                  let CORRUPTEDSEEDS = new ActionFormData();
                  CORRUPTEDSEEDS.title("Corrupted Seeds");
                  CORRUPTEDSEEDS.body("A pouch of poisonous, corrupted seeds which grow into spiky grapple vines, entangling and slowly draining the life from its victims.\n\n Stuns and poisons nearby foes\n Stuns for : 2s\n Poisons for : 4s\n\n Cooldown : 15s\n Rare Cooldown : 12s");
                  CORRUPTEDSEEDS.button("Close")
                  CORRUPTEDSEEDS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 27:
                  if (!player.hasTag('dungeons:collected_enchanters_tome')) break;
                  let ENCHANTERSTOME = new ActionFormData();
                  ENCHANTERSTOME.title("Enchanters Tome");
                  ENCHANTERSTOME.body("Meant only to be wielded by Enchanters, the magic of this artifact can summon powerful enchantments.\n\n Enchants nearby mobs you have summoned\n Health & Attack Modifier : 2x\n Speed Modifier : 1.2x\n\n Cooldown : 25s\n Rare Cooldown : 10s");
                  ENCHANTERSTOME.button("Close")
                  ENCHANTERSTOME.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 28:
                  if (!player.hasTag('dungeons:collected_enchanted_grass')) break;
                  let ENCHANTEDGRASS = new ActionFormData();
                  ENCHANTEDGRASS.title("Enchanted Grass");
                  ENCHANTEDGRASS.body("Just as there are powerful heroes who answer the call to fight, there are powerful enchanted sheep who will join the fight when summoned.\n\n Summons a tamed sheep to burn, poison or slow enemies\n Summon Duration : 32s\n Cooldown : 60s\n\n Rare Cooldown : 45s");
                  ENCHANTEDGRASS.button("Close")
                  ENCHANTEDGRASS.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 29:
                  if (!player.hasTag('dungeons:collected_buzzy_nest')) break;
                  let BUZZYNEST = new ActionFormData();
                  BUZZYNEST.title("Buzzy Nest");
                  BUZZYNEST.body("Bee lovers and the bee-loved alike are fans of the Buzzy Nest, but don't be fooled by the cute bees within - they pack a powerful sting!\n\n Places a nest that slowly spawns in tamed bees to the fight\n Summon Duration : 30s\n Cooldown : 50s\n\n Rare Cooldown : 35s");
                  BUZZYNEST.button("Close")
                  BUZZYNEST.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 30:
                  if (!player.hasTag('dungeons:collected_golem_kit')) break;
                  let GOLEMKIT = new ActionFormData();
                  GOLEMKIT.title("Golem Kit");
                  GOLEMKIT.body("Iron Golems have always protected the Villagers of the Overworld. Their numbers are dwindling as a result of the Illager's war.\n\n Summons an iron golem that fights for you\n Summon Duration : 50s\n\n Cooldown : 120s\n Rare Cooldown : 100s");
                  GOLEMKIT.button("Close")
                  GOLEMKIT.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 31:
                  if (!player.hasTag('dungeons:collected_soul_lantern')) break;
                  let SOULLANTERN = new ActionFormData();
                  SOULLANTERN.title("Soulfire Lantern");
                  SOULLANTERN.body("This lantern, still covered in the sands of a far-flung place, allows those who hold it to summon a creature formed from bound souls.\n\n Summons a soul wizard who will attack enemies.\n Consumes 13 \n Summon Duration : 40s\n\n Cooldown : 50s\n Rare Cooldown : 40s");
                  SOULLANTERN.button("Close")
                  SOULLANTERN.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                case 32:
                  if (!player.hasTag('dungeons:collected_vexing_chant')) break;
                  let VEXINGCHANT = new ActionFormData();
                  VEXINGCHANT.title("Vexing Chant");
                  VEXINGCHANT.body("Summon Guardian Vexes who will fight by your side for a short while.\n\n Summons 3 friendly vexes to fight enemies\n Summon Duration : 32s\n\n Cooldown : 90s\n Rare Cooldown : 60s");
                  VEXINGCHANT.button("Close")
                  VEXINGCHANT.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;

                case 33:
                  if (!player.hasTag('dungeons:collected_tome_of_duplication')) break;
                  let DUPETOME = new ActionFormData();
                  DUPETOME.title("Tome of Duplication");
                  DUPETOME.body("A magical tome which when read is capable of replicating the effects of other items!\n\n Copies the effect of your previously used artefact\n Cooldown : 20s\n\n Copies effect of common artefact\n Copies effect of rare artefact");
                  DUPETOME.button("Close")
                  DUPETOME.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;


                case 34:
                  if (!player.hasTag('dungeons:collected_corrupted_pumpkin')) break;
                  let PUMPKIN = new ActionFormData();
                  PUMPKIN.title("Corrupted Pumpkin");
                  PUMPKIN.body("The Corrupted Pumpkin glows with supernatural power, illuminating even the darkest nights with its powerful beacon.\n\n Special event item\n\n Fires a continuous laser beam for as long as you have souls, cancels if unequipped.\n Consumes  over time\n Cooldown : 1s\n Soul Consumption Rate : 3.3/s");
                  PUMPKIN.button("Close")
                  PUMPKIN.show(player).then(r => {
                    player.playSound('item.book.page_turn');
                    if (r.canceled) return;
                  }).catch(e => {
                    console.error(e, e.stack);
                  });
                  break;
                default:
                  break;
              }
            }).catch(e => {
              console.error(e, e.stack);
            });
          default:
            break;
        }
      }).catch((e) => {
        console.error(e, e.stack);
      });
    }
  });
});