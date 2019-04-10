<template>
  <div>
    <UserUpdateModal v-if="isModalVisible" :user="updatedUser" :is-active="isModalVisible" @close="closeModal">
    </UserUpdateModal>
    <Loading :active.sync="isLoading" :is-full-page="false"></loading>
    <data-tables :data="data" :pagination-props="{ pageSizes: [5, 10, 15] }">
      <el-table-column label="Id" align="center" sortable prop="id">
      </el-table-column>
      <el-table-column label="Username" align="center" sortable prop="username">
      </el-table-column>
      <el-table-column label="Fullname" align="center" sortable prop="fullname">
      </el-table-column>
      <el-table-column label="Email" align="center" sortable prop="email">
      </el-table-column>
      <el-table-column label="Role" align="center" sortable prop="level.name">
      </el-table-column>
      <el-table-column label="Actions" align="center">
        <template slot-scope="scope">
          <a @click="updateUser(scope.row)">Update</a>
          <a @click="handleDelete(scope.row.id)">Delete</a>
        </template>
      </el-table-column>
    </data-tables>
  </div>
</template>

<script>
  import UserUpdateModal from '@/components/user/UserUpdateModal'
  import { RepositoryFactory } from '@/repositories/RepositoryFactory'
  import Loading from 'vue-loading-overlay'
  import { mapActions } from 'vuex'

  const userRepository = RepositoryFactory.get('user')
  export default {
    name: 'UserListTable',
    components: {
      Loading,
      UserUpdateModal
    },
    data () {
      return {
        isLoading: true,
        data: [],
        isModalVisible: false,
        updatedUser: {},
      }
    },
    created () {
      userRepository.all()
        .then((resp) => {
          this.data = resp.data.data
          this.isLoading = false
        })
    },
    methods: {
      ... mapActions({
        createSuccessAlert: 'alert/createSuccessAlert'
      }),
      handleDelete (id) {
        const confirmation = confirm(`are you sure delete user where id ${id} ?`)
        if (confirmation) {
          userRepository.delete(id)
            .then((resp) => {
              const index = this.data.findIndex((data) => data.id === id)
              this.data.splice(index, 1)
              this.createSuccessAlert(resp.data.message)
            }).catch((err) => {
              this.createErrorAlert(err.resp.data.message)
            })
        }
      },
      updateUser(user) {
        this.isModalVisible = true
        this.updatedUser = user
      },
      showModal () {
        this.isModalVisible = true
      },
      closeModal () {
        this.isLoading = true
        this.isModalVisible = false
        userRepository.all()
        .then((resp) => {
          this.data = resp.data.data
          this.isLoading = false
        })
      }
    }
  }
</script>