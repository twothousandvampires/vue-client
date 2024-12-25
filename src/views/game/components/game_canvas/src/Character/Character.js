import Functions from "../GameFunctions"
import Inventory from "../inventory/Inventory"
import Unit from "../Scr/Unit"
import GrimTravelerSprite from "./sprite/GrimTravelerSprite";
import {useLogStore} from "@/stores/log";
import PassiveFactory from "@/views/game/components/game_canvas/src/Scr/factories/PassiveFactory";
import GemSkillFactory from "@/views/game/components/game_canvas/src/Scr/factories/GemSkillFactory";
import requestService from "@/views/game/services/requestService";
import Input from "@/views/game/components/game_canvas/src/Singltons/Input";
import PlayerAttack from "@/views/game/components/game_canvas/src/Skills/PlayerAttack";

export default class Character extends Unit{

    static STATE_WORLD_IDLE = 10
    static STATE_WORLD_FALLEN = 20
    static CAST_FRAME = 7
    static ATTACK_FRAME = 6
    constructor(template) {

        super(undefined, 650, 850)
        this.blockTriggers = []
        this.whenAttackTriggers = []
        this.whenAttackHitTriggers = []
        this.skill_pull = []
        this.inv = new Inventory(this)
        this.parseStats(template)
        this.log = useLogStore()
        this.healingSources = []
        this.pretti_x = 6
        this.pretti_y = 6
        this.invisible = false
        this.opacity = 1

        // size on canvas
        this.size_x = 120
        this.size_y = 120

        this.sprite = new GrimTravelerSprite(this)

        // coll box size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64
        this.action_count = 0
        this.action = new PlayerAttack(this)
        this.reduce_action_points = 0
        this.combo_points = 0
        this.init()
    
    
    }
    retreat(){
        this.fliped = true
        this.is_retreat = true
        this.skipTurn()
    }
    successfulAttack(damage_amount){
        if(this.life_leech){
            this.addLife(this.life_leech)
        }
        if(Math.random() <= this.gain_mana_when_hit_chance / 100){
            this.addMana(1)
        }
        this.whenAttackTriggers.forEach(elem => {
            elem.trigger(this)
        })
    }
    reducePower(amount){
        this.power -= amount
        if(this.power < 0){
            this.power = 0
        }
    }
    reduceLife(value, damage = true){
        this.life -= value
        if(this.life <= 0){
            this.setDying()
        }
        else if(damage){
            this.setDamage()
        }
    }
    parsePassives(passives){
        this.passives = []
        this.available_passives = []
        passives.forEach(elem => {
            this.addPassive(elem)
        })
    }
    resistCast(spell){
        if(this.will / 100 >= Math.random()){
            Functions.createModal(this, 'resist ' + spell.name)
            return true
        }
        return false
    }
    addPassive(elem){
        let passive = PassiveFactory.createPassive(elem, this)
        if(passive.level){
            this.passives.push(passive)
        }
        else{
            this.available_passives.push(passive)
        }
    }
    getItems(func){
        return this.inv.pull.filter(elem => func(elem))
    }
    useHeal(enemies){
        let heal = this.healingSources.pop()
        if(!heal) return
        heal.heal(this, enemies)
        Functions.createModal(this,'use ' + heal.name)
    }

