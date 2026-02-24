import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { Editor, Toolbar, toHTML  } from 'ngx-editor';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-step-two-job-form',
  templateUrl: './step-two-job-form.component.html',
  styleUrls: ['./step-two-job-form.component.css']
})

export class StepTwoJobFormComponent implements OnInit, OnDestroy, OnChanges{

  editor!: Editor;
  html!: any;

  @Input() genIaData: any;
  @Input() jobDetailsInfo: any;

  @Output() setEditor: EventEmitter<any> = new EventEmitter<any>();

  @Output() emitHTMLEditorContent: EventEmitter<any> = new EventEmitter<any>();


  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  constructor(
    private jobService: JobsService,
  ){

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Listen for changes in genIaData and update the editor content accordingly
    if (changes['genIaData'] && !changes['genIaData'].firstChange) {
      this.updateEditorContent();
    }


  }

  ngOnInit(): void {
    this.editor = new Editor({
      content: 'loading'
    });
    this.editor.valueChanges.subscribe({
      next: (data) => {
        this.setEditor.emit(data)
        console.log(data);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  private updateEditorContent(): void {
    // Set the editor content with the new data
    this.editor.setContent(this.genIaData);
  }

  newMessage() {
    //this.jobService.changeMessage(this.editor.getContent(this.))
  }

  editorChange(event: any){
    const htmlTexEditor = toHTML(this.html);
    console.log(htmlTexEditor);
    this.emitHTMLEditorContent.emit(htmlTexEditor)
  }
}
