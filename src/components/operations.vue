<template>
    <div class="pages">
        <div class="nameTable">Проводки</div>
        <b-table sticky-header :items="operations" :select-mode="selectMode" selectable  @row-selected="onRowSelected" :fields="fieldsOperations">
            <template #cell(Actions)="{item}">
                <b-button class="mx-2" variant="primary">Редактировать</b-button>
                <b-button variant="danger">Удалить</b-button>
            </template>
        </b-table>
        <b-button variant="success" @click="modalShow = !modalShow">Создать</b-button>
        <div class="nameTable" v-if="selected" >Счета проводок</div>
        <b-table  v-if="selected" :items="accountsOperation" :fields="fieldsAccountsOperation"></b-table>
    </div>
</template>

<script>
    export default {
        name: "operations",
        data(){
            return{
                modalShow: false,
                selected: null,
                accountsOperation:null,
                fieldsOperations:[
                    { key: "OpDate", label: "Дата операционного дня" },
                    { key: "AcctNumCr", label: "Счет дебета" },
                    { key: "AcctNumDB", label: "Счет кредита" },
                    { key: "Amount", label: "Сумма" },
                    { key: "Actions", label: "Действия" }
                ],
                fieldsAccountsOperation:[
                    { key: "AcctNum", label: "Номер счета" },
                    { key: "Balance", label: "Остаток" },
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
                if(!opDate)
                    return null;
                return opDate
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