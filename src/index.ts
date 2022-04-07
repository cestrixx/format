
export enum Units {
    Rad = 0,
    Dec,
    Dm,
    Dms
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
    static stringToRadians(value: string, unit: Units = Units.Dec): number {
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

        if (value.endsWith("RAD")) { unit = Units.Rad; } 
        else if (value.endsWith("D")) { unit = Units.Dms; } 
        else { /* Units */ }

        let radianValue: number; radianValue = 0;

        switch (unit) {
            case Units.Rad : radianValue = parseFloat(value); break;
            case Units.Dec : radianValue = this.decimalToRadian(value); break;
            case Units.Dm  : radianValue = this.degreeMinutesToRadian(value); break;
            case Units.Dms : radianValue = this.degreeMinutesSecondsToRadian(value); break;
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

    static decimalToRadian(value: string): number {   
        return 0;
    }
    static degreeMinutesToRadian(value: string): number {        
        return 0;
    }
    static degreeMinutesSecondsToRadian(value: string): number {        
        return 0;
    }
    static radianToDegreeMinutes(value: number): string {
        return "";
    }
    static radianToDegreeMinutesSeconds(value: number): string {
        return "";
    }
    static stringToDegreeMinutes(value: string) {
        return this.radianToDegreeMinutes(this.stringToRadians(value));
    }
    static stringToDegreeMinutesSeconds(value: string) {
        return this.radianToDegreeMinutesSeconds(this.stringToRadians(value));
    }
}
