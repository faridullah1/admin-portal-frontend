import { DatePipe, DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { tableFormat } from "../models";

@Pipe({
    name: 'format'
})
export class FormatDataPipe implements PipeTransform {
    constructor(private dateFormater: DatePipe, private numberFormater: DecimalPipe) {}

    transform(value: any, format?: tableFormat) {
		if (!format) return value;

		switch(format) {
			case 'date':
				return this.dateFormater.transform(value, 'dd MMM YYYY');

			case 'datetime':
				return this.dateFormater.transform(value, 'dd MMM YYYY hh:mm');

			case 'number':
				return this.numberFormater.transform(value);

			case 'boolean':
				return value ? 'Yes' : 'No'
		}
    }
}