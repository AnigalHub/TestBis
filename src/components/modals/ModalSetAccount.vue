<template>
    <b-modal v-model="modalShow" hide-footer>
        <b-form @submit.prevent="onSetAcc">
            <b-input-group prepend="Номер счета" class="mb-2">
                <b-form-input v-model="newAccount.AcctNum" :readonly="isEdit"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Остаток" class="mb-2">
                <b-form-input v-model="newAccount.Balance"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Дата" class="mb-2">
                <b-form-select :options="opDates" v-model="newAccount.OpDate" :disabled="isEdit"></b-form-select>
            </b-input-group>
            <b-button type="submit" class="mt-2" variant="success" >Сохранить</b-button>
        </b-form>
    </b-modal>
</template>

<script>
    export default {
        name: "modalSetAccount",
        data(){
            return{
                modalShow:false,
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
                        await this.$store.dispatch('acct/setAccount', {old: this.value, new: this.newAccount})
                        this.newAccount.AcctNum = ''
                        this.newAccount.Balance = ''
                        this.newAccount.OpDate = ''
                        this.modalShow = false
                    }
                }
                catch (e) {
                    console.log('произошла ошибка')
                }
            },
        },
        computed:{
            opDates:function () {
                const opDate = this.$store.getters['opDate/OpDates']
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