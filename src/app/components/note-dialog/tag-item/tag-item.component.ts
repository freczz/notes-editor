import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss'],
})
export default class TagItemComponent {
  @Input() title: string = '';

  @Output() delete = new EventEmitter<string>();

  public deleteTag(): void {
    this.delete.emit(this.title);
  }
}
