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

</style>