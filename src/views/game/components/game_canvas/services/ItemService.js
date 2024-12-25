import Config from "../../../../../../config.js";
const URL = Config.app_url
const TOKEN = localStorage.getItem('token') ? localStorage.getItem('token') : ''
export default {
    createItem(item_name, skill_name){
        return axios({method: 'post',
            url : URL + 'item/create/',
            data : {
                char_id : localStorage.getItem('char_id'),
                item_name: item_name,
                skill_name
            },
            headers : {
                'Authorization': 'Bearer ' + TOKEN,
            }
        })
    },
    createShard(){
        return axios({method: 'post',
            url : URL + 'item/create_shard/',
            data : {
                char_id : localStorage.getItem('char_id'),
            },
            headers : {
                'Authorization': 'Bearer ' + TOKEN,
            }
        })
    },
    createItem2(){
        return axios({method: 'post',
            url : URL + 'item/create_from_inventory/',
            data : {
                char_id : localStorage.getItem('char_id'),
            },
            headers : {
                'Authorization': 'Bearer ' + TOKEN,
            }
        })
    },
    getItemList(){
        return axios({method:'get', url : URL +'item',
            headers: {
                'Authorization': 'Bearer ' + TOKEN,
            }
        })
    },
    deleteAllItems(char_id){
        return axios({method: 'delete',
            url : URL + 'item/delete_all/',
            data : {
                char_id : char_id
            },
            headers : {
                'Authorization': 'Bearer ' + TOKEN,
            }
        })
    }
}