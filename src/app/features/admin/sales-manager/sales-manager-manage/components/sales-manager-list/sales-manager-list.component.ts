import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { SalesManagerService } from '../../services/sales-manager.service';
import { CreateSalesManagerComponent } from '../create-sales-manager/create-sales-manager.component';

@Component({
  selector: 'app-sales-manager-list',
  standalone: false,
  templateUrl: './sales-manager-list.component.html',
  styleUrl: './sales-manager-list.component.scss'
})
export class SalesManagerListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  salesManagerList: any
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
    private salesManagerService: SalesManagerService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getManagerList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Organization Name', title: 'Organization Name' },
      { key: 'Contact Person', title: 'Contact Person' },
      { key: 'Email', title: 'Email' },
      { key: 'Mobile', title: 'Mobile' },
      { key: 'GST', title: 'GST' },
      { key: 'PAN', title: 'PAN' },
      { key: 'Action', title: 'Action' }
    ]
  }

  getManagerList() {
    this.isLoading = true;
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id)
    }
    this.salesManagerService.managerList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.salesManagerList = res?.body?.result || []
        this.pagesize.count = this.salesManagerList?.length

      }
    })
  }

  onAddSalesManager(value: any) {

    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateSalesManagerComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getManagerList()
    });
  }


  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }
}
