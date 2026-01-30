execute as @s at @s run tag @a[r=32] add dungeons:cutscene
execute as @s at @s run effect @a[r=32] resistance 14 4 true
execute as @s at @s run hud @a[r=32] hide
execute as @s at @s run inputpermission set @a[r=32] movement disabled
execute as @s at @s run inputpermission set @a[r=32] camera disabled
execute as @s at @s run camera @a[r=32] set minecraft:free pos ^^1^6 facing @s
execute as @s at @s run camera @a[r=32] set minecraft:free ease 10 linear pos ^^6.5^5
scriptevent dungeons:delay_cutscene_end
particle dungeons:vhoe_cutscene ~~~