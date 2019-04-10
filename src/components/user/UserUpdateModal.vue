<template>
  <Modal :is-active="isActive" :card-title="`Update user ${user.username} (${user.id})`">
    <Loading :active.sync="isLoading" :is-full-page="false"></loading>
    <div v-show="alert.status" :class="['notification', alert.type]"> {{ alert.message }}</div>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input pattern=".{6,}" v-model="fullname" class="input" type="text" placeholder="fullname">
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="email" class="input" type="email" placeholder="email">
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model="password" class="input" type="password" placeholder="password">
      </div>
    </div>

    <select v-model="level">
      <option>administrator</option>
      <option>owner</option>
      <option>kasir</option>
      <option>waiter</option>
      <option>pelanggan</option>
    </select>

    <template slot="footer">
      <button @click="update" class="button is-success">Update</button>
      <button @click="close" class="button">Cancel</button>      
    </template>
  </Modal>
</template>

<script>
  import Modal from '@/components/ui/Modal'
  import { RepositoryFactory } from '@/repositories/RepositoryFactory'
  import Loading from 'vue-loading-overlay'
  import { mapActions, mapState } from 'vuex'

  const userRepository = RepositoryFactory.get('user')
  export default {
    name: 'UserUpdateModal',
    props: ['isActive', 'user'],
    components: {
      Modal,
      Loading
    },
    data () {
      return {
        isLoading: false,
        fullname: '',
        email: '',
        password: '',
        level: this.user.level.name
      }
    },
    computed: {
      ... mapState(['alert'])
    },
    methods: {
      ... mapActions({
        createSuccessAlert: 'alert/createSuccessAlert',
        createErrorAlert: 'alert/createErrorAlert'
      }),
      close () {
        this.$emit('close')
      },
      update () {
        this.isLoading = true
        const body = {}
        if (this.fullname.length > 0) {
          body.fullname = this.fullname
        }

        if (this.email.length > 0) {
          body.email = this.email
        }

        if (this.password.length > 0) {
          body.password = this.password
        }

        if (this.level.length > 0) {
          body.level = this.level
        }

        userRepository.update(this.user.id, body)
          .then((resp) => {
            this.createSuccessAlert(resp.data.message)
            this.$emit('close')
            this.isLoading = false
          }).catch((err) => {
            const errMessage = `${err.response.data.message}: ${err.response.data.data[0].message}`
            this.createErrorAlert(errMessage)
            this.isLoading =  false
          })
      }
    }
  }
</script>