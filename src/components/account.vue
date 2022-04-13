<template>
    <div class="pages">
        <b-select class="" v-model="selected"  :options="opDates" ></b-select>
        <b-button class="mt-4" variant=" success">Создать</b-button>
        <div class="nameTable">Счета с остатками на дату</div>
        <b-table :items="acctPoss" :select-mode="selectMode" selectable @row-selected="onRowSelected" :fields="fields">
            <template #cell(actions)="{item}">
                <b-button class="mx-2" variant="primary">Редактировать</b-button>
                <b-button variant="danger">Удалить</b-button>
            </template>
        </b-table>
        <div class="nameTable" v-if="selectedAcc">Проводки</div>
        <b-table v-if="selectedAcc" :items="operations" :fields="fieldsOperations"></b-table>
    </div>
</template>

<script>
    export default {
        name: "account",
        data(){
            return{
                selected: null,
                selectedAcc: null,
                acctPoss:null,
                operations:null,
                fields:[
                    { key: "acctNum", label: "Номер счета" },
                    { key: "balance", label: "Остаток" },
                    {key:"actions", label: "Действия"}
                ],
                fieldsOperations:[
                    { key: "opDate", label: "Дата операционного дня" },
                    { key: "acctNumCr", label: "Счет дебета" },
                    { key: "acctNumDB", label: "Счет кредита" },
                    { key: "amount", label: "Сумма" },
                ],
                selectMode: 'single',
            }
        },
        methods:{
          onRowSelected: function(items){
              if(items.length <= 0) {
                  this.selectedAcc = null
                  return
              }
              this.selectedAcc = items[0]
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
                this.acctPoss = await this.$store.dispatch('acct/filterAcctPosByDate', {opDate:val})
            },
            selectedAcc: async function (selAccount){
                if(selAccount)
                this.operations = await this.$store.dispatch('operations/filterByAccountAndDate',{account: selAccount.acctNum, date: this.selected})
            }
        },
        created() {
            this.selected = this.$store.getters['opDate/LastOpDate']
        }
    }
</script>

<style scoped lang="scss">


</style>