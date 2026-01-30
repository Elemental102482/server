tag @a[tag=!dungeons:cauldron_armour,hasitem=[{item=dungeons:cauldron_helmet,location=slot.armor.head},{item=dungeons:cauldron_chestplate,location=slot.armor.chest},{item=dungeons:cauldron_leggings,location=slot.armor.legs},{item=dungeons:cauldron_boots,location=slot.armor.feet}]] add dungeons:cauldron_armour
tag @a[tag=dungeons:cauldron_armour,hasitem={quantity=0,item=dungeons:cauldron_helmet,location=slot.armor.head}] remove dungeons:cauldron_armour
tag @a[tag=dungeons:cauldron_armour,hasitem={quantity=0,item=dungeons:cauldron_chestplate,location=slot.armor.chest}] remove dungeons:cauldron_armour
tag @a[tag=dungeons:cauldron_armour,hasitem={quantity=0,item=dungeons:cauldron_leggings,location=slot.armor.legs}] remove dungeons:cauldron_armour
tag @a[tag=dungeons:cauldron_armour,hasitem={quantity=0,item=dungeons:cauldron_boots,location=slot.armor.feet}] remove dungeons:cauldron_armour
effect @a[tag=dungeons:cauldron_armour] slowness 1 0 true
effect @a[tag=dungeons:cauldron_armour] strength 1 0 true