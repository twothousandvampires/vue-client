export default class PlayerAttack{
    constructor(player) {
        this.player = player
        this.energy_cost = 5
        this.name = 'attack'
        this.can_create_combo = true
        this.decrease_action_point = true
        this.have_action = true
    }
    canUse(enemy = undefined){
        if(enemy === this.player) return false
        let fight_context = this.player.fight_context
        return enemy && !enemy.isDead() && fight_context.checkLine(enemy.num);
    }
    use(enemy = false){
        this.target = enemy
        this.player.setAttack()
        if(this.player.combo_points === 0){
            this.player.reduceEnergy(this.energy_cost)
        }
    }
    action(){
        let enemy = this.target
        enemy.takeAttackDamage(this.player, this.player.getPhysicalDamage()) 
        if(this.player.combo_points === 2 && Math.random() < 0.2){
            this.decrease_action_point = false
        }
    }

    addMastery(){
        this.player.combat_mastery_gained ++
    }
}