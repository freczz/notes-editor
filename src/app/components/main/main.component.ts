import { Component } from '@angular/core';
import { INote } from "../../interfaces/interfaces";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public items: INote[] = [];
}
