<template>
  <BaseLayoutAuth>

    <Loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="columns">
      <div class="column column is-4 is-offset-4">
      <div class="card">
        <header class="card-header">
          <h2 class="card-header-title">Login</h2>
        </header>
        <div class="card-content">
          <div v-show="alert.status" :class="['notification', alert.type]"> {{ alert.message }}</div>
          <form @submit.prevent="handleLoginForm">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="me@aldi.dev" v-model="email" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="password" v-model="password" required>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :disabled="isLoading">Login</button>
              </div>
            </div>
          </form>

        </div>
      </div>

      </div>
    </div>

  </BaseLayoutAuth>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import BaseLayoutAuth from '@/components/layout/BaseLayoutAuth'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css'

  export default {
    name: 'Auth',
    components: {
      BaseLayoutAuth,
      Loading
    },
    data () {
      return {
        email: null,
        password: null,
      }
    },
    computed: {
      ... mapState(['auth', 'alert']),
      isLoading () {
        return this.auth.status === 'loading'
      }
    },
    methods: {
      ... mapActions({
        login: 'auth/login',
        logout: 'auth/logout'
      }),
      handleLoginForm () {
        this.login({
          email: this.email,
          password: this.password
        }).then(() => {
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        })
      }
    }
  }
</script>