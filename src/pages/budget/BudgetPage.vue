<template>
  <div v-if="event" class="container mt-4">
    <div class="row">
      <div class="col">
        <span class="badge bg-success">Profit: {{ event.profit }}</span>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <span class="badge bg-info">Budget: {{ event.expenses }}</span>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <span>Add expenses</span>
        <button class="btn btn-primary me-2" @click="addExpense('food')">
          Food
        </button>
        <button class="btn btn-secondary me-2" @click="addExpense('rent')">
          Rent
        </button>
        <button class="btn btn-success" @click="addExpense('staff')">
          Staff
        </button>
      </div>
    </div>
  </div>
  <ProfitChart :profit="profit" :expenses="expenses"></ProfitChart>
</template>

<script setup>
import { eventStore } from '../../store/eventStore';
import { computed, watch, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProfitChart from '../../common-templates/ProfitChart.vue'

const eStore = eventStore();
const route = useRoute();

const eventId = computed(() => route.params.id);

const event = computed(() => eStore.choosedEvent);

const price = ref(0);
const profit = ref(0);
const expenses = ref(0);

const updateFinancials = () => {
  if (event.value) {
    profit.value = event.value.profit;
    expenses.value = event.value.expenses;
  }
};

const addExpense = (type) => {
  if (type === 'food') {
    price.value = 25;
  } else if (type === 'staff') {
    price.value = 100;
  } else if (type === 'rent') {
    price.value = 250;
  }

  eStore.addExpenses(price.value);
  // eStore.choosedEvent = eStore.getEventDetails(eventId.value)
};

onMounted(() => {
  eStore.getEventDetails(eventId.value);
});

watch(event, updateFinancials, { immediate: true });
</script>
