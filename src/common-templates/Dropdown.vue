<template>
  <div>
    <input v-model="selectedValue" title="dropdown" @input="filterZones" @click.stop="toggleDropdown"
      placeholder="Enter location..." class="form-control" />
    <div class="custom-dropdown" v-show="showDropdown">
      <div v-for="zone in filteredZones" :key="zone" @click="selectZone(zone)" class="dropdown-item">
        {{ zone }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import moment from "moment-timezone";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const zones = moment.tz.names();
const selectedValue = ref('');
const filteredZones = ref(zones);
const showDropdown = ref(false);

const filterZones = computed(() => {
  if (!selectedValue.value) {
    filteredZones.value = zones;
  } else {
    const searchTerm = selectedValue.value.toLowerCase();
    filteredZones.value = zones.filter(zone => zone.toLowerCase().includes(searchTerm));
  }
  showDropdown.value = true;
});

const emit = defineEmits()

const selectZone = (zone) => {
  selectedValue.value = zone;
  showDropdown.value = false;
  emit('update:modelValue', zone);
}

const toggleDropdown = () => {
  showDropdown.value = false;
}
</script>

<style scoped>
.custom-dropdown {
  position: absolute;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  background-color: white;
  width: 95%;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>

