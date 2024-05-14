import Unit from "../../Scr/Unit";
import Functions from "../../GameFunctions";
import Damage from "../../Scr/Damage";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";
import Point from "@/views/game/components/game_canvas/src/Scr/Point";

export default class Enemy extends Unit{
    constructor(context, x, y) {
        super(context, x, y);
        this.dead = false
        this.damage_time = Functions.msToTick(1000)
        this.tick_in_damage = 0
        this.knockback_chance = 100
    }

    takeSpellDamage(damage, damage_source){
        if(this.isDead()) return
        let chance_to_block = this.spell_block ? this.spell_block : 0

        if(damage.hit_type !== Damage.TYPE_NO_HIT && !damage.options?.overtime && Math.random() * 100 < chance_to_block){
            Functions.createModal(this, 'block')
            return
        }

        let total_damage = this.calcTotalDamage(damage)

        this.life -= total_damage

        Functions.createModal(this, total_damage, damage.options?.is_crit ? 18 : 14, damage.options?.is_crit ? 'yellow' : 'white')

        damage_source.successfulHit?.()

        if(this.life <= 0){
            if(damage?.ignite){
                this.dead_by_ignite = true
            }
            this.setDyingState()
            this.figth_context.checkWin()
            return
        }

        this.setDamageState()
    }

    takeAttackDamage(damage, damage_source){
        if(this.isDead()) return

        let chance_to_block = this.attack_block ? this.attack_block : 0

        if(Math.random() * 100 < chance_to_block){
            Functions.createModal(this, 'block')
            return
        }

        let total_damage = this.calcTotalDamage(damage)

        this.life -= total_damage

        damage_source.successfulHit?.()

        Functions.createModal(this, total_damage, damage.options?.is_crit ? 18 : 14, damage.options?.is_crit ? 'yellow' : 'white')

        if(this.life <= 0 ){
            damage_source.killingBlow?.(this)
            this.setDyingState()
            this.figth_context.checkWin()
            return
        }

        this.setDamageState()
    }
    setCellCords(cell, ){
        this.point = new Point(cell.x + 37.5, cell.y + 60)
    }
    calcTotalDamage(damage){
        let total = 0
        damage.sources.forEach(source => {
            if(source.damage_type === DamageSource.DAMAGE_TYPE_PHYSICAL){
                total += Math.floor(Functions.changeByPercent(source.value, -this.getArmour()))
            }
            else if(source.damage_type === DamageSource.DAMAGE_TYPE_MAGICK){
                total += Math.floor(Functions.changeByPercent(source.value, -this.getMagickResistance()))
            }
        })

        if(damage.critical_chance && damage.critical_chance > Math.random() * 100){
            total = Functions.changeByPercent(total, damage.critical_multiplier)
            damage.addOption('is_crit')
        }

        return total
    }

    checkUnstack(){
        let enemy = this.figth_context.enemy
        for(let i = 0; i < enemy.length; i++){
            if(enemy[i] === this || enemy[i].stacked || enemy[i].phased || enemy[i].state === Unit.STATE_DEAD || enemy[i].state === Unit.STATE_DYING){
                continue
            }
            if(Functions.rectCollision(this, enemy[i])){
                return true
            }
        }
        return false
    }

    checkEnvironmentUnstack(){
        for(let i = 0; i < this.figth_context.map.environment.length; i++){
            let rock = this.figth_context.map.environment[i]
            if(Functions.rectCollision(rock, this)){
                return true
            }
        }

        return false
    }

    act(){
        this.status.forEach((v,k,map) => {
            v.act()
        })

        this.behavior_timer ++

        if(!this.can_action) return;

        this.sprite.act()
        this.stateAct()
    }

    deadAct(){

    }

    castState(){
        this.state = Unit.STATE_CAST
        this.resetState()
        this.stateAct = this.castAct
    }

    deadState(){
        this.state = Unit.STATE_DEAD
        this.resetState()
        this.stateAct = this.deadAct
    }

    setDamageState(){
        this.state = Unit.STATE_DAMAGED
        this.resetState()
        this.stateAct = this.damageAct
    }

    damageAct(){
        if(this.sprite.isSpriteLoopEnd()){
            this.idleState()
        }
    }

    setDyingState(){
        this.dead = true
        this.state =  Unit.STATE_DYING
        this.resetState()
        this.status.forEach(elem => elem.targetDead())
        this.stateAct = this.dyingAct
    }

    attackState(){
        this.state = Unit.STATE_ATTACK
        this.resetState()
        this.stateAct = this.attackAct
    }

