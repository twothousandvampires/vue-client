import FireCoil from "../FireCoil";
export default class StepOfAnotherWorld{
    constructor() {
        this.triger_type = 'attack_hit'
        this.status_timer = 0
        this.name = 'Step of another world'
        this.img_path = 'src/assets/img/icons/skill/step_of_another_world.png'
    }

    cast(fight_context){
        this.affect(fight_context)
    }

    act(fight_context){
        let tick = fight_context.tick
        let player = fight_context.player
        if(tick >= (20 * 5) + this.affect_time){
            this.expire(fight_context)
        }
        if((tick + this.affect_time)%20 === 0){
            if(!player.enoughEnergy(10)){
                this.expire(fight_context)
            }
            else {
                player.energy -= 10
            }
        }
    }

    expire(fight_context){
        this.status_timer = 0
        let player = fight_context.player
        player.invisible = false
        player.opacity = 1
        let index = player.status.indexOf(this)
        player.status.splice(index, 1)

    }

    affect(fight_context){
        let player = fight_context.player
        this.affect_time = fight_context.tick
        player.invisible = true
        player.opacity = 0.3
        player.status.push(this)

    }

    trigger(fight_context){
        this.expire(fight_context)
        let player = fight_context.player
        let coil = new FireCoil()
        coil.use(fight_context)
        let index = player.status.indexOf(this)
        player.status.splice(index, 1)
    }
}