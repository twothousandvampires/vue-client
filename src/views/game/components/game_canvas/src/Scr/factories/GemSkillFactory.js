import LuminousArc from "../../Skills/Sorcery/LuminousArc/ChainLight";
import ExcitedBody from "../../Skills/Movement/ExcitedBody/ExcitedBody";
import WanderingClot from "../../Skills/Sorcery/WanderingClot/WanderingClot";
import FallingRocks from "../../Skills/Sorcery/FallingRocks/FallingRocks";
import WildWind from "../../Skills/Sorcery/WildWind/WildWind";
import FireCoil from "../../Skills/Sorcery/FireCoil/FireCoil";
import IcyNova from "@/views/game/components/game_canvas/src/Skills/Sorcery/IcyNova/IcyNova";
import ShieldUp from "@/views/game/components/game_canvas/src/Skills/Combat/ShieldUp/ShieldUp";
import StoneSkin from "@/views/game/components/game_canvas/src/Skills/Combat/StoneSkin/StoneSkin";
export default class GemSkillFactory {
    constructor() {

    }
    static create(template, gem, player) {
        let prop_args = [template, player, gem]
        switch (template.name) {
            case 'luminous arc':
                return new LuminousArc(...prop_args)
            case 'excited body':
                return new ExcitedBody(...prop_args)
            case 'wandering clot':
                return new WanderingClot(...prop_args)
            case 'falling rocks':
                return new FallingRocks(...prop_args)
            case 'wild wind':
                return new WildWind(...prop_args)
            case 'fire coil':
                return new FireCoil(...prop_args)
            case 'icy nova':
                return new IcyNova(...prop_args)
            case 'shield up':
                return new ShieldUp(...prop_args)
            case 'stone skin':
                return new StoneSkin(...prop_args)
        }
    }
}