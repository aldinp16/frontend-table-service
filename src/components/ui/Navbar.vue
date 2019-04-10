<template>
  <nav class="navbar" role="navigation">

    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <h1 class="navbar-item has-text-weight-bold">Aplikasi Kasir</h1>
      </a>
    </div>

    <div class="navbar-menu">
      <router-link
        :to="{ name: 'Order' }"
        class="navbar-item">Home</router-link>
      <router-link
        v-if="roles('administrator', 'waiter', 'pelanggan')"
        :to="{ name: 'CreateOrder' }"
        class="navbar-item">Order</router-link>
      <router-link
      v-if="roles('administrator')"
      :to="{ name: 'Menu' }"
      class="navbar-item">Menu</router-link>

      <div class="navbar-start">
        <div
          v-if="roles('administrator', 'waiter', 'kasir')"
          class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">User</a>
          <div class="navbar-dropdown">
            <router-link
              v-if="roles('administrator', 'waiter', 'kasir')"
              :to="{ name: 'UserRegister' }"
              class="navbar-item">Create User</router-link>
            <router-link
              v-if="roles('administrator')"
              :to="{ name: 'User' }"
              class="navbar-item">List User</router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-text-weight-light">
          {{ auth.userData.data.fullname }} ({{ role }})
        </div>
        <div class="navbar-item">
          <button @click="handleLogout" class="button">Logout</button>
        </div>
      </div>

    </div>

  </nav>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'

  export default {
    name: 'Navbar',
    computed: {
      ... mapGetters({
        role: 'auth/role'
      }),
      ... mapState(['auth'])
    },
    methods: {
      ... mapActions({
        logout: 'auth/logout'
      }),
      roles (... roleList) {
        return roleList.includes(this.role)
      },
      handleLogout () {
        this.logout().then(() => this.$router.push('/auth'))
      }
    }
  }
</script>