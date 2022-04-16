<template>
    <b-modal v-model="modalShow" hide-footer>
        <b-form @submit.prevent="onSetOpDate">
            <b-input-group prepend="Оперционный день" class="mb-2">
                <b-form-input  aria-describedby="inputFeedback"  :state="nameState" id="example-input" v-model="OpDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"
                ></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker v-model="OpDate" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
                </b-input-group-append>
                <b-form-invalid-feedback id="inputFeedback">
                    {{errorText}}
                </b-form-invalid-feedback>
            </b-input-group>
            <b-button type="submit" class="mt-2 w-100" variant="success" >Сохранить</b-button>
        </b-form>
    </b-modal>
</template>

<script>
    export default {
        name: "ModalSetOpDate",
        data(){
            return{
                modalShow:false,
                OpDate: '',
                formatted: '',
                selected: '',
                errorText:''
            }
        },
        props:{
            showModal:Boolean,
        },
        computed: {
            nameState() {
                if(!this.OpDate)
                    return undefined
                if(this.formatted === 'No date selected'){
                    this.errorText = 'Ошибка ввода операционного дня'
                    return false
                }
                return true
            }
        },
        methods:{
            onContext(ctx) {
                this.formatted = ctx.selectedFormatted
                this.selected = ctx.selectedYMD
            },
            onSetOpDate: async function(){
                try{
                    if (this.OpDate !== ''){
                        await this.$store.dispatch('opDate/setOpDate',{OpDate: this.OpDate})
                        this.OpDate=''
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
            modalShow:function (val) {
                if(!val)
                    this.$emit("modalClosed")
            }
        }
    }
</script>

<style scoped>

</style>