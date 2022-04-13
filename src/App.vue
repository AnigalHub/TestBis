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
  .nameTable{
    padding-top: 1%;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: 'Lora', serif;
    text-decoration: underline;
  }
  .row{
    margin-right: 0 !important;
    margin-top: 0 !important;
  }
  select{font-size: 1.25rem;}
  table{
    font-size: 1rem;
    th{
      border-bottom: 1px solid black !important;
    }
  }
  .pages{
    padding: 1.5rem 0;
  }
  @media screen and (max-width: 1200px) {
    select{font-size: 1rem;}
  }
  @media screen and (max-width: 992px) {
    .row{
      flex-direction: column;
      .col-2,.col{ max-width: 100%;}
    }
  }
</style>
