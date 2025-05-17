import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-search-list',
  standalone: false,
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})
export class SearchListComponent {
 @Output() mapdata = new EventEmitter()
  searchForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  activeTab:any = 'device'
   config = {
    displayKey: "text",
    height: '200px',
    search: true
  };

  seachTypeDD:any = [
    {value:1,text:'Device Serial No.'},
    {value:2,text:'IMEI'},
    {value:3,text:'ICCID'},
    {value:4,text:'SIM 1'},
    {value:5,text:'SIM 2'},
    {value:6,text:'Company Name'},
    {value:7,text:'Owner Name'},
    {value:8,text:'Phone'},
  ]
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.searchForm = this.fb.group({
      searchType: ['', [Validators.required]],
      searchNo: ['', [Validators.required]],
    })
  }



  cancel() {
    this.bsModalService.hide();
  }
}
