import Equip from "@/script/Items/Equip";
import Gem from "@/script/Items/Gem";

export default class ItemCreator{
    static createItem(template){
        switch ( template.type ){
            case 'equip':
                return new Equip(template)
            case 'skill_gem':
                return new Gem(template)
        }
    }
}