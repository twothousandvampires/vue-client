const URL = 'http://127.0.0.1:8000/api/'
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
    getItemList(){
        return axios({method:'get', url : URL +'item',
            headers: {
                'Authorization': 'Bearer ' + TOKEN,
            }
        })
    },
    getSpellList(){
        return axios({method:'get', url : URL +'skill/list',
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