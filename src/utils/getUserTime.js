import moment from "moment-timezone";
import { userStore } from "@/store/userStore.js";

export const getUserTime = (utcTime) => {
  const uStore = userStore();
  
  const userTime = moment.utc(utcTime).tz(uStore.currentUser.location);
  return userTime.format('HH:mm YYYY-MM-DD');
};