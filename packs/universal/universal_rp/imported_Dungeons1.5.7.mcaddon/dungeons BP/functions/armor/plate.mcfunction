tag @a[tag=!dungeons:plate_armour,hasitem=[{item=dungeons:plate_helmet,location=slot.armor.head},{item=dungeons:plate_chestplate,location=slot.armor.chest},{item=dungeons:plate_leggings,location=slot.armor.legs},{item=dungeons:plate_boots,location=slot.armor.feet}]] add dungeons:plate_armour
tag @a[tag=dungeons:plate_armour,hasitem={quantity=0,item=dungeons:plate_helmet,location=slot.armor.head}] remove dungeons:plate_armour
tag @a[tag=dungeons:plate_armour,hasitem={quantity=0,item=dungeons:plate_chestplate,location=slot.armor.chest}] remove dungeons:plate_armour
tag @a[tag=dungeons:plate_armour,hasitem={quantity=0,item=dungeons:plate_leggings,location=slot.armor.legs}] remove dungeons:plate_armour
tag @a[tag=dungeons:plate_armour,hasitem={quantity=0,item=dungeons:plate_boots,location=slot.armor.feet}] remove dungeons:plate_armour
effect @a[tag=dungeons:plate_armour] slowness 1 0 true