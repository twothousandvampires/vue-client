import GameObject from "../Scr/GameObject";
import Point from "../Scr/Point";
import Functions from "../GameFunctions";
import GameFunctions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class Projectile extends GameObject{
    constructor(context, x, y) {
        super(context, x, y);
    }

    act(){
        if(this.isOutOfMap()){
            this.outOfMap()
            return
        }
        let player = this.figth_context.player

        if(GameFunctions.rectCollision(this, player) && this.owner !== player){
            this.collisionWithPlayer(player)
            return
        }

        let angle = this.angle
        let total_speed = this.getMovementSpeed()

        let x_move = Math.sin(angle) * total_speed
        let y_move = Math.cos(angle) * total_speed

        this.point.add(x_move, y_move)
    }

    getMovementSpeed(){
        return this.speed
    }

    destroy(){
        let proj = this.figth_context.projectiles
        proj.splice(proj.indexOf(this),1)
    }

    outOfMap(){
        this.destroy()
    }
    collisionWithEnvironment(){
        this.destroy()
    }
    collisionWithEnemy(){
        this.destroy()
    }
    collisionWithPlayer(){
        this.destroy()
    }
}