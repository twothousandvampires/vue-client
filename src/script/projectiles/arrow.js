import GameObject from "../scr/GameObject";
import GameFunctions from '../GameFunctions'
import Functions from "../GameFunctions";
export default class Arrow extends GameObject{

    constructor(x, y ,angle) {
        super(x, y);
        this.img_name = 'arrow'
        this.angle = angle
        this.speed = 15
        this.box_size_x = 6
        this.sprite_w = 27
        this.sprite_h = 30
        this.box_size_y = 6
        this.size_x = 16
        this.size_y = 26
        this.x_move = Math.sin(angle)
        this.y_move = Math.cos(angle)
    }

    setCord(x ,y){
        if(!(this.cord_x + x * this.speed >= 1050) && !(this.cord_x + x * this.speed <= 250)){
            this.cord_x += x * this.speed
        }
        else {
            return false
        }
        if(!(this.cord_y + y * this.speed >= 1175) && !(this.cord_y + y * this.speed <= 375)){
            this.cord_y += y * this.speed
        }
        else {
            return false
        }
        return true
    }


    act(char, enemy, effects, proj){
        if(GameFunctions.rectCollision(this, char)){
            char.damage(Functions.angle(this, char))
            proj.splice(proj.indexOf(this),1)
            return
        }
        if(!this.setCord(this.x_move, this.y_move)){
            proj.splice(proj.indexOf(this),1)
        }
    }

}