particle dungeons:soul_wizard ~1~0.1~
particle dungeons:soul_wizard ~-1~0.1~
particle dungeons:soul_wizard ~~0.1~1
particle dungeons:soul_wizard ~~0.1~-1
playsound mob.allay.ambient @a ~~~ 0.7 0.2
scoreboard players remove @s[scores={soulGauge=13..}] soulGauge 13
titleraw @s actionbar {"rawtext":[{"text":"§b"},{"score":{"name":"@s","objective":"soulGauge"}},{"text":"§s Souls "}]}