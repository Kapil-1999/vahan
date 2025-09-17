import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { ServiceMasterService } from '../../services/service-master.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-service',
  standalone: false,
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {
  @Output() mapdata = new EventEmitter()
  serviceForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private serviceMasterService: ServiceMasterService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.serviceForm = this.fb.group({
      serviceName: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      description: ['', [Validators.required]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.serviceForm.patchValue({
        serviceName: this.editData?.service_name,
        description: this.editData?.service_description,
      })
    }
  }

  submit(formValue: any) {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.pk_service_id) {
      payload = {
        "pk_service_id": Number(this.editData?.pk_service_id),
        "service_name": formValue?.serviceName,
        "service_description": formValue?.description
      }
      successMessage = 'Service Updated Succesfully'
      service = this.serviceMasterService.updateService(payload);
    } else {
      payload = {
        "service_name": formValue?.serviceName,
        "service_description": formValue?.description
      }
      successMessage = 'Service Created Succesfully'
      service = this.serviceMasterService.addService(payload)
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
