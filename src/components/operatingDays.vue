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
                    { key: "OpDate", label: "Дата операционного дня" },
                ],
                fieldsOperations:[
                    { key: "AcctNumDB", label: "Счет дебета" },
                    { key: "AcctNumCr", label: "Счет кредита" },
                    { key: "Amount", label: "Сумма" },
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
                return this.$store.getters['opDate/OpDates']
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