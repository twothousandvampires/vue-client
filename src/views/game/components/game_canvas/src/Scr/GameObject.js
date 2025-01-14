import Functions from "../GameFunctions";
import Point from "./Point";

export default class GameObject {

    constructor(context, x = 0, y = 0) {
        this.fight_context = context
        this.point = new Point(x, y)
        this.fliped = false
    }

    setPoint(x, y){
        if(x){
            this.point.x = x
        }
        if(y){
            this.point.y = y
        }
    }

    isOutOfMap(){
        let map = this.fight_context.map
        return this.point.x >= map.start_x + map.width
               || this.point.x <= map.start_x
               || this.point.y >= map.start_y + map.height
               || this.point.y <= map.start_y
    }

    checkXcoll(x, map, units){
        return this.point.x + x >= map.start_x + map.width
            || this.point.x + x <= map.start_x
            || this.collWithEnemyNextStep(units, x,true)
            || this.collWithRocksNextStep(map, x, true)
    }

    checkYcoll(y, map, units){
        return this.point.y + y >= map.start_y + map.height
            || this.point.y + y <= map.start_y
            || this.collWithEnemyNextStep(units, y, false)
            || this.collWithRocksNextStep(map, y, false)
    }

    addPointIfPossible(x, y) {
        let fight_context = this.fight_context
        let map = fight_context.map
        let units = fight_context.enemy.concat(fight_context.player)

        let y_move =  y.toFixed(2)
        let x_move =  x.toFixed(2)

        let x_coll = this.checkXcoll(+x_move, map, units)
        let y_coll = this.checkYcoll(+y_move, map, units)

        if(!x_coll){
            this.point.add(+x_move, 0)
        }
        if(!y_coll){
            this.point.add(0, +y_move)
        }
    }

    collWithEnemyNextStep(enemy, move, horizontal){
        if(this.phased){
            return  false
        }
        let move_rect = {
            point: new Point(this.point.x + (horizontal ? move : 0), this.point.y + (!horizontal ? move : 0)),
            box_size_x : this.box_size_x,
            box_size_y : this.box_size_y,
        }
        for(let i = 0; i < enemy.length; i++){
            if(enemy[i].isDead() || enemy[i] === this || enemy[i].phased){
                continue
            }
            if(Functions.rectCollision(move_rect, enemy[i])){
                return true
            }
        }
        return false
    }

    collWithEnemy(){
        let enemy = this.fight_context.enemy
        let exclude = Array.from(arguments);

        for(let i = 0; i < enemy.length; i++){
            if (!enemy[i].isDead() && !enemy[i].phased && Functions.rectCollision(this, enemy[i]) && !exclude.includes(enemy[i])){
                return enemy[i]
            }
        }

        return false
    }

    collWithRocksNextStep(map, move, horizontal) {
        if(this.inmaterial){
            return false
        }
        let move_rect = {
            point: new Point(this.point.x + (horizontal ? move : 0), this.point.y + (!horizontal ? move : 0)),
            box_size_x : this.box_size_x,
            box_size_y : this.box_size_y,
        }
        for(let i = 0; i < map.environment.length; i++){
            if(Functions.rectCollision(move_rect, map.environment[i])){
                return true
            }
        }
        return false
    }
}