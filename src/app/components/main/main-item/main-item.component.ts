import { Component, Input } from '@angular/core';
import { INote } from "../../../interfaces/interfaces";
import {EMPTY_CARD, FormTitle} from "../../../constants/constants";
import {HttpService} from "../../../services/http.service";
import {DataService} from "../../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {NoteDialogComponent} from "../../note-dialog/note-dialog.component";
import {MainItemDialogComponent} from "./main-item-dialog/main-item-dialog.component";

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss']
})
export class MainItemComponent {
  @Input() card: INote = EMPTY_CARD;

  constructor(
    private http: HttpService,
    private data: DataService,
    public dialog: MatDialog,
  ) { }

  public openNoteDialog(): void {
    this.data.changeCard(this.card);
    this.dialog.open(MainItemDialogComponent);
  }

  public deleteNote(): void {
    this.http.deleteNote(this.card.id).subscribe((): void => {
      this.http.getNotes().subscribe((notes: INote[]): void => {
        this.data.changeNotes(notes);
      });
    });
  }
}
