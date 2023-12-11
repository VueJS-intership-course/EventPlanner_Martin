<template>
  <div class="mb-4">
    <label :for="fieldType" class="form-label"
      >{{ label }}<span v-if="isRequired" class="text-danger">*</span></label
    >
    <Field
      :id="fieldType"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholderValue"
      @input="updateFieldValue"
      class="form-control"
      autocomplete="on"
    />
    <ErrorMessage :name="name" class="text-danger position-absolute" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
  label: String,
  type: String,
  fieldType: String,
  placeholderValue: String,
  isRequired: Boolean,
  modelValue: [String, Number, Date],
  name: {type: String, default: ''},
});

const emit = defineEmits();

const updateFieldValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style lang="scss" scoped>
label {
  color: $classic-cream;
}
</style>
