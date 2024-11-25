<script>
import { useLogStore } from "@/stores/log";
import { mapState } from 'pinia';

export default {
  name: "Logger",
  data(){
    return{

    }
  },
  mounted() {

  },
  computed:{
    ...mapState(useLogStore, ['getLog'])
  },
  watch:{
    getLog: {
      handler(){
        setTimeout(()=>{
          document.getElementById('dd').lastElementChild.scrollIntoView()
        }, 500)
      },
      deep: true
    }
  },
}
</script>
<template>
  <div @click="test" id="logger">
    <ul id="dd">
      <li :id="'log_msg' + index" v-for="(log_item, index) in this.getLog">
        {{log_item}}
      </li>
    </ul>
  </div>
</template>
<style scoped>
 #logger ul{

 }
 #logger li{
   text-align: left;
 }
 ul{
   padding-inline-start: 4px!important;
   overflow-y: auto;
 }
  #logger{
    overflow-y: auto;
    font-size: 12px;
    position: fixed;
    top: 0;
    left: calc(100% - 250px);
    width: 250px;
    height: 100%;
    background-color: #c8c8c8;
    border: 10px solid #c8c8c8;
    border-image: url("/src/assets/img/border/border_long.png") 10 stretch stretch;
  }
</style>