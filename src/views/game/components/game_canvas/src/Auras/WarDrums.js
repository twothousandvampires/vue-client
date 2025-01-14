export default class WarDrums{
    constructor(owner) {
        this.owner = owner
        this.name = 'war drums aura'
    }
    affect(){
        let targets = this.owner.fight_context.getEnemies()
        targets.forEach(elem => {
            elem.speed += 150
            elem.physical_damage += 1
            elem.power += 5
        })
    }
    unaffect(){
        let targets = this.owner.fight_context.getEnemies()
        targets.forEach(elem => {
            elem.speed -= 150
            elem.physical_damage -= 1
            elem.power -= 5
        })
    }
}