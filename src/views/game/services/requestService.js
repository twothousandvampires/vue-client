import Config from "../../../../config.js";

export default {

    URL: Config.app_url,
    TOKEN: localStorage.getItem('token') ? localStorage.getItem('token') : '',

    async serverRequest(action, request_data = {}){

        request_data.char_id = localStorage.getItem('char_id')
        request_data.action = action
        
        let data = await axios({
            method: 'post',
            url: this.URL,
            data: request_data,
            headers: {
                'Authorization': 'Bearer ' + this.TOKEN
            },
        })
       
        return data.data
    },
}