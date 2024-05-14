import Gem from "../Gem";

export default class StrangeGem extends Gem{
    constructor(template, player) {
        super(template, player);
        this.img_path = 'src/assets/img/icons/items/gems/strange_gem.gif'
    }

    getDescription(){
        return this.name
    }
}