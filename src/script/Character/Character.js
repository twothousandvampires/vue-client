import Functions from "../GameFunctions"
import Inventory from "./Inventory"
import Unit from "../scr/Unit"
import Belt from "./hud/Belt";
import SkillPanel from "./hud/SkillPanel";
import Request from "../Request";
import ChainLight from "../Skills/ChainLight";



export default class Character extends Unit{

    constructor(template) {

        super(650, 850)
        this.id = template.id
        this.template = template

        this.stats = new Map()

        this.x = template.x
        this.y = template.y
        this.id = template.id
        this.pretti_x = 6
        this.pretti_y = 6

        this.skill_panel = new SkillPanel(this)
        this.belt = new Belt(this)

        this.opacity = 1
        this.inv = new Inventory(this, template.items)

        // this.skill = new StepOfAnotherWorld()
        this.stats = {}
        this.createStats(template)
        this.img_name = 'grim traveler'

        this.attack_box = undefined

        // size on canvas
        this.size_x = 96
        this.size_y = 96

        // sprite size
        this.sprite_w = 96
        this.sprite_h = 96

        // coll box size
        this.box_size_x = 40
        this.box_size_y = 20

        this.recovery_timeout = undefined
        this.direction_angle = false

        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms


        this.damaged_time = 0

        this.is_cast = false
        this.is_poution = false
        this.is_scroll = false
        this.is_run = false
        this.defended = false

        this.speed = 2
        this.setImageState('idle')
        this.attack_range = 50

        this.attack_speed = 1800

        this.invisible = false
        this.energy_low = 0
        this.chance_to_block = 50

    }

    enoughEnergy(needed){
        return this.stats.energy - needed >= 0
    }

    useTorch(){
        Request.torch()
    }

    createStats(template){
        this.id = template.id
        this.name = template.name
        this.torch = template.torch

        this.stats.armour = template.armour
        this.stats.speed = template.movement_speed
        this.stats.attack_range = template.attack_range
        this.stats.attack_speed = 200
        this.stats.min_attack_damage = template.min_attack_damage
        this.stats.max_attack_damage = template.max_attack_damage
        this.stats.evade = template.evade
        this.stats.cast_speed = template.cast_speed
        this.stats.max_life = template.max_life
        this.stats.life = template.life
        this.stats.max_energy = template.max_energy
        this.stats.energy = template.energy
        this.stats.will = template.will
        this.stats.energy_regen = template.stamina_regeneration
        this.stats.attack_block = template.attack_block
        this.stats.spell_block = template.spell_block
        this.stats.more_speed = 0

        // this.energy = 100
        // this.max_energy = 100
        // this.createCharacterStats()
        // this.createAttackStats()
        // this.createSpeedStats()
        // this.regenerationStats()
        // this.spellStats()
        // this.critStats()
        // this.defendStats()
    }

    defendStats(){

        let armour, increased_armour

        increased_armour = this.getIncreased('armour')
        armour = this.template.armour + (this.additional_armour ? this.additional_armour : 0)

        this.stats.set('armour', Functions.increasedByPercent(armour, increased_armour))
        this.stats.set('increased_armour', increased_armour)

        let evade, increased_evade

        increased_evade = this.getIncreased('evade')
        evade = this.template.evade + (this.evade ? this.evade : 0)

        this.stats.set('evade', Functions.increasedByPercent(evade, increased_evade))
        this.stats.set('increased_evade',  increased_evade)

        let resist, increased_resist

        increased_resist = this.getIncreased('resist')
        resist = this.template.resist + (this.resist ? this.resist : 0)

        this.stats.set('resist', Functions.increasedByPercent(resist, increased_resist))
        this.stats.set('increased_resist', increased_resist)

        let will = this.template.will + (this.will ? this.will : 0)
        will = Functions.increasedByPercent(will, this.getIncreased('will'))
        this.stats.set('will', will)
    }

