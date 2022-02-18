<script>
class Node{
  constructor(x,y,id,links) {
    this.x = x
    this.y = y
    this.id = id
    this.links = links
  }
}
export default {
  data(){
    return {
      nodes : [],
      filled : false,
      ctx : undefined,
      can_to_link : []
    }
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d')
    let node = new Node(0,0,this.nodes.length + 1,4)
    this.nodes.push(node)
    this.can_to_link.push(node)
    setInterval(()=>{
      this.draw()
    },50)
  },
  methods : {
    findNode(x,y){
      for(let i = 0; i < this.nodes.length; i++){
        if(this.nodes[i].x === x && this.nodes[i].y === y){
          return this.nodes[i]
        }
      }
      return false
    },
    getParent(){
      return this.can_to_link[Math.floor(Math.random() * this.can_to_link.length)]
    },
    checkWay(x, y , parent){
      let n_node = this.findNode(x,y+1)
      let s_node = this.findNode(x,y-1)
      let w_node = this.findNode(x-1,y)
      let e_node = this.findNode(x+1,y)
      if(n_node && n_node !== parent){
        return false
      }if(s_node && s_node !== parent){
        return false
      }if(w_node && w_node !== parent){
        return false
      }if(e_node && e_node !== parent){
        return false
      }
      return true
    },
    draw(){
      this.ctx.clearRect(0,0,1000,1000)
      this.nodes.forEach(elem => {
        this.ctx.fillRect(elem.x + 500 + (elem.x * 12), elem.y + 500 + (elem.y * 12),6,6)
      })
      // this.createNode()
    },
    createNode(){
      let parent = this.getParent()
      let avalaible_nodes = [
          [parent.x , parent.y - 1],
          [parent.x , parent.y + 1],
          [parent.x + 1, parent.y],
          [parent.x - 1 , parent.y],
      ]
      let n = []

      avalaible_nodes.forEach(elem => {
        if(this.checkWay(elem[0],elem[1],parent)){
          n.push(elem)
        }
      })

      let new_node = n[Math.floor(Math.random() * n.length)]

      if(new_node){
        new_node = new Node(new_node[0],new_node[1],parent.id + 1, Math.ceil(Math.random() * 2))
        this.nodes.push(new_node)
        this.can_to_link.push(new_node)


        parent.links -= 1
        if(parent.links === 0){
         this.can_to_link.splice(this.can_to_link.indexOf(parent),1)
        }
      }
      else {
        this.can_to_link.splice(this.can_to_link.indexOf(parent),1)
      }
    }
  }
}
</script>

<template>
  <p>Кан ту линк - {{this.can_to_link.length}}</p>
  <p>Всего - {{this.nodes.length}}</p>
<!--  <canvas @click="createNode" ref="canvas" width="1000" height="1000"></canvas>-->
</template>
<style>

canvas{
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}
</style>





