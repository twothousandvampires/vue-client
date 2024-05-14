export default {

    URL: 'http://127.0.0.1:8000/api/',

    TOKEN: localStorage.getItem('token') ? localStorage.getItem('token') : '',

     login(email, pass) {
        return  axios({method:'post', url : this.URL + 'login',data: {
                email : email,
                password : pass
        }})
    },

    logout(){
        return  axios({method: 'post', url: this.URL + 'logout', headers: {
                'Authorization': 'Bearer ' + this.TOKEN,
        }})
    },

    registration(name, email, pass, c_pass){

        return axios({method:'post', url : this.URL + 'register', data: {
                name : name,
                email : email,
                password : pass,
                c_password : c_pass
        }
    })
}

}