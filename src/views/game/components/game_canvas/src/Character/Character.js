import Functions from "../GameFunctions"
import Inventory from "../inventory/Inventory"
import Unit from "../Scr/Unit"
import Belt from "./hud/Belt";
import Request from "../Request";
import Input from "../Singltons/Input";
import Point from "../Scr/Point";
import GrimTravelerSprite from "./sprite/GrimTravelerSprite";
import Damage from "../Scr/Damage";
import PlayerDefaultAttack from "@/views/game/components/game_canvas/src/Skills/Combat/PlayerDefaultAttack";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";

export default class Character extends Unit{

    static STATE_WORLD_IDLE = 10
    static CAST_FRAME = 7
    static ATTACK_FRAME = 6
    constructor(template) {

        super(undefined, 650, 850)
        this.blockTriggers = []
        this.template = template
        this.parseStats(template)

        this.dyspnea_count = 0

        this.pretti_x = 6
        this.pretti_y = 6
        this.invisible = true
        this.belt = new Belt(this)
        this.skill_pull = []
        this.opacity = 1

        this.inv = new Inventory(this, template.items)

        // size on canvas
        this.size_x = 120
        this.size_y = 120

        this.sprite = new GrimTravelerSprite(this)

        this.damage_time = Functions.msToTick(500)
        this.tick_in_damage = 0

        // coll box size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.direction_angle = false
        this.damage_angle = false

        this.energy_low_count = 0
        this.selected_skill = this.skill_pull[0]
        this.default_attack = new PlayerDefaultAttack(this)
        this.init()
        this.phased = false

        //todo do in database
        this.lower_mana_cost = 0
        this.incresase_spell_damage = 0
        this.reduce_spell_damage = 0
        this.increased_damage = 0
        this.reduce_damage = 0

    }
    parseStats(template){
        for(let stat in template){
            this[stat] = template[stat]
        }
        this.max_energy = template.energy
    }

    getMinAttackDamageForStats(){
        let flat = this.min_attack_damage
        let increase = this.getIncreaseAttackDamage() + this.getIncreaseDamage()
        return Functions.changeByPercent(flat, increase)
    }

    getMaxAttackDamageForStats(){
        let flat = this.max_attack_damage
        let increase = this.getIncreaseAttackDamage() + this.getIncreaseDamage()
        return Functions.changeByPercent(flat, increase)
    }

    getAttackCriticalChance(){
        return this.attack_crit_chance
    }

    getAttackCriticalMulti(){
        return this.attack_crit_multi
    }

    getIncreaseAttackDamage(){
        return this.increased_attack_damage - this.reduced_attack_damage
    }

    getIncreaseDamage(){
        return this.increased_damage - this.reduced_damage
    }

    init(){
        if(this.dead){
            this.setDead()
        }
        else {
            this.setWorldIdle()
        }
    }

    getAttackRange(){
        return Functions.changeByPercent(this.attack_range, this.increased_attack_range - this.reduced_attack_range)
    }

    getMinSpellDamage(){
        if(this.min_spell_damage > this.max_spell_damage){
            return this.getMaxSpellDamage()
        }
        return this.min_spell_damage >= 0 ? this.min_spell_damage : 0
    }

    getIncreaseSpellDamage(){
        return this.incresase_spell_damage - this.reduce_spell_damage
    }

    getSpellCriticalChance(){
        return this.spell_crit_chance
    }

    getSpellCriticalMulti(){
        return this.spell_crit_multi
    }

    getResist(){
        let flat = this.resist
        let increase = this.getIncreaseResist()
        return Functions.changeByPercent(flat, increase)
    }

    getIncreaseResist(){
        return this.increase_resist - this.reduce_resist
    }

    getLowerManaCost(){
        //todo
        return this.lower_mana_cost
    }

    getMovementSpeed(){
        return this.movement_speed/1000
    }

    getMaxSpellDamage() {
        return this.max_spell_damage >= 0 ? this.max_spell_damage : 0
    }

    getIncreasedSpeed(){
        return this.increased_speed - this.reduced_speed
    }
    getIncreasedEnergy(){
        return this.increased_energy - this.reduced_energy
    }
    getIncreasedLife(){
        return this.increased_life - this.reduced_life
    }

    getIncreasedMana(){
        return this.increased_mana - this.reduced_mana
    }

    getEnergyRegeneration(){
        return this.energy_regeneration/1000
    }

    enoughEnergy(needed){
        return this.energy >= needed
    }

    useTorch(){
        Request.torch()
    }

