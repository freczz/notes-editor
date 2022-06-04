import { Component } from '@angular/core';
import { INote } from "../../interfaces/interfaces";
import { HttpService } from "../../services/http.service";
import { EMPTY_CARD } from "../../constants/constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private http: HttpService) { }

  public createNote(): void {
    this.http.createNote(EMPTY_CARD).subscribe((note: INote): INote => note);
  }
}
