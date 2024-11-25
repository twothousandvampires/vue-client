<script>
import ItemService from "@/views/game/components/game_canvas/services/ItemService";
import ItemFactory from "@/views/game/components/game_canvas/src/Scr/factories/ItemFactory";
export default {
  name: "PlayerInventory",
  props: {
    char: Object
  },
  data(){
    return {
      item_list: undefined,
      item_to_create: undefined,
      spell_list: [],
      skill_name: undefined
    }
  },
  async mounted() {
    let response = await ItemService.getItemList()
    this.item_list = response.data
  },
  methods: {
    async deleteAllItems(){
      let response = await ItemService.deleteAllItems(this.char.id)
      if(response.data.success){
        this.char.inv.clear()
      }
    },
    async deleteItem(item){
      let response = await Request.deleteItem(item.id)
      if(response.data.success){
        this.char.inv.deleteItem(item)
      }
    },
    async createItem(){
      ItemService.createItem(this.item_to_create.name, this.skill_name?.name).then(response => {
        if (response.data.success) {
          this.char.inv.pull[response.data.data.item.slot] = ItemFactory.createItem(response.data.data.item, this.char)
        }
      })
    }
  }
}
</script>
<template>

<div id="inv">
    <div id ="utility">
      <p @click="createItem">
        create item
      </p>
      <p @click="deleteAllItems">
        delete all
      </p>
      <div>
        <select v-model="item_to_create">
          <option v-for="item in item_list" :value="item">
            {{item.name}}
          </option>
        </select>
        <select v-model="skill_name" v-if="item_to_create && item_to_create.type === 2">
          <option v-for="spell in spell_list" :value="spell">
            {{spell.name}}
          </option>
        </select>
      </div>
    </div>
    <div id="items">
      <div class="inv_item"  v-for="item in char.inv.pull.slice(9,33)" >
        <div @mouseleave="$emit('mouseleave')" @contextmenu="$emit('contextClick',$event, item)" @mouseenter="$emit('mouseenter',$event, item)" @click="$emit('clickItem',item)" v-bind:class="{clicked: item?.clicked}" class="slot">
          <img v-if="item.getImagePath()" :src="item.getImagePath()" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .empty_slot{
    height: 100%;
  }
  #utility{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
  #utility p{
    cursor: pointer;
  }
  #items{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .inv_item{
    padding: 1px;
  }
  .slot{
    background-color: #00994d;
    width: 100%;
    height: 100%;
    min-height: 60px;
    min-width: 60px;
  }
  #inv{
    color:black;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .clicked{

  }
  .slot img{
    display: block;
    width: 60px;
    height: 60px;
  }
  p{
    font-size: 16px;
    font-weight: bold;
    color:#4b4b4b;
  }
</style>