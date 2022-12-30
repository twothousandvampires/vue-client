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
        <p>Increased life : {{player.getIncrease('increased_life')}}</p>
        <p>Life : {{player.getStat('life')}} / {{player.getStat('max_life')}}</p>
        <p>Energy regen : {{player.getStat('energy_regen')}}</p>
        <p>Energy : {{player.getStat('energy')}} / {{player.getStat('max_energy')}}</p>
        <p>Speed : {{player.getStat('speed')}}</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/attack_stats_top.gif" alt="">
      <div id="attack_stats">
        <p style="font-size: 24px">Attack</p>
        <p>Attack damage : {{player.getStat('min_attack_damage')}} - {{player.getStat('max_attack_damage')}}</p>
        <p>Inc Attack damage : {{player.getIncrease('attack_damage')}}</p>
        <p>Critical chance : {{player.getStat('attack_crit_chance')}}%</p>
        <p>Critical multiplier - {{player.getStat('attack_crit_multy')}}%</p>
        <p>Attack speed : {{player.getStat('attack_speed')}} ms</p>
        <p>Increased attack speed : {{player.getStat('increased_attack_speed')}}%</p>
        <p>Attack range : {{player.getStat('attack_range')}}px</p>
        <p>Life Leech : {{player.getStat('attack_life_leech')}}%</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_spell_top.gif" alt="">
      <div id="spell_stats">
        <p style="font-size: 24px">Magick</p>
        <p>Add spell damage : {{player.getStat('min_spell_damage')}} - {{player.getStat('max_spell_damage')}}</p>
        <p>Increased spell damage : {{player.getIncrease('spell_damage')}}%</p>
        <p>Spell Leech : {{player.getStat('spell_life_leech')}}%</p>
        <p>Increased spell AOE : {{player.getIncrease('spell_aoe')}}px</p>
        <p>Spell critical chance - {{player.getStat('spell_crit_chance')}}%</p>
        <p>Spell critical multiplier - {{player.getStat('spell_crit_multy')}}%</p>
        <p>Cast speed - {{player.getStat('cast_speed')}} ms</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_defend_top.gif" alt="">
      <div id="defend_stats">
        <p style="font-size: 24px">Defend</p>
        <p>Increased armour : {{player.getIncrease('armour')}}%</p>
        <p>Armour : {{player.getStat('armour')}}</p>
        <p>Increased evade - {{player.getIncrease('evade')}}%</p>
        <p>Evade : {{player.getStat('evade')}}</p>
        <p>Increased resist : {{player.getIncrease('will')}}%</p>
        <p>Resist : {{player.getStat('resist')}}%</p>
        <p>Will : {{player.getStat('will')}}</p>
        <p>Attack block chance : {{player.getStat('attack_block')}}</p>
        <p>Spell block chance : {{player.getStat('spell_block')}}</p>
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