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
            switch (elem.slot_type){
                case 'inv':
                    this.pull[elem.slot] = this.createItem(elem)
                    break;
                case 'equip':
                    let slot = this.getEquipSlot(elem.slot)
                    this.equip.set(slot, this.createItem(elem))
                    this.equip.get(slot).equip(player)
                    break;
            }
        })

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
        switch (template.type){
            case 'weapon':
                return new Weapon(template)
            case 'armour':
                return new Armour(template)
            case 'used':
                return new Used(template)
        }
    }

    change(clicked, slot, slot_type){
        let which = clicked
        let for_what = false;

        switch (slot_type) {
            case 'inv':
                for_what = this.pull[slot]
                break;
            case 'equip':
                for_what = this.equip[slot]
                break;
        }

        if('empty' === for_what) { for_what = false}

        axios({method: 'post',
            url : '//127.0.0.1:8000/api/item/change/',
            data : {
                char_id : localStorage.getItem('char_id'),
                which_id : which.id,
                which_type : which.type,
                for_what_id : for_what ? for_what.id : null,
                for_what_type : for_what ? for_what.type : null,
                slot : slot,
                slot_type : slot_type
            },
            headers : {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then(response =>{
            if(response.data.success){
                //если просто переместили
                let one = new Weapon(response.data.data['which'])

                if(!for_what){
                    // если был снят с эквипа
                    if(which.slot_type === 'equip') {
                        this.equip[which.slot] = 'empty'
                        which.unequip(this.player)
                    }
                    else {
                        this.pull[which.slot] = 'empty'
                    }

                    // если новый слот эквип
                    if(one.slot_type === 'equip'){
                        this.equip[one.slot] = one
                        one.equip(this.player)
                    }
                    else {
                        this.pull[one.slot] = one
                    }
                }
                else {
                    let two = new Weapon(response.data.data['for_what'])

                    if(which.slot_type === 'equip') {
                        which.unequip(this.player)
                    }
                    if(for_what.slot_type === 'equip') {
                        for_what.unequip(this.player)
                    }

                    if(two.slot_type === 'equip'){
                        this.equip[two.slot] = two
                        two.equip(this.player)
                    }
                    else {
                        this.pull[two.slot] = two
                    }

                    if(one.slot_type === 'equip'){
                        this.equip[one.slot] = one
                        one.equip(this.player)
                    }
                    else {
                        this.pull[one.slot] = one
                    }
                }
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