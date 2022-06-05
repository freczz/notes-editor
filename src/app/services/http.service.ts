import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/constants';
import { INote } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export default class HttpService {
  constructor(private http: HttpClient) {}

  public getNotes(): Observable<INote[]> {
    return this.http.get<INote[]>(`${BASE_URL}notes`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    });
  }

  public createNote(data: INote): Observable<INote> {
    return this.http.post<INote>(`${BASE_URL}notes`, data, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  public editNote(data: INote, id: number): Observable<INote> {
    return this.http.put<INote>(`${BASE_URL}notes/${id}`, data, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  public deleteNote(id: number): Observable<INote> {
    return this.http.delete<INote>(`${BASE_URL}notes/${id}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }
}
