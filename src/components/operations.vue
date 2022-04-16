<template>
    <div class="pages">
        <div class="nameTable">Проводки</div>
        <b-table sticky-header :items="operations" :select-mode="selectMode" selectable  @row-selected="onRowSelected" :fields="fieldsOperations">
            <template #cell(Actions)="{item}">
                <b-button class="mx-1" variant="primary" @click="onEditOperation(item)" >Редактировать</b-button>
                <b-button class="mx-1" variant="danger" @click="onDeleteOperation(item)">Удалить</b-button>
            </template>
        </b-table>
        <b-button variant="success" @click="modalShow = !modalShow">Создать</b-button>
        <div class="nameTable" v-if="selected" >Счета проводок</div>
        <b-table  v-if="selected" :items="accountsOperation" :fields="fieldsAccountsOperation"></b-table>
        <modal-set-operations v-model="operationToEdit" :showModal="modalShow" :is-edit="edit" @modalClosed="onModalClosed"></modal-set-operations>
    </div>
</template>

<script>
    import ModalSetOperations from "@/components/modals/ModalSetOperations";
    export default {
        name: "operations",
        components: {ModalSetOperations},
        data(){
            return{
                modalShow: false,
                selected: null,
                operationToEdit: null,
                edit: false,
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
            onModalClosed:function(){
                this.edit = false
                this.modalShow = false
                this.operationToEdit = null
            },
            onEditOperation: function(item){
                this.edit = true
                this.modalShow = !this.modalShow
                this.operationToEdit = item
            },
            onDeleteOperation:async function(val){
                await this.$store.dispatch('operations/deleteOperation',val)
            },
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
                    this.accountsOperation = await this.$store.dispatch('acctPos/filterByDateAndAccount',val)
            },
        },
    }
</script>

<style scoped>

</style>