import CommandingGreenskinSprite
    from "@/views/game/components/game_canvas/src/Enemy/CommandingGreenskin/CommandingGreenskinSprite";
import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import DefendOrders from "@/views/game/components/game_canvas/src/Enemy/skills/DefendOrders";
import TacticOrders from "@/views/game/components/game_canvas/src/Enemy/skills/TacticOrders";
import AttackOrders from "@/views/game/components/game_canvas/src/Enemy/skills/AttackOrders";
import LastOrders from "@/views/game/components/game_canvas/src/Enemy/skills/LastOrders";
import Unit from "@/views/game/components/game_canvas/src/Scr/Unit";

export default class CommandingGreenskin extends Enemy{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100
        this.sprite = new CommandingGreenskinSprite(this)
        this.evade = 2
        this.attack_block = 10
        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'commanding greenskin'
        this.speed = 800

        this.stateAct = undefined
        this.state = undefined

        this.power = 350
        this.armour = 12
        this.resist = 10
        this.life = 20
        this.max_life = 20
        this.physical_damage = 6
        this.magic_damage = 0
        this.fire_damage_resist = 2
        this.use_orders_rate = 40
        this.initiative = 8
        this.orders = [
            new DefendOrders(this),
            new AttackOrders(this),
            new TacticOrders(this),
        ]
        this.init()
    }

    async startTurn(enemies, player) {
        this.updateStatusNewTurn()
        if(this.availableToTurn()){
            let checked_orders = this.orders.filter(elem => elem.check(player))
            if(checked_orders.length && Math.random() <= this.use_orders_rate / 100){
                let order = checked_orders[Math.floor(Math.random() * checked_orders.length)]
                Functions.createModal(this, 'use ' + order.name)
                order.action(enemies)
            }
            else {
                let target = this.getTarget(player)
                Functions.createModal(this, 'attack!')

                target.takeDamage(this)
            }
        }

        await this.afterTurn()
    }

    setDyingState(){
        this.status.forEach((v,k,map) => {
            v.targetDead()
        })
        this.figth_context.deleteFromQueue(this)
        if(Math.random() <= 0.3){
            let order = new LastOrders(this)
            order.action(this.figth_context.turn_queue)
            Functions.createModal(this, 'use ' + order.name)
        }
        this.dead = true
        this.state =  Unit.STATE_DYING
        this.resetState()
        this.stateAct = this.dyingAct
    }
}