<script>
export default {
  name: "ItemInspectModal",
  data(){
    return{
      item: undefined,
      show: false,
      x: 0,
      y: 0
    }
  },
  mounted() {

  }
}
</script>
<template>
  <div v-if="this.show" id="inspect-item-modal" :style="{ top: y - 20 + 'px', left: x - 20 + 'px' }" v-on:mouseleave="$emit('mouseleave')">
    <p>{{item.name}}</p>
    <div v-if="item.type === 'skill_gem'">
      <p @click.prevent="$emit('inspectGem',$event, this.item)">Inspect</p>
    </div>
    <p @click.prevent="$emit('deleteItem', this.item)">Delete</p>
  </div>
</template>
<style scoped>
  #inspect-item-modal{
    background-color: yellow;
    position: fixed;
    z-index: 100000;
  }
</style>