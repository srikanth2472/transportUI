import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandPipe'
})
export class ThousandPipePipe implements PipeTransform {

  transform(value: any): any {
    if (value === '') { 
      return ''; 
    }
    let x, x1, x2, rgx;
    value += '';
    x = value.split('.');
    x1 = x[0];
    x2 = x[1];
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + (x2 ? `.${x2}` : '');
  }

}
