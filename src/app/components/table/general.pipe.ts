import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { tableFormat } from "./models";

@Pipe({
    name: 'general'
})
export class GeneralPipe implements PipeTransform {
    constructor(private dateFormater: DatePipe) {}

    transform(value: any, format: tableFormat) {
        if (format && format === 'date')
        {
            return this.dateFormater.transform(value, 'dd MMM YYYY');
        }
		else if (format && format === 'datetime')
        {
            return this.dateFormater.transform(value, 'dd MMM YYYY hh:mm');
        }

        return value;
    }
}