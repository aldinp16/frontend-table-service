<template>
  <BaseLayout>
    <div class="columns">
      <div class="content column has-text-centered-mobile">
        <h2>List Menu</h2>
      </div>
      <div class="column has-text-centered-mobile has-text-right-desktop">
        <button @click="showAddModal = true" class="button is-success has-text-right">Create Menu</button>
      </div>
    </div>
    <MenuList @onUpdate="handleUpdate"/>
    <MenuUpdateModal
      v-if="showModal"
      :isActive="showModal"
      :menu="menu"
      @close="showModal = false" />
    <MenuAddModal :isActive="showAddModal" @close="showAddModal = false"/>
  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/layout/BaseLayout'
  import MenuList from '@/components/menu/MenuList'
  import MenuUpdateModal from '@/components/menu/MenuUpdateModal'
  import MenuAddModal from '@/components/menu/MenuAddModal'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'Menu',
    components: {
      BaseLayout,
      MenuList,
      MenuUpdateModal,
      MenuAddModal
    },
    data() {
      return {
        menu: {},
        showAddModal: false,
        showModal: false,
      }
    },
    methods: {
      handleUpdate(val) {
        this.menu = val
        this.showModal = true
      }
    }
  }
</script>