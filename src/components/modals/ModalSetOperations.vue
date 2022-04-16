<template>
    <b-modal v-model="modalShow" hide-footer>
        <b-form @submit.prevent="onSetOperations">
            <b-input-group prepend="Дата операционного дня" class="mb-2">
                <b-form-select :options="opDates" v-model="newOperations.OpDate" :state="stateOpDate" :disabled="isEdit" aria-describedby="inputFeedbackOpdate"></b-form-select>
                <b-form-invalid-feedback id="inputFeedbackOpdate">
                    {{errorTextOpDate}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-input-group prepend="Счет дебета" class="mb-2">
                <b-form-select :options="AcctsNum" v-model="newOperations.AcctNumDB" :state="stateAcctNumDB" :disabled="isEdit" aria-describedby="inputFeedbackAcctNumDB"></b-form-select>
                <b-form-invalid-feedback id="inputFeedbackAcctNumDB">
                    {{errorTextAcctNumDB}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-input-group prepend="Счет кредита" class="mb-2">
                <b-form-select :options="AcctsNum" :state="stateAcctNumCr" v-model="newOperations.AcctNumCr" :disabled="isEdit" aria-describedby="inputFeedbackAcctNumCr"></b-form-select>
                <b-form-invalid-feedback id="inputFeedbackAcctNumCr">
                    {{errorTextAcctNumCr}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-input-group prepend="Сумма" class="mb-2">
                <b-form-input v-model="newOperations.Amount" :state="stateAmount" type="number" min="1" aria-describedby="inputFeedbackAmount"></b-form-input>
                <b-form-invalid-feedback id="inputFeedbackAmount">
                    {{errorTextAmount}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-button type="submit" class="mt-2 w-100" variant="success" >Сохранить</b-button>
        </b-form>
    </b-modal>
</template>

<script>
    export default {
        name: "ModalSetOperations",
        data(){
            return{
                modalShow:false,
                errorTextAcctNumCr:'',
                errorTextAcctNumDB:'',
                errorTextAmount:'',
                errorTextOpDate:'',
                newOperations:{
                    AcctNumCr:'',
                    AcctNumDB:'',
                    Amount:'',
                    OpDate:''
                }
            }
        },
        props:{
            value: Object,
            showModal:Boolean,
            isEdit: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            stateOpDate() {
                if(this.newOperations.OpDate === undefined){
                    this.errorTextOpDate = 'Не введена дата операционного дня'
                    return false
                }
                if(!this.newOperations.OpDate)
                    return undefined
                return true
            },
            stateAcctNumDB() {
                if(this.newOperations.AcctNumDB === undefined){
                    this.errorTextAcctNumDB = 'Не введен счет дебета'
                    return false
                }
                if(!this.newOperations.AcctNumDB)
                    return undefined
                return true
            },
            stateAcctNumCr() {
                if(this.newOperations.AcctNumCr === undefined){
                    this.errorTextAcctNumCr = 'Не введен счет кредита'
                    return false
                }
                if(!this.newOperations.AcctNumCr)
                    return undefined
                return true
            },
            stateAmount() {
                if(this.newOperations.Amount === undefined){
                    this.errorTextAmount = 'Не введена сумма'
                    return false
                }
                if(!this.newOperations.Amount)
                    return undefined
                return true
            },
            AcctsNum(){
                const accts = this.$store.getters['acct/Acct']
                if(!accts)
                    return null;
                return accts.map(x=>{return {text: x.AcctNum, value: x.AcctNum}})
            },
            opDates:function () {
                const opDate = this.$store.getters['opDate/OpDates']
                if(!opDate)
                    return null;
                return opDate.map(x=>{return {text: x.OpDate, value: x.OpDate}})
            }
        },
        methods:{
            onContext(ctx) {
                this.formatted = ctx.selectedFormatted
                this.selected = ctx.selectedYMD
            },
            onSetOperations: async function(){
                try{
                    if (this.newOperations.OpDate !== '' && this.newOperations.AcctNumCr !=='' && this.newOperations.AcctNumDB !== '' && this.newOperations.Amount !== '' ){
                        await this.$store.dispatch('operations/setOperations',{old: this.value, new: this.newOperations})
                        this.newOperations.OpDate=''
                        this.newOperations.AcctNumCr =''
                        this.newOperations.AcctNumDB =''
                        this.newOperations.Amount =''
                        this.modalShow = false
                    }
                    else{
                        if(!this.newOperations.OpDate)
                            this.newOperations.OpDate = undefined
                        if(!this.newOperations.AcctNumDB)
                            this.newOperations.AcctNumDB = undefined
                        if(!this.newOperations.AcctNumCr)
                            this.newOperations.AcctNumCr = undefined
                        if(!this.newOperations.Amount)
                            this.newOperations.Amount = undefined
                    }
                }
                catch (e) {
                    console.log('произошла ошибка')
                }
            }
        },
        watch:{
            showModal:function (val) {
                this.modalShow = val
            },
            value: function(val){
                if(val){
                    const copy = JSON.parse(JSON.stringify(val))
                    this.newOperations = copy
                } else{
                    this.newOperations = {
                            AcctNumDB:'',
                            Amount:'',
                            OpDate:''
                    }
                }
            },
            modalShow:function (val) {
                if(!val)
                    this.$emit("modalClosed")
            }
        }
    }
</script>

<style scoped>

</style>