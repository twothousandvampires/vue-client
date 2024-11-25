import GruzGulGreenskinCultistSprite
    from "@/views/game/components/game_canvas/src/Enemy/Gruz-GulGreenskinCultist/GruzGulGreenskinCultistSprite";
import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import WarDrums from "@/views/game/components/game_canvas/src/Auras/WarDrums";
import FireShards from "@/views/game/components/game_canvas/src/Auras/FireShards";
import FireBall from "@/views/game/components/game_canvas/src/Enemy/skills/FireBall";
import WeakSoul from "@/views/game/components/game_canvas/src/Enemy/skills/WeakSoul";
import BlindingFlash from "@/views/game/components/game_canvas/src/Enemy/skills/BlindingFlash";

export default class GruzGulGreenskinCultist extends Enemy{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100
        this.sprite = new GruzGulGreenskinCultistSprite(this)
        this.evade = 5
        this.attack_block = 0
        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'Gruz-Gul greenskin cultist'
        this.speed = 800

        this.stateAct = undefined
        this.state = undefined

        this.power = 200
        this.armour = 2
        this.resist = 40
        this.life = 16
        this.max_life = 16
        this.physical_damage = 3
        this.magic_damage = 2
        this.fire_damage_resist = 2
        this.auras = [
            new FireShards(this)
        ]
        this.caster = true
        this.mana = 2
        this.priority_for_spellcasting = 50
        this.casts = [
            new BlindingFlash(this)
        ]
        this.init()
    }
}