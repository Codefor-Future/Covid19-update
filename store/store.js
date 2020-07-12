import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex)

export const store= new Vuex.Store({
    state:{
      
        data:[],
        tableData:null,
        fullData:{
            
        }
    },
    mutations:{
      updateTableData(state,newData){
        state.tableData=newData
      },
      updateCurrentData(state,data){
        state.data=data
      },
      updateGraphData(state,graphdata){
        state.fullData=graphdata
      }
    },
    actions:{
        updateTableData:async(context, newstate)=>{
            if(newstate=="State"){
                let tempTableData= await axios.get("https://api.covid19india.org/data.json")
                context.commit('updateTableData',tempTableData.data.statewise)
  
            
              }else if(newstate=="District"){
                  let tempTableData= await axios.get("https://api.covid19india.org/state_district_wise.json")
                  
                  context.commit('updateTableData',tempTableData.data.Kerala.districtData)
  
          }
        },
        
        async updateCurrentData(context){
          const data1= await axios.get("https://api.covid19india.org/data.json")
          const tempGraphData=data1.data.cases_time_series;
          var graph={
            confirmed:{
              key:0,
              xAxis: {
                data: [],
                show:true
              },
              yAxis: {
                type: 'value',
                show:true

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
                type: 'value',
                show:true
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
                type: 'value',
                show:true
              },
              series: [
                {
                  type: 'bar',
                  data: []
                }
              ]
            }
          }
          for(var i in tempGraphData){
              graph.confirmed.xAxis.data[i]=tempGraphData[i].date
              graph.confirmed.series[0].data[i]=tempGraphData[i].dailyconfirmed
              graph.confirmed.key= 4
      
              graph.recovered.xAxis.data[i]=tempGraphData[i].date
              graph.recovered.series[0].data[i]=tempGraphData[i].dailyrecovered
              graph.recovered.key= 5
      
              // graph.active.xAxis.data[i]=tempGraphData[i].date
              // graph.active.series[0].data[i]=tempGraphData[i].dailyactive
              // graph.active.key= 6
      
              graph.deceased.xAxis.data[i]=tempGraphData[i].date
              graph.deceased.series[0].data[i]=tempGraphData[i].dailydeceased
              graph.deceased.key= 7
            }
          context.commit('updateCurrentData',data1.data.cases_time_series[data1.data.cases_time_series.length-1])
          context.commit('updateGraphData',graph)
        }
    }
})