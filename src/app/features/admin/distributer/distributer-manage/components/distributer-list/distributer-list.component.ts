import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DistributerService } from '../../services/distributer.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateDistributerComponent } from '../create-distributer/create-distributer.component';

@Component({
  selector: 'app-distributer-list',
  standalone: false,
  templateUrl: './distributer-list.component.html',
  styleUrl: './distributer-list.component.scss',
})
export class DistributerListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  distributerList: any;
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any;
  manuFacuturerList: any;
  selectedManufacture: any;
  config = {
    displayKey: 'text',
    height: '200px',
    search: true,
    placeholder: 'Select Manufacture',
  };
  get startValue(): number {
    return (
      this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1)
    );
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  searchKeyword: any = '';

  constructor(
    private distributerService: DistributerService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    if (this.userDetails?.RoleId == 2) {
      this.getDistributerList();
    } else {
      this.getManufactureList();
    }
    this.setInitialValue();
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
      { key: 'Action', title: 'Action' },
    ];
  }

  getManufactureList() {
    this.isLoading = true;
    let payload = {
      roleId: Number(this.userDetails?.RoleId),
      parentId: Number(this.userDetails?.Id),
    };
    this.commonService.manufacturerList(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.manuFacuturerList = res?.body?.result?.map((item: any) => ({
        value: item.empId,
        text: item.contactPersonName,
      }));
      this.selectedManufacture = this.manuFacuturerList[0];
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getDistributerList();
    });
  }

  onSelectManufacture(event: any) {
    this.selectedManufacture = event?.value;
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getDistributerList();
  }

  getDistributerList() {
    this.isLoading = true;
    let payload = {
      roleId: Number(this.userDetails?.RoleId),
      parentId: this.selectedManufacture
        ? Number(this.selectedManufacture?.value)
        : Number(this.userDetails?.Id),
      pageNumber: this.pagesize.offset,
      pageSize: this.pagesize.limit,
      searchTerm: this.searchKeyword,
    };
    this.distributerService.distributerList(payload).subscribe((res: any) => {
      this.isLoading = false;
      if (res?.body?.isSuccess == true) {
        this.distributerList = res?.body?.result?.data || [];
        this.pagesize.count = res?.body?.result?.totalCount || 0;
      }
    });
  }

  onAddDistributer(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateDistributerComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getDistributerList();
    });
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getDistributerList();
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt(
      (event.target as HTMLSelectElement).value,
      10
    );
    this.pagesize.limit = selectedSize;
    this.getDistributerList();
  }

  onSearch(event:any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.distributerList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getDistributerList();  
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getDistributerList();  
  }
}
