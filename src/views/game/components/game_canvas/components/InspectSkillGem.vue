<script>

export default {
  name: "InspectSkillGem",
  props : {
    player: Object
  },
  data(){
    return{
      item: undefined,
      show: false,
      y: 0,
      x: 0,
      width: 800,
      height: 600
    }
  },
  mounted() {

  },
  methods:{

    set(x, y, item){
      this.x = window.innerWidth/2 - this.width/2
      this.y = window.innerHeight/2 - this.height/2
      this.show = true
      this.item = item
    },
    close(){
      this.show = false
      this.item = undefined
    },
    async upgradeSkill(){
      let need = this.skill.level * this.skill.exp_needed
      let skill = this.skill
      if(this.player.exp >= need){
        let ApiResponse = await axios({
          method: 'post',
          url: '//127.0.0.1:8000/api/skill/' + skill.id + '/up',
          data : {
            exp_cost: need,
            player_id: this.player.id
          },
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
        if(ApiResponse.data.success){
          this.skill.levelUp()
          this.player.exp -= need
        }
        else {
          alert(ApiResponse.data?.msg)
        }
      }
      else {
        alert('not enough experience!')
      }
    },
    async unlockAmplifications(){
      let player_exp = this.player.exp
      let unlock_cost = this.item.getUpgradeAmpExpCost()
      let cost_multy = 1 + this.skill.amplifications.size

      let total_cost = unlock_cost * cost_multy

      if(total_cost <= player_exp){
        let response = await axios({
          method: 'post',
          url: '//127.0.0.1:8000/api/item/amplifications/',
          data : {
            item_id : this.item.id,
            exp_cost: total_cost,
            player_id: this.player.id
          },
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
        if(response.data.success){
          this.skill.setAvailableAmplifications(response.data.data)
          this.player.exp -= total_cost
        }
        else {
          alert(response.data.msg)
        }
      }
      else {
        alert('not enough experience!')
      }

    },
    async upAmplification(id){
      let ApiResponse = await axios({
        method: 'post',
        url: '//127.0.0.1:8000/api/amplification/' + id + '/up',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
      if(ApiResponse.data.success){
        this.skill.setAmplifications(ApiResponse.data.data)
      }
    },
    async upgradeAmplification(amp){
      if(amp.level >= amp.max_level){
        alert('max level!')
        return
      }
      let need = amp.exp_needed * amp.level
      if(this.player.exp < need){
        alert('not enought exp!')
        return
      }
      let ApiResponse = await axios({
        method: 'post',
        url: '//127.0.0.1:8000/api/amplification/' + amp.id + '/upgrade',
        data : {
          exp_cost: need,
          player_id: this.player.id
        },
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
      if(ApiResponse.data.success){
        this.skill.upgradeAmplification(ApiResponse.data.data)
        this.player.exp -= need
      }
      else {
        alert(response.data.msg)
      }
    }
  },
  computed:{
    skill: function () {
      return this.item.skill
    }
  },
}
</script>
<template>
  <div v-if="this.show" id="inspect-skill-gem" :style="{ top: y + 'px', left: x + 'px', width: width + 'px', height: height + 'px' }">
    <div>
      <p @click="close" style="cursor: pointer; font-size: 28px">close</p>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <div>
        <p>item name: <span class="value">{{item.name}}</span></p>
        <p>gem class:  <span class="value">{{item.getClassString()}}</span></p>
      </div>
      <div>
        <p>quality: <span class="value">{{item.getQualityString()}}</span></p>
        <p>gem type: <span class="value">{{item.getTypeString()}}</span></p>
      </div>
    </div>
    <div>
      <p>upgrade amplification cost: <span class="value">{{item.getUpgradeAmpExpCost()}}</span></p>
      <p>maximum amplifications: <span class="value">{{item.getMaxAmp()}}</span></p>
      <p v-if="skill.is_active_skill">reduce mana cost: <span class="value">{{item.getReduceManaCost()}}</span></p>
      <p>increase skill effect: <span class="value">{{item.getIncreaseSkillEffect()}}</span></p>
    </div>
    <div class="main-skill">
      <div style="padding: 6px">
        <img @click="upgradeSkill" width="120" height="120" :src="skill.getImgPath()">
      </div>
      <div>
        <p style="font-size: 32px; color: #2c3e50" >{{skill.name}}</p>
        <p>level: {{skill.level}}</p>
        <div class="skill-wrap">
          <div>
            <span v-html="skill.getSkillDescription()"></span>
          </div>
        </div>
        <div style="font-style: italic; font-size: 14px">
          &quot<span v-html="skill.getDescription()"></span>&quot
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="learned">
        <div class="skill-child" v-for="[key, value] in skill.amplifications">
          <p>{{value.name}}({{value.level}})</p>
          <div class="skill-wrap">
            <div>
              <img @click="upgradeAmplification(value)" title="click to upgrade" width="80" height="80" :src="value.img_path">
          </div>
            <div>
              <span v-html="value.getDescription()">

              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="offer" style="display: flex">
        <p v-if="skill.available_amplifications.size === 0" style="margin-top: 10px" id="unlock" @click="unlockAmplifications">unlock amplifications</p>
        <div class="skill-child" v-for="[key, value] in skill.available_amplifications">
          <p>{{value.name}}({{value.level}})</p>
          <div class="skill-wrap">
            <div>
              <img title="click to learn" @click="upAmplification(value.id)" width="80" height="80" :src="value.img_path">
            </div>
            <div>
              <span v-html="value.getDescription()">

              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .unlock_amp_button{

  }
  .bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .learned{
    width: 50%;
  }
  .offer{
    width: 50%;
  }
  #unlock{
    cursor: pointer;
  }
  .skill-wrap{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .skill-child{
    font-style: italic;
    font-size: 16px;
  }
  .main-skill{
    font-size: 24px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  #inspect-skill-gem{
    overflow-y: auto;
    -ms-overflow-style: none;
    width: content-box;
    color: black;
    border: 16px solid;
    border-image: url('/src/assets/img/border/equip_clicked_border.png') 16 stretch stretch;
    background-color: #888888;
    position: fixed;
    z-index: 100000;
    scrollbar-width: none;
  }
  #inspect-skill-gem::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
  .value{
    color: rgb(44, 62, 80);
  }
</style>