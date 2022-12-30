import Fatest from "./Fatest";
export default class FasterAttacks{
    constructor() {
        this.status_timer = 0
        this.name = 'Faster attacks'
        this.img_path = 'src/assets/img/icons/skill/faster_attacks.png'
        this.test = new Fatest(this)
    }

    cast(fight_context){
        this.affect(fight_context)
    }

    act(fight_context){
        let tick = fight_context.tick
        if(tick >= (20 * 5) + this.affect_time){
            this.expire(fight_context)
        }
    }

    expire(fight_context){
        this.status_timer = 0
        let player = fight_context.player
        player.attack_speed += 1000
        let index = player.status.indexOf(this)
        player.status.splice(index, 1)

    }

    affect(fight_context){
        let player = fight_context.char
        player.attack_speed -= 1000
        this.affect_time = fight_context.tick
        player.status.push(this)
    }

}