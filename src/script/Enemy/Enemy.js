import Functions from '/src/script/GameFunctions.js'

export default class Enemy{

    constructor(x, y, dist) {
        this.cord_x = x + 200
        this.cord_y = y + 400
        this.deal_hit = false
        this.fliped = false
        this.direct_move_vector = undefined
        // 20 = 1c

        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms

        this.can_move = true
        this.frozen = false
        this.stunned = false

        this.is_cast = false
        this.is_poution = false
        this.is_scroll = false
        this.is_idle = true
        this.is_move = false
        this.is_attack = false
        this.deal_hit = false

        this.box_size_x = 46
        this.box_size_y = 30

        this.frame = 0
        this.frame_timer = 0

        this.speed = 2
    }

    setCord(x,y){
        this.cord_x += x * this.speed
        this.cord_y += y * this.speed
    }

    setBehavior(type = 'idle', ms = 0){
        this.image.frame = 0
        this.image.frame_timer = 0
        this.change_behavior_time = ms/50
        this.state = type
    }

    behaviorTimer(){
        if(this.change_behavior_time !== 0){
            this.change_behavior_time -= 1;
        }
    }

    act(char){
        this.behaviorTimer()
        switch (this.state){
            case 'idle':
                this.idleBehavior(char)
                break;
            case 'move':
                this.moveBehavior(char)
                break;
            case 'around':
                this.aroundBehavior(char)
                break;
            case 'attack':
                this.attackBehavior(char)
                break;
            case 'retreat':
                this.retreatBehavior(char)
                break;
            case 'charge':
                this.chargeBehavior(char)
                break;
            default :
                this.idleBehavior(char);
                break;
        }
    }

    angleToAttackRect(angle){

    }

    chargeBehavior(){
        this.setCord(Math.sin(this.charge_angle),Math.cos(this.charge_angle))
        if(Functions.distance(this, {cord_x : this.start_point_x,cord_y : this.start_point_y}) > 400){
            this.speed = 2
            this.charge_angle = 0
            this.setBehavior('idle',1000)
        }
    }

    retreatBehavior(char){
        let distance = Functions.distance(this,char)

        let angle = Functions.angle(this, char) + Number(this.move_offset)
        this.setCord(-Math.sin(angle),-Math.cos(angle))

        if(!this.change_behavior_time){
            if(distance > 200){
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehavior('move',2000)
            }
            else if (distance < 50){
                this.setBehavior('attack',this.attack_speed + 100)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.setBehavior('around',2000)
                }
                else {
                    this.move_offset = (Math.random() * (0.3)).toFixed(2)
                    this.setBehavior('move',2000)
                }
            }
        }

    }

    attackBehavior(char){
        if(this.image.frame >= 4 && !this.deal_hit){
            let angle = Functions.angle(this,char)
            this.attack_rect = this.angleToAttackRect(angle)
            this.deal_hit = true
        }
        if(!this.change_behavior_time){
            this.deal_hit = false
            let rng = (Math.random()).toFixed(1)
            if( rng > 0.5 ){
                this.setBehavior('attack',this.attack_speed)
            }
            else {
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehavior('retreat',3000)
            }
        }
    }

    aroundBehavior(char){

        let angle = Functions.angle(this, char) + Number(this.move_offset)
        this.setCord(Math.sin(angle),Math.cos(angle))

        let distance = Functions.distance(this,char)

        if(!this.change_behavior_time){
            if(distance > 200){
                if(this.can_charge){
                    this.start_point_x = this.cord_x
                    this.start_point_y = this.cord_y
                    this.charge_angle = angle
                    this.speed = 4
                    this.setBehavior('charge')
                }
                else{
                    this.move_offset = (Math.random() * (0.3)).toFixed(2)
                    this.setBehavior('move',2000)
                }
            }
            else if (distance < 50){
                this.setBehavior('attack',this.attack_speed + 100)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.state = 'around'
                    this.setBehavior('around',1500)
                }
                else {
                    this.move_offset = (Math.random() * (0.3)).toFixed(2)
                    this.setBehavior('move',2000)
                }
            }
        }
    }

    moveBehavior(char){

        let angle = Functions.angle(this, char) + Number(this.move_offset)
        let move_x = Math.sin(angle)
        this.fliped = move_x <= 0;
        this.setCord(Math.sin(angle),Math.cos(angle))

        let distance = Functions.distance(this,char)

        if(!this.change_behavior_time){
            if(distance > 200){
                if(this.can_charge){
                    this.start_point_x = this.cord_x
                    this.start_point_y = this.cord_y
                    this.charge_angle = angle
                    this.speed = 4
                    this.setBehavior('charge')
                }
                else{
                    this.setBehavior('move',2000)
                }
            }
            else if(distance < 50){
                this.setBehavior('attack',this.attack_speed + 100)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.state = 'around'
                    this.setBehavior('around',2000)
                }
                else {
                    this.setBehavior('move',2000)
                }
            }
        }

    }

    idleBehavior(char){

    }
}