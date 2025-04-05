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
import PlayerMagicAttack from "../Skills/PlayerMagicAttack";

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

        this.setDefaultAttack()

        this.reduce_action_points = 0
        this.combo_points = 0

        this.combat_mastery_gained = 0
        this.sorcery_mastery_gained = 0
        this.movement_mastery_gained = 0

        this.init()
    
    
    }
    removeDefendStats(){
        this.was_defended = false
        this.attack_block -= 10
        this.armour -= 3
    }
    addDefendStats(){
        this.was_defended = true
        this.attack_block += 10
        this.armour += 3
    }
    defend(){
        this.addDefendStats()
        this.skipTurn()
    }

    openInventory(){
        if(this.fight_context) return

        this.inv_is_open = !this.inv_is_open
    }

    async god(){
        let result = await requestService.serverRequest('god')

        this.parseStats(result.data.character)
    }

    async changeStance(){
        if(!this.turn) return
        
        let result = await requestService.serverRequest('change_stance')

        this.parseStats(result.data.character)
        this.setDefaultAttack()

        if(this.chance_not_lose_ap_when_change_stance <= Math.random() * 100){
            this.action_count -= 1
            if(this.action_count <= 0){
                this.skipTurn()
            }
        } 
    }

    retreat(){
        if(!this.turn) return

        this.fliped = true
        this.is_retreat = true
        this.skipTurn()
    }
    successfulAttack(){
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

    getPhysicalDamage(){
        let result = {
            physical_damage: this.physical_damage < 0 ? 0 : this.physical_damage,
            piercing_damage: this.piercing_damage,
            cutting_damage: this.cutting_damage,
            crushing_damage: this.crushing_damage
        }
        if(this.stance === 'combat'){
            result.physical_damage += combat_stance_value
        }
        return result
    }
    getMagicDamage(){
        let result = {
            magic_damage: this.magic_damage < 0 ? 0 : this.magic_damage,
            fire_damage: this.fire_damage,
            lightning_damage: this.lightning_damage,
            cold_damage: this.cold_damage
        }
        if(this.stance === 'sorcery'){
            result.magic_damage += sorcery_stance_value
        }
        return result
    }
    removeNegativeStatus(count){

    }
    rest(){
        if(this.fight_context) return
        if(!this.food) return 

        Functions.createInputModal('amount', this.playerRest.bind(this))
    }
    async playerRest(amount){

        if(this.food < amount){
            alert("your have no that emount!")
            return
        }
        let data = await requestService.serverRequest('rest', { amount: amount })

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
            this.fight_context.retreat()
            rerurn
        }
        if(this.was_defended){
            this.removeDefendStats()
        }

        if(this.combo_points > 0 && this.chance_not_lose_cp_when_turn_end >= Math.random() * 100){
            this.combo_points = 1
        }
        else{
            this.combo_points = 0
        }
    
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
        this.fight_context.pushSummon(summon)
    }
    async skipTurn(){
        this.turn = false
        await Functions.sleep(1000)
        this.fight_context.next(this)
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
        if(this.fight_context){
            this.fight_context.createEnemy(e.target.value)
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
            this.movement_mastery_gained ++
            total_d = 0
        }
        else if(is_block && this.life >= total_d){
            this.combat_mastery_gained ++
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
        this.available_skills = []

        skills.forEach(elem => {
            this.addSkill(elem)
        })
    }
    addSkill(elem){
        let skill = GemSkillFactory.create(elem, this)
        if(skill.level){
            this.skill_pull.push(skill)
        }
        else{
            this.available_skills.push(skill)
        }
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
        let result = await requestService.serverRequest('torch')
        if(!result.success){
            alert(result.message)
        }
    }

    setDefaultAttack(){
        if(this.stance === 'combat'){
            this.action = new PlayerAttack(this)
        }
        else{
            this.action = new PlayerMagicAttack(this)
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
                else if(this.combo_points && this.chance_not_lose_cp_when_max <= Math.random() * 100){
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
                else if(this.combo_points && this.chance_not_lose_cp_when_max <= Math.random() * 100){
                    this.combo_points = 0
                }   
            }
            this.decreaseActionCount()
        }
        if(this.sprite.isSpriteLoopEnd()){
            if(this.need_restore_sprite){
                this.fliped = false
                let cell = this.fight_context.getPlayerCell()
                
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
            this.setDefaultAttack()
            item.selected = false
        }
        else {
            this.action = item
            item.selected = true
        }
    }
    async upgradeStat(stat_name){
        let responce = await requestService.serverRequest('upgrade_stat', {stat: stat_name})
        if(responce.success){
          this.parseStats(responce.data.char)
        }
        else{
            alert(responce.message)
        }
    }
    prepareToFight(fight){
        this.fight_context = fight
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
            requestService.serverRequest('set_started')
        }, 1700)
    }
    setWorldIdle(){
        this.state = Character.STATE_WORLD_IDLE
        this.resetState()
    }
    send(){
        requestService.serverRequest('set', {life: this.life,
             mana: this.mana,
             dead: this.dead,
             combat_mastery: this.combat_mastery_gained,
             sorcery_mastery: this.sorcery_mastery_gained,
             movement_mastery: this.movement_mastery_gained
        })

        this.combat_mastery_gained = 0
        this.sorcery_mastery_gained = 0
        this.movement_mastery_gained = 0
    }
    setDying(){
        this.dead = 1
        this.send()
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

        this.setDefaultAttack()
        this.unselectAll()

        if(!this.action_count){
            this.skipTurn()
        }
    }
    doAction(){
        if(this.action.mana_cost && !this.enoughMana(this.action.mana_cost)){
            Functions.createModal(this, 'not enough mana for ' + this.action.name)
            this.setDefaultAttack()
            this.unselectAll()
            return
        }
        if(this.action.energy_cost && !this.enoughEnergy(this.action.energy_cost)){
            Functions.createModal(this, 'not enough energy for ' + this.action.name)
            this.setDefaultAttack()
            this.unselectAll()
            return;
        }

        this.action.use(this.cursored_target)
        
        if(this.action.addMastery){
            this.action.addMastery()
        }
        

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