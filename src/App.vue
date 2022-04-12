<template>
  <div id="app">
    <b-row>
      <b-col cols="2">
        <navbar-menu/>
      </b-col>
      <b-col>
        <router-view></router-view>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import NavbarMenu from "@/components/navbarMenu";
  export default {
    components: {NavbarMenu},
    data(){
      return {

      }
    },
  }
</script>

<style lang="scss">
  #app{
    margin: 0 !important;
    padding: 0 !important;
  }
  .row{
    margin-right: 0 !important;
    margin-top: 0 !important;
  }
  .pages{
    padding: 1rem 1rem;
  }
  @media screen and (max-width: 992px) {
    .row{
      flex-direction: column;
      .col-2,.col{
        width: 100%;
      }
    }
  }
</style>
