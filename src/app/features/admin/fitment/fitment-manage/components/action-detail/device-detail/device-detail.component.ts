import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../../shared/services/notification.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-device-detail',
  standalone: false,
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.scss'
})
export class DeviceDetailComponent {
  tittle: any
  button: any
  deviceForm: any
  deviceValue: any
  copy: boolean = false;
  copiedVuid: any;
  copiedImei: any;
  copiedUid: any;
  copiedIccid: any;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private clipboardService: ClipboardService,
    private NotificationService: NotificationService,


  ) { }

  ngOnInit() {
    this.setInitialForm()
  }

  copyContent(value: any, message: any) {
    this.clipboardService.copyFromContent(value);
    this.copy = true;
    if (value === this.deviceForm?.value.vuid) {
      this.copiedVuid = value;
    } else if (value === this.deviceForm?.value.imei) {
      this.copiedImei = value;
    } else if (value === this.deviceForm?.value.uid) {
      this.copiedUid = value;
    } else if (value === this.deviceForm?.value.iccid) {
      this.copiedIccid = value;
    }

    this.NotificationService.copyAlert(`${message} Copied`);
    setTimeout(() => {
      this.copy = false;
    }, 2000);
  }

  setInitialForm() {
    if (this.deviceValue) {
      this.deviceForm = this.fb.group({
        vuid: [this.deviceValue?.vuid, [Validators.required]],
        imei: [this.deviceValue?.imei, [Validators.required]],
        uid: [this.deviceValue?.uid, [Validators.required]],
        iccid: [this.deviceValue?.iccid, [Validators.required]],
      })
    }

  }

  cancel() {
    this.modalService.hide()
  }
}
