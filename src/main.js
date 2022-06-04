import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue} from 'bootstrap-vue';
import VueRouter from 'vue-router'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.config.productionTip = false
import routes from './routes';

import vuex from 'vuex'
Vue.use(vuex)
import opDate from './store/opDate'
import acct from './store/acct'
import acctPos from './store/acctPos'
import operations from './store/operations'

const store = new vuex.Store({
    modules:{
        opDate: opDate,
        acctPos: acctPos,
        acct: acct,
        operations:operations
    }
})

const router = new VueRouter(
    {
      mode:'history',
      base:process.env.BASE_URL,
      routes
    });

new Vue({
    router,
    store,
    async created(){
        const respAcct = await fetch("acct.json")
        const accts = await respAcct.json()
        await store.commit("acct/setAccts", accts)

        const respAcctPos = await fetch("acctPos.json")
        const acctsPos = await respAcctPos.json()
        await store.commit("acctPos/setAcctPos", acctsPos)

        const respOpDate = await fetch("opDate.json")
        const opDate = await respOpDate.json()
        await store.commit("opDate/setOpDates", opDate)

        const respOperations = await fetch("operations.json")
        const operations = await respOperations.json()
        await store.commit("operations/setOperations", operations)
    },
    render: h => h(App)
}).$mount('#app')
