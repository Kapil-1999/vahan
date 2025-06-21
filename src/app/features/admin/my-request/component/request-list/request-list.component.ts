import { Component } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { MyRequestService } from '../../services/my-request.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddRequestComponent } from '../add-request/add-request.component';
import { RequestInvoiceGenerateComponent } from '../request-invoice-generate/request-invoice-generate.component';
import { RequestPaymentComponent } from '../request-payment/request-payment.component';
import { ChangeRequestStatusComponent } from '../change-request-status/change-request-status.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  myRequestData: any;
  userDetails: any;
  label: string = 'Pending';
  statusType: any = 1;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };
  columns:any;

  constructor(
    private commonService: CommonService,
    private myRequestService : MyRequestService,
    private modalService : BsModalService,
    private router: Router

  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
  };

  ngOnInit() {
    this.setInialTable();
    this.getMyRequestData();
  }

  setInialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Request Status', title: 'Request Status' },
      { key: 'Request On', title: 'Request On' },
      { key: 'Request By', title: 'Request By' },
      { key : "Service", title: "Service" },
      { key: 'Invoice Status', title: 'Invoice Status' },
      { key: 'Invoice Date', title: 'Invoice Date' },
      { key: 'Payment Status', title: 'Payment Status' },
      { key: 'Payment Date', title: 'Payment Date' },
      { key: 'Verify Status', title: 'Verify Status' },
      { key: 'Verify Date', title: 'Verify Date' },
      { key: 'Refrence No.', title: 'Refrence No.' },
      {key : 'Action', title : 'Action'},
    ]
  }

  getMyRequestData() {
    this.isLoading = true;
      let payload = {
        "client_id": Number(this.userDetails.Id),
        "status_id": this.statusType
      }
      this.myRequestService.myReuesetData(payload).subscribe((res: any) => {
        this.isLoading = false; 
        this.myRequestData = res?.body?.result || {};
        this.pagesize.count = res?.body?.result?.serviceList?.length || 0;  
      })
  }

  calculatePercentage(value: number): number {
    if (!value) return 0;
    const total = this.myRequestData?.pending + this.myRequestData?.processing +
      this.myRequestData?.dispatched + this.myRequestData?.rejected;
    return Math.round((value / total) * 100);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  onShowOrder(label: any, statusType: any) {
    this.label = label;
    this.statusType = statusType;
    this.myRequestData = {
      serviceList: [],
      pending: 0,
      processing: 0,
      dispatched: 0,
      rejected: 0
    };
    this.pagesize = {
      limit: 25,
      offset: 1,
      count: 0
    };
    this.getMyRequestData();
  }

  bsModalRef! : BsModalRef
  onRequestGenerate(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      AddRequestComponent,
      Object.assign(initialState, {
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getMyRequestData()
    });
  }

  invoiceGenerate(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      RequestInvoiceGenerateComponent,
      Object.assign(initialState, {
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getMyRequestData()
    });
  }

  onPayment(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      RequestPaymentComponent,
      Object.assign(initialState, {
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getMyRequestData()
    });
  }

   onChangeSericeStatus(item: any) {
      const initialState: ModalOptions = {
        initialState: {
          editData: item,
        },
      };
      this.bsModalRef = this.modalService.show(
        ChangeRequestStatusComponent,
        Object.assign(initialState, {
          class: 'modal-md modal-dialog-centered alert-popup',
        })
      );
      this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        this.getMyRequestData()
      });
    }

    orderRequestHistory(item: any) {
      if (!item?.pk_device_request_id) {
        console.error('Missing request ID', item);
        return;
      }
  
      this.router.navigate(
        ['/admin/request/order-request-history', item.pk_device_request_id, item.created_by]);
    }

    paymentRequestHistory(item: any) {
      console.log(item);
      if (!item?.pk_device_request_id) {
        console.error('Missing request ID', item);
        return;
      }
  
      this.router.navigate(
        ['/admin/request/payment-request-history', item.pk_device_request_id, item.created_by]);
    }
}
