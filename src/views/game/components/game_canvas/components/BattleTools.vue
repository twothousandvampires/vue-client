<template>
  <div>

    <select v-model="create">
      <option  value="">no</option>
      <option v-for="item in list" :value="item">{{item}}</option>
    </select>
    <p @click="create_enemy">create</p>
  </div>
</template>

<script>
import EnemyFactory from "../src/Scr/factories/EnemyFactory";
import Battle from "../src/Battle";

const enemy_creator = new EnemyFactory()
export default {
  name: "BattleTools",
  props:{
    f_context: Object
  },
  data(){
    return{
      create: '',
      list: []
    }
  },
  methods:{
    create_enemy(){
      if(!this.f_context instanceof Battle){
        return
      }
      if(this.create !== ''){
        let enemy = enemy_creator.create(this.create, this.f_context)
        this.f_context.addEnemyToBattle(enemy, 650, 650)
      }
    }
  },
  mounted() {
    axios({
      url: '//127.0.0.1:8000/api/enemy_list',
      headers : {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then((r)=>{
      this.list = r.data.data
    })
  }
}
</script>

<style scoped>
div{
  position: fixed;
  top: 300px;
  left:100px;
  cursor: pointer;
}
</style>