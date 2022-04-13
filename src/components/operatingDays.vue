<template>
    <div class="pages">
        <div class="nameTable">Операционные дни</div>
        <b-table :items="opDates" :select-mode="selectMode" selectable  @row-selected="onRowSelected" :fields="fields"></b-table>
        <div class="nameTable" v-if="selected">Проводки операционного дня</div>
        <b-table v-if="selected" :items="operations" :fields="fieldsOperations"></b-table>
    </div>
</template>

<script>
    export default {
        name: "operatingDays",
        data(){
            return{
                selected: null,
                operations:null,
                fields:[
                    { key: "opDate", label: "Дата операционного дня" },
                ],
                fieldsOperations:[
                    { key: "acctNumDB", label: "Счет дебета" },
                    { key: "acctNumCr", label: "Счет кредита" },
                    { key: "amount", label: "Сумма" },
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
            opDates:function () {
                const opDate = this.$store.getters['opDate/OpDates']
                return opDate.map(x=>{return {opDate: x.OpDate}})
            },
        },
        watch:{
            selected: async function (val) {
                if(val)
                    this.operations = await this.$store.dispatch('operations/filterByDate',val)
            },
        },
    }
</script>

<style scoped>

</style>