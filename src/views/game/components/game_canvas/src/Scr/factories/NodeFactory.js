import UndergroundNode from "../../World/Node/UndegroundNode/UndergroundNode";
import UndeadContentSprite from "../../World/Content/Enemy/UndeadContentSprite";
import ChestContentSprite from "../../World/Content/Treasure/ChestContentSprite";
import ScrollContentSprite from "../../World/Content/Treasure/ScrollContentSprite";
import CrystalVeinContentSprite  from "../../World/Content/Treasure/CrystalVeinContentSprite";

const ENEMY_TYPE_UNDYING = 1
const TREASURE_TYPE_CHEST = 1
const TREASURE_TYPE_SCROLL = 2
const TREASURE_TYPE_CRYSTAL_VEIN = 3

export default class NodeFactory{

    constructor() {

    }

    createNode(template, char){
        let node = new UndergroundNode(template, char)
        switch (node.type){
            case 1:
                this.setEnemyContent(node)
                break;
            case 2:
                this.setTreasureContent(node)
                break;
        }
        return node
    }

    setEnemyContent(node){
        switch (node.content.content_type){
            case ENEMY_TYPE_UNDYING:
                node.content_sprite = new UndeadContentSprite()
                break;
        }
    }

    setTreasureContent(node){
        switch (node.content.content_type){
            case TREASURE_TYPE_CHEST:
                node.content_sprite = new ChestContentSprite()
                break;
            case TREASURE_TYPE_SCROLL:
                node.content_sprite = new ScrollContentSprite()
                break;
            case TREASURE_TYPE_CRYSTAL_VEIN:
                node.content_sprite = new CrystalVeinContentSprite()
                break;
        }
    }
}