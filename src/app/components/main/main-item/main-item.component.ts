import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INote } from '../../../interfaces/interfaces';
import { EMPTY_CARD } from '../../../constants/constants';
import DataService from '../../../services/data.service';
import MainItemDialogComponent from './main-item-dialog/main-item-dialog.component';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export default class MainItemComponent {
  @Input() card: INote = EMPTY_CARD;

  constructor(private data: DataService, public dialog: MatDialog) {}

  public openNoteDialog(): void {
    this.data.changeCard(this.card);
    this.dialog.open(MainItemDialogComponent);
  }
}
