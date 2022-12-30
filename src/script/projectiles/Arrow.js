import GameObject from "../scr/GameObject";
import GameFunctions from '../GameFunctions'
import Functions from "../GameFunctions";
import UnitData from "../UnitData";
export default class Arrow extends GameObject{

    constructor(x, y ,angle) {
        super(x, y);
        this.name = 'skeleton arrow'
        this.img_name = 'arrow'
        this.angle = angle
        this.speed = 15
        this.box_size_x = 6
        this.sprite_w = 27
        this.sprite_h = 30
        this.box_size_y = 6
        this.size_x = 16
        this.size_y = 26
        this.stats = UnitData.get(this.name)
        this.x_move = Math.sin(angle)
        this.y_move = Math.cos(angle)
    }

    act(figth_context){
        let char = figth_context.player
        let proj = figth_context.projectiles
        if(GameFunctions.rectCollision(this, char)){
            char.takeDamage(this)
            proj.splice(proj.indexOf(this),1)
            return
        }
        if(this.setCord(this.x_move, this.y_move, figth_context)){
            proj.splice(proj.indexOf(this),1)
        }
    }

}