const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      station1: [],
      station2: [],
      station3: [],
    };
    this.registeredUsers = {};
  }
  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("already registered");
    }
    if (age < 18) {
      throw new Error("too young to register");
    }
    const newUserCreation = new User(username, password, age);
    this.registerUsers;

    console.log("user has been registered");

    return newUserCreation;
  }
}

module.exports = ScooterApp;
