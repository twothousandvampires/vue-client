import Weapon from "../Items/Weapon/Weapon";
import Armour from "../Items/Armour/Armour";
import Used from "../Items/Used/Used";
export default class Inventory{

    constructor(items,player) {
        this.player = player
        this.equip = new Map()
        this.pull = []
        this.belt = []
        for(let i = 0; i < 20; i++){
            if(!this.pull[i]){
                this.pull[i] = 'empty'
            }
        }
        for(let i = 0; i < 10;i++){
            this.equip.set(this.getEquipSlot(i), undefined)
        }
        items.forEach(elem =>{
            let item = this.createItem(elem)
        })
    }

    initItems(){
        for(let item in this.equip){
            if(this.equip.get(item)){
                this.equip.get(item).equip(this.player)
            }
        }
        this.player.calcStats()
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
        console.log(this.equip.get('weapon'))
        return this.equip.get('weapon')
    }

    getWeapon(){
        if(this.weaponIsEquip()){
            return this.equip.get('weapon')
        }
        return false
    }

    getDiscription(slot){
       return  this.pull[slot].discription
    }

    createItem(template){
        switch (template.item_type){
            case 'weapon':
                return new Weapon(template)
            case 'armour':
                return new Armour(template)
            case 'used':
                return new Used(template)
        }
    }

    change(clicked, slot, type){

        let changed_item = clicked


        let exchanged_item = false;
        let temp
        switch (type) {
            case 'inv':
                exchanged_item = this.pull[slot]
                break;
            case 'equip':
                exchanged_item = this.equip.get(this.getEquipSlot(slot))
                break;
        }

        if('empty' === exchanged_item) { exchanged_item = false}
        if(!exchanged_item) {exchanged_item = false}

        let change = {
            id : changed_item.id,
            type : changed_item.type
        }
        let exchange = {
            exchange : exchanged_item ? true : false,
            id : exchanged_item ? exchanged_item.id : slot,
            type : exchanged_item ? exchanged_item.type : type
        }

        console.log(change)
        console.log(exchange)

        axios({method: 'post',
            url : '//127.0.0.1:8000/api/item/change/',
            data : {
                changed_item : JSON.stringify(change),
                exchanged_item : JSON.stringify(exchange)
            },
            headers : {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then(response =>{
            if(response.data.success){
                console.log(response)
                // если 2 предмета
                if(exchanged_item){

                    let temp_slot_type = changed_item.slot_type
                    let temp_slot = changed_item.slot

                    if(changed_item.slot_type === 'equip' && exchanged_item.slot_type === 'inv'){

                        changed_item.unequip(this.player)
                        exchanged_item.equip(this.player)

                        this.equip.set(this.getEquipSlot(changed_item.slot), exchanged_item)
                        this.pull[exchanged_item.slot] = changed_item


                        changed_item.slot_type = exchanged_item.slot_type
                        changed_item.slot = exchanged_item.slot

                        exchanged_item.slot = temp_slot
                        exchanged_item.slot_type = temp_slot_type
                    }
                    if(changed_item.slot_type === 'inv' && exchanged_item.slot_type === 'equip') {

                        changed_item.equip(this.player)
                        exchanged_item.unequip(this.player)

                        this.equip.set(this.getEquipSlot(exchanged_item.slot), changed_item)
                        this.pull[changed_item.slot] = exchanged_item


                        changed_item.slot_type = exchanged_item.slot_type
                        changed_item.slot = exchanged_item.slot

                        exchanged_item.slot = temp_slot
                        exchanged_item.slot_type = temp_slot_type

                    }
                    else {
                        this.pull[changed_item.slot] = exchanged_item
                        this.pull[exchanged_item.slot] = changed_item
                        changed_item.slot = exchanged_item.slot
                        exchanged_item.slot = temp_slot
                    }
                }
                // если 1 предмет
                else{
                    if(exchange.type === 'equip'){
                        changed_item.equip(this.player)

                        this.equip.set(this.getEquipSlot(exchange.id), changed_item)
                        this.pull[changed_item.slot] = 'empty'

                        changed_item.slot = exchange.id
                        changed_item.slot_type = exchange.type
                    }
                    else if(exchange.type === 'inv' && changed_item.slot_type === 'equip'){

                        changed_item.unequip(this.player)


                        this.equip.set(this.getEquipSlot(changed_item.slot), undefined)
                        this.pull[exchange.id] = changed_item

                        changed_item.slot = exchange.id
                        changed_item.slot_type = exchange.type
                    }
                    else {
                        this.pull[exchange.id] = changed_item
                        this.pull[changed_item.slot] = 'empty'
                        changed_item.slot = exchange.id
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