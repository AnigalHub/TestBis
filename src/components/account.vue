<template>
    <div class="pages">
        <b-select class="" v-model="selected"  :options="opDates" ></b-select>
        <div class="nameTable">Счета с остатками на дату</div>
        <b-table :items="acctPoss" :select-mode="selectMode" selectable @row-selected="onRowSelected" :fields="fields">
            <template #cell(actions)="{item}">
                <b-button class="mx-2" variant="primary">Редактировать</b-button>
                <b-button variant="danger" @click="onDeleteAcc(item)">Удалить</b-button>
            </template>
        </b-table>
        <b-button variant="success" @click="modalShow = !modalShow">Создать</b-button>
        <div class="nameTable" v-if="selectedAcc">Проводки</div>
        <b-table v-if="selectedAcc" :items="operations" :fields="fieldsOperations"></b-table>
        <modal-create-account v-model="modalShow" @addedAccount="onAddAcc" @modalClosed="modalShow = false"/>
    </div>
</template>

<script>
    import ModalCreateAccount from "@/components/modals/modalCreateAccount";
    export default {
        name: "account",
        components: {ModalCreateAccount},
        data(){
            return{
                modalShow: false,
                selected: null,
                selectedAcc: null,
                acctPoss:null,
                operations:null,
                fields:[
                    { key: "AcctNum", label: "Номер счета" },
                    { key: "Balance", label: "Остаток" },
                    { key: "Actions", label: "Действия" }
                ],
                fieldsOperations:[
                    { key: "OpDate", label: "Дата операционного дня" },
                    { key: "AcctNumCr", label: "Счет дебета" },
                    { key: "AcctNumDB", label: "Счет кредита" },
                    { key: "Amount", label: "Сумма" },
                ],
                selectMode: 'single',
            }
        },
        methods:{
            onDeleteAcc:async function(val){
                await this.$store.dispatch('acct/deleteAccount',val)
                await this.getAccounts(this.selected)
            },
            onAddAcc:async function(){
                await this.getAccounts(this.selected)
            },
            onRowSelected: function(items){
                if(items.length <= 0) {
                  this.selectedAcc = null
                  return
                }
              this.selectedAcc = items[0]
            },
            getAccounts: async function (val) {
                this.acctPoss = await this.$store.dispatch('acct/filterAcctPosByDate', {opDate:val})
            }
        },
        computed:{
            opDates:function () {
                const opDate = this.$store.getters['opDate/OpDates']
                return opDate.map(x=>{return {text: x.OpDate, value: x.OpDate}})
            },
        },
        watch:{
            selected: async function (val) {
                await this.getAccounts(val)
            },
            selectedAcc: async function (selAccount){
                if(selAccount)
                this.operations = await this.$store.dispatch('operations/filterByAccountAndDate',{account: selAccount.AcctNum, date: this.selected})
            }
        },
        created() {
            this.selected = this.$store.getters['opDate/LastOpDate']
        }
    }
</script>

<style scoped lang="scss">


</style>