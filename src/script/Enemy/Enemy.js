import Functions from '/src/script/GameFunctions.js'

export default class Enemy{

    constructor(x, y, dist) {

        this.cord_x = x
        this.cord_y = y
        this.state = 'idle'
        this.box_x = 50
        this.box_y = 25

        this.move_offset = 0

        this.can_charge = true
        this.speed = 1

        this.size_x = 50
        this.size_y = 50
        // 20 = 1c
        this.change_behavior_time = Math.floor(Math.random() * (40 - 20) + 20)
    }

    setCord(x,y){
        this.cord_x += x * this.speed
        this.cord_y += y * this.speed
    }

    behaviorTimer(){
        if(this.change_behavior_time !== 0){
            this.change_behavior_time -= 1;
        }
    }

    setBehaviorTime(time){
        this.image.frame = 0
        this.image.frame_timer = 0
        this.change_behavior_time = time
    }

    draw(game){
        let sheet = this.image['move']

        if(sheet){
            this.image.frame_timer ++
            if(this.image.frame_timer === 6){
                this.image.frame_timer = 0
                this.image.frame += 1
                if(this.image.frame === sheet.max_frame){
                    this.image.frame = 0
                }
            }
        }


        game.ctx.fillStyle = ' yellow'
        game.ctx.fillText(this.state, this.cord_x - this.box_x/2 , this.cord_y - (this.size_y - this.box_y/2) - 10)

        if(sheet){
            game.ctx.drawImage(this.image.src, sheet.sprite_size_w * this.image.frame,sheet.y_offset,sheet.sprite_size_w - 2,sheet.sprite_size_h,this.cord_x - this.box_x/2,this.cord_y - (this.size_y - this.box_y/2),this.size_x,this.size_y)
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
        }
    }

    setBehavior(){

    }

    chargeBehavior(){

        this.setCord(Math.sin(this.charge_angle),Math.cos(this.charge_angle))

        if(Functions.distance(this, {cord_x : this.start_point_x,cord_y : this.start_point_y}) > 400){

            this.state = 'idle'
            this.speed = 1
            this.charge_angle = 0
            this.setBehavior(40)
        }

    }

    retreatBehavior(char){
        let distance = Functions.distance(this,char)

        let angle = Functions.angle(this, char) + Number(this.move_offset)
        this.setCord(-Math.sin(angle),-Math.cos(angle))

        if(!this.change_behavior_time){
            if(distance > 200){
                this.state = 'move'
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehaviorTime(10)
            }
            else if (distance < 50){
                this.state = 'attack'
                this.setBehavior(30)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.state = 'around'
                    this.setBehaviorTime(10)
                }
                else {
                    this.state = 'move'
                    this.move_offset = (Math.random() * (0.3)).toFixed(2)
                    this.setBehaviorTime(10)
                }
            }
        }

    }

    attackBehavior(char){

        if(!this.change_behavior_time){
            let rng = (Math.random()).toFixed(1)
            if( rng > 0.5 ){
                this.setBehaviorTime(30)
            }
            else {
                this.state = 'retreat'
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehaviorTime(25)
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
                    this.state = 'charge'
                    this.start_point_x = this.cord_x
                    this.start_point_y = this.cord_y
                    this.charge_angle = angle
                    this.speed = 4
                }
                else{
                    this.state = 'move'
                    this.move_offset = (Math.random() * (0.3)).toFixed(2)
                    this.setBehaviorTime(10)
                }
            }
            else if (distance < 50){
                this.state = 'attack'
                this.setBehavior(30)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.state = 'around'
                    this.setBehaviorTime(10)
                }
                else {
                    this.state = 'move'
                    this.move_offset = (Math.random() * (0.3)).toFixed(2)
                    this.setBehaviorTime(10)
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
                    this.state = 'charge'
                    this.start_point_x = this.cord_x
                    this.start_point_y = this.cord_y
                    this.charge_angle = angle
                    this.speed = 4
                }
                else{
                    this.setBehaviorTime(10)
                }
            }
            else if(distance < 50){
                this.state = 'attack'
                this.setBehavior(30)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.state = 'around'
                    this.setBehaviorTime(10)
                }
                else {
                    this.setBehaviorTime(10)
                }
            }
        }

    }

    idleBehavior(char){

        if(!this.change_behavior_time){

            if(Functions.distance(this,char) > 150){
                this.state = 'move'
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehaviorTime(20)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.state = 'around'
                    this.setBehaviorTime(10)
                }
                else {
                    this.setBehaviorTime(10)
                }
            }
        }
    }
}