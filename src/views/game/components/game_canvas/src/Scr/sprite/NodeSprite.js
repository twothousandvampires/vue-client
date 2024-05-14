import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class NodeSprite extends Sprite{
    constructor(node) {
        super();
        this.node = node
    }
}