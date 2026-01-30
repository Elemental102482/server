execute as @s at @s run hud @a[tag=dungeons:cutscene,r=128] reset
execute as @s at @s run inputpermission set @a[tag=dungeons:cutscene,r=128] movement enabled
execute as @s at @s run inputpermission set @a[tag=dungeons:cutscene,r=128] camera enabled
execute as @s at @s run camera @a[tag=dungeons:cutscene,r=128] clear
execute as @s at @s run tag @a[tag=dungeons:cutscene,r=128] remove dungeons:cutscene