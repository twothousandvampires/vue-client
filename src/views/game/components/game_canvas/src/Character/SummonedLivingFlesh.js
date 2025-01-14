import Unit from "@/views/game/components/game_canvas/src/Scr/Unit";
import LivingFleshSprite from "@/views/game/components/game_canvas/src/Enemy/LivingFlesh/LivingFleshSprite";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class SummonedLivingFlesh extends Unit{
    constructor(context, level, combo, life = 0, damage = 0) {
        super(context);
        this.sprite = new LivingFleshSprite(this)
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64
        this.size_x = 100
        this.size_y = 100
        this.fliped = true
        this.life = (12 + life + (level * 2)) * (combo >= 1 ? 2 : 1)
        this.max_life = (12 + life + (level * 2)) * (combo >= 1 ? 2 : 1)

        this.name = 'summoned living flesh'
        this.speed = 300
        this.physical_damage = 5 + (level * 2) + damage
        this.accuracy = 0
        this.energy = 100
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
        this.fight_context.deleteFromQueue(this)
        this.dead = true
        this.state = Unit.STATE_DYING
        this.resetState()
        this.stateAct = this.dyingAct
    }
    isEvade(){
        let base_chance = this.evade / 100

        return Math.random() < base_chance
    }
    async startTurn(enemies, player){

        let t = enemies.filter((elem) => !elem.isDead())[0]
        if(t){
            Functions.createModal(this, 'attack!',16,'white', true)
            let d = {
                physical_damage: this.physical_damage,
                piercing_damage: 0,
                cutting_damage: 0,
                crushing_damage: 0
            }
            t.takeAttackDamage(this, d)
        }
        this.updateStatusNewTurn()
        await Functions.sleep(500)
        this.fight_context.next(this)
    }
}