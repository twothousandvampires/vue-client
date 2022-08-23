<script>
export default {
  name: "PlayerInventory",
  props: {
    char: Object
  }
}
</script>
<template>
  <div id="inv">
    <div id ="utility">
      <p @click="$emit('createItem')">
        create item
      </p>
    </div>
    <div id="items">
      <div class="inv_item"  v-for="item in char.inv.pull.slice(9,29)" >
        <div @contextmenu="$emit('contextClick',$event, item)" v-on:mouseover="$emit('mouseover', item)" v-on:mouseleave="$emit('mouseleave')" @click="$emit('clickItem',item)" :title="item.getDescription()" v-bind:class="{clicked: item?.clicked}" class="slot">
          <img :src="item.getImagePath()" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .empty_slot{
    height: 100%;
  }
  #utility{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
  #utility p{
    padding: 10px;
    background-color: #f2f2f2;
    cursor: pointer;
  }
  #items{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .inv_item{
    background-color: grey;
    border: 4px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_big.png") 4 stretch stretch;
    margin: 4px;
    width: 100px;
    height: 100px;
  }
  .slot{
    width: 100%;
    height: 100%;
  }
  #empty{
    min-width: 100px;
    min-height: 100px;
    background-color: dimgrey;
  }
  #inv{
    color:black;
    background-color: #e1e1e1;
    width: 30%;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .clicked{
    border: 10px solid;
    border-image: url('/src/assets/img/border/equip_clicked_border.png') 16 stretch stretch;
  }
  .slot img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;

    width: 60px;
    height: 60px;
  }
  p{
    font-size: 16px;
    font-weight: bold;
    color:#4b4b4b;
  }
</style>