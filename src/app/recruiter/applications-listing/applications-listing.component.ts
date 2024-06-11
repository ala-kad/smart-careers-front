import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
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

  listOfColumns: ColumnItem[] = [
    {
      name: 'Email',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.candidateId.email.localeCompare(b.candidateId.email),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
      // listOfFilter: [
      //   { text: 'Joe', value: 'Joe' },
      //   { text: 'Jim', value: 'Jim', byDefault: true }
      // ],
      // filterFn: (list: string[], item: DataItem) => list.some(name => item.candidateId.firstname.indexOf(name) !== -1)
    },
    {
      name: 'Application Date',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => new Date(a.appplicationDate).getTime() - new Date(b.appplicationDate).getTime(),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'Fit',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => new Date(a.appplicationDate).getTime() - new Date(b.appplicationDate).getTime(),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    }
  ];

  applicationValidities: boolean[] = [];
  
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
        this.applications.forEach(application => {
          let valid = true; 
          // let isValid = true; // Assume application is valid by default
          application.responses.forEach(response => {        
            console.log('Data', typeof(response.questionId.booleanValue));

            let responseIsValid = false;
            if(response.questionId.type === "number_min") {
              responseIsValid = response.answer >= response.questionId.minValue ? true : false;
              // console.log('Validity', this.isValid);
              
            }
            else if(response.questionId.type === "number_max") {
              responseIsValid = response.answer <= response.questionId.maxValue ? true : false;
              // console.log('Validity', this.isValid);

            }
            else if(response.questionId.type === "boolean") {
             
              responseIsValid = response.answer === response.questionId.booleanValue ? true : false;
              console.log('Boolean Validity', responseIsValid);

            }
            if (!responseIsValid) {
              valid = false; // If any response is invalid, the entire application is invalid
            }
            // console.log(`Response "${response.questionId.title}" validity:`, responseIsValid);  
          });
          // console.log('Overall application validity:', valid);
          this.isValid = valid
          this.applicationValidities.push(valid);
          console.log('isValid:' ,this.isValid);
          
        });
      },
      error: (err) => {
        console.log((err));
      }
    })
  } 

}

 // let responseIsValid = false; // Assume response is not valid by default
              // if (response.questionId.type == 'boolean') {
              //   responseIsValid = (application.answer == response.questionId.booleanValue);
              //   console.log(`Response "${response.questionId.title}" validity:`, responseIsValid);
              // } else if (response.questionId.type == 'number_min') { 
              //   responseIsValid = (application.answer >= response.questionId.minValue);
              //   console.log(`Response "${response.questionId.title}" validity:`, responseIsValid);

              // } else if (response.questionId.type == 'number_max') { 
              //   responseIsValid = (application.answer <= response.questionId.maxValue);
              //   console.log(`Response "${response.questionId.title}" validity:`, responseIsValid);
              // }
              // console.log(`Response "${response.questionId.title}" validity:`, responseIsValid);
              // isValid = isValid && responseIsValid;

                        // console.log('Overall application validity:', isValid);
