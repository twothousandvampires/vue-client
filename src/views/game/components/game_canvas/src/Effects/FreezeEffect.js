import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import FreezeEffectSprite from "@/views/game/components/game_canvas/src/Effects/FreezeEffectSprite";

export default class FreezeEffect extends GameObject{

    constructor(context, w = 50, h = 75) {
        super(context)
        this.sprite = new FreezeEffectSprite(this)
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