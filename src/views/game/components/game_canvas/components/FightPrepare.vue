<script>

export default {
  name: "FightPrepare",
  props: {
    game: Object
  },
  mounted() {

  },
  methods:{
    items(){
      return this.game.char.getItems((elem) => { return elem.uses_in_fight})
    },
    skills(){
      return this.game.char.skill_pull
    }
  },
}
</script>
<template>
  <div id="wrap">
    <div style="display: flex; flex-direction: row">
      <div @click="item.charges_to_use = item.charges_to_use ? 0 : 1" v-for="item in this.items()" style="margin: 2px;border: 5px solid #008055; display: flex; flex-direction: row;justify-content: center;align-items: center" :style="item.charges_to_use ? 'border: 5px solid #00e699' :''" >
          <img :title="item.getDescription()" width="60" height="60" :src="item.getImagePath()" alt="">
      </div>
      <div @click="skill.uses_in_fight = !skill.uses_in_fight" v-for="skill in this.skills()" style="margin: 2px;border: 5px solid #008055; display: flex; flex-direction: row;justify-content: center;align-items: center" :style="skill.uses_in_fight ? 'border: 5px solid #00e699' :''">
          <img :title="skill.getDescription()" width="60" height="60" :src="skill.getImagePath()" alt="">
      </div>
    </div>
    <p style="cursor: pointer; text-align: center" @click="this.game.startBattle()">start</p>
  </div>
</template>

<style scoped>
  #wrap{
    background-color: #008055;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>