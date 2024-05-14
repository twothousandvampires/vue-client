// import Input from "./Input";
//
// let instance;
// const listener = () => {
//     if(Input.inited){
//         instance.startPlay()
//     }
//     window.removeEventListener('click', listener)
// }
//
// class Player {
//     constructor() {
//         this.music = new Audio()
//         this.bg_music_folder = './src/music/background/'
//         if (instance) {
//             throw new Error("New instance cannot be created!!");
//         }
//         this.music_pull = [
//             {
//                 song_name: 'The Majestic Kingdom',
//                 album: 'Ethereal Hymns Split (2021)',
//                 artist: 'Piva',
//                 folder_name: 'Elminster_x_Piva',
//                 music_src: 'Elminster_x_Piva/Piva - The Majestic Kingdom.mp3'
//             },
//             {
//                 song_name: 'Ode To Louise Claude De Saint-Martin',
//                 album: 'Split (2021)',
//                 artist: 'Mystery Science',
//                 folder_name: 'Magicians_Spellbook_&_Elminster_&_Fogmoon_Tower_&_Mystery_Science',
//                 music_src: 'Magicians_Spellbook_&_Elminster_&_Fogmoon_Tower_&_Mystery_Science/Mystery Science - Ode To Louise Claude De Saint-Martin.mp3'
//             }
//         ]
//         this.song = this.music_pull[Math.floor(Math.random() * this.music_pull.length)]
//         this.volume = 0
//         instance = this;
//         window.addEventListener('click', listener)
//     }
//
//     startPlay(){
//         this.music.src = this.bg_music_folder +  this.song.music_src
//         this.music.load()
//         this.music.play()
//         let volume_level = setInterval(()=>{
//             this.volume += 0.005
//             this.music.volume = this.volume
//             if(this.volume >= 0.3){
//                 clearInterval(volume_level)
//             }
//         },500)
//     }
// }
//
// let playerInstance = new Player();
//
// export default playerInstance;