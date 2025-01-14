import Undead from "../src/Undead";
import MouseBreederSprite from "@/views/game/components/game_canvas/src/Enemy/MouseBreeder/MouseBreederSprite";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import CaveBat from "@/views/game/components/game_canvas/src/Enemy/CaveBat/CaveBat";

export default class MouseBreeder extends Undead{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100
        this.sprite = new MouseBreederSprite(this)
        this.evade = 4
        this.attack_block = 0
        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'mouse breeder'
        this.speed = 800

        this.stateAct = undefined
        this.state = undefined

        this.power = 150
        this.armour = 1
        this.resist = 0
        this.life = 8
        this.max_life = 8
        this.physical_damage = 3
        this.magic_damage = 0
        this.fire_damage_resist = 2
        this.bat_spawn_rate = 40
        this.init()
    }

    async startTurn(enemies, player) {
        if(this.availableToTurn()){
            if(Math.random() <= this.bat_spawn_rate/100){
                Functions.createModal(this, 'summon bat')
                this.fight_context.pushEnemyInFreeSlot(new CaveBat(this.fight_context))
            }
            else {
                let target = this.getTarget(player)
                Functions.createModal(this, 'attack!', 16, 'white', true)

                target.takeDamage(this)
            }
        }

        await this.afterTurn()
    }
}