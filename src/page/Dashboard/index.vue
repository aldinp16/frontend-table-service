<template>
  <BaseLayout>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Order</p>
          <p class="title">{{ metricMainData.orderCount }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Menu</p>
          <p class="title">{{ metricMainData.menuCount }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">User</p>
          <p class="title">{{ metricMainData.userCount }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Transaction</p>
          <p class="title">{{ metricMainData.transactionCount }}</p>
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column is-4">
        <div class="box" style="height: 400px">
          <div class="content"><h3>Top Item order</h3></div>
          <canvas id="order-item-chart"> </canvas>
        </div>
      </div>
      <div class="column is-8">
        <div class="box" style="height: 400px">
          <div class="content"><h3>Linechart transaction history</h3></div>
          <canvas id="transaction-history-chart"> </canvas>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/layout/BaseLayout'
  import Chart from 'chart.js'
  import { RepositoryFactory } from '@/repositories/RepositoryFactory'
  const metricRepository = RepositoryFactory.get('metric')

  export default {
    name: 'Dashboard',
    components: {
      BaseLayout
    },
    data () {
      return {
        metricMainData: {}
      }
    },
    methods: {
      metricMain () {
        metricRepository.main()
          .then((resp) => {
            this.metricMainData = resp.data.data
          }).catch((err) => {
            console.error(err)
          })
      },
      createBarChart () {
        metricRepository.menuTopOrder()
          .then((resp) => {
            const data = resp.data.data
            const ctx = document.getElementById('order-item-chart')
            const myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: data.map(item => item.NAME),
                datasets: [{
                  label: 'Total item order',
                  data: data.map(item => item.TOTAL),
                }],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false
              }
            })
          }).catch((err) => {

          })
      },
      createLineChart () {
        metricRepository.transcationCountHistory()
          .then((resp) => {
            const data = resp.data.data
            const datasets = {
              label: 'Total Purhacase (Rp.)',
              borderColor: 'blue',
              data: data.map((item) => {
                return { x: `${item.YEAR}-${item.MONTH}-${item.DAY}`, y: item.TOTAL }
              })
            }
            const ctx = document.getElementById('transaction-history-chart')
            const myChart = new Chart(ctx, {
              type: 'line',
              data: {
                datasets: [datasets]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: { unit: 'day' }
                  }],
                  yAxes: [{
                      ticks: {
                          // Include a dollar sign in the ticks
                          callback: function(value, index, values) {
                              return 'Rp. ' + value;
                          }
                      }
                  }]
                }
              }
            })
          }).catch((err) => {

          })
      }
    },
    created () {
      this.metricMain()
      
    },
    mounted () {
      this.createBarChart()
      this.createLineChart()
    }
  }
</script>