import { defineStore } from 'pinia'

const URL = 'http://127.0.0.1:8000/api/'

export const useGameConfigStore = defineStore(
    'game_config',
    {
        state() {
            return{
                game_tick: 40,
                token: localStorage.getItem('token')
            }
        },
        getters: {
            getGameTick: (state) => state.game_tick
        },
        actions: {
            async changeGameTick(value) {
               this.game_tick = value
            },
        }
    })