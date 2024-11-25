import MagicSpark from "../../Skills/MagicSpark.js";
import BlessedArmour from "../../Skills/BlessedArmour.js";
import FireBall from "../../Skills/FireBall.js";
import Healing from "../../Skills/Healing";
import GlacialNova from "../../Skills/GlacialNova";
import VampiricRite from "@/views/game/components/game_canvas/src/Skills/VampiricRite";
import WeaponSwing from "@/views/game/components/game_canvas/src/Skills/WeaponSwing";
import LiftBody from "@/views/game/components/game_canvas/src/Skills/LiftBody";
import HeavyStrike from "@/views/game/components/game_canvas/src/Skills/HeavyStrike";
import FireArrow from "@/views/game/components/game_canvas/src/Skills/FireArrow";
import FocusUp from "@/views/game/components/game_canvas/src/Skills/FocusUp";

export default class GemSkillFactory {
    static create(template, player) {
        switch (template.skill_name) {
            case 'blessed armour':
                return new BlessedArmour(template, player)
            case 'magic spark':
                return new MagicSpark(template, player)
            case 'fire ball':
                return new FireBall(template, player)
            case 'healing':
                return new Healing(template, player)
            case 'glacial wave':
                return new GlacialNova(template, player)
            case 'vampiric rite':
                return new VampiricRite(template, player)
            case 'weapon swing':
                return new WeaponSwing(template, player)
            case 'heavy strike':
                return new HeavyStrike(template, player)
            case 'lift the body':
                return new LiftBody(template, player)
            case 'burning arrow':
                return new FireArrow(template, player)
            case 'focus up':
                return new FocusUp(template, player)
        }
    }
}