import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit{
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    this.router.navigate(['./', 'jobs'], {relativeTo: this.ar})
  }

}
