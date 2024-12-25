import config from "/config.js";
export default class ImageData{

    static img_list = [
        {
            name: 'grim2',
            format: 'png'
        },
        {
            name: 'underground_tiles',
            format: 'png'
        },
        {
            name: 'undying_squad',
            format: 'png'
        },
        {
            name: 'greenskin_prophet',
            format: 'png'
        },
        {
            name: 'lost_daylight',
            format: 'png'
        },
        {
            name: 'the_beehive_dragger',
            format: 'png'
        }, 
        {
            name: 'slime',
            format: 'png'
        }, 
        {
            name: 'naughty_piece_of_darkness',
            format: 'png'
        }, 
        {
            name: 'stinging_one',
            format: 'png'
        }, 
        {
            name: 'wild_mycelium',
            format: 'png'
        }, 
        {
            name: 'germinated_mycelium',
            format: 'png'
        }, 
        {
            name: 'lightning_effect',
            format: 'png'
        },
        {
            name: 'shield_effect',
            format: 'png'
        },
        {
            name: 'spark_effect',
            format: 'png'
        },
        {
            name: 'wild_lightning',
            format: 'png'
        },
        {
            name: 'swarm',
            format: 'png'
        },
        {
            name: 'wandering_night_shine',
            format: 'png'
        },
        {
            name: 'remains_of_camp',
            format: 'png'
        },
        {
            name: 'unknown_squad',
            format: 'png'
        },
        {
            name: 'protective_minerals',
            format: 'png'
        },
        {
            name: 'environment_squad',
            format: 'png'
        },
        {
            name: 'magic_explosion',
            format: 'png'
        },
        {
            name: 'stun_effect',
            format: 'png'
        },
        {
            name: 'rocks_jump_effect',
            format: 'png'
        },
        {
            name: 'freeze_effect',
            format: 'png'
        },
        {
            name: 'living_creatures',
            format: 'png'
        },
        {
            name: 'shelling_beetle',
            format: 'png'
        },
        {
            name: 'paralyzing_arachnid',
            format: 'png'
        },
        {
            name: 'flame_wave_effect',
            format: 'png'
        },
        {
            name: 'centipede',
            format: 'png'
        },
        {
            name: 'soul_vortex',
            format: 'png'
        },
        {
            name: 'swipe_effect',
            format: 'png'
        },
        {
            name: 'enchanted_armour',
            format: 'png'
        },
        {
            name: 'abandoned_forge',
            format: 'png'
        },
        {
            name: 'enchanted_weapon',
            format: 'png'
        },
        {
            name: 'fire_explosion_effect',
            format: 'png'
        },
        {
            name: 'flying_scrolls',
            format: 'png'
        },
        {
            name: 'mouse_breeder',
            format: 'png'
        },
        {
            name: 'commanding_greenskin',
            format: 'png'
        },
        {
            name: 'Gruz-Gul_greenskin_cultist',
            format: 'png'
        },
        {
            name: 'mana_source',
            format: 'png'
        },
        {
            name: 'ghostly_warrior',
            format: 'png'
        },
        {
            name: 'altar_of_forgotten_warrior',
            format: 'png'
        },
        {
            name: 'altar_of_forgotten_sorcerer',
            format: 'png'
        },
        {
            name: 'test_effect',
            format: 'png'
        },
        {
            name: 'vampiric_rite_effect',
            format: 'png'
        },
        {
            name: 'cave_bat',
            format: 'png'
        },
        {
            name: 'pachydermatous',
            format: 'png'
        },
        {
            name: 'greenskins_squad',
            format: 'png'
        },
        {
            name: 'living_flesh',
            format: 'png'
        },
        {
            name: 'mad_flesh',
            format: 'png'
        },
        {
            name: 'deaths_shard',
            format: 'png'
        },
        {
            name: 'enter',
            format: 'png'
        },
        {
            name: 'outer_life',
            format: 'png'
        },
        {
            name: 'skeleton',
            format: 'png'
        },
        {
            name: 'skeleton_wizard1',
            format: 'png'
        },
        {
            name: 'skeleton_archer_new',
            format: 'png'
        },
        {
            name: 'skeleton_knight',
            format: 'png'
        },
        {
            name: 'ghost',
            format: 'png'
        },{
            name: 'goblin_with_spear',
            format: 'png'
        },
        {
            name: 'background',
            format: 'png'
        },
        {
            name: 'arrow',
            format: 'png'
        },

        {
            name: 'post_potionbrewing',
            format: 'png'
        },
        {
            name: 'ghostly_mage',
            format: 'png'
        },
        {
            name: 'treasure',
            format: 'png'
        },
        {
            name: 'dead_body',
            format: 'png'
        },
        {
            name: 'giant_undead',
            format: 'png'
        },
        {
            name: 'black_mist',
            format: 'png'
        },
        {
            name: 'crystal_vein',
            format: 'png'
        },
        {
            name: 'pile_of_skull',
            format: 'png'
        },
        {
            name: 'lich',
            format: 'png'
        },
        {
            name: 'torch',
            format: 'png'
        },
        {
            name: 'flying_bat',
            format: 'png'
        },
        {
            name: 'wild_light',
            format: 'png'
        },
        {
            name: 'pale_obelisk',
            format: 'png'
        },
        {
            name: 'life_source',
            format: 'png'
        },
        {
            name: 'goblin_catcher',
            format: 'png'
        },
        {
            name: 'sitting_on_the_beast',
            format: 'png'
        },
        {
            name: 'goblin_mixologist',
            format: 'png'
        },
    ]
    constructor() {
        this.img_map = new Map()
        this.load()
    }

    getImage(name){
        return this.img_map.get(name)
    }
    load(){
        ImageData.img_list.forEach(elem => {
            let img = new Image()
            img.src = config.img_url + elem.name + '.' + elem.format
            this.img_map.set(elem.name, img)
        })
    }
}