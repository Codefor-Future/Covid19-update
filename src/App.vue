<template>
  <div id="app" class="p-5">
    <!-- Nav -->
    <Nav/>
    <!-- /Nav -->

    <!-- Quick view Cards -->
    <div class="row">
      <div class="col-sm-4 text-danger">
        <Card heading="Confirmed"/>
      </div>
      <div class="col-sm-4 text-success">
        <Card heading='Recovered'/>
      </div>
      <div class="col-sm-4 text-secondary">
        <Card heading='Deceased'/>
      </div>
    </div>
    <TableData/>
    <!-- /Table -->

    <!-- Charts -->
    <h3>Confirmed</h3>
    <chart :options="graphDataConfirm"></chart><br>
    <h3>Recovered</h3>
    <chart :options="graphDataRecovered"></chart><br>
    <h3>Deceased</h3>
    <chart :options="graphDataDeceased"></chart>
    <!-- /Charts -->
  </div>
</template>

<script>

import Nav from './components/nav.vue'
import Card from './components/currentStatusCard.vue'
import TableData from './components/Table.vue'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    Nav,
    Card,
    TableData
  },
  data:function (){
    return{
        
     }
    },
    async mounted (){
      this.$store.dispatch('updateCurrentData') 
      
    },
    computed:{
      graphDataConfirm(){
        return this.$store.state.fullData.confirmed
      },
      graphDataRecovered(){
        return this.$store.state.fullData.recovered
      },
      graphDataDeceased(){
        return this.$store.state.fullData.deceased
      }
    }
  }
</script>
  
<style>
  .cards{
    display: flex;
  }
  
</style>
