import { Pipe, PipeTransform } from '@angular/core';
import { secondsToHourFormat } from '../services/functions.service';

@Pipe({
  name: 'secondsToHour',
})
export class SecondsToHourPipe implements PipeTransform {
  transform(seconds: number): string {
    return seconds ? secondsToHourFormat(seconds) : '00:00:00:000';
  }
}