    critStats(){

        let spell_crit_chance, attack_crit_chance, spell_crit_multy, attack_crit_multy

        spell_crit_chance = this.template.spell_crit_chance + (this.spell_crit_chance ? this.spell_crit_chance : 0)
        let increased_spell_crit_chance = this.getIncreased('spell_crit_chance')

        this.stats.set('spell_crit_chance' , spell_crit_chance)
        this.stats.set('increased_spell_crit_chance' , increased_spell_crit_chance)

        spell_crit_multy = this.template.spell_crit_multy + (this.spell_crit_multy ? this.spell_crit_multy : 0)
        let increased_spell_crit_multy = this.getIncreased('spell_crit_multy')

        this.stats.set('spell_crit_multy' , Functions.increasedByPercent(spell_crit_multy, increased_spell_crit_multy))
        this.stats.set('increased_spell_crit_multy' , increased_spell_crit_multy)

        //attack

        attack_crit_chance = this.template.attack_crit_chance + (this.attack_crit_chance ? this.attack_crit_chance : 0)


        let increased_attack_crit_chance = this.getIncreased('attack_crit_chance')

        this.stats.set('attack_crit_chance' , attack_crit_chance)
        this.stats.set('increased_attack_crit_chance' , increased_attack_crit_chance)


        attack_crit_multy = this.template.attack_crit_multy + (this.attack_crit_multy ? this.attack_crit_multy : 0)
        let increased_attack_crit_multy = this.getIncreased('attack_crit_multy')

        this.stats.set('attack_crit_multy' , Functions.increasedByPercent(attack_crit_multy, increased_attack_crit_multy) )
        this.stats.set('increased_attack_crit_multy' ,  increased_attack_crit_multy)
    }

    spellStats(){

        let additional_spell_damage = this.template.additional_spell_damage + (this.additional_spell_damage || 0)
        this.stats.set('additional_min_spell_damage', additional_spell_damage * 0.5)
        this.stats.set('additional_max_spell_damage', additional_spell_damage * 1.5)

        let increased_spell_aoe = this.getIncreased('spell_aoe')
        this.stats.set('increased_spell_aoe', increased_spell_aoe)

        let increased_spell_damage = this.getIncreased('spell_damage')
        this.stats.set('increased_spell_damage', increased_spell_damage)

        let spell_leech = this.template.spell_life_leech + (this.spell_life_leech || 0)
        this.stats.set('spell_life_leech', spell_leech)


    }

    regenerationStats(){
        let stamina_regeneration = this.template.stamina_regeneration
        let increased_stamina_regeneration = this.getIncreased('stamina_regeneration')
        this.stats.set('stamina_regeneration' , Functions.increasedByPercent(stamina_regeneration, increased_stamina_regeneration))
        this.stats.set('increased_stamina_regeneration' , increased_stamina_regeneration)
    }

    createSpeedStats(){
        //movement speed

        let speed = this.template.movement_speed
        let increased_movement_speed = this.getIncreased('movement_speed')

        this.stats.set('movement_speed' , Functions.reducedByPercent(speed, increased_movement_speed))
        this.stats.set('increased_movement_speed' , increased_movement_speed)

        //attack speed
        let a_speed = this.template.attack_speed
        let increased_attack_speed = this.getIncreased('attack_speed')

        this.stats.set('attack_speed' , Functions.reducedByPercent(a_speed, increased_attack_speed))
        this.stats.set('increased_attack_speed' , increased_attack_speed)

        //cast speed
        let c_speed = this.template.cast_speed
        let increased_cast_speed = this.getIncreased('cast_speed')

        this.stats.set('cast_speed' , Functions.reducedByPercent(c_speed, increased_cast_speed))
        this.stats.set('increased_cast_speed' , increased_cast_speed)
    }

