import ImageData from "../../ImageData";
import WeaponSwing from "./WeaponSwing.js";
import ChainLight from "../../Effects/ChainLight/ChainLight";
import MagicExplosion from "../../Effects/MagicExplosion/MagicExplosion";
export default class EffectFactory {

    static createEffect(name, x, y, w, h ,angle){
        switch (name) {
            case 'weapon swing':
                return new WeaponSwing(x, y, w, h ,angle)
            case 'chain light':
                return new ChainLight(x, y, w, h ,angle)
            case 'magic explosion':
                return new MagicExplosion(x, y, w, h)
        }
    }
}