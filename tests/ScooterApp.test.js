const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

let scooterapp1;

beforeEach(() => {
  scooterapp1 = new ScooterApp();
});

const scooter = new Scooter("station1");
const consoleLog = jest.spyOn(global.console, "log");

describe("scooter app class", () => {
  it("new scooter app is instance of ScooterApp", () => {
    expect(scooterapp1 instanceof ScooterApp).toBe(true);
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
  it("registerUser  method returns an instance of User", () => {
    expect(
      scooterapp1.registerUser("tammy", "123", 20) instanceof User
    ).toEqual(true);
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
  it("createScooter method throws correct error when incorect station passed", () => {
    expect(() => {
      scooterapp1.createScooter("station4");
    }).toThrow("no such station");
  });
  it("createScooter method adds the new Scooter to the stations array", () => {
    scooterapp1.createScooter("station1");
    expect(
      scooterapp1.stations["station1"][
        scooterapp1.stations["station1"].length - 1
      ]
    ).toEqual({
      charge: 100,
      isBroken: false,
      serial: Scooter.nextSerial,
      station: "station1",
      user: null,
    });
  });
  it("createScooter method logs correct message to console when user registered", () => {
    scooterapp1.createScooter("station1");
    expect(consoleLog).toHaveBeenCalledWith("created new scooter");
  });
  it("createScooter method returns an instance of Scooter", () => {
    expect(scooterapp1.createScooter("station1") instanceof Scooter).toEqual(
      true
    );
  });
  // dockScooter method
  it("dockScooter method throws correct error when scooter already docked", () => {
    expect(() => {
      scooterapp1.dockScooter(scooter, "station");
    }).toThrow("no such station");
  });
  it("dockScooter method throws correct error when scooter already docked", () => {
    expect(() => {
      scooterapp1.dockScooter(
        scooterapp1.createScooter("station1"),
        "station1"
      );
    }).toThrow("scooter is docked");
  });
  it("dockScooter method docks the scooter to station sets user to null", () => {
    scooterapp1.dockScooter(scooter, "station2");
    // evaluate station and user in 1 test with destructuring?
    expect([scooter.station, scooter.user]).toEqual(["station2", null]);
  });
  it("dockScooter method logs correct message to console when scooter is docked", () => {
    scooter.rent();
    scooterapp1.dockScooter(scooter, "station1");
    expect(consoleLog).toHaveBeenCalledWith("scooter is docked");
  });
  it("dockScooter method adds the new Scooter to the end of stations array", () => {
    scooter.rent();
    scooterapp1.dockScooter(scooter, "station1");
    expect(
      scooterapp1.stations["station1"][
        scooterapp1.stations["station1"].length - 1
      ]
    ).toEqual(scooter);
  });

  // rentScooter method
  it("rentScooter thows correct error when scooter already rented", () => {
    expect(() => {
      const user = new User("tom", "123", 20);
      scooter.rent(user);
      scooterapp1.rentScooter(scooter, user);
    }).toThrow("scooter already rented");
  });

  it("rentScooter removed the rented scooter from station array", () => {
    const user = new User("tom", "123", 20);
    let newScoot = scooterapp1.createScooter("station1");
    scooterapp1.rentScooter(newScoot, user);
    expect(scooterapp1.stations.station1.includes(newScoot)).toBe(false);
  });
  it("rentScooter updates the user of scooter that is rented", () => {
    const user = new User("tom", "123", 20);
    let newScoot = scooterapp1.createScooter("station1");
    scooterapp1.rentScooter(newScoot, user);
    expect(newScoot.user).toBe(user);
  });
  it("rentScooter logs correct message to console once scooter is rented", () => {
    const user = new User("tom", "123", 20);
    let newScoot = scooterapp1.createScooter("station1");
    scooterapp1.rentScooter(newScoot, user);
    expect(consoleLog).toHaveBeenCalledWith("scooter is rented");
  });
  // print method
  it("print method prints a string containing the registered userer and the stations", () => {
    scooterapp1.print();
    expect(consoleLog).toHaveBeenCalledWith(
      `Registered users: ${scooterapp1.registeredUsers}` &&
        `Stations: ${scooterapp1.stations}`
    );
  });
});
