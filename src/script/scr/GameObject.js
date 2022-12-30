import Functions from "../GameFunctions";
import Point from "./Point";
export default class GameObject {

    constructor(x = 0, y = 0) {
        this.point = new Point(x, y)
        this.fliped = false
        this.move_angle = undefined
        this.target = undefined
    }

    getStat(stat){

        let flat = this.stats[stat]
        if(!flat){
            return  0
        }

        let increase, more
        if(stat === 'max_life'){
            increase = this.stats['increased_life'] ? this.stats['increased_life'] : 0
            more = this.stats['more_life'] ? this.stats['more_life'] : 0
        }
        else if(stat === 'min_attack_damage' || stat === 'max_attack_damage'){
            increase = this.stats['increased_attack_damage'] ? this.stats['increased_attack_damage'] : 0
            more = this.stats['more_attack_damage'] ? this.stats['more_attack_damage'] : 0
        }
        else {
            increase = this.stats['increased_' + stat] ? this.stats['increased_' + stat] : 0
            more = this.stats['more_' + stat] ? this.stats['more_' + stat] : 0
        }

        if(increase !== 0){
            if(stat == 'cast_speed' || stat == 'attack_speed'){
                flat = Functions.reducedByPercent(flat, increase)
            }
            else {
                flat = Functions.increasedByPercent(flat, increase)
            }
        }
        if(more !== 0){
            if(stat == 'cast_speed' || stat == 'attack_speed'){
                flat = Functions.reducedByPercent(flat, more)
            }
            else {
                flat = Functions.increasedByPercent(flat, more)
            }

        }

        return flat
    }

     getIncrease(stat){
       return this.stats['increased_' + stat] ? this.stats['increased_' + stat] : 0
    }

    setCord(x, y, fight_context) {
        let x_coll, y_coll = false
        let map = fight_context.map
        let units = fight_context.enemy.concat(fight_context.player)
        let total_speed = this.getStat('speed')
        if (!this.collWithEnemy(units, x * total_speed,true)
            && !this.collWithRocks(map, x * total_speed, true)
            && !(this.point.x + x * total_speed >= map.start_x + map.width)
            && !(this.point.x + x * total_speed <= map.start_x)) {

            this.point.add( x * total_speed, 0)
        }
        else {
            x_coll = true
        }
        if (!this.collWithEnemy(units, y, false)
            && !this.collWithRocks(map, y, false)
            && !(this.point.y + y * total_speed >= map.start_y + map.height)
            && !(this.point.y + y * total_speed <= map.start_y)) {

            this.point.add(0, y * total_speed)
        }
        else {
            y_coll = true
        }
        return x_coll || y_coll
    }

    collWithEnemy(enemy, move, horizontal){
        if(this.phased){
            return  false
        }
        let move_rect = {
            x : this.point.x + (horizontal ? move : 0),
            y : this.point.y + (!horizontal ? move : 0),
            width : this.box.width,
            height : this.box.height
        }
        for(let i = 0; i < enemy.length; i++){
            if(Functions.rectCollision(move_rect, enemy[i].getBoxRect()) && enemy[i] != this && enemy[i].state != 'dying'){
                return true
            }
        }
        return false
    }

    collWithRocks(map, move, horizontal) {
        if(this.inmaterial){
            return false
        }
        let move_rect = {
            x : this.point.x + (horizontal ? move : 0),
            y : this.point.y + (!horizontal ? move : 0),
            width : this.box.width,
            height : this.box.height
        }
        for(let i = 0; i < map.rocks.length; i++){
            if(Functions.rectCollision(move_rect, map.rocks[i])){
                return true
            }
        }
        return false
    }

    getBoxRect(){
        return {
            x: this.point.x,
            y: this.point.y,
            width: this.box.width,
            height: this.box.height
        }
    }
}