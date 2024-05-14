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
    <div style="height: 10%; display: flex;align-items: center;justify-content: center">
      <p @click.prevent="page=!page" style="cursor: pointer">
        {{page ? 'gem and belt' : 'equip'}}
      </p>
    </div>
    <div id="player_equip" v-if="page">
      <div class="equip_block" v-bind:class="{ is_row_combat: char.inv.is_combat_row}">
        <p>combat</p>
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 80%">
          <div v-for="item in char.inv.pull.slice(0,3)" class="equip_cell_wrap" :key="item.id" v-bind:class="{is_column: this.checkColumn(item, char.inv)}">
            <div class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
              <img :src="item.getImagePath()" alt="">
            </div>
          </div>
        </div>
      </div >
      <div class="equip_block" v-bind:class="{ is_row_combat: char.inv.is_sorcery_row}">
        <p>wizardry</p>
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 80%">
          <div v-for="item in char.inv.pull.slice(3,6)" class="equip_cell_wrap" v-bind:class="{is_column: this.checkColumn(item, char.inv)}">
            <div  class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
              <img :src="item.getImagePath()" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="equip_block" v-bind:class="{ is_row_combat: char.inv.is_movement_row}">
        <p>movement</p>
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 80%">
          <div v-for="item in char.inv.pull.slice(6,9)" class="equip_cell_wrap" v-bind:class="{is_column: this.checkColumn(item, char.inv)}">
            <div  class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
              <img :src="item.getImagePath()" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="player_bag_and_belt" v-else>
      <div id="bag">
        <div v-for="item in char.inv.pull.slice(29,35)"
             @contextmenu="$emit('contextClick',$event, item)"
             class="gem_cell" @click="$emit('clickItem', item)"
             :title="item.getDescription()"
             v-bind:class="{ clicked: item?.clicked}">
          <img :src="item.getImagePath()" alt="">
        </div>
      </div>
      <div id="belt">
        <div v-for="item in char.inv.pull.slice(35,39)" class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
          <img :src="item.getImagePath()" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .equip_cell img{
    max-width: 120px;
    max-height: 120px;
  }
  #player_bag_and_belt{
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #bag{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #belt{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #equip{
    width: 40%;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  #player_equip{
    display: flex;flex-direction: column;justify-content: space-between;height: 90%;
  }
  .equip_block{
    border: 25px solid  #E8E8E8;
    /*border-image: url('/src/assets/img/border/equip_block_border.png') 39 stretch stretch;*/
    padding: 10px 5px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .equip_cell{
    background-color: #B0B0B0;
    min-height: 120px;
    min-width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .equip_cell_wrap{
    border: 6px solid gray;
  }
  .gem_cell{
    min-height: 80px;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .is_row_combat{
    border: 25px solid;
    border-image: url('/src/assets/img/border/combat_equip_border.png') 39 stretch stretch;
  }
  .is_column{
    border-color: #484848;
  }
  .clicked{
    border: 10px solid;
    border-image: url('/src/assets/img/border/equip_clicked_border.png') 16 stretch stretch;
  }
  .is_row_sorcery{
    border: 2px blue solid;
  }
  .is_row_movement{
    border: 2px green solid;
  }
</style>