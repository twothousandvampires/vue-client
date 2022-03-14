import Functions from '/src/script/GameFunctions.js'

export default class Enemy{

    constructor(x, y, dist) {
        this.cord_x = x
        this.cord_y = y
        this.state = 'idle'
        this.deal_hit = false
        this.move_offset = 0
        this.fliped = false
        this.direct_move_vector = undefined
        // 20 = 1c
        this.change_behavior_time = Math.floor(Math.random() * (40 - 20) + 20)
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

    act(game){
        this.behaviorTimer()
        switch (this.state){
            case 'idle':
                this.idleBehavior(game.char)
                break;
            case 'move':
                this.moveBehavior(game.char)
                break;
            case 'around':
                this.aroundBehavior(game.char)
                break;
            case 'attack':
                this.attackBehavior(game.char)
                break;
            case 'retreat':
                this.retreatBehavior(game.char)
                break;
            case 'charge':
                this.chargeBehavior(game.char)
                break;
            default :
                this.idleBehavior(game.char);
                break;
        }
    }

    draw(game){
        let sheet = this.image[this.state]
        this.image.frame_timer ++
        if(this.image.frame_timer >= sheet.tick()){
            this.image.frame_timer = 0
            this.image.frame += 1
            if(this.image.frame === sheet.max_frame && this.state !== 'attack'){
                this.image.frame = 0
            }
            else if(this.image.frame === sheet.max_frame && this.state === 'attack'){
                this.image.frame = sheet.max_frame - 1
            }
        }

        // show state
        // game.ctx.fillStyle = ' yellow'
        // game.ctx.fillText(this.state, this.cord_x - this.box_size_x/2 , this.cord_y - (this.size_y - this.box_size_y/2) - 10)

        let f_x = ((this.size_x * sheet.sprite_size_w) / this.image.default_sprite_size_x) - this.size_x
        let f_y = ((this.size_y * sheet.sprite_size_h) / this.image.default_sprite_size_y) - this.size_y

        game.ctx.drawImage(this.image.src, sheet.sprite_size_w * this.image.frame,sheet.y_offset,sheet.sprite_size_w - 2,sheet.sprite_size_h,
            this.cord_x - this.size_x/2 - f_x/2,this.cord_y - (this.size_y/2 + (this.size_y/2 - this.box_size_y/2)) - f_y/2,this.size_x + f_x,
            this.size_y + f_y)

        // show box
        game.ctx.fillStyle = 'blue'
        game.ctx.fillRect(this.cord_x - this.box_size_x/2,this.cord_y - this.box_size_y/2,this.box_size_x,this.box_size_y)
        // show attack rect
        // game.ctx.fillStyle = 'yellow'
        // game.ctx.fillRect(this.attack_rect.cord_x,this.attack_rect.cord_y,this.attack_rect.box_size_x,this.attack_rect.box_size_y)
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