<script>
import Mouse from "../script/Mouse";
import NodeModal from "../components/NodeModal.vue";
export default {

  data(){
    return {
      ctx : undefined,
      data : undefined,
      char : undefined,
      mouse : undefined,
      over_node : false
    }
  },
  components:{
    NodeModal
  },
  props:{
    char_id : String
  },
  mounted() {
    axios({method: 'post', url: '//127.0.0.1:8000/api/character/world/' + localStorage.getItem('user_id') + '/' + this.char_id, headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }}).then(response =>{
        if(response.data.success){
          console.log(response.data)
          this.data = response.data.data[0]
          this.char = response.data.data[1]
          setTimeout(()=>{
            this.ctx = this.$refs.canvas.getContext('2d')
            this.mouse = new Mouse(this.$refs.canvas)
            setInterval(()=>{
              this.draw()
            },50)
          },200)
          this.prettifyData()
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
        if(response.data.success){
          console.log(response.data.data)
          this.data = response.data.data[0]
          this.char = response.data.data[1]
          this.prettifyData()
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
      if(this.data){
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
          this.ctx.fillStyle = 'black'
          if(elem.over){
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(500 + (elem.pretti_x * 40), 500 + (elem.pretti_y * 40),20,20)
          }
          else {
            this.ctx.fillRect(500 + (elem.pretti_x * 40), 500 + (elem.pretti_y * 40),20,20)
          }
        })
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(500 + (this.char.pretti_x * 40), 500 + (this.char.pretti_y * 40),20,20)
      }
    },
  }
}
</script>

<template>
  <canvas v-if="data" width="1000" height="1000" ref="canvas"></canvas>
  <p v-else>Loading</p>
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





