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
  nav{
    width: 100%;
    min-height: 97.4vh;
    padding-top: 1rem;
    a {
      text-decoration: none ;
      font-family: 'Lora', serif;
      font-size: 1.2rem;
      padding: .5rem .5rem;
      color: white;
      &:hover{
        padding-left: 1rem;
        color: white;
        text-decoration: underline;
      }
    }
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
    th{border-bottom: 1px solid black !important;}
  }
  .modal-body{
    padding: 0 1rem 1rem !important;
  }
  .pages{
    padding: 1rem 0.5rem 0;
  }
  @media screen and (max-width: 1200px) {
    nav a,select,.nameTable{font-size: 1rem;}
    table,button{font-size: .8rem !important;}
  }
  @media screen and (max-width: 992px) {
    nav {min-height: auto;}
    .row{
      flex-direction: column;
      .col-2,.col{ max-width: 100%;}
    }
  }
</style>
