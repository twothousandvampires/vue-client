export default class SharpBoneAura{
    constructor(owner) {
        this.owner = owner
        this.name = 'strong bones aura'
    }
    affect(){
        let targets = this.owner.figth_context.getEnemies()
        targets.forEach(elem => {
            elem.physical_damage ++
            elem.armour ++
            elem.attack_crit_chance += 10
            elem.spell_crit_chance += 10
            elem.power += 20
        })
    }
    unaffect(){
        let targets = this.owner.figth_context.getEnemies()
        targets.forEach(elem => {
            elem.physical_damage --
            elem.armour --
            elem.attack_crit_chance -= 10
            elem.spell_crit_chance -= 10
            elem.power -= 20
        })
    }
}