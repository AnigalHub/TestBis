<template>
    <b-modal v-model="modalShow" hide-footer>
        <b-form @submit.prevent="onSetOpDate">
            <b-input-group prepend="Оперционный день" class="mb-2">
                <b-form-input id="example-input" v-model="OpDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"
                ></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker v-model="OpDate" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
            <div> {{errorText}}</div>
            <b-button type="submit" class="mt-2" variant="success" >Сохранить</b-button>
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
            value: String
        },
        methods:{
            onContext(ctx) {
                this.formatted = ctx.selectedFormatted
                this.selected = ctx.selectedYMD
            },
            onSetOpDate: async function(){
                console.log()
                try{
                    if (this.OpDate !== ''){
                      //  if( this.formatted === 'No date selected'){
                           // this.errorText = 'Неправильно вбит операционный день'
                       // }
                        await this.$store.dispatch('opDate/setOpDate',this.opDate)
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
            value: function (val) {
                if(val){
                    const copy = JSON.parse(JSON.stringify(val))
                    this.OpDate = copy
                } else{
                    this.OpDate = ''
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