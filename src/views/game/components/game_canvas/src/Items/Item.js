import Cell from "../inventory/cell/Cell";
export default class Item extends Cell{

    static rarity_strings = {
        1: 'common',
        2: 'uncommon',
        3: 'rare',
        4: 'legendary'
    }

    constructor(template) {
        super(template.slot)
        this.cell_empty = Cell.CELL_NOT_EMPTY
        this.name = template.name
        this.item_type = +template.type
        this.quality = template.quality
        this.rarity = template.rarity
        this.char_id = template.char_id
        this.id = template.id
    }

    getRarityString(){
        return Item.rarity_strings[this.rarity]
    }

}