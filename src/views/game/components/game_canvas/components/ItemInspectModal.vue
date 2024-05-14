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
      v-on:mouseleave="$emit('mouseleave')"
    >
    <p class="item-name">{{item.name}}</p>
    <p class="item-name">{{item.getRarityString()}}</p>
    <div v-if="item.item_type === Inventory.ITEM_TYPE_GEM" class="menu-item">
      <p @click.prevent="$emit('inspectGem',$event, this.item)">Inspect</p>
    </div>
    <div v-if="item.item_type === Inventory.ITEM_TYPE_USED" class="menu-item">
      <p @click.prevent="$emit('useItem',$event, this.item)">Use</p>
    </div>
    <div class="menu-item">
      <p @click.prevent="$emit('deleteItem', this.item)">Delete</p>
    </div>
      <div class="menu-item">
        <p @click.prevent="$emit('mouseleave', this.item)">Close</p>
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
    border-image: url('/src/assets/img/border/equip_clicked_border.png') 16 stretch stretch;
  }
  .item-name{
    font-size: 26px;
  }
  #inspect-item-modal{
    background-color: white;
    border: 16px solid;
    border-image: url('/src/assets/img/border/equip_clicked_border.png') 16 stretch stretch;
    position: fixed;
    z-index: 100000;
  }
</style>