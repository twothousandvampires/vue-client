export default class Request{

    static URL = 'http://127.0.0.1:8000/api/'

    static TOKEN = localStorage.getItem('token') ? localStorage.getItem('token') : ''

    static deleteCharacter(id){
       return  axios({method: 'post',
           url : Request.URL + 'character/' + id + '/delete',
           headers : {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static getCharacter(){
        let char_id = localStorage.getItem('char_id')
        return axios({method: 'get', url: Request.URL + 'character/get/'+ char_id, headers: {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static torch(){
        let char_id = localStorage.getItem('char_id')
        return axios({method: 'get', url: Request.URL + 'character/torch/'+ char_id, headers: {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static createCharacter(name){
        return axios({method: 'post', url: Request.URL + 'character/create/', headers: {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }, data : {
                name : name,
            }
        })
    }

    static getItemList(){
        return axios({method:'get', url : Request.URL +'item',
            headers: {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static getUser(){
        return axios({method:'post', url : Request.URL +'user/',
            headers: {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static registration(name, email, pass, c_pass){
        return axios({method:'post', url : Request.URL + 'register', data: {
                name : name,
                email : email,
                password : pass,
                c_password : c_pass
            }})
    }

    static login(email, pass){
        return  axios({method:'post', url : Request.URL + 'login',data:{
                    email : email,
                    password : pass
                }})
    }

    static logout(){
        return  axios({method: 'post', url: Request.URL + 'logout', headers: {
                    'Authorization': 'Bearer ' + Request.TOKEN,
                }})
    }

    static move(x, y, char_id){
        return axios({method: 'post',
            url: Request.URL + 'character/' + char_id +'/move/',
            headers: {
                'Authorization': 'Bearer ' + Request.TOKEN
            },
            data :{
                x : x,
                y : y,
            }
        })
    }

    static world(char_id){
        return axios({method: 'post',
            url : Request.URL + 'character/' + char_id + '/world',
            headers : {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static deleteAllItems(char_id){
        return axios({method: 'delete',
            url : Request.URL + 'item/delete_all/',
            data : {
                char_id : char_id
            },
            headers : {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }


    static win(char_id){
        return axios({method: 'post',
            url : Request.URL + 'character/win/',
            data : {
                user_id : localStorage.getItem('user_id'),
                char_id : char_id
            },
            headers : {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static createItem(item_name){
        return axios({method: 'post',
            url : Request.URL + 'item/create/',
            data : {
                char_id : localStorage.getItem('char_id'),
                item_name: item_name
            },
            headers : {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }

    static useBook(id, option){
        return axios({method: 'post',
            url : Request.URL + 'item/use/' + id,
            headers : {
                'Authorization': 'Bearer ' + Request.TOKEN,
            },
            data : {
                option : option ? option : false,
            }
        })
    }

    static deleteItem(id){
        return axios({method: 'post',
            url : Request.URL + 'item/delete/',
            data : {
                id : id,
            },
            headers : {
                'Authorization': 'Bearer ' + Request.TOKEN,
            }
        })
    }
}