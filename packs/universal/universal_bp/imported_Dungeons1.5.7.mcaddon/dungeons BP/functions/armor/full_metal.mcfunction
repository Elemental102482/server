tag @a[tag=!dungeons:full_metal_armour,hasitem=[{item=dungeons:full_metal_helmet,location=slot.armor.head},{item=dungeons:full_metal_chestplate,location=slot.armor.chest},{item=dungeons:full_metal_leggings,location=slot.armor.legs},{item=dungeons:full_metal_boots,location=slot.armor.feet}]] add dungeons:full_metal_armour
tag @a[tag=dungeons:full_metal_armour,hasitem={quantity=0,item=dungeons:full_metal_helmet,location=slot.armor.head}] remove dungeons:full_metal_armour
tag @a[tag=dungeons:full_metal_armour,hasitem={quantity=0,item=dungeons:full_metal_chestplate,location=slot.armor.chest}] remove dungeons:full_metal_armour
tag @a[tag=dungeons:full_metal_armour,hasitem={quantity=0,item=dungeons:full_metal_leggings,location=slot.armor.legs}] remove dungeons:full_metal_armour
tag @a[tag=dungeons:full_metal_armour,hasitem={quantity=0,item=dungeons:full_metal_boots,location=slot.armor.feet}] remove dungeons:full_metal_armour
effect @a[tag=dungeons:full_metal_armour] slowness 1 0 true
effect @a[tag=dungeons:full_metal_armour] strength 1 0 true