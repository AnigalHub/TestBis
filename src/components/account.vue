<template>
    <div class="pages">
        <b-select class="" v-model="selected"  :options="opDates" ></b-select>
        <div class="nameTable">Счета с остатками на дату</div>
        <b-table :items="acctPoss" :select-mode="selectMode" selectable @row-selected="onRowSelected" :fields="fields"></b-table>
        <div class="nameTable">Проводки</div>
        <b-table :items="operations" :fields="fields"></b-table>
    </div>
</template>

<script>
    export default {
        name: "account",
        data(){
            return{
                selected: null,
                fields:[
                    { key: "acctNum", label: "Номер счета" },
                    { key: "balance", label: "Остаток" },
                ],
                selectMode: 'single',
            }
        },
        methods:{
          onRowSelected:{

          }
        },
        computed:{
            opDates:function () {
                const opDate = this.$store.getters['opDate/OpDates']
                return opDate.map(x=>{return {text: x.OpDate, value: x.OpDate}})
            },
            acctPoss:function () {
                const acctPos = this.$store.getters['acct/AcctPos']
                let arrayCopy = []
                for (let i in acctPos) {
                    if (this.selected === acctPos[i].OpDate) {
                        arrayCopy.push(acctPos[i])
                    }
                }
                return arrayCopy.map(x=>{return {acctNum: x.AcctNum, balance: x.Balance}})
            }
        },
        created() {
            console.log(this.opDates)
            this.selected = this.$store.getters['opDate/LastOpDate']
        }
    }
</script>

<style scoped lang="scss">
    select{font-size: 1.25rem;}
    table{font-size: 1rem;}
    @media screen and (max-width: 1200px) {
        select{font-size: 1rem;}
    }

</style>