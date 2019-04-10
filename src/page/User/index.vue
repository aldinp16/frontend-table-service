<template>
  <BaseLayout>
    <div class="content">
      <h2>List User</h2>
    </div>
    <UserListTable />
  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/layout/BaseLayout'
  import UserListTable from '@/components/user/UserListTable'

  export default {
    name: 'User',
    components: {
      BaseLayout,
      UserListTable
    }
  }
</script>