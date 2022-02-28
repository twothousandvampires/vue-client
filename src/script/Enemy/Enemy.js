import Functions from '/src/script/GameFunctions.js'

export class Enemy{

    constructor(x, y, dist) {

        this.cord_x = x
        this.cord_y = y
        this.state = 'idle'
        this.box_x = 50
        this.box_y = 25

        this.move_offset = 0

        this.size_x = 50
        this.size_y = 50
        // 20 = 1c
        this.change_behavior_time = Math.floor(Math.random() * (100 - 60) + 60)
    }

    setCord(x,y){
        this.cord_x += x
        this.cord_y += y
    }

    behaviorTimer(){
        if(this.change_behavior_time !== 0){
            this.change_behavior_time -= 1;
        }
    }

    setBehaviorTime(time){
        this.change_behavior_time = time
    }

    draw(game){
        game.ctx.drawImage(game.img_data.getImage('system_1_not_visited'),0,0,100,100,this.cord_x - this.box_x/2,this.cord_y - (this.size_y - this.box_y/2),this.size_x,this.size_y)
    }

    act(game){
        console.log(this.state)
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
        }
    }

    aroundBehavior(char){

        let angle = Functions.angle(this, char) + Number(this.move_offset)

        this.setCord(Math.sin(angle),Math.cos(angle))

        if(!this.change_behavior_time){
            if(Functions.distance(this,char) > 150){
                this.state = 'move'
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehaviorTime(40)
            }
            else {
                this.state = 'idle'
                this.setBehaviorTime(40)
            }
        }
    }

    moveBehavior(char){

        let angle = Functions.angle(this, char) + Number(this.move_offset)
        this.setCord(Math.sin(angle),Math.cos(angle))

        if(!this.change_behavior_time){
            if(Functions.distance(this,char) > 150){
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehaviorTime(40)
            }
            else {
                this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                this.state = 'around'
                this.setBehaviorTime(40)
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
                this.setBehaviorTime(40)
            }
        }
    }
}