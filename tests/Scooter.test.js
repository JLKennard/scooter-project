const Scooter = require("../src/Scooter");
const User = require("../src/User");

const scooter1 = new Scooter("station1");
const newUser = new User("Jake", "123", 30);

describe("scooter class", () => {
  it("new scooter is instance of ScooterApp", () => {
    expect(scooter1 instanceof Scooter).toBe(true);
  });
});

describe("Scooter properties", () => {
  it("scooter is init with user set to null", () => {
    expect(scooter1.user).toBe(null);
  });
  it("scooter is init with serial set to 1", () => {
    expect(scooter1.serial).toBe(1);
  });
  it("scooter is init with 100 charge", () => {
    expect(scooter1.charge).toBe(100);
  });
  it("scooter is init working", () => {
    expect(scooter1.isBroken).toBe(false);
  });
  it("scooter is init with station", () => {
    expect(scooter1.station).toBe("station1");
  });
});

describe("scooter methods", () => {
  it("rent method sets station to null once scooter has been rented", () => {
    scooter1.rent(newUser);
    expect(scooter1.station).toBe(null);
  });
  it("rent method sets User to user proprty  once scooter has been rented", () => {
    scooter1.rent(newUser);
    expect(scooter1.user).toBe(newUser);
  });
  it("dock method sets station correct station once it has been docked", () => {
    scooter1.dock("station2");
    expect(scooter1.station).toBe("station2");
  });
  it("rent method throws correct error when charge is less than 20", () => {
    scooter1.charge = 10;
    expect(() => {
      scooter1.rent();
    }).toThrow("scooter needs to charge");
  });
  it("rent method throws correct error when is broken is true", () => {
    scooter1.charge = 100;
    scooter1.isBroken = true;
    expect(() => {
      scooter1.rent();
    }).toThrow("scooter needs repair");
  });
});
