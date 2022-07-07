
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

    equipItem(item){
        let row = this.isRow(item.type)
        let column = this.isColumn(item)
        if(row){
            this.getRowItems(item.type).forEach(elem => {
                if(elem !== item){
                    elem.unequip(this.player)
                    elem.increased_by_row += 10
                    elem.equip(this.player)
                }
                else {
                    elem.increased_by_row += 10
                }
            })
        }
        if(column){
            this.getColumnItems(item).forEach(elem => {
                if(elem !== item){
                    elem.unequip(this.player)
                    elem.increased_by_column += 10
                    elem.equip(this.player)
                }
                else {
                    elem.increased_by_column += 10
                }
            })
        }
        item.equip(this.player)
    }

    unequipItem(item){
        if(item.increased_by_row) {
            this.getRowItems(item.type).forEach(elem => {
                if(elem.name !== 'empty'){
                    elem.unequip(this.player)
                    elem.increased_by_row = 0
                    elem.equip(this.player)
                }
            })
        }
        if(item.increased_by_column) {
            this.getColumnItems(item).forEach(elem => {
                if(elem.name !== 'empty'){
                    elem.unequip(this.player)
                    elem.increased_by_column = 0
                    elem.equip(this.player)
                }
            })
        }
        item.unequip(this.player)
        item.increased_by_row = 0
        item.increased_by_column = 0
    }

    getCell(i){
        return {
            slot : i,
            name : 'empty',
            type : i < 3 ? 'combat' : i < 6 ? 'sorcery' : i < 9 ? 'movement' : 'inventory',
            class : [0,3,6].includes(i) ? 'weapon' : [1, 4, 7].includes(i) ? 'armour' : [2, 5, 8].includes(i) ? 'accessory' : 'inventory',
            getDescription : () =>{
                return 'empty slot'
            }
        }
    }

    isRow(type){
        switch (type){
            case 'combat':
                return this.pull.slice(0,3).every(elem => {
                    return elem?.name !== 'empty' && elem?.type === type
                })
            case 'sorcery':
                return this.pull.slice(3,6).every(elem => {
                    return elem?.name !== 'empty' && elem?.type === type
                })
            case 'movement':
                return this.pull.slice(6,9).every(elem => {
                    return elem?.name !== 'empty' && elem?.type === type
                })
        }
    }

    isColumn(item){
        if([0,3,6].includes(item.slot)) {
            return this.pull.filter(elem => [0,3,6].includes(elem.slot)).every(elem=>{
                return elem.name !== 'empty' && elem.class === item.class
            })
        }
        if([1,4,7].includes(item.slot)) {
            return this.pull.filter(elem => [1,4,7].includes(elem.slot)).every(elem=>{
                return elem.name !== 'empty' && elem.class === item.class
            })
        }
        if([2,5,8].includes(item.slot)) {
            return this.pull.filter(elem => [2,5,8].includes(elem.slot)).every(elem=>{
                return elem.name !== 'empty' && elem.class === item.class
            })
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

                    if(clicked.slot < 9 && exchanged_item.slot >= 9){

                        this.pull[exchanged_item.slot] = clicked
                        this.pull[clicked.slot] = exchanged_item.slot

                        this.unequipItem(clicked)
                        clicked.slot = exchanged_item.slot

                        exchanged_item.slot = temp_slot
                        this.equipItem(exchanged_item)
                    }
                    if(clicked.slot >= 9 && exchanged_item.slot < 9) {

                        this.pull[exchanged_item.slot] = clicked
                        this.pull[clicked.slot] = exchanged_item

                        clicked.slot = exchanged_item.slot
                        this.equipItem(clicked)
                        this.unequipItem(exchanged_item)
                        exchanged_item.slot = temp_slot

                    }
                    else {
                        this.pull[clicked.slot] = exchanged_item
                        this.pull[exchanged_item.slot] = clicked
                        clicked.slot = exchanged_item.slot
                        exchanged_item.slot = temp_slot
                    }
                }
                // если 1 предмет
                else{
                    if(slot < 9){
                        this.pull[slot] = clicked
                        this.pull[clicked.slot] = this.getCell(clicked.slot)
                        clicked.slot = slot
                        this.equipItem(clicked)
                    }
                    else if(slot >= 9 && clicked.slot < 9){
                        this.pull[clicked.slot] = this.getCell(clicked.slot)
                        this.pull[slot] = clicked
                        this.unequipItem(clicked)
                        clicked.slot = slot
                    }
                    else {
                        this.pull[slot] = clicked
                        this.pull[clicked.slot] = this.getCell(clicked.slot)
                        clicked.slot = slot
                    }
                }
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