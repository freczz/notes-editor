import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {
  @Input() title: string = '';

  @Output() onDeleted = new EventEmitter<string>()

  constructor() { }

  public ngOnInit(): void {
  }

  public deleteTag(): void {
    this.onDeleted.emit(this.title);
  }
}
