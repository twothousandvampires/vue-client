export default class Music{

    static background_audio = new Audio('./src/music/background/background_1.mp3')
    static volume = 0

    static playBackground(){
        Music.volume = 0
        Music.background_audio.volume = 0
        Music.background_audio.play()
        let volume_level = setInterval(()=>{
            Music.volume += 0.01
            Music.background_audio.volume = Music.volume
            if(Music.volume >= 0.2){
                clearInterval(volume_level)
            }
        },500)

    }

}