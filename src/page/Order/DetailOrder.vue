<template>
  <BaseLayout>
    <Loading :active.sync="isLoading" :is-full-page="true"></loading>
    <div class="content">
      <h2>Order Detail #{{ orderId }}</h2>
      <div class="columns">
        <div class="column">
          <strong>Billed To:</strong><br />
          {{ user.fullname }}<br />
        </div>
        <div class="column">
          <strong>Order Description:</strong><br />
          {{ description || '-' }}<br />
        </div>
        <div class="column">
          <strong>Table:</strong><br />
          No. {{ noTable }}
        </div>
        <div class="column">
          <strong>Date:</strong><br />
          {{ date }}
        </div>
        <div class="column">
          <strong>Status:</strong><br />
          <span v-if="status" class="tag is-success">Success</span>
          <span v-else class="tag is-primary">Process</span>
        </div>
        <div class="column" v-if="roles('administrator', 'kasir', 'waiter', 'owner')">
          <strong>Generate PDF</strong><br />
          <button @click="createPDF" class="button">Generate</button>
        </div>
      </div>
      <table class="table" style="width: 100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th v-if="roles('administrator', 'waiter')">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td>{{ item.menu.name }}</td>
            <td>{{ item.description || '-' }}</td>
            <td>{{ item.total }}</td>
            <td>Rp. {{ item.menu.price * item.total }}</td>
            <td>
              <span v-if="item.status" class="tag is-success">Success</span>
              <span v-else class="tag is-primary">Process</span>
            </td>
            <td v-if="roles('administrator', 'waiter')">
              <button
                @click="handleDone(item.id)"
                class="button is-success"
                :disabled="item.status > 0">Done</button>
            </td>
          </tr>
        </tbody>

        <tfoot v-if="roles('administrator','kasir') && transaction">
          <th></th>
          <th></th>
          <th>Change</th>
          <th>Rp. {{ transaction.total_paid - transaction.total_price }}</th>
          <th></th>
        </tfoot>

        <tfoot>
          <th></th>
          <th></th>
          <th>Total</th>
          <th>Rp. {{ total }}</th>
          <th></th>
          <th v-if="roles('administrator', 'kasir')"></th>
        </tfoot>

        <tfoot v-if="roles('administrator', 'kasir')">
          <th></th>
          <th></th>
          <th>Paid</th>
          <th>Rp.
            <template v-if="!transaction">
              <input v-model="totalPaid" type="number" min="1">
              <button :disabled="!allOrderDetailisDone" @click="handlePaid" class="tag is-success">Paid</button>
            </template> 
            <template v-else> {{ transaction.total_paid }}</template>
          </th>
          <th></th>
        </tfoot>

      </table>
    </div>
  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/layout/BaseLayout'
  import Loading from 'vue-loading-overlay'
  import { mapState, mapGetters } from 'vuex'
  import { RepositoryFactory } from '@/repositories/RepositoryFactory'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  const orderRepository = RepositoryFactory.get('order')

  export default {
    name: 'DetailOrder',
    components: {
      BaseLayout,
      Loading
    },
    data () {
      return {
        isLoading: true,
        date: '',
        status: null,
        orderId: '',
        items: [],
        description: '',
        noTable: '',
        user: {},
        resp: {},
        transaction: {},
        totalPaid: 0,
      }
    },
    computed: {
      ... mapState(['auth']),
      ... mapGetters({
        role: 'auth/role'
      }),
      total () {
        return this.items.map((item) => item.total * item.menu.price).reduce((a,b) => a + b, 0)
      },
      allOrderDetailisDone () {
        return !this.items.some((item) => !item.status)
      }
    },
    created () {
      orderRepository.find(this.$route.params.id)
        .then((resp) => {
          this.status = resp.data.data.status
          this.orderId = resp.data.data.id
          this.noTable = resp.data.data.no_table
          this.description = resp.data.data.description
          this.date = resp.data.data.created_at
          this.resp = resp.data.data
          this.user = resp.data.data.user
          this.items = resp.data.data.orderDetail
          this.transaction = resp.data.data.transaction
          this.isLoading = false
        }).catch((err) => {
          if (err.response.status === 404) {
            return this.$router.push('/404')
          }
        })
    },
    methods: {
      roles (... roles) {
        return roles.includes(this.role)
      },
      handleDone (id) {
        this.isLoading = true
        orderRepository.doneOrderId(this.orderId ,{ order_id: id })
          .then((resp) => {
            if (!resp.data.err) {
              const items = this.items.find((item) => item.id === id)
              items.status = 1
              this.isLoading = false
            }
          })
      },
      handlePaid () {
        this.isLoading = true
        orderRepository.transactions(this.orderId, { total_paid: this.totalPaid })
          .then((resp) => {
            this.status = true
            this.transaction = resp.data.data
            this.isLoading = false
          })
      },
      createPDF () {
        const doc = new jsPDF()
        const rows = this.items.map((item) => {
          return [
            item.menu.name,
            item.description || '-',
            item.total,
            'Rp. ' + item.total * item.menu.price]
        })
        doc.setFont("helvetica")
        doc.text([
          'Aplikasi Kasir'
        ], 15, 15)
        doc.setFontType("bold")
        doc.setFontSize(9)
        doc.text([
          this.user.fullname,
          this.user.email,
          this.date,
          'Table no ' + this.noTable
        ], 15, 30)
        doc.setFontSize(30)
        doc.text([`Order #${this.orderId}`], 130, 20)
        doc.autoTable({
          head: [['Name', 'Description', 'Quantity', 'Price']],
          body: rows,
          margin: { top: 45 }
        })
        doc.setFontSize(20)
        doc.text(['Status: '], 15, doc.autoTable.previous.finalY + 10)
        doc.text([`${this.transaction === null ? 'Unpaid' : 'Paid'}`], 40, doc.autoTable.previous.finalY + 10)
        doc.text(['Total'], 115, doc.autoTable.previous.finalY + 10)
        doc.text([`Rp. ${this.total}`], 145, doc.autoTable.previous.finalY + 10)
        if (this.transaction !== null) {
          doc.text(['Paid'], 115, doc.autoTable.previous.finalY + 30)
          doc.text([`Rp. ${this.transaction.total_paid}`], 145, doc.autoTable.previous.finalY + 30)
          doc.text(['Change'], 115, doc.autoTable.previous.finalY + 40)
          doc.text([`Rp. ${this.transaction.total_paid - this.transaction.total_price}`], 145, doc.autoTable.previous.finalY + 40)
        }
        doc.save(`${this.orderId}-${this.date}-${this.noTable}.pdf`)
      }
    }
  }
</script>