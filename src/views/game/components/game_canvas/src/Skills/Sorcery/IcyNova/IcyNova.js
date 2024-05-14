import Skill from "../../../Scr/Skills/Skill";
import IcyNovaArea from "@/views/game/components/game_canvas/src/Areas/IcyNova/IcyNova";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Damage from "@/views/game/components/game_canvas/src/Scr/Damage";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";
export default class IcyNova extends Skill{
    constructor(template, player, gem) {
        super(template, player, gem);
        this.img_path = 'src/assets/img/icons/skill/frost_nova.png'
        this.init()
    }

    setDefault(){
        this.min_damage = this.level * 5
        this.max_damage = this.level * 10
        this.mana_cost = 2
        this.freeze_duration = 3000
        this.size_x = 80
        this.size_y = 40
        this.radius_grow_x = 20
        this.radius_grow_y = 10
    }

    getDamageDescription(){
        let flat_min = this.min_damage + this.player.min_spell_damage
        let flat_max = this.max_damage + this.player.max_spell_damage
        let flat = Functions.random(flat_max, flat_min)
        let increase = this.player.getIncreaseSpellDamage() + this.player.getIncreaseDamage()


        let total = Functions.changeByPercent(flat, increase)

        let damage = new Damage(Damage.SOURCE_SPELL, Damage.TYPE_HIT, this.getTotalCriticalChance(), this.getTotalCriticalMultiplier())
        damage.addSource(new DamageSource(total, DamageSource.DAMAGE_TYPE_MAGICK))

        return damage
    }

    init(){
        this.setDefault()
    }

    cast(fight_context){
        fight_context.addArea(new IcyNovaArea(fight_context,
            this.player.point.x,
            this.player.point.y,
            this,
            this.size_x,
            this.size_y,
            this.radius_grow_x,
            this.radius_grow_y,
            this.freeze_duration)
        )
    }
}