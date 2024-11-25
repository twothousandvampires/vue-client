import Passive from "@/views/game/components/game_canvas/src/Passives/Passive";

export default class LustOfMurder extends Passive{
    constructor(template, player) {
        super(template);
        this.use(player)
        this.chance = this.level * 5
    }

    getDescription(){
        if(!this.level){
            this.level = 1
        }
        let result = ``
        result += `${this.name} \n`
        result += `level ${this.level} \n`
        result += `gives a chance ${this.level * 5}% to get a 1 additional physical damage when your hit enemy with attack \n`

        return result
    }

    use(player){
        player.whenAttackTriggers.push(this)
    }

    trigger(player){
        if(Math.random() <= this.chance / 100){
            console.log(player.physical_damage)
            player.physical_damage ++
            console.log(player.physical_damage)
        }
    }

}