<script>
export default {
  name: "SkillTree",
  props : {
    char : Object
  },
  data(){
    return{
      page : 'combat',
      clicked_skill : undefined
    }
  },
  methods:{
    setPage(page){
      this.page = page
    },
    skillClick(item){
      this.clicked_skill = item
    }
  }

}
</script>

<template>
  <div v-if="this.clicked_skill" id="skill_modal">
    <div class="skill_main">
      <div class="skill_main_info">
        <div id="skill_img">
          <img :src=this.clicked_skill.img_path alt="">
        </div>
        <div id="skill_info">
          <p>{{this.clicked_skill.name}}</p>
          <p>{{this.clicked_skill.description}}</p>

        </div>
      </div>
      <div class="skill_main_level_status">
        <p>Текущий уровень {{this.clicked_skill.level}}</p>
        <p>{{this.clicked_skill.getLevelProgress()}}</p>
      </div>
    </div>
    <div id="skill_childs">
      <div v-for="(item) in this.clicked_skill.childs">
        <div class="skill_main">
          <div class="skill_main_info">
            <div class="skill_img">
              <img :src=item.img_path alt="">
            </div>
            <div class="skill_info">
              <p>{{item.name}}</p>
              <p>{{item.description}}</p>
            </div>
          </div>
          <div id="skill_main_level_status">
            <p>Текущий уровень {{item.level}}</p>
            <p>{{item.getLevelProgress()}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="tree_wrap">
    <div id="page">
      <div id="menu">
        <p @click="setPage('combat')">Fight</p>
        <p @click="setPage('sorcery')">Sorcery</p>
        <p @click="setPage('travel')">Travel</p>
        <p @click="setPage('active')">Active</p>
      </div>
      <div id="skills">
        <div @click="skillClick(item)" id="skill" v-for="(item) in char.skill_tree.getPassives(this.page)">
          <p>{{item.name}}</p>
          <img :src=item.img_path alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  p{
    white-space: pre-line
  }
  #skill_main{
    display: flex;
    flex-direction: row;
  }
  #skill_main_info{
    display: flex;
    flex-direction: row;
  }
  #skill_main_info img {
    width: 100px;
    height: 100px;
  }
  #skill_modal{
    background-color: white;
    border: 5px solid #40c4c8;
    border-image: url('/src/assets/img/border/border_big.png') 5 stretch stretch;
    color: black;
    position: absolute;
    z-index: 100000;
    margin-top: auto;
    margin-right: auto;
  }
  #skill{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #skill img {
    width: 70px;
    height: 70px;
  }
  #skills{
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-around;
  }
  #menu{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #menu p {
    cursor: pointer;
  }
  #page{
    display: flex;
    flex-direction: row;
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