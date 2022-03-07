import { DatePipe, DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { tableFormat } from "../models";

@Pipe({
    name: 'format'
})
export class FormatDataPipe implements PipeTransform {
    constructor(private dateFormater: DatePipe, private numberFormater: DecimalPipe) {}

    transform(value: any, format: tableFormat) {
        if (format && format === 'date')
        {
            return this.dateFormater.transform(value, 'dd MMM YYYY');
        }
		else if (format && format === 'datetime')
        {
            return this.dateFormater.transform(value, 'dd MMM YYYY hh:mm');
        }
		else if (format && format === 'number') {
			return this.numberFormater.transform(value);
		}
		
        return value;
    }
}