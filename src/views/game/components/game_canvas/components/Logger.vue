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
        // setTimeout(()=>{
        //   document.getElementById('dd').lastElementChild.scrollIntoView()
        // }, 500)
      },
      deep: true
    }
  },
}
</script>
<template>
  <div @click="test" id="logger" style="color: #86c69a;font-size: 12px; padding-left: 14px;">
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
    z-index: 1111;
    overflow-y: auto;
    font-size: 12px;
    width: 240px;
    height: 800px;
    background-color: #2a1e23;
    background-image: url('/src/assets/img/loggettest.png');
  }
</style>