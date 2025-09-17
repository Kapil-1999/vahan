import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { HsnService } from '../../services/hsn.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-hsn',
  standalone: false,
  templateUrl: './create-hsn.component.html',
  styleUrl: './create-hsn.component.scss'
})
export class CreateHsnComponent {
  @Output() mapdata = new EventEmitter()
  hsnForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private hsnService: HsnService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
   this.hsnForm = this.fb.group({
  hsnName: ['', [Validators.required, Validators.pattern(/^[A-Za-z& ]+$/), Validators.maxLength(50)]],
  hsnCode: ['', [Validators.required, Validators.pattern(/^\d{6,8}$/)]],
  cgst: ['', [Validators.required, Validators.pattern(/^(100(\.0{1,2})?|[0-9]{1,2}(\.[0-9]{1,2})?)$/)]],
  sgst: ['', [Validators.required, Validators.pattern(/^(100(\.0{1,2})?|[0-9]{1,2}(\.[0-9]{1,2})?)$/)]],
  igst: ['', [Validators.required, Validators.pattern(/^(100(\.0{1,2})?|[0-9]{1,2}(\.[0-9]{1,2})?)$/)]],
  date: ['', [Validators.required]]
});


    const formatDate = (date: any) => {
      if (!date) return '';
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      if (typeof date === 'string') {
        return date.split('T')[0];
      }
      return '';
    };

    if (this.editData) {
      this.tittle = 'Update'
      this.hsnForm.patchValue({
        hsnName: this.editData?.gsT_NAME,
        hsnCode: this.editData?.hsN_CODE,
        cgst: this.editData?.cgst,
        sgst: this.editData?.sgst,
        igst: this.editData?.igst,
        date: formatDate(this.editData?.efF_DATE),
      })
    }
    this.hsnForm.get('cgst')?.valueChanges.subscribe(() => this.updateIGST());
    this.hsnForm.get('sgst')?.valueChanges.subscribe(() => this.updateIGST());
  }

  updateIGST() {
  const cgst = parseFloat(this.hsnForm.get('cgst')?.value) || 0;
  const sgst = parseFloat(this.hsnForm.get('sgst')?.value) || 0;
  const igst = cgst + sgst;
  this.hsnForm.get('igst')?.setValue(igst, { emitEvent: false });
}



  submit(formValue: any) {
    if (this.hsnForm.invalid) {
      this.hsnForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.pk_gst_id) {
      payload = {
        "pk_gst_id": Number(this.editData?.pk_gst_id),
        "gsT_NAME": formValue?.hsnName,
        "hsN_CODE": formValue?.hsnCode,
        "cgst": Number(formValue?.cgst),
        "sgst": Number(formValue?.sgst),
        "igst": Number(formValue?.igst),
        "efF_DATE":  formatDate(formValue.date, 'yyyy-MM-dd', 'en-US')
      }
      successMessage = 'HSN Updated Succesfully'
      service = this.hsnService.updateHsn(payload);
    } else {
      payload = {
        "gsT_NAME": formValue?.hsnName,
        "hsN_CODE": formValue?.hsnCode,
        "cgst": Number(formValue?.cgst),
        "sgst": Number(formValue?.sgst),
        "igst": Number(formValue?.igst),
        "efF_DATE": formatDate(formValue.date, 'yyyy-MM-dd', 'en-US')
      }
      successMessage = 'HSN Created Succesfully'
      service = this.hsnService.addHsn(payload)
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
