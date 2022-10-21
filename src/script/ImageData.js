export default class ImageData{

    constructor() {
        // Environment
        this['rock'] = new Image()
        this['rock'].src = './src/assets/img/rocks/rock.png'

        this['background'] = new Image(),
        this['background'].src = './src/assets/img/bgs/1.png'

        //enemy

        this['arrow'] = new Image()
        this['arrow'].src = './src/assets/img/projectiles/arrow.png'

        this['fire_ball'] = new Image()
        this['fire_ball'].src = './src/assets/img/projectiles/fireball.png'

        this['skeleton warrior'] = new Image()
        this['skeleton warrior'].src = './src/assets/img/enemy/skeleton_warrior.png'

        this['skeleton archer'] = new Image()
        this['skeleton archer'].src = './src/assets/img/enemy/skeleton_archer.png'

        this['skeleton wizard'] = new Image()
        this['skeleton wizard'].src = './src/assets/img/enemy/skeleton_wizard.png'

        this['undying squad'] = new Image()
        this['undying squad'].src = './src/assets/img/world/undying_squad.png'

        this['treasure'] = new Image()
        this['treasure'].src = './src/assets/img/world/treasure.png'

        this['city'] = new Image()
        this['city'].src = './src/assets/img/world/city.png'

        this['reaper enemy'] = new Image()
        this['reaper enemy'].src = './src/assets/img/enemy/reaper.png'

        this['fire explosion'] = new Image()
        this['fire explosion'].src = './src/assets/img/effects/explosion_fire.png'

        this['weapon swing'] = new Image()
        this['weapon swing'].src = './src/assets/img/effects/weapon_swing.png'

        this['tile'] = new Image()
        this['tile'].src = './src/assets/img/strites/tiles.png'

        this['chain light'] = new Image()
        this['chain light'].src = './src/assets/img/effects/chain_light.png'

        this['chel'] = new Image()
        this['chel'].src = './src/assets/img/characters/grim.png'

        this['grim traveler'] = new Image()
        this['grim traveler'].src = './src/assets/img/characters/grim.png'

        this['skeleton skull'] = new Image()
        this['skeleton skull'].src = './src/assets/img/enemy/SkeletonSkull.png'
    }

    getImage(name){
        return this[name]
    }

}