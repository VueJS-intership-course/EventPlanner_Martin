<template>
  <div class="container my-4">
    <Form
      @submit="setFilters"
      :validation-schema="schema"
      class="row g-3 align-items-end"
      :validateOnBlur="false"
      :validateOnChange="false"
      :validateOnInput="false"
    >
      <div class="col-lg-4 col-md-6">
        <label for="searchQuery" class="form-label">Search Event:</label>
        <Field
          type="text"
          name="search"
          class="form-control"
          id="searchQuery"
          placeholder="Enter event name"
          v-model="tempFilterOptions.search"
        />
        <ErrorMessage name="search" class="text-danger" />
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="row g-2">
          <div class="col">
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
          <div class="col">
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
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="row g-2">
          <div class="col">
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
          <div class="col">
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
        </div>
      </div>
      <div
        class="col-lg-12 d-flex justify-content-lg-end justify-content-center mt-3"
      >
        <button type="submit" class="btn btn-apply me-2">Apply Filters</button>
        <button @click="resetFilters" class="btn btn-reset">
          <i class="bi bi-arrow-counterclockwise"></i>Reset Filters
        </button>
        <button class="btn btn-cancel ms-2" @click="cancel">
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
  search: yup.string(),
  fromDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(new Date(), 'You can not select date, which is in the past!')
    .max(yup.ref('toDate'), 'From date must be before To date!'),
  toDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  minPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(0, 'The minimal price must be at least 0')
    .when('maxPrice', (maxPrice, schema) =>
      maxPrice
        ? schema.max(
            maxPrice,
            'The minimal price should be less than the maximum price'
          )
        : schema
    ),
  maxPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(
      yup.ref('minPrice'),
      'The maximum price should be more than the minimal price'
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
