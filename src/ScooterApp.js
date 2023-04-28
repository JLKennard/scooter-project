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
  //registerUser throws error if alrady registerd/ too young
  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("already registered");
    }
    if (age < 18) {
      throw new Error("too young to register");
    }

    // creates new instace of User class
    const newUserCreation = new User(username, password, age);
    this.registeredUsers[username] = newUserCreation;

    // logs if user has been registered
    console.log("user has been registered");

    //returns new User instance
    return newUserCreation;
  }

  //loginUser method checks if a reistered user/ password correct and logs in/ thows error
  loginUser(username, password) {
    // try catch as the User class .login() method thows "incorrect password" error
    try {
      //
      if (!this.registeredUsers[username]) {
        throw new Error();
      }
      //if password incorrect the try block throws an exception
      //if password correct calls the User class .login user instance will set loggedIn to true then logs to console
      this.registeredUsers[username].login(password);
      console.log("user has been logged in");
    } catch {
      //catch block runs when username/ password incorrect
      throw new Error("Username or password is incorrect");
    }
  }
  // logoutUser checks if user logged in then thows error/ logs out
  logoutUser(username) {
    if (!this.registeredUsers[username]) {
      throw new Error("no such user is logged in");
    }
    // if such username the User class .logout user instance will set loggedIn to true then logs to console
    this.registeredUsers[username].logout();
    console.log("user is logged out");
  }
  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    const newScooter = new Scooter(station);
    this.stations[station].push(newScooter);

    console.log("created new scooter");
    return newScooter;
  }
}

module.exports = ScooterApp;
