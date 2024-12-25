import ChainLightSprite from "./sprite/ChainLightSprite";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";

export default class LuminousArcEffect extends GameObject{

    constructor(context, angle, length)  {
        super(context)
        this.size_x = length / 4
        this.size_y = length
        this.angle = angle
        this.sprite = new ChainLightSprite(this)
        console.log(this.angle)
    }
    addCell(){
        
    }
    act(){
        this.sprite.act()
    }
}