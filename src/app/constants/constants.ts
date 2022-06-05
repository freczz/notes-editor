import { INote } from '../interfaces/interfaces';

export const BASE_URL: string = 'http://localhost:3000/';

export const MAX_LENGTH: number = 256;

export const TAG_PATTERN: string = '#[^.# ]+';

export const EMPTY_CARD: INote = {
  id: 0,
  title: '',
  description: '',
  tags: [],
};

export enum FormTitle {
  new = 'create new note,create',
  old = 'edit note,edit',
}

export enum FieldsNames {
  title = 'title',
  description = 'description',
}
