import GameObject from "./GameObject";
import Functions from "../GameFunctions";
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

    static MIN_ATTACK_SPEED = 100

    constructor(context, x, y) {
        super(context, x, y);
        this.can_move = true
        this.can_attack = true
        this.can_cast = true
        this.can_action = true
        this.fliped = false
        this.struck = false
        this.casted = false
        this.dead = false

        this.phased = false
        this.inmaterial = false

        this.increased_attack_range = 0
        this.reduced_attack_range = 0

        //critical
        this.crit_chance = 0
        this.spell_crit_chance = 0
        this.attack_crit_chance = 0

        this.crit_multi = 0

        //defend
        this.evade = 0
        this.armour = 0
        this.increased_armour = 0
        this.reduced_armour = 0
        this.attack_block = 0
        this.spell_block = 0
        this.resistance = 0
        this.increased_resistance = 0
        this.reduced_resistance = 0

        this.speed = 0

        //attack
        this.increased_attack_damage = 0
        this.reduced_attack_damage = 0

        //speed
        this.increased_speed = 0
        this.reduced_speed = 0
        this.increased_attack_speed = 0

        //spell
        this.min_spell_damage = 0
        this.max_spell_damage = 0
        this.increased_spell_aoe = 0
        this.spell_leech = 0
        this.cast_speed = 0

        //regen
        this.min_attack_damage = 0
        this.max_attack_damage = 0


        this.increased_damage = 0
        this.reduced_damage = 0
        this.status = new Map();
    }

    isDead(){
        return this.state === Unit.STATE_DEAD || this.state === Unit.STATE_DYING
    }

    addLife(value){
        this.life += value
        if(this.life > this.max_life){
            this.life = this.max_life
        }
    }
    getAttackRange(){
        return this.attack_range
    }

    getLookingRange(){
        return this.looking_range
    }

    setStan(){

    }

    getTotalIncreasedAttackDamage(){
        return this.increased_attack_damage - this.reduced_attack_damage
    }

    getMovementSpeed(){
        return this.movement_speed
    }


    getAttackSpeed(){
        return this.attack_speed
    }

    getCastSpeed(){
        return this.cast_speed
    }

    getArmour(){
        return Functions.changeByPercent(this.armour, this.getTotalArmourIncreased())
    }

    getTotalArmourIncreased(){
        return this.increased_armour - this.reduced_armour
    }

    getMagickResistance(){
        return Functions.changeByPercent(this.resistance, this.getTotalResistanceIncreased())
    }

    getTotalResistanceIncreased(){
        return this.increased_resistance - this.reduced_resistance
    }

    newStatus(status, source){
        if(status.check(this)){
            if(this.status.has(status.name)){
                this.status.get(status.name).update(status, source)
            }
            else {
                this.status.set(status.name, status)
                status.affect(this, source)
            }
        }
    }
}