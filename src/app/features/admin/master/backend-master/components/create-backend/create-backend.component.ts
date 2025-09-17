import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { SalesManagerService } from '../../../../sales-manager/sales-manager-manage/services/sales-manager.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-create-backend',
  standalone: false,
  templateUrl: './create-backend.component.html',
  styleUrl: './create-backend.component.scss'
})
export class CreateBackendComponent {
  @Output() mapdata = new EventEmitter()
  backendForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private backendService: BackendService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.backendForm = this.fb.group({
      backendName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.backendForm.patchValue({
        backendName: this.editData?.backendName,
      })
    }
  }

  submit(formValue: any) {
    if (this.backendForm.invalid) {
      this.backendForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.backendId) {
      payload = {
        "backendId": Number(this.editData?.backendId),
        "backendName": formValue?.backendName,
        "updatedBy": this.userDetails?.Id
      }
      successMessage = 'Backend Updated Succesfully'
      service = this.backendService.updateBackend(payload);
    } else {
      payload = {
        "backendName": formValue?.backendName,
        "createdBy": this.userDetails?.Id
      }
      successMessage = 'Backend Created Succesfully'
      service = this.backendService.createBackend(payload)
    }
    service.subscribe((res: any) => {
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
