<template>
  <div v-if="event" class="container py-5">
    <div class="d-flex flex-wrap justify-content-center align-items-start">
      <div class="me-4">
        <div class="card shadow-lg border-0 rounded-lg mb-4">
          <div class="card-header bg-dark text-white">
            <h3 class="card-title text-center">Event Financial Summary</h3>
          </div>
          <div class="card-body bg-light">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Profit:</h5>
              <span class="badge rounded-pill badge-profit"
                >${{ event.profit }}</span
              >
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Expenses:</h5>
              <span class="badge rounded-pill badge-expenses"
                >${{ event.expenses }}</span
              >
            </div>
          </div>
        </div>
        <div class="text-center mb-4">
          <h5>Add Expenses</h5>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
          <button
            class="btn btn-food btn-lg px-4 me-md-2"
            @click="addExpense('food')"
          >
            Food
          </button>
          <button
            class="btn btn-rent btn-lg px-4 me-md-2"
            @click="addExpense('rent')"
          >
            Rent
          </button>
          <button
            class="btn btn-staff btn-lg px-4"
            @click="addExpense('staff')"
          >
            Staff
          </button>
        </div>
      </div>

      <div>
        <ProfitChart
          :profit="profit"
          :expenses="expenses"
          style="height: 400px; width: 400px"
        ></ProfitChart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { eventStore } from '../../store/eventStore';
import { computed, watch, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProfitChart from '@/components/Charts/ProfitChart.vue';
import showNotification from '@/utils/notifications/showNotification';

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
  updateFinancials();
  showNotification(`You add an expense for ${type}!`);
};

onMounted(() => {
  eStore.getEventDetails(eventId.value);
});

watch(event, updateFinancials, { immediate: true });
</script>

<style scoped lang="scss">

.badge-profit {
  background-color: $medium-spring-green;
  color: $dark-gray;
  font-weight: bold;
}

.badge-expenses {
  background-color: $candy-apple-red;
  color: $dark-gray;
  font-weight: bold;
}

.btn-food {
  background-color: $vibrant-coral;
  color: $dark-gray;
  font-weight: bold;

  &:hover {
    background-color: #ea3600;
    color: $classic-cream;
  }
}

.btn-rent {
  background-color: $medium-spring-green;
  color: $dark-gray;
  font-weight: bold;

  &:hover {
    background-color: #00d26e;
    color: $classic-cream;
  }
}

.btn-staff {
  background-color: $blue-cola;
  color: $dark-gray;
  font-weight: bold;

  &:hover {
    background-color: #00537c;
    color: $classic-cream;
  }
}
</style>