    createCharacterStats(){
        this.stats.set('name',this.template.name)

        let increased_life = this.getIncreased('life')
        this.stats.set('max_life' , Functions.increasedByPercent(this.template.max_life, increased_life))
        this.stats.set('life' , Functions.increasedByPercent(this.template.life, increased_life))
        this.stats.set('increased_life' , increased_life)

        let increased_energy = this.getIncreased('energy')
        this.stats.set('max_energy' , Functions.increasedByPercent(this.template.max_energy, increased_energy))
        this.stats.set('energy' , Functions.increasedByPercent(this.template.energy, increased_energy))
        this.stats.set('increased_energy' , increased_energy)

        let increased_stamina = this.getIncreased('stamina')
        this.stats.set('max_stamina' , Functions.increasedByPercent(this.template.max_stamina, increased_stamina))
        this.stats.set('stamina' , Functions.increasedByPercent(this.template.stamina, increased_stamina))
        this.stats.set('increased_stamina' , increased_stamina)

    }

    createAttackStats(){
        let additional_attack_damage = this.template.additional_attack_damage + (this.additional_attack_damage ? this.additional_attack_damage : 0)
        let increased_attack_damage = this.getIncreased('attack_damage')

        this.stats.set('increased_attack_damage', increased_attack_damage)

        let attack_range = this.template.attack_range + (this.attack_range ? this.attack_damage : 0)
        let increased_attack_range = this.getIncreased('attack_range')

        this.stats.set('increased_attack_range' , increased_attack_range)
        this.stats.set('attack_range' , Functions.increasedByPercent(attack_range, increased_attack_range))

        this.stats.set('min_attack_damage', Functions.increasedByPercent(additional_attack_damage * 0.5, increased_attack_damage))
        this.stats.set('max_attack_damage', Functions.increasedByPercent(additional_attack_damage * 1.5, increased_attack_damage))

        let attack_leech = this.template.attack_life_leech + this.attack_life_leech ? this.attack_life_leech : 0
        this.stats.set('attack_life_leech', attack_leech)
    }

    getIncreased(stat) {
        let result = this.template['increased_' + stat]
                    + this.template['reduced_' + stat]
                    + parseInt((this['increased_' + stat] ? this['increased_' + stat] : 0))
                    + parseInt((this['reduced_' + stat] ? this['reduced_' + stat] : 0))
        return parseInt(result)
    }

