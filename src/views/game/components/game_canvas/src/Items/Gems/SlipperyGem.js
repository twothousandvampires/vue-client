import Gem from "../Gem";

export default class SlipperyGem extends Gem{
    constructor(template, player) {
        super(template, player);
        this.img_path = 'src/assets/img/icons/items/gems/slippery_gem.gif'
    }

    getDescription(){
        return this.name
    }
}