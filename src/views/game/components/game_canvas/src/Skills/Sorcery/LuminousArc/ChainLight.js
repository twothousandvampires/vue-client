import Functions from "../../../GameFunctions";
import LuminousArcEffect from "../../../Effects/ChainLight/ChainLight";
import Skill from "../../../Scr/Skills/Skill";
import Damage from "@/views/game/components/game_canvas/src/Scr/Damage";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";

export default class LuminousArc extends Skill{

    constructor(template, player, gem) {
        super(template, player, gem)
        this.img_name = 'luminous_arc.gif'
        this.init()
    }
    set(){
        this.chain_limit = 4
        this.chain_range = 200
        this.min_damage = this.level * 1
        this.max_damage = this.level * 3
        this.mana_cost = 4 + (this.level * 2)
    }
    init(){
        this.set()
        if(this.amplifications.has('long arc')){
            this.chain_range += this.amplifications.get('long arc').level * 80
        }

        if(this.amplifications.has('inexhaustible charge')){
            this.chain_limit += this.amplifications.get('inexhaustible charge').level * 1
        }
        this.skill_description = `Jumps between enemies and damages them. 
                           Damage: ${this.min_damage} -  ${this.max_damage}
                           Chain limit: ${this.chain_limit}
                           Chain range: ${this.chain_range}
                           Damage type: Spell
                           Mana cost: ${this.getTotalManaCost()}`
    }

    cast(fight_context, target) {
        if (!target) {
            return
        }
        let hited = []
        let player = fight_context.player
        this.chain(fight_context, player, target, hited, 0)
    }

    async chain(fight_context, from, to, hited, count){
        await Functions.sleep(150)
        let distance = Functions.distance(from, to)
        let angle = Functions.angle(from, to)
        hited.push(to)
        let d = new Damage(Damage.SOURCE_SPELL, Damage.TYPE_HIT)
        d.addMagickSource(2, DamageSource.DAMAGE_TYPE_MAGICK)
        to.takeSpellDamage(d, this)
        fight_context.effects.push(new LuminousArcEffect(fight_context,(from.point.x + to.point.x)/2, (from.point.y + to.point.y)/2, distance, 0, angle))
        count ++
        if(count === this.chain_limit){
            return;
        }
        let target = fight_context.enemy.find(elem => Functions.distance(to, elem) < this.chain_range && !hited.includes(elem) && elem.canBeDamaged())
        if(!target){
            return
        }
        this.chain(fight_context, to, target, hited, count)
    }
}