    getMoveAngle(input){
        if(input.w){
            if(input.d){
                this.move_angle = 2.36
            }
            else if(input.a){
                this.move_angle = 3.93
            }
            else {
                this.move_angle = 3.14
            }
        }
        else if(input.s){
            if(input.d){
                this.move_angle = 0.76
            }
            else if(input.a){
                this.move_angle = 5.5
            }
            else {
                this.move_angle = 0
            }
        }
        else if(input.a){
            this.move_angle = 4.71
        }
        else if(input.d){
            this.move_angle = 1.57
        }
    }

    moveInputIsPressed(input){
        return input.w || input.s || input.a || input.d
    }

    regeneration(){
        let dyspnea = false
        if(this.energy < 0){
            this.dyspnea_count ++
            let dyspnea_chance = this.dyspnea_count * 10
            if(dyspnea_chance > 90){
                dyspnea_chance = 90
            }
            if(Math.random() * 100 < dyspnea_chance){
                dyspnea = true
            }
        }

        this.energy += dyspnea ? 30 : 20
        if(this.energy > this.max_energy){
            this.energy = this.max_energy
        }

        if(dyspnea){
            this.setDyspnea()
            this.endTurn()
        }

        // if(this.energy <=5 ){
        //     this.energy_low_count ++
        //     if(this.energy_low_count >= 5){
        //         this.setDyspnea()
        //         this.energy_low_count = 0
        //     }
        // }
        // else {
        //     this.energy_low_count = 0
        // }
        //
        // if(this.energy < this.max_energy){
        //     let increase_regen
        //     if(this.state === Unit.STATE_DYSPNEA) increase_regen = 5
        //     else if(this.state === Unit.STATE_MOVE) increase_regen = 2
        //     else if(this.state === Unit.STATE_IDLE) increase_regen = 3
        //     else if(this.state === Unit.STATE_DAMAGED) increase_regen = 0
        //     else if(this.state === Unit.STATE_RUN) increase_regen = 0
        //     else if(this.state === Unit.STATE_ATTACK) increase_regen = 0
        //     else if(this.state === Unit.STATE_CAST) increase_regen = 0
        //     else increase_regen = 1
        //     this.energy += increase_regen
        //     if(this.energy > this.max_energy){
        //         this.energy = this.max_energy
        //     }
        // }
    }

    resetState(){
        this.struck = false
        this.casted = false
        this.sprite.reset()
    }

    kill(enemy){

    }

    setChannellingCast(){
        //todo
    }

    setCast() {
        this.decreaseActionPoint()
        this.state = Unit.STATE_CAST
        // todo reduced use energy
        this.reduceEnergy(15)
        this.resetState()
        this.stateAct = this.castAct
    }

    castAct() {
        if (this.sprite.frame >= Character.CAST_FRAME && !this.casted) {
            this.casted = true
            this.selected_skill.cast(this.figth_context, this.target)
        }
        if (this.sprite.isSpriteLoopEnd()) {
            this.target = false
            if (this.checkDyspnea()) {
                this.setDyspnea()
            } else {
                this.setIdle()
            }
        }
    }

    setIdle() {
        this.state = Unit.STATE_IDLE
        this.resetState()
        this.stateAct = this.idleAct
    }

    idleAct(){
        if(this.direction_angle){
            this.moveAct()
        }
        else {
            this.checkInput()
        }
    }
    decreaseActionPoint(){
        this.action_points --
    }
    setAttack(){
        this.decreaseActionPoint()
        this.state = Unit.STATE_ATTACK
        this.reduceEnergy(15)
        this.resetState()
        this.stateAct = this.attackAct
    }

    reduceEnergy(value){
        this.energy -= value
        if(this.energy < 0) this.energy = 0
    }