    getState(){

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

    regen(tick){

        if(this.stats.energy <=5 ){
            this.energy_low ++
            if(this.energy_low >= 5){
                this.setImageState('dyspnea')
                this.energy_low = 0
            }
        }

        if( this.state === 'run' ){
            if(!this.enoughEnergy(5)){
                this.setImageState('move')
            }
            else {
                this.stats.energy -= 5
            }
        }
        else {
            if(this.stats.energy + 1 <= 100){
                this.stats.energy += this.getStat('energy_regen')
            }
        }
        // if(!this.is_run && !this.is_attack && tick%20 === 0 && this.energy < this.max_energy){
        //     this.energy += this.energy_regeneration
        //     if(this.energy > this.max_energy){
        //         this.energy = this.max_energy
        //     }
        // }
    }

    act(fight_context){

        if(fight_context.tick % 20 === 0){
            this.regen(fight_context.tick)
        }


        let input = fight_context.mouse.getInput()
        let mouse_cord = {cord_x: input.canvas_x, cord_y: input.canvas_y}

        if(input['z']){
            fight_context.enemy.forEach(elem=>{
                elem.setState('dying')
            })
        }

        this.status.pull.forEach(elem => {
            elem.act(fight_context)
        })

        switch (this.state){

            case 'idle':
                this.idle(fight_context, input, mouse_cord)
                break;
            case 'move':
                this.move(fight_context, input, mouse_cord)
                break;
            case 'run':
                this.run(fight_context, input, mouse_cord)
                break;
            case 'attack':
                this.attack(fight_context, input, mouse_cord)
                break;
            case 'block':
                this.block(fight_context, input, mouse_cord)
                break;
            case 'damaged':
                this.damaged(fight_context, input, mouse_cord)
                break;
            case 'cast':
                this.cast(fight_context, input, mouse_cord)
                break;
            case 'dyspnea':
                this.dyspnea(fight_context, input, mouse_cord)
                break;

        }
        // if(this.frozen || this.stunned){
        //     //
        // }
        // else if(this.damaged){
        //     let move_x = Math.sin(this.direction_angle)
        //     let move_y = Math.cos(this.direction_angle)
        //     this.setCord(move_x, move_y, map)
        // }
        // else if(this.is_attack){
        //     if(!this.deal_hit && this.frame === 5){
        //         this.deal_hit = true
        //         let hit = false
        //         effect.push(EffectCreator.createEffect('weapon swing', this.attack_box.cord_x, this.attack_box.cord_y, this.attack_box.box_size_x, this.attack_box.box_size_y, this.attack_box.angle))
        //         for(let i = 0; i < enemy.length;i ++){
        //             let target = enemy[i]
        //             if(Functions.rectCollision(this.attack_box, target) && !target.damaged && !target.is_dead){
        //                 target.damage(Functions.angle(this, target))
        //                 Modal.createModal(this.getAttackDamage() ,target.cord_x, target.cord_y)
        //                 // return;
        //             }
        //         }
        //     }
        // }
        // else if(this.is_cast || this.is_scroll || this.is_poution){
        //
        // }
        // else if(this.defended){
        //     if(!input.e){
        //         this.idle()
        //     }
        // }
        // else {
        //     if(input.e){
        //         this.stats.set('life', 4033)
        //         this.defend()
        //     }
        //     else if(input.r_click){
        //         this.cast(proj,Functions.angle(this, mouse_cord))
        //     }
        //     else if(input.l_click && this.energy > 2){
        //         this.attack(mouse_cord)
        //     }
        //     else if(this.moveInputIsPressed(input)){
        //         if(input[' '] && this.energy > 0.5){
        //             this.run(input, map)
        //         }
        //         else{
        //             this.move(input, map)
        //         }
        //     }
        //     else if(!this.is_idle){
        //         this.idle()
        //     }
        // }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.frame = 0
                if(this.state == 'attack' || this.state == 'cast'){
                    this.setImageState('idle')
                    this.deal_hit = false
                    this.casted = false
                }
            }
        }
    }

    setImageState(state){
        this.frame = 0
        switch (state){
            case 'idle':
                this.state = 'idle'
                this.y_frame_offset = 0
                this.max_frame = 12
                this.frame_change_tick = 6
                break;
            case 'move':
                this.state = 'move'
                this.y_frame_offset = 96
                this.max_frame = 8
                this.frame_change_tick = 2
                break;
            case 'run':
                this.state = 'run'
                this.y_frame_offset = 96
                this.max_frame = 8
                this.frame_change_tick = 1
                break;
            case 'attack':
                this.state = 'attack'
                this.y_frame_offset = 192
                this.max_frame = 10
                this.frame_change_tick = Math.floor((this.stats.attack_speed/10)/50)
                break;
            case 'block':
                this.state = 'block'
                this.y_frame_offset = 480
                this.max_frame = 4
                this.frame_change_tick = 6
                break;
            case 'damaged':
                this.state = 'damaged'
                this.y_frame_offset = 7 * 96
                this.max_frame = 2
                this.frame_change_tick = 1
                break;
            case 'cast':
                this.state = 'cast'
                this.y_frame_offset = 6 * 96
                this.max_frame = 11
                this.frame_change_tick = 3
                break;
            case 'dyspnea':
                this.state = 'dyspnea'
                this.y_frame_offset = 8 * 96
                this.max_frame = 4
                this.frame_change_tick = 3
                break;
            case 'world idle':
                this.state = 'idle'
                this.y_frame_offset = 288
                this.max_frame = 16
                this.frame_change_tick = 4
                break;
            case 'world move':
                this.state = 'idle'
                this.y_frame_offset = 384
                this.max_frame = 8
                this.frame_change_tick = 2
                break;
        }
    }

    cast(fight_context, input, mouse_cord){
        if(this.frame >= 7 && !this.casted){
            this.casted = true
            this.skill_panel.skills[this.casted_skill].cast(fight_context, mouse_cord)
        }
        // this.phased = true
        // this.opacity = 0.7
        // for(let i = 0; i < fight_context.enemy.length;i++){
        //     fight_context.enemy[i].attack_speed = 8000
        // }
    }

    dyspnea(fight_context, input, mouse_cord){
        if(this.energy >= 10){
            this.setImageState('idle')
        }
    }

    idle(fight_context, input, mouse_cord){
        let { mouse, effect, enemy, tick, proj, map } = fight_context
        if(input['1'] || input['2']){
            this.attack_point = mouse_cord
            if(input['1']){
                this.casted_skill = 0
            }
            else if(input['2']){
                this.casted_skill = 1
            }
            this.setImageState('cast')
            return
        }
        if(input.l_click){
            this.attack_point = mouse_cord
            this.setImageState('attack')
            return
        }
        if(this.moveInputIsPressed(input)){
            this.setImageState('move')
            return
        }
        if(input['e']){
            this.setImageState('block')
            return
        }
    }



    move(fight_context, input, mouse_cord){
        if(this.direction_angle){
            let move_x = Math.sin(this.direction_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.direction_angle)
            this.setCord(move_x, move_y, fight_context)
        }
        else {
            if(!this.moveInputIsPressed(input)){
                this.setImageState('idle')
                return
            }
            if(input[' '] && this.enoughEnergy(2)){
                this.stats.energy -=2
                this.setImageState('run')
                return
            }
            let { mouse, effect, enemy, tick, proj, map } = fight_context
            this.getMoveAngle(input)
            let move_x = Math.sin(this.move_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.move_angle)
            this.setCord(move_x, move_y, fight_context)
        }
    }
    run(fight_context, input, mouse_cord){
        if(!this.moveInputIsPressed(input)){
            this.setImageState('idle')
            return
        }
        if(!input[' ']){
            this.setImageState('move')
            return
        }
        let { mouse, effect, enemy, tick, proj, map } = fight_context
        this.getMoveAngle(input)
        let move_x = Math.sin(this.move_angle) * 2
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle) * 2
        this.setCord(move_x, move_y, fight_context)
    }

    takeDamage(source){
        this.life -= source.value
        if(source.force){
            this.setImageState('damaged')
            this.move_angle = Functions.angle(source.source, this)
        }
    }

    damaged(fight_context, input, mouse_cord){
        this.damaged_time ++
        if(this.damaged_time >= 20){
            this.setImageState('idle')
            this.damaged_time = 0
        }
        let move_x = Math.sin(this.move_angle)
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y, fight_context)
    }

    attack(fight_context, input, mouse_cord){
        if(this.frame === 6 && !this.deal_hit){
            this.deal_hit = true
            fight_context.newLog('you attack')
            for(let i = 0; i < fight_context.enemy.length;i++){
                if(Functions.distance(mouse_cord, this) < this.getStat('attack_range') && Functions.pointInRect(this.attack_point.cord_x, this.attack_point.cord_y, fight_context.enemy[i])){
                    fight_context.enemy[i].takeDamage(this)
                    break
                }
            }
        }
    }

    block(fight_context, input, mouse_cord){
        if(!input['e']){
            this.setImageState('idle')
            return
        }
    }

    wasHit(source, fight_context){
        if(this.state == 'block'){
            let total_block_chance = this.chance_to_block
            if(source.tags.includes('spell')){
                total_block_chance /= 2
            }
            if(source.tags.includes('aoe')){
                total_block_chance /= 2
            }
            if(Math.random() * 100 < total_block_chance){
                fight_context.newLog('you blocked ' + '(' + source.name + ')')
                return false
            }
        }
        return true
    }
}