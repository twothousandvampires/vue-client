export default {

    URL: 'http://89.111.155.67/backend/public/api/',

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