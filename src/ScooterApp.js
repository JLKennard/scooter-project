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

  // checks if station is valid creates instance of scooter or throws error
  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }

    // if such station in stations{} create ne instace of scooter push to stationss[station] arr log to cl
    const newScooter = new Scooter(station);
    this.stations[station].push(newScooter);

    console.log("created new scooter");
    return newScooter;
  }
  dockScooter(scooter, station) {
    // if station does not exist or scooter is docked thow error
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    if (scooter.station === station) {
      throw new Error("scooter is docked");
    }
    // assign station to scooter
    scooter.dock(station);
    // add scooter to stations list
    this.stations[station].push(scooter);
    console.log("scooter is docked");
  }
  // checks if station is valid removes scooter from station and rents scooter or throws error
  rentScooter(scooter, user) {
    //
    if (scooter.station === null) {
      throw new Error("scooter already rented");
    }

    // remove the scooter from the stations array
    this.stations[scooter.station].splice(
      this.stations[scooter.station].indexOf(scooter),
      1
    );
    // assign user to scooter
    scooter.rent(user);
    console.log("scooter is rented");
  }
  // console logs registered users and stations [scooters]
  print() {
    console.log(`Registered users: ${this.registeredUsers}`);
    console.log(`Stations: ${this.stations}`);
  }
}

module.exports = ScooterApp;
