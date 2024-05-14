import Functions from "../../GameFunctions";
import Skull from '../skull/Skull'
import Undead from "../src/Undead";
import DefaultAttack from "../../Skills/Combat/DefaultAttack";
import SkeletonKnightSprite from "./sprite/SkeletonKnightSprite";
export default class SkeletonKnight extends Undead{
    constructor(context, x, y) {
        super(context, x, y)
        this.size_x = 96
        this.size_y = 96

        this.sprite = new SkeletonKnightSprite(this)

        this.box_size_x = 40
        this.box_size_y = 20
        this.name = 'skeleton knight'
        this.skull_will_spawned = Math.random() > 0.5
        this.state = undefined

        this.life = 15
        this.max_life = 15
        this.movement_speed = 1.3
        this.attack_speed = 2200
        this.attack_range = 28
        this.looking_range = 400

        this.attack = new DefaultAttack(this)

        this.min_attack_damage = 2
        this.max_attack_damage = 7

        this.behavior_timer = 0
        this.stateAct = undefined

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

    attackAct(){
        let player = this.figth_context.player

        if(!this.deal_hit && this.sprite.frame === 6 && this.playerInAttackRadius(player)){
            this.deal_hit = true
            this.attack.cast(player)
        }
        if(this.sprite.sprite_end){
            this.getState()
        }
    }

    getState(){

        let player = this.figth_context.player
        let distance_to_player = Functions.distance(this, player)

        let range = this.getLookingRange()

        if( !player.dead && !player.invisible && this.playerInAttackRadius(player)){
            this.attackState()
        }
        else if(!player.dead && !player.invisible && distance_to_player < range){
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

}