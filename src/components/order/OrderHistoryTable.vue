<template>
  <div>
    <Loading :active.sync="isLoading" :is-full-page="false"></loading>
    <div class="columns">
      <div class="column">
        <div class="box has-text-centered" style="height: 100%">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <input class="input" v-model="filters[0].value" placeholder="Text to search" />
            </div>
            <div class="control">
              <div class="select">
                <select v-model="filters[1].value">
                  <option value="0">Process</option>
                  <option value="1">Success</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <data-tables :filters="filters" :data="data" :pagination-props="{ pageSizes: [5, 10, 15] }">
      <el-table-column label="Id" align="center" sortable prop="id">
      </el-table-column>
      <el-table-column prop="user.fullname" label="Fullname" align="center" sortable>
      </el-table-column>
      <el-table-column label="Description" align="center">
        <template slot-scope="scope">
          {{ scope.row.description || '-'}}      
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status" class="tag is-success">Success</span>
          <span v-else class="tag is-primary">Process</span>
        </template>
      </el-table-column>
      <el-table-column label="Quantity" align="center" prop="scrope.row.orderDetail" sortable>
        <template slot-scope="scope">
          {{ scope.row.orderDetail.length}}
        </template>
      </el-table-column>
      <el-table-column label="Table" align="center" prop="no_table" sortable>
      </el-table-column>
      <el-table-column label="Actions" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: 'DetailOrder', params: { id: scope.row.id } }">
            <el-button>
              View
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </data-tables>
  </div>
</template>

<script>
  import { RepositoryFactory } from '@/repositories/RepositoryFactory'
  import Loading from 'vue-loading-overlay'

  const orderFactory = RepositoryFactory.get('order')
  export default {
    name: 'OrderHistoryTable',
    components: {
      Loading
    },
    data () {
      return {
        isLoading: true,
        data: [],
        filters: [
          {
            value: '',
            props: ['description'],
            filterFn: (row, filter) => {
              return Object.keys(row).some((prop) => {
                return JSON.stringify(row[prop])
                  .toLowerCase()
                  .indexOf(filter.value.toLowerCase()) > -1
              })
            }
          },
          {
            value: '',
            prop: 'status'
          }
        ]
      }
    },
    created () {
      orderFactory.all()
        .then((resp) => {
          this.data = resp.data.data
          this.isLoading = false
        })
    }
  }
</script>