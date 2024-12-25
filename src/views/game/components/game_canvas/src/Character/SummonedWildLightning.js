import Unit from "@/views/game/components/game_canvas/src/Scr/Unit";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import WildLightningSprite from "./sprite/WildLIghtningSprite";
import LuminousArcEffect from "../Effects/ChainLight/ChainLight";
import Point from "../Scr/Point";
import SparkEffect from "../Effects/Spark/SparkEffect";

export default class SummonedWildLightning extends Unit{
    constructor(context, level, combo, life = 0, damage = 0) {
        super(context);
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64
        this.size_x = 100
        this.size_y = 100
        this.fliped = false
        this.life = 6 + life +(level * 2)
        this.max_life = 6 + life + (level * 2)
        this.sprite = new WildLightningSprite(this)
        this.name = 'summoned wild lightning'
        this.speed = 300
        this.accuracy = 0
        this.energy = 100
        this.combo = combo
        this.level = level
        this.damage = damage
        this.init()
    }

    act(){
        this.sprite.act()
        this.stateAct()
    }
    async takeDamage(enemy){

        let total_d  = 0
        let total_p = enemy.calculatePhysicalDamage(this)
        let total_m = enemy.calculateMagicDamage(this)

        let is_evade = this.isEvade()
        let is_block = this.isBlock()
        let is_enemy_critical_attack = enemy.isPhysicalCrit()

        total_d += total_p + total_m

        if(is_enemy_critical_attack){
            total_d *= 2
        }

        if(is_evade){
            Functions.createModal(this, 'evade attack!')
            total_d = 0
        }
        else if(is_block && this.life >= total_d){
            Functions.createModal(this, 'block attack!')
            total_d = 0
        }
        else {
            total_d = Math.round(total_d)
        }

        if(total_d){
            Functions.createModal(this, is_enemy_critical_attack ? total_d + '!' : total_d,16,'white', true)
            this.reduceLife(total_d)
        }

        await Functions.sleep(500)
    }
    async takeSpellDamage(enemy, damage){
        let total_d = damage

        let is_enemy_critical_magic = enemy.isMagicCrit()
        let is_player_magic_block = this.isSpellBlock()

        let magic_reduction = this.getMagicRedaction()

        if(this.resist >= 0){
            total_d = total_d * (1 - magic_reduction)
        }
        else {
            total_d = total_d * (1 + -magic_reduction)
        }

        if(is_enemy_critical_magic){
            total_d *= 2
        }

        total_d = Math.floor(total_d)

        if(total_d){
            if(is_player_magic_block){
                Functions.createModal(this, 'magic block!')
            }
            else {
                Functions.createModal(this, is_enemy_critical_magic ? total_d + '!' : total_d,16,'gold', true)
                this.reduceLife(total_d)
            }
        }
    }

    reduceLife(value){
        this.life -= value
        if(this.life <= 0){
            this.setDyingState()
        }
    }
    setDyingState(){
        this.figth_context.deleteFromQueue(this)
        this.dead = true
        this.state = Unit.STATE_DYING
        this.resetState()
        this.stateAct = this.dyingAct
    }
    deadState(){
        this.figth_context.summons = this.figth_context.summons.filter(elem => elem != this)
    }
    isEvade(){
        let base_chance = this.evade / 100

        return Math.random() < base_chance
    }
    async startTurn(enemies, player){
        if(this.combo){
            let r = Math.random()
            if(r < 0.5){
                let t = enemies.filter((elem) => !elem.isDead())[0]

                let l_effect = new LuminousArcEffect(this.figth_context, Functions.angle(t, this), Functions.distance(this, t))
                l_effect.point = new Point((this.point.x + t.point.x) / 2, (this.point.y + t.point.y) / 2)
                this.figth_context.addEffect(l_effect)
        
                if(t){
                    Functions.createModal(this, 'using lightning')
                    let d = {
                        lightning_damage: (this.level + this.damage) * 5,
                    }
                    t.takeSpellDamage(this, d)
                }
            }
            else{

                let t = enemies.filter((elem) => !elem.isDead())

                if(t.length){
                    Functions.createModal(this, 'using spark nova')
                    let d = {
                        lightning_damage: this.level * 2 + this.damage
                    }
                    t.forEach(elem => {
                        elem.takeSpellDamage(this, d)
                        this.figth_context.addEffect(new SparkEffect(this.figth_context), elem.num)
                    })
                }
            }
        }
        else{

            let t = enemies.filter((elem) => !elem.isDead())[0]
                let l_effect = new LuminousArcEffect(this.figth_context, Functions.angle(t, this), Functions.distance(this, t))
                l_effect.point = new Point((this.point.x + t.point.x) / 2, (this.point.y + t.point.y) / 2)
                this.figth_context.addEffect(l_effect)
        
                if(t){
                    Functions.createModal(this, 'using lightning')
                    let d = {
                        lightning_damage: (this.level + this.damage) * 5
                    }
                    t.takeSpellDamage(this, d)
                }
        }

        if(this.combo === 2 && Math.random() < 0.2){
            this.figth_context.player.summon(new SummonedWildLightning(this.figth_context, this.level, this.combo))
        }
       
        this.updateStatusNewTurn()
        await Functions.sleep(500)
        this.figth_context.next(this)
    }
}