<script>
import Weapon from "../script/Items/Weapon";

export default {
  name: "Inventory.vue",
  props : {
    mouse : Object,
    char : Object
  },
  data() {
    return {
      clicked : false,
    }
  },
  mounted() {

  },
  methods : {
    close(){
      this.$emit('close_inv')
    },
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
      axios({method: 'post',
        url : '//127.0.0.1:8000/api/item/create/',
        data : {
          char_id : localStorage.getItem('char_id'),
        },
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }).then(response =>{
        console.log("!")
        if(response.data.success){
          let item = response.data.data.item
          this.char.inv.pull[item.slot] = this.char.inv.createItem(item)
        }
      }).catch(error => {
        console.log('!')
      })
    },
    deleteItem(){
      if(this.clicked){
        axios({method: 'post',
          url : '//127.0.0.1:8000/api/item/delete/',
          data : {
            char_id : localStorage.getItem('char_id'),
            id : this.clicked.id,
            type : this.clicked.type
          },
          headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        }).then(response =>{
          if(response.data.success){
            if(this.clicked.slot_type == 'equip'){
              this.clicked.unequip(this.char)
            }
            this.char.inv.deleteItem(this.clicked)
            this.clicked = false
          }
        })
      }
    }
  },
}
</script>
<template>
  <div id="inv_wrap">
    <div id="stats">
      <p>{{char.name}}</p>
      <p>{{char.min_attack_damage}}</p>
      <p>{{char.max_attack_damage}}</p>
      <p>{{char.increased_life}}</p>
      <p>Life - {{char.life}} / {{char.max_life}}</p>
    </div>
    <div id="equip_block">
        <div id="equip">
        <!-- head -->
        <div id="head" @click="clickItem(char.inv.equip['0'],0,'equip')" v-if="char.inv.equip['0'] !== 'empty'">
          <p>{{ char.inv.equip['0'].name }}</p>
          <img :src="char.inv.equip['0'].img_path" alt="">
        </div>
        <div id="head" @click="clickItem(char.inv.equip['0'],0,'equip')" v-else >
          <img width="100" height="100" src="/src/assets/img/icons/items/misc/empty_helm.png" alt="">
        </div>

        <!-- left -->
          <div id="left_hand" @click="clickItem(char.inv.equip['1'],1,'equip')" v-if="char.inv.equip['1'] !== 'empty'">
            <p>{{ char.inv.equip['1'].name }}</p>
            <img :src="char.inv.equip['1'].img_path" alt="">
          </div>
          <div id="left_hand" @click="clickItem(char.inv.equip['1'],1,'equip')" v-else >
            <img width="100" height="100" src="/src/assets/img/icons/items/misc/empty_left.png" alt="">
          </div>

        <!-- right -->
          <div id="right_hand" @click="clickItem(char.inv.equip['2'],2,'equip')" v-if="char.inv.equip['2'] !== 'empty'">
            <p>{{ char.inv.equip['2'].name }}</p>
            <img :src="char.inv.equip['2'].img_path" alt="">
          </div>
          <div id="right_hand" @click="clickItem(char.inv.equip['2'],2,'equip')" v-else >
            <img width="100" height="100" src="/src/assets/img/icons/items/misc/empty_right.png" alt="">
          </div>

        <!-- body -->
          <div id="body" @click="clickItem(char.inv.equip['3'],3,'equip')" v-if="char.inv.equip['3'] !== 'empty'">
            <p>{{ char.inv.equip['3'].name }}</p>
            <img :src="char.inv.equip['3'].img_path" alt="">
          </div>
          <div id="body" @click="clickItem(char.inv.equip['3'],3,'equip')" v-else >
            <img width="100" height="100" src="/src/assets/img/icons/items/misc/empty_body.png" alt="">
          </div>

          <div id="first_accessory" @click="clickItem(char.inv.equip['4'],4,'equip')" v-if="char.inv.equip['4'] !== 'empty'">
            <p>{{ char.inv.equip['4'].name }}</p>
            <img :src="char.inv.equip['4'].img_path" alt="">
          </div>
          <div id="first_accessory" @click="clickItem(char.inv.equip['4'],4,'equip')" v-else >
            <img width="100" height="100" src="/src/assets/img/icons/items/misc/empty_acess.png" alt="">
          </div>

          <div id="second_accessory" @click="clickItem(char.inv.equip['5'],5,'equip')" v-if="char.inv.equip['5'] !== 'empty'">
            <p>{{ char.inv.equip['5'].name }}</p>
            <img :src="char.inv.equip['5'].img_path" alt="">
          </div>
          <div id="second_accessory" @click="clickItem(char.inv.equip['5'],5,'equip')" v-else >
            <img width="100" height="100" src="/src/assets/img/icons/items/misc/empty_acess.png" alt="">
          </div>

          <div id="belt" @click="clickItem(char.inv.equip['6'],6,'equip')" v-if="char.inv.equip['6'] !== 'empty'">
            <p>{{ char.inv.equip['6'].name }}</p>
            <img :src="char.inv.equip['6'].img_path" alt="">
          </div>
          <div id="belt" @click="clickItem(char.inv.equip['6'],6,'equip')" v-else >
            <img width="100" height="100" src="/src/assets/img/icons/items/misc/empty_belt.png" alt="">
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
        <p @click="deleteItem()">Удалить</p>
        <p>Применить</p>
      </div>
      <div id="items">
        <div id="inv_item"  v-for="(item,index) in char.inv.pull" :key="item.id">
          <div @click="clickItem(item,index,'inv')" :slot="index" id="empty" v-if="item === 'empty'"></div>
          <div @click="clickItem(item,index,'inv')" :title="char.inv.getDiscription(item.slot)" v-bind:class="{clicked: item.clicked}" class="slot" v-else>
            <p>{{item.name}}</p>
            <img :src="item.img_path" alt="">
          </div>
        </div>
      </div>
    </div>
    <div ref="clicked" id="clicked" class="slot" v-if="clicked">
      <p>{{clicked.name}}</p>
      <img :src="clicked.img_path" alt="">
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
    width: 100px;
    height: 100px;
    background-color: blue;
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
  #inv_item{
    margin: 4px;
    width: 100px;
    height: 100px;
  }
  .slot{
    min-width: 100px;
    min-height: 100px;
    background-color: yellow;
  }
  #empty{
    min-width: 100px;
    min-height: 100px;
    background-color: dimgrey;
  }
  #stats{
    width: 30%;
    background-color: aqua;
  }
  #equip_block{
    width: 35%;
    background-color: aqua;
    display: flex;
    justify-content: center;
  }
  #inv{
    width: 35%;
    background-color: red;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #inv_wrap{
    top:0;
    border: 6px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_big.png") 3 stretch stretch;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    z-index: 100;
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