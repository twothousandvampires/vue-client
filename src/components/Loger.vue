<script>
export default {
  name: "Loger",
  props: {
    log: Object
  }
}
</script>
<template>
  <div id="loger">
    <ul>
      <li v-for="log_item in log.list">
        {{log_item}}
      </li>
    </ul>
  </div>
</template>
<style scoped>
 #loger ul{
   list-style-type: none;
 }
  #loger{
    font-size: 12px;
    position: fixed;
    top: 5%;
    left: 80%;
    width: 250px;
    height: 700px;
    background-color: #c8c8c8;
    border: 10px solid #c8c8c8;
    border-image: url("/src/assets/img/border/border_long.png") 10 stretch stretch;
  }
</style>