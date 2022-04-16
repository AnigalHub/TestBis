<template>
    <b-modal v-model="modalShow" hide-footer>
        <b-form @submit.prevent="onSetOperations">
            <b-input-group prepend="Дата операционного дня" class="mb-2">
                <b-form-input  aria-describedby="inputFeedback" :disabled="isEdit" :state="nameState" id="example-input" v-model="newOperations.OpDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"
                ></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker v-model="newOperations.OpDate" :disabled="isEdit" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
                </b-input-group-append>
                <b-form-invalid-feedback id="inputFeedback" >
                    {{errorText}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-input-group prepend="Счет дебета" class="mb-2">
                <b-form-select :options="AcctsNum" v-model="newOperations.AcctNumDB" :disabled="isEdit"></b-form-select>
            </b-input-group>
            <b-input-group prepend="Счет кредита" class="mb-2">
                <b-form-select :options="AcctsNum" v-model="newOperations.AcctNumCr" :disabled="isEdit"></b-form-select>
            </b-input-group>
            <b-input-group prepend="Сумма" class="mb-2">
                <b-form-input v-model="newOperations.Amount" type="number" min="1"></b-form-input>
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
                errorText:'',
                formatted: '',
                selected: '',
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
            nameState() {
                if(!this.newOperations.OpDate)
                    return undefined
                if(this.formatted === 'No date selected'){
                    this.errorText = 'Ошибка ввода операционного дня'
                    return false
                }
                console.log(this.newOperations)
                return true
            },
            AcctsNum(){
                const accts = this.$store.getters['acct/Acct']
                if(!accts)
                    return null;
                return accts.map(x=>{return {text: x.AcctNum, value: x.AcctNum}})
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