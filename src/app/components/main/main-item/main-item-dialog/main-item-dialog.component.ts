import { Component, OnInit } from '@angular/core';
import { INote } from "../../../../interfaces/interfaces";
import { EMPTY_CARD, FormTitle } from "../../../../constants/constants";
import { DataService } from "../../../../services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { NoteDialogComponent } from "../../../note-dialog/note-dialog.component";

@Component({
  selector: 'app-main-item-dialog',
  templateUrl: './main-item-dialog.component.html',
  styleUrls: ['./main-item-dialog.component.scss']
})
export class MainItemDialogComponent implements OnInit {
  public card: INote = EMPTY_CARD;

  constructor(
    private data: DataService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.data.currentCard.subscribe((card: INote): INote => this.card = card);
  }

  public openEditDialog(): void {
    this.dialog.open(NoteDialogComponent);
    this.data.changeFormTitle(FormTitle.old);
  }

  public close(): void {
    this.dialog.closeAll();
  }
}
