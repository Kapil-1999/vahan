import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AdminManufacturerService } from '../../services/admin-manufacturer.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateAdminManufacturerComponent } from '../create-admin-manufacturer/create-admin-manufacturer.component';
import { ManufactureMoreDetailComponent } from './../manufacture-more-detail/manufacture-more-detail.component';

@Component({
  selector: 'admin-manufacturer-list',
  standalone: false,
  templateUrl: './admin-manufacturer-list.component.html',
  styleUrl: './admin-manufacturer-list.component.scss'
})
export class AdminManufacturerListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  manuFacuturerList: any
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
    private adminManufacturerService: AdminManufacturerService,
    private commonService: CommonService,
    private modalService : BsModalService
  ) { 
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit(): void {
    this.setInitialValue();
    this.getManufactureList();
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
      { key: 'Image', title: 'Image' },
      { key: 'More Detail', title: 'More Detail' },
      { key: 'Action', title: 'Action' }
    ]
  }

  get visibleColumns() {
    return this.columns.filter((col:any) =>
      !(this.userDetails?.RoleId == '6' && col.title === 'Action')
    );
  }

  getManufactureList() {
    this.isLoading = true;
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id)
    }
    this.adminManufacturerService.adminManufacturerList(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.manuFacuturerList = res?.body?.result || [];
      this.pagesize.count = this.manuFacuturerList?.length
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  onAddManufacture(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateAdminManufacturerComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getManufactureList()
    });
  }

showDetails(data:any){
   const initialState: ModalOptions = {
      initialState: {
        moreDetaildata: data
      },
    };
    this.bsModalRef = this.modalService.show(
      ManufactureMoreDetailComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
}
}
