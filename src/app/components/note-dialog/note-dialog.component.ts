import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  EMPTY_CARD,
  FieldsNames,
  MAX_LENGTH,
  TAG_PATTERN,
} from 'src/app/constants/constants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { INote } from '../../interfaces/interfaces';
import HttpService from '../../services/http.service';
import DataService from '../../services/data.service';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss'],
})
export default class NoteDialogComponent implements OnInit {
  public card: INote = EMPTY_CARD;

  public titles: string = '';

  public resultTags: string[] = [];

  public tags: string[] = [];

  public inputTitleTags: string[] = [];

  public inputDescriptionTags: string[] = [];

  public isTagExist: boolean = false;

  public newNoteForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(MAX_LENGTH)]),
    tags: new FormControl('', [Validators.pattern(TAG_PATTERN)]),
  });

  constructor(
    private http: HttpService,
    private data: DataService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<NoteDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.newNoteForm.get('tags')?.patchValue('#');
    this.data.currentFormTitle.subscribe((title: string): void => {
      this.titles = title;
    });
    this.data.currentCard.subscribe((card: INote): void => {
      if (card !== EMPTY_CARD) {
        this.card = card;
        this.newNoteForm.get('title')?.patchValue(this.card.title);
        this.newNoteForm.get('description')?.patchValue(this.card.description);
        this.tags = this.card.tags;
        this.getInputTags(FieldsNames.title, [
          ...this.card.title.matchAll(/#[^.# ]+/g),
        ]);
        this.getInputTags(FieldsNames.description, [
          ...this.card.description.matchAll(/#[^.# ]+/g),
        ]);
        this.resultTags = Array.from(
          new Set(
            this.tags
              .concat(this.inputTitleTags)
              .concat(this.inputDescriptionTags)
          )
        );
      }
    });
  }

  public addTag(title: string): void {
    if (this.newNoteForm.get('tags')?.valid) {
      this.isTagExist = this.tags
        .concat(this.inputTitleTags)
        .concat(this.inputDescriptionTags)
        .includes(title);
      if (this.newNoteForm.get('tags')?.value && !this.isTagExist) {
        this.tags.push(title);
        this.newNoteForm.get('tags')?.patchValue('#');
        this.newNoteForm.get('tags')?.markAsUntouched();
      }
    }
    this.resultTags = Array.from(
      new Set(
        this.tags.concat(this.inputTitleTags).concat(this.inputDescriptionTags)
      )
    );
  }

  public addTagWithEnter(e: Event): void {
    e.preventDefault();
    this.addTag((e.target as HTMLInputElement).value);
  }

  public getInputTags(fieldName: string, inputTags: RegExpMatchArray[]): void {
    const tags: string[] = [];
    for (let i = 0; i < inputTags.length; i += 1) {
      tags.push(inputTags[i][0]);
    }
    if (fieldName === FieldsNames.title) {
      this.inputTitleTags = tags;
    } else {
      this.inputDescriptionTags = tags;
    }
    this.resultTags = Array.from(
      new Set(
        tags
          .concat(this.tags)
          .concat(this.inputTitleTags)
          .concat(this.inputDescriptionTags)
      )
    );
  }

  public searchInputTags(e: Event): void {
    const element = e.target as HTMLInputElement;
    const inputTags: RegExpMatchArray[] = [
      ...element.value.matchAll(/#[^.# ]+/g),
    ];
    if (element.name === FieldsNames.title) {
      this.getInputTags(FieldsNames.title, inputTags);
    }
    if (element.name === FieldsNames.description) {
      this.getInputTags(FieldsNames.description, inputTags);
    }
  }

  public deleteTag(tagTitle: string): void {
    this.resultTags.splice(this.resultTags.indexOf(tagTitle), 1);
  }

  public validateFormFields(): void {
    this.newNoteForm.get('title')?.markAsTouched();
    this.newNoteForm.get('description')?.markAsTouched();
  }

  private getNotes(): void {
    this.http.getNotes().subscribe((notes: INote[]): void => {
      this.data.changeNotes(notes);
    });
  }

  public submitNote(note: INote): void {
    if (
      this.newNoteForm.get('title')?.valid &&
      this.newNoteForm.get('description')?.valid
    ) {
      if (this.card === EMPTY_CARD) {
        this.http.createNote(note).subscribe((): void => {
          this.getNotes();
        });
      } else {
        this.http.editNote(note, this.card.id).subscribe((): void => {
          this.getNotes();
          this.data.changeCard({ ...note, id: this.card.id });
        });
      }
      this.dialogRef.close();
    }
  }

  public submitNoteWithEnter(e: Event): void {
    e.preventDefault();
    this.submitNote({
      id: 0,
      title: this.newNoteForm.get('title')?.value,
      description: this.newNoteForm.get('description')?.value,
      tags: this.resultTags
    });
  }
}
