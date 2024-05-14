import Status from "../Status";
import Functions from "../../GameFunctions";
import Damage from "../../Scr/Damage";

export default class RadianceStatus extends Status{
    constructor() {
        super();
        this.name = 'radiance'
        this.img_path = 'src/assets/img/icons/status/endless_flame.png'
        this.sprite = new FearSprite(this)
    }

    act(){
        let tick = this.target.figth_context.tick
        if(tick % 100 === 0){
            let enemy = this.target.figth_context.enemy
            enemy.forEach(enemy => {
                if(Functions.distance(this.target, enemy) < 200){
                    enemy.takeDamage(new Damage(this, 10, Damage.DAMAGE_TYPE_SPELL, Damage.TYPE_NO_HIT))
                }
            })
            if(Math.round(Math.random() * 100) < this.source.value){
                this.target.takeDamage(new Damage(this, 10, Damage.DAMAGE_TYPE_SPELL, Damage.TYPE_NO_HIT))
            }
        }
    }

    expire(){
        this.target.status.delete(this.name)
    }

    affect(target, source){
        this.target = target
        this.source = source
    }

    targetDead() {
        this.expire()
    }
}