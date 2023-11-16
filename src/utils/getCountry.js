export const getCountry = async (coordinates) => {
    const [longitude, latitude] = [...coordinates];
  
    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
  
    try {
      const response = await fetch(apiUrl);
      const locationData = await response.json();
      return locationData.address.country;
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  