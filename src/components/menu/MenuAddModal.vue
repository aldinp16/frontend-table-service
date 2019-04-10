<template>
  <Modal :is-active="isActive" card-title="Add Menu">
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
          <input class="file-input" type="file" ref="file" @change="handleFileUpload" required>
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
        <input v-model="name" pattern=".{6,}" class="input" type="text" placeholder="Name" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea v-model="description" class="textarea has-fixed-size" placeholder="Description" required></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Price (Rp)</label>
      <div class="control">
        <input v-model="price" class="input" type="number" placeholder="Price" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Status</label>
      <div class="control">
        <div class="select">
          <select v-model="status">
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
    name: 'MenuAddModal',
    props: ['isActive'],
    components: {
      Modal,
      Loading
    },
    data () {
      return {
        isLoading: false,
        fileUrl: '',
        name: '',
        description: '',
        status: 1,
        price: '',
        menu_pic: {}
      }
    },
    methods: {
      ... mapActions({
        menuAdd: 'menu/menuAdd'
      }),
      close () {
        this.$emit('close')
      },
      handleSubmit () {
        this.isLoading = true
        const payload = {
          name: this.name,
          description: this.description,
          price: this.price,
          status: this.status,
          menu_pic: this.menu_pic
        }
        this.menuAdd(payload)
          .then(() => {
            this.isLoading = false
            this.fileUrl = ''
            this.name = ''
            this.description = ''
            this.status = ''
            this.price = ''
            this.menu_pic = {}
            this.close()
          }).catch(() => {
            this.isLoading = false
            this.close()
          })
      },
      handleFileUpload () {
        this.menu_pic = this.$refs.file.files[0]
        this.fileUrl = URL.createObjectURL(this.menu_pic)
      }
    }
  }
</script>