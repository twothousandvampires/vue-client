import Functions from "../../GameFunctions";
import SkullSprite from "./sprite/SkullSprite";
import Damage from "../../Scr/Damage";
import Undead from "@/views/game/components/game_canvas/src/Enemy/src/Undead";

export default class Skull extends Undead{
    constructor(context,x, y) {
        super(context,x, y)
        this.name = 'skull'
        this.state = undefined
        this.size_x = 60
        this.size_y = 60
        this.sprite = new SkullSprite(this)
        this.behavior_timer = 0
        this.move_angle = undefined
        this.life = 2
        this.max_life = 2
        this.movement_speed = 1.5
        this.attack_speed = 1800
        this.attack_range = 15
        this.looking_range = 300


        this.min_attack_damage = 1
        this.max_attack_damage = 3

        this.box_size_x = 25
        this.box_size_y = 9

        this.init()
    }

    attackAct(){
        let player = this.figth_context.player

        if(!this.deal_hit && this.sprite.frame === 5 && this.playerInAttackRadius(player)){
            this.deal_hit = true
            player.takeDamage(this.getDamage())
        }
        if(this.sprite.sprite_end){
            this.getState()
        }
    }

    deadState(){
        this.figth_context.removeEnemy(this)
    }

    dyingAct(){
        if(this.sprite.sprite_end){
            this.deadState()
        }
    }

    canResurect(){
        return false
    }

    getState(){

        let player = this.figth_context.player
        let distance_to_player = Functions.distance(this, player)

        let range = this.getLookingRange()

        if(!player.invisible && !player.dead && this.playerInAttackRadius(player)){
            this.attackState()
        }
        else if(!player.invisible && !player.dead && distance_to_player < range){
            this.pursuitState()
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
        return new Damage(
            this,
            this.getAttackDamage(),
            Damage.DAMAGE_TYPE_PHYSICAL,
            Damage.HIT,
            Damage.HIT_TYPE_MELEE
        )
    }

}