import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { CommonService } from '../../../../../shared/services/common.service';
import { DeviceService } from '../../../../devices/mangae-devices/services/device.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upcoming-expiry',
  standalone: false,
  templateUrl: './upcoming-expiry.component.html',
  styleUrl: './upcoming-expiry.component.scss'
})
export class UpcomingExpiryComponent {
 isLoading: boolean = false;
   selectedTabIndex = 0;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
   tabs = [
    { label: 'Expiry in 30 days' },
    { label: 'Expiry in 60 days' },
    { label: 'Expiry in 90 days' },
    { label: 'Expiry in 120 days' }
  ];
  deviceList: any
  public columns!: any;
  userDetails: any
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  searchKeyword: string = '';

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
    this.getDeviceList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Uid', title: 'UID' },
      { key: 'Imei', title: 'IMEI' },
      { key: 'Iccid', title: 'ICCID' },
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

  getDeviceList() {
    this.deviceList = []
    this.pagesize.count = 0
    this.isLoading = true;
    let payload = {
      "manufacturerId": Number(this.userDetails.Id),
      "devicetypeId": 0,
      "pageNumber": this.pagesize.offset,
      "pageSize": this.pagesize.limit,
      "searchTerm": this.searchKeyword,
      "maxDevices": 0,
      "delaerId": 0
    }
    this.deviceService.deviceListV2(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.deviceList = res?.body?.result?.data || []
        this.pagesize.count = res?.body?.result?.totalCount || 0
      }
    })
  }

  downloadExcel() {
    if (!this.deviceList || this.deviceList.length === 0) {
      return;
    }

    const excelData = this.deviceList.map((item: any, index: number) => ({
      'S.No': index + 1,
      'Uid': item.uid,
      'Imei': item.imei,
      'Iccid': item.iccid,
      'Vahan S.No.': item.vahan_sno,
      "Integrator": item.integrator_name,
      "P. TSP": item.first_tsp,
      "P. Sim No.": item.first_sim,
      "S. TSP": item.second_tsp,
      "S. Sim No.": item.second_sim,
      "Card State": item.card_state,
      "Card Status": item.card_status,
      "Duration": item.sim_duration,
      "Activation Date": formatDate(item.activated_date, 'yyyy-MM-dd', 'en-US'),
      "Valid Till": formatDate(item.valid_till_date, 'yyyy-MM-dd', 'en-US'),
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Device List');
    XLSX.writeFile(wb, 'Device_List.xlsx');
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getDeviceList()
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getDeviceList()
  }
}