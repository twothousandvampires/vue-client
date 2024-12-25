import SkeletonWarrior from "../../Enemy/SkeletonWarrior/SkeletonWarrior";
import SkeletonArcher from "../../Enemy/skeletonArcher/SkeletonArcher";
import SkeletonWizard from "../../Enemy/skeleton_wizard/SkeletonWizard";
import GiantUndead from "../../Enemy/giant_undeda/GiantUndead";
import Lich from "../../Enemy/lich/Lich";
import Ghost from "../../Enemy/ghost/Ghost";
import PileOfSkull from "../../Enemy/pile_of_skull/PileOfSkull";
import SkeletonKnight from "../../Enemy/skeleton_knight/SkeletonKnight";
import GoblinWithSpear from "@/views/game/components/game_canvas/src/Enemy/GoblinWithSpear/GoblinWithSpear";
import GoblinCatcher from "@/views/game/components/game_canvas/src/Enemy/GoblinCatcher/GoblinCatcher";
import SittingOnTheBeast from "@/views/game/components/game_canvas/src/Enemy/SittingOnTheBeast/SittingOnTheBeast";
import GoblinMixologist from "@/views/game/components/game_canvas/src/Enemy/GoblinMixologist/GoblinMixologist";
import LivingFlesh from "@/views/game/components/game_canvas/src/Enemy/LivingFlesh/LivingFlesh";
import MadFlesh from "@/views/game/components/game_canvas/src/Enemy/MadFlesh/MadFlesh";
import DeathsShard from "@/views/game/components/game_canvas/src/Enemy/DeathsShard/DeathsShard";
import GreenskinProphet from "@/views/game/components/game_canvas/src/Enemy/GreenskinProphet/GreenskinProphet";
import Pachydermatous from "@/views/game/components/game_canvas/src/Enemy/Pachydermatous/Pachydermatous";
import MouseBreeder from "@/views/game/components/game_canvas/src/Enemy/MouseBreeder/MouseBreeder";
import CaveBat from "@/views/game/components/game_canvas/src/Enemy/CaveBat/CaveBat";
import CommandingGreenskin from "@/views/game/components/game_canvas/src/Enemy/CommandingGreenskin/CommandingGreenskin";
import GruzGulGreenskinCultist
    from "@/views/game/components/game_canvas/src/Enemy/Gruz-GulGreenskinCultist/Gruz-GulGreenskinCultist";
import Centipede from "@/views/game/components/game_canvas/src/Enemy/Centipede/Centipede";
import EnchantedArmour from "@/views/game/components/game_canvas/src/Enemy/EnchantedArmour/EnchantedArmour";
import EnchantedWeapon from "@/views/game/components/game_canvas/src/Enemy/EnchantedWeapon/EnchantedWeapon";
import ParalyzingArachnid from "@/views/game/components/game_canvas/src/Enemy/ParalyzingArachnid/ParalyzingArachnid";
import ShellingBeetle from "@/views/game/components/game_canvas/src/Enemy/ShellingBeetle/ShellingBeetle";
import ProtectiveMinerals from "../../Enemy/ProtectiveMinerals/ProtectiveMinerals";
import LostDaylight from "../../Enemy/LostDaylight/LostDaylight";
import WanderingNightShine from "../../Enemy/WanderingNightShine/WanderingNightShine";
import Swarm from "../../Enemy/Swarm/Swarm";
import TheBeehiveDragger from "../../Enemy/TheBeehiveDragger/TheBeehiveDragger";
import Slime from "../../Enemy/Slime/Slime";
import GerminatedMycelium from "../../Enemy/GerminatedMycelium.js/GerminatedMycelium";
import WildMyceliumSprite from "../../Enemy/WildMycelium/WildMyceliumSprite";
import WildMycelium from "../../Enemy/WildMycelium/WildMycelium";
import StingingOne from "../../Enemy/StingingOne/StingingOne";
import NaughtyPieceofDarkness from "../../Enemy/NaughtyPieceofDarkness/NaughtyPieceofDarkness";

export default class EnemyFactory {
    constructor() {

    }

    create(name, context){
        switch (name){
            case 'bones':
                return new SkeletonWarrior(context)
            case 'shooting bones':
                return new SkeletonArcher(context)
            case 'bones of sorcerer':
                return new SkeletonWizard(context)
            case 'fantasm':
                return new Ghost(context)
            case 'pile of skulls':
                return new PileOfSkull(context)
            case 'boned bones':
                return new GiantUndead(context)
            case 'bones of greatest sorcerer':
                return new Lich(context)
            case 'bones in armour':
                return new SkeletonKnight(context)
            case 'greenskin':
                return new GoblinWithSpear(context)
            case 'greenskin catcher':
                return new GoblinCatcher(context)
            case 'sitting on the beast':
                return new SittingOnTheBeast(context)
            case 'greenskin potion thwower':
                return new GoblinMixologist(context)
            case 'living flesh':
                return new LivingFlesh(context)
            case 'mad flesh':
                return new MadFlesh(context)
            case 'shard of death':
                return new DeathsShard(context)
            case 'greenskin prophet':
                return new GreenskinProphet(context)
            case 'pachydermatous':
                return new Pachydermatous(context)
            case 'mouse breeder':
                return new MouseBreeder(context)
            case 'cave bat':
                return new CaveBat(context)
            case 'commanding greenskin':
                return new CommandingGreenskin(context)
            case 'Gruz-Gul greenskin cultist':
                return new GruzGulGreenskinCultist(context)
            case 'centipede':
                return new Centipede(context)
            case 'enchanted armour':
                return new EnchantedArmour(context)
            case 'enchanted weapon':
                return new EnchantedWeapon(context)
            case 'paralyzing arachnid':
                return new ParalyzingArachnid(context)
            case 'shelling beetle':
                return new ShellingBeetle(context)
            case 'protective minerals':
                return new ProtectiveMinerals(context)
            case 'lost daylight':
                return new LostDaylight(context)
            case 'wandering night shine':
                return new WanderingNightShine(context)
            case 'swarm':
                return new Swarm(context)
            case 'the beehive dragger':
                return new TheBeehiveDragger(context)
            case 'slime':
                return new Slime(context)
            case 'germinated mycelium':
                return new GerminatedMycelium(context)
            case 'wild mycelium':
                return new WildMycelium(context)
            case 'stinging one':
                    return new StingingOne(context)
            case 'naughty piece of darkness':
                return new NaughtyPieceofDarkness(context)
        }
    }
}