<template>
  <BaseLayout>
    <div class="content">
      <h2>Order History</h2>
    </div>
    <OrderHistoryTable />
  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/layout/BaseLayout'
  import OrderHistoryTable from '@/components/order/OrderHistoryTable'
  export default {
    name: 'Order',
    components: {
      BaseLayout,
      OrderHistoryTable
    }
  }
</script>