<template>
  <div class="container my-4">
    <Form
      @submit="setFilters"
      :validation-schema="schema"
      class="row g-3 mb-4"
      :validateOnBlur="false"
      :validateOnChange="false"
      :validateOnInput="false"
    >
      <div class="col-sm">
        <CustomInput
          label="Search Event:"
          name="searchQuery"
          type="text"
          field-type="searchQuery"
          placeholder-value="Search..."
          v-model="tempFilterOptions.search"
        />
      </div>
      <div class="col-sm">
        <CustomInput
          label="From Date:"
          name="fromDate"
          type="date"
          field-type="fromDate"
          v-model="tempFilterOptions.fromDate"
        />
      </div>
      <div class="col-sm">
        <CustomInput
          label="To Date:"
          name="toDate"
          type="date"
          field-type="toDate"
          v-model="tempFilterOptions.toDate"
        />
      </div>
      <div class="col-sm">
        <CustomInput
          label="Min Price:"
          name="minPrice"
          type="number"
          field-type="minPrice"
          placeholder-value="Min price..."
          v-model="tempFilterOptions.minPrice"
        />
      </div>
      <div class="col-sm">
        <CustomInput
          label="Max Price:"
          name="maxPrice"
          type="number"
          field-type="maxPrice"
          placeholder-value="Max price..."
          v-model="tempFilterOptions.maxPrice"
        />
      </div>
      <div class="col-lg-4 mt-5">
        <button type="submit" class="btn btn-apply me-3">Apply Filters</button>
        <button @click="resetFilters" class="btn btn-reset">
          <i class="bi bi-arrow-counterclockwise"></i>Reset Filters
        </button>
        <button class="btn btn-cancel ms-3" @click="cancel">
          <i class="bi bi-x-circle"></i> Cancel
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { eventStore } from '@/store/eventStore';
import { ref } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import CustomInput from '@/components/Custom-Input/CustomInput.vue';

const schema = yup.object({
  fromDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(yup.ref('toDate'), 'Date must be before to To date!'),
  toDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(yup.ref('fromDate'), 'Date must be after to From date!'),
  minPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(0, 'The price must be at least 0')
    .when('maxPrice', (maxPrice, schema) =>
      maxPrice
        ? schema.max(
            maxPrice,
            'The price should be less than the maximum price'
          )
        : schema
    ),
  maxPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(
      yup.ref('minPrice'),
      'The price should be more than the minimal price'
    ),
});

const eStore = eventStore();

const tempFilterOptions = ref({
  search: '',
  fromDate: '',
  toDate: '',
  minPrice: '',
  maxPrice: '',
});

const setFilters = () => {
  eStore.filteredEvent = { ...tempFilterOptions.value };
  eStore.applyFilters();
  eStore.isToggleFilters = false;
};

const resetFilters = () => {
  tempFilterOptions.value = {
    search: '',
    fromDate: '',
    toDate: '',
    minPrice: '',
    maxPrice: '',
  };

  eStore.resetFilters();
};

const cancel = () => {
  eStore.isToggleFilters = false;
};
</script>

<style scoped lang="scss">
.container {
  // background-color: #f8f9fa;
  background-color: $lighter-gray;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .btn-apply {
    background-color: $blue-cola;
    color: $dark-gray;
    font-weight: bold;

    &:hover {
      background-color: #00537c;
      color: $classic-cream;
    }
  }

  .btn-cancel {
    background-color: $candy-apple-red;
    color: $dark-gray;
    font-weight: bold;

    &:hover {
      background-color: #8d0016;
      color: $classic-cream;
    }
  }

  .btn-reset {
    background-color: $classic-cream;
    color: $lighter-gray;
    font-weight: bold;

    &:hover {
      background-color: #8d0016;
      color: $classic-cream;
    }
  }
}
</style>
