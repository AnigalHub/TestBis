<template>
    <b-modal v-model="modalShow" hide-footer>
        <b-form @submit.prevent="onAddAcc">
            <b-input-group prepend="Номер счета" class="mb-2">
                <b-form-input v-model="newAccount.AcctNum"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Остаток" class="mb-2">
                <b-form-input v-model="newAccount.Balance"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Дата" class="mb-2">
                <b-form-select :options="opDates" v-model="newAccount.OpDate"></b-form-select>
            </b-input-group>
            <b-button type="submit" class="mt-2" variant="success" >Добавить</b-button>
        </b-form>
    </b-modal>
</template>

<script>
    export default {
        name: "modalCreateAccount",
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
          value: Boolean
        },
        methods:{
            onAddAcc:async function(){
                try{
                    if (this.newAccount.AcctNum !== '' && this.newAccount.Balance !== '' && this.newAccount.OpDate !== ''){
                        await this.$store.dispatch('acct/addAccount', this.newAccount)
                        this.modalShow = false
                        this.$emit('addedAccount')
                        this.newAccount.AcctNum = ''
                        this.newAccount.Balance = ''
                        this.newAccount.OpDate = ''
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
            value:function (val) {
                this.modalShow = val
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