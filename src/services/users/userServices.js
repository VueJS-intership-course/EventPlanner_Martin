import firebaseData from '../firebaseConfig';

export default {
  async signUp(user, password) {
    try {
      const userCredentails =
        await firebaseData.fireAuth.createUserWithEmailAndPassword(
          user.email,
          password
        );
          console.log('here');
          console.log(user);
      if (userCredentails && userCredentails.user) {
        await firebaseData.fireStore
          .collection('users')
          .doc(userCredentails.user.uid)
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
    } catch (error) {
      throw error;
    }
  },
};
