import Cell from "../inventory/cell/Cell";
import config from '/config';

export default class Item extends Cell{
    static img = {
        'elder ring' : 'elder_ring.png',
        'majestic helm' : 'majestic_helm.png',
        'spectral skull' : 'spectral_face.png',
        'strange diadem' : 'strange_diadem.png',
        'pale razor' : 'pale_razor.png',
        'bone crusher' : 'bone_crusher.png',
        'giant scale' : 'giant_scale.png',
        'waved stick' : 'waved_stick.gif',
        'jumping stars' : 'jumping_stars.gif',
        'searching eye' : 'searching_eye.gif',
        'sprouted branch' : 'sprouted_branch.gif',
        'skull covered in wax' : 'skull_covered_in_wax.gif',
        'Fu Inle armour' : 'Fu_Inle_armour.png',
        'bones in boots' : 'bones_in_boots.png',
        'dream fragment' : 'dream_fragment.gif',
        'drop of blood' : 'drop_of_blood.gif',
        'leaf fall' : 'leaf_fall.gif',
        'endless flame' : 'endless_flame.gif',
        'drop of shadow' : 'drop_of_shadow.gif',
        'small healing potion' : 'small_healing_potion.png',
        'small mana potion' : 'small_mana_potion.png',
        'small armour potion' : 'lust_of_murder_passive.png',
        'sharp bone' : 'sharp_bone.png',
        'cockroach paw' : 'cockroach_paw.png',
        'learning stone' : 'learning_stone.gif',
        'improving stone' : 'muddy_gem.gif',
        'unpredictable stone' : 'slippery_gem.gif',
        'bloody gloves' : 'bloody_gloves.gif',
        'absorbing sphere' : 'absorbing_sphere.gif',
        'withered staff' : 'withered_staff.gif',
        'curved bow' : 'curved_bow.png',
        'night sickle' : 'night_sickle.png',
        'icy shard' : 'icy_shard.png',
        'hiding cloak' : 'hiding_cloak.png',
        'helmet sprouted with mushrooms' : 'helmet_sprouted_with_mushrooms.png',
        'enchanting stone' : 'enchanting_stone.gif',
        'nice mushroom' : 'nice_mushroom.png',
        'crystal chain' : 'crystal_chain.png',
        'bottom of the barrel' : 'bottom_of_the_barrel.png',
        'greenskins skull' : 'greenskins_skull.png',
        'crystal hammer' : 'crystal_hammer.gif',
        'spice' : 'spice.gif',
        'belt rope' : 'belt_rope.png',
        'bone doll' : 'bone_doll.png',
        'improving dust' : 'improving_dust.gif',
        'equipment parts' : 'equipment_parts.png',
        'scroll design' : 'scroll_design.png',
        'solidified lava mold' : 'solidified_lava_mold.png',
        'stone amulet' : 'stone_amulet.png',
        'snow shuriken' : 'snow_shuriken.png',
        'sparking sabre' : 'sparking_sabre.gif',
        'botled lightning' : 'botled_lightning.png',
        'combat potion' : 'combat_potion.png',
        'cave moth': 'cave_moth.png',
        'cave berry': 'cave_berry.png',
        'small armour potion': 'small_armour_potion.png',
        'explosive potion': 'explosive_potion.png',
        'juicy asshole': 'juicy_asshole.png',
        'nice mushroom': 'nice_mushroom.png',
        'royal snack': 'royal_snack.png',
        'scroll of Inferno': 'scroll.png',
        'scroll of Raise Bones': 'scroll.png',
        'weightless chainmail': 'weightless_chainmail.png',
        'additional plates': 'additional_plates.png'
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
        this.img_path = config.img_url + Item.img[this.name]
    }

    getRarityString(){
        return Item.rarity_strings[this.rarity]
    }

}