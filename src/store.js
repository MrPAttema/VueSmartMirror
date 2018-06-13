import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        weather: {},
        usersPeople: {},
        presencePusher: null,
        privatePusher: null,
        allUsersChannel: null,
        privateChannel: null,
        onlineMembers: []
    },
    getters: {
        getWeatherData() {
            return state.weather
        }
    },
    mutations: {
        
    },
    actions: {
        addToken ({commit}, payload) {
        localStorage.setItem('carenvideo-token', payload.token)
        commit('ADD_TOKEN', payload)
        },

        addCurrentUser({commit}, payload) {
        commit('ADD_CURRENT_USER', {
            user: payload.currentUser
        })
        },

        addPeople ({commit}, payload) {
        commit('ADD_CURRENT_USER', {
            user: payload.currentUser
        })

        commit('ADD_USERS_PEOPLE', {
            people: payload.people
        })
        },

        initPresencePusher ({commit}, payload) {
        commit('INIT_PRESENCE_PUSHER', payload)
        },

        initPrivatePusher ({commit}, payload) {
        commit('INIT_PRIVATE_PUSHER', payload)
        },

        initAllUsersChannel ({commit}, payload) {
        commit('INIT_ALL_USERS_CHANNEL', payload)
        },

        initPrivateChannel ({commit}, payload) {
        commit('INIT_PRIVATE_CHANNEL', payload)
        },

        addOnlineMember ({commit}, payload) {
        commit('ADD_ONLINE_MEMBER', payload)
        },

        removeOnlineMember ({commit}, payload) {
        commit('REMOVE_ONLINE_MEMBER', payload)
        }
    }
})
