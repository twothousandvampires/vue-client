import Functions from "../../../GameFunctions";
import  {default as WanderingClotProj }  from "../../../Projectiles/wild_wind_proj/WildWindProj";
import Skill from "../../../Scr/Skills/Skill";
import Ignite from "../../../Status/Ignite/Ignite";
import Damage from "@/views/game/components/game_canvas/src/Scr/Damage";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";
import WanderingClotEnd from "@/views/game/components/game_canvas/src/Effects/WanderingClotEnd/WanderingClotEnd";

export default class WanderingClot extends Skill{

    constructor(template, player, gem) {
        super(template, player, gem)
        this.img_path = 'src/assets/img/icons/skill/wandering_clot.gif'
        this.spell_crit_multiplier = 0
        this.init()
    }

    getMinDamage(){
        let flat_min = this.min_damage + this.player.min_spell_damage
        let increase = this.player.getIncreaseSpellDamage() + this.player.getIncreaseDamage()
        if(this.amplifications.has('overload')){
            let damage_inc = this.amplifications.get('overload').getDamageValue()
            increase += damage_inc
        }
        if(this.amplifications.has('more projectiles')){
            let damage_inc = this.amplifications.get('more projectiles').getDamageReduce()
            increase += damage_inc
        }
        if(this.amplifications.has('intensity')){
            let damage_inc = this.amplifications.get('intensity').getDamageReduce()
            increase += damage_inc
        }

        return Functions.changeByPercent(flat_min, increase)
    }

    getMaxDamage(){
        let flat_max = this.max_damage + this.player.max_spell_damage

        let increase = this.player.getIncreaseSpellDamage() + this.player.getIncreaseDamage()
        if(this.amplifications.has('overload')){
            let damage_inc = this.amplifications.get('overload').getDamageValue()
            increase += damage_inc
        }
        if(this.amplifications.has('more projectiles')){
            let damage_inc = this.amplifications.get('more projectiles').getDamageReduce()
            increase += damage_inc
        }
        if(this.amplifications.has('intensity')){
            let damage_inc = this.amplifications.get('intensity').getDamageReduce()
            increase += damage_inc
        }

        return Functions.changeByPercent(flat_max, increase)
    }

    getDamageDescription(){

        let total = Functions.random(this.getMaxDamage(), this.getMinDamage())

        let damage = new Damage(Damage.SOURCE_SPELL, Damage.TYPE_HIT, this.getTotalCriticalChance(), this.getTotalCriticalMultiplier())
        damage.addSource(new DamageSource(total, DamageSource.DAMAGE_TYPE_MAGICK))

        return damage
    }

    getDescription(){
        return this.description
    }

    setDefault(){
        this.min_damage = this.level * 2
        this.max_damage = this.level * 3
        this.mana_cost = 2
        this.proj_speed = 1.2
        this.angle_limit = true
        this.ttl = 3000
        this.damage_interval = 200
        this.radius = 20
        this.proj_count = 1
    }
    init(){
        this.setDefault()
        if(this.amplifications.has('overload')){
            let ttl_reduce = this.amplifications.get('overload').getTtlValue()
            this.ttl = Math.round(Functions.changeByPercent(this.ttl, ttl_reduce))

            let speed_inc = this.amplifications.get('overload').getSpeedValue()
            this.proj_speed = Functions.increasedByPercent(this.proj_speed, speed_inc)
        }
        if(this.amplifications.has('intensity')){
            let damage_interval_reduce = this.amplifications.get('intensity').getDamageIncreaseInterval()
            this.damage_interval -= damage_interval_reduce
        }

        if(this.amplifications.has('more projectiles')){
            let add_proj = this.amplifications.get('more projectiles').getAddProj()
            this.proj_count += add_proj
        }

        if(this.amplifications.has('density')){
            let add_crit = this.amplifications.get('density').getAddCrit()
            this.crit_chance += add_crit
        }

        this.description = `<p>Changes its direction, deals damage on contact.<p>
                            <p>Damage: ${this.getMinDamage()} - ${this.getMaxDamage()}</p>
                            <p>Mana cost: ${this.getTotalManaCost()}</p>
                            <p>Speed: ${this.proj_speed}</p>
                            <p>Live time: ${this.ttl / 1000}</p>
                            <p>Damage interval: ${this.damage_interval} ms</p>
                            <p>Profectiles: ${this.proj_count}</p>`
    }

    end(proj){
        let fight_context = this.player.figth_context
        if(this.amplifications.has('endless energy')){
            let chance = this.amplifications.get('endless energy').getChance()
            if(Math.random() * 100 < chance){
                let angle = Math.random() * 6.14
                fight_context.projectiles.push(new WanderingClotProj(
                    fight_context,
                    proj.point.x,
                    proj.point.y,
                    this,
                    this.proj_speed,
                    this.angle_limit,
                    this.ttl,
                    this.damage_interval,
                    this.radius,
                    angle
                ))
            }
        }
        if(this.amplifications.has('explosive')){
            let chance = this.amplifications.get('explosive').getChance()
            if(Math.random() * 100 < chance){
                fight_context.enemy.forEach(enemy => {
                    if(Functions.circleRectCollision(proj, 100, enemy, true)){
                        let ignite_damage = Functions.random(this.getMaxDamage(), this.getMinDamage())
                        ignite_damage = ignite_damage * this.amplifications.get('explosive').getIgniteDamage()/100
                        enemy.newStatus(new Ignite(ignite_damage), this.player)
                    }
                })
            }
        }
        fight_context.addEffect(new WanderingClotEnd(fight_context, proj.point.x, proj.point.y, 40, 40))
    }
    cast(fight_context, cords) {
        let player = fight_context.player
        let angle = Functions.angle(player, cords)
        for(let i = 0; i < this.proj_count; i ++){
            if(i !== 0){
                angle += i%2 === 0 ? i * -0.84 : i * 0.84
            }
            fight_context.projectiles.push(new WanderingClotProj(
                fight_context,
                player.point.x,
                player.point.y,
                this,
                this.proj_speed,
                this.angle_limit,
                this.ttl,
                this.damage_interval,
                this.radius,
                angle
            ))
        }
    }
}