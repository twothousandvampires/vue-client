<script>
export default {
  name: "SkillTree",
  props : {
    char : Object
  },
  data(){
    return{
      page : 'combat'
    }
  },

}
</script>

<template>
  <div id="tree_wrap">
    <div id="page">
      <div v-if="this.page === 'combat'">
        <div v-for="(item) in char.skill_tree.getPassives(this.page)">
          <p>{{item.name}}</p>
          <img :src=item.img_path alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #page{
    background-color: #c8c8c8;
    width: 100%;
  }
  #tree_wrap{
    left: 0;
    top:0;
    border: 25px solid #40c4c8;
    border-image: url('/src/assets/img/border/border_long.png') 0 stretch stretch;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: fixed;
  }
</style>