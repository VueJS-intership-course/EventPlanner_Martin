import firebaseData from '@/services/firebaseConfig.js';
import {userStore} from '@/store/userStore';

export default {
  async getAllEvents() {
    try {
      const data = [];
      const querySnapshot = await firebaseData.fireStore
        .collection('events')
        .get();

      querySnapshot.forEach((doc) => {
        const { name, description, id, location, budget, date, time, price, ticket, clients } =
          doc.data();

        const event = {
          name,
          description,
          id,
          location,
          budget,
          date,
          time,
          price,
          ticket,
          clients
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
        budget: eventData.budget,
        time: eventData.time,
        price: eventData.price,
        date: eventData.date,
        location: eventData.location,
        clients: eventData.clients
      });
      console.log(eventData.budget);
    } catch (error) {
      throw error;
    }
  },

  async getSingleEvent(eventId) {
    try {
      const querySnapshot = await firebaseData.fireStore
        .collection('events')
        .where('id', '==', eventId)
        .get();

      if (querySnapshot.docs.length > 0) {
        return querySnapshot.docs[0].data();
      }
    } catch (error) {
      console.log(error);
    }
  },

  async editEvent(event) {
    const querySnapshot = await firebaseData.fireStore
      .collection('events')
      .where('id', '==', event.id)
      .get();

    const doc = querySnapshot.docs[0];
    try {
      await doc.ref.update({
        id: event.id,
        name: event.name,
        description: event.description,
        ticket: event.ticket,
        budget: event.budget,
        time: event.time,
        date: event.date,
        location: event.location,
        price: event.price,
      });
    } catch (error) {
      console.error('Error editing event: ', error);
    }
  },

  async removeEvent(eventId) {
    try {
      const querySnapshot = await firebaseData.fireStore.collection('events').where('id', '==', eventId).get();

      const batch = firebaseData.fireStore.batch();

      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      })

      await batch.commit();

    } catch (error) {
      console.log(error);
    }
  },
  async buyTicket(event) {
    const user = userStore().currentUser;
    const querySnapshot = await firebaseData.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const eventDoc = querySnapshot.docs[0];
    if (!eventDoc) {
      throw new Error('Event not found');
    }

    const eventData = eventDoc.data();

    if (eventData.clients && eventData.clients.includes(userStore().currentUser.email)) {
      throw new Error('User has already purchased a ticket for this event');
    }

    try {
      const updatedClients = [...(eventData.clients || []), user.email];
      await eventDoc.ref.update({
        clients: updatedClients,
        ticket: event.ticket - 1
      });
    } catch (error) {
      console.error('Error buying ticket: ', error);
      throw error;
    }
  }
};
