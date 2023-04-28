const Scooter = require("../src/Scooter");
const User = require("../src/User");

const scooter1 = new Scooter("station1");

//typeof scooter === object
describe("scooter object", () => {
  test("does something", () => {
    // edit this to be a real test!
    expect(scooter1).toEqual(typeof "object");
  });
});

//Method tests
//rent method
//dock method
//requestRepair method
//charge method

describe("scooter intialization", () => {
  it("scooter is init with user set to null", () => {
    expect(scooter.user).toBe(null);
  });
  it("scooter is init with serial set to 1", () => {
    expect(scooter.serial).toBe(1);
  });
  it("scooter is init with 100 charge", () => {
    expect(scooter.charge).toBe(100);
  });
  it("scooter is init working", () => {
    expect(scooter.isBroken).toBe(false);
  });
});

describe("scooter methods", () => {
  it("sets station to null once scooter has been rented", () => {
    scooter1.rent();
    expect(scooter1.station).toBe(null);
  });
  it("sets station correct station once it has been docked", () => {
    scooter1.dock("station2");
    expect(scooter1.station).toBe("station2");
  });
  it("throws correct error when charge is less than 20", () => {
    scooter1.charge = 10;
    expect(() => {
      scooter1.rent();
    }).toThrow("scooter needs to charge");
  });
  it("throws correct error when is broken is true", () => {
    scooter1.isBroken = true;
    expect(() => {
      scooter1.rent();
    }).toThrow("scooter needs to charge");
  });
});
