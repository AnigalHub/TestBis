import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () =>({
OpDate: [
    {OpDate: "2019-07-12"},
    {OpDate: "2019-07-15"},
    {OpDate: "2019-07-16"}
]
})
const getters = {
    OpDates: (state) => {
        return state.OpDate
    },
    LastOpDate:(state) =>{
        if(state.OpDate.length > 0)
            return state.OpDate[state.OpDate.length-1].OpDate
        else return null
    }
}
const mutations ={

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