<script>

import Request from "../script/Request.js";
import Used from "../script/Items/Used/Used";
import Item from "../script/Items/Item";

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
    clickItem(item){
      if(!this.clicked_item && item.name !== 'empty'){
        this.clicked_item = item
        item.clicked = true
      }
      else if(this.clicked_item && this.clicked_item.slot !== item.slot){
        this.char.inv.change(this.clicked_item, item.slot)
        this.clicked_item = false
      }
      else {
        this.char.inv.pull[this.clicked_item.slot].clicked = false
        this.clicked_item = false
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
    createItem(){
      Request.createItem().then(response =>{
        if(response.data.success){
          console.log(response.data.data)
          this.char.inv.pull[response.data.data.item.slot] = new Item(response.data.data.item)
        }
      })
    },
    getInventoryCellImage(item){
      let str = '/src/assets/img/icons/items/misc/'
      if(item.name === 'empty'){
        if(item.class === 'inventory'){
          return str + 'empty_shield.png'
        }
        else if(item.class === 'weapon'){
          return str + 'empty_weapon.png'
        }
        else if(item.class === 'armour'){
          return str + 'empty_armour.png'
        }
        else if(item.class === 'accessory'){
          return str + 'empty_accessory.png'
        }
      }
      else{
        return item.image_path
      }
    }
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
          <p>Stamina : {{char.stats.get('stamina')}} / {{char.stats.get('max_stamina')}}</p>
          <p>Stamina regen : {{char.stats.get('stamina_regeneration')}}</p>
          <p>Energy : {{char.stats.get('energy')}} / {{char.stats.get('max_energy')}}</p>
          <p>Speed : {{char.stats.get('movement_speed')}}</p>
        </div>
      </div>
      <div>
        <img style="width: 100%" src="/src/assets/img/icons/items/misc/attack_stats_top.gif" alt="">
        <div id="attack_stats">
          <p style="font-size: 24px">Attack</p>
          <p>Attack damage : {{char.stats.get('min_attack_damage')}} - {{char.stats.get('max_attack_damage')}}</p>
          <p>Critical chance : {{char.stats.get('attack_crit_chance')}}%</p>
          <p>Critical multiplier - {{char.stats.get('attack_crit_multy')}}%</p>
          <p>Attack speed : {{char.stats.get('attack_speed')}} ms</p>
          <p>Increased attack speed : {{char.stats.get('increased_attack_speed')}}%</p>
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
          <p>Increased spell AOE : {{char.stats.get('increased_spell_aoe')}}px</p>
          <p>Spell critical chance - {{char.stats.get('spell_crit_chance')}}%</p>
          <p>Spell critical multiplier - {{char.stats.get('spell_crit_multy')}}%</p>
          <p>Cast speed - {{char.stats.get('cast_speed')}} ms</p>
        </div>
      </div>
      <div>
        <img style="width: 100%" src="/src/assets/img/icons/items/misc/stats_defend_top.gif" alt="">
        <div id="defend_stats">
          <p style="font-size: 24px">Defend</p>
          <p>Increased armour : {{char.stats.get('increased_armour')}}%</p>
          <p>Armour : {{char.stats.get('armour')}}</p>
          <p>Increased evade - {{char.stats.get('increased_evade')}}%</p>
          <p>Evade : {{char.stats.get('evade')}}</p>
          <p>Increased resist : {{char.stats.get('increased_resist')}}%</p>
          <p>Resist : {{char.stats.get('resist')}}</p>
          <p>Will : {{char.stats.get('will')}}</p>
        </div>
      </div>
    </div>
    <div id="equip">
        <div class="equip_block" v-bind:class="{ is_row_combat: char.inv.isRow('combat')}">
          <p>combat</p>
          <div v-for="item in char.inv.pull.slice(0,3)" class="equip_cell" @click="clickItem(item)" :title="item.getDescription()">
            <img :src="getInventoryCellImage(item)" alt="">
          </div>
        </div >
        <div class="equip_block">
          <p>wizardry</p>
          <div v-for="item in char.inv.pull.slice(3,6)" class="equip_cell" @click="clickItem(item)" :title="item.getDescription()" v-bind:class="{ is_row_sorcery: char.inv.isRow('sorcery')}">
            <img :src="getInventoryCellImage(item)" alt="">
          </div>
        </div>
        <div class="equip_block">
          <p>movement</p>
          <div v-for="item in char.inv.pull.slice(6,9)" class="equip_cell" @click="clickItem(item)" :title="item.getDescription()" v-bind:class="{ is_row_movement: char.inv.isRow('movement')}">
            <img :src="getInventoryCellImage(item)" alt="">
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
        <div class="inv_item"  v-for="item in char.inv.pull.slice(9)" >
          <div @contextmenu="contextClick(item, $event)" v-on:mouseover="mouseover(item)" v-on:mouseleave="mouseleave" @click="clickItem(item)" :title="item.getDescription()" v-bind:class="{clicked: item?.clicked}" class="slot">
            <img :src="getInventoryCellImage(item)" alt="">
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
  #inv{
    color:black;
    background-color: #e1e1e1;
    width: 30%;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #char_stats, #attack_stats, #spell_stats, #defend_stats{
    padding: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  p{
    font-size: 16px;
    font-weight: bold;
    color:#4b4b4b;
  }
  #spell_stats{

  }
  #spell_stats p{

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
    width: 40%;
    background-color: #e1e1e1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
  .clicked{
    border: 2px green solid;
  }
  .equip_block{
    padding: 20px 5px;
    border:  2px gray solid;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .equip_cell{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .is_row_combat{
    border: 17px;
    border-image: url('/src/assets/img/border/border_big.png') 75 stretch stretch;
  }
 .is_row_sorcery{
   border: 2px blue solid;
 }
 .is_row_movement{
   border: 2px green solid;
 }
 .is_column{
   border-radius: 10px;
 }
</style>