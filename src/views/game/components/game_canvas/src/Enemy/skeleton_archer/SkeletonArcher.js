import Functions from "../../GameFunctions";
import Arrow from "../../Projectiles/arrow/Arrow";
import Skull from "../skull/Skull";
import SkeletonArcherSprite from "./sprite/SkeletonArcherSprite";
import Undead from "../src/Undead";
import DefaultAttack from "../../Skills/Combat/DefaultAttack";
import Point from "@/views/game/components/game_canvas/src/Scr/Point";
export default class SkeletonArcher extends Undead{

    constructor(context,x, y) {
        super(context,x, y);
        this.size_x = 100
        this.size_y = 100

        this.skull_will_spawned = Math.random() > 0.5
        this.sprite = new SkeletonArcherSprite(this)

        this.box_size_x = 40
        this.box_size_y = 20
        this.name =  'skeleton archer'

        this.state = undefined

        this.life = 7
        this.max_life = 7
        this.movement_speed = 1.5
        this.attack_speed = 2600
        this.attack_range = 0
        this.looking_range = 250
        this.retreat_range = 80

        this.attack = new DefaultAttack(this)

        this.min_attack_damage = 2
        this.max_attack_damage = 5

        this.behavior_timer = 0
        this.stateAct = undefined

        this.init()
    }
    endTurn(){
        this.deal_hit = false
        this.getState()
        this.figth_context.next(this)
    }
    startTurn(){
        if(this.isDead()){
            this.figth_context.next(this, 0)
            return
        }

        this.attackState()
    }
    dyingAct(){
        if (this.sprite.isSpriteLoopEnd()) {
            if(this.frozen || this.dead_by_ignite){
                this.figth_context.enemy = this.figth_context.enemy.filter(elem => elem !== this)
                return
            }
            if (this.skull_will_appear) {
                this.figth_context.addEnemyToBattle(new Skull(this.figth_context, this.point.x, this.point.y))
            }
            this.deadState()
        }
    }

    attackAct(){
        let player = this.figth_context.player

        if(!this.deal_hit && this.sprite.isLastAttackFrame()){
            this.deal_hit = true
            this.figth_context.projectiles.push(new Arrow(this, this.figth_context, this.point.x, this.point.y - this.size_y/2, Functions.angle({
                point: new Point(this.point.x, this.point.y - this.size_y/2)
            }, player)))
        }
    }

    getState(){
        this.idleState()
        return
        let player = this.figth_context.player
        let distance_to_player = Functions.distance(this, player)

        let range = this.getLookingRange()


        if(!player.dead && !player.invisible && distance_to_player < range){
            this.attackState()
        }

        else if(!player.dead && !player.invisible && distance_to_player < this.retreat_range){
            this.moveState(Functions.angle(player, this))
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