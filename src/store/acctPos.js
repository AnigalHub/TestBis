import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () =>({
    AcctPos: null
})

const getters = {
    AcctPos: (state) => {
        return state.AcctPos
    },
}
const mutations ={
    setAcctPos: (state, payload) => {
        state.AcctPos = payload.AcctPos
    }
}
const actions = {
    filterByDateAndAccount(context,payload){
        let arrayCopy = []
        for (let i in context.state.AcctPos){
            if (payload.OpDate === context.state.AcctPos[i].OpDate && (context.state.AcctPos[i].AcctNum === payload.AcctNumCr || context.state.AcctPos[i].AcctNum === payload.AcctNumDB)){
                arrayCopy.push(context.state.AcctPos[i])
            }
        }
        return arrayCopy
    },
    setAccount(context,payload){
        if(payload.old){
            const res = context.state.AcctPos.filter(x=>x.AcctNum === payload.old.AcctNum && x.OpDate === payload.old.OpDate && x.Balance === payload.old.Balance)
            if(res.length > 0){
                res[0].Balance = payload.new.Balance
            }
            return
        }
        const data = JSON.parse(JSON.stringify(payload.new))
        context.state.AcctPos.push(data)
    },
    deleteAccount(context,payload){
        let index = context.state.AcctPos.filter(x => x.AcctNum !== payload.AcctNum)
        context.state.AcctPos = index
    }
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}