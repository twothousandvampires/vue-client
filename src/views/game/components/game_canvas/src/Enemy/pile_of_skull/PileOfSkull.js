import Skull from "../skull/Skull";
import Undead from "../src/Undead";
import PileOfSkullsSprite from "./sprite/PileOfSkullsSprite";

export default class PileOfSkull extends Undead {
    constructor(context, x, y) {
        super(context,x, y)
        this.name = 'pile of skull'
        this.state = undefined
        this.behavior_timer = 0
        this.move_angle = undefined
        this.sprite = new PileOfSkullsSprite(this)
        this.skull_will_spawned = Math.floor(Math.random() * (12 - 8) + 8)
        this.size_x = 80
        this.size_y = 80
        this.box_size_x = 40
        this.box_size_y = 20
        this.can_create = true
        this.attack_speed = 4000
        this.life = 25
        this.max_life = 25
        this.speed = 0
        this.spawn_cords = [
            [-40,-40],
            [0,-40],
            [40,-40],
            [0,-40],
            [0,40],
            [-40,40],
            [0,40],
            [40,40],
            [-40,-40],
            [0,-40],
            [40,-40],
            [0,-40],
        ]
        this.init()
    }

    dyingAct(){
        if(this.sprite.sprite_end){
            if(this.skull_will_spawned){
                for(let i = 0; i < this.skull_will_spawned; i++){
                    let skull = new Skull(this.figth_context, 0, 0)
                    this.figth_context.addEnemyToBattle(skull, this.point.x + this.spawn_cords[i][0],this.point.y + this.spawn_cords[i][1])
                }
            }
            this.deadState()
        }
    }

    attackAct(){
        if(this.sprite.sprite_end){
            this.figth_context.enemy.push(new Skull(this.figth_context, this.point.x + 15, this.point.y + 15))
            this.getState()
        }
    }

    getState(){
        if(this.can_create){
            this.can_create = false
            setTimeout(()=>{
                this.can_create = true
            }, 14000)
            this.attackState()
        }
        else {
            this.idleState()
        }
    }

}