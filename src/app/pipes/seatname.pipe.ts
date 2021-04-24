import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'seatname'})
export class SeatNamePipe implements PipeTransform {
  transform(value: number): string {
    var name = String.fromCharCode(65+Math.floor(value/4));
    name = name+(1+value%4);
    return name;
  }
}