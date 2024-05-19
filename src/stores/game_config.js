import { defineStore } from 'pinia'

const URL = 'http://127.0.0.1:8000/api/'

export const useGameConfigStore = defineStore(
    'game_config',
    {
        state() {
            return{
                game_tick: 40,
                token: localStorage.getItem('token'),
                img_src_url: 'http://89.111.155.67/images'
            }
        },
        getters: {
            getGameTick: (state) => state.game_tick,
            getImgUrl: (state) => state.img_src_url
        },
        actions: {
            async changeGameTick(value) {
               this.game_tick = value
            },
        }
    })