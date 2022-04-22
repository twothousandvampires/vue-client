export default class ImageData{

    constructor() {
        // environment
        this['background'] = new Image(),
        this['background'].src = './src/assets/img/bgs/1.png'

        //enemy

        this['skeleton warrior'] = new Image()
        this['skeleton warrior'].src = './src/assets/img/enemy/skeleton_warrior.png'

        this['undying squad'] = new Image()
        this['undying squad'].src = './src/assets/img/world/undying_squad.png'

        this['treasure'] = new Image()
        this['treasure'].src = './src/assets/img/world/treasure.png'

        this['city'] = new Image()
        this['city'].src = './src/assets/img/world/city.png'

        this['reaper enemy'] = new Image()
        this['reaper enemy'].src = './src/assets/img/enemy/reaper.png'

        this['weapon swing'] = new Image()
        this['weapon swing'].src = './src/assets/img/effects/weapon_swing.png'

        this['tile'] = new Image()
        this['tile'].src = './src/assets/img/strites/tiles.png'

        this['chain light'] = new Image()
        this['chain light'].src = './src/assets/img/effects/chain_light.png'

        this['chel'] = new Image()
        this['chel'].src = './src/assets/img/characters/chel.png'

        this['grim traveler'] = new Image()
        this['grim traveler'].src = './src/assets/img/characters/grim.png'

        this['skeleton skull'] = new Image()
        this['skeleton skull'].src = './src/assets/img/enemy/SkeletonSkull.png'
    }

    getImage(name){
        return this[name]
    }

}