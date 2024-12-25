import Point from "@/views/game/components/game_canvas/src/Scr/Point"
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import MagicExplosionSprite from "./MagicExplosionSprite";

export default class MagicExplosion extends GameObject{

    constructor(context, w = 100, h = 100) {
        super(context)
        this.sprite = new MagicExplosionSprite(this)
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
