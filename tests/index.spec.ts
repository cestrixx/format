import { Format } from "../src/index";

describe("Format", () => {
    it("Degree To Radian => d.d", () => {
        expect(Format.degreeToRadian("52.8898106671")).toEqual(0.9231013368973136);
    });

    it("Degree To Radian => -d,d", () => {
        expect(Format.degreeToRadian("-52,8898106671")).toEqual(-0.9231013368973136);
    });

    it("DegreeMinute To Radian => d°d.d's", () => {
        expect(Format.degreeMinuteToRadian("40°26.767'")).toEqual(0.7059179054790872);
    });

    it("DegreeMinute To Radian => -d°d.d'", () => {
        expect(Format.degreeMinuteToRadian("-40°26.767'")).toEqual(-0.7059179054790872);
    });

    it("DegreeMinute To Radian => d d.d", () => {
        expect(Format.degreeMinuteToRadian("40 26.767")).toEqual(0.7059179054790872);
    });

    it("DegreeMinute To Radian => d d", () => {
        expect(Format.degreeMinuteToRadian("40 26")).toEqual(0.7056947942230405);
    });

    it("DegreeMinute To Radian => d", () => {
        expect(() => { Format.degreeMinuteToRadian("40"); }).toThrow('Dados invalidos!');
    });

    it("DegreeMinuteSecond To Radian => d°d'd.d\"", () => {
        expect(Format.degreeMinuteSecondToRadian("40°26'45.9996\"")).toEqual(0.7059178065770961);
    });

    it("DegreeMinuteSecond To Radian => -d°d'd.d\"", () => {
        expect(Format.degreeMinuteSecondToRadian("-40°26'45.9996\"")).toEqual(-0.7059178065770961);
    });

    it("DegreeMinuteSecond To Radian => d d d.d", () => {
        expect(Format.degreeMinuteSecondToRadian("40 26 45.9996")).toEqual(0.7059178065770961);
    });

    it("DegreeMinuteSecond To Radian => d d d", () => {
        expect(Format.degreeMinuteSecondToRadian("40 26 45")).toEqual(0.7059129603795398);
    });

    it("DegreeMinute To Radian => d d d", () => {
        expect(() => { Format.degreeMinuteSecondToRadian("40 26"); }).toThrow('Dados invalidos!');
    });
});