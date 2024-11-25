import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import SoulVortexSprite from "@/views/game/components/game_canvas/src/Effects/SoulVortex/SoulVortexSprite";

export default class SoulVortexEffect extends GameObject{

    constructor(context, w = 120, h = 60) {
        super(context)
        this.sprite = new SoulVortexSprite(this)
        this.size_x = w
        this.size_y = h
        this.type = 'ground'
    }
    addCell(cell){
        this.point = new Point(cell.x + cell.width/2, cell.y + cell.height/2)
    }
    act(){
        this.sprite.act()
    }
}