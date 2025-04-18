import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { DeviceService } from '../../services/device.service';
import { CreateDeviceComponent } from '../create-device/create-device.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-device-list',
  standalone: false,
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
 isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  deviceList: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  manuFacuturerList: any;
  selectedManufacture: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true,
    placeholder:'Select Manufacture'
  }
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private deviceService: DeviceService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private NotificationService :NotificationService,
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getManufactureList()
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
      { key: 'Sim Detail', title: 'Modify Sim Detail' }
    ]
  }

  getManufactureList() {
    this.isLoading = true;
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id)
    }
    this.commonService.manufacturerList(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.manuFacuturerList = res?.body?.result?.map((item: any) => ({
        value: item.empId,
        text: item.contactPersonName
      }));;
      this.selectedManufacture = this.manuFacuturerList[0]
      this.getDeviceList()

    })
  }

  onSelectManufacture(event: any) {
    this.selectedManufacture = event?.value
    this.getDeviceList()
  }

  getDeviceList() {
    this.deviceList = []
    this.pagesize.count = 0
    this.isLoading = true;
    let payload = {
      "manufacturerId": Number(this.selectedManufacture?.value)
    }
    this.deviceService.deviceList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.deviceList = res?.body?.result || []        
        this.pagesize.count = this.deviceList?.length
      }
    })
  }

  getDeviceModify(data: any) {
    this.isLoading = true
    let payload = {
      "iccid": data?.iccid
    }
    this.deviceService.modifiyDevice(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess === true) {
        this.NotificationService.successAlert(res?.body?.actionResponse)
        this.getDeviceList()
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse || 'Data Not Updated')
      }
    })
  }

    onAdddevice(value:any) {
      const initialState: ModalOptions = {
        initialState: {
          manufacture:this.selectedManufacture
        },
      };
      this.bsModalRef = this.modalService.show(
        CreateDeviceComponent,
        Object.assign(initialState, {
          class: 'modal-lg modal-dialog-centered alert-popup',
        })
      );
      this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        this.getDeviceList()
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
