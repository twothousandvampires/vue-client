import Functions from "../GameFunctions"
import Inventory from "./Inventory"
import SkillTree from "./SkillTree"
import Unit from "../scr/Unit"
import EffectCreator from "../Effects/EffectCreator"
import Modal from "../Modal.js"
import Belt from "./hud/Belt";
import SkillPanel from "./hud/SkillPanel";
import Status from "./hud/StatusBar";

export default class Character extends Unit{

    constructor(template) {
        super(650, 850)
        this.template = template.character

        this.stats = new Map()

        this.x = template.character.x
        this.y = template.character.y
        this.id = template.character.id
        this.pretti_x = 6
        this.pretti_y = 6

        this.skill_panel = new SkillPanel(this)
        this.status = new Status(this)
        this.belt = new Belt(this)


        this.inv = new Inventory(template.items, this)
        this.skill_tree = new SkillTree(JSON.parse(template.skill_tree), this)

        this.createStats()
        this.img_name = 'grim traveler'

        this.attack_box = undefined

        // size on canvas
        this.size_x = 90
        this.size_y = 93

        // sprite size
        this.sprite_w = 90
        this.sprite_h = 93

        // coll box size
        this.box_size_x = 48
        this.box_size_y = 24


        this.def_w = this.sprite_w
        this.def_h = this.sprite_h

        this.recovery_timeout = undefined

        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms




        this.is_cast = false
        this.is_poution = false
        this.is_scroll = false
        this.is_run = false
        this.defended = false

        this.speed = 2

    }

    createStats(){
        this.createCharacterStats()
        this.createAttackStats()
        this.createSpeedStats()
        this.regenerationStats()
        this.spellStats()
        this.critStats()
        this.defendStats()
    }

    defendStats(){

        let armour, increased_armour

        increased_armour = this.getIncreased('armour')
        armour = this.template.armour + (this.armour ? this.armour : 0)

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

        let weapon = this.inv.getWeapon()
        if(weapon){
            attack_crit_chance = weapon.crit_chance + (this.attack_crit_chance ? this.attack_crit_chance : 0)
        }
        else{
            attack_crit_chance = this.template.attack_crit_chance + (this.attack_crit_chance ? this.attack_crit_chance : 0)
        }

        let increased_attack_crit_chance = this.getIncreased('attack_crit_chance')

        this.stats.set('attack_crit_chance' , attack_crit_chance)
        this.stats.set('increased_attack_crit_chance' , increased_attack_crit_chance)


        attack_crit_multy = this.template.attack_crit_multy + (this.attack_crit_multy ? this.attack_crit_multy : 0)
        let increased_attack_crit_multy = this.getIncreased('attack_crit_multy')

        this.stats.set('attack_crit_multy' , Functions.increasedByPercent(attack_crit_multy, increased_attack_crit_multy) )
        this.stats.set('increased_attack_crit_multy' ,  increased_attack_crit_multy)


        console.log(this.increased_attack_crit_multy)
    }

    spellStats(){

        let add_spell_damage = this.template.add_spell_damage + this.add_spell_damage ? this.add_spell_damage : 0
        this.stats.set('add_min_spell_damage', add_spell_damage * 0.5)
        this.stats.set('add_max_spell_damage', add_spell_damage * 1.5)

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
        // set additional attack damage

        let add_attack_damage = this.template.add_attack_damage + this.add_attack_damage ? this.add_attack_damage : 0
        this.stats.set('add_min_attack_damage', add_attack_damage * 0.5)
        this.stats.set('add_max_attack_damage', add_attack_damage * 1.5)

        // set more/less attack damage

        this.stats.set('less_attack_damage', this.less_attack_damage ? this.less_attack_damage : 0)
        this.stats.set('more_attack_damage', this.less_attack_damage ? this.less_attack_damage : 0)

        let increased_attack_damage = this.getIncreased('attack_damage')

        this.stats.set('increased_attack_damage', increased_attack_damage)

        let min_attack_damage, max_attack_damage, attack_range
        let weapon = this.inv.getWeapon()
        if(weapon){
            min_attack_damage = weapon.min_damage
            max_attack_damage = weapon.max_damage
            attack_range = weapon.attack_range
        }
        else{
            min_attack_damage = this.template.min_attack_damage
            max_attack_damage = this.template.max_attack_damage
            attack_range = this.template.attack_range
        }

        let increase_attack_range = this.getIncreased('attack_range')

        this.stats.set('increased_attack_range' , increase_attack_range)
        this.stats.set('attack_range' , Functions.increasedByPercent(attack_range, increase_attack_range))

        this.stats.set('min_attack_damage', Functions.increasedByPercent(min_attack_damage + (add_attack_damage * 0.5), increased_attack_damage))
        this.stats.set('max_attack_damage', Functions.increasedByPercent(max_attack_damage + (add_attack_damage * 1.5), increased_attack_damage))

        let attack_leech = this.template.attack_life_leech + this.attack_life_leech ? this.attack_life_leech : 0
        this.stats.set('attack_life_leech', attack_leech)
    }

    getIncreased(stat) {
        let result = this.template['increased_' + stat]
                    + this.template['reduced_' + stat]
                    + (this['increased_' + stat] ? this['increased_' + stat] : 0)
                    + (this['reduced_' + stat] ? this['reduced_' + stat] : 0)
        return result
    }

