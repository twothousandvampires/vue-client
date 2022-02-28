<script>
import Mouse from "../script/Mouse";
import NodeModal from "../components/NodeModal.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Render from "../script/Render.js";
import ImageData from "../script/ImageData.js";
import {Enemy} from "../script/Enemy/Enemy.js";

export default {
  data(){
    return {
      img_data : undefined,
      render : undefined,
      ctx : undefined,
      data : undefined,
      char : undefined,
      mouse : undefined,
      over_node : false,
      loaded : true,
      type : 0,
      enemy : []
    }
  },
  components:{
    NodeModal,
    MainLayout
  },
  props:{
    char_id : String
  },
  mounted() {
    axios({method: 'post',
          url: '//127.0.0.1:8000/api/character/world/' + localStorage.getItem('user_id') + '/' + this.char_id,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
    }).then(response =>{
        if(response.data.success){
          this.img_data = new ImageData()
          this.ctx = this.$refs.canvas.getContext('2d')
          this.mouse = new Mouse(this.$refs.canvas)
          this.render = new Render(this.ctx, this.mouse)
          this.prettifyData(response.data.data)
          this.loaded = false
          this.draw()
        }
      })
  },
  watch:{
    data () {

    }
  },
  methods : {
    goTo(node){
      axios({method: 'post',
            url: '//127.0.0.1:8000/api/character/move/' + localStorage.getItem('user_id') + '/' + this.char_id,
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data :{
              x : node.x,
              y : node.y
            }
      }).then(response =>{
            if(response.data.success){
              this.prettifyData(response.data.data)
            }
      })
    },
    createEnemy(dist, count){
      for(let i = 0; i < 1; i++){
        this.enemy.push(new Enemy(Math.round(Math.random() * 800),Math.round(Math.random() * 800 )))
      }
    },
    prettifyData(response){
      switch (response.node_type){
        case 0:
          this.type = 0
          this.data = response.nodes
          this.char = response.char
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
          this.createEnemy(response.dist, response.number)
          this.type = 1
          this.char = response.char
          this.char.cord_x = 450
          this.char.cord_y = 450
          break;
      }
    },
    draw(){
      if(this.data) {
        setInterval(()=>{
          switch (this.type){
            case 0:
              this.render.drawWorld(this)
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
    }
  }
}
</script>

<template>
  <MainLayout>
    <canvas :style="can_style" width="900" height="900" ref="canvas"></canvas>
    <p style="position:absolute" v-if="loaded">Loading</p>
  </MainLayout>
  <NodeModal v-bind:mouse="mouse" v-bind:over_node="over_node" v-if="over_node"/>
</template>
<style>

canvas{
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}
</style>





