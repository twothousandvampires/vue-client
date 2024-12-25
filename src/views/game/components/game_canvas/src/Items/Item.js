import Cell from "../inventory/cell/Cell";
export default class Item extends Cell{
    static img = {
        'elder ring' : '/src/assets/img/elder_ring.png',
        'majestic helm' : '/src/assets/img/majestic_helm.png',
        'spectral skull' : '/src/assets/img/spectral_face.png',
        'strange diadem' : '/src/assets/img/strange_diadem.png',
        'pale razor' : '/src/assets/img/pale_razor.png',
        'bone crusher' : '/src/assets/img/bone_crusher.png',
        'giant scale' : '/src/assets/img/giant_scale.png',
        'waved stick' : '/src/assets/img/waved_stick.gif',
        'jumping stars' : '/src/assets/img/jumping_stars.gif',
        'searching eye' : '/src/assets/img/searching_eye.gif',
        'sprouted branch' : '/src/assets/img/sprouted_branch.gif',
        'skull covered in wax' : '/src/assets/img/skull_covered_in_wax.gif',
        'Fu Inle armour' : 'src/assets/img/Fu_Inle_armour.png',
        'bones in boots' : '/src/assets/img/bones_in_boots.png',
        'dream fragment' : '/src/assets/img/dream_fragment.gif',
        'drop of blood' : '/src/assets/img/drop_of_blood.gif',
        'leaf fall' : '/src/assets/img/leaf_fall.gif',
        'endless flame' : '/src/assets/img/endless_flame.gif',
        'drop of shadow' : '/src/assets/img/drop_of_shadow.gif',
        'small healing potion' : '/src/assets/img/small_healing_potion.png',
        'small mana potion' : '/src/assets/img/small_mana_potion.png',
        'small armour potion' : 'lust_of_murder_passive.png',
        'sharp bone' : '/src/assets/img/sharp_bone.png',
        'cockroach paw' : '/src/assets/img/cockroach_paw.png',
        'learning stone' : '/src/assets/img/learning_stone.gif',
        'improving stone' : '/src/assets/img/muddy_gem.gif',
        'unpredictable stone' : '/src/assets/img/slippery_gem.gif',
        'bloody gloves' : '/src/assets/img/bloody_gloves.gif',
        'absorbing sphere' : '/src/assets/img/absorbing_sphere.gif',
        'withered staff' : '/src/assets/img/withered_staff.gif',
        'curved bow' : '/src/assets/img/curved_bow.png',
        'night sickle' : '/src/assets/img/night_sickle.png',
        'icy shard' : '/src/assets/img/icy_shard.png',
        'hiding cloak' : '/src/assets/img/hiding_cloak.png',
        'helmet sprouted with mushrooms' : '/src/assets/img/helmet_sprouted_with_mushrooms.png',
        'enchanting stone' : '/src/assets/img/enchanting_stone.gif',
        'nice mushroom' : '/src/assets/img/nice_mushroom.png',
        'crystal chain' : '/src/assets/img/crystal_chain.png',
        'bottom of the barrel' : '/src/assets/img/bottom_of_the_barrel.png',
        'greenskins skull' : '/src/assets/img/greenskins_skull.png',
        'crystal hammer' : '/src/assets/img/crystal_hammer.gif',
        'spice' : '/src/assets/img/spice.gif',
        'belt rope' : '/src/assets/img/belt_rope.png',
        'bone doll' : '/src/assets/img/bone_doll.png',
        'improving dust' : '/src/assets/img/improving_dust.gif',
        'equipment parts' : '/src/assets/img/equipment_parts.png',
        'scroll design' : '/src/assets/img/scroll_design.png',
        'solidified lava mold' : '/src/assets/img/solidified_lava_mold.png',
        'stone amulet' : '/src/assets/img/stone_amulet.png',
        'snow shuriken' : '/src/assets/img/snow_shuriken.png',
        'sparking sabre' : '/src/assets/img/sparking_sabre.gif',
        'botled lightning' : '/src/assets/img/botled_lightning.png',
        'combat potion' : '/src/assets/img/combat_potion.png',
    }
    static rarity_strings = {
        1: 'common',
        2: 'uncommon',
        3: 'rare',
        4: 'legendary'
    }

    constructor(template, player = undefined) {
        super(template.slot)
        this.cell_empty = Cell.CELL_NOT_EMPTY
        this.name = template.name
        this.item_type = +template.type
        this.quality = template.quality
        this.rarity = template.rarity
        this.char_id = template.char_id
        this.id = template.id
        this.player = player
        this.img_path = Item.img[this.name]
    }

    getRarityString(){
        return Item.rarity_strings[this.rarity]
    }

}