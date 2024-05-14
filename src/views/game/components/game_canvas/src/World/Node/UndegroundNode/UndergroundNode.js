import Node from "../Node";
import UndergroundNodeSprite from "./Sprite/UnderroundNodeSprite";

export default class UndergroundNode extends Node{
    constructor(template, char) {
        super(template, char);
        this.sprite = new UndergroundNodeSprite(this)
    }
}