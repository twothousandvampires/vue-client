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
        this.char.sorcery_mastery_gained ++
        this.char.inv.update(res.data.items)
      }
    },
    async createItem2(){
      let res = await requestService.serverRequest('synthesis')
      if(res.success){
        this.char.inv.update(res.data.items)
        this.char.sorcery_mastery_gained ++
      }
    }
  }
}
</script>
<template>
<div id ="utility">
      <p @click="createItem">
        create item
      </p>
      <!-- <p @click="deleteAllItems">
        delete all
      </p> -->
      <div style="background-color: #b28b78;width: 64px;height: 64px;margin-right: 6px;cursor: pointer;">
        <img @click="createItem2()" title="consume 3 items from you inventory to have a chance to create new" width="64" height="64"
        src='/src/assets/img/synthesis.png'
      >
      </div>
      <div style="background-color: #b28b78;width: 64px;height: 64px;cursor: pointer;">
        <img @click="createShard()" title="consume a item from you inventory to have a chance to create craft item" width="64" height="64"
        src='/src/assets/img/splitting.png'
      >
      </div>
     
      <div>
        <select v-model="item_to_create">
          <option v-for="item in item_list" :value="item">
            {{item.name}}
          </option>
        </select>
      </div>
    </div>
<div id="inv">
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
    justify-content: flex-start;
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
    background-color: #00994d;
  }
  .slot{
    background-color: #00994d;
    width: 100%;
    height: 100%;
    min-height: 60px;
    min-width: 60px;
  }
  #inv{
    background-color: #00994d;
    color:black;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .clicked{
    transform: scale(0.7,0.7);
    z-index: 6666666;
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