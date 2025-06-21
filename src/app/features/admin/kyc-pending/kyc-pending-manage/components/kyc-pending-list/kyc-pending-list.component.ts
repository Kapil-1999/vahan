import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateCategoryComponent } from '../../../../master/category-master/components/create-category/create-category.component';
import { CreateKycPendingComponent } from '../create-kyc-pending/create-kyc-pending.component';

@Component({
  selector: 'app-kyc-pending-list',
  standalone: false,
  templateUrl: './kyc-pending-list.component.html',
  styleUrl: './kyc-pending-list.component.scss'
})
export class KycPendingListComponent {
isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  bsModalRef!: BsModalRef;
  kycPendingList:any
  userDetails: any
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Created On', title: 'Created On' },
      { key: 'Serial Number', title: 'Serial Number' },
      { key: 'IMEI', title: 'IMEI' },
      { key: 'ICCID', title: 'ICCID' },
      { key: 'Sim 1', title: 'Sim 1' },
      { key: 'Sim 2', title: 'Sim 2' },
      { key: 'Action', title: 'Action' },
    
    ]
  }

  onAddkyc(value: any) {
      const initialState: ModalOptions = {
        initialState: {
          editData: value ? value : '',
        },
      };
      this.bsModalRef = this.modalService.show(
        CreateKycPendingComponent,
        Object.assign(initialState, {
          class: 'modal-md modal-dialog-centered alert-popup',
        })
      );
      this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        // this.getCityList()
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
