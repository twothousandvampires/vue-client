import ItemCreator from "../Scr/factories/ItemFactory";
import EmptyInventoryCell from "./cell/EmptyInventoryCell";
import EmptyWeaponCell from "./cell/EmptyWeaponCell";
import EmptyArmourCell from "./cell/EmptyArmourCell";
import EmptyAccessoryCell from "./cell/EmptyAccessoryCell";
import EmptyBeltCell from "./cell/EmptyBeltCell";
import EmptyGemCell from "./cell/EmptyGemCell";

export default class Inventory{

    static CELL_TYPE_INVENTORY = 1
    static CELL_TYPE_GEM = 2
    static CELL_TYPE_BELT = 3
    static CELL_TYPE_WEAPON = 4
    static CELL_TYPE_ARMOUR = 5
    static CELL_TYPE_ACCESSORY = 6

    static ITEM_TYPE_EQUIP = 1
    static ITEM_TYPE_GEM = 2
    static ITEM_TYPE_USED = 3

    constructor(player) {

        this.player = player
        this.pull = []
        this.is_combat_row = false
        this.is_sorcery_row = false
        this.is_movement_row = false
        this.is_weapon_column = false
        this.is_armour_column = false
        this.is_accessory_column = false
        this.checkRow()
        this.checkColumn()
    }

    clear(){
        for(let i = 9; i <= 32; i++){
            this.pull[i] = this.createCell(i)
        }
    }

    checkRow(){
        let combat_row = this.pull.filter(elem => { return  [0,1,2].includes(elem.slot) && elem.increased_by_row})
        let sorcery_row = this.pull.filter(elem => { return [3,4,5].includes(elem.slot) && elem.increased_by_row})
        let movement_row = this.pull.filter(elem => { return [6,7,8].includes(elem.slot) && elem.increased_by_row})

        this.is_combat_row = combat_row.length === 3
        this.is_sorcery_row = sorcery_row.length === 3
        this.is_movement_row = movement_row.length === 3
    }

    checkColumn(){
        let weapon_row = this.pull.filter(elem => {
            return [0,3,6].includes(elem.slot) && elem.increased_by_column
        })
        let armour_row = this.pull.filter(elem => {
            return [1,4,7].includes(elem.slot) && elem.increased_by_column
        })
        let accessory_row = this.pull.filter(elem => {
            return [2,5,8].includes(elem.slot) && elem.increased_by_column
        })

        this.is_weapon_column = weapon_row.length === 3
        this.is_armour_column = armour_row.length === 3
        this.is_accessory_column = accessory_row.length === 3
    }

    equipItem(item){
        if(item.item_type === Inventory.ITEM_TYPE_EQUIP && item.slot < 9 ){
            item.equip(this.player)
        }
        else if(item.item_type === Inventory.ITEM_TYPE_GEM && item.slot < 35 && item.slot > 28){
            item.equip(this.player)
        }
    }

    unequipItem(item ,check = false){
        if(item.item_type === Inventory.ITEM_TYPE_EQUIP && item.slot < 9){
            item.unequip(this.player)
        }
        else if(item.item_type === Inventory.ITEM_TYPE_GEM && item.slot < 35 && item.slot > 28){
            item.unequip(this.player)
        }
    }

    createCell(cell_id){
        let cell_type = this.getCellType(cell_id)
        if(cell_type === Inventory.CELL_TYPE_INVENTORY){
            return new EmptyInventoryCell(cell_id)
        }
        else if(cell_type === Inventory.CELL_TYPE_WEAPON){
            return new EmptyWeaponCell(cell_id)
        }
        else if(cell_type === Inventory.CELL_TYPE_ARMOUR){
            return new EmptyArmourCell(cell_id)
        }
        else if(cell_type === Inventory.CELL_TYPE_ACCESSORY){
            return new EmptyAccessoryCell(cell_id)
        }
        else if(cell_type === Inventory.CELL_TYPE_BELT){
            return new EmptyBeltCell(cell_id)
        }
        else if(cell_type === Inventory.CELL_TYPE_GEM){
            return new EmptyGemCell(cell_id)
        }
    }
    getCellType(cell_id){
        if([0,3,6].includes(cell_id)){
            return Inventory.CELL_TYPE_WEAPON
        }
        else if([1,4,7].includes(cell_id)){
            return Inventory.CELL_TYPE_ARMOUR
        }
        else if([2,5,8].includes(cell_id)){
            return Inventory.CELL_TYPE_ACCESSORY
        }
        else if(cell_id >= 9 && cell_id < 33){
            return Inventory.CELL_TYPE_INVENTORY
        }
    }
    createItem(template){
        return ItemCreator.createItem(template, this.player)
    }

    async change(clicked, slot) {
        let ApiResponse = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/item/change/' + this.player.id,
            data: {
                from: clicked.slot,
                to: slot,
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        if (ApiResponse.data.success) {
            this.player.parseStats(ApiResponse.data.data.data)
            this.update(ApiResponse.data.data.data.items)
            this.checkRow()
            this.checkColumn()
        }
    }
    update(items){
        this.pull.forEach(elem => {
            this.unequipItem(elem)
        })
        this.pull = []
        for(let i = 0; i <= 32; i++){
            this.pull[i] = this.createCell(i)
        }
        items.forEach(elem =>{
            let item = this.createItem(elem, this.player)
            this.pull[item.slot] = item
            this.equipItem(item)
        })
    }
    deleteFromPull(item){
        this.pull[item.slot] = this.createCell(item.slot)
    }
    async deleteItem(item){
        let ApiResponse = await axios({
            method: 'post',
            url: '//127.0.0.1:8000/api/item/delete/',
            data : {
                id : item.id,
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        if(ApiResponse.data.success){
            this.pull[item.slot] = this.createCell(item.slot)
        }
    }
}