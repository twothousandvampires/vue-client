<script>
import Mouse from "../script/Mouse";
import NodeModal from "../components/NodeModal.vue";
import MainLayout from "../layouts/MainLayout.vue";
export default {

  data(){
    return {
      ctx : undefined,
      data : undefined,
      char : undefined,
      mouse : undefined,
      over_node : false,
      loaded : true,
      type : 0,
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
    axios({method: 'post', url: '//127.0.0.1:8000/api/character/world/' + localStorage.getItem('user_id') + '/' + this.char_id, headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }}).then(response =>{
        if(response.data.success){
          this.ctx = this.$refs.canvas.getContext('2d')
          this.mouse = new Mouse(this.$refs.canvas)
          this.data = response.data.data[0]
          this.char = response.data.data[1]
          this.prettifyData()
          setInterval(()=>{
            this.draw()
          },50)
          this.loaded = false
        }
     })
  },
  watch:{
    data () {

    }
  },
  methods : {
    goTo(node){
      axios({method: 'post', url: '//127.0.0.1:8000/api/character/move/' + localStorage.getItem('user_id') + '/' + this.char_id, headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },data :{
          x : node.x,
          y : node.y
        }}).then(response =>{
          console.log(response)
        if(response.data.success){
          switch (response.data.data[2]){
            case 0:
              this.data = response.data.data[0]
              this.char = response.data.data[1]
              this.prettifyData()
              break;
            case 1:
              this.type = 1
                this.data = {
                  x : response.data.data[0],
                  y : response.data.data[1]
                }
              break;
          }
        }
      })
    },
    prettifyData(){
      this.data.map(elem => {
        elem.pretti_x = elem.x - this.char.x
        elem.pretti_y = elem.y - this.char.y
        return elem
      })

      this.char.pretti_x = 0
      this.char.pretti_y = 0

    },
    draw(){
      if(this.data) {
        switch (this.type) {
          case 0:
            let coord = this.mouse.getСoord()
            if(coord){
              this.data.forEach(elem => {
                if(coord.x > 500 + (elem.pretti_x * 40)
                    && coord.x < 500 + (elem.pretti_x * 40) + 20
                    && coord.y > 500 + (elem.pretti_y * 40)
                    && coord.y < 500 + (elem.pretti_y * 40) + 20){
                  elem.over = true
                  this.over_node = elem
                  if(this.mouse.click){
                    if(Math.abs(this.char.pretti_x - elem.pretti_x) <= 1 && Math.abs(this.char.pretti_y - elem.pretti_y) <=1){
                      this.goTo(elem)
                    }
                  }
                }
                else {
                  elem.over = false
                }
              })
            }

            if(!this.data.some(elem =>{
              return elem.over
            })){
              this.over_node = false
            }

            this.ctx.clearRect(0,0,1000,1000)
            this.data.forEach(elem => {
              if(elem.over){
                this.ctx.fillStyle = 'red'
              }
              else if(elem.type == 0){
                this.ctx.fillStyle = 'yellow'
              }
              else if(elem.type == 1){
                this.ctx.fillStyle = 'black'
              }
              else if(elem.type == 2){
                this.ctx.fillStyle = 'green'
              }
              else if(elem.type == 3){
                this.ctx.fillStyle = 'aqua'
              }
              this.ctx.fillRect(500 + (elem.pretti_x * 40), 500 + (elem.pretti_y * 40),20,20)
            })
            this.ctx.fillStyle = 'blue'
            this.ctx.fillRect(500 + (this.char.pretti_x * 40), 500 + (this.char.pretti_y * 40),20,20)
            break;
            case 1:
              this.ctx.fillRect(0,0, this.data.x * 100, this.data.y * 100)
              break;
        }
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
    <canvas :style="can_style" width="1000" height="1000" ref="canvas"></canvas>
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





