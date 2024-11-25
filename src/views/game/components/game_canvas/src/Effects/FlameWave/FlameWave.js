import Point from "@/views/game/components/game_canvas/src/Scr/Point";
import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import FlameWaveSprite from "@/views/game/components/game_canvas/src/Effects/FlameWave/FlameWaveSprite";

export default class FlameWave extends GameObject{

    constructor(context, w = 60, h = 90) {
        super(context)
        this.sprite = new FlameWaveSprite(this)
        this.size_x = w
        this.size_y = h
    }
    addCell(cell){
        this.point = new Point(cell.x - cell.width/3, cell.y + cell.height/2)
    }
    act(){
        this.sprite.act()
    }
}