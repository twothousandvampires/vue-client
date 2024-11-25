import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import VampiricRiteSprite from "@/views/game/components/game_canvas/src/Effects/VampiricRIte/VampiricRiteSprite";

export default class VampiricRiteEffect extends GameObject{

    constructor(context, w = 400, h = 400) {
        super(context)
        this.sprite = new VampiricRiteSprite(this)
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