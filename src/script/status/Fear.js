import Functions from "../GameFunctions";
export default class Fear{
    constructor(source) {
        this.sourse = source
        this.status_timer = 0
        this.name = 'Fear'
        this.img_path = 'src/assets/img/icons/skill/step_of_another_world.png'
        this.img_name = 'fear'
        this.frame = 0
        this.frame_tick = 0
        this.max_frame = 7
        this.sprite_w = 20
        this.sprite_h = 20
        this.y_frame_offset = 0
        this.size_x = 40
        this.size_y = 40
        this.duration = Functions.msToTick(3000)
    }

    act(fight_context){
        if(this.frame != null){
            this.cord_x =  this.owner.cord_x - this.size_x/2
            this.cord_y =  this.owner.cord_y -  this.owner.size_y +  this.owner.box_size_y/2
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
        if(tick >= this.duration + this.affect_time){
            this.expire(fight_context)
        }
    }

    expire(fight_context){
        this.status_timer = 0
        this.owner.feared = false
        this.owner.direction_angle = false
        this.owner.status.removeStatus(this)
    }

    affect(fight_context, target){
        this.owner = target
        this.affect_time = fight_context.tick
        this.owner.setImageState('move')
        this.owner.feared = true
        this.owner.direction_angle = Math.random() * (2 * Math.PI)
    }
}