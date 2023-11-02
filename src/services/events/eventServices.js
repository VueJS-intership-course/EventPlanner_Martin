import firebaseData from '@/services/firebaseConfig.js';

export default {
  async getAllEvents() {
    try {
      const data = [];
      const querySnapshot = await firebaseData.fireStore
        .collection('events')
        .get();

      querySnapshot.forEach((doc) => {
        const { name, description, id, location, date, time, price, ticket } = doc.data();

        const event = {
          name,
          description,
          id,
          location,
          date,
          time,
          price,
          ticket,
        };
        data.push(event);
      });
      console.log(data);
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

  async getSingleEvent(eventId) {
    try {
      const querySnapshot = await firebaseData.fireStore.collection('events').where('id', '==', eventId).get();

      if (querySnapshot.docs.length > 0) {
        return querySnapshot.docs[0].data();
      }
    } catch (error) {
      console.log(error);
    }
  },

  async editEvent(event) {
    const querySnapshot = await firebaseData.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const doc = querySnapshot.docs[0];
    try {
      await doc.ref.update({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        ticket: event.ticket,
        price: event.price,
      });
    } catch (error) {
      console.error("Error editing event: ", error);
    }
  },
};
