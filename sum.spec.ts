import sum from "./sum";
  
  describe("sum function", () => {
    test("16510775: [Given] two positive numbers [When] they are added [Then] the result should be their sum", () => {
      expect(sum(2, 3)).toBe(5);
    });
  
    test("16510773: [Given] a positive number and zero [When] they are added [Then] the result should be the positive number", () => {
      expect(sum(5, 0)).toBe(5);
    });
  
    test("16510774: [Given] two negative numbers [When] they are added [Then] the result should be their sum", () => {
      expect(sum(-2, -3)).toBe(-5);
    });
  });