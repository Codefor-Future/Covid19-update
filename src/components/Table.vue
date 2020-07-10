<template>
  <div>
    <select v-model="state" class="btn-primary border-0 p-2 my-4">
        <option value="State">State</option>
        <option value="District">District</option>
    </select>

    <table class="table" v-if="tableData">
        <thead>
            <tr>
                <th scope="col">{{stateOrDist}}</th>
                <th scope="col">Confirmed</th>
                <th scope="col">Active</th>
                <th scope="col">Recovered</th>
                <th scope="col" v-if="state=='District'">Deceased</th>
            </tr>
        </thead>
        <tbody  v-if="state=='District'">
            <tr v-for="(i, name) in tableData" :key="i">
                <td>{{name}}</td>
                <td>{{i.confirmed}}</td>
                <td>{{i.active}}</td>
                <td>{{i.recovered}}</td>
                <td>{{i.deceased}}</td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr v-for="i in tableData" :key="i">
                <td>{{i.state}}</td>
                <td>{{i.confirmed}}</td>
                <td>{{i.active}}</td>
                <td>{{i.recovered}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Table',
  data:function(){
      return{
          state:"State",
          tableData:null
      }
  },
  watch:{
      state:async function(newstate){
          if(newstate=="State"){
              let tempTableData= await axios.get("https://api.covid19india.org/data.json")
                
                this.tableData=tempTableData.data.statewise

          
            }else if(newstate=="District"){
                let tempTableData= await axios.get("https://api.covid19india.org/state_district_wise.json")
                
                this.tableData=tempTableData.data.Kerala.districtData

                console.log(tempTableData)
        }
      }
  },

//   async mounted(){
//       if(this.state=="State"){
          
//           return;
//       }else if(this.state=="District"){
//           console.log("hi")
//           let tempTableData= await axios.get("https://api.covid19india.org/zones.json")
//           tempTableData= tempTableData.data.zones.slice(0,30)
//           this.tableData=tempTableData
//           console.log(this.tableData)
//       }
      
//   },
  computed:{
      stateOrDist(){
          if(this.state=="State"){
              return "State";
          }else{
              return "District";
          }
      }
  }

}
  
</script>
  
<style>
  select{
      border-radius: 5px;
  }
</style>
