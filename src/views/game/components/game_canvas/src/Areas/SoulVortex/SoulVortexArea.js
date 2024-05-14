import GameObject from "../../Scr/GameObject";
import Functions from "../../GameFunctions";
import SoulVortexSprite from "./sprite/SoulVortexSprite";
import Damage from "../../Scr/Damage";

export default class SoulVortexArea extends GameObject{

    constructor(context,x, y, w, h, create_tick) {
        super(context, x, y)
        this.name = 'soul vortex'
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h
        this.sprite = new SoulVortexSprite(this)
        this.created_tick = create_tick
        this.durairon = Functions.msToTick(6000)
        this.damage_row = 0

        this.player_check = setInterval(()=>{
            if(Functions.rectCollision(this, this.figth_context.player)){
                this.figth_context.player.takeDamage(new Damage(this, this.damage_row, Damage.DAMAGE_TYPE_SPELL, Damage.HIT_DIRECT))
                this.damage_row ++
            }
            else {
                this.damage_row = 0
            }
        }, 1000)
    }


    act(){
        let fight_context = this.figth_context
        let tick = fight_context.tick
        if(tick >= (this.durairon) + this.created_tick){
            let {areas_before} = fight_context
            clearInterval(this.player_check)
            areas_before.splice(areas_before.indexOf(this),1)
        }

        this.sprite.act()
    }
}