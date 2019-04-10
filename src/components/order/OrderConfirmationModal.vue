<template>
  <Modal :is-active="isActive" card-title="Order Confirmation">
    <table class="table" style="width: 100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in createOrder.items">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.quantity }}</td>
          <td>Rp. {{ item.price * item.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <div class="columns">
      <div class="column">
        <div class="content">
          <strong>Billed To:</strong><br />
          {{ auth.userData.data.fullname }}<br />
          <strong>No Table:</strong><br />
          {{ createOrder.noTable }}
        </div>
      </div>
      <div class="column">
        <div class="content">
          <strong>Order Description:</strong><br />
          {{ createOrder.orderDescription }}<br />
          <strong>Total Billed</strong><br />
          Rp. {{ total }}
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <textarea
          class="textarea has-fixed-size"
          placeholder="Order Description"
          v-model="description"></textarea>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input" type="number" placeholder="No Table" v-model="noTable" min="1">
      </div>
    </div>

    <template slot="footer">
      <button :disabled="noTable < 1" class="button is-success" @click="handleMakeOrder">
        Make Order
      </button>
      <button @click="close" class="button">Cancel</button>
    </template>

  </Modal>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import Modal from '@/components/ui/Modal'

  export default {
    name: 'OrderConfirmationModal',
    components: {
      Modal
    },
    props: ['isActive'],
    computed: {
      ... mapState(['createOrder','auth']),
      ... mapGetters({
        total: 'createOrder/totalBill'
      }),
      description : {
        get () {
          return this.createOrder.orderDescription
        },
        set (value) {
          this.updateDescription(value)
        }
      },
      noTable: {
        get () {
          return this.createOrder.noTable
        },
        set (value) {
          this.updateNoTable(value)
        }
      }
    },
    methods: {
      ... mapActions({
        updateDescription: 'createOrder/updateDescription',
        updateNoTable: 'createOrder/updateNoTable',
        makeOrder: 'createOrder/createOrder'
      }),
      close () {
        this.$emit('close')
      },
      handleMakeOrder () {
        this.makeOrder()
          .then(() => {
            this.$emit('close')
            setTimeout(() => {
              this.$router.push('/')
            }, 2000)
          })
      }
    }
  }
</script>