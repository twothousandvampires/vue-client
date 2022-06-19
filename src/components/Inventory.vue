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
      clicked : false,
      over : false,
      clicked_context : false
    }
  },
  methods : {
    clickItem(item, slot, slot_type){
      if(!this.clicked && item !== 'empty'){
        this.clicked = item
        item.clicked = true
      }
      else if(this.clicked && this.clicked.slot != slot && this.check(slot, slot_type)){
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
      <div id="char_stats">
        <p style="font-size: 24px">{{char.name}}</p>
        <p>Increased life : {{char.getIncreased('life')}}</p>
        <p>Life : {{char.life}} / {{char.max_life}}</p>
        <p>Energy : {{char.energy}} / {{char.max_energy}}</p>
        <p>Energy regen : {{char.increased_energy_regen}}</p>
      </div>
      <div id="attack_stats">
        <img style="width: 100%" src="/src/assets/img/icons/items/misc/attack_stats_top.gif" alt="">
        <p style="font-size: 24px">Attack</p>
        <p>Attack damage : {{char.getTotalMinAttackDamage()}} - {{char.getTotalMaxAttackDamage()}}</p>
        <p>Critical chance : {{char.getStat('attack_crit_chance', true)}}%</p>
        <p>Critical multiplier - {{char.getStat('attack_crit_multy', true)}}%</p>
        <p>Attack speed : {{char.getAttackSpeed()/1000}} per second</p>
        <p>Attack range : {{char.getStat('attack_range', true)}}px</p>
        <p>Life Leech : {{char.getStat('attack_life_leech')}}%</p>
      </div>
      <div id="spell_stats">
        <p>Add spell damage : {{char.getMinSpellDamage()}} - {{char.getMaxSpellDamage()}}</p>
        <p>Increased spell damage : {{char.getIncreased('spell_damage')}}%</p>
        <p>Spell Leech : {{char.getStat('spell_life_leech')}}%</p>
        <p>Increased spell aoe : {{char.getIncreased('spell_aoe')}}px</p>
        <p>Spell critical chance - {{char.getStat('spell_crit_chance', true)}}%</p>
        <p>Spell critical multiplier - {{char.getStat('spell_crit_multy', true)}}%</p>
      </div>
    </div>
    <div id="equip_block">
        <div id="equip">
        <!-- head -->
        <div id="head" @click="clickItem(char.inv.equip['0'],0,'equip')">
          <p v-if="char.inv.equip['0'] !== 'empty'">{{ char.inv.equip['0'].name }}</p>
          <img v-if="char.inv.equip['0'] !== 'empty'" :src="char.inv.equip['0'].img_path" alt="">

          <img v-else width="100" height="100" src="/src/assets/img/icons/items/misc/empty_helm.png" alt="">
        </div>

        <!-- left -->
        <div id="left_hand" @click="clickItem(char.inv.equip['1'],1,'equip')">
          <p v-if="char.inv.equip['1'] !== 'empty'">{{ char.inv.equip['1'].name }}</p>
          <img v-if="char.inv.equip['1'] !== 'empty'" :src="char.inv.equip['1'].img_path" alt="">

          <img v-else width="100" height="100" src="/src/assets/img/icons/items/misc/empty_left.png" alt="">
        </div>

        <!-- right -->
        <div id="right_hand" @click="clickItem(char.inv.equip['2'],2,'equip')" >
          <p v-if="char.inv.equip['2'] !== 'empty'">{{ char.inv.equip['2'].name }}</p>
          <img v-if="char.inv.equip['2'] !== 'empty'" :src="char.inv.equip['2'].img_path" alt="">

          <img v-else width="100" height="100" src="/src/assets/img/icons/items/misc/empty_right.png" alt="">
        </div>

        <!-- body -->
        <div id="body" @click="clickItem(char.inv.equip['3'],3,'equip')" >
          <p v-if="char.inv.equip['3'] !== 'empty'">{{ char.inv.equip['3'].name }}</p>
          <img v-if="char.inv.equip['3'] !== 'empty'" :src="char.inv.equip['3'].img_path" alt="">

          <img v-else width="100" height="100" src="/src/assets/img/icons/items/misc/empty_body.png" alt="">
        </div>

        <div id="first_accessory" @click="clickItem(char.inv.equip['4'],4,'equip')" >
          <p v-if="char.inv.equip['4'] !== 'empty'">{{ char.inv.equip['4'].name }}</p>
          <img v-if="char.inv.equip['4'] !== 'empty'" :src="char.inv.equip['4'].img_path" alt="">

          <img v-else width="100" height="100" src="/src/assets/img/icons/items/misc/empty_acess.png" alt="">
        </div>

        <div id="second_accessory" @click="clickItem(char.inv.equip['5'],5,'equip')"  >
          <p v-if="char.inv.equip['5'] !== 'empty'">{{ char.inv.equip['5'].name }}</p>
          <img v-if="char.inv.equip['5'] !== 'empty'" :src="char.inv.equip['5'].img_path" alt="">

          <img v-else width="100" height="100" src="/src/assets/img/icons/items/misc/empty_acess.png" alt="">
        </div>

        <div id="belt" @click="clickItem(char.inv.equip['6'],6,'equip')" >
          <p v-if="char.inv.equip['6'] !== 'empty'">{{ char.inv.equip['6'].name }}</p>
          <img v-if="char.inv.equip['6'] !== 'empty'" :src="char.inv.equip['6'].img_path" alt="">

          <img v-else width="100" height="100" src="/src/assets/img/icons/items/misc/empty_belt.png" alt="">
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
          <div @click="clickItem(item,index,'inv')" :slot="index" class="empty_slot" v-if="item === 'empty'"></div>
          <div @contextmenu="contextClick(item, $event)" v-on:mouseover="mouseover(item)" v-on:mouseleave="mouseleave" @click="clickItem(item,index,'inv')" :title="char.inv.getDiscription(item.slot)" v-bind:class="{clicked: item.clicked}" class="slot" v-else>
            <img :src="item.img_path" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>


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
  #belt, #head, #body, #left_hand, #right_hand, #first_accessory, #second_accessory{
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

  #left_hand{
    position: absolute;
    left: calc(15% - 50px);
    top:22%;
  }

  #right_hand{
    position: absolute;
    left: calc(85% - 50px);
    top:22%;
  }

  #first_accessory{
    position: absolute;
    left: calc(15% - 50px);
    top:58%;
  }

  #second_accessory{
    position: absolute;
    left: calc(85% - 50px);
    top:58%;
  }

  #belt{
    position: absolute;
    left: calc(50% - 50px);
    top:78%;
  }

  #body{
    position: absolute;
    left: calc(50% - 50px);
    top:calc(50% - 50px);
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
    width: 25%;
    background-color: aqua;
  }
  #equip_block{
    width: 35%;
    background-color: aqua;
    display: flex;
    justify-content: center;
  }
  #inv{
    width: 40%;
    background-color: red;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #char_stats{
    padding: 4px;
    border: 6px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_big.png") 3 stretch stretch;
  }
  #char_stats p{
    font-size: 16px;
    font-weight: bold;
  }
  #attack_stats{
    padding: 4px;
    border: 6px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_big.png") 3 stretch stretch;
  }
  #attack_stats p{
    font-size: 16px;
    font-weight: bold;
  }
  #spell_stats{
    padding: 4px;
    border: 6px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_big.png") 3 stretch stretch;
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