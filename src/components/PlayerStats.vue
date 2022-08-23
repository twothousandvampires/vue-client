<script>
export default {
  props : {
    stats : Object
  },
}
</script>
<template>
  <div id="stats">
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_character_top.gif" alt="">
      <div id="char_stats">
        <p style="font-size: 24px">Character</p>
        <p style="font-size: 24px">{{stats.get('name')}}</p>
        <p>Increased life : {{stats.get('increased_life')}}</p>
        <p>Life : {{stats.get('life')}} / {{stats.get('max_life')}}</p>r
        <p>Stamina : {{stats.get('stamina')}} / {{stats.get('max_stamina')}}</p>
        <p>Stamina regen : {{stats.get('stamina_regeneration')}}</p>
        <p>Energy : {{stats.get('energy')}} / {{stats.get('max_energy')}}</p>
        <p>Speed : {{stats.get('movement_speed')}}</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/attack_stats_top.gif" alt="">
      <div id="attack_stats">
        <p style="font-size: 24px">Attack</p>
        <p>Attack damage : {{stats.get('min_attack_damage')}} - {{stats.get('max_attack_damage')}}</p>
        <p>Critical chance : {{stats.get('attack_critical_chance')}}%</p>
        <p>Critical multiplier - {{stats.get('attack_critical_multy')}}%</p>
        <p>Attack speed : {{stats.get('attack_speed')}} ms</p>
        <p>Increased attack speed : {{stats.get('increased_attack_speed')}}%</p>
        <p>Attack range : {{stats.get('attack_range')}}px</p>
        <p>Life Leech : {{stats.get('attack_life_leech')}}%</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_spell_top.gif" alt="">
      <div id="spell_stats">
        <p style="font-size: 24px">Magick</p>
        <p>Add spell damage : {{stats.get('add_min_spell_damage')}} - {{stats.get('add_max_spell_damage')}}</p>
        <p>Increased spell damage : {{stats.get('increased_spell_damage')}}%</p>
        <p>Spell Leech : {{stats.get('spell_life_leech')}}%</p>
        <p>Increased spell AOE : {{stats.get('increased_spell_aoe')}}px</p>
        <p>Spell critical chance - {{stats.get('spell_crit_chance')}}%</p>
        <p>Spell critical multiplier - {{stats.get('spell_crit_multy')}}%</p>
        <p>Cast speed - {{stats.get('cast_speed')}} ms</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_defend_top.gif" alt="">
      <div id="defend_stats">
        <p style="font-size: 24px">Defend</p>
        <p>Increased armour : {{stats.get('increased_armour')}}%</p>
        <p>Armour : {{stats.get('armour')}}</p>
        <p>Increased evade - {{stats.get('increased_evade')}}%</p>
        <p>Evade : {{stats.get('evade')}}</p>
        <p>Increased resist : {{stats.get('increased_resist')}}%</p>
        <p>Resist : {{stats.get('resist')}}</p>
        <p>Will : {{stats.get('will')}}</p>
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