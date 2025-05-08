import { Component } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VahanService } from '../../services/vahan.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { VahanListDetailsComponent } from '../vahan-list-details/vahan-list-details.component';

@Component({
  selector: 'app-vahan-list',
  standalone: false,
  templateUrl: './vahan-list.component.html',
  styleUrl: './vahan-list.component.scss'
})
export class VahanListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  vahanList: any;
  userDetails: any;
  dealerList: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  columns: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true,
    placeholder: "Select Dealer",
  };
  vahanForm!: FormGroup;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private vahanService: VahanService,
    private modalService : BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialForm();
    this.getDealerDropDown();
    this.setInialTable();
  }

  setInitialForm() {
    this.vahanForm = this.fb.group({
      dealerId: [null],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
    })
  }

  setInialTable() {
    this.columns = [
      { key: 'Customer Name', title: 'Customer Name' },
      { key: 'Device', title: 'Device' },
      { key: 'Created Date', title: 'Created Date' },
      { key: 'Invoice No', title: 'Invoice No' },
      { key: 'Isuue Qty', title: 'Isuue Qty' },
      { key: 'Request Qty', title: 'Request Qty' },
      { key: 'Request Status', title: 'Request Status' },
      { key: 'Payment Status', title: 'Payment Status' },
      { key: 'Verify Status', title: 'Verify Status' },
      { key: 'Verify Date', title: 'Verify Date' },
      { key: 'Action', title: 'Action' },
    ]
  }

  getDealerDropDown() {
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id),
    }
    this.commonService.commonDealer(payload).subscribe((res: any) => {
      if (res?.status == 200) {
        this.dealerList = res?.body;
      }
    })
  }

  onSelectDealer(event: any) {
    console.log(event);
    if (Array.isArray(event.value)) {
      return;
    }
    this.submit(this.vahanForm.value, null)
  }

  submit(formValue: any, e: any) {
    e?.preventDefault();
    if (this.vahanForm.invalid) {
      this.vahanForm.markAllAsTouched();
      return;
    }
    let payload = {
      "clientId": formValue?.dealerId ? Number(formValue?.dealerId?.value) : 0,
      "parentId": Number(this.userDetails?.Id),
      "fromDate": formValue?.fromDate,
      "toDate": formValue?.toDate,
    }
    this.vahanService.vahanList(payload).subscribe((res: any) => {
     this.vahanList = res?.body?.result || [];
     this.pagesize.count = this.vahanList?.length || 0;     
    })
    
  }


  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  bsModalRef!: BsModalRef
  viewVahan(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      VahanListDetailsComponent,
      Object.assign(initialState, {
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
  }

}
