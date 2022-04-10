<script>
  export default {



  }
</script>

<template>
  <main class="wrap">
      <slot>

      </slot>
  </main>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
  .wrap{
    background-color: black;
    overflow: auto;
    min-width: 100%;
    min-height: 100%;
    border: 95px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_long.png") 95 stretch stretch;
    padding-top: 50px;
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>