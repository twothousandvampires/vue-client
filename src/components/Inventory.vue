<script>

import Request from "../script/Request.js";
import Equip from "../script/Items/Equip";
import PlayerStats from "@/components/PlayerStats.vue";
import PlayerEquip from '@/components/PlayerEquip.vue';
import PlayerInventory from "@/components/PlayerInventory.vue";
import ItemCreator from "@/script/Items/ItemCreator";
import Item from "@/script/Items/Item";

export default {
  props : {
    char : Object
  },
  components:{
    PlayerStats,
    PlayerEquip,
    PlayerInventory
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
      console.log(this.clicked_item)
    },
    mouseover(item){
      this.over = item
    },
    mouseleave(){
      this.over = false
      this.clicked_context = false
    },
    contextClick(e ,item){
      let to_delete = document.getElementsByClassName('item-context')[0]
      if(to_delete){
        to_delete.parentNode.removeChild(to_delete)
      }
      let context = document.createElement('div')
      context.className = 'item-context'
      context.style.top = e.pageY - 20 +'px'
      context.style.left = e.pageX - 20 +'px'
      let to_delete_p = document.createElement('p')
      to_delete_p.textContent = "Delete"

      context.addEventListener('mouseleave', (e)=>{
        context.parentNode.removeChild(context)
      })

      to_delete_p.addEventListener('click', (e)=>{
        Request.deleteItem(item.id, item.type).then(r => {
          if(r.data.success){
            if(item.slot_type === 'equip'){
              this.clicked.unequip(this.char)
            }
            this.char.inv.deleteItem(item)
            context.parentNode.removeChild(context)
          }
        })
      })

      if(item.type === 'used'){
        let to_use = document.createElement('p')
        to_use.textContent = "Use"
        context.appendChild(to_use)

        to_use.addEventListener('click', (e)=>{
          switch (item.class){
            case 'book':
                Request.useBook(item.id, 1).then(r => {
                if(r.data.success){
                  console.log(r.data)
                  // this.char.skill_tree.learn(JSON.parse(r.data.data.data))
                  this.char.inv.deleteItem(item)
                  context.parentNode.removeChild(context)
                }
              })
              break;
          }
        })
      }
      context.appendChild(to_delete_p)
      document.body.appendChild(context)
      e.preventDefault()
    },
    createItem(){
      Request.createItem().then(response =>{
        if(response.data.success){
          console.log(response.data.data)
          this.char.inv.pull[response.data.data.item.slot] = ItemCreator.createItem(response.data.data.item)
        }
      })
    },
  },
}
</script>
<template>
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
    z-index: 100000;
    position: fixed;
  }
</style>