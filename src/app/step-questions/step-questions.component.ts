import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-step-questions',
  templateUrl: './step-questions.component.html',
  styleUrls: ['./step-questions.component.css']
})
export class StepQuestionsComponent implements OnInit{

  questionsForm!: FormGroup;
  @Output() emitQuestions = new EventEmitter<string>();

  constructor (
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.questionsForm = this._fb.group({
      questions:
      this._fb.array([this._fb.control('')])
    })

    this.questionsForm.valueChanges.subscribe({
      next: (data) => {
        this.emitQuestions.emit(data)
      },
      error: (err) => {console.log(err)}
    })
  }

  getQuestions () {
    return this.questionsForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.getQuestions().push(this._fb.control(''));
  }

  removeQuestion (index: number) {
    this.getQuestions().removeAt(index);
  }
}
