<template>
    <div class="pages">
        <b-form-select class="bg-primary bg-gradient" v-model="selected" :options="options"></b-form-select>
    </div>
</template>

<script>
    export default {
        name: "account",
        data(){
            return{
                selected:null,
                options:[
                    { value: null, text: 'Please select an option' },
                    { value: 'a', text: 'This is First option' },
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    select {
        cursor:pointer;
        color: #fff;
        font-size: 1.5rem;
        padding: 1rem 1.5rem;
        border: 0;
        margin: 0;

        text-indent: 0.25rem;
    }
    @media screen and (max-width: 1500px) {
        select{
            font-size: 1.15rem;
        }
    }

</style>