import { Component, OnInit } from '@angular/core';
import { INote } from "../../interfaces/interfaces";
import { HttpService } from "../../services/http.service";
import { DataService } from "../../services/data.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMPTY_CARD, FieldsNames, MAX_LENGTH, TAG_PATTERN } from 'src/app/constants/constants';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit  {
  public card: INote = EMPTY_CARD;

  public titles: string = '';

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
    private dialogRef: MatDialogRef<NoteDialogComponent>,
  ) { }

  public ngOnInit(): void {
    this.newNoteForm.get('tags')?.patchValue('#');
    this.data.currentFormTitle.subscribe((title: string): string => this.titles = title);
    this.data.currentCard.subscribe((card: INote): void => {
      if (card !== EMPTY_CARD) {
        this.card = card;
        this.newNoteForm.get('title')?.patchValue(this.card.title);
        this.newNoteForm.get('description')?.patchValue(this.card.description);
        this.tags = this.card.tags;
        this.getInputTags(FieldsNames.title, [...this.card.title.matchAll(/#[^.# ]+/g)]);
        this.getInputTags(FieldsNames.description, [...this.card.description.matchAll(/#[^.# ]+/g)]);
      }
    });
  }

  public addTag(title: string): void {
    if (this.newNoteForm.get('tags')?.valid) {
      this.isTagExist = this.tags.includes(title);
      if (this.newNoteForm.get('tags')?.value && !this.isTagExist) {
        this.tags.push(title);
        this.newNoteForm.get('tags')?.patchValue('#');
        this.newNoteForm.get('tags')?.markAsUntouched();
      }
    }
  }

  public getInputTags(fieldName: string, inputTags: RegExpMatchArray[]): void {
    const tags: string[] = [];
    for (let i = 0; i < inputTags.length; i++) {
      tags.push(inputTags[i][0]);
    }
    fieldName === FieldsNames.title
      ? this.inputTitleTags = tags
      : this.inputDescriptionTags = tags;
  }

  public searchInputTags(e: Event): void {
    const element = e.target as HTMLInputElement;
    const inputTags: RegExpMatchArray[] = [...element.value.matchAll(/#[^.# ]+/g)];
    if (element.name === FieldsNames.title) {
      this.getInputTags(FieldsNames.title, inputTags);
    }
    if (element.name === FieldsNames.description) {
      this.getInputTags(FieldsNames.description, inputTags);
    }
  }

  public onDeleted(tagTitle: string): void {
    this.tags.splice(this.tags.indexOf(tagTitle), 1);
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
    if (this.newNoteForm.get('title')?.valid && this.newNoteForm.get('description')?.valid) {
      if (this.card == EMPTY_CARD) {
        this.http.createNote(note).subscribe((): void => {
          this.getNotes();
        });
      } else {
        this.http.editNote(note, this.card.id).subscribe((): void => {
          this.getNotes();
        });
      }
      this.dialogRef.close();
    }
  }
}
