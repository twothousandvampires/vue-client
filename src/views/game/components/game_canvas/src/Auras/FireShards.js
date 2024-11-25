export default class FireShards{
    constructor(owner) {
        this.owner = owner
        this.name = 'fire shards aura'
    }
    affect(){
        let targets = this.owner.figth_context.getEnemies()
        targets.forEach(elem => {
            elem.magic_damage += 1
            elem.resist += 10
        })
    }
    unaffect(){
        let targets = this.owner.figth_context.getEnemies()
        targets.forEach(elem => {
            elem.magic_damage -= 1
            elem.resist -= 10
        })
    }
}