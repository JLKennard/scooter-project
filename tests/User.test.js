const User = require("../src/User");

// User tests
// test username
// test password
// test age
// test login
// test logout

const user1 = new User("JDoe", "Jdoe123", 30);

describe("user class", () => {
  test("a new user is an object", () => {
    expect(typeof user1).toBe("object");
  });
});

describe("A User", () => {
  it("has a username", () => {
    expect(user1.username).toBe("JDoe");
  });
  it("has a password", () => {
    expect(user1.password).toBe("Jdoe123");
  });
  it("has an age", () => {
    expect(user1.age).toBe(30);
  });
  it("is not logged in when they first register", () => {
    expect(user1.loggedIn).toBe(false);
  });
  it("logs in with correct password", () => {
    user1.login("Jdoe123");
    expect(user1.loggedIn).toBe(true);
  });
  it("thows error if password incorrect", () => {
    expect(() => {
      user1.login("Jdoe");
    }).toThrow("incorrect password");
  });
  it("logs out correctly", () => {
    user1.logout();
    expect(user1.loggedIn).toBe(false);
  });
});
