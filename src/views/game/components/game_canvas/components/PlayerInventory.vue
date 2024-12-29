<script>
import ItemFactory from "@/views/game/components/game_canvas/src/Scr/factories/ItemFactory";
import requestService from "../../../services/requestService";

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
    let res = await requestService.serverRequest('get_items_list')
    this.item_list = res.data.items
  },
  methods: {
    async deleteAllItems(){
      let res = await requestService.serverRequest('delete_all_items')
      if(res.success){
        this.char.inv.clear()
      }
    },
    async deleteItem(item){
      alert('here')
      let res = await requestService.serverRequest('delete_item', { item_id: item.id})
      if(res.success){
        this.char.inv.deleteItem(item)
      }
    },
    async createItem(){
      requestService.serverRequest('create_item', {item_name: this.item_to_create.name}).then(response => {
        if(response.success) {
          this.char.inv.pull[response.data.item.slot] = ItemFactory.createItem(response.data.item, this.char)
        }
      })
    },
    async createShard(){
      let res = await requestService.serverRequest('disassemble')
      if(res.success){
        this.char.inv.update(res.data.items)
      }
    },
    async createItem2(){
      let res = await requestService.serverRequest('synthesis')
      if(res.success){
        this.char.inv.update(res.data.items)
      }
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
      <img @click="createItem2()" title="consume 3 items from you inventory to have a chance to create new" width="48" height="48"
        src='/src/assets/img/synthesis.png'
      >
      <img @click="createShard()" title="consume a item from you inventory to have a chance to create craft item" width="48" height="48"
        src='/src/assets/img/splitting.png'
      >
      <div>
        <select v-model="item_to_create">
          <option v-for="item in item_list" :value="item">
            {{item.name}}
          </option>
        </select>
      </div>
    </div>
    <div id="items">
      <div class="inv_item"  v-for="item in char.inv.pull.slice(9,33)" >
        <div @mouseleave="$emit('mouseleave')" @contextmenu="$emit('contextClick',$event, item)" @mouseenter="$emit('mouseenter',$event, item)" @click="$emit('clickItem',item)" v-bind:class="{clicked: item?.clicked}" class="slot">
          <img v-if="item.getImagePath()" :src="item.getImagePath()" alt="">
          <p style="position: absolute; left: 45px; top: 36px;color: wheat" v-if="item.item_type === 3">
            {{item.charges}}
          </p>
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