export default class ImageData{

    constructor() {
        // envaronment
        this.background = new Image(),
        this.background.src = './src/assets/img/bgs/1.png'

        this.young= new Image()
        this.young.src = './src/assets/img/characters/young.png'


        //enemy
        this.shadow = new Image()
        this.shadow.src = './src/assets/img/solar_systems/shadow.png'

        this.shadow_enemy = new Image()
        this.shadow_enemy.src = './src/assets/img/enemy/skeleton_warrior.png'

        this.undying_squad = new Image()
        this.undying_squad.src = './src/assets/img/enemy/undying_squad.png'

        this.reaper_enemy = new Image()
        this.reaper_enemy.src = './src/assets/img/enemy/reaper.png'

        this.weapon_swing = new Image()
        this.weapon_swing.src = './src/assets/img/effects/weapon_swing.png'

        this.tile = new Image()
        this.tile.src = './src/assets/img/strites/tiles.png'

        this.chain_light = new Image()
        this.chain_light.src = './src/assets/img/effects/chain_light.png'

        this.chel = new Image()
        this.chel.src = './src/assets/img/characters/chel.png'

        this.grim = new Image()
        this.grim.src = './src/assets/img/characters/grim.png'
    }

    getImage(name){
        return this[name]
    }

}