
export enum Units {
    Radian = 0,
    Degree,
    DegreeMinute,
    DegreeMinuteSecond
}

enum GeographicsCoordinates {
    Latitude = 0,
    Longitude
}

enum CardinalDirection {
    Northwest = 0,
    Northeast,
    Southeast,
    Southwest
}

export class Format {
    static stringToRadian(value: string, unit: Units = Units.Degree): number {
        let cardinalDirection: CardinalDirection = CardinalDirection.Northeast;
        let geographicsCoordinates: GeographicsCoordinates = GeographicsCoordinates.Latitude;

        value = value.toUpperCase();

        if (value.includes('S')) { geographicsCoordinates = GeographicsCoordinates.Latitude; }
        else if (value.includes('N')) { geographicsCoordinates = GeographicsCoordinates.Latitude; }
        else if (value.includes('E')) { geographicsCoordinates = GeographicsCoordinates.Longitude; }
        else if (value.includes('W')) { geographicsCoordinates = GeographicsCoordinates.Longitude; }

        if (value.includes('NE')) { cardinalDirection = CardinalDirection.Northeast } 
        else if (value.includes('SE')) { cardinalDirection = CardinalDirection.Southeast }
        else if (value.includes('SW')) { cardinalDirection = CardinalDirection.Southwest }
        else if (value.includes('NW')) { cardinalDirection = CardinalDirection.Northwest }

        if (value.endsWith("RAD")) { unit = Units.Radian; } 
        else if (value.endsWith("D")) { unit = Units.DegreeMinuteSecond; } 
        else { /* Units */ }

        let radianValue: number; radianValue = 0;

        switch (unit) {
            case Units.Radian: radianValue = parseFloat(value); break;
            case Units.Degree: radianValue = this.degreeToRadian(value); break;
            case Units.DegreeMinute: radianValue = this.degreeMinuteToRadian(value); break;
            case Units.DegreeMinuteSecond: radianValue = this.degreeMinuteSecondToRadian(value); break;
            default: break;
        }

        switch (cardinalDirection) {
            case CardinalDirection.Northeast: break; //1° Qd Rumo=Azimute
            case CardinalDirection.Southeast: radianValue = Math.PI - radianValue; break; //2° Qd Rumo=180-Azimute
            case CardinalDirection.Southwest: radianValue += Math.PI; break; //3° Qd Rumo=Azimute+180;
            case CardinalDirection.Northwest: radianValue = 2 * Math.PI - radianValue; break; //4 Qd Rumo=360-Azimute;
        }
        if (geographicsCoordinates == 1) radianValue = -radianValue;

        return radianValue;
    }

    static degreeToRadian(value: string): number {
        value = value.replace(",", ".");
        value = value.replace("°", "");
        const degree: number = parseFloat(value);
        return degreeToRadian(degree);
    }
    static degreeMinuteToRadian(value: string): number {
        const regex  = /^[\+-]?([1-8]?\d)\D+([1-6]?\d\.*\d*)\D*$/
        const values = regex.exec(value);
        if (values === null)
            throw new Error("Dados invalidos!")
        const degree = parseInt(values[1])/1 + parseFloat(values[2])/60;
        let   radian = degreeToRadian(degree)
        if (value.indexOf("-") >= 0) radian *= -1
        return radian;
    }
    static degreeMinuteSecondToRadian(value: string): number {        
        const regex  = /^[\+-]?([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d[\.\d]+|60)\D*$/
        const values = regex.exec(value);
        if (!values)
            throw new Error("Dados invalidos!")
        const degree = parseInt(values[1])/1 + parseFloat(values[2])/60 + parseFloat(values[3])/3600;
        let   radian = degreeToRadian(degree)
        if (value.indexOf("-") >= 0) radian *= -1
        return radian;
    }
    static radianToDegreeMinute(value: number): string {
        return "";
    }
    static radianToDegreeMinuteSecond(value: number): string {
        return "";
    }
    static stringToDegreeMinute(value: string) {
        return this.radianToDegreeMinute(this.stringToRadian(value));
    }
    static stringToDegreeMinuteSecond(value: string) {
        return this.radianToDegreeMinuteSecond(this.stringToRadian(value));
    }
}

export function degreeToRadian(degrees: number): number {
	return degrees * Math.PI / 180;
}

export function radianToDegree(radians: number): number {
	return radians * 180 / Math.PI;
}
