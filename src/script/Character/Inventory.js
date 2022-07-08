
import Item from "../Items/Item";
export default class Inventory{

    constructor(items,player) {
        this.player = player
        this.pull = []
        for(let i = 0; i < 30; i++){
            this.pull[i] = this.getCell(i)
        }
        items.forEach(elem =>{
            this.pull[elem.slot] = this.createItem(elem)
            if(elem.slot < 9){
                this.equipItem(this.pull[elem.slot])
            }
        })
        this.is_combat_row = false
        this.is_sorcery_row = false
        this.is_movement_row = false
        this.checkRow()
        this.checkColumn()
    }

    getRowItems(type){
        switch (type){
            case 'combat':
                return this.pull.slice(0,3)
            case 'sorcery':
                return this.pull.slice(3,6)
            case 'movement':
                return this.pull.slice(6,9)
        }
    }

    getColumnItems(item){
        if([0,3,6].includes(item.slot)) {
            return this.pull.filter(elem => [0,3,6].includes(elem.slot))
        }
        if([1,4,7].includes(item.slot)) {
            return this.pull.filter(elem => [1,4,7].includes(elem.slot))
        }
        if([2,5,8].includes(item.slot)) {
            return this.pull.filter(elem => [2,5,8].includes(elem.slot))
        }
    }

    checkRow(){
        let combat_row = this.pull.slice(0,3)
        let sorcery_row = this.pull.slice(3,6)
        let movement_row = this.pull.slice(6,9)

        if(combat_row.every(elem => {
            return elem.name !== 'empty' && elem.type === 'combat'
        })){
            combat_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_row = 10
                elem.equip(this.player)
            })
        }
        else {
            combat_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_row = 0
                elem.equip(this.player)
            })
        }

        if(sorcery_row.every(elem => {
            return elem.name !== 'empty' && elem.type === 'sorcery'
        })){
            sorcery_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_row = 10
                elem.equip(this.player)
            })
        }
        else {
            sorcery_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_row = 0
                elem.equip(this.player)
            })
        }

        if(movement_row.every(elem => {
            return elem.name !== 'empty' && elem.type === 'movement'
        })){
            movement_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_row = 10
                elem.equip(this.player)
            })
        }
        else {
            movement_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_row = 0
                elem.equip(this.player)
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
        if(weapon_row.length !== 0){
            item_class = weapon_row[0].class
        }
        if(weapon_row.every(elem => {  return elem.class === item_class })){
            weapon_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_column = 10
                elem.equip(this.player)
            })
        }
        else {
            weapon_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_column = 0
                elem.equip(this.player)
            })
        }

        item_class = undefined
        if(armour_row.length !== 0){
            item_class = armour_row[0].class
        }

        if(armour_row.every(elem => {
            return elem.class === item_class
        })){
            armour_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_column = 10
                elem.equip(this.player)
            })
        }
        else {
            armour_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_column = 0
                elem.equip(this.player)
            })
        }

        item_class = undefined
        if(accessory_row.length !== 0){
            item_class = accessory_row[0].class
        }

        if(accessory_row.every(elem => {
            return elem.class === item_class
        })){
            accessory_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_column = 10
                elem.equip(this.player)
            })
        }
        else {
            accessory_row.forEach(elem => {
                elem.unequip(this.player)
                elem.increased_by_column = 0
                elem.equip(this.player)
            })
        }

    }

    equipItem(item){
        let {cell_type, cell_class} = this.getEquipCellInfo(item.slot)
        if(item.class !== cell_class){
            item.class_penalty = 50
        }
        else if(item.type !== cell_type){
            item.type_penalty = 50
        }
        if(item.class_penalty || item.type_penalty){
            if(item.class_penalty && item.type !== cell_type){
                item.type_penalty = 25
            }
            else if(item.type_penalty && item.class !== cell_class){
                item.class_penalty = 25
            }
        }
        item.equip(this.player)
        console.log(item)
    }

    unequipItem(item){
        item.unequip(this.player)
        item.increased_by_row = 0
        item.increased_by_column = 0
        item.class_penalty = 0
        item.type_penalty = 0
    }

    getEquipCellInfo(slot){
        let info = {}

        if([0,3,6].includes(slot)){
            info.cell_class = 'weapon'
        }
        if([1,4,7].includes(slot)){
            info.cell_class = 'armour'
        }
        if([2,5,8].includes(slot)){
            info.cell_class = 'accessory'
        }
        if(slot < 3){
            info.cell_type = 'combat'
        }
        else if(slot < 6){
            info.cell_type = 'sorcery'
        }
        else{
            info.cell_type = 'movement'
        }
        return info
    }

    getCell(i){
        return {
            slot : i,
            name : 'empty',
            getDescription : () =>{
                return 'empty slot'
            },
            equip : function (p) {

            },
            unequip  : function (p) {

            }
        }
    }
    createItem(template){
        return new Item(template)
    }

    change(clicked, slot){
        let exchanged_item = this.pull[slot].name === 'empty' ? false : this.pull[slot]
        axios({method: 'post',
            url : '//127.0.0.1:8000/api/item/change/',
            data : {
                from : clicked.id,
                to : exchanged_item ? exchanged_item.id : slot,
                exchange : exchanged_item
            },
            headers : {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then(response =>{
            if(response.data.success){
                // если 2 предмета
                if(exchanged_item){
                    let temp_slot = clicked.slot
                    this.pull[exchanged_item.slot] = clicked
                    this.pull[clicked.slot] = exchanged_item
                    if(clicked.slot < 9){
                        this.unequipItem(clicked)
                    }
                    if(exchanged_item.slot < 9){
                        this.unequipItem(exchanged_item)
                    }
                    clicked.slot = exchanged_item.slot
                    exchanged_item.slot = temp_slot
                    if(clicked.slot < 9 ){
                        this.equipItem(clicked)
                    }
                    if(exchanged_item.slot < 9){
                        this.equipItem(exchanged_item)
                    }
                    clicked.clicked = false
                }
                // если 1 предмет
                else{
                    this.pull[slot] = clicked
                    this.pull[clicked.slot] = this.getCell(clicked.slot)
                    if(clicked.slot < 9){
                        this.unequipItem(clicked)
                    }
                    clicked.slot = slot
                    if(clicked.slot < 9){
                        this.equipItem(clicked)
                    }
                }
                clicked.clicked = false
                this.checkRow()
                this.checkColumn()
                this.player.createStats()
            }
        })
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