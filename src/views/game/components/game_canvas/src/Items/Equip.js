import Item from "./Item";
import PropertyFactory from "../Scr/factories/PropertyFactory";

let prop_creator = new PropertyFactory()

export default class Equip extends Item{

    static CLASSES = {
        1: 'combat',
        2: 'sorcery',
        3: 'movement',
    }

    static TYPES = {
        1: 'weapon',
        2: 'armour',
        3: 'accessory',
    }

    static RARITIES = {
        1: 'normal',
        2: 'uncommon',
        3: 'rare',
        4: 'legendary',
    }

    static QUALITIES = {
        1: 'low',
        2: 'normal',
        3: 'good',
        4: 'masterpiece',
    }

    constructor(template) {
        super(template);
        this.props = []

        this.rarity = template.rarity
        this.class = template.details.equip_class
        this.type = template.details.equip_type
        this.quality = template.details.equip_quality

        this.increased_by_row = template.details.row_bonus ? 10 : 0
        this.increased_by_column = template.details.column_bonus  ? 10 : 0
        this.penalty = template.details.penalty

        template.props.forEach(elem => {
            this.props.push(prop_creator.createEquipProperty(elem, this))
        })
    }

    getTotal(){
        return this.increased_by_column + this.increased_by_row - this.penalty
    }

    getDescription(){
        let result = ``
        result += `name - ${this.name} \n`
        result += `class - ${Equip.CLASSES[this.class]} \n`
        result += `subclass - ${Equip.TYPES[this.type]} \n`
        result += `rarity - ${Equip.RARITIES[this.rarity]} \n`
        result += `quality - ${Equip.QUALITIES[this.quality]} \n`
        result += `----------------------- \n`

        this.props.forEach(elem => {
            result += elem.getDescription(this)
        })

        if(this.increased_by_row){
            result += `increased on row by ${this.increased_by_row} \n`
        }
        if(this.increased_by_column){
            result += `increased on column by ${this.increased_by_column} \n`
        }
        if(this.penalty){
            result += `penalty ${this.penalty} \n`
        }
        return result
    }

    equip(player){
        this.props.forEach(prop => {
            prop.equip(player)
        })
    }

    unequip(player){
        this.props.forEach(prop => {
            prop.unequip(player)
        })
    }
}