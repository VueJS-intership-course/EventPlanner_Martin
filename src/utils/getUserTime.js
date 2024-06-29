import moment from "moment-timezone";
import { userStore } from "@/store/userStore.js";

export const getUserTime = (utcTime) => {
  const uStore = userStore();
  const userTimeZone = uStore.currentUser.location;

  const userTime = moment.utc(utcTime).tz(userTimeZone);
  return userTime.format('HH:mm YYYY-MM-DD');
};