<script>
export default {
  data(){
    return {
      filled : false
    }
  },
  methods : {
    draw(){
      if(!this.filled){
        let ctx =  this.$refs.canvas.getContext('2d')
        ctx.fillRect(0,0,100,100)
        this.filled = !this.filled
      }
      else{
        let ctx =  this.$refs.canvas.getContext('2d')
        ctx.clearRect(0,0,100,100)
        this.filled = !this.filled
      }
    }
  }
}
</script>

<template>

  <canvas @click="draw" ref="canvas" width="100" height="100">

  </canvas>

</template>
<style>

canvas{
    width: 100px;
    height: 100px;
}

</style>





