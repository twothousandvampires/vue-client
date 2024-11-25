import SmallHealingPotion from "@/views/game/components/game_canvas/src/Items/Used/SmallHealingPotion";
import SmallArmourPotion from "@/views/game/components/game_canvas/src/Items/Used/SmallArmourPotion";
import LearningStone from "@/views/game/components/game_canvas/src/Items/Used/LearningStone";
import ImprovingStone from "@/views/game/components/game_canvas/src/Items/Used/ImprovingStone";
import UnpredictableStone from "@/views/game/components/game_canvas/src/Items/Used/UnpredictableStone";
import Equip from "@/views/game/components/game_canvas/src/Items/Equip";
import ExplosivePotion from "@/views/game/components/game_canvas/src/Items/Used/ExplosivePotion";
import EnchantingStone from "@/views/game/components/game_canvas/src/Items/Used/EnchantingStone";
import CaveMoth from "@/views/game/components/game_canvas/src/Items/Used/CaveMoth";
import NiceMushroom from "@/views/game/components/game_canvas/src/Items/Used/NiceMushroom";
import JuicyAsshole from "@/views/game/components/game_canvas/src/Items/Used/JuicyAsshole";
import ScrollOfRaiseBones from "@/views/game/components/game_canvas/src/Items/Used/ScrollOfRaiseBones";
import SmallManaPotion from "@/views/game/components/game_canvas/src/Items/Used/SmallManaPotion";
import ScrollOfInferno from "@/views/game/components/game_canvas/src/Items/Used/ScrollOfInferno";
import CaveBerry from "@/views/game/components/game_canvas/src/Items/Used/CaveBerry";
import CrystalHammer from "@/views/game/components/game_canvas/src/Items/Used/CrystalHammer";
import Spice from "@/views/game/components/game_canvas/src/Items/Used/Spice";

export default class ItemFactory {
    static createItem(template, player){
        switch (template.name){
            case 'small healing potion':
                return new SmallHealingPotion(template, player)
            case 'small armour potion':
                return new SmallArmourPotion(template, player)
            case 'explosive potion':
                return new ExplosivePotion(template, player)
            case 'learning stone':
                return new LearningStone(template, player)
            case 'enchanting stone':
                return new EnchantingStone(template, player)
            case 'improving stone':
                return new ImprovingStone(template, player)
            case 'unpredictable stone':
                return new UnpredictableStone(template, player)
            case 'cave moth':
                return new CaveMoth(template, player)
            case 'cave berry':
                return new CaveBerry(template, player)
            case 'nice mushroom':
                return new NiceMushroom(template, player)
            case 'juicy asshole':
                return new JuicyAsshole(template, player)
            case 'scroll of Raise Bones':
                return new ScrollOfRaiseBones(template, player)
            case 'scroll of Inferno':
                return new ScrollOfInferno(template, player)
            case 'small mana potion':
                return new SmallManaPotion(template, player)
            case 'crystal hammer':
                return new CrystalHammer(template, player)
            case 'spice':
                return new Spice(template, player)
            default:
                return new Equip(template, player)
        }
    }
}