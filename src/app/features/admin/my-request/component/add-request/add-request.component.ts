import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { DeviceService } from '../../../devices/mangae-devices/services/device.service';
import { MyRequestService } from '../../services/my-request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-add-request',
  standalone: false,
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss'
})
export class AddRequestComponent {
  @Output() mapdata = new EventEmitter();

  vahanDeviceList: any;
  userDetails: any;
  columns :any;
  isLoading : boolean = false;
  isAllSelected: boolean = false;
  selectedCount: number = 0;
  selectedCountData: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  searchKeyword : any = '';
  serviceList: any;
  requesetForm!:FormGroup;

  constructor(
    private bsModalService : BsModalService,
    private commonService : CommonService,
    private myRequestService : MyRequestService,
    private fb : FormBuilder,
    private notificationService : NotificationService,
  ){};

  ngOnInit(): void {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;     
    })   
    this.columns = [
      { key: 'IMEI', title: 'IMEI' },
      { key: 'UID', title: 'UID' },
      {key : 'ICCID', title : 'ICCID'},
    ];
    this.setInitialForm();
    this.getDeviceVahanList();
    this.getServiceList();

  }

  setInitialForm() {
    this.requesetForm = this.fb.group({
      fk_service_id : ['',[Validators.required]],
      remarks : [''],
    })
  }

  getDeviceVahanList() {
    this.isLoading = true;
    let payload = {
      "manufacturerId": Number(this.userDetails?.Id),
      "devicetypeId": 0,
      "pageNumber": 1,
      "pageSize": 50,
      "searchTerm": this.searchKeyword,
    }
    this.myRequestService.requestDeviceList(payload).subscribe((res: any) => {
      this.isLoading = false;     
     this.vahanDeviceList =  res?.body?.result?.records || [];
    })
  }

  getServiceList() {
    this.commonService.serviceddList().subscribe((res: any) => {
      this.serviceList = res?.body || [];
    })
  }

  toggleRowSelection(index: number) {
    this.vahanDeviceList[index].isSelected = !this.vahanDeviceList[index].isSelected;
    this.isAllSelected = this.vahanDeviceList.every((row:any) => row.isSelected);
    this.selectedCount = this.vahanDeviceList.filter((row:any) => row.isSelected).length;    
    this.selectedCountData = this.vahanDeviceList
    .filter((row: any) => row.isSelected)
    .map((device: any) => ({fk_device_id : device.device_id}));          
  }

  submit(formValue:any , e:any) {
    e.preventDefault();
    if (this.requesetForm.invalid) {
      this.requesetForm.markAllAsTouched();
      return;
    }
    if(!this.selectedCountData?.length) {
      this.notificationService.showInfo('Please select at least one device');
      return;
    }
    let payload = {
      "fk_client_id": Number(this.userDetails?.Id),
      "fk_service_id": formValue.fk_service_id?.value,
      "remarks": formValue.remarks,
      "device_Requests": this.selectedCountData,
    }
    this.myRequestService.generateRequest(payload).subscribe((res: any) => {
        if(res?.body?.statusCode == 200) {
          this.bsModalService.hide();
          this.mapdata.emit();
            this.notificationService.showSuccess(res?.body?.actionResponse);
        } else {
            this.notificationService.showError(res?.body?.actionResponse);
        }
    })
  }

  cancel() {
    this.bsModalService.hide();
  }

  onSearch(event:any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.vahanDeviceList = [];
    this.getDeviceVahanList();  
  }

  clearSearch() {
    this.searchKeyword = '';
    this.getDeviceVahanList();  
  }


}
