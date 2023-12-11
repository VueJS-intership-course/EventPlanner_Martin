<template>
  <div class="container">
    <FullCalendar
      class="container-calendar custom-container"
      :options="calendarOptions"
      :key="props.userEvents"
    >
      <template v-slot:eventContent="arg">
        <div
          class="event"
          @click="goToDetailsPage(arg.event.id)"
          style="
            background-color: #3788d8;
            width: 100%;
            border-radius: 5px;
            cursor: pointer;
          "
        >
          <b>{{ arg.timeText }}</b
          >&nbsp;
          <i>{{ arg.event.title }}</i>
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
import { useRouter } from 'vue-router';

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
  dayCellDidMount: function (info) {
    const dayNumberElement = info.el.querySelector('.fc-daygrid-day-number');
    if (dayNumberElement) {
      dayNumberElement.style.color = '#00ADB5';
    }
  },
  dayHeaderContent: (args) => {
    return {
      html: `<div class='custom-weekday-header' style='color: #00ADB5;'>${args.text}</div>`
    };
  },
});

watch(
  () => props.userEvents,
  (newValue) => {
    calendarOptions.events = newValue;
  }
);
</script>

<style scoped lang="scss">
.custom-container {
  background-color: $dark-gray;
  color: $vibrant-teal;
}
.event {
  overflow: hidden;

  b {
    color: white; font-size: 10px
  }

  i {
    color: black;
  }
}
</style>
