<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog custom-modal-dialog">
      <div class="modal-content custom-modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="cancelButton"
          ></button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modalTitle: {
    type: String,
    required: true,
  },
});

const emit = defineEmits();

const cancelButton = () => emit('closeModal');
</script>

<style scoped lang="scss">
.custom-modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
.custom-modal-content {
  border: none;
}

.custom-modal-header {
  background-color: $dark-gray;
  color: $classic-cream;
}
</style>
