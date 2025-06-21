import { Component } from '@angular/core';
import { VerifyRequestStatusChangeComponent } from '../verify-request-status-change/verify-request-status-change.component';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { MyRequestService } from '../../services/my-request.service';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'app-payment-request-history',
  standalone: false,
  templateUrl: './payment-request-history.component.html',
  styleUrl: './payment-request-history.component.scss'
})
export class PaymentRequestHistoryComponent {
  isLoading: boolean = false;
  columns: any;
  paymentRequestHistoryData: any = {};
  requestId: any;
  createdBy: any;
  userDetails: any;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private myRequestService: MyRequestService,
    private modalService: BsModalService,
        private commonService: CommonService,
    
  ) {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.createdBy = params['createdBy'];
      this.getPaymentHistoryData();
    });
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
  };

  ngOnInit() {
    this.setInitialTable();
  }

  setInitialTable() {
    this.columns = [
      { key: 'Customer Name', title: 'Customer Name' },
      { key: 'Created Date', title: 'Created Date' },
      { key: 'Mobile No.', title: 'Mobile No.' },
      { key: 'Amount', title: 'Amount' },
      { key: 'Invoice No', title: 'Invoice No' },
      { key: 'Refrence No', title: 'Refrence No' },
      { key: 'Payment Mode', title: 'Payment Mode' },
      { key: 'Payment Status', title: 'Payment Status' },
      { key: 'Verify By', title: 'Verify By' },
      { key: 'Verify Date', title: 'Verify Date' },
      { key: 'Verify Status', title: 'Verify Status' },
    ]
    if (this.userDetails?.RoleId == "6") {
      this.columns.push({ key: 'Action', title: 'Action' });
    }
  }

  getPaymentHistoryData() {
    this.isLoading = false;
    let payload = {
      "pk_request_id": Number(this.requestId),
      "created_by": Number(this.createdBy),
      "isService": 1
    }
    this.myRequestService.paymentDetails(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.paymentRequestHistoryData = res?.body?.result || {};
    })
  }

  goBack() {
    this.location.back();
  }

  hasPaymentData(): boolean {
    return !!this.paymentRequestHistoryData &&
      Object.keys(this.paymentRequestHistoryData).length > 0;
  }

  bsModalRef!: BsModalRef
  onVerify(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value,
      },
    };
    this.bsModalRef = this.modalService.show(
      VerifyRequestStatusChangeComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getPaymentHistoryData()
    });
  }
}
