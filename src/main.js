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
import operations from './store/operations'

const store = new vuex.Store({
    modules:{
        opDate: opDate,
        acct: acct,
        operations:operations
    }
})

const router = new VueRouter(
    {
      mode:'history',
      routes
    });

new Vue({
    router,
    store,
    async created(){
        const respAcct = await fetch("acct.json")
        const accts = await respAcct.json()
        await store.commit("acct/setAccts", accts)
        const respOpDate = await fetch("opDate.json")
        const opDate = await respOpDate.json()
        await store.commit("opDate/setOpDates", opDate)
    },
    render: h => h(App)
}).$mount('#app')
