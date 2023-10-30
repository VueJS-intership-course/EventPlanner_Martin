import { defineStore } from "pinia";
import eventServices from "../services/events/eventServices.js";

export const eventStore = defineStore('events', {
    state: () => ({
        events: null,
        currentEvent: null
    }),

    actions: {
        async createEvent(eventData) {
            await eventServices.addEvent(eventData)
        },
    }
})
