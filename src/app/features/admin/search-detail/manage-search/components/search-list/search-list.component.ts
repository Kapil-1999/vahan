import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { SearchDetailService } from '../../services/search-detail.service';

@Component({
  selector: 'app-search-list',
  standalone: false,
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})
export class SearchListComponent {
  isLoading:boolean = false
  @Output() mapdata = new EventEmitter()
  searchForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  activeTab: any = 'device'
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  placeholderText = 'Enter Search No.';

  seachTypeDD: any = [
    { value: 1, text: 'Device Serial No.' },
    { value: 2, text: 'IMEI' },
    { value: 3, text: 'ICCID' },
    { value: 4, text: 'SIM 1' },
    { value: 5, text: 'SIM 2' },
    { value: 6, text: 'Company Name' },
    { value: 7, text: 'Owner Name' },
    { value: 8, text: 'Phone' },
  ]
  searchValue: any;
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private searchService: SearchDetailService
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    const defaultSearchType = this.seachTypeDD[0];
    this.searchForm = this.fb.group({
      searchType: [defaultSearchType, [Validators.required]],
      searchNo: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
    })

    this.updatePlaceholder(defaultSearchType);
    this.searchForm.get('searchType')?.valueChanges.subscribe((selected) => {
      this.updatePlaceholder(selected);
    });
  }

  updatePlaceholder(selected: any) {
    this.placeholderText = selected?.text ? `Enter ${selected.text}` : 'Enter Search No.';
  }

  submit(formValue: any) {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    let payload = {
      "search_string": formValue?.searchNo
    }
    this.isLoading = true

    this.searchService.vahanSearchDetail(payload).subscribe((res: any) => {
       this.isLoading = false
      if (res?.body?.isSuccess === true) {
        this.searchValue = res?.body?.result
        console.log("this.searchValue",this.searchValue);
        
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.bsModalService.hide();
  }
}
