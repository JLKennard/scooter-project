const User = require("../src/User");

const user1 = new User("JDoe", "Jdoe123", 30);

describe("User class", () => {
  it("new user is instance of User", () => {
    expect(user1 instanceof User).toBe(true);
  });
});

describe("User properties", () => {
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
});

describe("User Methods", () => {
  it("login method logs in with correct password", () => {
    user1.login("Jdoe123");
    expect(user1.loggedIn).toBe(true);
  });
  it("login method thows error if password incorrect", () => {
    expect(() => {
      user1.login("Jdoe");
    }).toThrow("incorrect password");
  });
  it("logout method logs out correctly", () => {
    user1.logout();
    expect(user1.loggedIn).toBe(false);
  });
});
