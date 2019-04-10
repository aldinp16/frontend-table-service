<template>
  <div class="columns is-multiline">
    <Loading :active.sync="isLoading" :is-full-page="true"></loading>    
    <div class="column is-3" v-for="item in menu.menulist" :key="item.id">
      
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
          <a @click="handleUpdate(item)" class="card-footer-item has-text-centered">Update</a>
          <a @click="handleDelete(item.id)" class="card-footer-item has-text-centered">Delete</a>
        </footer>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import Loading from 'vue-loading-overlay'

  export default {
    name: 'MenuList',
    data () {
      return {
        isLoading: false
      }
    },
    components: {
      Loading
    },
    computed: {
      ... mapState(['menu'])
    },
    methods: {
      ... mapActions({
        getMenuList: 'menu/getMenuList',
        menuDelete: 'menu/menuDelete'
      }),
      handleUpdate(item) {
        this.$emit('onUpdate', item)
      },
      handleDelete (id) {
        this.isLoading = true
        this.menuDelete(id)
          .then(() => {
            this.isLoading = false
          }).catch(() => {
            this.isLoading = false
          })
      }
    },
    created () {
      this.getMenuList()
    }
  }
</script>