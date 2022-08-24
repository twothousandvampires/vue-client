import ItemCreator from "@/script/Items/ItemCreator";
import EmptyCell from "@/script/Items/EmptyCell";
export default class Inventory{

    constructor(player, items) {
        this.player = player
        this.pull = []
        for(let i = 0; i <= 38; i++){
            this.pull[i] = this.getCell(i)
        }

        items.forEach(elem =>{
            this.pull[elem.slot] = this.createItem(elem)
            if(elem.slot < 9 && elem.type === 'equip'){
                this.equipItem(this.pull[elem.slot])
            }
            if(elem.slot > 28 && elem.slot < 35 && elem.type === 'skill_gem'){
                this.equipItem(this.pull[elem.slot])
            }
        })

        this.is_combat_row = false
        this.is_sorcery_row = false
        this.is_movement_row = false
        this.checkRow()
        this.checkColumn()
        console.log(this.pull)
    }

    checkRow(){
        let combat_row = this.pull.slice(0,3)
        let sorcery_row = this.pull.slice(3,6)
        let movement_row = this.pull.slice(6,9)

        console.log(combat_row)

        if(combat_row.every(elem => {
             return elem.name !== 'empty' && elem.class === 'combat' && elem.type === 'equip'
        })){
            console.log('row!');
            combat_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_row = 10
                this.equipItem(elem)
            })
        }
        else {
            combat_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_row = 0
                this.equipItem(elem)
            })
        }

        if(sorcery_row.every(elem => {
            return elem.name !== 'empty' && elem.class === 'sorcery' && elem.type === 'equip'
        })){
            sorcery_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_row = 10
                this.equipItem(elem)
            })
        }
        else {
            sorcery_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_row = 0
                this.equipItem(elem)
            })
        }

        if(movement_row.every(elem => {
            return elem.name !== 'empty' && elem.class === 'movement' && elem.type === 'equip'
        })){
            movement_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_row = 10
                this.equipItem(elem)
            })
        }
        else {
            movement_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_row = 0
                this.equipItem(elem)
            })
        }
    }

    checkColumn(){
        let weapon_row = this.pull.filter(elem => {
            return [0,3,6].includes(elem.slot) && elem.name !== 'empty'
        })
        let armour_row = this.pull.filter(elem => {
            return [1,4,7].includes(elem.slot) && elem.name !== 'empty'
        })
        let accessory_row = this.pull.filter(elem => {
            return [2,5,8].includes(elem.slot) && elem.name !== 'empty'
        })
        let item_class = undefined
        if(weapon_row.length === 3){
            item_class = weapon_row[0].subclass
        }
        if(weapon_row.every(elem => {  return elem.subclass === item_class && elem.type === 'equip' })){
            weapon_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_column = 10
                this.equipItem(elem)
            })
        }
        else {
            weapon_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_column = 0
                this.equipItem(elem)
            })
        }

        item_class = undefined
        if(armour_row.length === 3){
            item_class = armour_row[0].subclass
        }

        if(armour_row.every(elem => {
            return elem.class === item_class && elem.type === 'equip'
        })){
            armour_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_column = 10
                this.equipItem(elem)
            })
        }
        else {
            armour_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_column = 0
                this.equipItem(elem)
            })
        }

        item_class = undefined
        if(accessory_row.length === 3){
            item_class = accessory_row[0].subclass
        }

        if(accessory_row.every(elem => {
            return elem.class === item_class && elem.type === 'equip'
        })){
            accessory_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_column = 10
                this.equipItem(elem)
            })
        }
        else {
            accessory_row.forEach(elem => {
                this.unequipItem(elem)
                elem.increased_by_column = 0
                this.equipItem(elem)
            })
        }

    }

    equipItem(item){
        if(item.type === 'equip' && item.slot < 9){
            let {cell_subclass, cell_class} = this.getEquipCellInfo(item.slot)
            if(item.subclass !== cell_subclass){
                item.subclass_penalty = 50
            }
            else if(item.class !== cell_class){
                item.class_penalty = 50
            }
            if(item.class_penalty || item.subclass_penalty){
                if(item.class_penalty && item.type !== cell_subclass){
                    item.type_penalty = 25
                }
                else if(item.subclass_penalty && item.class !== cell_class){
                    item.class_penalty = 25
                }
            }
            item.equip(this.player)
        }
        else if(item.type === 'skill_gem' && item.slot < 35 && item.slot > 28){
            item.equip(this.player)
        }
    }

    unequipItem(item){
        if(item.type === 'equip' && item.slot < 9){
            item.unequip(this.player)
            item.increased_by_row = 0
            item.increased_by_column = 0
            item.class_penalty = 0
            item.subclass_penalty = 0
        }
        else if(item.type === 'skill_gem' && item.slot < 35 && item.slot > 28){
            item.unequip(this.player)
        }
    }

    getEquipCellInfo(slot){
        let info = {}

        if([0,3,6].includes(slot)){
            info.cell_subclass = 'weapon'
        }
        if([1,4,7].includes(slot)){
            info.cell_subclass = 'armour'
        }
        if([2,5,8].includes(slot)){
            info.cell_subclass = 'accessory'
        }
        if(slot < 3){
            info.cell_class = 'combat'
        }
        else if(slot < 6){
            info.cell_class = 'sorcery'
        }
        else{
            info.cell_class = 'movement'
        }
        return info
    }

    getCell(i){
        return new EmptyCell(i)
    }

    createItem(template){
        return ItemCreator.createItem(template)
    }

    async change(clicked, slot) {
        let exchanged_item = this.pull[slot].name === 'empty' ? false : this.pull[slot]
        let ApiResponse = await axios({
            method: 'post',
            url: '//127.0.0.1:8000/api/item/change/',
            data: {
                from: clicked.id,
                to: exchanged_item ? exchanged_item.id : slot,
                exchange: exchanged_item
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        if (ApiResponse.data.success) {
            // если 2 предмета
            if (exchanged_item) {
                let temp_slot = clicked.slot
                this.pull[exchanged_item.slot] = clicked
                this.pull[clicked.slot] = exchanged_item

                this.unequipItem(clicked)
                this.unequipItem(exchanged_item)

                clicked.slot = exchanged_item.slot
                exchanged_item.slot = temp_slot

                this.equipItem(clicked)
                this.equipItem(exchanged_item)

                clicked.clicked = false
            }
            // если 1 предмет
            else {
                this.pull[slot] = clicked
                this.pull[clicked.slot] = new EmptyCell(clicked.slot)
                this.unequipItem(clicked)
                clicked.slot = slot
                this.equipItem(clicked)
            }
            clicked.clicked = false
            this.checkRow()
            this.checkColumn()
            this.player.createStats()
        }
    }
    deleteItem(item){
        if(item.slot_type === 'equip'){
            this.equip[item.slot] = 'empty'
        }
        else {
            this.pull[this.pull.indexOf(item)] = 'empty'
        }
    }
}