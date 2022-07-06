
import Item from "../Items/Item";
export default class Inventory{

    constructor(items,player) {
        console.log(items)
        this.player = player
        this.pull = []
        for(let i = 0; i < 30; i++){
            this.pull[i] = this.getCell(i)
        }
        items.forEach(elem =>{
            this.pull[elem.slot] = this.createItem(elem)
        })

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

    initItems(){
        for(let i = 0; i < 9; i ++){
            if(this.pull[i].name !== 'empty'){
                this.pull[i].equip(this.player)
            }
        }
        this.player.createStats()
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

                        clicked.unequip(this.player)
                        exchanged_item.equip(this.player)

                        this.pull[exchanged_item.slot] = clicked
                        this.pull[clicked.slot] = exchanged_item.slot

                        clicked.slot = exchanged_item.slot
                        exchanged_item.slot = temp_slot
                    }
                    if(clicked.slot >= 9 && exchanged_item.slot < 9) {

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
                    if(slot < 9){
                        clicked.equip(this.player)
                        this.pull[slot] = clicked
                        this.pull[clicked.slot] = this.getCell(clicked.slot)
                        clicked.slot = slot
                    }
                    else if(slot >= 9 && clicked.slot < 9){

                        clicked.unequip(this.player)

                        this.pull[clicked.slot] = this.getCell(clicked.slot)
                        this.pull[slot] = clicked

                        clicked.slot = slot
                    }
                    else {
                        this.pull[slot] = clicked
                        this.pull[clicked.slot] = this.getCell(clicke.slot)
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