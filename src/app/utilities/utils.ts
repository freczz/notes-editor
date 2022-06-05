import { INote } from '../interfaces/interfaces';

export default function filterItems(
  items: INote[],
  filterValue: string
): INote[] {
  return filterValue
    ? items.filter((item: INote): boolean => {
        return item.tags.some((tag: string): boolean => {
          return (
            filterValue.toLowerCase() ===
            tag
              .toLowerCase()
              .substr(filterValue[0] === '#' ? 0 : 1, filterValue.length)
          );
        });
      })
    : items;
}
