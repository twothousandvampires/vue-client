export default class DamageSource{

    static DAMAGE_TYPE_MAGICK = 1
    static DAMAGE_TYPE_PHYSICAL = 2

    constructor(value, damage_type) {
        this.value = value
        this.damage_type = damage_type
    }
}