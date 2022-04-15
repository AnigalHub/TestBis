import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () =>({
    Acct: null
})

const getters = {
    Acct: (state) => {
        return state.Acct
    },
}
const mutations ={
    setAccts: (state, payload) => {
        state.Acct = payload.Acct
    }
}
const actions = {

}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}