import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClipboardService } from 'ngx-clipboard';
import { NotificationService } from '../../../../../../shared/services/notification.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: false,
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {
  tittle: any
  button: any
  vehicleForm: any
  vehicleValue: any
  copy: boolean = false;
  copiedVehicleNo: any;
  copiedVehicleMake: any;
  copiedVehicleModel: any;
  copiedMfgYear: any;
  copiedEngineNo: any;
  copiedChassisNo: any;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private NotificationService: NotificationService,
    private clipboardService: ClipboardService,

  ) { }

  ngOnInit() {
    this.setInitialForm()

  }


  /*For Form Control*/
  setInitialForm() {
    if (this.vehicleValue) {
      this.vehicleForm = this.fb.group({
        vehicleNo: [this.vehicleValue?.vehicleNo, [Validators.required]],
        make: [this.vehicleValue?.vehicleMake, [Validators.required]],
        model: [this.vehicleValue?.vehicleModel, [Validators.required]],
        mfgYear: [this.vehicleValue?.vehicleMfgYear, [Validators.required]],
        engineNo: [this.vehicleValue?.vehicleEngineNo, [Validators.required]],
        chassisNo: [this.vehicleValue?.vehicleChassisNo, [Validators.required]],
      })
    }

  }

  copyContent(value: any, meassage: any) {
    this.clipboardService.copyFromContent(value); 

    this.copy = true;

    if (value === this.vehicleForm?.value.vehicleNo) {
      this.copiedVehicleNo = value;
    } else if (value === this.vehicleForm?.value.make) {
      this.copiedVehicleMake = value;
    } else if (value === this.vehicleForm?.value.model) {
      this.copiedVehicleModel = value;
    } else if (value === this.vehicleForm?.value.mfgYear) {
      this.copiedMfgYear = value;
    } else if (value === this.vehicleForm?.value.engineNo) {
      this.copiedEngineNo = value;
    } else if (value === this.vehicleForm?.value.chassisNo) {
      this.copiedChassisNo = value;
    }
    this.NotificationService.copyAlert(`${meassage} Copied`);
    setTimeout(() => {
      this.copy = false;
    }, 2000);
  }

  /* for Hide Modal */
  cancel() {
    this.modalService.hide()
  }
}
