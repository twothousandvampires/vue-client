import Gem from "../Gem";

export default class AcidGem extends Gem{
    constructor(template, player) {
        super(template, player);
        this.img_path = 'src/assets/img/icons/items/gems/acid_gem.gif'
    }

    getDescription(){
        return this.name
    }
}