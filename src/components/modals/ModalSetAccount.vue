<template>
    <b-modal v-model="modalShow" hide-footer>
        <b-form @submit.prevent="onSetAcc">
            <b-input-group prepend="Номер счета" class="mb-2">
                <b-form-input v-model="newAccount.AcctNum" :readonly="isEdit" :state="stateAcctNum" type="number" min="1" aria-describedby="inputFeedbackAcctNum"></b-form-input>
                <b-form-invalid-feedback id="inputFeedbackAcctNum">
                    {{errorTextAcctNum}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-input-group prepend="Остаток" class="mb-2">
                <b-form-input v-model="newAccount.Balance" type="number" :state="stateBalance" aria-describedby="inputFeedbackBalance"></b-form-input>
                <b-form-invalid-feedback id="inputFeedbackBalance">
                    {{errorTextBalance}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-input-group prepend="Дата" class="mb-2">
                <b-form-select :options="opDates" v-model="newAccount.OpDate" :state="stateOpDate" :disabled="isEdit" aria-describedby="inputFeedbackOpdate"></b-form-select>
                <b-form-invalid-feedback id="inputFeedbackOpDate">
                    {{errorTextOpDate}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-button type="submit" class="mt-2 w-100" variant="success" >Сохранить</b-button>
        </b-form>
    </b-modal>
</template>

<script>
    export default {
        name: "modalSetAccount",
        data(){
            return{
                modalShow:false,
                errorTextAcctNum:'',
                errorTextBalance:'',
                errorTextOpDate:'',
                newAccount:{
                    AcctNum:'',
                    Balance:'',
                    OpDate:''
                },
            }
        },
        props:{
            value: Object,
            showModal: Boolean,
            isEdit: {
                type: Boolean,
                default: false,
            },
        },
        methods:{
            onSetAcc:async function(){
                try{
                    if (this.newAccount.AcctNum !== '' && this.newAccount.Balance !== '' && this.newAccount.OpDate !== ''){
                        await this.$store.dispatch('acctPos/setAccount', {old: this.value, new: this.newAccount})
                        this.newAccount.AcctNum = ''
                        this.newAccount.Balance = ''
                        this.newAccount.OpDate = ''
                        this.modalShow = false
                    }
                    else{
                        if(!this.newAccount.AcctNum)
                            this.newAccount.AcctNum = undefined
                        if(!this.newAccount.Balance)
                            this.newAccount.Balance = undefined
                        if(!this.newAccount.OpDate)
                            this.newAccount.OpDate = undefined
                    }
                }
                catch (e) {
                    console.log('произошла ошибка')
                }
            },
        },
        computed:{
            stateOpDate() {
                if(this.newAccount.OpDate === undefined){
                    this.errorTextOpDate = 'Не введена дата'
                    return false
                }
                if(!this.newAccount.OpDate)
                    return undefined
                return true
            },
            stateAcctNum() {
                if(this.newAccount.AcctNum === undefined){
                    this.errorTextAcctNum = 'Не введен номер счета'
                    return false
                }
                if(!this.newAccount.AcctNum)
                    return undefined
                return true
            },
            stateBalance() {
                if(this.newAccount.Balance === undefined){
                    this.errorTextBalance = 'Не введен остаток'
                    return false
                }
                if(!this.newAccount.Balance)
                    return undefined
                return true
            },
            opDates:function () {
                const opDate = this.$store.getters['opDate/OpDates']
                if(!opDate)
                    return null;
                return opDate.map(x=>{return {text: x.OpDate, value: x.OpDate}})
            }
        },
        watch:{
            showModal:function (val) {
                this.modalShow = val
            },
            value: function(val){
                if(val){
                    const copy = JSON.parse(JSON.stringify(val))
                    this.newAccount = copy
                } else{
                    this.newAccount = {
                            AcctNum:'',
                            Balance:'',
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