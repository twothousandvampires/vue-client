import Weapon from "../Items/Weapon";
import Armour from "../Items/Armour";

export default class Inventory{
    constructor(items,player) {
        console.log(items)
        this.equip = {
            0 : 'empty',
            1 : 'empty',
            2 : 'empty',
            3 : 'empty',
            4 : 'empty',
            5 : 'empty',
            6 : 'empty',
        }
        this.pull = []
        this.belt = []
        items.forEach(elem =>{
            switch (elem.slot_type){
                case 'inv':
                    this.pull[elem.slot] = this.createItem(elem)
                    break;
                case 'equip':
                    this.equip[elem.slot] = this.createItem(elem)
                    this.equip[elem.slot].equip(player)
                    break;
            }
        })
        for(let i = 0; i < 20; i++){
            if(!this.pull[i]){
                this.pull[i] = 'empty'
            }
        }
        console.log(this)
    }

    getDiscription(slot){
       return  this.pull[slot].getDiscription()
    }

    createItem(template){
        let item;
        switch (template.type){
            case 'weapon':
                item = new Weapon(template)
                break;
            case 'armour':
                item = new Armour(template)
                break;
        }
        return item;
    }

    change(clicked, slot, slot_type, player){
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
                        which.unequip(player)
                        this.equip[which.slot] = 'empty'
                    }
                    else {
                        this.pull[which.slot] = 'empty'
                    }

                    // если новый слот эквип
                    if(one.slot_type === 'equip'){
                        one.equip(player)
                        this.equip[one.slot] = one
                    }
                    else {
                        this.pull[one.slot] = one
                    }
                }
                else {
                    let two = new Weapon(response.data.data['for_what'])

                    if(which.slot_type === 'equip') {
                        which.unequip(player)
                    }
                    if(for_what.slot_type === 'equip') {
                        for_what.unequip(player)
                    }

                    if(two.slot_type === 'equip'){
                        two.equip(player)
                        this.equip[two.slot] = two
                    }
                    else {
                        this.pull[two.slot] = two
                    }

                    if(one.slot_type === 'equip'){
                        one.equip(player)
                        this.equip[one.slot] = one
                    }
                    else {
                        this.pull[one.slot] = one
                    }
                }
            }
        })
    }
}