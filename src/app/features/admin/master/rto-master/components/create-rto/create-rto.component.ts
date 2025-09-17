import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { RtoService } from '../../services/rto.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-rto',
  standalone: false,
  templateUrl: './create-rto.component.html',
  styleUrl: './create-rto.component.scss'
})
export class CreateRtoComponent {
  @Output() mapdata = new EventEmitter()
  rtoForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  stateData: any
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  stateListData: any;
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private rtoService: RtoService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
    this.getStateDropdown()
  }

  setInitialForm() {
    this.rtoForm = this.fb.group({
      rtoCode: ['', [Validators.required,Validators.pattern(/^[A-Z]{2}[0-9]{2,3}$/)]],
      rtoName: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      stateName: ['', [Validators.required]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.rtoForm.patchValue({
        rtoCode: this.editData?.rtoCode,
        rtoName: this.editData?.rtoName,
      })
    }
  }


toRtoInput(event: any) {
  const input = event.target as HTMLInputElement;
  const formattedValue = this.commonService.formatRtoCode(input.value);
  input.value = formattedValue;
  this.rtoForm.get('rtoCode')?.setValue(formattedValue, { emitEvent: false });
}


  getStateDropdown() {
    this.commonService.stateDropdownList().subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.stateListData = res.body.result.map((item: any) => ({
          value: item.stateId,
          text: item.stateName,
        }));
        if (this.editData?.pk_StateId) {
          const matchedState = this.stateListData.find(
            (state: any) => state.value === this.editData?.pk_StateId
          );
          if (matchedState) {
            this.rtoForm.patchValue({ stateName: matchedState });
          }
        } else if (this.stateData) {
          const matchedState = this.stateListData.find(
            (state: any) => state.value === this.stateData.value
          );
          if (matchedState) {
            this.rtoForm.patchValue({ stateName: matchedState });
          }
        }
      }
    })
  }


  submit(formValue: any) {
    if (this.rtoForm.invalid) {
      this.rtoForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.rtoId) {
      payload = {
        "rtoId": Number(this.editData?.rtoId),
        "rtoCode": formValue?.rtoCode,
        "rtoName": formValue?.rtoName,
        "updatedBy": this.userDetails?.Id,
        "isDeleted": 0,
        "pk_StateId": Number(formValue?.stateName?.value)
      }
      successMessage = 'RTO Updated Succesfully'
      service = this.rtoService.updateRto(payload);
    } else {
      payload = {
        "rtoCode": formValue?.rtoCode,
        "rtoName": formValue?.rtoName,
        "createdBy": this.userDetails?.Id,
        "isDeleted": 0,
        "pk_StateId": Number(formValue?.stateName?.value)
      }
      successMessage = 'RTO Created Succesfully'
      service = this.rtoService.createRto(payload)
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
