<script>
import ImageData from "../script/ImageData";
import Input from "../script/Input";
import Render from "../script/Render";

export default {
  name: "Inventory.vue",
  props : {
    inv : Object,
    mouse : Object
  },
  data() {
    return {
      clicked : false,
    }
  },
  mounted() {
      console.log(this.inv.pull[1].name)
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
      this.clicked = this.inv.pull[slot];
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
        console.log(this.clicked)
      }
    }
  }
}
</script>
<template>
  <div id="wrap">
    <div id="inv">
      <p @click="close">close</p>
      <div id="inv_item"  v-for="(item,index) in inv.pull" :key="item.id">
        <div @click="clickEmpty(index)" :slot="index" id="empty" v-if="item === 'empty'"></div>
        <div @click="clickItem(item.inv_slot)" :title="inv.getDiscription(item.inv_slot)" class="slot" v-else>
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
  #inv{
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  #wrap{
    width: 100%;
    height: 100%;
    background-color: green;
    z-index: 100;
    position: fixed;
  }
</style>