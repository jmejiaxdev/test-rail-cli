import sum from "../sum";

describe("sum function", () => {
  test("16540003: TEST [Given] two positive numbers [When] they are added [Then] the result should be their sum", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("16540002: TEST [Given] a positive number and zero [When] they are added [Then] the result should be the positive number", () => {
    expect(sum(5, 0)).toBe(5);
  });

  test("16540001: TEST [Given] two negative numbers [When] they are added [Then] the result should be their sum", () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  test("16540057: TEST TEST TEST TEST TEST TEST TEST ", () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  test("16540056: TEST22222222222222", () => {
    expect(sum(-2, -3)).toBe(-5);
  });
});
