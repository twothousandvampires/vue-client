import ElderRing from "../../Items/Equip/ElderRing";
import MajesticHelm from "../../Items/Armour/MajesticHelm";
import SpectralSkull from "../../Items/Armour/SpectralSkull";
import StrangeDiadem from "../../Items/Armour/StrangeDiadem";
import PaleRazor from "../../Items/Weapon/PaleRazor";
import BoneCrusher from "../../Items/Weapon/BoneCrusher";
import GiantScale from "../../Items/Armour/GiantScale";
import WavedStick from "../../Items/Weapon/WavedStick";
import JumpingStars from "../../Items/Equip/JumpingStars";
import SearchingEye from "../../Items/Equip/SearchingEye";
import SproutedBranch from "../../Items/Equip/SproutedBranch";
import SkullCoveredInWax from "../../Items/Armour/SkullCoveredInWax";
import FuInleArmour from "../../Items/Armour/FuInleArmour";
import BonesInBoots from "../../Items/Armour/BonesInBoots";
import DreamFragment from "../../Items/Equip/DreamFragment";

import SlipperyGem from "../../Items/Gems/SlipperyGem";
import MuddyGem from "../../Items/Gems/MuddyGem";
import StrangeGem from "../../Items/Gems/StrangeGem";
import AcidGem from "../../Items/Gems/AcidGem";

import BattleMasteryScroll from "../../Items/Used/Scroll/BattleMasteruScroll/BattleMasteryScroll";
import DropOfBlood from "../../Items/Equip/DropOfBlood";
import LeafFall from "../../Items/Equip/LeafFall";
import EndlessFlame from "../../Items/Equip/EndlessFlame";
import DropOfShadow from "../../Items/Equip/DropOfShadow";
export default class ItemFactory {
    static createItem(template, player){
        switch (template.name){
            case 'elder ring':
                return new ElderRing(template)
            case 'majestic helm':
                return new MajesticHelm(template)
            case 'spectral skull':
                return new SpectralSkull(template)
            case 'strange diadem':
                return new StrangeDiadem(template)
            case 'pale razor':
                return new PaleRazor(template)
            case 'bone crusher':
                return new BoneCrusher(template)
            case 'giant scale':
                return new GiantScale(template)
            case 'waved stick':
                return new WavedStick(template)
            case 'jumping stars':
                return new JumpingStars(template)
            case 'searching eye':
                return new SearchingEye(template)
            case 'sprouted branch':
                return new SproutedBranch(template)
            case 'skull covered in wax':
                return new SkullCoveredInWax(template)
            case 'Fu Inle armour':
                return new FuInleArmour(template)
            case 'bones in boots':
                return new BonesInBoots(template)
            case 'dream fragment':
                return new DreamFragment(template)
            case 'slippery gem':
                return new SlipperyGem(template, player)
            case 'muddy gem':
                return new MuddyGem(template, player)
            case 'strange gem':
                return new StrangeGem(template, player)
            case 'acid gem':
                return new AcidGem(template, player)
            case 'battle mastery scroll':
                return new BattleMasteryScroll(template)
            case 'drop of blood':
                return new DropOfBlood(template)
            case 'leaf fall':
                return new LeafFall(template)
            case 'endless flame':
                return new EndlessFlame(template)
            case 'drop of shadow':
                return new DropOfShadow(template)

        }
    }
}