    attackAct(){
        if(this.sprite.frame === Character.ATTACK_FRAME && !this.struck){
            this.struck = true
            this.target.takeAttackDamage(this.default_attack.getDamageDescription(), this.default_attack)
            // for(let i = 0; i < this.figth_context.enemy.length;i++){
            //     let enemy = this.figth_context.enemy[i]
            //     let in_rect = Functions.pointInRect(this.attack_point.x, this.attack_point.y, enemy)
            //     // let it_range = Functions.circleRectCollision(this, this.getAttackRange(), enemy, true)
            //     // let can_be_damaged = enemy.canBeDamaged()
            //     if(in_rect){
            //         enemy.takeAttackDamage(this.default_attack.getDamageDescription(), this.default_attack)
            //         break;
            //     }
            // }
        }
        if(this.sprite.isSpriteLoopEnd()){
            if(this.checkDyspnea()){
                this.setDyspnea()
                return
            }
            this.setIdle()
        }
    }
    endTurn(){
        this.status.forEach((v,k,map) => {
            v.endTurn()
        })
        this.turn = false
        this.figth_context.next(this)
    }
    checkNumPressed(input){
        if(input['x']){
            this.figth_context.enemy.forEach(elem => {
                elem.takeDamage(new Damage(this, 20, Damage.DAMAGE_TYPE_PHYSICAL ,Damage.HIT_DIRECT))
            })
        }
        if(input['1'] || input['2'] || input['3'] || input['4'] || input['5'] || input['6']){
            if(input['1']){
                if(this.skill_pull[0]){
                    this.selected_skill = this.skill_pull[0]
                }
            }
            else if(input['2']){
                if(this.skill_pull[1]){
                    this.selected_skill = this.skill_pull[1]
                }
            }
            else if(input['3']){
                if(this.skill_pull[1]){
                    this.selected_skill = this.skill_pull[2]
                }
            }
            else if(input['4']){
                if(this.skill_pull[1]){
                    this.selected_skill = this.skill_pull[3]
                }
            }
            else if(input['5']){
                if(this.skill_pull[1]){
                    this.selected_skill = this.skill_pull[4]
                }
            }
            else if(input['6']){
                if(this.skill_pull[1]){
                    this.selected_skill = this.skill_pull[5]
                }
            }
        }
    }
    setDyspnea(){
        this.state = Unit.STATE_DYSPNEA
        this.resetState()
        this.stateAct = this.dyspneaAct
    }

    checkDyspnea(){
        return this.energy <= 5 && Math.random() > 0.5
    }
    setMove(){
        this.state = Unit.STATE_MOVE
        this.resetState()
        this.stateAct = this.moveAct
    }

    dyspneaAct(){

    }

