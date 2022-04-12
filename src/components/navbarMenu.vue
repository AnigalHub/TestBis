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
            font-size: 2rem;
            padding: 1rem 1.5rem;
            color: white;
            &:hover{
                padding-left: 3.5rem;
                color: white;
                text-decoration: underline;
            }
        }
    }
    @media screen and (min-width: 1200px) and (max-width: 1500px) {
        nav a {
            font-size: 1.5rem;
            padding: 1rem 1rem;
            &:hover{
                padding-left: 1rem
            }
        }
    }
    @media screen and (max-width: 1200px) {
        nav a {
            font-size: 1.3rem;
            padding: .8rem .5rem;
            &:hover{padding-left: .8rem}
        }
    }
    @media screen and (max-width: 992px) {
        nav {min-height: auto;}
    }
</style>