<template>
    <b-navbar id="Nav" class="navbar navbar-dark bg-primary bg-gradient">
        <nav>
            <b-nav vertical>
                <router-link :to="{name: 'Account'}">Счета</router-link>
                <router-link :to="{name: 'OperatingDays'}">Операционные дни</router-link>
                <router-link :to="{name: 'Operations'}">Операции</router-link>
            </b-nav>
        </nav>
    </b-navbar>
</template>

<script>
    export default {
        name: "navbarMenu"
    }
</script>

<style scoped lang="scss">
    nav{
        width: 100%;
        min-height: 100vh;
        padding-top: 1rem;
        a {
            text-decoration: none ;
            font-family: 'Lora', serif;
            font-size: 1.25rem;
            padding: .5rem .5rem;
            color: white;
            &:hover{
                padding-left: 1.5rem;
                color: white;
                text-decoration: underline;
            }
        }
    }
    @media screen and (max-width: 992px) {
        nav {min-height: auto;}
    }
</style>