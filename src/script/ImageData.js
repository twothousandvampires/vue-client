export default class ImageData{

    constructor() {
        this.system_1_not_visited = new Image()
        this.system_1_not_visited.src = './src/assets/img/solar_systems/system_1_not_visited.png'

        this.system_1_visited = new Image()
        this.system_1_visited.src = './src/assets/img/solar_systems/system_1_visited.png'

        this.system_2_not_visited = new Image()
        this.system_2_not_visited.src = './src/assets/img/solar_systems/system_2_not_visited.png'

        this.system_2_visited = new Image()
        this.system_2_visited.src = './src/assets/img/solar_systems/system_2_visited.png'

        this.background = new Image(),
        this.background.src = './src/assets/img/bgs/1.jpg'

        this.green_frame = new Image()
        this.green_frame.src = './src/assets/img/utility/free_way_frame.png'


        this.red_frame = new Image()
        this.red_frame.src = './src/assets/img/utility/enemy_frame.png'
    }

    getImage(name){
        return this[name]
    }

}