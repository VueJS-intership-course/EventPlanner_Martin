export const getAddressFromCoordinates = async (coordinates) => {
  const [longitude, latitude] = [...coordinates];

  const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(apiUrl);
    const locationData = await response.json();
    return locationData.display_name;
  } catch (error) {
    console.error('Error fetching address:', error);
  }
};
