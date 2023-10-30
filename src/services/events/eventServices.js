import firebaseData from '../firebaseConfig.js';

export default {
  async getAll() {
    try {
      const data = [];
      const querySnapshot = await firebaseData.fireStore
        .collection('events')
        .get();

      querySnapshot.forEach((doc) => {
        const { name, description, id, location, date, time, price, tickets } = doc.data();

        const newEvent = {
          name,
          description,
          id,
          location,
          date,
          time,
          price,
          tickets,
        };
        data.push(newEvent);
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  async addEvent(eventData) {
    try {
      console.log(eventData);
      await firebaseData.fireStore.collection('events').add({
        id: crypto.randomUUID(),
        name: eventData.name,
        description: eventData.description,
        ticket: eventData.ticket,
        time: eventData.time,
        price: eventData.price,
        date: eventData.date,
        location: eventData.location,
      });
    } catch (error) {
      throw error;
    }
  },
};
