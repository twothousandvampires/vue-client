export default class Music{

    static background_audio = new Audio()
    static volume = 0

    static bg_music_folder = './src/music/background/'
    static bg_music_pull = [
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
        }
    ]

    constructor() {
        this.bg_is_play = false
        this.bg_song = 0
        this.bg_start_handler = this.bg_play_start.bind((this))
        this.bg_end_handler = this.bg_play_stop.bind((this))
        window.addEventListener('click', this.bg_start_handler)
        Music.background_audio.addEventListener('ended', ()=>{
            this.bg_song ++
            this.bgPlayNext()
        })
    }

    bgPlayNext(){
        Music.background_audio.src = Music.bg_music_folder +  Music.bg_music_pull[this.bg_song].music_src
        Music.background_audio.load()
        this.resetVolume()
    }

    bg_play_start(){
        this.bgPlayNext()
        window.removeEventListener('click', this.bg_start_handler)
    }
    bg_play_stop(){
        this.bg_is_play = false
        Music.background_audio.src = Music.bg_music_folder +  Music.bg_music_pull[this.bg_song].music_src
        Music.background_audio.pause()
        window.removeEventListener('click',this.bg_play_start)
    }

    resetVolume(){
        Music.volume = 0
        Music.background_audio.volume = 0
        Music.background_audio.play()
        let volume_level = setInterval(()=>{
            Music.volume += 0.005
            Music.background_audio.volume = Music.volume
            if(Music.volume >= 0.2){
                clearInterval(volume_level)
            }
        },500)
    }
}