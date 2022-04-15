<template>
    <div class="pages">
        <div class="nameTable">Операционные дни</div>
        <b-table sticky-header :items="opDates" :select-mode="selectMode" selectable  @row-selected="onRowSelected" :fields="fields">
            <template #cell(Actions)="{item}">
                <b-button variant="danger" @click="onDeleteOpDate(item)">Удалить</b-button>
            </template>
        </b-table>
        <b-button variant="success" @click="modalShow = !modalShow">Создать</b-button>
        <div class="nameTable" v-if="selected">Проводки операционного дня</div>
        <b-table sticky-header v-if="selected" :items="operations" :fields="fieldsOperations"></b-table>
        <modal-set-op-date :showModal="modalShow" @modalClosed="onModalClosed"></modal-set-op-date>
    </div>
</template>

<script>
    import ModalSetOpDate from "@/components/modals/ModalSetOpDate";
    export default {
        name: "operatingDays",
        components: {ModalSetOpDate},
        data(){
            return{
                modalShow: false,
                selected: null,
                operations:null,
                fields:[
                    { key: "OpDate", label: "Дата операционного дня" },
                    { key: "Actions", label: "Действия" }
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
            onModalClosed:function(){
                this.modalShow = false
            },
            onDeleteOpDate:async function(val){
                await this.$store.dispatch('opDate/deleteOpDate',val)
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