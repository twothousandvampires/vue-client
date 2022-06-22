<script>

import Request from "../script/Request.js";
import Used from "../script/Items/Used/Used";

export default {
  name: "Inventory.vue",
  props : {
    char : Object
  },
  data() {
    return {
      clicked_item : false,
      over_item : false,
      clicked_context : false
    }
  },
  methods : {
    clickItem(item, slot, type){
      console.log(type)
      if(!this.clicked_item && item){
        this.clicked_item = item
        item.clicked = true
      }
      else if(this.clicked_item && this.clicked.slot != slot  && this.check(slot, slot_type)){
        this.char.inv.change(this.clicked ,slot ,slot_type,this.char)
        this.clicked = false
      }
      else {
        this.char.inv.pull[this.clicked.slot].clicked = false
        this.clicked = false
      }
    },
    mouseover(item){
      this.over = item
    },
    mouseleave(){
      this.over = false
      this.clicked_context = false
    },
    contextClick(item, e){
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

      context.addEventListener('mouseleave' ,(e)=>{
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

      if(item instanceof Used){
        let to_use = document.createElement('p')
        to_use.textContent = "Use"
        context.appendChild(to_use)

        to_use.addEventListener('click', (e)=>{
          Request.useItem(item.id).then(r => {
            if(r.data.success){
              if(r.data.data.type === 'book'){
                this.char.skill_tree.learn(JSON.parse(r.data.data.data))
              }
              this.char.inv.deleteItem(item)
              context.parentNode.removeChild(context)
            }
          })
        })
      }


      context.appendChild(to_delete_p)
      document.body.appendChild(context)
      e.preventDefault()
    },
    check(slot, slot_type){
      if(slot_type === 'equip'){
        if(slot == 0 && this.clicked.class == 'helm') {return true}
        if(slot == 1 && this.clicked.type == 'weapon') {return true}
        if(slot == 2 && this.clicked.type == 'weapon') {return true}
        if(slot == 3 && this.clicked.class == 'body') {return true}
        if(slot == 4 && this.clicked.type == 'accessory') {return true}
        if(slot == 5 && this.clicked.type == 'accessory') {return true}
        if(slot == 6 && this.clicked.class == 'accessory') {return true}
      }
      if(slot_type === 'inv') {return true}
      return false
    },
    createItem(){
      Request.createItem().then(response =>{
        if(response.data.success){
          let item = response.data.data.item
          this.char.inv.pull[item.slot] = this.char.inv.createItem(item)
        }
      })
    },
  },
}
</script>
<template>
  <div id="inv_wrap">
    <div id="stats">
      <div>
        <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_character_top.gif" alt="">
        <div id="char_stats">
          <p style="font-size: 24px">Character</p>
          <p style="font-size: 24px">{{char.stats.get('name')}}</p>
          <p>Increased life : {{char.stats.get('increased_life')}}</p>
          <p>Life : {{char.stats.get('life')}} / {{char.stats.get('max_life')}}</p>
          <p>Energy : {{char.stats.get('energy')}} / {{char.stats.get('max_energy')}}</p>
          <p>Energy regen : {{char.stats.get('energy_regeneration')}}</p>
        </div>
      </div>
      <div>
        <img style="width: 100%" src="/src/assets/img/icons/items/misc/attack_stats_top.gif" alt="">
        <div id="attack_stats">
          <p style="font-size: 24px">Attack</p>
          <p>Attack damage : {{char.stats.get('min_attack_damage')}} - {{char.stats.get('max_attack_damage')}}</p>
          <p>Critical chance : {{char.stats.get('attack_crit_chance')}}%</p>
          <p>Critical multiplier - {{char.stats.get('attack_crit_multy')}}%</p>
          <p>Attack speed : {{char.stats.get('attack_speed')}} per second</p>
          <p>Attack range : {{char.stats.get('attack_range')}}px</p>
          <p>Life Leech : {{char.stats.get('attack_life_leech')}}%</p>
        </div>
      </div>
      <div>
        <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_spell_top.gif" alt="">
        <div id="spell_stats">
          <p style="font-size: 24px">Magick</p>
          <p>Add spell damage : {{char.stats.get('add_min_spell_damage')}} - {{char.stats.get('add_max_spell_damage')}}</p>
          <p>Increased spell damage : {{char.stats.get('increased_spell_damage')}}%</p>
          <p>Spell Leech : {{char.stats.get('spell_life_leech')}}%</p>
          <p>Increased spell aoe : {{char.stats.get('increased_spell_aoe')}}px</p>
          <p>Spell critical chance - {{char.stats.get('spell_crit_chance')}}%</p>
          <p>Spell critical multiplier - {{char.stats.get('spell_crit_multy')}}%</p>
        </div>
      </div>
    </div>
    <div id="equip_block">
      <div id="equip">
          <div v-for="equip_slot in char.inv.equip.keys()" :id="equip_slot.replace(' ','_')" @click="clickItem(char.inv.equip.get(equip_slot), char.inv.equipToSlot(equip_slot), 'equip')">
            <div v-if="char.inv.equip.get('head')">
              <p >{{char.inv.equip.get('head').name}}</p>
              <img :src="char.inv.equip.get('head').img_path" alt="">
            </div>
            <img v-else width="100" height="100" :src="`/src/assets/img/icons/items/misc/empty_${equip_slot.replace(' ', '_')}.png`" alt="">
          </div>
      </div>
      <div id="belt_block">

      </div>
    </div>
    <div id="inv">
      <div id ="utility">
        <p @click="createItem()">
          create item
        </p>
      </div>
      <div id="items">
        <div class="inv_item"  v-for="(item,index) in char.inv.pull" :key="item.id">
          <div @click="clickItem(false)" :slot="index" class="empty_slot" v-if="item === 'empty'"></div>
          <div @contextmenu="contextClick(item, $event)" v-on:mouseover="mouseover(item)" v-on:mouseleave="mouseleave" @click="clickItem(item,index)" :title="char.inv.getDiscription(item.slot)" v-bind:class="{clicked: item.clicked}" class="slot" v-else>
            <img :src="item.img_path" alt="">
          </div>
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
    padding: 10px;
    background-color: #f2f2f2;
    cursor: pointer;
  }
  #items{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  #belt, #head, #body, #left_ring, #right_ring, #gloves, #boots, #weapon, #shield, #amulet{
    width: 120px;
    height: 120px;
    background-color: blue;
    border: 9px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_long.png") 19 stretch stretch;
  }

  #head{
    position: absolute;
    left: calc(50% - 50px);
    top:2%;
  }

  #weapon{
    position: absolute;
    left: calc(15% - 50px);
    top:22%;
  }

  #shield{
    position: absolute;
    left: calc(85% - 50px);
    top:22%;
  }

  #gloves{
    position: absolute;
    left: calc(15% - 50px);
    top:58%;
  }

  #boots{
    position: absolute;
    left: calc(85% - 50px);
    top:58%;
  }

  #belt{
    position: absolute;
    left: calc(50% - 50px);
    top:90%;
  }

  #body{
    position: absolute;
    left: calc(50% - 50px);
    top:calc(70% - 50px);
  }
  #amulet{
    position: absolute;
    left: calc(50% - 50px);
    top:calc(40% - 50px);
  }
  #left_ring, #right_ring{
    position: absolute;
    top:90%;
  }
  #left_ring{
    left: calc(15% - 50px);
  }
  #right_ring{
    left: calc(85% - 50px);
  }

  #clicked{
    position: absolute;
  }
  .inv_item{
    background-color: grey;
    border: 4px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_big.png") 4 stretch stretch;
    margin: 4px;
    width: 100px;
    height: 100px;
  }
  .slot{
    width: 100%;
    height: 100%;
  }
  .slot img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;

    width: 60px;
    height: 60px;
  }
  #empty{
    min-width: 100px;
    min-height: 100px;
    background-color: dimgrey;
  }
  #stats{
    overflow-y:auto;
    background-color: #e1e1e1;
    width: 30%;
  }
  #equip_block{
    width: 40%;
    background-color: #e1e1e1;
    display: flex;
    justify-content: center;
  }
  #inv{
    color:black;
    background-color: #e1e1e1;
    width: 30%;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #char_stats, #attack_stats, #spell_stats{
    padding: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  #char_stats{

  }
  #char_stats p{
    font-size: 16px;
    font-weight: bold;
  }
  #attack_stats{

  }
  p{
    color:#4b4b4b;
  }
  #attack_stats p{
    font-size: 16px;
    font-weight: bold;
  }
  #spell_stats{

  }
  #spell_stats p{
    font-size: 16px;
    font-weight: bold;
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
  #equip{
    margin: 10px;
    width: 100%;
    height: 70%;
    background-image: url("./src/assets/img/border/equip_ring.png");
    background-repeat: no-repeat;
    background-size: 100%
  }
  .clicked{
    border: 2px green solid;
  }
</style>