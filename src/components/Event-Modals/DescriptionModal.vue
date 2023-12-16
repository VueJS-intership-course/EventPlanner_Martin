<template>
  <CustomModal modal-title="Edit Event" @closeModal="hideDescriptionModal">
    <div class="modal-body custom-modal-body p-4">
      <p class="mb-0 text-wrap">{{ event.description }}</p>
    </div>
  </CustomModal>
</template>

<script setup>
import { computed } from 'vue';
import { eventStore } from '@/store/eventStore';
import CustomModal from '@/components/Custom-Modal/CustomModal.vue';

const eStore = eventStore();

const event = computed(() => eStore.choosedEvent);

const hideDescriptionModal = () => {
  eStore.showDescription = false;
};
</script>

<style scoped lang="scss">
  .custom-modal-body {
    overflow-wrap: break-word;
    max-height: 400px;
    overflow-y: auto;
    background-color: $lighter-gray;
    color: $classic-cream;
  }
</style>