    pursuitState(){
        this.state = Unit.STATE_PURSUIT
        this.resetState()
        this.stateAct = this.pursuitAct
    }

    setStunState(){
        this.stunned = true
        if(this.state === Unit.STATE_FROZEN){
            return
        }
        this.stunState()
    }

    stunState(){
        this.state = Unit.STATE_STUNNED
        this.resetState()
        this.stateAct = this.stunAct
    }

    stunAct(){

    }

    setUnstunState(){
        this.stunned = false
        if(this.state === Unit.STATE_STUNNED){
            this.idleAct()
        }
    }

    setFrozenState(){
        this.frozen = true
        this.saveState()
        this.frozenState()
    }
    setUnfrozenState(){
        this.frozen = false
        this.returnPreviousState()
    }
    saveState(){
        this.previous_state = this.state
        this.previous_act = this.stateAct
        this.sprite.saveSprite()
    }

    returnPreviousState(){
        this.stateAct = this.previous_act
        this.state = this.previous_state
        this.sprite.returnPreviousSprite()
    }

    frozenState(){
        this.state = Unit.STATE_FROZEN
        this.resetState()
        this.stateAct = this.frozenAct
    }

    frozenAct(){

    }

    moveState(angle){
        this.state = Unit.STATE_MOVE
        this.resetState()
        this.move_angle = angle
        this.stateAct = this.moveAct
    }

    idleState(ms = 0){
        this.state = Unit.STATE_IDLE
        this.resetState()
        this.behavior_timer = ms
        this.stateAct = this.idleAct
    }

    init(){
        this.getState()
        this.sprite.init()
    }

    resetState(){
        if(!this.can_action) return;
        this.sprite.reset()
        this.struck = false
        this.behavior_timer = 0
    }

    moveAct(){
        if(this.behavior_timer >= 20){
            this.move_angle = undefined
            this.getState()
            return
        }
        let move_x = Math.sin(this.move_angle) * this.getMovementSpeed()
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle) * this.getMovementSpeed()
        this.addPointIfPossible(move_x, move_y)
    }

    idleAct(fight_context){
        if(this.behavior_timer > 50){
            this.getState()
        }
    }

    pursuitAct(){
        let player = this.figth_context.player


        if(this.playerInAttackRadius(player) && !player.invisible){
            this.getState()
            return
        }

        let distance_to_player = Functions.distance(this, player)
        let range = this.getLookingRange()

        if(distance_to_player > range && !player.invisible){
            this.getState()
            return
        }

        let angle = Functions.angle(this, player)
        let move_x = Math.sin(angle) * this.getMovementSpeed()
        this.fliped = move_x <= 0;
        let move_y = Math.cos(angle) * this.getMovementSpeed()
        this.addPointIfPossible(move_x, move_y)
    }

    attackAct(){
        
    }

    playerInAttackRadius(player){
        let player_rect = {
            size_x: player.box_size_x,
            size_y: player.box_size_y,
            point: player.point
        }
        return  Functions.circleRectCollision(this, this.getAttackRange(), player_rect)
    }

    takeDamage(damage){
        if(this.dead) return
        let response = {}
        let is_critical = false
        let source_type = damage.options.source_type

        if(source_type === Damage.SOURCE_ATTACK){
            if(damage.options.crit_roll >= Math.round(Math.random() * 100))
            {
                is_critical = true
                damage.value = Math.round(Functions.increasedByPercent(damage.value, damage.options.crit_multy))
            }

        }
        else if(source_type === Damage.SOURCE_SPELL){
            if(damage.options.crit_roll >= Math.round(Math.random() * 100))
            {
                is_critical = true
                damage.value = Math.round(Functions.increasedByPercent(damage.value, damage.options.crit_multy))
            }
        }

        this.life -= damage.value
        if(this.life <= 0){
            this.dyingState()
            response.target_dead = true
        }
        else if(damage.options.knockback){
            this.damage_angle = Functions.angle(damage.source, this)
            this.damageState()
        }

        let modal_info = []
        modal_info.push(this)
        if(is_critical){
            modal_info.push(damage.value + '!')
        }
        else {
            modal_info.push(damage.value)
        }
        if(is_critical){
            modal_info.push(18)
        }

        Functions.createModal(...modal_info)

        return response
    }

    canBeDamaged(){
        return this.state !== Unit.STATE_DEAD && this.state !== Unit.STATE_DYING
    }

    getAttackDamage(){
        if(!this.min_attack_damage || !this.min_attack_damage) return 0

        return Math.floor(Math.random() * (this.max_attack_damage - this.min_attack_damage) + this.min_attack_damage)
    }

}