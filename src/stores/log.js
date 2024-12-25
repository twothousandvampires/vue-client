import {defineStore} from 'pinia'

export const useLogStore = defineStore(
    'log',
    {
        state() {
            return {
                log: [],
            }
        },
        getters: {
            getLog: (state) => {
                return  state.log
            },
        },
        actions: {
            addLog(txt) {
                if(!txt) return
                let now = new Date()
                let time = now.getHours() + ':' + (now.getMinutes() + '').padStart(2, '0')
                this.log.push(time + ' ' + txt)
            }
        }
    })