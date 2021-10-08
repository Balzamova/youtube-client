import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitConversion'
})
export class DigitConversionPipe implements PipeTransform {

  transform(str: string): string {
    if (str.length > 3) return this.convertStr(str);

    return str;
  }

  convertStr(str: string): string {
    const digit = +str.substring(0, str.length-3);

    if (digit < 1000) return `${digit}k`;

    return `${str.substring(0, str.length-6)}M`;
  }
}
