import firebaseData from '@/services/firebaseConfig.js';

export default {
  async signUp(user, password) {
    try {
      const userCredentials =
        await firebaseData.fireAuth.createUserWithEmailAndPassword(
          user.email,
          password
        );
      if (userCredentials && userCredentials.user) {
        await firebaseData.fireStore
          .collection('users')
          .doc(userCredentials.user.uid)
          .set({
            email: user.email,
            username: user.username,
            location: user.location
          });
      }
    } catch (error) {
      console.error('Error while signin up:', error);
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      await firebaseData.fireAuth.signInWithEmailAndPassword(email, password);

      console.log('It works');
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  },

  async logout() {
    try {
      await firebaseData.fireAuth.signOut();
      console.log('logout');
    } catch (error) {
      console.log(error);;
    }
  },

  async getUser(userId) {
    try {
        const userDoc = await firebaseData.fireStore.collection('users').doc(userId).get();

        if (userDoc) {
            const userData = userDoc.data();
            console.log(userData)
            return userData;
        } else {
            console.log('User document does not exist.');
        }

    } catch (error) {
        console.log(error);
    }
},
};
