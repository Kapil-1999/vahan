import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ShippingService } from '../../services/shipping.service';
import { CommonService } from '../../../../shared/services/common.service';
import { AddShippingAddressComponent } from '../add-shipping-address/add-shipping-address.component';
import { DeleteConfirmationComponent } from '../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-shipping-list',
  standalone: false,
  templateUrl: './shipping-list.component.html',
  styleUrl: './shipping-list.component.scss'
})
export class ShippingListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  shippinglist: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private shippingService: ShippingService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private notficationSerivce: NotificationService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
   }

  ngOnInit() {
    this.setInitialTable();
    this.getShippingList()
  }

  setInitialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Organization Name', title: 'Organization Name' },
      { key: 'Contact Person Name ', title: 'Contact Person Name' },
      { key: 'Contact Person Email', title: 'Contact Person Email' },
      { key: 'Contact Person Mobile', title: 'Contact Person Mobile' },
      { key: 'City', title: 'City' },
      { key: 'State', title: 'State' },
      { key: 'Pin code', title: 'Pin code' },
      { key: 'Is Default', title: 'Is Default' },
      { key: 'Address', title: 'Address' },
      { key: 'Action', title: 'Action' },
    ]
  }

  getShippingList() {
    this.isLoading = true;
    let payload = {
      "empId": Number(this.userDetails?.Id),
    }
    this.shippingService.shippingList(payload).subscribe((res: any) => {
      this.isLoading = false;
        this.shippinglist = res?.body?.result || [];
        this.pagesize.count = res?.body?.count || 0;
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }
  
  onAddShipping(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      AddShippingAddressComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getShippingList()
    });
  }

  onDeleteShipping(item:any) {
    let payload = {
      "shipingId": item?.shipingId,
      "empId": Number(this.userDetails?.Id),
    }
    let url = this.shippingService.deleteShippingAddress(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.orgName,
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
          this.notficationSerivce.successAlert(value?.body?.actionResponse);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getShippingList();
        } else {
          this.notficationSerivce.errorAlert(value?.body?.actionResponse);
        }
      }
    );
  }
}
