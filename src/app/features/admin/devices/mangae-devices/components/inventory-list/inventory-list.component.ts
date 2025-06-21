import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-inventory-list',
  standalone: false,
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {
 isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  inventoryList: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };
  searchKeyword: any = '';

  constructor(
    private deviceService: DeviceService,
    private commonService: CommonService,
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getInventoryList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Uid', title: 'Uid' },
      { key: 'Imei', title: 'Imei' },
      { key: 'Iccid', title: 'Iccid' },
      { key: 'Vahan Sno', title: 'Vahan Sno' },
      { key: 'Integrator', title: 'Integrator' },
      { key: 'P. TSP', title: 'P. TSP' },
      { key: 'P. SIM No', title: 'P. SIM No' },
      { key: 'S. TSP', title: 'S. TSP' },
      { key: 'S. SIM No', title: 'S. SIM No' },
      { key: 'Card State', title: 'Card State' },
      { key: 'Card Status', title: 'Card Status' },
      { key: 'Duration', title: 'Duration' },
      { key: 'Activation Date', title: 'Activation Date' },
      { key: 'Valid Till', title: 'Valid Till' },
    ]
  }

  getInventoryList() {
    this.inventoryList = []
    this.pagesize.count = 0
    this.isLoading = true;
    let payload = {
      "manufacturerId": Number(this.userDetails.Id),
      "devicetypeId":0,
      "pageNumber": this.pagesize.offset,
      "pageSize": this.pagesize.limit,
      "searchTerm": this.searchKeyword,
      "maxDevices": 0
    }
    this.deviceService.inventoryList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.inventoryList = res?.body?.result?.records || []        
        this.pagesize.count = res?.body?.result?.totalRecords || 0;
      }
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getInventoryList();
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getInventoryList();
  }

  onSearch(event:any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.inventoryList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getInventoryList();  
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getInventoryList();  
  }
}
