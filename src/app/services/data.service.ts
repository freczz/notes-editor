import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { INote } from '../interfaces/interfaces';
import { EMPTY_CARD } from "../constants/constants";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private notes: BehaviorSubject<INote[]> = new BehaviorSubject([] as INote[]);

  private formTitle: BehaviorSubject<string> = new BehaviorSubject('');

  private card: BehaviorSubject<INote> = new BehaviorSubject(EMPTY_CARD);

  private filterValue: BehaviorSubject<string> = new BehaviorSubject('');

  public currentNotes: Observable<INote[]> = this.notes.asObservable();

  public currentFormTitle: Observable<string> = this.formTitle.asObservable();

  public currentCard: Observable<INote> = this.card.asObservable();

  public currentFilterValue: Observable<string> = this.filterValue.asObservable();

  public changeNotes(notes: INote[]): void {
    this.notes.next(notes);
  }

  public changeFormTitle(formTitle: string): void {
    this.formTitle.next(formTitle);
  }

  public changeCard(card: INote): void {
    this.card.next(card);
  }

  public changeFilterValue(filterValue: string): void {
    this.filterValue.next(filterValue);
  }
}
