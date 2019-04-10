<template>
  <Modal :is-active="isActive" :card-title="`Update Menu ${menu.name} #${menu.id}`">
    <Loading :active.sync="isLoading" :is-full-page="false"></loading>

    <div class="content">
      <figure class="image">
        <img class="is-rounded" :src="fileUrl" />
      </figure>
    </div>

    <div class="field">
      <label class="label">Image</label>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input class="file-input" type="file" ref="file" @change="handleFileUpload">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {{ menu_pic.name }}
          </span>
        </label>
      </div>
    </div>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input v-model="editedMenu.name" pattern=".{6,}" class="input" type="text" placeholder="Name">
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea v-model="editedMenu.description" class="textarea has-fixed-size" placeholder="Description"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Price (Rp)</label>
      <div class="control">
        <input v-model="editedMenu.price" class="input" type="number" placeholder="Price">
      </div>
    </div>

    <div class="field">
      <label class="label">Status</label>
      <div class="control">
        <div class="select">
          <select v-model="editedMenu.status">
            <option value="1">Avaible</option>
            <option value="0">Not Avaible</option>
          </select>
        </div>
      </div>
    </div>

    <template slot="footer">
      <button @click="handleSubmit" class="button is-success">Submit</button>      
      <button @click="close" class="button">Cancel</button>
    </template>

  </Modal>  
</template>

<script>
  import Modal from '@/components/ui/Modal'
  import Loading from 'vue-loading-overlay'
  import { RepositoryFactory } from '@/repositories/RepositoryFactory'
  import { mapActions, mapState } from 'vuex'
  // const menuRepository = RepositoryFactory.get('menu')
  
  export default {
    name: 'MenuUpdateModal',
    props: ['isActive', 'menu'],
    components: {
      Modal,
      Loading
    },
    data () {
      return {
        isLoading: false,
        editedMenu: { ... this.menu },
        fileUrl: `http://localhost:3333/image/${this.menu.image}`,
        menu_pic: {}
      }
    },
    methods: {
      ... mapActions({
        menuUpdate: 'menu/menuUpdate'
      }),
      close () {
        this.$emit('close')
      },
      handleSubmit () {
        this.isLoading = true
        const payload = {}
        payload.id = this.menu.id
        payload.data = {
          name: this.editedMenu.name,
          description: this.editedMenu.description,
          price: this.editedMenu.price,
          status: this.editedMenu.status,
          menu_pic: this.menu_pic
        }
        this.menuUpdate(payload)
          .then(() => {
            this.isLoading = false
            this.close()
          }).catch(() => {
            this.isLoading = false
          })
      },
      handleFileUpload () {
        this.menu_pic = this.$refs.file.files[0]
        this.fileUrl = URL.createObjectURL(this.menu_pic)
      }
    }
  }
</script>