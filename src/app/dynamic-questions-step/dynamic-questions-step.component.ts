import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-dynamic-questions-step',
  templateUrl: './dynamic-questions-step.component.html',
  styleUrls: ['./dynamic-questions-step.component.css']
})
export class DynamicQuestionsStepComponent implements OnInit {  
  questionsForm: FormGroup;
  model: any = {};
  questionFields: FormlyFieldConfig[] = [];

  constructor(private fb: FormBuilder) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });

    // Add an initial question if needed
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  addQuestion() {
    const index = this.questions.length; // Index of the newly added question
    const questionFormGroup = this.fb.group({});
    this.questions.push(questionFormGroup);

    // Dynamically generate fields with dynamic keys based on the index
    const fields: FormlyFieldConfig[] = [
      {
        key: 'title' + (index + 1),
        type: 'input',
        props: {
          label: 'Question title',
          placeholder: 'Enter title',
          required: true,
        }
      },
      {
        key: 'type' + (index + 1),
        type: 'select',
        props: {
          label: 'Question type',
          placeholder: 'Select question type',
          required: true,
          options: [
            { value: 'number_min', label: 'Number(Min)' },
            { value: 'number_max', label: 'Number(Max)' },
            { value: 'boolean', label: 'Yes/No' },
          ]
        }
      },
      {
        key: 'minValue' + (index + 1),
        type: 'input',
        props: {
          label: 'Minimum Value',
          placeholder: 'Enter minimum value',
          type: 'number',
          required: true,
        },
        hideExpression: (model: any) => model['type' + (index + 1)] !== 'number_min'
      },
      {
        key: 'maxValue' + (index + 1),
        type: 'input',
        props: {
          label: 'Maximum Value',
          placeholder: 'Enter maximum value',
          type: 'number',
          required: true,
        },
        hideExpression: (model: any) => model['type' + (index + 1)] !== 'number_max'
      },
      {
        key: 'booleanValue' + (index + 1),
        type: 'radio',
        props: {
          label: 'Yes/No',
          required: true,
          options: [
            { value: true, label: 'Yes' },
            { value: false, label: 'No' },
          ]
        },
        hideExpression: (model: any) => model['type' + (index + 1)] !== 'boolean'
      }
    ];

    // Concatenate the newly generated fields with existing ones
    this.questionFields = this.questionFields.concat(fields);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
    // Remove the corresponding fields from questionFields
    this.questionFields.splice(index * 5, 5);
  }

  onSubmit() {
    console.log(this.questionsForm.value);
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }
  transformData(formsData: any): any {
    const transformed = {
      questions: formsData.questions.map((q: any, index: number) => ({
        title: formsData[`title${index + 1}`],
        type: formsData[`type${index + 1}`],
        ...(formsData[`type${index + 1}`] === 'number_min' && { minValue: formsData[`minValue${index + 1}`] }),
        ...(formsData[`type${index + 1}`] === 'number_max' && { maxValue: formsData[`maxValue${index + 1}`] }),
        ...(formsData[`type${index + 1}`] === 'boolean' && { booleanValue: formsData[`booleanValue${index + 1}`] }),
      })),
    };
    return transformed;
  }
} 

 