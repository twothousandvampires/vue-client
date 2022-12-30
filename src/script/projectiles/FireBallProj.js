import GameObject from "../scr/GameObject";
import GameFunctions from '../GameFunctions'
import Functions from "../GameFunctions";
import FireExplosion from "../Effects/FireExplosion";

export default class FireBallProj extends GameObject{

    constructor(x, y ,angle) {
        super(x, y);
        this.chain_count = 3
        this.img_name = 'fire_ball'
        this.angle = angle
        this.speed = 6
        this.box_size_x = 10
        this.sprite_w = 40
        this.sprite_h = 40
        this.box_size_y = 10
        this.size_x = 25
        this.size_y = 25
        this.x_move = Math.sin(angle)
        this.y_move = Math.cos(angle)
        this.max_frame = 7
    }

    act(fight_context){
        let {player, enemy, effects, proj, map} = fight_context
        this.frame_timer ++
        if(this.frame_timer == 2){
            this.frame ++
            this.frame_timer = 0
            if(this.frame > this.max_frame){
                this.frame = 0
            }
        }
        let angle = this.angle - Math.PI
        this.x_move = Math.sin(angle)
        this.y_move = Math.cos(angle)
        this.setCord(this.frame, this.y_move, fight_context)
    }

}