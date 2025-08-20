const { sum } = require("../services/fetchExternalData");

describe("Unit: sum function", () => {
  it("should add two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
