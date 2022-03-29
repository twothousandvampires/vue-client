<script>
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
    listener(e){
      this.$refs.clicked.style.top = e.pageY + 'px'
      this.$refs.clicked.style.left = e.pageX + 'px'
    },
    close(){
      this.$emit('close_inv')
    },
    clickItem(slot){
      this.clicked = this.char.inv.pull[slot];
      window.addEventListener('mousemove',this.listener)
    },
    clickEmpty(index){
      if(this.clicked){
        window.removeEventListener('mousemove',this.listener)
        let item_id = this.clicked.id
        let type = this.clicked.subtype
        this.clicked = undefined;
        axios({method: 'post',
          url : '//127.0.0.1:8000/api/item/change/',
          data : {
            char_id : localStorage.getItem('char_id'),
            item_id : item_id,
            inv_slot : index,
            type : type
          },
          headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        }).then(response =>{
          if(response.data.success){
            this.$emit('changed',response.data.data)
          }
        })
      }
    }
  }
}
</script>
<template>
  <div id="inv_wrap">
    <div id="stats">
      <p>{{char.name}}</p>
    </div>
    <div id="equip_block">
      <div id="equip">
        <div id="head">

        </div>
        <div id="left_hand">

        </div>
        <div id="right_hand">

        </div>
        <div id="body">

        </div>
        <div id="first_accessory">

        </div>
        <div id="second_accessory">

        </div>
        <div id="belt">

        </div>
      </div>
      <div id="belt_block">

      </div>
    </div>
    <div id="inv">
      <p @click="close">close</p>
      <div id="inv_item"  v-for="(item,index) in char.inv.pull" :key="item.id">
        <div @click="clickEmpty(index)" :slot="index" id="empty" v-if="item === 'empty'"></div>
        <div @click="clickItem(item.inv_slot)" :title="char.inv.getDiscription(item.inv_slot)" class="slot" v-else>
          <p>{{item.name}}</p>
          <img :src="item.img_path" alt="">
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
    background-color: blue;
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
    flex-direction: row;
    flex-wrap: wrap;
  }
  #inv_wrap{
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
</style>