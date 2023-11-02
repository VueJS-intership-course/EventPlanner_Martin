import { defineStore } from "pinia";
import eventServices from "@/services/events/eventServices.js";

export const eventStore = defineStore('events', {
    state: () => ({
        events: null,
        choosedEvent: null,
    }),
    getters: {
        getCoordinates(state) {
            return state.choosedEvent.location
        }
    },
    actions: {
        async getEvents() {
            this.events = await eventServices.getAllEvents();
        },
        async createEvent(eventData) {
            await eventServices.addEvent(eventData)
        },
        async getEventDetails(eventId) {
            try {
                this.choosedEvent = await eventServices.getSingleEvent(eventId);
            } catch (error) {
                console.log(error);
            }
        }
    }
})
