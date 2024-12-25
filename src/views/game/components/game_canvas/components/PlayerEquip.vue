<script>
export default {
  name: "Equip",
  props:{
    char: Object
  },
  data(){
    return {
      page : true
    }
  },
  methods:{
    checkColumn(item, inv){
      if([0,3,6].includes(item.slot) && inv.is_weapon_column){
        return true
      }
      else if([1,4,7].includes(item.slot) && inv.is_armour_column){
        return true
      }
      else if([2,5,8].includes(item.slot)  && inv.is_accessory_column){
        return true
      }
      return false
    },
  }
}
</script>
<template>
  <div id="equip">
    <div id="player_equip" v-if="page">
      <div class="equip_cell">
        <div v-if="char.inv.is_combat_row && char.inv.is_sorcery_row && char.inv.is_movement_row && char.inv.is_weapon_column && char.inv.is_armour_column && char.inv.is_armour_column">
          <img width="60" height="60" src="/src/assets/img/overpower.gif" alt="">
        </div>
        <div v-else>
          <img width="60" height="60" src="/src/assets/img/no_overpower.png" alt="">
        </div>
      </div>
      <div class="equip_cell">
        <div v-if="!char.inv.is_weapon_column">
          <img width="60" height="60" src="/src/assets/img/no_weapon_column.png" alt="">
        </div>
        <div v-else>
          <img title="all items in this column have 20% more effect" width="60" height="60" src="/src/assets/img/weapon_column.gif" alt="">
        </div>
      </div>
      <div class="equip_cell">
        <div v-if="!char.inv.is_armour_column">
          <img width="60" height="60" src="/src/assets/img/no_armour_column.png" alt="">
        </div>
        <div v-else>
          <img title="all items in this column have 20% more effect" width="60" height="60" src="/src/assets/img/armour_column.gif" alt="">
        </div>
      </div>
      <div class="equip_cell">
        <div v-if="!char.inv.is_accessory_column">
          <img width="60" height="60" src="/src/assets/img/no_accessory_column.png" alt="">
        </div>
        <div v-else>
          <img title="all items in this column have 20% more effect" width="60" height="60" src="/src/assets/img/accessory_column.gif" alt="">
        </div>
      </div>

        <div class="equip_cell">
          <div v-if="!char.inv.is_combat_row">
            <img width="60" height="60" src="/src/assets/img/no_battle_line.png" alt="">
          </div>
          <div v-else>
            <img title="all items in this row have 20% more effect" width="60" height="60" src="/src/assets/img/battle_line.gif" alt="">
          </div>
        </div>

        <div v-for="item in char.inv.pull.slice(0,3)" class="equip_cell" @click="$emit('clickItem', item)" v-bind:class="{ clicked: item?.clicked}">
          <img @mouseleave="$emit('mouseleave')" @mouseenter="$emit('mouseenter',$event, item)" :src="item.getImagePath()" alt="">
        </div>

        <div class="equip_cell">
          <div v-if="!char.inv.is_sorcery_row">
            <img width="60" height="60" src="/src/assets/img/no_sorcery_line.png" alt="">
          </div>
          <div v-else>
            <img title="all items in this row have 20% more effect" width="60" height="60" src="/src/assets/img/sorcery_line.gif" alt="">
          </div>
        </div>

        <div v-for="item in char.inv.pull.slice(3,6)" class="equip_cell" @click="$emit('clickItem', item)" v-bind:class="{ clicked: item?.clicked}">
          <img @mouseleave="$emit('mouseleave')" @mouseenter="$emit('mouseenter',$event, item)" :src="item.getImagePath()" alt="">
        </div>

        <div class="equip_cell">
          <div v-if="!char.inv.is_movement_row">
            <img width="60" height="60" src="/src/assets/img/no_movement_line.png" alt="">
          </div>
          <div v-else>
            <img title="all items in this row have 20% more effect" width="60" height="60" src="/src/assets/img/movement_line.gif" alt="">
          </div>
        </div>

        <div v-for="item in char.inv.pull.slice(6,9)" class="equip_cell" @click="$emit('clickItem', item)" v-bind:class="{ clicked: item?.clicked}">
          <img @mouseleave="$emit('mouseleave')" @mouseenter="$emit('mouseenter',$event, item)" :src="item.getImagePath()" alt="">
        </div>
      </div>
    </div>
</template>
<style scoped>
  .equip_cell img{
    width: 60px;
    height: 60px;
  }
  #equip{
    background-color: #00994d;
    display: flex;
    flex-direction: column;
  }
  #player_equip{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    grid-template-rows: repeat(4, 1fr);
  }
  .equip_block{
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .equip_cell{
    min-height: 60px;
    min-width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .clicked{

  }
</style>