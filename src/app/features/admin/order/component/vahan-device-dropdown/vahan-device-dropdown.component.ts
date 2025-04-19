import { Component, EventEmitter, Output } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonService } from '../../../../shared/services/common.service';
import { BsModalService } from 'ngx-bootstrap/modal';

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
  userDetails: any;
  vahanDeviceList: any;
  selectedCount: number = 0;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {     
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;     
    })   
    this.columns = [
      { key: 'Manufacture Name', title: 'Manufacture Name' },
      { key: 'Product Name', title: 'Product Name' },
      { key: 'UID', title: 'UID' },
      { key: 'IMEI', title: 'IMEI' },
      { key: 'ICCID', title: 'ICCID' },
    ];
    this.getDeviceVahanList()
   
  }

  getDeviceVahanList() {
    let payload = {
      "manufacturerId": Number(this.userDetails?.Id),
      "devicetypeId": (this.editData?.devicetypeId)
    }
    this.orderService.deviceVahanList(payload).subscribe((res: any) => {
     this.vahanDeviceList =  res?.body?.result || [];
    })
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.isAllSelected = checked;
    this.vahanDeviceList.forEach((row:any) => row.isSelected = checked);
    this.selectedCount = checked ? this.vahanDeviceList.length : 0;    
  }

  toggleRowSelection(index: number) {
    const currentSelectedCount = this.vahanDeviceList.filter((row:any) => row.isSelected).length;
    const qty = this.editData?.qty || 10; 
  
    if (!this.vahanDeviceList[index].isSelected) {
      if (currentSelectedCount >= qty) {
        alert(`You can only select ${qty} items as per the quantity limit.`);
        return; 
      }
    }
  
    this.vahanDeviceList[index].isSelected = !this.vahanDeviceList[index].isSelected;
    this.isAllSelected = this.vahanDeviceList.every((row:any) => row.isSelected);
    this.selectedCount = this.vahanDeviceList
    .filter((row: any) => row.isSelected)
    .map((device: any) => device.device_id);  
  }

  submit() {    
    this.mapdata.emit(this.selectedCount);
    this.modalService.hide()
  }

  cancel() {
    this.modalService.hide()
  }
}
