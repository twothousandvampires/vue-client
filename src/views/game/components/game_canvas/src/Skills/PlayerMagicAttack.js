export default class PlayerMagicAttack{

    constructor(player) {
        this.player = player
        this.mana_cost = 1
        this.name = 'magic attack'
        this.can_create_combo = true
        this.decrease_action_point = true
        this.have_action = true
    }
    canUse(enemy = undefined){
        if(enemy === this.player) return false

        return enemy && !enemy.isDead() && this.player.mana >= this.mana_cost
    }
    use(enemy = false){
        this.target = enemy
        this.player.setCast()
        this.player.mana -= this.mana_cost
    }
    action(){
        let enemy = this.target
        enemy.takeSpellDamage(this.player, this.player.getMagicDamage()) 
        if(this.player.combo_points === 2 && Math.random() < 0.2){
            this.decrease_action_point = false
        }
    }

    addMastery(){
        this.player.sorcery_mastery_gained ++
    }
}