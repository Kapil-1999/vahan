import { Component } from '@angular/core';
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
  isAllSelected: boolean = false;
  columns: any;
  editData: any;
  userDetails: any;
  vahanDeviceList: any;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
   
  }

  ngOnInit() { 
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;     
    })   
    this.columns = [
      { field: 'deviceId', title: 'Device Id' },
      { field: 'deviceName', title: 'Device Name' },
      { field: 'deviceType', title: 'Device Type' },
    ];
    this.getDeviceVahanList()
   
  }

  getDeviceVahanList() {
    let payload = {
      "manufacturerId": Number(this.userDetails?.Id),
      "devicetypeId": (this.editData)
    }
    this.orderService.deviceVahanList(payload).subscribe((res: any) => {
     this.vahanDeviceList =  [{
        deviceId: 12,
        deviceName: 'test',
        deviceType: 'test3'
     }];
    })
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.isAllSelected = checked;
    this.vahanDeviceList.forEach((row:any) => row.isSelected = checked);
  }

  toggleRowSelection(index: number) {
    this.vahanDeviceList[index].isSelected = !this.vahanDeviceList[index].isSelected;
    this.isAllSelected = this.vahanDeviceList.every((row:any) => row.isSelected);
  }

  cancel() {
    this.modalService.hide()
  }
}
