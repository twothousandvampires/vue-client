import GameObject from "./GameObject";
import Functions from "../GameFunctions";
import Point from "@/views/game/components/game_canvas/src/Scr/Point";

export default class Unit extends GameObject{

    static STATE_IDLE = 1
    static STATE_MOVE = 2
    static STATE_ATTACK = 3
    static STATE_CAST = 4
    static STATE_DAMAGED = 5
    static STATE_BLOCK = 6
    static STATE_DYSPNEA = 7
    static STATE_RUN = 8
    static STATE_WORLD_MOVE = 9
    static STATE_WORLD_IDLE = 10
    static STATE_DYING = 11
    static STATE_DEAD = 12
    static STATE_PURSUIT = 13
    static STATE_RESURECT = 14
    static STATE_FROZEN = 15
    static STATE_STUNNED = 16

    constructor(context, x, y) {
        super(context, x, y);
        this.can_attack = true
        this.can_cast = true
        this.can_action = true

        this.fliped = false
        this.dead = 0

        //critical
        this.will = 0
        this.auras = []

        //defend
        this.evade = 0
        this.armour = 0
        this.attack_block = 0
        this.spell_block = 0
        this.resist = 0

        this.speed = 0
        this.blind = 0
        this.life_leech = 0
        this.attack_crit_chance = 5
        this.spell_crit_chance = 5
        this.status = new Map();

        this.magic_damage = 0
        this.physical_damage = 0
    }
    resetState(){
        this.sprite.reset()
    }
    idleAct(fight_context){

    }
    deadAct() {

    }
    successfulAttack(){

    }
    deadState(){
        this.state = Unit.STATE_DEAD
        this.resetState()
        this.stateAct = this.deadAct
    }
    dyingAct(){
        if (this.sprite.isSpriteLoopEnd()) {
            this.deadState()
        }
    }
    setDyingState(){
        this.figth_context.deleteFromQueue(this)
        this.dead = true
        this.state =  Unit.STATE_DYING
        this.resetState()
        this.stateAct = this.dyingAct
    }
    idleState(ms = 0){
        this.state = Unit.STATE_IDLE
        this.resetState()
        this.stateAct = this.idleAct
    }
    takeDirectDamage(damage){
        this.reduceLife(damage)
    }
    init(){
        this.idleState()
        this.sprite.init()
    }
    setCellCords(cell, cell_w, cell_h){
        this.point = new Point(cell.x + cell_w / 2, cell.y + cell_h/2)
    }
    isPhysicalCrit(){
        return Math.random() <= this.attack_crit_chance / 100
    }
    isMagicCrit(){
        if(!this.magic_damage) return false
        return Math.random() <= this.spell_crit_chance / 100
    }
    getInfo(){
        let result = ``;

        result += `${this.name} (${this.life}/${this.max_life})\n`

        return result;
    }
    getPhysicalDamage(){
        return this.physical_damage
    }
    getMagicDamage(){
        return this.magic_damage
    }
    getPhysicalDamageWithSpread(){
        return  Functions.random(this.getPhysicalDamage() * 1.1, this.getPhysicalDamage()  * 0.9)
    }
    getMagicDamageWithSpread(){
        return  Functions.random(this.getMagicDamage() * 1.1, this.getMagicDamage()  * 0.9)
    }
    isBlock(){
        return this.attack_block && Functions.random(100,0) <= this.attack_block
    }
    getPhysicalRedaction(){
        return (0.06 * this.armour) / (1 + 0.06 * this.armour)
    }
    getMagicRedaction(){
        let r = this.resist / 100
        return r > 0.75 ? 0.75 : r
    }
    isDead(){
        return this.state === Unit.STATE_DEAD || this.state === Unit.STATE_DYING
    }
    updateStatus(){
        this.status.forEach((v,k,map) => {
            v.newTurn()
        })
    }
    calculatePhysicalDamage(target, is_range = false){
        let physical_damage = this.getPhysicalDamageWithSpread(target)

        if(target.armour >= 0){
            let physical_reduction = target.getPhysicalRedaction()
            physical_damage = physical_damage * (1 - physical_reduction)
        }
        else {
            physical_damage = Functions.changeByPercent(physical_damage, Math.abs(target.armour))
        }

        return physical_damage
    }
    isSpellBlock(){
        return this.spell_block && Functions.random(100,0) <= this.spell_block
    }
    isSuppress(){
        return this.will && Functions.random(100,0) <= this.will
    }
    calculateMagicDamage(target){
        let magic_damage = this.getMagicDamageWithSpread()
        let magic_reduction = target.getMagicRedaction()
        if(target.resist >= 0){
            magic_damage = magic_damage * (1 - magic_reduction)
        }
        else {
            magic_damage = magic_damage * (1 + -magic_reduction)
        }
        return magic_damage
    }
    addMana(value){
        this.mana += value
        if(this.mana > this.max_mana){
            this.mana = this.max_mana
        }
    }
    addLife(value){
        this.life += value
        if(this.life > this.max_life){
            this.life = this.max_life
        }
    }

    newStatus(status, source, can_resist = false){
        if(this.will / 100 >= Math.random() && !can_resist){
            Functions.createModal(this, 'resist ' + status.name)
            return
        }
        if(status.check(this)){
            if(this.status.has(status.name)){
                this.status.get(status.name).update(status, source)
            }
            else {
                this.status.set(status.name, status)
                status.affect(this, source)
                if(this.figth_context){
                    Functions.createModal(this, status.name,12, 'white')
                }
            }
        }
    }
}