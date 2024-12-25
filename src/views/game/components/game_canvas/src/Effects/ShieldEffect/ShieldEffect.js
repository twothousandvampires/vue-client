import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import ShieldEffectSprite from "./ShiledEffectSprite";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class ShiledEffect extends GameObject{

    constructor(context, source, target, move_angle, w = 60, h = 60)  {
        super(context)
        this.angle = 0
        this.move_angle = move_angle
        this.source = source
        this.target = target
        this.size_x = w
        this.size_y = h
        this.sprite = new ShieldEffectSprite(this)
    }
    addCell(){
        
    }
    act(){
        this.angle ++
        let move_x = Math.sin(this.move_angle) * 20
        let move_y = Math.cos(this.move_angle) * 20
        this.point.add(move_x, move_y)
        if(Functions.pointInRect(this.point.x, this.point.y, this.target)){
            this.source.hit()
        }
    }
}