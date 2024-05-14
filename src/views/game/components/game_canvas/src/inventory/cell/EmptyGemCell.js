import EmptyCell from "./EmptyCell";

export default class EmptyGemCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id)
        this.img_path = '/src/assets/img/icons/items/misc/empty_gem.png'
        this.description =  'Empty gem cell.'
    }
}