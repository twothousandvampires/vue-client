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
      <img style="width: 100%" src="/src/assets/img/stats_character_top.gif" alt="">
      <div id="char_stats">
        <p style="font-size: 24px">Character</p>
        <p style="font-size: 24px">{{player.name}}</p>
        <p>power : {{player.power}}</p>
        <p>exp : {{player.exp}}</p>
        <p>enemies killed : {{player.enemies_killed}}</p>
        <p>Life : {{player.life}} / {{player.max_life}}</p>
        <p>Mana : {{player.mana}} / {{player.max_mana}}</p>
        <p>Energy regen : {{player.energy_regeneration}}</p>
        <p>Energy : {{player.energy}} / {{player.energy}}</p>
        <p>Speed : {{player.speed}}</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/attack_stats_top.gif" alt="">
      <div id="attack_stats">
        <p style="font-size: 24px">Attack</p>
        <p>Physical damage : {{player.getPhysicalDamage()}}</p>
        <p>Critical chance : {{player.attack_crit_chance}}%</p>
        <p>Life Leech : {{player.life_leech}}%</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/stats_spell_top.gif" alt="">
      <div id="spell_stats">
        <p style="font-size: 24px">Magick</p>
        <p>Magic damage : {{player.getMagicDamage()}}</p>
        <p>Critical chance : {{player.spell_crit_chance}}%</p>
        <p>Mana burn : {{player.mana_burn}}%</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/stats_defend_top.gif" alt="">
      <div id="defend_stats">
        <p style="font-size: 24px">Defend</p>
        <p>Armour : {{player.armour}}</p>
        <p>Evade : {{player.evade}}</p>
        <p>Resist : {{player.resist}}%</p>
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
      </div>
    </div>
  </div>
</template>
<style scoped>
  #stats{
    padding: 2px;
    width: 40%;
    height: 100%;
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