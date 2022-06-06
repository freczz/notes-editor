import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INote } from '../../../../interfaces/interfaces';
import { EMPTY_CARD, FormTitle } from '../../../../constants/constants';
import DataService from '../../../../services/data.service';
import NoteDialogComponent from '../../../note-dialog/note-dialog.component';
import HttpService from '../../../../services/http.service';

@Component({
  selector: 'app-main-item-dialog',
  templateUrl: './main-item-dialog.component.html',
  styleUrls: ['./main-item-dialog.component.scss'],
})
export default class MainItemDialogComponent implements OnInit {
  public card: INote = EMPTY_CARD;

  constructor(
    private http: HttpService,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.data.currentCard.subscribe((card: INote): void => {
      this.card = card;
    });
  }

  public openEditDialog(): void {
    this.dialog.open(NoteDialogComponent);
    this.data.changeFormTitle(FormTitle.old);
  }

  public deleteNote(): void {
    this.http.deleteNote(this.card.id).subscribe((): void => {
      this.http.getNotes().subscribe((notes: INote[]): void => {
        this.data.changeNotes(notes);
        this.dialog.closeAll();
      });
    });
  }
}
