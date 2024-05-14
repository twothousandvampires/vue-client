<script>
import PlayerStats from "@/components/PlayerStats.vue";
import PlayerEquip from '@/components/PlayerEquip.vue';
import PlayerInventory from "@/components/PlayerInventory.vue";
import Cell from "../../game_canvas/src/inventory/cell/Cell";
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
      clicked_context : false,
    }
  },
  created() {
    window.addEventListener('keydown', (event) => {
      if(event.keyCode === 27){
        if(this.$refs.inspect_item_modal.show || this.$refs.inspect_skill_gem.show){
          this.$refs.inspect_item_modal.close()
          this.$refs.inspect_skill_gem.close()
        }
        else {
          this.char.inv_is_open = false
        }
      }
    })
  },
  methods : {
    clickItem(item){
      if(!this.clicked_item && item.cell_empty !== Cell.CELL_EMPTY){
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
      this.$refs.inspect_item_modal.close()
      this.$refs.inspect_skill_gem.close()
    },
    inspectGem(e, item){
      this.$refs.inspect_skill_gem.set(e.pageX, e.pageY, item)
      this.$refs.inspect_item_modal.close()
    },
    contextClick(e ,item){
      this.$refs.inspect_item_modal.set(e.pageX, e.pageY, item)
      e.preventDefault()
    },
    deleteItem(item){
      this.char.inv.deleteItem(item)
      this.$refs.inspect_item_modal.close()
    }
  },
}
</script>
<template>
  <ItemInspectModal @inspectGem="inspectGem" @deleteItem="deleteItem" @mouseleave="mouseleave" ref="inspect_item_modal"></ItemInspectModal>
  <InspectSkillGem v-bind:player="char" ref="inspect_skill_gem"></InspectSkillGem>
  <div id="inv_wrap">
    <PlayerStats v-bind:player="char"></PlayerStats>
    <PlayerEquip @contextClick="contextClick" @clickItem="clickItem" v-bind:char="char"></PlayerEquip>
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
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: fixed;
  }
</style>