import Weapon from "../Items/Weapon";

export default class Inventory{
    constructor(items,player) {
        this.equip = {

        }
        this.pull = []
        this.belt = []
        items.forEach(elem =>{
            this.pull[elem.inv_slot - 1] = this.createItem(elem,player)
        })
        for(let i = 0; i < 20; i++){
            if(!this.pull[i]){
                this.pull[i] = 'empty'
            }
        }
    }

    getDiscription(slot){
       return  this.pull[slot - 1].getDiscription()
    }

    createItem(template, player){
        let item;
        switch (template.type){
            case 'weapon':
                item = new Weapon(template,player)
                break;
            case 'armour':
                // item = new Armour(template)
                break;
        }
        return item;
    }
}