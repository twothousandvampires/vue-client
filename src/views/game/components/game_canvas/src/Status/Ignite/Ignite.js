import Functions from "../../GameFunctions";
import Status from "../Status";
import IgniteSprite from "./sprite/IgniteSprite";
import Damage from "../../Scr/Damage";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";

export default class Ignite extends Status{
    constructor(power) {
        super()
        this.source = undefined
        this.target = undefined
        this.tick = 0
        this.name = 'ignite'
        this.img_path = 'src/assets/img/icons/skill/step_of_another_world.png'
        this.sprite = new IgniteSprite()
        this.power = power
        this.duration = Functions.msToTick(3000)
    }

    killingBlow(unit){
        unit.dead_by_ignite = true
        this.source.kill(unit)
    }

    act(){
        let tick = this.target.figth_context.tick
        if(tick >= (this.duration) + this.affect_time){
            this.expire()
            return
        }

        this.sprite.setPoint(this.target)
        if(this.tick % 25 === 0){
            let damage = new Damage(Damage.SOURCE_SPELL, Damage.TYPE_NO_HIT)
            damage.addSource(new DamageSource(this.power, DamageSource.DAMAGE_TYPE_MAGICK))
            damage.addOption('overtime')
            damage.addOption('ignite')
            this.target.takeSpellDamage(damage, this)
        }

        this.sprite.act()
        this.tick ++
    }

    expire(){
        this.target.status.delete(this.name)
        this.target.is_ignite = false
    }

    affect(target, source){
        this.source = source
        this.target = target
        this.sprite.setSize(this.target)
        this.affect_time = target.figth_context.tick
        this.tick = 0
        this.target.is_ignite = true
    }

    update(status){
        this.affect_time = this.target.figth_context.tick
        this.duration = status.duration
        if(status.power > this.power){
            this.power = status.power
        }
    }

    targetDead() {
        this.expire()
    }
}