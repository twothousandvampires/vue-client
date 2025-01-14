import Undead from "../src/Undead";
import MadFleshSprite from "@/views/game/components/game_canvas/src/Enemy/MadFlesh/MadFleshSprite";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import OpenWounds from "@/views/game/components/game_canvas/src/Status/OpenWounds";
import Swipe from "@/views/game/components/game_canvas/src/Effects/Swipe/Swipe";

export default class MadFlesh extends Undead{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100
        this.sprite = new MadFleshSprite(this)
        this.evade = 0
        this.attack_block = 0
        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'mad flesh'
        this.speed = 1100

        this.stateAct = undefined
        this.state = undefined

        this.power = 150
        this.armour = 1
        this.resist = 0
        this.life = 12
        this.max_life = 12
        this.physical_damage = 4
        this.piercing_damage_resist = 1
        this.cutting_damage_resist = 2
        this.crushing_damage_resist = 1
        this.initiative = 9
        this.init()
    }

    async startTurn(enemies, player){

        if(this.availableToTurn()){
            if(!player.status.has('bleed') && Math.random() <= 0.5){
                Functions.createModal(this, 'tears flesh')
                player.newStatus(new OpenWounds(1, 3))
                this.fight_context.addEffect(new Swipe(this.fight_context), player.num)
            }
            else {
                Functions.createModal(this, 'attack!',16,'white', true)
                player.takeDamage(this)
            }
        }

        await this.afterTurn()
    }
}