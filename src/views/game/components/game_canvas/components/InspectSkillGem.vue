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
    }
  },
  mounted() {

  },
  methods:{

    set(x, y, item){
      this.x = x
      this.y = y
      this.show = true
      this.item = item
    },
    close(){
      this.show = false
      this.item = undefined
    },
  },
}
</script>
<template>
  <div v-if="this.show" id="inspect-skill-gem" :style="{ top: y + 20 + 'px',
                                                            left: x + 20 + 'px',
                                                            width: width + 'px',
                                                            height: height + 'px' }">
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <div>
        <img width="80" height="80" :src="item.getImagePath()" alt="">
      </div>
      <div v-if="item.item_type === 1">
        <p><span class="value">{{ item.name }} <span v-if="item.inc_effect">({{item.inc_effect}}%)</span></span></p>
        <p>class: <span class="value">{{ item.getClassString() }}</span></p>
        <p>type: <span class="value">{{ item.getTypeString() }}</span></p>
        <p>quality:<span class="value">{{ item.getQualityString() }}</span></p>

        <div v-for="prop in item.props">
          <p v-if="prop.requared_slot">requared slot: {{prop.requared_slot + 1}}</p>
          <p>{{prop.name}}:  {{prop.getDescription()}}</p>
        </div>
      </div>
      <div v-else>
        <p><span class="value">{{ item.name }}</span></p>
        <p><span class="value">{{ item.getDescription() }}</span></p>
        <p v-if="item.power">power: <span class="value">{{ item.power }}</span></p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #inspect-skill-gem{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background-color: #00994d;
    position: fixed;
    z-index: 100000;
    border: 3px solid #5cd65c;
  }
  #inspect-skill-gem::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
  .value{
    color: rgb(44, 62, 80);
  }
</style>