<!-- <template>
  <div class="container my-4">
    <form @submit.prevent="setFilters" class="row g-3">
      <div class="col-md-2">
        <label for="searchQuery" class="form-label">Search Event:</label>
        <input
          type="text"
          class="form-control"
          id="searchQuery"
          v-model="tempFilterOptions.search"
        />
      </div>
      <div class="col-md-2">
        <label for="fromDate" class="form-label">From Date:</label>
        <input
          type="date"
          class="form-control"
          id="fromDate"
          v-model="tempFilterOptions.fromDate"
        />
      </div>
      <div class="col-md-2">
        <label for="toDate" class="form-label">To Date:</label>
        <input
          type="date"
          class="form-control"
          id="toDate"
          v-model="tempFilterOptions.toDate"
        />
      </div>
      <div class="col-md-2">
        <label for="minPrice" class="form-label">Min Price:</label>
        <input
          type="number"
          class="form-control"
          id="minPrice"
          v-model="tempFilterOptions.minPrice"
        />
      </div>
      <div class="col-md-2">
        <label for="maxPrice" class="form-label">Max Price:</label>
        <input
          type="number"
          class="form-control"
          id="maxPrice"
          v-model="tempFilterOptions.maxPrice"
        />
      </div>
      <div class="col-md-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Apply Filters</button>
      </div>
      <div class="col-md-12 d-flex justify-content-end">
        <button @click="resetFilters" class="btn btn-secondary">
          Reset Filters
        </button>
      </div>
    </form>
  </div>
</template> -->
<template>
    <div class="container my-4">
      <form @submit.prevent="setFilters" class="row g-3 align-items-end">
        <div class="col-lg-4 col-md-6">
          <label for="searchQuery" class="form-label">Search Event:</label>
          <input
            type="text"
            class="form-control"
            id="searchQuery"
            placeholder="Enter event name"
            v-model="tempFilterOptions.search"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="row g-2">
            <div class="col">
              <label for="fromDate" class="form-label">From Date:</label>
              <input
                type="date"
                class="form-control"
                id="fromDate"
                v-model="tempFilterOptions.fromDate"
              />
            </div>
            <div class="col">
              <label for="toDate" class="form-label">To Date:</label>
              <input
                type="date"
                class="form-control"
                id="toDate"
                v-model="tempFilterOptions.toDate"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="row g-2">
            <div class="col">
              <label for="minPrice" class="form-label">Min Price:</label>
              <input
                type="number"
                class="form-control"
                id="minPrice"
                v-model="tempFilterOptions.minPrice"
              />
            </div>
            <div class="col">
              <label for="maxPrice" class="form-label">Max Price:</label>
              <input
                type="number"
                class="form-control"
                id="maxPrice"
                v-model="tempFilterOptions.maxPrice"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-12 d-flex justify-content-lg-end justify-content-center mt-3">
          <button type="submit" class="btn btn-primary me-2">Apply Filters</button>
          <button @click="resetFilters" class="btn btn-outline-secondary">
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  </template>

<script setup>
import { eventStore } from '../store/eventStore';
import { ref } from 'vue';

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
</script>

<style scoped>
.container {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .form-label {
    font-weight: bold;
    color: #333;
  }
  .btn-primary {
    background-color: #0056b3;
    border-color: #004085;
  }
  .btn-outline-secondary {
    border-color: #6c757d;
    color: #6c757d;
  }
  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #fff;
  }
</style>