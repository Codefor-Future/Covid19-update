<template>
  <div id="app" class="p-5">
    <!-- Nav -->
    <Nav/>
    <!-- /Nav -->
    
    <!-- Quick view Cards -->
    <div class="row">
      <div class="col-sm-4 text-danger">
        <Card heading='Confirmed' :key="fullData.confirmed.key" :graphData="fullData.confirmed" :total="data.totalconfirmed" :today="data.dailyconfirmed"/>
      </div>
      <div class="col-sm-4 text-success">
        <Card heading='Recovered' :key="fullData.recovered.key" :graphData="fullData.recovered" :total="data.totalrecovered" :today="data.dailyrecovered"/>
      </div>
      <div class="col-sm-4 text-secondary">
        <Card heading='Deceased' :key="fullData.deceased.key" :graphData="fullData.deceased" :total="data.totaldeceased" :today="data.dailydeceased"/>
      </div>
    </div>
    <!-- /Quick view Cards -->

    <!-- Table -->
    <TableData/>
    <!-- /Table -->

    <!-- Charts -->
    <h3>Confirmed</h3>
    <chart :options="fullData.confirmed"></chart><br>
    <h3>Recovered</h3>
    <chart :options="fullData.recovered"></chart><br>
    <h3>Deceased</h3>
    <chart :options="fullData.deceased"></chart>
    <!-- /Charts -->
  </div>
</template>

<script>

import Nav from './components/nav.vue'
import Card from './components/currentStatusCard.vue'
import TableData from './components/Table.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Nav,
    Card,
    TableData
  },
  data:function (){
    return{
        data:[],
        fullData:{
            confirmed:{
              key:0,
              xAxis: {
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  type: 'bar',
                  data: []
                }
              ]
            },
            recovered:{
              key:2,
              xAxis: {
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  type: 'bar',
                  data: []
                }
              ]
            },
            active:{
              key:3,
              xAxis: {
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  type: 'bar',
                  data: []
                }
              ]
            },
            deceased:{
              key:4,
              xAxis: {
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  type: 'bar',
                  data: []
                }
              ]
            }
        }
     }
    },
    
    


    async mounted (){
      const data1= await axios.get("https://api.covid19india.org/data.json")
      this.data= data1.data.cases_time_series[data1.data.cases_time_series.length-1]
      const tempGraphData=data1.data.cases_time_series


      for(var i in tempGraphData){
        this.fullData.confirmed.xAxis.data[i]=tempGraphData[i].date
        this.fullData.confirmed.series[0].data[i]=tempGraphData[i].dailyconfirmed
        this.fullData.confirmed.key= 4

        this.fullData.recovered.xAxis.data[i]=tempGraphData[i].date
        this.fullData.recovered.series[0].data[i]=tempGraphData[i].dailyrecovered
        this.fullData.recovered.key= 5

        // this.fullData.active.xAxis.data[i]=tempGraphData[i].date
        // this.fullData.active.series[0].data[i]=tempGraphData[i].dailyactive
        // this.fullData.active.key= 6

        this.fullData.deceased.xAxis.data[i]=tempGraphData[i].date
        this.fullData.deceased.series[0].data[i]=tempGraphData[i].dailydeceased
        this.fullData.deceased.key= 7
      }
      
    }
  }
</script>
  
<style>
  .cards{
    display: flex;
  }
  
</style>
