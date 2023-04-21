import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degrees',
  standalone: true,
})
export class DegreesPipe implements PipeTransform {

  transform(value: number): string {
    
    return Math.trunc(value - 273.15) + '°c';
  }

}
