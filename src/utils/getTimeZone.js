import tz_lookup from "tz-lookup"

export const getTimeZone = (coordinates) => {
    const [longitude, latitude] = [...coordinates];

    const timeZone = tz_lookup(latitude, longitude);

    return timeZone;
}