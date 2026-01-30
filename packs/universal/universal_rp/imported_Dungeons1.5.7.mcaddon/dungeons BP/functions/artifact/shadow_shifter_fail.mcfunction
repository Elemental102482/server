execute as @s[scores={soulGauge=..7}] at @s run playsound mob.evocation_illager.cast_spell @a ~~~ 0.5 0.6
tellraw @s[scores={soulGauge=..7}] {"rawtext":[{"text":"§7§oCollect more Souls to use this Artefact"}]}
titleraw @s actionbar {"rawtext":[{"text":"§b"},{"score":{"name":"@s","objective":"soulGauge"}},{"text":"§s Souls "}]}