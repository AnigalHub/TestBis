import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () =>({
AcctPos: [
    {
        AcctNum: "10201810000000010019",
        Balance: 290.0,
        OpDate: "2019-07-12"
    },
    {
        AcctNum: "47441810000200000020",
        Balance: -90.0,
        OpDate: "2019-07-12"
    },
    {
        AcctNum: "47443810000200000023",
        Balance: -200.0,
        OpDate: "2019-07-12"
    },
    {
        AcctNum: "10201810000000010019",
        Balance: 970.0,
        OpDate: "2019-07-15"
    },
    {
        AcctNum: "47441810000200000020",
        Balance: -470.0,
        OpDate: "2019-07-15"
    },
    {
        AcctNum: "47443810000200000023",
        Balance: -500.0,
        OpDate: "2019-07-15"
    },
    {
        AcctNum: "10201810000000010019",
        Balance:1000.0,
        OpDate: "2019-07-16"
    },
    {
        AcctNum: "47441810000200000020",
        Balance: -434.0,
        OpDate: "2019-07-16"
    },
    {
        AcctNum: "47443810000200000023",
        Balance: -116.0,
        OpDate: "2019-07-16"
    }
]})

const getters = {
    AcctPos: (state) => {
        return state.AcctPos
    },
}
const mutations ={

}
const actions = {
    filterAcctPosByDate(context,payload){
        let arrayCopy = []
        for (let i in context.state.AcctPos) {
            if (payload.opDate === context.state.AcctPos[i].OpDate) {
                arrayCopy.push(context.state.AcctPos[i])
            }
        }
        return arrayCopy
    },
    filterByDateAndAccount(context,payload){
        let arrayCopy = []
        for (let i in context.state.AcctPos){
            if (payload.opDate === context.state.AcctPos[i].OpDate && (context.state.AcctPos[i].AcctNum === payload.acctNumCr || context.state.AcctPos[i].AcctNum === payload.acctNumDB)){
                arrayCopy.push(context.state.AcctPos[i])
            }
        }
        return arrayCopy
    },
    addAccount(context,payload){
        context.state.AcctPos.push(payload)
    },
    deleteAccount(context,payload){
        console.log(payload)
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