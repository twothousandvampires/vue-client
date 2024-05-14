<script>
export default {
  props : {
    player : Object
  },
}
</script>
<template>
  <div id="stats">
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_character_top.gif" alt="">
      <div id="char_stats">
        <p style="font-size: 24px">Character</p>
        <p style="font-size: 24px">{{player.name}}</p>
        <p>exp : {{player.exp}}</p>
        <p>Life : {{player.life}} / {{player.max_life}}</p>
        <p>Mana : {{player.mana}} / {{player.max_mana}}</p>
        <p>Energy regen : {{player.getEnergyRegeneration()}}</p>
        <p>Energy : {{player.energy}} / {{player.energy}}</p>
        <p>Movement speed : {{player.getMovementSpeed()}}</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/attack_stats_top.gif" alt="">
      <div id="attack_stats">
        <p style="font-size: 24px">Attack</p>
        <p>Attack damage : {{player.getMinAttackDamageForStats()}} - {{player.getMaxAttackDamageForStats()}}</p>
        <p>Critical chance : {{player.getAttackCriticalChance()}}%</p>
        <p>Critical multiplier - {{player.getAttackCriticalMulti()}}%</p>
        <p>Attack speed : {{player.getAttackSpeed()}} ms</p>
        <p>Attack range : {{player.getAttackRange()}}px</p>
        <p>Life Leech : {{player.attack_life_leech}}%</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_spell_top.gif" alt="">
      <div id="spell_stats">
        <p style="font-size: 24px">Magick</p>
        <p>Add spell damage : {{player.getMinSpellDamage()}} - {{player.getMaxSpellDamage()}}</p>
        <p>Spell Leech : {{player.spell_leech}}%</p>
        <p>spell AOE : {{player.spell_aoe}}px</p>
        <p>Spell critical chance : {{player.getSpellCriticalChance().toFixed(2)}}%</p>
        <p>Spell critical multiplier - {{player.getSpellCriticalMulti()}}%</p>
        <p>Cast speed - {{player.getCastSpeed()}} ms</p>
        <p>mana cost - {{player.mana_cost}}%</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_defend_top.gif" alt="">
      <div id="defend_stats">
        <p style="font-size: 24px">Defend</p>
        <p>Armour : {{player.getArmour()}}</p>
        <p>Evade : {{player.evade}}</p>
        <p>Resist : {{player.getResist()}}%</p>
        <p>Will : {{player.will}}</p>
        <p>Attack block chance : {{player.attack_block}}%</p>
        <p>Spell block chance : {{player.spell_block}}%</p>
      </div>
    </div>
    <div>
<!--      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_defend_top.gif" alt="">-->
      <div id="other_stats">
        <p style="font-size: 24px">Other</p>
        <p>Cannot be frozen : {{player.cannot_be_frozen ? 'Yes' : 'No'}}</p>
        <p>Increased speed : {{player.getIncreasedSpeed()}}%</p>
        <p>Increased damage : {{player.getIncreaseDamage()}}%</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #stats{
    overflow-y:auto;
    background-color: #e1e1e1;
    width: 30%;
  }
  #char_stats, #attack_stats, #spell_stats, #defend_stats{
    padding: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  p{
    font-size: 16px;
    font-weight: bold;
    color:#4b4b4b;
  }
</style>