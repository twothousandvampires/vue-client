<script>
export default {
  name: "NodeModal.vue",
  props:{
    mouse : Object,
    over_node : Object
  },
  mounted() {

  },
  methods:{

  },
  computed:{
    cssVars () {
      return{
        /* variables you want to pass to css */
        '--top': this.mouse.y - 180 + 'px',
        '--left': this.mouse.x - 120 + 'px',
      }
    }
  }
}
</script>

<template>

  <div :style="cssVars">

    <p>s - {{this.over_node.s_link}}</p>
    <p>n - {{this.over_node.n_link}}</p>
    <p>e - {{this.over_node.e_link}}</p>
    <p>w - {{this.over_node.w_link}}</p>

  </div>

</template>

<style scoped>

div{
  background-color: antiquewhite;
  width: 150px;
  height: 150px;
  position: absolute;
  top: var(--top);
  left: var(--left);
}

</style>