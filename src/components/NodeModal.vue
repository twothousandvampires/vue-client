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

    <p>Node {{this.over_node.nomenclature}}</p>

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