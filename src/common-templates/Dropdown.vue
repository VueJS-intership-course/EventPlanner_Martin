<template>
  <div>
    <select v-model="selectedValue" title="dropdown" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
      <option v-for="zone in zones" :key="zone" :value="zone">{{ zone }}</option>
    </select>
  </div>
</template>

<script setup>
import moment from "moment-timezone";
defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required:true
  }
})

const zones = moment.tz.names();

const selectedValue = '';
const takeValue = () => {
  const selectedZone = selectedValue;
  context.emit('update:modelValue', selectedZone);
}
</script>
