import { Component, Input } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-job-review-form',
  templateUrl: './job-review-form.component.html',
  styleUrls: ['./job-review-form.component.css']
})
export class JobReviewFormComponent {

  @Input() formTwoValues : any;
  @Input() editor : any;

  sanitizedEditor!: SafeHtml;


  constructor(
    private jobService: JobsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.sanitizedEditor = this.sanitizer.bypassSecurityTrustHtml(this.editor);
  }
}