    moveAct(){
        if(this.damage_angle){
            let move_x = Math.sin(this.damage_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.damage_angle)
            this.addPointIfPossible(move_x, move_y)
        }
        else if(this.direction_angle){
            let move_x = Math.sin(this.direction_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.direction_angle)
            this.addPointIfPossible(move_x, move_y)
        }
        else {
            let input = Input.getInput()
            this.checkNumPressed(input)
            if(!this.moveInputIsPressed(input)){
                this.setIdle()
                return
            }
            if(input[' '] && this.enoughEnergy(2)){
                this.setRun('run')
                return
            }
            this.getMoveAngle(input)
            let move_x = Math.sin(this.move_angle) * this.getMovementSpeed()
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.move_angle) * this.getMovementSpeed()
            this.addPointIfPossible(move_x, move_y)
        }
    }
    startTurn(){
        if(this.state === Unit.STATE_DYSPNEA){
            this.setIdle()
            this.dyspnea_count = 0
        }
        this.status.forEach((v,k,map) => {
            v.newTurn()
        })
        this.turn = true
        this.regeneration()
        this.calculateActionPoints()
    }
    calculateActionPoints(){

        this.max_action_points = Math.round(this.speed / 3)
        if(this.max_action_points < 1){
            this.max_action_points = 1
        }

        this.action_points = this.max_action_points
    }
    runAct(){

        if(this.figth_context.tick % 25 === 0){
            if(!this.enoughEnergy(2)){
                this.setMove()
                return;
            }
            else {
                this.energy -= 2
            }
        }

        let input = Input.getInput()
        if(!this.moveInputIsPressed(input)){
            this.setIdle()
            return
        }
        if(!input[' ']){
            this.setMove()
            return
        }
        this.checkNumPressed(input)
        this.getMoveAngle(input)
        let move_x = Math.sin(this.move_angle) * this.getMovementSpeed()
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle) * this.getMovementSpeed()
        this.addPointIfPossible(move_x * 2, move_y * 2)
    }

    setRun(){
        this.state = Unit.STATE_RUN
        this.resetState()
        this.stateAct = this.runAct
    }

    setBlock(){
        this.previous_state = this.state
        this.state = Unit.STATE_BLOCK
        this.resetState()
        this.stateAct = this.blockAct
        setTimeout(()=>{
            this.setPreviousState()
        },500)
    }

    blockAct(){

    }

    setWorldMove(){
        this.state = Unit.STATE_WORLD_MOVE
        this.resetState()
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
        if(this.sprite.sprite_end){
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
    takeAttackDamage(damage, damage_source){
        if(this.dead) return

        let chance_to_block = this.attack_block
        alert(chance_to_block)
        if(damage.options?.area_damage) chance_to_block /= 2

        if(Math.random() * 100 < chance_to_block){
            Functions.createModal(this, 'block')
            this.successBlock()
            return
        }

        let total_damage = 0

        damage.sources.forEach(source => {
            if(source.damage_type === DamageSource.DAMAGE_TYPE_PHYSICAL){
                total_damage += Math.floor(Functions.changeByPercent(source.value, this.getArmour()))
            }
            else if(source.damage_type === DamageSource.DAMAGE_TYPE_MAGICK){
                total_damage += Math.floor(Functions.changeByPercent(source.value, this.getMagickResistance()))
            }
        })

        this.life -= total_damage

        Functions.createModal(this, total_damage)
        if(this.life <= 0 ){
            this.setDying()
            return
        }

        this.setDamage()
    }

    canBeAttackTarget(){
        return !this.dead && !this.invisible
    }

    takeDamage(damage){

        if(damage.options.overtime){
            this.life -= damage.value
            Functions.createModal(this, damage.value)
            if(this.life <= 0 ){
                this.setDying()
            }
        }
        else {
            let source_type = damage.options.source_type

            // let chance_to_block = source_type === Damage.SOURCE_SPELL ? this.spell_block : this.attack_block

            if(damage.options.area_damage) chance_to_block /= 2

            if(this.state === Unit.STATE_BLOCK){
                // if(Math.random() * 100 < chance_to_block){
                //     Functions.createModal(this, 'block')
                //     this.successBlock()
                //     return
                // }
                if(true){
                    Functions.createModal(this, 'block')
                    this.successBlock()
                    return
                }
            }

            this.life -= damage.value
            Functions.createModal(this, damage.value)
            if(this.life <= 0 ){
                this.setDying()
                return
            }

            if(damage.options?.knockback){
                this.damage_angle = Functions.angle(damage.source, this)
                this.setDamage()
            }
        }

    }

    successBlock(){
        this.setBlock()
        this.blockTriggers.forEach(elem => {
            elem.trigger(this)
        })
    }

    setDamage(){
        this.previous_state = this.state
        this.damaged = true
        this.state = Unit.STATE_DAMAGED
        this.resetState()
        this.stateAct = this.damageAct
    }

    damageAct(){
        this.tick_in_damage ++
        if(this.tick_in_damage >= this.damage_time){
            this.damage_angle = false
            this.setPreviousState()
            this.tick_in_damage = 0
            this.damaged = false
        }
    }
    setPreviousState(){
        if(this.previous_state === Unit.STATE_DYSPNEA){
            this.setDyspnea()
        }
        if(this.previous_state === Unit.STATE_IDLE){
            this.setIdle()
        }
    }
    checkInput(){
        if(!this.turn){
            return;
        }

        let input = Input.getInput()

        if(input[' ']){
            this.endTurn()
        }

        let mouse_click = new Point(input.canvas_x, input.canvas_y)
        this.checkNumPressed(input)

        if(input.l_click && this.action_points){
            let target = this.figth_context.getTargetByPoint(mouse_click)
            let line = this.figth_context.checkLine(target.num)

            if(target && line){
                this.target = target
                this.setAttack()
                return
            }
        }
        if(input.r_click){
            this.target = this.figth_context.getTargetByPoint(mouse_click)
            this.attack_point = mouse_click
            this.setCast()
            return
        }

        // if(this.moveInputIsPressed(input) && this.state !== 'move'){
        //     this.setMove()
        //     return
        // }
        // if(input['e']){
        //     this.setBlock()
        // }
    }
    prepareToFight(fight){
        this.figth_context = fight
        this.fliped = false
        this.is_in_figth = true
        this.setIdle()
        fight.player = this

        let cell = fight.getPlayerCell()
        cell.content = this

        this.point.x = cell.x + cell.width/2
        this.point.y = cell.y + cell.height/2
    }
    act() {
        this.sprite.act()
        this.status.forEach((v,k,map) => {
            v.act()
        })
        this.stateAct()
    }

    addSkill(skill){
        this.skill_pull.push(skill)
        if (this.skill_pull.length === 1){
            this.selected_skill = skill
        }
    }

    removeSkill(skill){
        this.skill_pull = this.skill_pull.filter(elem => elem !== skill)
        if(this.selected_skill === skill){
            this.selected_skill = undefined
        }
        if(this.skill_pull.length){
            this.selected_skill = this.skill_pull[this.skill_pull.length - 1]
        }
    }

}