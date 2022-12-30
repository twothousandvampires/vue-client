import GameObject from "../scr/GameObject";
import Functions from "../GameFunctions";

export default class SoulVortex extends GameObject{

    constructor(x, y, w, h, create_tick) {
        super(x, y)
        this.img_name = 'soul_vortex'
        this.max_frame = 6
        this.frame_change_tick = 3
        this.size_x = w
        this.size_y = h
        this.box_size_y = h
        this.box_size_x = w

        this.sprite_w = 80
        this.sprite_h = 40
        this.created_tick = create_tick
        this.durairon = Functions.msToTick(3000)
    }


    act(fight_context){
        let tick = fight_context.tick
        if(tick >= (this.durairon) + this.created_tick){
            let {areas_before} = fight_context
            areas_before.splice(areas_before.indexOf(this),1)
        }
        this.frame_timer ++
        if(this.frame_timer === this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === this.max_frame){
                this.frame = 0
            }
        }
    }
}