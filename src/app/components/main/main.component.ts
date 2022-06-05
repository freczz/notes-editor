import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { INote } from "../../interfaces/interfaces";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public items: INote[] = [];

  public filterValue: string = '';

  constructor(
    private http: HttpService,
    private data: DataService,
  ) {}

  public ngOnInit() {
    this.data.currentFilterValue.subscribe((value: string): string => this.filterValue = value);
    this.http.getNotes().subscribe((notes: INote[]): INote[] => this.items = notes);
    this.data.currentNotes.subscribe((notes: INote[]) => {
      this.items = notes;
    });
  }
}
