import { defineStore } from 'pinia'

const URL = 'http://127.0.0.1:8000/api/'
const TOKEN = localStorage.getItem('token') ? localStorage.getItem('token') : ''



export const useUserStore = defineStore(
    'user',
    {
        state() {
            return{
                user: {},
                token: localStorage.getItem('token')
            }
        },
        getters: {
            getUSer: (state) => state.user
        },
        actions: {
            async fetchUser() {
                try {
                    const data = await axios({method:'post', url : URL +'user/',
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    })

                    this.user = data.data.data
                }
                catch (error) {
                }
            },

            async deleteCharacter(char_id){
                const data = await axios({method: 'post',
                    url : URL + 'character/' + char_id + '/delete',
                    headers : {
                        'Authorization': 'Bearer ' + this.token,
                    }
                })

                this.user.characters = this.user.characters.filter(elem => {return elem.id != char_id})
            },

            async createCharacter(name){
                return axios({method: 'post', url: URL + 'character/create/', headers: {
                        'Authorization': 'Bearer ' + this.token,
                    }, data : {
                        name : name,
                    }
                })
            }
        }
})