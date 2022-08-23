import { Pipe, PipeTransform } from '@angular/core';
import { secondsToHourFormat } from '../services/functions.service';

@Pipe({
  name: 'secondsToHour',
})
export class SecondsToHourPipe implements PipeTransform {
  transform(seconds: number, maxValue?: number): string {
    return secondsToHourFormat(seconds, maxValue);
  }
}
