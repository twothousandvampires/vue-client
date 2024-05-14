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
            getLog: (state) => state.log
        },
        actions: {
            addLog(txt) {
                let now = new Date()
                let time = now.getHours() + ':' + (now.getMinutes() + '').padStart(2, '0')
                this.log.push(time + ' ' +txt)
            }
        }
    })