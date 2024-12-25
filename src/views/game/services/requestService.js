import Config from "../../../../config.js";

export default {

    URL: Config.app_url,
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
    async setStarted(player_id){
        return axios({
            method: 'post',
            url: this.URL + 'character/set_started/' + player_id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    },
    async upgradeItemQuality(player_id, option_id, used_id){
        let data = await axios({
            method: 'post',
            url: this.URL + 'item/upgrade_quality/' + player_id + '/' + option_id + '/' + used_id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data
    },
    async addPropertyOnItem(player_id, option_id, used_id, type){
        let data = await axios({
            method: 'post',
            url: this.URL + 'item/add_property/' + player_id + '/' + option_id + '/' + used_id,
            data :{
                prop_type: type
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data

    },
    async upgradeItemEffect(player_id, option_id, used_id){
        let data = await axios({
            method: 'post',
            url: this.URL + 'item/upgrade_effect/' + player_id + '/' + option_id + '/' + used_id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data
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
    },

    async serverRequest(action, request_data){
        
        let data = await axios({method: 'post',
            url: this.URL + action,
            data: request_data,
            headers: {
                'Authorization': 'Bearer ' + this.TOKEN
            },
        })

        return data.data
    },

    async torch(char_id){
        

        // let data = await axios({method: 'post',
        //     url: this.URL + 'character/torch/' + char_id,
        //     headers: {
        //         'Authorization': 'Bearer ' + this.TOKEN
        //     },
        // })

        // return data.data
    },
    async rest(char_id, amount){
        let data = await axios({method: 'post',
            url: this.URL + 'character/' + char_id + '/rest/' + amount,
            headers: {
                'Authorization': 'Bearer ' + this.TOKEN
            },
        })

        return data.data
    },
    async useItems(ids, player){
        
        let data = await axios({
            method: 'post',
            url: this.URL + 'item/use_items/' + player.id,
            data : {
                data: ids
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data
    },

    async unlockPassives(id){
         let data = await axios({
            method: 'post',
            url: this.URL + 'character/get_passives/' + id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        return data.data
    },

    async learnPassive(player_id, id){
        let data = await axios({
            method: 'post',
            url: this.URL + 'character/learn_passive/' + player_id + '/' + id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data.data
    },
    async upgradePassive(player_id, passive_id){
        let data = await axios({
            method: 'post',
            url: this.URL + 'character/upgrade_passive/' + player_id + '/' + passive_id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data
    },

    async getSkillsForLearning(player_id, item_id){
        let data = await axios({
            method: 'post',
            url: this.URL + 'skill/get_skills/' + player_id + '/' + item_id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data
    },

    async learnSkill(player_id, used_id, skill_id){
        let data = await axios({
            method: 'post',
            url: this.URL + 'skill/learn_skill/' + player_id + '/' + used_id,
            data: {
                skill_id: skill_id
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        return data.data
    },

     async upgradeSkill(player_id, used_id, skill_id){
         let data = await axios({
             method: 'post',
             url: this.URL + 'skill/upgrade_skill/' + player_id + '/' + used_id,
             data: {
                 skill_id: skill_id
             },
             headers: {
                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
             }
         });

         return data.data
     }
}