export default class ImageData{

    constructor() {
        this.system_1_not_visited = new Image()
        this.system_1_not_visited.src = './src/assets/img/solar_systems/system_2_not_visited.png'

        this.system_1_visited = new Image()
        this.system_1_visited.src = './src/assets/img/solar_systems/system_2_visited.png'

        this.system_2_not_visited = new Image()
        this.system_2_not_visited.src = './src/assets/img/solar_systems/system_2_not_visited.png'

        this.system_2_visited = new Image()
        this.system_2_visited.src = './src/assets/img/solar_systems/system_2_visited.png'

        this.background = new Image(),
        this.background.src = './src/assets/img/bgs/1.png'

        this.green_frame = new Image()
        this.green_frame.src = './src/assets/img/utility/free_way_frame.png'


        this.red_frame = new Image()
        this.red_frame.src = './src/assets/img/utility/enemy_frame.png'

        this.young= new Image()
        this.young.src = './src/assets/img/characters/young.png'

        this.shadow = new Image()
        this.shadow.src = './src/assets/img/solar_systems/shadow.png'

        this.shadow_enemy = new Image()
        this.shadow_enemy.src = './src/assets/img/enemy/shadow.png'

        this.reaper_enemy = new Image()
        this.reaper_enemy.src = './src/assets/img/enemy/reaper.png'

        this.weapon_swing = new Image()
        this.weapon_swing.src = './src/assets/img/effects/weapon_swing.png'

        this.chain_light = new Image()
        this.chain_light.src = './src/assets/img/effects/chain_light.png'
    }

    getImage(name){
        return this[name]
    }

}