import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { QuestionService } from '../services/question.service';


@Component({
  selector: 'app-step-questions',
  templateUrl: './step-questions.component.html',
  styleUrls: ['./step-questions.component.css']
})
export class StepQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  @Output() emitQuestions = new EventEmitter<string[]>();

  constructor(
    private fb: FormBuilder,
    private qs: QuestionService,
  ) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([
        this.createQuestionGroup()
      ])
    });
  }

  ngOnInit(): void { 
    this.questionsForm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
        this.emitQuestions.emit(this.questionsForm.value)
      },
      error: (err) => {console.log(err)}
    })
  }

  createQuestionGroup(): FormGroup {
    return this.fb.group({
      title: [''],
      type: [''],
      minValue: [{ value: '', disabled: true }],
      maxValue: [{ value: '', disabled: true }],
      booleanValue: [{ value: '', disabled: true }]
    });

   
  }

  getQuestions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.getQuestions().push(this.createQuestionGroup());
  }

  removeQuestion(index: number) {
    this.getQuestions().removeAt(index);
  }

  onTypeChange(selectedType: string, index: number) {
    const question = this.getQuestions().at(index);

    if (selectedType === 'number_min') {
      question.get('minValue').enable();
      question.get('maxValue').disable();
      question.get('booleanValue').disable();
    } else if (selectedType === 'number_max') {
      question.get('minValue').disable();
      question.get('maxValue').enable();
      question.get('booleanValue').disable();
    } else if (selectedType === 'boolean') {
      question.get('minValue').disable();
      question.get('maxValue').disable();
      question.get('booleanValue').enable();
    } else {
      question.get('minValue').disable();
      question.get('maxValue').disable();
      question.get('booleanValue').disable();
    }
  }

  onSubmit() {
    console.log(this.questionsForm.value);
    this.qs.createQuestionnaire(this.questionsForm.value.questions).subscribe({
      next: (data) => { 
        console.log(data);
      },
      error: (err) => { 
        console.log(err);
      }
    });
  }
}
