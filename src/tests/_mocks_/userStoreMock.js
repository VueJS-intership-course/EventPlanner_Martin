const nonLoggedInUser = {};

const mockedUser = {
  username: "martin",
  email: "martin@abv.bg",
  timezone: "Europe/Madrid",
  imageUrl: 'imageUrlndadnaksnda'
};

const mockedUserAdmin = {
  username: "admin",
  email: "admin@abv.bg",
  timezone: "Europe/Sofia",
  isAdmin: true,
  imageUrl: 'imageUrlndadnaksnda',
};

const userStoreMock = {
    nonLoggedInUser,
    mockedUser,
    mockedUserAdmin,
};

export default userStoreMock;