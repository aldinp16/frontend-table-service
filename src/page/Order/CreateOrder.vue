<template>
  <BaseLayout>
    <Loading :active.sync="isLoading" :is-full-page="true"></loading>
    <OrderConfirmationModal :is-active="isModalVisible" @close="closeModal"/>
    <div class="columns">
      <div class="column">
        <div class="content column has-text-centered-mobile">
          <h2>New Order</h2>
        </div>
      </div>
      <div class="column has-text-centered-mobile has-text-right-desktop">
        <button @click="showModal" class="button has-text-right" :disabled="createOrder.items < 1">
          Make Order
        </button>
        <button @click="clearItem" class="button has-text-right" :disabled="createOrder.items < 1">
          Clear
        </button>
      </div>
    </div>
    <OrderListTable />
    <OrderMenuList />
  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/layout/BaseLayout'
  import OrderListTable from '@/components/order/OrderListTable'
  import OrderMenuList from '@/components/order/OrderMenuList'
  import OrderConfirmationModal from '@/components/order/OrderConfirmationModal'
  import Loading from 'vue-loading-overlay'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'CreateOrder',
    components: {
      BaseLayout,
      OrderListTable,
      OrderMenuList,
      Loading,
      OrderConfirmationModal
    },
    data () {
      return {
        isModalVisible: false,
      }
    },
    computed: {
      ... mapState(['createOrder']),
      isLoading () {
        return !(this.createOrder.menus.length > 0) || (this.createOrder.status === 'loading')
      }
    },
    methods: {
      ... mapActions({
        clearItem: 'createOrder/clearItem'
      }),
      showModal () {
        this.isModalVisible = true
      },
      closeModal () {
        this.isModalVisible = false
      }
    }
  }
</script>