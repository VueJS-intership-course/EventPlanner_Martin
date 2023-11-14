import moment from "moment-timezone";

export const getEventTime = (time, timezone) => {
    const eventTime = moment.utc(time).tz(timezone);
    
    return eventTime.format("HH:mm YYYY-MM-DD");
  };