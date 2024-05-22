import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-applications-listing',
  templateUrl: './applications-listing.component.html',
  styleUrls: ['./applications-listing.component.css']
})
export class ApplicationsListingComponent implements OnInit {

  applicationsList: any;
  candidate: any;
  isLoading = true;
  listLength: any;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void { 
    this.candidate = this.authService.getUserCrendentials()
    this.fetchApplicationByCandidateId();
  }

  fetchApplicationByCandidateId(){
    this.applicationService.getApplicationsByCandidateId(this.candidate._id).subscribe({
      next: (data) => { 
        this.applicationsList = data;
        this.listLength = this.applicationsList.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
