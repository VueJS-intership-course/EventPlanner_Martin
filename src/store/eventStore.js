import { defineStore } from "pinia";

const eventStore = defineStore('eventStore', {
    state: () => ({
        events: []
    }),
})