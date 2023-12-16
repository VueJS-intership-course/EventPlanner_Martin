<template>
  <div>
    <label for="location" class="form-label label"
      >Location<span class="text-danger">*</span></label
    >
    <input
      v-model="selectedValue"
      title="dropdown"
      @input="filterZones"
      @click.stop="toggleDropdown"
      placeholder="Enter location..."
      class="form-control"
    />
    <ul class="custom-dropdown" v-show="showDropdown">
      <li
        v-for="zone in filteredZones"
        :key="zone"
        @click="selectZone(zone)"
        :class="{ active: zone === selectedValue }"
        class="dropdown-item"
      >
        {{ zone }}
      </li>
    </ul>
    <span v-show="showError" class="text-danger position-absolute"
      >Please choose location!</span
    >
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import moment from 'moment-timezone';

const showError = ref(false);
const zones = moment.tz.names();
const selectedValue = ref('');
const filteredZones = ref(zones);
const showDropdown = ref(false);

const filterZones = computed(() => {
  if (!selectedValue.value) {
    filteredZones.value = zones;
  } else {
    const searchTerm = selectedValue.value.toLowerCase();
    filteredZones.value = zones.filter((zone) =>
      zone.toLowerCase().includes(searchTerm)
    );
  }
  showDropdown.value = true;
});

const emit = defineEmits();

const selectZone = (zone) => {
  selectedValue.value = zone;
  showDropdown.value = false;
  emit('update:modelValue', zone);
  emit('selectZone', zone);
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>

<style scoped lang="scss">
div {
  background-color: $lighter-gray;
}
.label {
  color: $classic-cream;
}
.custom-dropdown {
  position: absolute;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  background-color: white;
  width: 94%;
  padding: 0;
  border-radius: 10px;

  .dropdown-item {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }

  }
  .active {
    background-color: #f0f0f0; 
    color: #333;
  }
}
</style>
