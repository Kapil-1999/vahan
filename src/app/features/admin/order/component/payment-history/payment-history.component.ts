import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { VerifyStatusChangeComponent } from '../verify-status-change/verify-status-change.component';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'app-payment-history',
  standalone: false,
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent {
  isLoading: boolean = false;
  columns: any;
  paymentHistoryData: any = {};
  requestId: any;
  createdBy: any;
  userDetails: any;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalService: BsModalService,
    private commonService: CommonService,
    
  ) {

      this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.createdBy = params['createdBy'];
      this.getPaymentHistoryData();
    });
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
      "isService": 0
    }
    this.orderService.paymentDetails(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.paymentHistoryData = res?.body?.result || {};
    })
  }

  goBack() {
    this.location.back();
  }

  hasPaymentData(): boolean {
    return !!this.paymentHistoryData &&
      Object.keys(this.paymentHistoryData).length > 0;
  }

  bsModalRef!: BsModalRef
  onVerify(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value,
      },
    };
    this.bsModalRef = this.modalService.show(
      VerifyStatusChangeComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getPaymentHistoryData()
    });
  }
}
