import User from "../model/User.js"

export const cleanUpDatabase = async function() {
  await Promise.all([
    User.deleteMany()
  ]);
};