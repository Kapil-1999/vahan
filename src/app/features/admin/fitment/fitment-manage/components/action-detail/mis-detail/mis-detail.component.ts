import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../../shared/services/notification.service';
import { FitmentService } from '../../../services/fitment.service';

@Component({
  selector: 'app-mis-detail',
  standalone: false,
  templateUrl: './mis-detail.component.html',
  styleUrl: './mis-detail.component.scss'
})
export class MisDetailComponent {
  @Output() mapdata = new EventEmitter()
  misForm!: FormGroup
  tittle: any
  button: any
  misValue:any
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private NotificationService: NotificationService,
    private fitmentService:FitmentService
  ) { }

  ngOnInit() {
    this.setInitialForm()
  }

  /*For Form Control*/
  setInitialForm() {
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
    if (this.misValue) {
      this.misForm = this.fb.group({
        invoiceNo: [this.misValue?.ar_oemfitcertificate_model?.invoice_no, [Validators.required]],
        invoiceDate: [formatDate(this.misValue?.ar_oemfitcertificate_model?.invoice_date), [Validators.required]],
        calibrationDate: [formatDate(this.misValue?.ar_oemfitcertificate_model?.calibration_date), [Validators.required]],
        reCalibrationDate: [formatDate(this.misValue?.ar_oemfitcertificate_model?.recalibration), [Validators.required]],
        panicCount: [this.misValue?.ar_oemfitcertificate_model?.panic_count, [Validators.required]],
      })
    }
  }

  submit(formValue:any){
    if (this.misForm.invalid) {
      this.misForm.markAllAsTouched();
      return;
    }
    let payload = {
      "fk_ar_id": Number(this.misValue?.id),
      "calibration_date": formatDate(formValue.calibrationDate, 'yyyy-MM-dd', 'en-US'),
      "recalibration": formatDate(formValue.reCalibrationDate, 'yyyy-MM-dd', 'en-US'),
      "panic_count": Number(formValue?.panicCount),
      "invoice_no": formValue?.invoiceNo,
      "invoice_date": formatDate(formValue.invoiceDate, 'yyyy-MM-dd', 'en-US')
    }

    this.fitmentService.updateMisDetail(payload).subscribe((res:any)=>{
      if (res?.body?.isSuccess === true) {
        this.modalService.hide()
        this.mapdata.emit()
        this.NotificationService.successAlert('Mis Detail Modified Succesfully')
      }else{
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })
  }


  /* for Hide Modal */
  cancel() {
    this.modalService.hide()
  }
}
