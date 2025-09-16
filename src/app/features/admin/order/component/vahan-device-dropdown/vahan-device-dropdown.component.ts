import { Component, EventEmitter, Output } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonService } from '../../../../shared/services/common.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeviceService } from '../../../devices/mangae-devices/services/device.service';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-vahan-device-dropdown',
  standalone: false,
  templateUrl: './vahan-device-dropdown.component.html',
  styleUrl: './vahan-device-dropdown.component.scss'
})
export class VahanDeviceDropdownComponent {
  @Output() mapdata = new EventEmitter();
  isAllSelected: boolean = false;
  columns: any;
  editData: any;
  type: any
  userDetails: any;
  vahanDeviceList: any;
  selectedCount: number = 0;
  selectedCountData: any;
  isLoading: boolean = false;

  constructor(
    private DeviceService: DeviceService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private orderService: OrderService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Vahan Sno', title: 'Vahan Sno' },
      { key: 'UID', title: 'UID' },
      { key: 'IMEI', title: 'IMEI' },
      { key: 'P Sim No.', title: 'P Sim No.' },
      { key: 'S. SIM No', title: 'S. SIM No' },
      { key: 'Card Status', title: 'Card Status' },
      { key: 'Activation Date', title: 'Activation Date' },
      { key: 'Valid Till', title: 'Valid Till' },

    ];
    this.getDeviceVahanList()

  }

  getDeviceVahanList() {
    this.isLoading = true;
    let payload = {
      "manufacturerId": Number(this.userDetails?.Id),
      "devicetypeId": (this.editData?.fk_category_id),
      "pageNumber": 1,
      "pageSize": this.editData.balance_qty,
      "searchTerm": "",
      "maxDevices": 0
    }
    this.DeviceService.deviceList(payload).subscribe((res: any) => {
      this.isLoading = false;
      const data = res?.body?.result?.data || [];
      this.vahanDeviceList = Array.from(
        new Map(data?.map((item:any) => [item.device_id, item])).values()
      );
    })
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.isAllSelected = checked;
    this.vahanDeviceList.forEach((row: any) => row.isSelected = checked);
    this.selectedCount = checked ? this.vahanDeviceList.length : 0;
    this.selectedCountData = this.vahanDeviceList
      .filter((row: any) => row.isSelected)
      .map((device: any) => ({ product_id: device.device_id }));
  }

  toggleRowSelection(index: number, event?: any) {
    const qty = this.editData?.request_qty;
    const newValue = event ? event.target.checked : !this.vahanDeviceList[index].isSelected;
    const currentSelectedCount = this.vahanDeviceList.filter((row: any) => row.isSelected).length;
    if (!this.vahanDeviceList[index].isSelected && currentSelectedCount >= qty) {
      return;
    }

    this.vahanDeviceList[index].isSelected = newValue;
    this.isAllSelected = this.vahanDeviceList.every((row: any) => row.isSelected);
    this.selectedCount = this.vahanDeviceList.filter((row: any) => row.isSelected).length;
    this.selectedCountData = this.vahanDeviceList
      .filter((row: any) => row.isSelected)
      .map((device: any) => ({ product_id: device.device_id }));
  }

  submit() {
    let payload = {
      "request_id": this.editData?.pk_request_id,
      "customer_id": this.editData?.created_by,
      "issued_by": Number(this.userDetails?.Id),
      "itemList": this.selectedCountData
    };
    this.orderService.itemIssue(payload).subscribe((res: any) => {
      if (res?.body?.statusCode == 200) {
        this.notificationService.showSuccess(res?.body?.actionResponse)
        this.mapdata.emit();
        this.modalService.hide();
      } else {
        this.notificationService.showError(res?.body?.actionResponse)
      }
    })
  }

  cancel() {
    this.modalService.hide()
  }
}
