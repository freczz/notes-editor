import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import NoteDialogComponent from '../note-dialog/note-dialog.component';
import DataService from '../../services/data.service';
import { EMPTY_CARD, FormTitle } from '../../constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  constructor(private data: DataService, public dialog: MatDialog) {}

  public changeSearchValue(e: Event): void {
    this.data.changeFilterValue((e.target as HTMLInputElement).value);
  }

  public openNoteDialog(): void {
    this.data.changeCard(EMPTY_CARD);
    this.dialog.open(NoteDialogComponent);
    this.data.changeFormTitle(FormTitle.new);
  }
}
