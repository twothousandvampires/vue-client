<script>

export default {
  data(){
    return {
      muted: false,
      is_played: false,
      bg_music_folder: './src/music/background/',
      song: false,
      music_pull: [
        {
          song_name: 'The Majestic Kingdom',
          album: 'Ethereal Hymns Split (2021)',
          artist: 'Piva',
          folder_name: 'Elminster_x_Piva',
          music_src: 'Elminster_x_Piva/Piva - The Majestic Kingdom.mp3'
        },
        {
          song_name: 'Ode To Louise Claude De Saint-Martin',
          album: 'Split (2021)',
          artist: 'Mystery Science',
          folder_name: 'Magicians_Spellbook_&_Elminster_&_Fogmoon_Tower_&_Mystery_Science',
          music_src: 'Magicians_Spellbook_&_Elminster_&_Fogmoon_Tower_&_Mystery_Science/Mystery Science - Ode To Louise Claude De Saint-Martin.mp3'
        },
        {
          song_name: 'Doorways Obscured by Wisps',
          album: 'Illusory Realms',
          artist: 'Keys to Oneiria',
          folder_name: 'Keys_to_Oneiria',
          music_src: 'Keys_to_Oneiria/Doorways Obscured by Wisps.mp3'
        },
        {
          song_name: 'To Call Upon the Fog',
          album: 'In the Kingdom of Fog(Split)',
          artist: 'Fogweaver',
          folder_name: 'Fog_Castle_x_Foglord_x_Fogweaver',
          music_src: 'Fog_Castle_x_Foglord_x_Fogweaver/Fogweaver - To Call Upon the Fog.mp3'
        },
        {
          song_name: 'Sanctuary of the Gemcarvers',
          album: 'In the Kingdom of Fog(Split)',
          artist: 'Fog Castle',
          folder_name: 'Fog_Castle_x_Foglord_x_Fogweaver',
          music_src: 'Fog_Castle_x_Foglord_x_Fogweaver_1/Fog Castle - Sanctuary of the Gemcarvers.mp3'
        },
        {
          song_name: 'A Patterning Spell',
          album: 'Magelight',
          artist: 'Fogweaver',
          folder_name: 'Fogweaver',
          music_src: 'Fogweaver/Fogweaver - A Patterning Spell.mp3'
        }
      ]
    }
  },
  created() {
    this.song = this.music_pull[Math.floor(Math.random() * this.music_pull.length)]
  },
  methods:{
    startPlay(){
      this.$refs.audio.src = this.getSrc
      this.$refs.audio.volume = 0
      this.$refs.audio.load()

      this.$refs.audio.play()

      this.volume_level = setInterval(()=>{
        this.$refs.audio.volume += 0.005
        if(this.$refs.audio.volume >= 0.3){
          clearInterval(this.volume_level)
        }
      },500)
    },
    mute(){
      if(this.muted){
        this.volume_level = setInterval(()=>{
          this.$refs.audio.volume += 0.005
          if(this.$refs.audio.volume >= 0.3){
            clearInterval(this.volume_level)
          }
        },500)
      }
      else {
        this.$refs.audio.volume = 0
        clearInterval(this.volume_level)
      }

      this.muted = !this.muted
    }
  },
  name: "AudioPlayer",
  components: {

  },
  computed:{
    getSrc: function (){
      return  this.bg_music_folder +  this.song.music_src
    },
    getImgSrc: function (){
      return  this.bg_music_folder +  this.song.folder_name + '/logo.jpg'
    }
  }
}
</script>
<template>
  <div v-if="this.song" class="player-wrap">
    <audio ref="audio"></audio>
    <div style="display: flex; flex-direction: row">
      <div>
        <img @click="mute" width="60" height="60" :src="getImgSrc">
      </div>
      <div style="display: flex; flex-direction: column;margin-left: 5px">
        <marquee style="color: wheat" scrolldelay="100" direction="left" scrollamount="1">{{this.song.song_name}}</marquee>
        <p>album - {{this.song.album}}</p>
        <p>artist - {{this.song.artist}}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .player-wrap{
    font-size: 10px;
    position: fixed;
    top:50px;
    left:250px;
    width: 300px;
    height: 80px;
    z-index: 10000;
  }
  p{
    color: white;
  }
</style>