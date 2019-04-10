<template>
  <div class="columns">
    <div class="column is-12">
      <table class="table" style="width: 100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in createOrder.items">
            <td>
              {{ item.name }}
            </td>
            <td>
              <input class="input" v-model="item.description" type="text" placeholder="description">
            </td>
            <td>
              <input class="input" v-model="item.quantity" type="number" min="1">
            </td>
            <td>
              Rp. {{ item.price * item.quantity }}
            </td>
            <td>
              <button @click="removeItem(item.menu_id)" class="button is-danger">Remove</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>Total</th>
            <th>Rp. {{ total }}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>  
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'OrderListTable',
    computed: {
      ... mapState(['createOrder']),
      ... mapGetters({
        total: 'createOrder/totalBill'
      })
    },
    methods: {
      ... mapActions({
        removeItem: 'createOrder/removeItem'
      })
    }
  }
</script>