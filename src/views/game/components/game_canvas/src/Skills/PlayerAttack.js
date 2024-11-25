export default class PlayerAttack{
    constructor(player) {
        this.player = player
        this.energy_cost = 5
        this.name = 'attack'
    }
    canUse(enemy = undefined){
        let figth_context = this.player.figth_context
        return enemy && !enemy.isDead() && figth_context.checkLine(enemy.num);
    }
    use(enemy = false){
        this.player.setAttack()
        this.player.reduceEnergy(this.energy_cost)
        enemy.takeAttackDamage(this.player, this.player.getPhysicalDamage())
    }
}