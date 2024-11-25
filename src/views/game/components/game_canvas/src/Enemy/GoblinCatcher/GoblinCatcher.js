import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import GoblinCatcherSprite from "@/views/game/components/game_canvas/src/Enemy/GoblinCatcher/GoblinCatcherSprite";
import CatchingNet from "@/views/game/components/game_canvas/src/Status/CatchingNet";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class GoblinCatcher extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'greenskin catcher'
        this.speed = 1200
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new GoblinCatcherSprite(this)
        this.fliped = false
        this.power = 210
        this.armour = 1
        this.resist = 0
        this.life = 4
        this.max_life = 4
        this.physical_damage = 3
        this.magic_damage = 0
        this.evade = 20
        this.caster = false
        this.fire_damage_resist = 2
        this.net_use_chance = 35
        this.init()
    }

    async startTurn(enemies, player) {
        if(this.availableToTurn()){
            let target = this.getTarget(player)
            Functions.createModal(this, 'attack!',16,'white', true)

            target.takeDamage(this)

            if(Math.random() <= this.net_use_chance/ 100){
                player.newStatus(new CatchingNet(40,3),this, true)
            }
        }

        await this.afterTurn()
    }
}