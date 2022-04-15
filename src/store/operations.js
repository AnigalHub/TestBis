import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () =>({
    OpEntry:null,
})

const getters = {
    OpEntry: (state) => {
        return state.OpEntry
    },
}
const mutations ={
    setOperations: (state, payload) => {
        state.OpEntry = payload.OpEntry
    }
}
const actions = {
    filterByAccountAndDate(context,payload){
        let arrayCopy = []
        console.log(payload)
        for(let i in context.state.OpEntry){
            if((payload.account === context.state.OpEntry[i].AcctNumCr || payload.account === context.state.OpEntry[i].AcctNumDB)
                && (payload.date === context.state.OpEntry[i].OpDate)){
                arrayCopy.push(context.state.OpEntry[i])
            }
        }
        return arrayCopy
    },
    filterByDate(context,payload){
        let arrayCopy = []
        for(let i in context.state.OpEntry){
            arrayCopy = context.state.OpEntry.filter(x=>x.OpDate == payload.OpDate)
        }
        return arrayCopy
    },
    setOperations(context,payload){
        if(payload.old){
            const res = context.state.OpEntry.filter(x=>x.AcctNumCr === payload.old.AcctNumCr
                && x.AcctNumDB === payload.old.AcctNumDB && x.Amount === payload.old.Amount && x.OpDate === payload.old.OpDate)
            if(res.length > 0){
                res[0].Amount = payload.new.Amount
            }
            return
        }
        const data = JSON.parse(JSON.stringify(payload.new))
        context.state.OpEntry.push(data)

    },
    deleteOperation(context,payload){
        console.log(context.state.OpEntry.length)
        let index = context.state.OpEntry.filter(x => x.AcctNumCr === payload.AcctNumCr &&
            x.AcctNumDB === payload.AcctNumDB && x.Amount === payload.Amount && x.OpDate === payload.OpDate)
        context.state.OpEntry.splice(context.state.OpEntry.indexOf(index[0]),1)

    }
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}