import { Pipe, PipeTransform } from '@angular/core';
import { INote } from "../interfaces/interfaces";
import { filterItems } from '../utilities/utils';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  private items: INote[] = []

  public transform(items: INote[], filterValue: string = ''): INote[] {
    this.items = items;
    return filterItems(this.items, filterValue);
  }
}
