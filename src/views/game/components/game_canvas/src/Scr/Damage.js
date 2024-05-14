import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";

export default class Damage{

    static TYPE_HIT = 1
    static TYPE_NO_HIT = 1

    static SOURCE_ATTACK = 1
    static SOURCE_SPELL = 2

    constructor(source_type, hit_type, critical_chance = 0, critical_multiplier = 100) {
        this.source_type = source_type
        this.hit_type = hit_type

        this.sources = []
        this.options = {}

        this.critical_chance = critical_chance
        this.critical_multiplier = critical_multiplier
    }

    addSource(source){
        this.sources.push(source)
    }
    addPhysicalSource(value){
        this.sources.push(new DamageSource(value, DamageSource.DAMAGE_TYPE_PHYSICAL))
    }
    addMagickSource(value){
        this.sources.push(new DamageSource(value, DamageSource.DAMAGE_TYPE_MAGICK))
    }

    addOption(option){
        this.options[option] = true
    }
}