<script>
import requestService from "@/views/game/services/requestService";
import config from '/config'
export default {
  name: "PassivesAndSkills",
  props:{
    char: Object
  },
  data(){
    return{
      show: false,
      show_skill: false,
      learning_id: undefined,
      config
    }
  },
  methods:{
    async learn(id){
      let res = await requestService.serverRequest('learn_passive', { passive_id: id })
      this.char.parseStats(res.data.char)
      this.show = false
      this.closePassive()
    },
    async learnSkill(skill_id){
      if(this.learning_id) return

      this.learning_id = skill_id
      let res = await requestService.serverRequest('skill', { skill_id: skill_id})

      if(res.success){
        this.char.parseStats(res.data.char)
        this.show_skill = false
        this.closePassive()
      }
      else {
        alert(res.message)
      }
      this.learning_id = undefined
    },
    async upgradePassive(event, passive){
      if(this.learning_id) return

      this.learning_id = passive.id
      let res = await requestService.serverRequest('upgrade_passive', { passive_id: passive.id})
      if(res.success){
        this.char.parseStats(res.data.char)
        this.closePassive()
        let updated_passive = this.char.passives.find(elem => elem.id === passive.id)
        this.showPassive(event, updated_passive)
      }
      else {
        alert(res.message)
      }
      this.learning_id = undefined
    },
    showPassive(e, item){
      let wrap = document.createElement('div')
      wrap.id = 'inspect_passive_wrap'
      wrap.style.top = e.pageY + 10 + 'px'
      wrap.style.left = e.pageX + 10 +'px'
      wrap.style.zIndex = '9999999';
      wrap.innerText = item.getDescription()
      document.getElementById('app').append(wrap)
    },
    closePassive(){
      let w =  document.getElementById('inspect_passive_wrap')
      if(w) document.getElementById('app').removeChild(w)
    },
    showSkill(e, item){
      let wrap = document.createElement('div')
      wrap.id = 'inspect_skill_wrap'
      wrap.style.top = e.pageY + 10 +'px'
      wrap.style.left = e.pageX + 10 +'px'
      wrap.style.zIndex = '9999999';
      wrap.innerText = item.getDescription()
      document.getElementById('app').append(wrap)
    },
    closeSkill(){
      let w =  document.getElementById('inspect_skill_wrap')
      document.getElementById('app').removeChild(w)
    },
    async unlock(){
      this.show_skill = false
      if(this.char.available_passives.length){
        this.show = !this.show
      }
      else {
        let res = await requestService.serverRequest('unlock_passives')
        if(res.success){
          res.data.passives.forEach(elem => {
            this.char.addPassive(elem)
          })
          this.show = true
        }
        else {
          alert(res.message)
        }
      }
    },
    async unlockSkill(){
      this.show = false
      if(this.char.available_skills.length){
        this.show_skill = !this.show_skill
      }
      else {
        let res = await requestService.serverRequest('unlock_skills')
        if(res.success){
          res.data.skills.forEach(elem => {
            this.char.addSkill(elem)
          })
          this.show_skill = true
        }
        else {
          alert(res.message)
        }
      }
    }
  }
}
</script>
<template>
  <div id="wrap">
    <div style="z-index: 2222222;width: 350px; display: flex;flex-direction: row; align-items: center; justify-content: space-between; border 3px solid" v-if="this.show" id="available_passives">
        <img @click="learn(passive.id)" v-for="passive in this.char.available_passives" @mouseleave="closePassive" @mouseenter="showPassive($event, passive)" width="80" height="80" :src="config.img_url + passive.img" alt="">
    </div>
    <div style="z-index: 2222222;width: 350px; display: flex;flex-direction: row; align-items: center; justify-content: space-between; border 3px solid" v-if="this.show_skill" id="available_passives">
       <img @click="learnSkill(skill.id)" @mouseleave="closeSkill" v-for="skill in this.char.available_skills" @mouseenter="showSkill($event, skill)" width="60" height="60" :src="config.img_url + skill.img" alt="">
    </div>
    <div>
      <p style="text-align: center">experience: {{char.exp}}</p>
    </div>
    <div style="display: flex; flex-direction: row">
      <div id="passives_wrap">
        <div :style="passive.id === this.learning_id ? 'opacity: 0.5' : ''" v-for="passive in this.char.passives">
          <img @mouseleave="closePassive" @mouseenter="showPassive($event, passive)" @click="upgradePassive($event,passive)" width="60" height="60" :src="config.img_url + passive.img" alt="">
        </div>
        <div>
          <img title="add passive" @click="unlock" width="60" height="60" src="/src/assets/img/add_passive.png" alt="add passive">
        </div>
      </div>
      <div style="width: 50%" id="skills_wrap">
        <div :style="skill.id === this.learning_id ? 'opacity: 0.5' : ''" v-for="skill in this.char.skill_pull">
          <img @click="learnSkill(skill.id)" @mouseleave="closeSkill" @mouseenter="showSkill($event, skill)" width="60" height="60" :src="config.img_url + skill.img" alt="">
        </div>
        <div>
          <img title="add skill" @click="unlockSkill" width="60" height="60" src="/src/assets/img/add_passive.png" alt="add skill">
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<style scoped>
  #available_passives {
    padding: 6px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #00994d
  }
  #passives_wrap{
    display: flex;
    flex-direction: column;
  }
  #wrap{
    width: 100%;
    height: 100%;
    background-color: #5cd65c;
    display: flex;
    flex-direction: column;
  }
  #passives_wrap, #skills_wrap{
    width: 50%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    grid-template-rows: repeat(3, 1fr);
    height: 100%;
  }
</style>