<template>
  <div :class="['modal', { 'is-active': isActive }]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="header">
          <p class="modal-card-title">{{ cardTitle }}</p>
        </slot>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false
    },
    cardTitle: {
      type: String
    }
  }
}
</script>
