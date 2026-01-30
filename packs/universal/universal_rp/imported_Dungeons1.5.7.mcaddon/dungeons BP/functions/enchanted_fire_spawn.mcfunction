execute as @s at @s align xyz run tp ~0.5~~0.5
particle dungeons:enchanted_fire ~~~
particle dungeons:enchanted_fire_smoke ~~~
event entity @e[r=0.3,type=dungeons:enchanted_fire,tag=removable] dungeons:despawn
tag @s add removable