import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
  _id: string,
  candidateId: {
    firstname: string;
    email: string;
    // Add other properties if needed
  };
  appplicationDate: string; // ISO date string
  // Add other properties if needed
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-applications-listing',
  templateUrl: './applications-listing.component.html',
  styleUrls: ['./applications-listing.component.css']
})
export class ApplicationsListingComponent implements OnInit{
   
  jobId: any;
  applications: any;
  isValid: boolean;
  applicationValidities: boolean[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Email',
      sortOrder: 'ascend',
      sortFn: (a: DataItem, b: DataItem) => a.candidateId.email.localeCompare(b.candidateId.email),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Application Date',
      sortOrder: 'ascend',
      sortFn: (a: DataItem, b: DataItem) => new Date(a.appplicationDate).getTime() - new Date(b.appplicationDate).getTime(),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'Fit',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Fit', value: true },
        { text: 'Not a fit', value: false }
      ],
      filterFn: (filterValues: boolean[], item: DataItem) => {
        const applicationIndex = this.applications.findIndex(app => app._id === item._id);
        if (applicationIndex === -1) return false; // handle case when application is not found
        const isValid = this.applicationValidities[applicationIndex];
        return filterValues.includes(isValid);
      }
    }
  ];
  
  constructor(
    private as: ApplicationService,
    private ar: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ar.paramMap.subscribe(
      (params) => {
        this.jobId = params.get('id');        
      }
    )
    this.fetchApplicationsByJobId();
  }
  
  fetchApplicationsByJobId(): void {
    this.as.getApplicationsByJobId(this.jobId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.applications = data;
        this.applicationValidities = this.applications.map(application => {
          let valid = true;
          application.responses.forEach(response => {
            let responseIsValid = false;
            if (response.questionId.type === "number_min") {
              responseIsValid = response.answer >= response.questionId.minValue;
            } else if (response.questionId.type === "number_max") {
              responseIsValid = response.answer <= response.questionId.maxValue;
            } else if (response.questionId.type === "boolean") {
              responseIsValid = response.answer === response.questionId.booleanValue;
            }
            if (!responseIsValid) {
              valid = false;
            }
          });
          return valid;
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

 
