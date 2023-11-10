import firebaseData from '@/services/firebaseConfig.js';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';
import { userStore } from '@/store/userStore';

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
            location: user.location,
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
      console.log(error);
    }
  },

  async getUser(userId) {
    try {
      const userDoc = await firebaseData.fireStore
        .collection('users')
        .doc(userId)
        .get();

      if (userDoc) {
        const userData = userDoc.data();
        console.log(userData);
        return userData;
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async changePassword(email, currentPassword, newPassword) {
    try {
      const user = firebaseData.fireAuth.currentUser;

      if (user) {
        const credential = EmailAuthProvider.credential(email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
        await this.logout();
      } else {
        throw new Error('User is not authenticated or found.');
      }
    } catch (error) {
      throw new Error('Error while changing password, please try again!');
    }
  },
  async editUserLocation(userLocation, user) {
    if (!user || !user.email) {
      console.error("User or user email is undefined");
      return;
    }
  
    try {
      const querySnapshot = await firebaseData.fireStore
        .collection('users')
        .where('email', '==', user.email)
        .get();
  
      const doc = querySnapshot.docs[0];
  
      if (doc) {
        await doc.ref.update({
          location: userLocation,
        });
      } else {
        console.log('No matching user found.');
      }
    } catch (error) {
      console.error("Error editing event: ", error);
    }
  }
  
  
};
