<script>
import Input from "../script/Input";
import NodeModal from "../components/NodeModal.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Render from "../script/Render.js";
import ImageData from "../script/ImageData.js";
import Shadow from "../script/Enemy/Shadow.js";
import Reaper from "../script/Enemy/Reaper.js";
import Character from "../script/Character/Character.js";
import Inventory from "../components/Inventory.vue";

export default {
  data(){
    return {
      delay : false,
      img_data : undefined,
      render : undefined,
      ctx : undefined,
      data: undefined,
      char : undefined,
      mouse : undefined,
      over_node : false,
      loaded : true,
      type : 0,
      enemy : [],
      effects : [],
      inv_is_open : false
    }
  },
  components:{
    NodeModal,
    MainLayout,
    Inventory
  },
  props:{
    char_id : String
  },
  mounted() {
    axios({method: 'post',
          url : '//127.0.0.1:8000/api/character/world/',
          data : {
            user_id : localStorage.getItem('user_id'),
            char_id : this.char_id
          },
          headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
    }).then(response =>{
        if(response.data.success){
          this.img_data = new ImageData()
          this.ctx = this.$refs.canvas.getContext('2d')
          this.mouse = new Input(this.$refs.canvas)
          this.render = new Render(this.ctx, this.mouse ,this.img_data)
          this.prettifyData(response.data.data)
          this.loaded = false
          this.draw()
        }
      })
  },
  methods : {
    close_inv(){
      this.inv_is_open = false
    },
    goTo(node){
      axios({method: 'post',
            url: '//127.0.0.1:8000/api/character/move/',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data :{
              x : node.x,
              y : node.y,
              user_id : localStorage.getItem('user_id'),
              char_id : this.char_id
            }
      }).then(response =>{
            if(response.data.success){
              this.prettifyData(response.data.data)
            }
      })
    },
    createEnemy(dist, count){
      for(let i = 0; i < 10; i++){
        this.enemy.push(new Shadow(Math.round(Math.random() * 800),Math.round(Math.random() * 800 )))
      }
      for(let i = 0; i < 5; i++){
        this.enemy.push(new Reaper(Math.round(Math.random() * 800),Math.round(Math.random() * 800 )))
      }
    },
    prettifyData(response){
      if(response.char_update){
        this.char = new Character(response.character.character, response.character.items)
      }
      else {
        this.char.x = response.char.x
        this.char.y = response.char.y
      }
      switch (response.node_type){
        case 0:
          this.type = 0
          this.data = response.nodes
          this.data.map(elem => {
            elem.frame_timer = 0
            elem.frame = Math.floor(Math.random() * 8)
            elem.img = this.img_data.getImage(elem.solar_system_image + (elem.visited ? '_visited': '_not_visited'))
            elem.pretti_x = elem.x - this.char.x + 5
            elem.pretti_y = elem.y - this.char.y + 5
            return elem
          })
          this.char.pretti_x = 5
          this.char.pretti_y = 5
          break;
        case 1:
          this.type = 1
          this.createEnemy(response.dist, response.number)
          break;
      }
    },
    draw(){
      if(this.data) {
        setInterval(()=>{
          switch (this.type){
            case 0:
              if(this.mouse.getInput().i && !this.delay){

                    this.inv_is_open = !this.inv_is_open
                    this.delay = true
                setTimeout(()=>{
                  this.delay = false
                },100)
                }

              if(!this.inv_is_open) {
                this.render.drawWorld(this)
              }
              break;
            case 1:
              this.render.drawFight(this)
              break;
          }
        },50)
      }
    },
  },
  computed:{
    can_style(){
      return this.loaded ? 'visibility : hidden' : 'visibility : visible'
    },
  }
}
</script>
<template>
  <MainLayout>
    <canvas :style="can_style" width="900" height="900" ref="canvas"></canvas>
    <p style="position:absolute" v-if="loaded">Loading</p>
  </MainLayout>
  <Inventory v-if="inv_is_open" @changed="prettifyData" @close_inv="close_inv"  v-bind:char="char" v-bind:mouse="mouse">

  </Inventory>
<!--  <NodeModal v-bind:mouse="mouse" v-bind:over_node="over_node" v-if="over_node"/>-->
</template>
<style>
canvas{
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}
</style>





