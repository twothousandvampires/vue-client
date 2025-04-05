import UndergroundNode from "../../World/Node/UndegroundNode/UndergroundNode";
import UndeadContentSprite from "../../World/Content/Enemy/UndeadContentSprite";
import ChestContentSprite from "../../World/Content/Treasure/ChestContentSprite";
import ScrollContentSprite from "../../World/Content/Treasure/ScrollContentSprite";
import CrystalVeinContentSprite  from "../../World/Content/Treasure/CrystalVeinContentSprite";
import GreenskinsSprite from "@/views/game/components/game_canvas/src/World/Content/Enemy/GreenskinsSprite";
import Torch from "@/views/game/components/game_canvas/src/World/Content/Torch";
import PaleObelisk from "@/views/game/components/game_canvas/src/World/Content/Object/PaleObelisk";
import LiveSource from "@/views/game/components/game_canvas/src/World/Content/Object/LiveSource";
import GhostlyMage from "@/views/game/components/game_canvas/src/World/Content/Treasure/GhostlyMage";
import PotionbrewingPost from "@/views/game/components/game_canvas/src/World/Content/Object/PotionbrewingPost";
import OuterLife from "@/views/game/components/game_canvas/src/World/Content/Treasure/OuterLife";
import Enter from "@/views/game/components/game_canvas/src/World/Effect/Enter";
import AltarOfForgottenWarrior
    from "@/views/game/components/game_canvas/src/World/Content/Object/AltarOfForgottenWarrior";
import AltarOfForgottenSorcerer
    from "@/views/game/components/game_canvas/src/World/Content/Object/AltarOfForgottenSorcerer";
import ManaSource from "@/views/game/components/game_canvas/src/World/Content/Object/ManaSource";
import GhostlyWarrior from "@/views/game/components/game_canvas/src/World/Content/Treasure/GhostlyWarrior";
import RemainsOfCamp from "@/views/game/components/game_canvas/src/World/Content/Object/RemainsOfCamp";
import FlyingScrolls from "@/views/game/components/game_canvas/src/World/Content/Object/FlyingScrolls";
import LivingCreatures from "@/views/game/components/game_canvas/src/World/Content/Enemy/LivingCreatures";
import AbandonedForge from "@/views/game/components/game_canvas/src/World/Content/Object/AbandonedForge";
import EnvironmentSprite from "../../World/Content/Enemy/EnvironmentSprite";
import UnknownSquad from "../../World/Content/Enemy/UnknownSquad";

const ENEMY_TYPE_UNDYING = 1
const TREASURE_TYPE_CHEST = 1
const TREASURE_TYPE_OUTER_LIFE = 6
const TREASURE_TYPE_CRYSTAL_VEIN = 3
const TREASURE_TYPE_GHOSTLY_MAGE = 5

export default class NodeFactory{
    createNode(template, char){
        let node = new UndergroundNode(template, char)
        switch (node.type){
            case 0:
                this.setTorch(node)
                break;
            case 1:
                this.setEnemyContent(node)
                break;
            case 2:
                this.setTreasureContent(node)
                break;
            case 3:
                this.setObjectContent(node)
                break;
        }
        return node
    }
    setTorch(node){
        if(node.visited){
            if(node.x === 0 && node.y === 0){
                node.effect = new Enter(node)
    
            }
            else{
                node.content_sprite = new Torch()
            }
        }
    }
    setObjectContent(node){
        switch (node.content.content_type){
            case 1:
                node.content_sprite = new PaleObelisk()
                break;
            case 2:
                node.content_sprite = new LiveSource()
                break;
            case 3:
                node.content_sprite = new PotionbrewingPost()
                break;
            case 4:
                node.content_sprite = new AltarOfForgottenWarrior()
                break;
            case 5:
                node.content_sprite = new AltarOfForgottenSorcerer()
                break;
            case 6:
                node.content_sprite = new ManaSource()
                break;
            case 7:
                node.content_sprite = new RemainsOfCamp()
                break;
            case 8:
                node.content_sprite = new FlyingScrolls()
                break;
            case 9:
                node.content_sprite = new AbandonedForge()
                break;
        }
    }
    setEnemyContent(node){
        switch (node.content.content_type){
            case ENEMY_TYPE_UNDYING:
                node.content_sprite = new UndeadContentSprite()
                break;
            case 2:
                node.content_sprite = new GreenskinsSprite()
                break;
            case 3:
                node.content_sprite = new LivingCreatures()
                break;
            case 4:
                node.content_sprite = new EnvironmentSprite()
                break;
            case 5:
                node.content_sprite = new UnknownSquad()
                break;
        }
    }

    setTreasureContent(node){
        switch (node.content.content_type){
            case TREASURE_TYPE_CHEST:
                node.content_sprite = new ChestContentSprite()
                break;
            case 4:
                node.content_sprite = new ScrollContentSprite()
                break;
            case TREASURE_TYPE_GHOSTLY_MAGE:
                node.content_sprite = new GhostlyMage()
                break;
            case TREASURE_TYPE_CRYSTAL_VEIN:
                node.content_sprite = new CrystalVeinContentSprite()
                break;
            case TREASURE_TYPE_OUTER_LIFE:
                node.content_sprite = new OuterLife()
                break;
            case 7:
                node.content_sprite = new GhostlyWarrior()
                break;
        }
    }
}