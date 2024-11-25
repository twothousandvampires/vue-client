import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import FireExplosionBigSprite
    from "@/views/game/components/game_canvas/src/Effects/FireExplosionBig/sprite/FireExplosionBigSprite";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";

export default class FireExplosion extends GameObject{

    constructor(context, w = 100, h = 100) {
        super(context)
        this.sprite = new FireExplosionBigSprite(this)
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