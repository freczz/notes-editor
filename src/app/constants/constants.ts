import { INote } from "../interfaces/interfaces";

export const BASE_URL: string = 'http://localhost:3000/';

export const EMPTY_CARD: INote = {
  id: 0,
  title: '',
  description: '',
  tags: [],
}
