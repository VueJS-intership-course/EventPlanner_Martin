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
        <label for="searchQuery" class="form-label">Search Event:</label>
        <Field
          type="text"
          name="search"
          class="form-control"
          id="searchQuery"
          placeholder="Enter event name"
          v-model="tempFilterOptions.search"
        />
      </div>
      <div class="col-sm">
        <label for="fromDate" class="form-label">From Date:</label>
        <Field
          type="date"
          name="fromDate"
          class="form-control"
          id="fromDate"
          v-model="tempFilterOptions.fromDate"
        />
        <ErrorMessage name="fromDate" class="text-danger" />
      </div>
      <div class="col-sm">
        <label for="toDate" class="form-label">To Date:</label>
        <Field
          type="date"
          name="toDate"
          class="form-control"
          id="toDate"
          v-model="tempFilterOptions.toDate"
        />
        <ErrorMessage name="toDate" class="text-danger" />
      </div>
      <div class="col-sm">
        <label for="minPrice" class="form-label">Min Price:</label>
        <Field
          type="number"
          name="minPrice"
          class="form-control"
          id="minPrice"
          v-model="tempFilterOptions.minPrice"
        />
        <ErrorMessage name="minPrice" class="text-danger" />
      </div>
      <div class="col-sm">
        <label for="maxPrice" class="form-label">Max Price:</label>
        <Field
          type="number"
          name="maxPrice"
          class="form-control"
          id="maxPrice"
          v-model="tempFilterOptions.maxPrice"
        />
        <ErrorMessage name="maxPrice" class="text-danger" />
      </div>
      <div
        class="col-lg-4 mt-5"
      >
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
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

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
@import '@/styles/variables.scss';

.container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .form-label {
    font-weight: bold;
    color: #333;
  }

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
    background-color: $lighter-gray;
    color: $classic-cream;
    font-weight: bold;

    &:hover {
      background-color: #8d0016;
      color: $classic-cream;
    }
  }
}
</style>
