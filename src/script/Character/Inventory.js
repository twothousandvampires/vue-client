import Weapon from "../Items/Weapon/Weapon";
import Armour from "../Items/Armour/Armour";
import Used from "../Items/Used/Used";
export default class Inventory{

    constructor(items,player) {
        this.player = player
        this.pull = []
        for(let i = 0; i < 30; i++){
            this.pull[i] = {
                slot : i,
                name : 'empty'
            }
        }
        items.forEach(elem =>{
            this.pull[elem.slot] = this.createItem(elem)
        })
    }

    initItems(){

        for(let i = 0; i < 10; i ++){
            if(this.pull[i].name !== 'empty'){
                this.pull[i].equip(this.player)
            }
        }
        this.player.createStats()
    }

    getEquipSlot(slot){
        switch (slot){
            case 0:
                return 'head'
            case 1:
                return 'weapon'
            case 2:
                return 'shield'
            case 3:
                return 'body'
            case 4:
                return 'gloves'
            case 5:
                return 'belt'
            case 6:
                return 'boots'
            case 7:
                return 'left ring'
            case 8:
                return 'right ring'
            case 9:
                return 'amulet'
        }
    }

    equipToSlot(equip){
        switch (equip){
            case 'head':
                return 0
            case 'weapon':
                return 1
            case 'shield':
                return 2
            case 'body':
                return 3
            case 'gloves':
                return 4
            case 'belt':
                return 5
            case 'boots':
                return 6
            case 'left ring':
                return 7
            case 'right ring':
                return 8
            case 'amulet':
                return 9
        }
    }

    weaponIsEquip(){

        return this.pull[1].name !== 'empty'

    }

    getWeapon(){
        if(this.weaponIsEquip()){
            return this.pull[1]
        }
        return false
    }

    getDiscription(slot){
       return  this.pull[slot].discription
    }

    createItem(template){
        switch (template.item_type){
            case 'weapon':
                return new Weapon(template, JSON.parse(template.item_body))
            case 'armour':
                return new Armour(template, JSON.parse(template.item_body))
            case 'used':
                return new Used(template)
        }
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

                    if(clicked.slot < 10 && exchanged_item.slot >= 10){

                        clicked.unequip(this.player)
                        exchanged_item.equip(this.player)

                        this.pull[exchanged_item.slot] = clicked
                        this.pull[clicked.slot] = exchanged_item.slot

                        clicked.slot = exchanged_item.slot

                        exchanged_item.slot = temp_slot
                    }
                    if(clicked.slot >= 10 && exchanged_item.slot < 10) {

                        clicked.equip(this.player)
                        exchanged_item.unequip(this.player)

                        this.pull[exchanged_item.slot] = clicked
                        this.pull[clicked.slot] = exchanged_item

                        clicked.slot = exchanged_item.slot

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
                    if(slot < 10){
                        clicked.equip(this.player)
                        this.pull[slot] = clicked
                        this.pull[clicked.slot] = {
                            slot : clicked.slot,
                            name : 'empty'
                        }
                        clicked.slot = slot
                    }
                    else if(slot >= 10 && clicked.slot < 10){

                        clicked.unequip(this.player)

                        this.pull[clicked.slot] = {
                            slot : clicked.slot,
                            name : 'empty'
                        }
                        this.pull[slot] = clicked

                        clicked.slot = slot
                    }
                    else {
                        this.pull[slot] = clicked
                        this.pull[clicked.slot] = {
                            slot : clicked.slot,
                            name : 'empty'
                        }
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