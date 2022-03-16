<script>
import Character from "../script/Character/Character.js";
export default {
  name: "CharacterSingleInfo",
  props : {
    character : Object
  },
  data(){
    return{
      char : new Character(this.character)
    }
  },
  mounted() {

  },
  methods : {
    classImage(str){
      return 'src/assets/gif/' + str + '.gif'
    },
    play(id,e){
      e.preventDefault()
      localStorage.setItem('char_id', id)
      location.href = '/world'
    },
    delete_char(char_id, e){
      e.preventDefault()
      axios({method: 'post',
        url : '//127.0.0.1:8000/api/character/delete',
        data : {
          user_id : localStorage.getItem('user_id'),
          char_id : char_id
        },
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }).then(response =>{
        if(response.data.success){
          location.href = '/'
        }
        else {
          alert('!')
        }
      })
    }
  }
}
</script>

<template>
  <div>
    <div id="info-head">
      <p class="stat-elem">{{ char.name }}</p>
      <p>Level<span class="stat-elem">{{ char.level }}</span></p>
    </div>
    <div id="info-body">
      <img width="180" height="240" :src="classImage(char.class)" alt="">
      <div id="info-stats">
        <p>
          <img title="life" src="@/assets/img/icons/life_icon.png" alt="life">
          <span class="stat-elem">{{ char.life }} / {{ char.max_life }}</span>
        </p>
        <p>
          <img title="energy" src="@/assets/img/icons/energy_icon.png" alt="energy">
          <span class="stat-elem">{{ char.energy }} / {{ char.max_energy }}</span>
        </p>
        <p>
          <img title="damage" src="@/assets/img/icons/sword.png" alt="damage">
          <span class="stat-elem">{{ char.min_damage }} - {{ char.max_damage }}</span>
        </p>
      </div>
    </div>
    <div id="info-bottom">
      <button  @click="play(char.id, $event)">Play</button>
      <button  @click="delete_char(char.id, $event)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
  .stat-elem{
    font-weight: bold;
    font-size: 24px;
    margin-left: 8px;
  }
  #info-head{
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #info-head p{
    font-weight: bold;
  }
  #info-body{
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #info-stats{
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  #info-bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #info-bottom button{
    padding: 6px;
    border: none;
    cursor: pointer;
    width: 100px;
    background-color: #f8f8f8;
  }
</style>