import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { DeviceService } from '../../../devices/mangae-devices/services/device.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MycomplainService } from '../../services/mycomplain.service';

@Component({
  selector: 'app-generate-complain',
  standalone: false,
  templateUrl: './generate-complain.component.html',
  styleUrl: './generate-complain.component.scss'
})
export class GenerateComplainComponent {
  @Output() mapdata = new EventEmitter();
  complainForm!: FormGroup;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  priorityList: any
  categoryList: any
  refrenceList: any

  manufacture: any
  userDetails: any;
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private commonService: CommonService,
    private NotificationService: NotificationService,
    private myComplainService: MycomplainService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
  };

  ngOnInit() {
    this.setInitialForm();
    this.getComplainCategoryDD()
    this.getrefrenceTypeDD()
    this.getPriorityDD()
  }

  setInitialForm() {
    this.complainForm = this.fb.group({
      category: [null, [Validators.required]],
      refrence: [null, [Validators.required]],
      refrenceValue: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      priority: [null, [Validators.required]],
      comp_description: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
    })
  }

  // product dropdown
  getComplainCategoryDD() {
    this.commonService.complainCategoryListDD().subscribe((res: any) => {
      console.log("res", res);
      if (res?.status == 200) {
        this.categoryList = res?.body
      }
    })
  }

  // Refrence Type dropdown
  getrefrenceTypeDD() {
    this.commonService.refrenceListDD().subscribe((res: any) => {
      console.log("res", res);
      if (res?.status == 200) {
        this.refrenceList = res?.body
      }
    })
  }

  onReferenceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase().trim();
    this.complainForm.get('refrenceValue')?.setValue(value, { emitEvent: false });
  }

  // Refrence Type dropdown
  getPriorityDD() {
    this.commonService.priorityListDD().subscribe((res: any) => {
      console.log("res", res);
      if (res?.status == 200) {
        this.priorityList = res?.body
      }
    })
  }

  submit(formValue: any) {
    if (this.complainForm.invalid) {
      this.complainForm.markAllAsTouched();
      return;
    }
    let payload = {
      "fk_complaint_category_id": Number(formValue?.category?.value),
      "fk_ref_id": Number(formValue?.refrence?.value),
      "ref_value": formValue?.refrenceValue,
      "complaint_description": formValue?.comp_description,
      "fk_client_id": Number(this.userDetails.Id),
      "fk_complaint_priority": Number(formValue?.priority?.value)
    }
    this.myComplainService.newComplainRequest(payload).subscribe((res: any) => {
      if (res?.body?.statusCode == 200) {
        this.bsModalService.hide();
        this.mapdata.emit();
        this.NotificationService.successAlert(res?.body?.actionResponse);
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.bsModalService.hide();
  }
}
