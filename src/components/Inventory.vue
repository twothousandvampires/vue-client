<script>

import Request from "../script/Request.js";
import PlayerStats from "@/components/PlayerStats.vue";
import PlayerEquip from '@/components/PlayerEquip.vue';
import PlayerInventory from "@/components/PlayerInventory.vue";
import ItemCreator from "@/script/Items/ItemCreator";
import ItemInspectModal from "./ItemInspectModal.vue";
import InspectSkillGem from "./InspectSkillGem.vue";
export default {
  props : {
    char : Object
  },
  components:{
    PlayerStats,
    PlayerEquip,
    PlayerInventory,
    ItemInspectModal,
    InspectSkillGem
  },
  data() {
    return {
      clicked_item : false,
      over_item : false,
      clicked_context : false
    }
  },
  methods : {
    clickItem(item){
      if(!this.clicked_item && item.name !== 'empty'){
        this.clicked_item = this.char.inv.pull[item.slot]
        this.clicked_item.clicked = true
      }
      else if(this.clicked_item && this.clicked_item.slot !== item.slot ){
        this.char.inv.change(this.clicked_item, item.slot)
        this.clicked_item = false
      }
      else {
        this.char.inv.pull[this.clicked_item.slot].clicked = false
        this.clicked_item = false
      }
    },
    mouseover(item){

    },
    mouseleave(){
      this.$refs.inspect_item_modal.show = false
      this.$refs.inspect_item_modal.item = undefined
      this.$refs.inspect_skill_gem.show = false
      this.$refs.inspect_skill_gem.item = undefined
    },
    inspectGem(e, item){
      console.log(item)
      this.$refs.inspect_skill_gem.x = e.pageX
      this.$refs.inspect_skill_gem.y = e.pageY
      this.$refs.inspect_skill_gem.show = true
      this.$refs.inspect_skill_gem.item = item


      this.$refs.inspect_item_modal.show = false
      this.$refs.inspect_item_modal.item = undefined
    },
    contextClick(e ,item){
      this.$refs.inspect_item_modal.x = e.pageX
      this.$refs.inspect_item_modal.y = e.pageY
      this.$refs.inspect_item_modal.show = true
      this.$refs.inspect_item_modal.item = item
      e.preventDefault()
    },
    async deleteItem(item){
      let response = await Request.deleteItem(item.id)
      if(response.data.success){
        this.char.inv.deleteItem(item)
      }
    },
    createItem(){
      Request.createItem().then(response =>{
        if(response.data.success){
          this.char.inv.pull[response.data.data.item.slot] = ItemCreator.createItem(response.data.data.item)
        }
      })
    },
  },
}
</script>
<template>
  <ItemInspectModal @inspectGem="inspectGem" @deleteItem="deleteItem" @mouseleave="mouseleave" ref="inspect_item_modal"></ItemInspectModal>
  <InspectSkillGem @mouseleave="mouseleave" ref="inspect_skill_gem"></InspectSkillGem>
  <div id="inv_wrap">
    <PlayerStats v-bind:stats="char.stats"></PlayerStats>
    <PlayerEquip @clickItem="clickItem" v-bind:char="char"></PlayerEquip>
    <PlayerInventory @createItem="createItem" @contextClick="contextClick" @clickItem="clickItem" v-bind:char="char"></PlayerInventory>
  </div>
</template>
<style scoped>
  .slot img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;

    width: 60px;
    height: 60px;
  }
  p{
    font-size: 16px;
    font-weight: bold;
    color:#4b4b4b;
  }
  #inv_wrap{
    left: 0;
    top:0;
    border: 25px solid #40c4c8;
    border-image: url('/src/assets/img/border/border_long.png') 0 stretch stretch;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: fixed;
  }
</style>