import { Component, Input } from '@angular/core';
import { INote } from "../../../interfaces/interfaces";
import { EMPTY_CARD } from "../../../constants/constants";

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss']
})
export class MainItemComponent {
  @Input() card: INote = EMPTY_CARD;
}
