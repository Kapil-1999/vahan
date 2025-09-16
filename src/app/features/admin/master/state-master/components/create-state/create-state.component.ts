import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-create-state',
  standalone: false,
  templateUrl: './create-state.component.html',
  styleUrl: './create-state.component.scss'
})
export class CreateStateComponent {
  @Output() mapdata = new EventEmitter()
  stateForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private stateService: StateService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.stateForm = this.fb.group({
      stateName: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.stateForm.patchValue({
        stateName: this.editData?.stateName,
      })
    }
  }

  submit(formValue: any) {
    if (this.stateForm.invalid) {
      this.stateForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.stateId) {
      payload = {
        "stateId": Number(this.editData?.stateId),
        "stateName": formValue?.stateName,
        "updatedBy": this.userDetails?.Id
      }
      successMessage = 'State Updated Succesfully'
      service = this.stateService.updateState(payload);
    } else {
      payload = {
        "stateName": formValue?.stateName,
        "createdBy": this.userDetails?.Id
      }
      successMessage = 'State Created Succesfully'
      service = this.stateService.createState(payload)
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
