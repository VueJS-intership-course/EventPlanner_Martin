import { defineStore } from 'pinia';
import eventServices from '@/services/events/eventServices.js';

export const eventStore = defineStore('events', {
  state: () => ({
    events: null,
    choosedEvent: null,
    isEditing: false,
    editedEvent: {
      id: '',
      name: '',
      description: '',
      date: '',
      time: '',
      location: [],
      ticket: '',
      price: '',
    },
  }),
  getters: {
    getCoordinates(state) {
      return state.choosedEvent.location;
    },
  },
  actions: {
    async getEvents() {
      this.events = await eventServices.getAllEvents();
    },
    async createEvent(eventData) {
      await eventServices.addEvent(eventData);
    },
    async getEventDetails(eventId) {
      try {
        this.choosedEvent = await eventServices.getSingleEvent(eventId);
      } catch (error) {
        console.log(error);
      }
    },
    async editEvent(event) {
        console.log(event);
        try {
          await eventServices.editEvent(event);
          await this.getEvents();
        } catch (error) {
          console.error("Error editing an event:", error);
        }
      },
  },
});
