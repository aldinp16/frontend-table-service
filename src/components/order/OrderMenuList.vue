<template>
  <div class="columns is-multiline">
    <div class="column is-3" v-for="item in createOrder.menus">

      <div class="card" style="height: 100%; display: flex; flex-direction: column;">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="`http://localhost:3333/image/${item.image}`" alt="Placeholder image">
          </figure>
        </div>

        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ item.name }}</p>
              <p class="subtitle is-6">
                <span v-if="item.status" class="tag is-success">Avaible</span>
                <span v-else class="tag is-danger">Not Avaible</span>
              </p>
            </div>
          </div>
          <div class="content">
            {{ item.description }}
          </div>
        </div>

        <footer class="card-footer" style="margin-top: auto;">
          <span v-if="!item.status || item.lock" class="card-footer-item has-text-centered">
            Order (Rp. {{ item.price }})
          </span>
          <a @click="addItem(item.id)" v-else class="card-footer-item has-text-centered">
            Order (Rp. {{ item.price }})
          </a>
        </footer>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'OrderMenuList',
    computed: {
      ... mapState(['createOrder'])
    },
    methods: {
      ... mapActions({
        getAllMenu: 'createOrder/getAllMenu',
        addItem: 'createOrder/addItem'
      })
    },
    created () {
      this.getAllMenu()
    }
  }
</script>