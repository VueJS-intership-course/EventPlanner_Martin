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
        const { name, description, id, location, budget, profit, expenses, time, price, ticket, address, imageUrl, timeZone, clients } =
          doc.data();

        const event = {
          name,
          description,
          id,
          location,
          budget,
          profit,
          expenses,
          time,
          price,
          ticket,
          address,
          timeZone,
          imageUrl,
          clients
        };
        data.push(event);
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  async addEvent(eventData) {
    try {
      await firebaseData.fireStore.collection('events').add({
        id: crypto.randomUUID(),
        name: eventData.name,
        description: eventData.description,
        ticket: eventData.ticket,
        budget: eventData.budget,
        time: eventData.time,
        price: eventData.price,
        location: eventData.location,
        address: eventData.address,
        timeZone: eventData.timeZone,
        imageUrl: eventData.imageUrl,
        clients: eventData.clients,
        profit: eventData.profit,
        expenses: eventData.expenses
      });
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
        location: event.location,
        address: event.address,
        timeZone: event.timeZone,
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
        ticket: event.ticket - 1,
        budget: event.budget + event.price,
        profit: event.profit + event.price
      });
    } catch (error) {
      console.error('Error buying ticket: ', error);
      throw error;
    }
  },

  async addExpenses(event, price) {
    const querySnapshot = await firebaseData.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const eventDoc = querySnapshot.docs[0];
    if (!eventDoc) {
      throw new Error('Event not found');
    }

    try {
      await eventDoc.ref.update({
        expenses: event.expenses + price
      });
    } catch (error) {
      console.error('Error buying ticket: ', error);
      throw error;
    }
  }
};
