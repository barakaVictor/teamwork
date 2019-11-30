const mockdb = require('../testutils/mockdb');

function UserModel() {
  return {
    save: async (data) => {
      mockdb.push(data);
      return Promise.resolve(data);
    },
    find: async (email) => {
      const user = mockdb.find((obj) => obj.email === email);
      return Promise.resolve(user);
    },
  };
}

module.exports = {
  UserModel,
};
