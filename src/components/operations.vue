<template>
    <div class="pages">
        <div class="nameTable">Проводки</div>
        <b-table sticky-header :items="operations" :select-mode="selectMode" selectable  @row-selected="onRowSelected" :fields="fieldsOperations"></b-table>
        <div class="nameTable" v-if="selected" >Счета проводок</div>
        <b-table  v-if="selected" :items="accountsOperation" :fields="fieldsAccountsOperation"></b-table>
    </div>
</template>

<script>
    export default {
        name: "operations",
        data(){
            return{
                selected: null,
                accountsOperation:null,
                fieldsOperations:[
                    { key: "opDate", label: "Дата операционного дня" },
                    { key: "acctNumCr", label: "Счет дебета" },
                    { key: "acctNumDB", label: "Счет кредита" },
                    { key: "amount", label: "Сумма" },
                ],
                fieldsAccountsOperation:[
                    { key: "acctNum", label: "Номер счета" },
                    { key: "balance", label: "Остаток" },
                ],
                selectMode: 'single',
            }
        },
        methods:{
            onRowSelected: function(items){
                if(items.length <= 0) {
                    this.selected = null
                    return
                }
                this.selected = items[0]
            }
        },
        computed:{
            operations:function () {
                const opDate = this.$store.getters['operations/OpEntry']
                return opDate.map(x=>{return {opDate: x.OpDate,acctNumCr: x.AcctNumCr,acctNumDB:x.AcctNumDB,amount:x.Amount}})
            },
        },
        watch:{
            selected: async function (val) {
                if(val)
                    this.accountsOperation = await this.$store.dispatch('acct/filterByDateAndAccount',val)
            },
        },
    }
</script>

<style scoped>

</style>