export default {

    URL: 'http://127.0.0.1:8000/api/',
    TOKEN: localStorage.getItem('token') ? localStorage.getItem('token') : '',

    getCharacter(){
        let char_id = localStorage.getItem('char_id')
        return axios({method: 'get', url: this.URL + 'character/get/'+ char_id, headers: {
                'Authorization': 'Bearer ' + this.TOKEN,
            }
        })
    },
    world(char_id){
        return axios({method: 'post',
            url : this.URL + 'character/' + char_id + '/world',
            headers : {
                'Authorization': 'Bearer ' + this.TOKEN,
            }
        })
    },
    move(x, y, char_id){
        return axios({method: 'post',
            url: this.URL + 'character/' + char_id +'/move/',
            headers: {
                'Authorization': 'Bearer ' + this.TOKEN
            },
            data :{
                x : x,
                y : y,
            }
        })
    }
}