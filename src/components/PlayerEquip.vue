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
    getInventoryCellImage(item){
      let str = '/src/assets/img/icons/items/misc/'
      if(item.name === 'empty'){
        if([0,3,6].includes(item.slot)){
          return str + 'empty_weapon.png'
        }
        if([1,4,7].includes(item.slot)){
          return str + 'empty_armour.png'
        }
        if([2,5,8].includes(item.slot)){
          return str + 'empty_accessory.png'
        }
        else {
          return str + 'empty_shield.png'
        }
      }
      else{
        return item.image_path
      }
    }
  }
}
</script>
<template>
  <div id="equip">
    <p @click.prevent="page=!page">switch</p>
    <div id="player_equip" v-if="page">
      <div class="equip_block" v-bind:class="{ is_row_combat: char.inv.is_combat_row}">
        <p>combat</p>
        <div v-for="item in char.inv.pull.slice(0,3)" class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
          <img :src="item.getImagePath()" alt="">
        </div>
      </div >
      <div class="equip_block" v-bind:class="{ is_sorcery_row: char.inv.is_sorcery_row}">
        <p>wizardry</p>
        <div v-for="item in char.inv.pull.slice(3,6)" class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
          <img :src="item.getImagePath()" alt="">
        </div>
      </div>
      <div class="equip_block" v-bind:class="{ is_row_combat: char.inv.is_movement_row}">
        <p>movement</p>
        <div v-for="item in char.inv.pull.slice(6,9)" class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
          <img :src="item.getImagePath()" alt="">
        </div>
      </div>
    </div>
    <div id="player_bag_and_belt" v-else>
      <div id="bag">
        <div v-for="item in char.inv.pull.slice(29,35)" class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
          <img :src="item.getImagePath()" alt="">
          <p>qwr</p>
        </div>
      </div>
      <div id="belt">
        <div v-for="item in char.inv.pull.slice(35,39)" class="equip_cell" @click="$emit('clickItem', item)" :title="item.getDescription()" v-bind:class="{ clicked: item?.clicked}">
          <img :src="item.getImagePath()" alt="">
          <p>jj</p>
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
  #player_equip{

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
    background-color: #e1e1e1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .equip_block{
    border: 50px solid;
    border-image: url('/src/assets/img/border/equip_block_border.png') 39 stretch stretch;
    padding: 10px 5px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .equip_cell{
    min-height: 120px;
    min-width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .is_row_combat{
    border: 50px solid;
    border-image: url('/src/assets/img/border/combat_equip_border.png') 39 stretch stretch;
  }
  .is_row_sorcery{
    border: 2px blue solid;
  }
  .is_row_movement{
    border: 2px green solid;
  }
  .is_column{
    border-radius: 10px;
  }
</style>