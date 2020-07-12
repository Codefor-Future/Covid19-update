<template>
  <div class="card p-4">
      <h6>{{heading}}</h6>
      <p v-if="today">+{{today}}</p>
      <h3>{{total}}</h3>
      <!-- mini chart -->
      <div class="">
          <chart :options="graphData" class="chart"></chart>
      </div>
      <!-- /mini chart -->
  </div>
</template>

<script>
export default {
  name: 'CurrentStatusCard',
  props:{
      heading:String,
    //   today:String,
    //   total: String,
      cls:String,
    //   graphData: Object,

  },
  computed:{

      value(){
        return this.$props.heading.toLowerCase()
      },
      today(){
          return this.$store.state.data["daily"+this.value]
      },
      total(){
          return this.$store.state.data["total"+this.value]
      },
      graphData(){
          return this.$store.state.fullData[this.value]
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chart{
        width: 100%;
        height: 50px;
    }
    .card{
        text-align: center;
    }
</style>