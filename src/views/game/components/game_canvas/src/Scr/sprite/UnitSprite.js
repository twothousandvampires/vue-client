import Sprite from "../Sprite";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class UnitSprite extends Sprite{
    constructor(owner) {
        super()
        this.owner = owner
        this.draw_y_offset = -20
    }

    reset(){
        this.reversed = false
        this.frame = 0
        this.frame_timer = 0
        this.sprite_loop_end = false
        this.setImgState()
    }

    increase(inc_w, inc_h){
        this.width += inc_w
        this.height += inc_h
    }
    saveSprite(){
        this.previous_max_frame = this.max_frame
        this.previous_frame = this.frame
        this.previous_frame_timer = this.frame_timer
        this.previous_y_frame_offset = this.y_frame_offset
        this.previous_frame_timer_max = this.frame_timer_max
    }
    returnPreviousSprite(){
        this.max_frame = this.previous_max_frame
        this.frame = this.previous_frame
        this.frame_timer = this.previous_frame_timer
        this.y_frame_offset = this.previous_y_frame_offset
        this.frame_timer_max = this.previous_frame_timer_max
    }
    init(){
        this.frame = Functions.random(this.max_frame,0)
    }
}