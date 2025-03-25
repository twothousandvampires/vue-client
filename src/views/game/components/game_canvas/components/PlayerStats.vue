<script>
export default {
  props : {
    player : Object
  },
  data(){
    return {
      char_info_expanded: false
    }
  }
}
</script>
<template>
  <div id="stats">
    <div>
      <img @click="char_info_expanded = !char_info_expanded" title="click to expand" style="width: 100%; cursor: pointer;" src="/src/assets/img/stats_character_top.gif" alt="">
      <div id="char_stats">
        <p style="font-size: 24px">Character {{player.name}}</p>
        
        <p>sorcery mastery points: {{player.sorcery_mastery}}</p>
        <p>movement mastery points: {{player.movement_mastery}}</p>
        <p>Combat mastery points: {{player.combat_mastery}}</p>

        <!-- <p>power : {{player.power}}</p> -->
        <p>exp : {{player.exp}}</p>
    
        <p class="upgradable_stat" title="upgrade cost: 25 combat mastery" @click="player.upgradeStat('max_life')">Life : {{player.life}} / {{player.max_life}}</p>
        <p class="upgradable_stat" title="upgrade cost: 15 sorcery mastery" @click="player.upgradeStat('max_mana')">Mana : {{player.mana}} / {{player.max_mana}}</p>
        <p v-if="char_info_expanded" class="upgradable_stat" title="upgrade cost: 12 movemet mastery" @click="player.upgradeStat('energy_regeneration')">Energy regen : {{player.energy_regeneration}}</p>
        <p v-if="char_info_expanded" class="upgradable_stat" title="upgrade cost: 18 combat mastery" @click="player.upgradeStat('energy')">Energy : {{player.energy}} / {{player.energy}}</p>
        <p v-if="char_info_expanded" class="upgradable_stat" title="upgrade cost: 25 movement mastery" @click="player.upgradeStat('speed')">Speed : {{player.speed}}</p>
        <p v-if="char_info_expanded">enemies killed : {{player.enemies_killed}}</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/attack_stats_top.gif" alt="">
      <div id="attack_stats">
        <p style="font-size: 24px">Attack</p>
        <p class="upgradable_stat" title="upgrade cost: 10 movement mastery" @click="player.upgradeStat('accuracy')">Hit rating : {{player.accuracy}}</p>
        <p class="upgradable_stat" title="upgrade cost: 15 combat mastery" @click="player.upgradeStat('physical_damage')">Physical damage : {{player.getTotalPhysDamage()}}</p>
        <p class="upgradable_stat" title="upgrade cost: 25 movement mastery" @click="player.upgradeStat('attack_crit_chance')">Critical chance : {{player.attack_crit_chance}}%</p>
        <p class="upgradable_stat" title="upgrade cost: 40 combat mastery" @click="player.upgradeStat('life_leech')">Life Leech : {{player.life_leech}}%</p>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/stats_spell_top.gif" alt="">
      <div id="spell_stats">
        <p style="font-size: 24px">Magick</p>
        <p class="upgradable_stat" title="upgrade cost: 12 sorcery mastery" @click="player.upgradeStat('magic_damage')">Magic damage : {{player.getTotalMagicDamage()}}</p>
        <p class="upgradable_stat" title="upgrade cost: 20 movement mastery" @click="player.upgradeStat('spell_crit_chance')">Critical chance : {{player.spell_crit_chance}}%</p>
        <!-- <p>Mana burn : {{player.mana_burn}}%</p> -->
      </div>
    </div>
    <div>
      <img style="width: 100%" src="/src/assets/img/stats_defend_top.gif" alt="">
      <div id="defend_stats">
        <p style="font-size: 24px">Defend</p>
        <p class="upgradable_stat" title="upgrade cost: 12 combat mastery" @click="player.upgradeStat('armour')">Armour : {{player.armour}}</p>
        <p class="upgradable_stat" title="upgrade cost: 12 movement mastery" @click="player.upgradeStat('evade')">Evade : {{player.evade}}</p>
        <p class="upgradable_stat" title="upgrade cost: 20 sorcery mastery" @click="player.upgradeStat('resist')">Resist : {{player.resist}}%</p>
        <p class="upgradable_stat" title="upgrade cost: 20 combat mastery" @click="player.upgradeStat('will')">Will : {{player.will}}</p>
        <p class="upgradable_stat" title="upgrade cost: 30 combat mastery" @click="player.upgradeStat('attack_block')">Attack block chance : {{player.attack_block}}%</p>
        <p class="upgradable_stat" title="upgrade cost: 30 sorcery mastery" @click="player.upgradeStat('spell_block')">Spell block chance : {{player.spell_block}}%</p>
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
  .upgradable_stat{
    cursor: pointer;
  }
  .upgradable_stat:hover{
    color: blueviolet;
  }
  p{
    font-size: 16px;
    font-weight: bold;
    color:#b28b78;
  }
</style>