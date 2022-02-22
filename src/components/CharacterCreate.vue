<script>
export default {
  data(){
    return{
      character_class : 'young_star',
      character_name : ''
    }
  },
  methods:{
    selectClass(e){
      this.character_class = e.target.value
    },
    inputName(e){
      this.character_name = e.target.value
    },
    create(e){
      e.preventDefault()
      if(this.character_name !== ''){
        axios({method: 'post', url: '//127.0.0.1:8000/api/character/create/' + localStorage.getItem('user_id'), headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }, data : {
            name : this.character_name,
            class_name : this.character_class
          }})
            .then( (response)=>{
              location.href = '/'
            })
      }
    }
  },
  name: "CharacterCreate.vue"
  ,computed:{
    classImage(){
      return 'src/assets//img/' + this.character_class + '.jpg'
    }
  }
}
</script>

<template>
  <div class="modal">
    <form>
      <input class="input" @input="inputName" v-bind:value="character_name" >
      <select class="input" @input="selectClass" v-bind:value="character_class">
        <option value="young_star" selected>Young</option>
        <option value="old_star">Old</option>
        <option value="middle_age_star">Middle age</option>
      </select>
      <button class="btn" @click="create">Create</button>
    </form>
    <img width="200" height="320" :src="classImage" alt="">
  </div>
</template>

<style scoped>

  .btn{
    background-color: snow;
    border: 2px solid aqua;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: 2px solid antiquewhite;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    position: absolute;
    background-color: darkcyan;
    width: 400px;
    height: 600px;
  }
  form{
    padding: 6px;
    display: flex;
    flex-direction: column;
  }
  .input{
    margin-bottom: 10px;
    border: none;
    padding: 6px;
  }

</style>