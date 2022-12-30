import Functions from "../GameFunctions";
export default class FuryOfTheDead{
    constructor(o) {
        this.owner = o
        this.status_timer = 0
        this.name = 'Fury of the dead'
        this.img_name = 'fury_of_the_dead'
        this.frame = 0
        this.frame_tick = 0
        this.max_frame = 3
        this.sprite_w = 20
        this.sprite_h = 20
        this.y_frame_offset = 0
        this.size_x = 40
        this.size_y = 40
        this.durairon = Functions.msToTick(4000)
    }

    act(fight_context){
        if(this.frame != null){
            this.cord_x = this.owner.cord_x - this.size_x/2
            this.cord_y = this.owner.cord_y - this.owner.size_y + this.owner.box_size_y/2
            this.frame_tick ++
            if(this.frame_tick >= 3){
                this.frame ++
                this.frame_tick = 0
                if(this.frame > this.max_frame){
                    this.frame = 0
                }
            }
        }
        let tick = fight_context.tick
        if(tick >= (this.durairon) + this.affect_time){
            this.expire(fight_context)
        }
    }

    expire(fight_context){
        this.status_timer = 0
        this.owner.stats['more_speed'] -= 140
        this.owner.status.removeStatus(this)
    }

    affect(fight_context){
        this.owner.name += 1
        this.affect_time = fight_context.tick
        this.owner.stats['more_speed'] += 140
    }
}