import Passive from "@/views/game/components/game_canvas/src/Passives/Passive";
import LustOfMurder from "@/views/game/components/game_canvas/src/Passives/LustOfMurder";
export default class PassiveFactory{
    static createPassive(template, player){
        switch (template.name){
            case 'lust for murder' :
                return new LustOfMurder(template, player)
            default:
                return new Passive(template, player)
        }
    }
}