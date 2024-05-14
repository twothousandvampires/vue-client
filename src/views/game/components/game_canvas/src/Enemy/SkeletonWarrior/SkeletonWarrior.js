import Functions from "../../GameFunctions";
import Skull from '../skull/Skull'
import SkeletonWarriorSprite from "./Sprite/SkeletonWarriorSprite";
import Undead from "../src/Undead";
import DefaultAttack from "../../Skills/Combat/DefaultAttack";
export default class SkeletonWarrior extends Undead{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100

        this.sprite = new SkeletonWarriorSprite(this)

        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'skeleton'
        this.skull_will_appear = false

        this.min_attack_damage = 2
        this.max_attack_damage = 7
        this.life = 10
        this.max_life = 10
        this.movement_speed = 1.5
        this.attack_speed = 1800
        this.attack_range = 30
        this.looking_range = 300
        this.speed = 3

        this.attack = new DefaultAttack(this)

        this.behavior_timer = 0
        this.stateAct = undefined
        this.state = undefined
        this.init()
    }
    startTurn(){
        if(this.isDead()){
            this.figth_context.next(this, 0)
            return
        }
        if(this.figth_context.checkLine(this.num)){
            this.attackState()
            return;
        }
        this.figth_context.next(this, 0)
    }
    dyingAct() {
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

    attackAct() {
        let player = this.figth_context.player

        if (!this.struck && this.sprite.isLastAttackFrame()) {
            this.struck = true
            player.takeAttackDamage(this.attack.getDamageDescription(), this)
        }
        if (this.sprite.isSpriteLoopEnd()) {
            this.getState()
            this.figth_context.next(this)
        }
    }

    getState(){
        this.idleState()
        return
        let player = this.figth_context.player
        let distance_to_player = Functions.distance(this, player)

        let range = this.getLookingRange()

        let player_can_be_attack = player.canBeAttackTarget()

        if(player_can_be_attack && this.playerInAttackRadius(player)){
            this.attackState()
        }
        else if(player_can_be_attack && distance_to_player < range){
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