import GameObject from "@/views/game/components/game_canvas/src/Scr/GameObject";
import IcyNovaSprite from "@/views/game/components/game_canvas/src/Areas/IcyNova/Sprite/IcyNovaSprite";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Freeze from "@/views/game/components/game_canvas/src/Status/Freeze/Freeze";
import Unit from "@/views/game/components/game_canvas/src/Scr/Unit";

export default class IcyNovaArea extends GameObject{
    static DEFAULT_W = 80
    static DEFAULT_H = 40
    constructor(context,x, y, source, w = IcyNovaArea.DEFAULT_W, h = IcyNovaArea.DEFAULT_H, grow_radius_x = 10,
                grow_radius_y, freeze_duration) {
        super(context,x, y);
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h
        this.grow_radius_x = grow_radius_x
        this.grow_radius_y = grow_radius_y
        this.sprite = new IcyNovaSprite(this)
        this.source = source
        this.stage = 0
        this.max_stage = 7
        this.hitted = []
        this.freeze_duration = freeze_duration
    }

    act(){
        this.fight_context.enemy.forEach(elem => {
            if(!this.hitted.includes(elem) && Functions.rectCollision(this, elem)){
                this.hitted.push(elem)
                elem.newStatus(new Freeze(this.freeze_duration))
                elem.takeSpellDamage(this.source.getDamageDescription(), this)
            
            }
        })
        this.size_y += this.grow_radius_y
        this.size_x += this.grow_radius_x

        this.box_size_y += this.grow_radius_y
        this.box_size_x += this.grow_radius_x

        this.sprite.act()
        this.stage ++
        if(this.stage >= this.max_stage){
            this.fight_context.deleteArea(this)
        }
    }
}