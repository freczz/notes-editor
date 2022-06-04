import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { INote } from "../../interfaces/interfaces";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public items: INote[] = [];

  constructor(private http: HttpService) {}

  public ngOnInit() {
    this.http.getNotes().subscribe((notes: INote[]): INote[] => this.items = notes);
  }
}
