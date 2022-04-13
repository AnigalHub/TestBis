import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () =>({
OpEntry: [
    {
        AcctNumCr: "10201810000000010019",
        AcctNumDB: "47441810000200000020",
        Amount: 10.0,
        OpDate: "2019-07-12"
    },
    {
        AcctNumCr: "47441810000200000020",
        AcctNumDB: "47443810000200000023",
        Amount: 100.0,
        OpDate: "2019-07-12"
    },
    {
        AcctNumCr: "47443810000200000023",
        AcctNumDB: "10201810000000010019",
        Amount: 300.0,
        OpDate: "2019-07-12"
    },
    {
        AcctNumCr: "10201810000000010019",
        AcctNumDB: "47441810000200000020",
        Amount: 20.0,
        OpDate: "2019-07-15"
    },
    {
        AcctNumCr: "47441810000200000020",
        AcctNumDB: "47443810000200000023",
        Amount: 400.0,
        OpDate: "2019-07-15"
    },
    {
        AcctNumCr: "47443810000200000023",
        AcctNumDB: "10201810000000010019",
        Amount: 700.0,
        OpDate: "2019-07-15"
    },
    {
        AcctNumCr: "10201810000000010019",
        AcctNumDB: "47441810000200000020",
        Amount: 40.0,
        OpDate: "2019-07-16"
    },
    {
        AcctNumCr: "47441810000200000020",
        AcctNumDB: "47443810000200000023",
        Amount: 4.0,
        OpDate: "2019-07-16"
    },
    {
        AcctNumCr: "47443810000200000023",
        AcctNumDB: "10201810000000010019",
        Amount: 70.0,
        OpDate: "2019-07-16"
    }
]})

const getters = {
    OpEntry: (state) => {
        return state.OpEntry
    },
}
const mutations ={

}
const actions = {
    filterByAccountAndDate(context,payload){
        let arrayCopy = []
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
    }
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}