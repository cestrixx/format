import { Format } from "../src/index";

describe("Format", () => {
  it("Decimal To Radian", () => {
    expect(Format.decimalToRadian("-52.8898106671")).toEqual(0.923101);
  });
});