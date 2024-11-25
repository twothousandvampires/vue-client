<script>

import Inventory from "../src/inventory/Inventory";

export default {
  name: "ItemInspectModal",
  computed: {
    Inventory() {
      return Inventory
    }
  },
  data(){
    return{
      item: undefined,
      show: false,
      width: 300,
      height: 200,
      x: 0,
      y: 0
    }
  },
  methods:{
    set(x, y, item){
      this.x = x
      this.y = y
      this.show = true
      this.item = item

      if(this.x + this.width > window.innerWidth){
        this.x = window.innerWidth - this.width
      }
    },
    close(){
      this.show = false
      this.item = undefined
    }
  },
}
</script>
<template>
    <div v-if="this.show" id="inspect-item-modal" :style="{ top: y - 20 + 'px',
                                                            left: x - 20 + 'px',
                                                            width: width + 'px',
                                                            height: height + 'px' }"
    >
    <p class="item-name">{{item.name}}</p>
    <p class="item-name">{{item.getRarityString()}}</p>
    <div v-if="item.item_type === Inventory.ITEM_TYPE_GEM" class="menu-item">
      <p @click.prevent="$emit('inspectGem',$event, this.item)">Inspect</p>
    </div>
    <div v-if="item.item_type === Inventory.ITEM_TYPE_USED" class="menu-item">
      <p @click.prevent="this.item.use(this)">Use</p>
    </div>
    <div class="menu-item">
      <p @click.prevent="$emit('deleteItem', this.item)">Delete</p>
    </div>
  </div>
</template>
<style scoped>
  .menu-item{
    cursor: pointer;
  }
  .menu-item:hover{
    background-color: #888888;
    border: 3px solid;
  }
  .item-name{
    font-size: 26px;
  }
  #inspect-item-modal{
    position: fixed;
    z-index: 100000;
    padding: 4px;
    background-color: #00994d;
    border: 3px solid #5cd65c;
  }
</style>