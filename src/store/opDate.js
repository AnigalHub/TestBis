import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () =>({
    OpDate: null,
})
const getters = {
    OpDates: (state) => {
        return state.OpDate
    },
    LastOpDate:(state) =>{
        if(state.OpDate && state.OpDate.length > 0)
            return state.OpDate[state.OpDate.length-1].OpDate
        else return null
    }
}
const mutations ={
    setOpDates: (state, payload) => {
        state.OpDate = payload.OpDate
    }
}
const actions = {
    setOpDate(context,payload){
        const data = JSON.parse(JSON.stringify(payload))
        context.state.OpDate.push(data)
    },
    deleteOpDate(context,payload){
        let index = context.state.OpDate.filter(x => x.OpDate !== payload.OpDate)
        context.state.OpDate = index
    }
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}