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

    act(char, enemy, effects, proj, map){
        this.frame_timer ++
        if(this.frame_timer == 2){
            this.frame ++
            this.frame_timer = 0
            if(this.frame > this.max_frame){
                this.frame = 0
            }
        }
        enemy.forEach(elem => {
            if(GameFunctions.rectCollision(elem, this) && !elem.is_dead && !elem.damaged){
                let coll_rect = {
                    cord_x : this.cord_x,
                    cord_y : this.cord_y,
                    box_size_x : 100,
                    box_size_y : 50,
                }
                enemy.forEach(elem =>{
                    if(GameFunctions.rectCollision(elem ,coll_rect) && !elem.is_dead && !elem.damaged){
                        elem.damage(GameFunctions.angle(this, elem))
                    }
                })
                this.chain_count--
                effects.push(new FireExplosion(this.cord_x, this.cord_y,coll_rect.box_size_x,coll_rect.box_size_y))
                if(!this.chain_count){
                    proj.splice(proj.indexOf(this),1)
                }
                else {
                    let angle = Math.random() * 6.24
                    this.x_move = Math.sin(angle)
                    this.y_move = Math.cos(angle)
                }
            }
        })
        if(this.setCord(this.x_move, this.y_move, map)){
            let coll_rect = {
                cord_x : this.cord_x,
                cord_y : this.cord_y,
                box_size_x : 100,
                box_size_y : 50,
            }
            this.chain_count--
            effects.push(new FireExplosion(this.cord_x, this.cord_y,coll_rect.box_size_x,coll_rect.box_size_y))
            if(!this.chain_count){
                proj.splice(proj.indexOf(this),1)
            }
            else {
                let angle = this.angle - Math.PI
                this.x_move = Math.sin(angle)
                this.y_move = Math.cos(angle)
            }
        }
    }

}