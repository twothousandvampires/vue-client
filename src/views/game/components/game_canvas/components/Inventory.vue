<script>
import PlayerStats from "./PlayerStats.vue";
import PlayerEquip from './PlayerEquip.vue';
import PlayerInventory from "./PlayerInventory.vue";
import Cell from "../../game_canvas/src/inventory/cell/Cell";
import ItemInspectModal from "./ItemInspectModal.vue";
import InspectSkillGem from "./InspectSkillGem.vue";
import PassivesAndSkills from "./PassivesAndSkills.vue";
export default {
  props : {
    char : Object
  },
  components:{
    PlayerStats,
    PlayerEquip,
    PlayerInventory,
    ItemInspectModal,
    InspectSkillGem,
    PassivesAndSkills
  },
  data() {
    return {
      clicked_item : false,
      over_item : false,
      clicked_context : false,
      show: 1
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
        this.clicked_item = item
        this.clicked_item.clicked = true
      }
      else if(this.clicked_item && this.clicked_item.slot !== item.slot ){
        this.char.inv.change(this.clicked_item, item.slot)
        this.clicked_item = false
      }
      else {
        this.clicked_item.clicked = false
        this.clicked_item = false
      }
    },

    mouseleave(){
      if(this.$refs.inspect_skill_gem){
        this.$refs.inspect_skill_gem.close()
      }
    },
    inspectGem(e, item){
      console.log('inspect')
      if(!item || !item.name) return
      if(this.$refs.inspect_item_modal.show) return;

      this.$refs.inspect_skill_gem.set(e.pageX, e.pageY, item)
      this.$refs.inspect_item_modal.close()
    },
    contextClick(e ,item){
      console.log('context')
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
  <ItemInspectModal @deleteItem="deleteItem" v-on:mouseleave="this.$refs.inspect_item_modal.close()" ref="inspect_item_modal"></ItemInspectModal>
  <InspectSkillGem ref="inspect_skill_gem"></InspectSkillGem>
  <div id="inv_wrap">
    <p style="color: #1a651a; text-align: center; cursor: pointer" @click="this.show *= -1">-=| {{ this.show === 1 ? 'passives and skills' : 'inventory and stats'}} |=-</p>
    <div v-if="this.show === 1" style="display: flex; flex-direction: row; height: 100%; overflow-y: auto">
      <PlayerStats v-bind:player="char"></PlayerStats>
      <div style="width: 60%; height: 100%; flex-direction: column; justify-content: space-between; display: flex; overflow-y: auto; position: sticky; top: 0 ">
        <PlayerEquip @mouseleave="mouseleave" @contextClick="contextClick" @mouseenter="inspectGem" @clickItem="clickItem" v-bind:char="char"></PlayerEquip>
        <PlayerInventory @mouseleave="mouseleave" @mouseenter="inspectGem" @createItem="createItem" @contextClick="contextClick" @clickItem="clickItem" v-bind:char="char"></PlayerInventory>
      </div>
    </div>
    <div v-else>
      <PassivesAndSkills v-bind:char="char"></PassivesAndSkills>
    </div>
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
    color:black;
  }
  #inv_wrap{
    border: 3px solid #248f24;
    padding: 4px;
    background-color: #5cd65c;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 65%;
    z-index: 10000;
    position: fixed;
    overflow-y: hidden;
  }
</style>