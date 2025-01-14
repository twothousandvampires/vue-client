import Unit from "../../Scr/Unit";
import Functions from "../../GameFunctions";

export default class Enemy extends Unit{
    constructor(context, x, y) {
        super(context, x, y);
        this.evade = 5
        this.mana = 0

        this.physical_damage_resist = 1
        this.piercing_damage_resist = 1
        this.cutting_damage_resist = 1
        this.crushing_damage_resist = 1

        this.fire_damage_resist = 1
        this.lightning_damage_resist = 1
        this.cold_damage_resist = 1
        this.magic_damage_resist = 1

        this.initiative = 5
        this.priority_for_spellcasting = 0
    }
    getTarget(player){
        let targets = [player].concat(this.fight_context.summons).filter(elem => !elem.isDead())
        targets.sort((a, b) => Math.random() > 0.5)

        return targets[Math.floor(Math.random() * targets.length)]
    }
    wantToCast(){
        return Math.random() <= this.priority_for_spellcasting / 100
    }
    turn(enemies, player){
        let target = this.getTarget(player)
        let cast_result = false
        if(this.caster && this.mana && this.wantToCast() && !this.silence){
            cast_result = this.cast(target, enemies)
        }
        if(!cast_result){
            Functions.createModal(this, 'attack!')
            target.takeDamage(this)
        }
    }
    availableToTurn(){
        if(this.frozen){
            Functions.createModal(this, 'frozen')
            return false
        }
        return true
    }
    async afterTurn(){
        this.updateStatusEndTurn()
        await Functions.sleep(500)
        this.fight_context.next(this)
    }
    async startTurn(enemies, player){
        this.updateStatusNewTurn()

        if(this.availableToTurn()){
            this.turn(enemies, player)
        }

        await this.afterTurn()
    }
    cast(target, enemy){
        let checked_casts = this.casts.filter(elem => elem.check(target))

        if(checked_casts.length){
            let cast = checked_casts[Math.floor(Math.random() * checked_casts.length)]
            Functions.createModal(this, 'casts ' + cast.name)
            cast.action(target, enemy)
            this.mana --
            return true
        }

        return false
    }

    isEvade(player){
        if(player.blind && Math.random() <= player.blind / 100){
            return true
        }
        let reduce = (0.04 * player.accuracy) / (1 + 0.04 * player.accuracy)
        let base_chance = this.evade / 100
        let res = base_chance * (1 - reduce)

        return Math.random() < res
    }

    act(){
        this.sprite.act()
        this.stateAct()
    }

    castState(){
        this.state = Unit.STATE_CAST
        this.resetState()
        this.stateAct = this.castAct
    }

    setDamageState(){
        this.state = Unit.STATE_DAMAGED
        this.resetState()
        this.stateAct = this.damageAct
    }
    damageAct(){
        if(this.sprite.isSpriteLoopEnd()){

        }
    }
    takeSpellDamage(player, damage = {}){

        let result = 0

        if(damage.magic_damage){
            result += damage.magic_damage * this.magic_damage_resist
        }
        if(damage.cold_damage){
            result += damage.cold_damage * this.cold_damage_resist
        }
        if(damage.lightning_damage){
            result += damage.lightning_damage * this.lightning_damage_resist
        }
        if(damage.fire_damage){
            result += damage.fire_damage * this.fire_damage_resist
        }

        let total = Functions.random(result * 1.1, result  * 0.9)

        let magic_reduction = this.getMagicRedaction()

        if(this.resist >= 0){
            total = total * (1 - magic_reduction)
        }
        else {
            total = total * (1 + -magic_reduction)
        }

        total = Math.round(total)

        if(total){
            this.afterDamage(player)
            this.reduceLife(total)
            let options = {
                critical: false,
                type: 'magic'
            }
            Functions.createDamageModal(this, total, options)
            return total
        }
    }
    isPhysImmune(){
        return !this.crushing_damage_resist && !this.physical_damage_resist && !this.piercing_damage_resist && !this.cutting_damage_resist
    }
    takeAttackDamage(player, damage, options = {}){

        if(this.isPhysImmune()){
            Functions.createModal(this, 'attack immune')
            return
        }

        let result = damage.physical_damage * this.physical_damage_resist
        result += damage.piercing_damage * this.piercing_damage_resist
        result += damage.cutting_damage * this.cutting_damage_resist
        result += damage.crushing_damage * this.crushing_damage_resist

        let weak = player.energy < 15 && Math.random() < 0.5

        let total = Functions.random(result * 1.1, result  * 0.9)
        let is_critical = player.isPhysicalCrit(options)

        if(this.armour >= 0){
            let physical_reduction = this.getPhysicalRedaction()
            total = total * (1 - physical_reduction)
        }
        else {
            total = Functions.changeByPercent(total, Math.abs(this.armour))
        }

        if(weak){
            Functions.createModal(player, 'have no strength...')
            total /= 2
        }
        if(is_critical && !weak){
            let add = options.additional_critical_damage ? options.additional_critical_damage : 0
            let total_more = 2 + add / 100
            total *= total_more
        }

        total = Math.round(total)

        let evade = this.isEvade(player)
        let block = this.isBlock()

        if(evade){
            Functions.createModal(this, 'evade')
        }
        else if(block){
            Functions.createModal(this, 'block')
        }
        else {
            player.successfulAttack(total)
            this.afterDamage(player)
            this.reduceLife(total)
            let options = {
                critical: is_critical,
                type: 'phys'
            }
            Functions.createDamageModal(this, total, options)
        }
    }
    takeDirectSpellDamage(damage){
        let result = 0

        if(damage.magic_damage){
            result += damage.magic_damage * this.magic_damage
        }

        if(damage.cold_damage){
            result += damage.cold_damage * this.cold_damage_resist
        }
        if(damage.lightning_damage){
            result += damage.lightning_damage * this.lightning_damage_resist
        }
        if(damage.fire_damage){
            result += damage.fire_damage * this.fire_damage_resist
        }
        
        let  total = Functions.random(result * 1.1, result  * 0.9)

        let magic_reduction = this.getMagicRedaction()

        if(this.resist >= 0){
            total = total * (1 - magic_reduction)
        }
        else {
            total = total * (1 + -magic_reduction)
        }


        total = Math.round(total)

        if(total){
            this.afterDamage()
            this.reduceLife(total)

            let options = {
                type: 'magic',
                critical: false,
            }
            Functions.createDamageModal(this, total, options)
        }
    }
    reduceLife(value){
        this.life -= value
        if(this.life <= 0){
            if(this.auras.length){
                this.auras.forEach(aura => {
                    aura.unaffect()
                    Functions.createModal(this, aura.name + ' end')
                })
            }
            this.setDyingState()
        }
    }
    afterDamage(){

    }
    canBeDamaged(){
        return this.state !== Unit.STATE_DEAD && this.state !== Unit.STATE_DYING
    }
}