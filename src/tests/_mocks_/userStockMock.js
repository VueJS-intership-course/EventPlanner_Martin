const nonLoggedInUser = {};

const mockedUser = {
  username: "martin",
  email: "martin@abv.bg",
  timezone: "Europe/Madrid",
};

const mockedUserAdmin = {
  username: "admin",
  email: "admin@abv.bg",
  timezone: "Europe/Sofia",
  isAdmin: true,
};

const userStoreMock = {
    nonLoggedInUser,
    mockedUser,
    mockedUserAdmin,
};

export default userStoreMock;