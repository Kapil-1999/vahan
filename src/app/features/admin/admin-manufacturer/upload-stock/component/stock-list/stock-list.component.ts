import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { StockService } from '../../services/stock.service';
import { CreateStockComponent } from '../create-stock/create-stock.component';
import { AddBulkStockComponent } from '../add-bulk-stock/add-bulk-stock.component';

@Component({
  selector: 'app-stock-list',
  standalone: false,
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {
  @ViewChild('dropdownWrapper', { static: false }) dropdownWrapperRef!: ElementRef;
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  stockList: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  manuFactDrop: any;
  selectManu: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  config = {
    displayKey: "text",
    height: '200px',
    search: true,
    placeholder: `Select Manufacturer`,
  }
  isDropdownOpen: boolean = false;
  searchKeyword :any = ''

  constructor(
    private commonService: CommonService,
    private stockService: StockService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }


  ngOnInit() {
    this.setInitialValue();
    this.getManufacturerList();
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Manufacture Name', title: 'Manufacture Name' },
      { key: 'Product Name', title: 'Product Name' },
      { key: 'UID', title: 'UID' },
      { key: 'IMEI', title: 'IMEI' },
      { key: 'ICCID', title: 'ICCID' },
      { key: 'Created Date', title: 'Created Date' },
      { key: 'Updated Date', title: 'Updated Date' },
      { key: 'Action', title: 'Action' }
    ]
  };

  getManufacturerList() {
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id)
    }
    this.commonService.manufacturerList(payload).subscribe((res: any) => {
      this.manuFactDrop = res?.body?.result || [];
      this.manuFactDrop = this.manuFactDrop?.map((item: any) => ({
        value: item.empId,
        text: item.contactPersonName
      }));
      if (this.manuFactDrop?.length > 0) {
        this.selectManu = this.manuFactDrop[0];
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        this.getStockList(this.manuFactDrop[0].value)
      }
    })
  }

  onChangeManufacturer(event: any) {
    if (event?.value?.value) {
      this.selectManu = event?.value
      this.stockList = [];
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getStockList(event?.value?.value)
    } else {
      this.selectManu = null;
      this.stockList = [];
    }
  }

  getStockList(manuId: any) {
    this.isLoading = true;
    let payload = {
      "manufacturerId": Number(manuId),
      "devicetypeId": 0,
      "pageNumber": this.pagesize.offset,
      "pageSize": this.pagesize.limit,
      "searchTerm": this.searchKeyword,
      "maxDevices": 0
    }
    this.stockService.stockList(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.stockList = res?.body?.result?.data || [];
      this.pagesize.count =  res?.body?.result?.totalCount || 0;
    });
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getStockList(this.selectManu?.value)
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getStockList(this.selectManu?.value)
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.dropdownWrapperRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  onSingleDevice(value: any) {
    this.isDropdownOpen = false;
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
        selectManu: this.selectManu
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateStockComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getStockList(this.selectManu?.value)
    });
  }

  onBulkDevice() {
    this.isDropdownOpen = false;
    const initialState: ModalOptions = {
      initialState: {
        selectManu: this.selectManu
      },
    };
    this.bsModalRef = this.modalService.show(
      AddBulkStockComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getStockList(this.selectManu?.value)
    });
  }

  onSearch(event:any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.stockList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getStockList(this.selectManu?.value);  
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getStockList(this.selectManu?.value);  
  }
}
