<template>
  <div class="text-center">

    <!-- select button -->
    <select v-model="state" class="btn-primary border-0 p-2 my-4">
        <option value="Select" selected>Select</option>
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
        <!-- Table body for District wise data -->
        <tbody  v-if="state=='District'">
            <tr v-for="(i, name) in tableData" :key="i">
                <td v-if="name!='Other State'">{{name}}</td>
                <td v-if="name!='Other State'">{{i.confirmed}}</td>
                <td v-if="name!='Other State'">{{i.active}}</td>
                <td v-if="name!='Other State'">{{i.recovered}}</td>
                <td v-if="name!='Other State'">{{i.deceased}}</td>
            </tr>
        </tbody>
        <!-- Table body for State wise data -->
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


export default {
  name: 'Table',
  data:function(){
      return{
          state:"Select",
      }
  },
  watch:{
      state:async function(newstate){
          if(newstate=="State"){
              this.$store.dispatch('updateTableData',newstate)

          
            }else if(newstate=="District"){
                 this.$store.dispatch('updateTableData',newstate)
   

        }
      }
  },


  computed:{
      stateOrDist(){
          if(this.state=="State"){
              return "State";
          }else{
              return "District";
          }
      },
      tableData(){
          return this.$store.state.tableData
      }
  }

}
  
</script>
  
<style>
  select{
      border-radius: 5px;
  }
</style>
