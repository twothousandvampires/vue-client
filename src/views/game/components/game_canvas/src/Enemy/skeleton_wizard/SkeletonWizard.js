import FearSkull from "../skills/FearSkull";
import Skull from "../skull/Skull";
import RaiseTheUndead from "../skills/RaiseTheUndead";
import SkeletonWizardSprite from "./sprite/SkeletonWizardSprite";
import Undead from "../src/Undead";

export default class SkeletonWizard extends Undead{

    constructor(context,x, y) {
        super(context,x, y);
        this.name = 'skeleton wizard'
        this.skull_will_spawned = Math.random() > 0.5
        this.cast_speed = 1800
        this.skills = [
            new FearSkull(this),
            new RaiseTheUndead(this)
        ]
        this.sprite = new SkeletonWizardSprite(this)
        this.life = 5
        this.max_life = 5
        this.movement_speed = 1.5
        this.attack_speed = 0
        this.attack_range = 0
        this.looking_range = 300
        this.size_x = 96
        this.size_y = 96
        this.box_size_x = 40
        this.box_size_y = 20

        this.casted_spell = undefined
        this.init()
    }

    dyingAct(){
        if(this.sprite.sprite_end){
            if(this.skull_will_spawned){
                this.figth_context.enemy.push(new Skull(this.figth_context, this.point.x, this.point.y))
            }
            this.deadState()
        }
    }

    castAct(){
        let player = this.figth_context.player

        if(!this.deal_hit && this.sprite.frame === 9){
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

    getDamage(){
        return  {
            'type': 'physical',
            'value': 10,
            'force': true,
            'source': this
        }
    }
}