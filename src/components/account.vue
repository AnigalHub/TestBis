<template>
    <div class="pages">
        <b-select class="" v-model="selectedDate" :options="opDates" ></b-select>
        <div class="nameTable">Счета с остатками на дату</div>
        <b-table sticky-header :items="Accts" :select-mode="selectMode" selectable @row-selected="onRowSelected" :fields="fields">
            <template #cell(Actions)="{item}">
                <b-button class="mx-1" variant="primary" @click="onEditAcc(item)">Редактировать</b-button>
                <b-button class="mx-1" variant="danger" @click="onDeleteAcc(item)">Удалить</b-button>
            </template>
        </b-table>
        <b-button variant="success" @click="modalShow = !modalShow">Создать</b-button>
        <div class="nameTable" v-if="selectedAcc">Проводки</div>
        <b-table sticky-header v-if="selectedAcc" :items="operations" :fields="fieldsOperations"></b-table>
        <modal-set-account v-model="accToEdit"  :is-edit="edit" :showModal="modalShow" @modalClosed="onModalClosed"></modal-set-account>
    </div>
</template>

<script>
    import ModalSetAccount from "@/components/modals/ModalSetAccount";
    export default {
        name: "account",
        components: {ModalSetAccount},
        data(){
            return{
                modalShow: false,
                selectedDate: null,
                selectedAcc: null,
                accToEdit: null,
                edit: false,
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
            onModalClosed:function(){
                this.edit = false
                this.modalShow = false
                this.accToEdit = null
            },
            onEditAcc: function(item){
                this.edit = true
                this.modalShow = !this.modalShow
                this.accToEdit = item
            },
            onDeleteAcc:async function(val){
                await this.$store.dispatch('acctPos/deleteAccount',val)
            },
            onRowSelected: function(items){
                if(items.length <= 0) {
                  this.selectedAcc = null
                  return
                }
              this.selectedAcc = items[0]
            },
            filterAcctPosByDate(AcctPos,selectedDate){
                let arrayCopy = []
                for (let i in AcctPos) {
                    if (selectedDate === AcctPos[i].OpDate) {
                        arrayCopy.push(AcctPos[i])
                    }
                }
                return arrayCopy
            },
        },
        computed:{
            opDates:function () {
                const opDate = this.$store.getters['opDate/OpDates']
                if(!opDate)
                    return null;
                if(this.selectedDate == null){
                    this.selectedDate = this.$store.getters['opDate/LastOpDate']
                }
                return opDate.map(x=>{return {text: x.OpDate, value: x.OpDate}})
            },
            Accts: function(){
                let res = this.$store.getters["acctPos/AcctPos"]
                return this.filterAcctPosByDate(res, this.selectedDate)
            }
        },
        watch:{
            selectedAcc: async function (selAccount){
                if(selAccount)
                this.operations = await this.$store.dispatch('operations/filterByAccountAndDate',{account: selAccount.AcctNum, date: this.selectedDate})
            }
        },
    }
</script>

<style  lang="scss">

</style>