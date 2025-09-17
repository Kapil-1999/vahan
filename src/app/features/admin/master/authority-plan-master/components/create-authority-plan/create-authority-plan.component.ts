import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { AuthorityPlanService } from '../../services/authority-plan.service';

@Component({
  selector: 'app-create-authority-plan',
  standalone: false,
  templateUrl: './create-authority-plan.component.html',
  styleUrl: './create-authority-plan.component.scss'
})
export class CreateAuthorityPlanComponent {
  @Output() mapdata = new EventEmitter()
  authorityPlanForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  planData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private authorityPlanService: AuthorityPlanService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.authorityPlanForm = this.fb.group({
      planName: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      validityInDays: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      planRate: ['', [Validators.required]],
      description: ['',],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.authorityPlanForm.patchValue({
        planName: this.editData?.plan_name,
        validityInDays: this.editData?.validity_in_days,
        planRate: this.editData?.plan_rate,
        description: this.editData?.plan_description,
      })
    }
  }

  submit(formValue: any) {
    if (this.authorityPlanForm.invalid) {
      this.authorityPlanForm.markAllAsTouched();
      return;
    }

    let service: any;
    let successMessage: any;
    let payload: any = {
      "fk_authority_Id": Number(this.planData.value),
      "plan_name": formValue?.planName,
      "plan_description": formValue?.description,
      "validity_in_days": Number(formValue?.validityInDays),
      "plan_rate": Number(formValue?.planRate)
    };

    if (this.editData?.pk_plan_id) {
      successMessage = 'Plan Updated Succesfully'
      payload['pk_plan_id'] = Number(this.editData?.pk_plan_id);
      service = this.authorityPlanService.updateAuthorityPlan(payload)
    } else {
      successMessage = 'Plan Added Succesfully'
      service = this.authorityPlanService.addAuthorityPlan(payload);
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
