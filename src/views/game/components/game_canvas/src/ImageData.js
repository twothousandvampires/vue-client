import GameConfig from "./GameConfig";
export default class ImageData{

    static img_list = [
        {
            name: 'grim',
            format: 'png'
        },
        {
            name: 'underground_tiles',
            format: 'png'
        },
        {
            name: 'undying_squad',
            format: 'png'
        }
    ]
    constructor() {
        this.img_map = new Map()
        this.load()
        // Environment
        this['rock'] = new Image()
        this['rock'].src = './src/assets/img/rocks/rock.png'

        this['background'] = new Image(),
        this['background'].src = './src/assets/img/bgs/4.png'

        //enemy

        this['arrow'] = new Image()
        this['arrow'].src = './src/assets/img/Projectiles/arrow.png'

        this['fire_ball'] = new Image()
        this['fire_ball'].src = './src/assets/img/Projectiles/fireball.png'

        this['fear_skull'] = new Image()
        this['fear_skull'].src = './src/assets/img/Projectiles/fear_skull.png'

        this['fear'] = new Image()
        this['fear'].src = './src/assets/img/Status/fear.png'

        this['ghost_grip'] = new Image()
        this['ghost_grip'].src = './src/assets/img/Status/ghost_grip.png'

        this['fury_of_the_dead'] = new Image()
        this['fury_of_the_dead'].src = './src/assets/img/Status/fury_of_the_dead.png'

        this['magic_explosion'] = new Image()
        this['magic_explosion'].src = './src/assets/img/effects/magic_explosion.png'

        this['soul_vortex'] = new Image()
        this['soul_vortex'].src = './src/assets/img/effects/soul_vortex.png'

        this['skeleton warrior'] = new Image()
        this['skeleton warrior'].src = './src/assets/img/enemy/skeleton_warrior1.png'

        this['ghost'] = new Image()
        this['ghost'].src = './src/assets/img/enemy/ghost.png'

        this['skull'] = new Image()
        this['skull'].src = './src/assets/img/enemy/skull.png'

        this['lich'] = new Image()
        this['lich'].src = './src/assets/img/enemy/lich.png'

        this['skeleton archer'] = new Image()
        this['skeleton archer'].src = './src/assets/img/enemy/skeleton_archer1.png'

        this['skeleton wizard'] = new Image()
        this['skeleton wizard'].src = './src/assets/img/enemy/skeleton_wizard1.png'

        this['pile_of_skull'] = new Image()
        this['pile_of_skull'].src = './src/assets/img/enemy/pile_of_skull.png'

        this['giant undead'] = new Image()
        this['giant undead'].src = './src/assets/img/enemy/giant_undead.png'

        this['undying squad'] = new Image()
        this['undying squad'].src = './src/assets/img/world/undying_squad.png'

        this['treasure'] = new Image()
        this['treasure'].src = './src/assets/img/world/treasure.png'

        this['reaper enemy'] = new Image()
        this['reaper enemy'].src = './src/assets/img/enemy/reaper.png'

        this['fire explosion'] = new Image()
        this['fire explosion'].src = './src/assets/img/effects/explosion_fire.png'

        this['raise_the_undead'] = new Image()
        this['raise_the_undead'].src = './src/assets/img/effects/raise_the_undead.png'

        this['mist'] = new Image()
        this['mist'].src = './src/assets/img/effects/black_mist.png'

        this['weapon swing'] = new Image()
        this['weapon swing'].src = './src/assets/img/effects/weapon_swing.png'

        this['tile'] = new Image()
        this['tile'].src = './src/assets/img/world/underground_tiles.png'

        this['chain light'] = new Image()
        this['chain light'].src = './src/assets/img/effects/chain_light.png'

        this['chel'] = new Image()
        this['chel'].src = './src/assets/img/characters/grim.png'

        this['grim traveler'] = new Image()
        this['grim traveler'].src = './src/assets/img/characters/grim.png'

        this['skeleton skull'] = new Image()
        this['skeleton skull'].src = './src/assets/img/enemy/SkeletonSkull.png'

        this['wandering clot'] = new Image()
        this['wandering clot'].src = './src/assets/img/Projectiles/wandering_clot.png'

        this['wandering clot end'] = new Image()
        this['wandering clot end'].src = './src/assets/img/effects/wandering_clot_end.png'
    }

    load(){
        ImageData.img_list.forEach(elem => {
            let img = new Image()
            img.src = GameConfig.img_src_url + elem.name + '.' + elem.format
            this.img_map.set(elem.name, img)
        })
    }

    getImage(name){
        return this.img_map.get(name)
    }
    load(){
        ImageData.list.forEach(elem => {
            let img = new Image()
            img.src = GameConfig.img_url + elem.name + '.' + elem.format
            this.img_map.set(elem.name, img)
        })
    }
}