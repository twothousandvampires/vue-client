import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import StunSprite from "./StunSprite";

export default class StunEffect extends GameObject{

    constructor(context, w = 60, h = 60) {
        super(context)
        this.sprite = new StunSprite(this)
        this.size_x = w
        this.size_y = h
    }
    addCell(cell){
        this.point = new Point(cell.x + cell.width/2, cell.y - 40)
    }
    act(){
        this.sprite.act()
    }
}