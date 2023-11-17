<template>
  <div class="container mt-4">
    <FullCalendar
      class="container-calendar"
      :options="calendarOptions"
      :key="props.userEvents"
    >
      <template v-slot:eventContent="arg">
        <div
          class="event"
          @click="goToDetailsPage(arg.event.id)"
          style="background-color: #3788d8; width: 100%; border-radius: 5px; cursor: pointer;"
        >
          <!-- <b style="color: white; font-size: 10px;">{{ arg.timeText }}</b -->
          <i style="color: black">{{ arg.event.title }}</i>
        </div>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {useRouter} from 'vue-router';

const router = useRouter();

const props = defineProps({
  userEvents: {
    type: Array,
    required: true,
  },
});

const goToDetailsPage = (eventId) => {
  router.push({ name: 'event', params: { id: eventId } });
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  timeZone: 'UTC',
  firstDay: 1,
  events: props.userEvents,
  contentHeight: 'auto',
});

watch(
  () => props.userEvents,
  (newValue) => {
    calendarOptions.events = newValue;
  }
);
</script>

<style scoped>
.event {
  overflow: hidden;
  font-size: 14px;
}
/* 
.container-calendar {
  font-size: 16px;
}
.fc-header-title h2 {
  font-size: 1em;
  white-space: normal !important;
}
.fc-view-agendaWeek .fc-event-vert {
  font-size: 0;
  overflow: hidden;
  width: 2px !important;
}
.fc-agenda-axis {
  width: 20px !important;
  font-size: 0.7em;
} */
</style>
