<template>
  <div>
    <Header />
    <section class="section">
      <div v-show="alert.status" :class="['notification', alert.type]"> {{ alert.message }}</div>
      <div class="container fluid">
        <slot></slot>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
  import Header from '@/components/layout/Header'
  import Footer from '@/components/layout/Footer'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'BaseLayout',
    components: {
      Header,
      Footer
    },
    methods: {
      ... mapActions({
        createSuccessAlert: 'alert/createSuccessAlert',
        createSuccessAlert: 'alert/createErrorAlert',
        clearAlert: 'alert/clearAlert'
      })
    },
    computed: {
      ... mapState(['alert'])
    }
  }
</script>