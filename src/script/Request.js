export default class Request{

    static url = '//127.0.0.1:8000/api/'

    static move(x, y, char_id){
        return axios({method: 'post',
            url: Request.url + 'character/move/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data :{
                x : x,
                y : y,
                user_id : localStorage.getItem('user_id'),
                char_id : char_id
            }
        })
    }

    static world(char_id){
        return axios({method: 'post',
            url : Request.url + 'character/world/',
            data : {
                user_id : localStorage.getItem('user_id'),
                char_id : char_id
            },
            headers : {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
    }
}