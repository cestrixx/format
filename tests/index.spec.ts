import { Format, Units } from "../src/index";

describe("Format", () => {
    it("String To String(Degrees) => d.d", () => {
        expect(Format.stringToDegree("21.613740790767654", "%.14f")).toEqual("21.61374079076765");
    });

    it("String To String(Degree Minute) => d°d.d'", () => {
        expect(Format.stringToDegreeMinute("21°36.82444744605924'", "%2d°%.14f'")).toEqual("21°36.82444744605914'");
    });

    it("String To String(Degree Minute Seconds) => d°d'd.d\"", () => {
        expect(Format.stringToDegreeMinuteSecond("21°36'49.46684676355439\"", "%d°%d'%.14f\"")).toEqual("21°36'49.46684676354926\"");
    });

    it("String(Degrees) To Radian => d.d", () => {
        expect(Format.stringToRadian("21.613740790767654")).toEqual(0.37723094047149835);
    });

    it("String(Degree Minute) To Radian => d°d.d'", () => {
        expect(Format.stringToRadian("21°36.82444744605924'", Units.DegreeMinute)).toEqual(0.37723094047149835);
    });

    it("String(Degree Minute Seconds) To Radian => d°d'd.d\"", () => {
        expect(Format.stringToRadian("21°36'49.46684676355439\"", Units.DegreeMinuteSecond)).toEqual(0.37723094047149835);
    });

    it("Degree To Radian => d.d", () => {
        expect(Format.degreeToRadian("21.613740790767654")).toEqual(0.37723094047149835);
    });

    it("Degree To Radian => -d,d", () => {
        expect(Format.degreeToRadian("-21,613740790767654")).toEqual(-0.37723094047149835);
    });

    it("DegreeMinute To Radian => d°d.d'", () => {
        expect(Format.degreeMinuteToRadian("21°36.82444744605924'")).toEqual(0.37723094047149835);
    });

    it("DegreeMinute To Radian => -d°d.d'", () => {
        expect(Format.degreeMinuteToRadian("-21°36.82444744605924'")).toEqual(-0.37723094047149835);
    });

    it("DegreeMinute To Radian => d d.d", () => {
        expect(Format.degreeMinuteToRadian("21 36.82444744605924")).toEqual(0.37723094047149835);
    });

    it("DegreeMinute To Radian => d d", () => {
        expect(Format.degreeMinuteToRadian("21 36")).toEqual(0.37699111843077515);
    });

    it("DegreeMinute To Radian => d", () => {
        expect(() => { Format.degreeMinuteToRadian("21"); }).toThrow('Dados invalidos!');
    });

    it("DegreeMinuteSecond To Radian => d°d'd.d\"", () => {
        expect(Format.degreeMinuteSecondToRadian("21°36'49.46684676355439\"")).toEqual(0.37723094047149835);
    });

    it("DegreeMinuteSecond To Radian => -d°d'd.d\"", () => {
        expect(Format.degreeMinuteSecondToRadian("-21°36'49.46684676355439\"")).toEqual(-0.37723094047149835);
    });

    it("DegreeMinuteSecond To Radian => d d d.d", () => {
        expect(Format.degreeMinuteSecondToRadian("21 36 49.46684676355439")).toEqual(0.37723094047149835);
    });

    it("DegreeMinuteSecond To Radian => d d d", () => {
        expect(Format.degreeMinuteSecondToRadian("21 36 49")).toEqual(0.37722867713451885);
    });

    it("DegreeMinute To Radian => d d d", () => {
        expect(() => { Format.degreeMinuteSecondToRadian("21 36"); }).toThrow('Dados invalidos!');
    });

    it("Radian To Degree : %.10f", () => {
        expect(Format.radianToDegree(0.37723094047149835, "%.14f")).toEqual("21.61374079076765");
    });

    it("Radian To Degree", () => {
        expect(() => { Format.radianToDegree(0.37723094047149835, "%f°%f'%f"); }).toThrow("Formato invalido!");
    });

    it("Radian To Degree Minute", () => {
        expect(Format.radianToDegreeMinute(0.37723094047149835, "%2d°%.14f'")).toEqual("21°36.82444744605914'");
    });

    it("Radian To Degree Minute Second", () => {
        expect(Format.radianToDegreeMinuteSecond(0.37723094047149835, "%d°%d'%.14f\"")).toEqual("21°36'49.46684676354926\"");
    });

    it("String(Rumo NE) To Radian", () => {
        expect(Format.stringToRadian("36°00'00\"NE", Units.DegreeMinuteSecond)).toEqual(0.6283185307179586);
        expect(Format.radianToDegreeMinuteSecond(0.6283185307179586, "%d°%d'%.14f\"")).toEqual("36°0'0.00000000000000\"");
    });

    it("String(Rumo SE) To Radian", () => {
        expect(Format.stringToRadian("46°00'00\"SE", Units.DegreeMinuteSecond)).toEqual(2.3387411976724017);
        expect(Format.radianToDegreeMinuteSecond(2.3387411976724017, "%d°%d'%.14f\"")).toEqual("134°0'0.00000000011642\"");
    });

    it("String(Rumo SW) To Radian", () => {
        expect(Format.stringToRadian("28°00'00\"SW", Units.DegreeMinuteSecond)).toEqual(3.630284844148205);
        expect(Format.radianToDegreeMinuteSecond(3.630284844148205, "%d°%d'%.14f\"")).toEqual("207°59'59.99999999988358\"");
    });

    it("String(Rumo SW) To Radian", () => {
        expect(Format.stringToRadian("62°00'00\"NW", Units.DegreeMinuteSecond)).toEqual(5.201081170943102);
        expect(Format.radianToDegreeMinuteSecond(5.201081170943102, "%d°%d'%.14f\"")).toEqual("298°0'0.00000000000000\"");
    });    
});