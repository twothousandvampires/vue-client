import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import SwipeSprite from "@/views/game/components/game_canvas/src/Effects/Swipe/SwipeSprite";

export default class Swipe extends GameObject{

    constructor(context, w = 60, h = 60) {
        super(context)
        this.sprite = new SwipeSprite(this)
        this.size_x = w
        this.size_y = h
    }
    addCell(cell){
        this.point = new Point(cell.x + cell.width/2, cell.y + cell.height/2)
    }
    act(){
        this.sprite.act()
    }
}