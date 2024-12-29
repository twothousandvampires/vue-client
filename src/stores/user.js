import { defineStore } from 'pinia'

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
            setUser(user){
                this.user = user
            },
            async deleteCharacter(char_id){
                this.user.characters = this.user.characters.filter(elem => {return elem.id != char_id})
            },
            addChar(char){
                this.user.characters.push(char)
            }
        }
})