    getPhysicalDamage(enemy = false){
        return {
            physical_damage: this.physical_damage < 0 ? 0 : this.physical_damage,
            piercing_damage: this.piercing_damage,
            cutting_damage: this.cutting_damage,
            crushing_damage: this.crushing_damage
        }
    }
    getMagicDamage(){
        return {
            magic_damage: this.magic_damage < 0 ? 0 : this.magic_damage,
            fire_damage: this.fire_damage,
            lightning_damage: this.lightning_damage,
            cold_damage: this.cold_damage
        }
    }
    removeNegativeStatus(count){

    }
    rest(){
        if(this.figth_context) return
        if(!this.food) return 

        Functions.createInputModal('amount', this.playerRest.bind(this))
    }
    async playerRest(amount){

        if(this.food < amount){
            alert("your have no that emount!")
            return
        }
        let data = await CharacterService.serverRequest('rest', {char_id: this.id, amount: amount})

        if(data.success){
            this.parseStats(data.data.char)
    
            if( data.data?.log?.log?.length ){
                data.data.log.log.forEach(server_log => {
                    this.log.addLog(server_log)
                })
            }
        }
        
    }
    calcActionPoints(){
        this.action_count = Math.floor(this.speed / 400)
        this.action_count -= this.reduce_action_points
        if(this.action_count <= 0) this.action_count = 1
        if(this.action_count > 7) this.action_count = 7
    }
    startTurn(){
        if(this.is_retreat){
            this.figth_context.retreat()
            rerurn
        }
        this.combo_points = 0
        this.updateStatusNewTurn()
    
        if(this.frozen){
            Functions.createModal(this, 'cannot move')
            this.skipTurn()
        }
        else {
            this.addEnergy(this.getEnergyRegeneration())
            this.turn = true
            Functions.createModal(this, 'your turn!', '20', 'yellow')
            this.calcActionPoints()
        }
    }
    summon(summon){
        this.figth_context.pushSummon(summon)
    }
    async skipTurn(){
        this.turn = false
        await Functions.sleep(1000)
        this.figth_context.next(this)
    }
    runBlockTriggers(){
        if(this.add_life_when_attack_block){
            this.addLife(this.add_life_when_attack_block)
        }
        this.blockTriggers.forEach(elem => {
            elem.trigger(this)
        })
    }
    createEnemy(e){
        if(this.figth_context){
            this.figth_context.createEnemy(e.target.value)
        }
    }
    async takeSpellDamage(enemy, damage){
        let total_d = damage

        let is_enemy_critical_magic = enemy.isMagicCrit()

        let is_player_magic_block = this.isSpellBlock()
        let is_spell_suppress = this.isSuppress()

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
            if(is_spell_suppress){
                this.reduceEnergy(5)
                Functions.createModal(this, 'suppress')
            }
            else if(is_player_magic_block & this.mana >= total_d){
                Functions.createModal(this, 'magic block!')
                this.runBlockTriggers()
                this.setBlock()
            }
            else {
                Functions.createModal(this, is_enemy_critical_magic ? total_d + '!' : total_d,16,'gold')
                this.reduceLife(total_d)
            }
        }

    }

    async takeDamage(enemy){

        let total_d  = 0
        let total_p = enemy.calculatePhysicalDamage(this)
        let total_m = enemy.calculateMagicDamage(this)

        let is_evade = this.isEvade(enemy)
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
            this.runBlockTriggers()
            this.setBlock()
            this.reduceEnergy(2)
            total_d = 0
        }
        else {
           total_d = Math.round(total_d)
        }

        if(total_d){
            let options = {
                critical: is_enemy_critical_attack,
                type: total_p > total_m ? 'phys' : 'magic'
            }
            Functions.createDamageModal(this, total_d, options)
            this.reduceLife(total_d)
            this.whenAttackHitTriggers.forEach(elem => {
                elem.trigger(enemy)
            })
        }

        await Functions.sleep(500)
    }
    async testFight(enemy, battle){

            if(this.life <= 10){
                this.useHeal(battle.turn_queue)
            }
            if(this.purge && enemy.status.size){
                let [firstVal] = enemy.status.values()
                firstVal.expire()
                this.purge --
            }

            let is_range = this.figth_context.checkLine(enemy.num)
            console.log(is_range)
            let log = ''
            let player_power = this.power
            let enemy_power = enemy.power

            let base_chance = 0.50

            let total_player_physical_damage = this.calculatePhysicalDamage(enemy, is_range)
            let total_enemy_physical_damage = enemy.calculatePhysicalDamage(this)

            let player_magic_damage = this.calculateMagicDamage(enemy)
            let enemy_magic_damage = enemy.calculateMagicDamage(this)

            let is_player_physical_crit = this.isPhysicalCrit()
            let is_player_magic_crit = this.isMagicCrit()

            let is_enemy_block = enemy.isBlock()
            let is_enemy_evade = enemy.isEvade(this)

            if(is_enemy_block){
                await Functions.createModal(enemy, 'block!')
            }
            else if(is_enemy_evade){
                await Functions.createModal(enemy, 'evade!')
            }
            else {
                if(is_player_physical_crit){
                    await Functions.createModal(this, 'critical!')
                    total_player_physical_damage *= 2
                }
                player_power += total_player_physical_damage
            }

            let is_enemy_spell_block = enemy.isSpellBlock()
            let is_enemy_spell_suppress = enemy.isSuppress()

            if(is_enemy_spell_suppress){
                await Functions.createModal(enemy, 'spell absorb!')
            }
            else if(is_enemy_spell_block){
                await Functions.createModal(enemy, 'spell block!')
            }
            else {
                if(is_player_magic_crit){
                    await Functions.createModal(this, 'magic critical!')
                    player_magic_damage *= 2
                }
                player_power += player_magic_damage
            }

            if(Math.random() < this.mana_burn / 100 && enemy.mana > 0){
                enemy.mana --
                Functions.createModal(enemy, 'mana burned')
            }

            // -==========================enemy==============================-

            if(enemy.caster){
                enemy.cast(this, battle.turn_queue)
                Functions.sleep(300)
            }

            let is_player_block = this.isBlock()
            let is_player_evade = this.isEvade()
            let is_enemy_physical_crit = enemy.isPhysicalCrit()
            let is_enemy_magic_crit = enemy.isMagicCrit()

            if(is_player_block && this.life >= total_enemy_physical_damage){
                this.blockTriggers.forEach(elem => {
                    elem.trigger(this)
                })
                if(this.state === Unit.STATE_IDLE){
                    this.setBlock()
                }
                await Functions.createModal(this, 'block!')
                this.reduceEnergy(2)
            }
            else if(is_player_evade){
                await Functions.createModal(this, 'evade!')
            }
            else {
                if(is_enemy_physical_crit){
                    total_enemy_physical_damage *= 2
                    await Functions.createModal(this, 'critical!')
                }
                enemy_power += total_enemy_physical_damage
            }

            let is_player_spell_block = this.isSpellBlock()
            let is_player_spell_suppress = this.isSuppress()

            if(enemy_magic_damage && is_player_spell_suppress && this.energy >= enemy_magic_damage){
                await Functions.createModal(this, 'spell absorb!')
                this.reduceEnergy(2)
            }
            else if(enemy_magic_damage && is_player_spell_block && this.mana >= enemy_magic_damage){
                await Functions.createModal(this, 'spell block!')
            }
            else {
                if(is_enemy_magic_crit){
                    enemy_magic_damage *= 2
                    await Functions.createModal(this, 'magic critical!')
                }
                enemy_power += enemy_magic_damage
            }

            let diff = Math.abs(player_power - enemy_power)
            let sing = player_power > enemy_power

            let chance_diff = 0

            if(sing){
                chance_diff = (0.04 * diff) / (1 + 0.04 * diff)
                base_chance = base_chance * (1 + chance_diff)
            }else {
                chance_diff = (0.02 * diff) / (1 + 0.02 * diff)
                base_chance = base_chance * (1 - chance_diff)
            }

            this.reduceEnergy(5)
            let win = Math.random() < base_chance

            if(win && !enemy.add_turn){
                if(this.life_leech){
                    this.addLife(Math.floor((player_magic_damage + player_magic_damage) * this.life_leech / 100))
                }
                let r = Math.random()
                if(r > 0.5){
                    this.setAttack()
                }
                else {
                    this.setCast()
                }
                await Functions.sleep(1000)
                let kill = enemy.takeDamage(this, battle)
                if(kill){
                    log += enemy.name + ' has been killed!'
                }

            }
            else if(!this.add_turn){
                await Functions.sleep(500)
                if(enemy.damage){
                    await Functions.createModal(enemy, 'attack!')
                    await Functions.sleep(500)
                    if(this.avoid / 100 >= Math.random()){
                        Functions.createModal(this, 'damage was evaded')
                    }
                    else {
                        this.life -= enemy.damage
                        if(this.life <= 0){
                            this.setDying()
                            return
                        }
                        else{
                            this.setDamage()
                        }
                    }
                }
            }
            if(!enemy.isDead()){
                enemy.afterTurn(this, battle)
            }
            if(log != ''){
                this.log.addLog(log)
            }


        if(!enemy.add_turn && !this.add_turn && (!this.dead && !enemy.isDead())){
            let speed_diff = Math.abs(this.speed - enemy.speed)
            let add_turn_rating = (0.01 * speed_diff) / (15 + 0.01 * speed_diff)

            if(Math.random() < add_turn_rating){
                if(this.speed > enemy.speed){
                    this.add_turn = true
                    Functions.createModal(this, 'add turn')
                    await Functions.sleep(1500)
                }
                else{
                    enemy.add_turn = true
                    Functions.createModal(enemy, 'add turn')
                    await Functions.sleep(1000)
                }
                await this.testFight(enemy, battle)
                this.add_turn = false
                enemy.add_turn = false
            }

        }
    }
    getInfo(){
        let result = ``;

        result += `${this.name} (${this.life}/${this.max_life})\n`

        return result;
    }
    isEvade(enemy){
        if(enemy.blind && Math.random() <= enemy.blind / 100){
            return true
        }
        let base_chance = this.evade / 100
        let reduce_by_energy = this.energy / this.max_energy
        let reduce_by_armour = 1 - (0.01 * this.armour) / (1 + 0.01 * this.armour)
        let total_reduce = reduce_by_armour * reduce_by_energy

        return Math.random() < (base_chance * total_reduce)
    }
    parseStats(template){
        
        for(let stat in template){
            this[stat] = template[stat]
        }

        this.max_energy = template.energy
        if(this.food <= 0){
            this.energy = Math.floor(this.energy/2)
        }
        this.parsePassives(template.passives)
        this.parseSkills(template.skills)
        
        this.inv.update(template.items)
    }
    parseSkills(skills){
        this.skill_pull = []
        skills.forEach(elem => {
            let skill = GemSkillFactory.create(elem, this)
            this.skill_pull.push(skill)
        })
    }
    init(){
        if(this.dead){
            this.setDead()
        }
        else if(!this.started){
            this.setFallenState()
        }
        else {
            this.setWorldIdle()
        }
    }

    getEnergyRegeneration(){
        return this.energy_regeneration
    }
    addEnergy(amount){
        this.energy += amount
        if(this.energy > this.max_energy){
            this.energy = this.max_energy
        }
    }
    enoughEnergy(needed){
        return this.energy >= needed
    }

    async useTorch(){
        let result = await CharacterService.serverRequest('torch', {char_id: this.id})
        if(!result.success){
            alert(result.message)
        }
    }

    setCast() {
        this.state = Unit.STATE_CAST
        this.resetState()
        this.stateAct = this.castAct
    }

    castAct() {
        if(this.sprite.frame === this.sprite.cast_frame && !this.was_action){
        
            this.was_action = true
            this.action.action()

            if(this.action.decrease_action_point){
                if(this.action.can_create_combo && this.combo_points < 2 && Math.random() < this.combo_chance/ 100){
                    Functions.createModal(this, 'combo point!', '20', 'yellow')
                    this.combo_points ++
                }
                else if(this.combo_points){
                    this.combo_points = 0
                }   
            }

            this.decreaseActionCount()
        }
        if (this.sprite.isSpriteLoopEnd()) {
            this.setIdle()
        }
    }

    setIdle() {
        this.was_action = false
        if(this.energy < 15 && Math.random() > 0.5){
            this.setDyspnea()
        }
        else {
            this.state = Unit.STATE_IDLE
            this.resetState()
            this.stateAct = this.idleAct
        }
    }
    idleAct(){

    }
    setAttack(){
        this.state = Unit.STATE_ATTACK
        this.resetState()
        this.stateAct = this.attackAct
    }
    reduceEnergy(value){
        this.energy -= value
        if(this.energy < 0) this.energy = 0
    }
    attackAct(){
        if(this.sprite.frame === this.sprite.attack_frame && !this.was_action){
            this.was_action = true
            this.action.action()
            if(this.action.decrease_action_point){
                if(this.action.can_create_combo && this.combo_points < 2 && Math.random() < this.combo_chance/ 100){
                    Functions.createModal(this, 'combo point!', '20', 'yellow')
                    this.combo_points ++
                }
                else if(this.combo_points){
                    this.combo_points = 0
                }   
            }
            this.decreaseActionCount()
        }
        if(this.sprite.isSpriteLoopEnd()){
            if(this.need_restore_sprite){
                this.fliped = false
                let cell = this.figth_context.getPlayerCell()
                
                this.point.x = cell.x + cell.width/2
                this.point.y = cell.y + cell.height/2

                this.need_restore_sprite = false
            }
            this.setIdle()
        }
    }
    setDyspnea(){
        this.state = Unit.STATE_DYSPNEA
        this.resetState()
        this.stateAct = this.dyspneaAct
        setTimeout(() => {
            if(this.state === Unit.STATE_DYSPNEA){
                this.setIdle()
            }
        }, 1000)
    }
    dyspneaAct(){

    }
    setBlock(){
        if(this.state !== Unit.STATE_IDLE){
            return
        }
        this.state = Unit.STATE_BLOCK
        this.resetState()
        this.stateAct = this.blockAct
        setTimeout(()=>{
            if(this.state === Unit.STATE_BLOCK){
                this.setIdle()
            }
        },500)
    }
    blockAct(){

    }
    selectToUse(item){
        this.unselectAll()
        if(item.selected){
            this.action = new PlayerAttack(this)
            item.selected = false
        }
        else {
            this.action = item
            item.selected = true
        }
    }
    prepareToFight(fight){
        this.figth_context = fight
        this.fliped = false
        this.setIdle()
        fight.player = this

        let cell = fight.getPlayerCell()
        this.num = cell.num
        cell.content = this

        this.point.x = cell.x + cell.width/2
        this.point.y = cell.y + cell.height/2
    }
    setWorldMove(){
        this.state = Unit.STATE_WORLD_MOVE
        this.resetState()
    }
    setGroundState(){
        this.state = 21
        this.resetState()
        setTimeout(() => {
            this.setWorldIdle()
        },1200)
    }
    setFallenState(){
        this.pretti_y -= 3
        this.state = Character.STATE_WORLD_FALLEN
        this.resetState()
        this.fallenInterval = setInterval(() => {
            this.pretti_y += 0.0065
        })
        setTimeout(() => {
            clearInterval(this.fallenInterval)
            this.pretti_x = 6
            this.pretti_y = 6
            this.setGroundState()
            this.started = 1
            CharacterService.setStarted(this.id)
        }, 1700)
    }
    setWorldIdle(){
        this.state = Character.STATE_WORLD_IDLE
        this.resetState()
    }
    setDying(){
        this.dead = 1
        axios({
            method: 'post',
            url: '//127.0.0.1:8000/api/character/set/' + this.id,
            data : {
                life: this.life,
                mana: this.mana,
                dead: this.dead
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        this.state = Unit.STATE_DYING
        this.resetState()
        this.stateAct = this.dyingAct
    }
    dyingAct(){
        if(this.sprite.isSpriteLoopEnd()){
            this.setDead()
        }
    }
    setDead(){
        this.state = Unit.STATE_DEAD
        this.resetState()
        this.stateAct = this.deadAct
    }
    deadAct(){

    }
    setDamage(){
        this.state = Unit.STATE_DAMAGED
        this.resetState()
        this.stateAct = this.damageAct
        setTimeout(() => {
            this.setIdle()
        }, 500)
    }
    damageAct(){

    }
    enoughMana(cost){
        return this.mana >= cost
    }
    decreaseMana(value){
        this.mana -= value
    }
    unselectAll(){
        this.skill_pull.forEach(elem => {
            elem.selected = false
        })
        this.inv.pull.forEach(elem => {
            elem.selected = false
        })
    }
    getTotalPhysDamage(){
        return this.physical_damage + this.crushing_damage + this.cutting_damage + this.piercing_damage
    }
    getTotalMagicDamage(){
        return this.magic_damage + this.fire_damage + this.lightning_damage + this.cold_damage
    }
    decreaseActionCount(){

        if(this.action.decrease_action_point){
            this.action_count -= 1
        }

        this.action = new PlayerAttack(this)
        this.unselectAll()

        if(!this.action_count){
            this.skipTurn()
        }
    }
    doAction(){
        if(this.action.mana_cost && !this.enoughMana(this.action.mana_cost)){
            Functions.createModal(this, 'not enough mana for ' + this.action.name)
            this.action = new PlayerAttack(this)
            this.unselectAll()
            return
        }
        if(this.action.energy_cost && !this.enoughEnergy(this.action.energy_cost)){
            Functions.createModal(this, 'not enough energy for ' + this.action.name)
            this.action = new PlayerAttack(this)
            this.unselectAll()
            return;
        }

        this.action.use(this.cursored_target)

        if(!this.action.have_action){
            this.decreaseActionCount()
        }
    }
    removeFreeze(){
        this.frozen = false
        this.setIdle()
    }
    act() {
        this.sprite.act()
        this.stateAct()

        if(!this.turn) return

        let input = Input.getInput()

        if(input[' '] || this.frozen){
            this.skipTurn()
            return
        }
        if(this.turn && this.state === Unit.STATE_IDLE && this.action_count){
            if(this.action.canUse()){
                this.doAction()
            }
            if(input.l_click && this.cursored_target){
                if(this.action.canUse(this.cursored_target)){
                   this.doAction()
                }
            }
        }

        
    }
}