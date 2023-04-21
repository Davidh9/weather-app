import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miles',
  standalone: true
})
export class MilesPipe implements PipeTransform {

  transform(value: number): unknown {
    return (value * 0.000568).toFixed(2) + " miles";
  }

}
