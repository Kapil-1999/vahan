import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { AdminManufacturerService } from '../../../../admin-manufacturer/admin-manufacturer-manage/services/admin-manufacturer.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-create-device',
  standalone: false,
  templateUrl: './create-device.component.html',
  styleUrl: './create-device.component.scss'
})
export class CreateDeviceComponent {
  @Output() mapdata = new EventEmitter();
  deviceForm! : FormGroup;
  tittle : string = 'Create';
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  productList:any
  manufacture:any
  constructor(
    private fb: FormBuilder,
    private bsModalService : BsModalService,
    private commonService : CommonService,
    private NotificationService :NotificationService,
    private deviceService : DeviceService
  ) {};

  ngOnInit() {    
    this.setInitialForm();
    this.getProductList()
  }

  setInitialForm () {    
    this.deviceForm = this.fb.group({
        uid: ['', [Validators.required]],
        imei: ['', [Validators.required]],
        iccid: ['', [Validators.required]],
        product: [null, [Validators.required]],
    })
  }

    // product dropdown
    getProductList() {
      this.commonService.productList().subscribe((res: any) => {
        if (res?.status == 200) {
          this.productList = res.body.result.map((item: any) => ({
            value: item.productId,
            text: item.product_Name
          }));
        }
      })
    }

  submit(formValue:any) {
    if (this.deviceForm.invalid) {
      this.deviceForm.markAllAsTouched();
      return;
    }
    let successMessage:any = 'Device Created Succesfully' 
  
   let payload = {
      "uid": formValue?.uid,
      "imei": formValue?.imei,
      "iccid": formValue?.iccid,
      "fk_manufacture_id": Number(this.manufacture.value),
      "fk_device_type_id": Number(formValue?.product?.value)
    }
    this.deviceService.addDevice(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.bsModalService.hide();
        this.mapdata.emit();
        this.NotificationService.successAlert(successMessage);
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.bsModalService.hide();
  }
}
