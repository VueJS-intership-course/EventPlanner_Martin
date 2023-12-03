<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="edit">Description</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="hideDescriptionModal"
          ></button>
        </div>
        <div class="modal-body p-4">
            <p class="mb-0 text-wrap">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { eventStore } from '../../store/eventStore';

const eStore = eventStore();

const event = computed(() => eStore.choosedEvent);

const hideDescriptionModal = () => {
  eStore.showDescription = false;
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.modal-dialog {
  display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.modal-content {
    border: none;
    .modal-header {
        background-color: $dark-gray;
        color: $classic-cream;
    }
    .modal-body {
        overflow-wrap: break-word;
        max-height: 400px;
        overflow-y: auto; 
        background-color: $lighter-gray;
        color: $classic-cream;
    }
}

.btn-close {
  text-decoration: none;
  color: red;
}
</style>