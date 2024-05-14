import ArmyOfTheDeadCast from "../skills/ArmyOfTheDeadCast";
import Undead from "./../src/Undead";
import LichSprite from "./sprite/LichSprite";

export default class Lich extends Undead{

    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'lich'
        this.skills = [
            new ArmyOfTheDeadCast(this)
        ]
        this.life = 20
        this.max_life = 20
        this.movement_speed = 2.2
        this.cast_speed = 2200
        this.attack_speed = 0
        this.attack_range = 0
        this.looking_range = 260
        this.size_x = 126
        this.size_y = 126
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new LichSprite(this)
        this.phased = true

        this.casted_spell = undefined
        this.init()
    }

    canResurect(){
        return false
    }

    deadState(){
        this.figth_context.removeEnemy(this)
    }

    dyingAct(){
        if(this.sprite.sprite_end){
            this.deadState()
        }
    }

    castAct(){
        let player = this.figth_context.player

        if(!this.deal_hit && this.sprite.frame === 13){
            this.deal_hit = true
            this.casted_spell.cast()
        }
        if(this.sprite.sprite_end){
            this.getState()
        }
    }

    getState(){
        let available_spells_to_cast = this.skills.filter(elem => elem.canCast())

        if(available_spells_to_cast.length){
            this.castState()
            this.casted_spell = available_spells_to_cast[Math.floor(Math.random() * available_spells_to_cast.length)]
        }
        else {
            if( Math.random() > 0.5){
                let angle = Math.random() * 6.24
                this.moveState(angle)
            }
            else {
                this.idleState()
            }
        }
    }
}