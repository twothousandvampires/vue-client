import Point from "@/views/game/components/game_canvas/src/Scr/Point"
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import SparkEffectSprite from "./SparkEffectSprite";

export default class SparkEffect extends GameObject{

    constructor(context, w = 60, h = 60) {
        super(context)
        this.sprite = new SparkEffectSprite(this)
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