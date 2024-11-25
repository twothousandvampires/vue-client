import LifeArmourOnBlock from "../../Items/EquipProperties/LifeArmourOnBlock";
import Radiance from "../../Items/EquipProperties/Radiance";
import EquipProperty from "@/views/game/components/game_canvas/src/Items/EquipProperties/EquipProperty";
export default class PropertyFactory {
    constructor() {
    }

    createEquipProperty(template, item){
        switch (template.stat){
            case 'leaf_armour_on_block':
                return new LifeArmourOnBlock(template, item)
            case 'radiance':
                return new Radiance(template, item)
            default:
                return new EquipProperty(template, item)
        }
    }
}