    getState(){
        if(this.is_idle){
            return 'idle';
        }
        else if(this.is_attack){
            return 'attack'
        }
        else if(this.is_move){
            return 'move'
        }
        else if(this.is_run){
            return 'run'
        }
        else if(this.damaged){
            return 'damaged'
        }
        else if(this.defended){
            return 'defend'
        }
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

    resetFrame(){
        this.frame = 0
        this.frame_timer = 0
        this.is_move = false
        this.is_run = false
        this.is_attack = false
        this.is_poution = false
        this.is_scroll = false
        this.is_cast = false
        this.is_idle = false
        this.damaged = false
        this.defended = false
        this.attack_box = false
        this.deal_hit = false
    }

    setRecoveryTimeOut(ms){
        clearTimeout(this.recovery_timeout)
        this.recovery_timeout = setTimeout(()=>{
            this.idle()
        },ms)
    }

    regen(tick){
        if( (this.is_run ) && tick%10 === 0){
            this.energy -= 0.5
        }

        if(!this.is_run && !this.is_attack && tick%20 === 0 && this.energy < this.max_energy){
            this.energy += this.energy_regeneration
            if(this.energy > this.max_energy){
                this.energy = this.max_energy
            }
        }
    }

    act(mouse, effect, enemy, tick, proj, map){
        this.regen(tick)



        let input = mouse.getInput()
        let mouse_cord = {cord_x: input.canvas_x, cord_y: input.canvas_y}

        if(this.frozen || this.stunned){
            //
        }
        else if(this.damaged){
            let move_x = Math.sin(this.direction_angle)
            let move_y = Math.cos(this.direction_angle)
            this.setCord(move_x, move_y, map)
        }
        else if(this.is_attack){
            if(!this.deal_hit && this.frame === 5){
                this.deal_hit = true
                let hit = false
                effect.push(EffectCreator.createEffect('weapon swing', this.attack_box.cord_x, this.attack_box.cord_y, this.attack_box.box_size_x, this.attack_box.box_size_y, this.attack_box.angle))
                for(let i = 0; i < enemy.length;i ++){
                    let target = enemy[i]
                    if(Functions.rectCollision(this.attack_box, target) && !target.damaged && !target.is_dead){
                        target.damage(Functions.angle(this, target))
                        Modal.createModal(this.getAttackDamage() ,target.cord_x, target.cord_y)
                        // return;
                    }
                }
            }
        }
        else if(this.is_cast || this.is_scroll || this.is_poution){

        }
        else if(this.defended){
            if(!input.e){
                this.idle()
            }
        }
        else {
            if(input.e){
                this.stats.set('life', 4033)
                this.defend()
            }
            else if(input.r_click){
                this.cast(proj,Functions.angle(this, mouse_cord))
            }
            else if(input.l_click && this.energy > 2){
                this.attack(mouse_cord)
            }
            else if(this.moveInputIsPressed(input)){
                if(input[' '] && this.energy > 0.5){
                    this.run(input, map)
                }
                else{
                    this.move(input, map)
                }
            }
            else if(!this.is_idle){
                this.idle()
            }
        }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.frame = 0
            }
        }
    }

    cast(proj, angle){
        this.skill_panel.skills[1].use(proj, angle, this.cord_x, this.cord_y)
    }

    idle(){
        this.resetFrame()
        this.setSize(90, 93)
        this.is_idle = true
        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7
    }

    damage(angle){
        this.resetFrame()
        this.setSize(90,93)
        this.damaged = true
        this.direction_angle = angle
        this.y_frame_offset = 399
        this.max_frame = 2
        this.frame_change_tick = 1
        this.setRecoveryTimeOut(1000)
    }

    attack(mouse){
        this.energy -= 2
        this.resetFrame()
        this.setSize(120,120)
        this.is_attack = true
        this.y_frame_offset = 187
        this.max_frame = 8
        this.frame_change_tick = 1000/350
        this.attack_box = this.angleToAttackRect(Functions.angle(this,mouse))
        this.setRecoveryTimeOut(1000)
    }

    run(input, map){
        if(!this.is_run){
            this.resetFrame()
            this.setSize(90, 93)
            this.is_run = true
            this.y_frame_offset = 94
            this.max_frame = 4
            this.frame_change_tick = 3
        }
        else{
            this.getMoveAngle(input)
            let move_x = Math.sin(this.move_angle) * 2
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.move_angle) * 2
            this.setCord(move_x, move_y, map)
        }
    }

    defend(){
        this.resetFrame()
        this.setSize(90, 93)
        this.defended = true
        this.y_frame_offset = 309
        this.max_frame = 2
        this.frame_change_tick = 12
    }

    move(input ,map){
        if(!this.is_move){
            this.resetFrame()
            this.setSize(90, 93)
            this.is_move = true
            this.y_frame_offset = 94
            this.max_frame = 4
            this.frame_change_tick = 6
        }
        else{
            this.getMoveAngle(input)
            let move_x = Math.sin(this.move_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.move_angle)
            this.setCord(move_x, move_y, map)
        }
    }
}