import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonService } from '../../../../shared/services/common.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PlaceOrderRequestComponent } from '../place-order-request/place-order-request.component';
import { Router } from '@angular/router';
import { VahanDeviceDropdownComponent } from '../vahan-device-dropdown/vahan-device-dropdown.component';
import { OrderStatusChangeComponent } from '../order-status-change/order-status-change.component';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  orderDashData: any;
  userDetails: any;
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  bsModalRef!: BsModalRef;
  label: string = 'Pending'
  statusType: any = 1;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }


  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
  }

  ngOnInit() {
    this.getOrderDashboardData();
    this.setInialTable()
  }

  setInialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Order Status', title: 'Order Status' },
      { key: 'Created On', title: 'Created On' },
      { key: 'Created By', title: 'Created By' },
      { key: 'Product', title: 'Product' },
      { key: 'Plan', title: 'Plan' },
      { key: 'State', title: 'State' },
      { key: 'Quantity', title: 'Quantity' },
      { key: 'Payment Mode', title: 'Payment Mode' },
      { key: 'Payment Status', title: 'Payment Status' },
      { key: 'Remark', title: 'Remark' },
      { key: 'Action', title: 'Action' }
    ]
  }


  getOrderDashboardData() {
    this.isLoading = true;
    let payload = {
      "request_by": Number(this.userDetails?.Id),
      "status_id": this.statusType
    }
    this.orderService.orderDashboard(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.orderDashData = res?.body?.result || {};
      this.pagesize.count = this.orderDashData?.requestList?.length;
    })
  }

  calculatePercentage(value: number): number {
    if (!value) return 0;
    const total = this.orderDashData?.pending + this.orderDashData?.processing +
      this.orderDashData?.dispatched + this.orderDashData?.rejected;
    return Math.round((value / total) * 100);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  onPlaceOrder() {
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      PlaceOrderRequestComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getOrderDashboardData()
    });
  }

  onShowOrder(label: any, statusType: any) {
    this.label = label;
    this.statusType = statusType;
    this.orderDashData = {
      requestList: [],
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
    this.getOrderDashboardData();
  }

  generateInvoice(item: any) {
    if (!item?.pk_request_id) {
      console.error('Missing request ID', item);
      return;
    }
    this.router.navigate(
      ['/admin/orders/order-details', item.pk_request_id, item.created_by]);
  }

  onOrderIssue(item: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: item,
        type: 'Order'
      },
    };
    this.bsModalRef = this.modalService.show(
      VahanDeviceDropdownComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getOrderDashboardData()
    });

  }

  orderHistory(item: any) {
    if (!item?.pk_request_id) {
      console.error('Missing request ID', item);
      return;
    }

    this.router.navigate(
      ['/admin/orders/order-history', item.pk_request_id, item.created_by]);
  }

  onChangeStatus(item: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: item,
      },
    };
    this.bsModalRef = this.modalService.show(
      OrderStatusChangeComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getOrderDashboardData()
    });
  }

  paymentHistory(item: any) {
    console.log(item);
    if (!item?.pk_request_id) {
      console.error('Missing request ID', item);
      return;
    }

    this.router.navigate(
      ['/admin/orders/payment-history', item.pk_request_id, item.created_by]);
  }
}
