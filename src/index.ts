import {sprintf} from "sprintf-js"

export enum Units {
    Unknown = 0,
    Radian,
    Degree,
    DegreeMinute,
    DegreeMinuteSecond,
    Rumo,
    Latitude,
    Longitude,
    Meters
}

export class Format {
    static stringToUnit(value: string, outputUnit: Units, outputFormat: string|null = null): string {
        const inputUnit: Units = this.identifyUnit(value);
        let radianValue: number;
        switch (inputUnit) {
            case Units.Degree: radianValue = this.degreeToRadian(value); break;
            case Units.DegreeMinute: radianValue = this.degreeMinuteToRadian(value); break;
            case Units.DegreeMinuteSecond: radianValue = this.degreeMinuteSecondToRadian(value); break;
            case Units.Radian: radianValue = Number(value); break;
            case Units.Rumo: radianValue = this.rumoToRadian(value); break;
            default: radianValue = 0; break;
        }
        let resultValue: string
        switch (outputUnit) {
            case Units.Degree: resultValue = this.radianToDegree(radianValue, outputFormat); break;
            case Units.DegreeMinute: resultValue = this.radianToDegreeMinute(radianValue, outputFormat); break;
            case Units.DegreeMinuteSecond: resultValue = this.radianToDegreeMinuteSecond(radianValue, outputFormat); break;
            case Units.Radian: resultValue = this.radianToRadian(radianValue, outputFormat); break;
            case Units.Rumo: resultValue = this.radianToRumo(radianValue, outputFormat); break;
            case Units.Latitude: resultValue = this.radianToLatitude(radianValue, outputFormat); break;
            case Units.Longitude: resultValue = this.radianToLongitude(radianValue, outputFormat); break;
            case Units.Meters: resultValue = this.radianToMeters(radianValue, outputFormat); break;
            default: resultValue = ""; break;
        }

        return resultValue;
    }

    static degreeToRadian(value: string): number {
        const realValue = value.trim().replace(",", ".").replace("°", "").replace(/^-/, '');
        const values = /^([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null) 
            throw new Error("Valor invalido!")
        let degree = parseFloat(values[0])
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degToRad(degree);
    }

    static degreeMinuteToRadian(value: string): number {
        const realValue = value.trim().replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null) 
            throw new Error("Valor invalido!")
        let degree = parseInt(values[1])/1 + parseFloat(values[2])/60;
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degToRad(degree);
    }

    static degreeMinuteSecondToRadian(value: string): number {
        const realValue = value.trim().replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+)\D+([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null) 
            throw new Error("Valor invalido!")
        let degree = parseInt(values[1])/1 + parseFloat(values[2])/60 + parseFloat(values[3])/3600;
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degToRad(degree);
    }

    static rumoToRadian(value: string): number {
        const realValue = value.trim().replace(/[NSEW]+$/i, '');
        let radianValue = Number(this.stringToUnit(realValue, Units.Radian, "%.17f"));      
        const values = /([NE]{2})?([SE]{2})?([SW]{2})?([NW]{2})?$/i.exec(value);
        const direction = values === null ? "" : values[0];
        switch (direction) {
            case "NE": break; //1° Qd Rumo=Azimute
            case "SE": radianValue = Math.PI - radianValue; break; //2° Qd Rumo=180-Azimute
            case "SW": radianValue += Math.PI; break; //3° Qd Rumo=Azimute+180;
            case "NW": radianValue = 2 * Math.PI - radianValue; break; //4 Qd Rumo=360-Azimute;
        }
        return radianValue;
    }

    static radianFormat = "%.2f"
    static degreeFormat = "%.2f"
    static degreeMinuteFormat = "%2d°%.2f'"
    static degreeMinuteSecondFormat = "%d°%d'%.2f\""
    static rumoFormat = "%d°%d'%.2f\""
    static latlonFormat = "%d°%d'%.2f\" %s"
    static metersFormat = "%.2f m"

    static radianToRadian(value: number, format: string|null = null): string {
        try {
            if (!format) format = this.radianFormat;
            return sprintf(format, value);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static radianToDegree(value: number, format: string|null = null): string {
        try {
            if (!format) format = this.degreeFormat;
            return sprintf(format, radToDeg(value));            
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static radianToDegreeMinute(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(radToDeg(value));
            let degrees = Math.floor(decimalDegress);
            if (value < 0) degrees *= -1
            const minutes = ((decimalDegress*60) % 60);
            if (!format) format = this.degreeMinuteFormat;
            return sprintf(format, degrees, minutes);            
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static radianToDegreeMinuteSecond(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(radToDeg(value));
            let degrees = Math.floor(decimalDegress);
            if (value < 0) degrees *= -1
            const minutes = Math.floor((decimalDegress*3600)/60) % 60
            const seconds = (decimalDegress*3600 % 60)
            if (!format) format = this.degreeMinuteSecondFormat;
            return sprintf(format, degrees, minutes, seconds);            
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static radianToRumo(value: number, format: string|null = null): string {
        const PI = Math.PI;
        const TWOPI = 2*Math.PI;
        const PIOVER2 = Math.PI/2
        let resultValue = ""
        if (!format) format = this.rumoFormat;
        if (value < 0) {
            value += 2 * PI;
        }
        if (value > PI) {
            if (value > PIOVER2*3) {
                value = TWOPI - value;
                resultValue = this.radianToDegreeMinuteSecond(value, format) + " NW";
            } else {
                value -=  PI;
                resultValue = this.radianToDegreeMinuteSecond(value, format) + " SW";
            }
        } else {
            if (value > PIOVER2) {
                value = PI - value;
                resultValue = this.radianToDegreeMinuteSecond(value, format) + " SE";
            } else {
                resultValue = this.radianToDegreeMinuteSecond(value, format) + " NE";
            }
        }
        return resultValue;
    }

    static radianToLatitude(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(radToDeg(value));
            const degrees = Math.floor(decimalDegress);
            const minutes = Math.floor((decimalDegress*3600)/60) % 60
            const seconds = (decimalDegress*3600 % 60)
            if (!format) format = this.latlonFormat;
            const sign = (value < 0) ? "S" : "N";
            return sprintf(format, degrees, minutes, seconds, sign); 
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static radianToLongitude(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(radToDeg(value));
            const degrees = Math.floor(decimalDegress);
            const minutes = Math.floor((decimalDegress*3600)/60) % 60
            const seconds = (decimalDegress*3600 % 60)
            if (!format) format = this.latlonFormat;
            const sign = (value < 0) ? "W" : "E";
            return sprintf(format, degrees, minutes, seconds, sign); 
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static radianToMeters(value: number, format: string|null = null): string {
        try {
            if (!format) format = this.metersFormat;
            return sprintf(format, radToDeg(value));            
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static identifyUnit(value: string): Units {
        let result: Units
        if (value.includes("NE") || value.includes("SE") || value.includes("SW") || value.includes("NW")) {
            result = Units.Rumo;
        } else if (/rad$/i.test(value)) {
            result = Units.Radian;
        } else if (/d$/i.test(value)) {
            result = Units.DegreeMinuteSecond
        } else if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.test(value)) {
            result = Units.Degree
        } else if (/^[\+-]?([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.test(value)) {
            result = Units.DegreeMinute
        } else if (/^[+-]?([0-9]+)\D+([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.test(value)) {
            result = Units.DegreeMinuteSecond
        } else {
            result = Units.Unknown;
        }
        return result;
    }    
}

function degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
}

function radToDeg(radians: number): number {
    return radians * 180 / Math.PI;
}
