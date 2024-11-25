import SkeletonWizardSprite from "./sprite/SkeletonWizardSprite";
import Undead from "../src/Undead";
import RaiseTheUndead from "@/views/game/components/game_canvas/src/Enemy/skills/RaiseTheUndead";
import SoulVortex from "@/views/game/components/game_canvas/src/Enemy/skills/SoulVortex";

export default class SkeletonWizard extends Undead{

    constructor(context,x, y) {
        super(context,x, y);
        this.name = 'bones of sorcerer'
        this.casts = [
            new SoulVortex(this),
            new RaiseTheUndead(this)
        ]
        this.sprite = new SkeletonWizardSprite(this)
        this.speed = 800
        this.size_x = 96 * 1.2
        this.size_y = 96 * 1.2
        this.box_size_x = 40
        this.box_size_y = 20
        this.fliped = true
        this.power = 350
        this.armour = 0
        this.resist = 40
        this.life = 20
        this.max_life = 20
        this.physical_damage = 0
        this.magic_damage = 14
        this.evade = 1
        this.mana = 3
        this.priority_for_spellcasting = 50
        this.caster = true
        this.init()
    }
}