import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours',
  standalone: true,
})
export class HoursPipe implements PipeTransform {

  transform(hour: string): unknown {
    let aux = hour.split(":");

    return aux[0]+ ":" + aux[1];
  }

}
