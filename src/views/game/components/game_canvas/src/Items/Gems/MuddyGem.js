import Gem from "../Gem";

export default class MuddyGem extends Gem{
    constructor(template, player) {
        super(template, player);
        this.img_path = 'src/assets/img/icons/items/gems/muddy_gem.gif'
    }

    getDescription(){
        return this.name
    }
}