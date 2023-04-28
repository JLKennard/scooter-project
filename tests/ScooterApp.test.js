const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

let scooterapp1;

beforeEach(() => {
  scooterapp1 = new ScooterApp();
});

const consoleLog = jest.spyOn(global.console, "log");

describe("scooter class", () => {
  it("a new scooter is an object", () => {
    expect(typeof scooterapp1).toBe("object");
  });
});

describe("ScoopterApp properties", () => {
  it("registeredUsers is an object", () => {
    expect(typeof scooterapp1.registeredUsers).toBe("object");
  });
  it("stations is an object", () => {
    expect(typeof scooterapp1.stations).toBe("object");
  });
  it("stations object has three stations", () => {
    expect(Object.keys(scooterapp1.stations).length).toBe(3);
  });
});

describe("ScooterApp methods", () => {
  // registerUser method
  it("registerUser method throws correct error when user already registered", () => {
    scooterapp1.registerUser("jasmine", "123", 20);
    expect(() => {
      scooterapp1.registerUser("jasmine", "123", 20);
    }).toThrow("already registered");
  });
  it("registerUser method throws correct error when user under 18", () => {
    expect(() => {
      scooterapp1.registerUser("john", "123", 12);
    }).toThrow("too young to register");
  });
  it("registerUser method logs correct message to console when user registered", () => {
    scooterapp1.registerUser("tom", "123", 20);
    expect(consoleLog).toHaveBeenCalledWith("user has been registered");
  });
  it("registerUser method returns expected new user object", () => {
    expect(scooterapp1.registerUser("tammy", "123", 20)).toEqual({
      age: 20,
      loggedIn: false,
      password: "123",
      username: "tammy",
    });
  });

  // loginUser method
  it("loginUser method throws correct error when username incorrect", () => {
    scooterapp1.registerUser("jasmine", "123", 20);
    expect(() => {
      scooterapp1.loginUser("jasmin", "123");
    }).toThrow("Username or password is incorrect");
  });
  it("loginUser method throws correct error when password incorrect", () => {
    scooterapp1.registerUser("jasmine", "123", 20);
    expect(() => {
      scooterapp1.loginUser("jasmine", "122");
    }).toThrow("Username or password is incorrect");
  });
  it("loginUser method sets User.loggedIn true", () => {
    scooterapp1.registerUser("tom", "123", 20);
    scooterapp1.loginUser("tom", "123");
    expect(scooterapp1.registeredUsers["tom"].loggedIn).toBe(true);
  });
  it("loginUser method logs correct message to console when user is logged in", () => {
    scooterapp1.registerUser("tom", "123", 20);
    scooterapp1.loginUser("tom", "123");
    expect(consoleLog).toHaveBeenCalledWith("user has been logged in");
  });

  // logoutUser method
  it("logoutUser method throws correct error when no such user is logged in", () => {
    expect(() => {
      scooterapp1.logoutUser("jasmin");
    }).toThrow("no such user is logged in");
  });
  it("loginUser method sets User.loggedIn false", () => {
    scooterapp1.registerUser("tom", "123", 20);
    scooterapp1.loginUser("tom", "123");
    scooterapp1.logoutUser("tom");
    expect(scooterapp1.registeredUsers["tom"].loggedIn).toBe(false);
  });
  it("logoutUser method logs correct message to console when user is logged in", () => {
    scooterapp1.registerUser("tom", "123", 20);
    scooterapp1.loginUser("tom", "123");
    scooterapp1.logoutUser("tom");
    expect(consoleLog).toHaveBeenCalledWith("user is logged out");
  });

  // createScooter method
  it("createScooter method throws correct method when incorect station passed", () => {
    expect(() => {
      scooterapp1.createScooter("station4");
    }).toThrow("no such station");
  });
  //!!
  // will this work if instnce of scooter created prviously
  // nextSerial propertey not yet static
  // does it matter in test when creating new isntance of App
  //!!
  it("createScooter method adds the new Scooter to the stations array", () => {
    // checks new instance of scooter is at last postion of stations object (station) array
    scooterapp1.createScooter("station1");
    expect(
      scooterapp1.stations["station1"][
        scooterapp1.stations["station1"].length - 1
      ]
    ).toEqual({
      charge: 100,
      isBroken: false,
      nextSerial: 1, // Scooter.nextSerial?
      serial: 1, //Scooter.nextSerial?
      station: "station1",
      user: null,
    });
  });
  it("createScooter method logs correct message to console when user registered", () => {
    scooterapp1.createScooter("station1");
    expect(consoleLog).toHaveBeenCalledWith("created new scooter");
  });
  it("createScooter method returns expected new scooter object", () => {
    expect(scooterapp1.createScooter("station1")).toEqual({
      charge: 100,
      isBroken: false,
      nextSerial: 1,
      serial: 1,
      station: "station1",
      user: null,
    });
  });
});
