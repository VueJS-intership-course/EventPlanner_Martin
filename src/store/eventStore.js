import { defineStore } from 'pinia';
import eventServices from '@/services/events/eventServices.js';
import { userStore } from './userStore';

export const eventStore = defineStore('events', {
  state: () => ({
    events: [],
    choosedEvent: null,
    isEditing: false,
    isToggleFilters: false,
    editedEvent: {
      id: '',
      name: '',
      description: '',
      date: '',
      time: '',
      location: [],
      ticket: '',
      price: '',
      timeZone: '',
      address: ''
    },
    filteredEvent: {
      search: '',
      fromDate: '',
      toDate: '',
      minPrice: '',
      maxPrice: '',
    }
  }),
  getters: {
    getCoordinates(state) {
      return state.choosedEvent.location;
    },
    filteredEvents: (state) => {
      return state.events.filter(event => {
        const fromDate = state.filteredEvent.fromDate ? new Date(state.filteredEvent.fromDate).toISOString().split('T')[0] : null;
        const toDate = state.filteredEvent.toDate ? new Date(state.filteredEvent.toDate).toISOString().split('T')[0] : null;
        const eventDate = event.time ? event.time.split('T')[0] : null;
        console.log(fromDate);
        const minPrice = parseFloat(state.filteredEvent.minPrice);
        const maxPrice = parseFloat(state.filteredEvent.maxPrice);
        const searchQuery = state.filteredEvent.search.toLowerCase();

        return (
          (!fromDate || eventDate >= fromDate) &&
          (!toDate || eventDate <= toDate) &&
          (!minPrice || event.price >= minPrice) &&
          (!maxPrice || event.price <= maxPrice) &&
          (!searchQuery || event.name.toLowerCase().includes(searchQuery))
        );
      });
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
        console.error('Error editing an event:', error);
      }
    },
    async removeEvent(eventId) {
      await eventServices.removeEvent(eventId);
      this.getEvents();
    },
    async buyTicket() {
      await eventServices.buyTicket(this.choosedEvent);
      
      const eventIndex = this.events.findIndex((e) => e.id === this.choosedEvent.id);
      if (eventIndex !== -1) {
        this.events[eventIndex].clients.push(userStore().currentUser.email)
      }
      await this.getEvents();
    },
    async addExpenses(price) {
      await eventServices.addExpenses(this.choosedEvent, price);

      if (this.choosedEvent) {
        this.choosedEvent.expenses += price;
      }
      
      await this.getEvents();
    },
    applyFilters() {
      this.filteredEvent = {
        search: this.filteredEvent.search,
        fromDate: this.filteredEvent.fromDate,
        toDate: this.filteredEvent.toDate,
        minPrice: this.filteredEvent.minPrice,
        maxPrice: this.filteredEvent.maxPrice,
      }
    },
    resetFilters() {
      this.filteredEvent = {
        search: '',
        fromDate: '',
        toDate: '',
        minPrice: '',
        maxPrice: '',
      }

      this.applyFilters();
    }
  },
});
