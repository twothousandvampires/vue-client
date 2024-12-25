import Used from "@/views/game/components/game_canvas/src/Items/Used/Used";

export default class Food extends Used{
    constructor(template, player) {
        super(template, player);
        this.decrease_action_point = false
    }
}