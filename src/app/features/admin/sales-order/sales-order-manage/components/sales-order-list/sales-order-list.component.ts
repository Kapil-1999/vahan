import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateSalesManagerComponent } from '../../../../sales-manager/sales-manager-manage/components/create-sales-manager/create-sales-manager.component';
import { SalesManagerService } from '../../../../sales-manager/sales-manager-manage/services/sales-manager.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { CreateSalesOrderComponent } from '../create-sales-order/create-sales-order.component';
import { AsignInventoryComponent } from '../asign-inventory/asign-inventory.component';
import { UpdateDocketComponent } from '../update-docket/update-docket.component';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order-list',
  standalone: false,
  templateUrl: './sales-order-list.component.html',
  styleUrl: './sales-order-list.component.scss'
})
export class SalesOrderListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  salesOrderList: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  dealerList: any;
  selectedDealer: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true,
    placeholder: "Select Dealer",

  };
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private salesOrderService: SalesOrderService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private NotificationService: NotificationService,
    private router:Router
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getDealerDropDown()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Order Date	', title: 'Order Date	' },
      { key: 'PO Number', title: 'PO Number' },
      { key: 'Dealer', title: 'Dealer' },
      { key: 'Model', title: 'Model' },
      { key: 'Rate', title: 'Rate' },
      { key: 'Quantity', title: 'Quantity' },
      { key: 'Tax', title: 'Tax' },
      { key: 'Amount', title: 'Amount' },
      { key: 'Docket No', title: 'Docket No' },
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
        this.dealerList = res?.body
        this.selectedDealer = this.dealerList[0]
        this.getSalesOrderList()
      }
    })
  }

  onSelectDealer(event: any) {
    this.selectedDealer = event?.value
    this.salesOrderList = []
    this.getSalesOrderList()


  }

  getSalesOrderList() {
    let payload = {
      "parentId": Number(this.userDetails?.Id),
      "clientId": this.selectedDealer?.value ? Number(this.selectedDealer?.value) : 0
    }
    this.salesOrderService.salesList(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.salesOrderList = res?.body?.result
        this.pagesize.count = this.salesOrderList?.length
      }
    })
  }

  onAddSalesOrder(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        selectedDealerId: this.selectedDealer,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateSalesOrderComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getSalesOrderList()
    });
  }

  uploadInventory(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        selectedDealerId: this.selectedDealer,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      AsignInventoryComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getSalesOrderList()
    });
  }

  updateDocket(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        selectedDealerId: this.selectedDealer,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      UpdateDocketComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getSalesOrderList()
    });
  }

  onDeleteSalesList(item: any) {
    let payload = {
      "po_request_id": Number(item?.pk_order_header_id)
    }
    let url = this.salesOrderService.deleteSalesList(payload)
    const initialState: ModalOptions = {
      initialState: {
        title:`PO : ${item?.po_no}` ,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.status == 200) {
          this.NotificationService.successAlert(value?.body?.actionResponse);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getSalesOrderList();
        } else {
          this.NotificationService.errorAlert(value?.body?.actionResponse);
        }
      }
    );
  }

  redirectTo(item:any){
    this.router.navigate(['/admin/sales-order/inventory-order-detail',item?.pk_order_header_id])
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }
}
