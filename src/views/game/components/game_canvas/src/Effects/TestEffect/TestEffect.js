import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import TestEffectSprite from "@/views/game/components/game_canvas/src/Effects/TestEffect/TestEffectSprite";

export default class TestEffect extends GameObject{

    constructor(context, w = 50, h = 75) {
        super(context)
        this.sprite = new TestEffectSprite(this)
        this.size_x = w
        this.size_y = h
    }
    addCell(cell){
        this.point = new Point(cell.x + cell.width/2, cell.y + cell.height/2 - 1)
    }
    act(){
        this.sprite.act()
    }
}