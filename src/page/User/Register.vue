<template>
  <BaseLayout>
    <Loading :active.sync="isLoading" :is-full-page="true"></loading>
    <div class="content has-text-centered">
      <h2>Register User</h2>
    </div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="card">
          <div class="card-content">
            <form @submit.prevent="addUser">
              <div class="field">
                <label class="label">Full Name</label>
                <div class="control">
                  <input v-model="fullname" class="input" type="text" placeholder="e.g Aldi Nugraha"  pattern=".{6,}" title="8 characters minimum" required>
                </div>
              </div>
              <div class="field">
                <label class="label">username</label>
                <div class="control">
                  <input v-model="username" class="input" type="text" placeholder="e.g aldinp16" pattern=".{6,}" title="8 characters minimum" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input v-model="email" class="input" type="email" placeholder="e.g. me@aldi.dev" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input pattern=".{6,}" title="8 characters minimum" v-model="password" class="input" type="Password" placeholder="e.g. isPassword1234" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <div class="select">
                    <select v-model="level">
                      <option disabled value="">Please select one</option>
                      <option v-for="level in levels"> {{ level }} </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" :disabled="isLoading">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </BaseLayout>
  </div>

  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/layout/BaseLayout'
  import Loading from 'vue-loading-overlay'
  import { RepositoryFactory } from '@/repositories/RepositoryFactory'
  import { mapState, mapActions } from 'vuex'
  const userRepository = RepositoryFactory.get('user')

  export default {
    name: 'UserRegister',
    components: {
      Loading,
      BaseLayout
    },
    data () {
      return {
        isLoading: false,
        fullname: '',
        username: '',
        email: '',
        password: '',
        level: 'pelanggan'
      }
    },
    computed: {
      ... mapState(['auth']),
      levels () {
        return (this.auth.userData.data.level.name === 'administrator')
          ? ['administrator', 'waiter', 'kasir', 'owner', 'pelanggan']
          : ['pelanggan']
      }
    },
    methods: {
      ... mapActions({
        createSuccessAlert: 'alert/createSuccessAlert',
        createErrorAlert: 'alert/createErrorAlert'
      }),
      addUser () {
        this.isLoading = true
        userRepository.create({
          fullname: this.fullname,
          username: this.username,
          email: this.email,
          password: this.password,
          level: this.level
        }).then((response) => {
          this.createSuccessAlert(response.data.message)
          this.isLoading = false
        }).catch((err) => {
          const errMessage = `${err.response.data.message}: ${err.response.data.data[0].message}`
          this.createErrorAlert(errMessage)
          this.isLoading = false
        })
      }
    }
  }
</script>