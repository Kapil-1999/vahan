import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { ComplainService } from '../../services/complain.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-complain',
  standalone: false,
  templateUrl: './create-complain.component.html',
  styleUrl: './create-complain.component.scss'
})
export class CreateComplainComponent {
  @Output() mapdata = new EventEmitter()
  complainForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private complainService: ComplainService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.complainForm = this.fb.group({
      complainName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      description: ['', [Validators.required]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.complainForm.patchValue({
        complainName: this.editData?.complaint_name,
        description: this.editData?.complaint_description,
      })
    }
  }

  submit(formValue: any) {
    if (this.complainForm.invalid) {
      this.complainForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.pk_complaint_id) {
      payload = {
        "pk_complaint_id": Number(this.editData?.pk_complaint_id),
        "complaint_name": formValue?.complainName,
        "complaint_description": formValue?.description
      }
      successMessage = 'Complain Updated Succesfully'
      service = this.complainService.updateComplain(payload);
    } else {
      payload = {
        "complaint_name": formValue?.complainName,
        "complaint_description": formValue?.description
      }
      successMessage = 'Complain Created Succesfully'
      service = this.complainService.addComplain(payload)
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
