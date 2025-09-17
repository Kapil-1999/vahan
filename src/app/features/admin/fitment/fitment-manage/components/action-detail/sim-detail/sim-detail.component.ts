import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../../shared/services/notification.service';
import { FitmentService } from '../../../services/fitment.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sim-detail',
  standalone: false,
  templateUrl: './sim-detail.component.html',
  styleUrl: './sim-detail.component.scss'
})
export class SimDetailComponent {
  @Output() mapdata = new EventEmitter()
  tittle: any
  button: any
  simForm: any
  simValue: any
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private NotificationService: NotificationService,
    private fitmentService: FitmentService


  ) { }

  ngOnInit() {
    this.simForm = this.fb.group({
      iccid: ['', [Validators.required, Validators.pattern(/^\d{20}$/)]],

      primaryImsi: [
        '',
        [Validators.required, Validators.pattern(/^\d{15}$/)],
      ],
      primaryMsidn: [
        '',
        [Validators.required, Validators.pattern(/^\+?[1-9]\d{9,15}$/)],
      ],
      secondryImsi: [
        '',
        [Validators.required, Validators.pattern(/^\d{15}$/)],
      ],
      secondryMsidn: [
        '',
        [Validators.required, Validators.pattern(/^\+?[1-9]\d{9,15}$/)],
      ],

      activationDate: ['', Validators.required],
      validTill: ['', Validators.required],
    });

    this.setInitialForm()

  }


  /*For Form Control*/
  setInitialForm() {
    const formatDate = (date: any) => {
      if (!date) return;
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      if (typeof date === 'string') {
        return date.split('T')[0];
      }
      return '';
    };

    if (this.simValue) {
      this.simForm.patchValue({
        iccid: this.simValue?.iccid,
        primaryImsi: this.simValue?.first_imsi,
        primaryMsidn: this.simValue?.first_sim,
        secondryImsi: this.simValue?.second_imsi,
        secondryMsidn: this.simValue?.second_sim,
        activationDate: formatDate(this.simValue?.activated_date),
        validTill: formatDate(this.simValue?.valid_till_date),
      });
    }
  }

  submit(formValue: any) {
    let payload = {
      "iccid": formValue?.iccid,
      "primaryImsi": formValue?.primaryImsi,
      "primaryMsidn": formValue?.primaryMsidn,
      "secondaryImsi": formValue?.secondryImsi,
      "secondaryMsidn": formValue?.secondryMsidn,
      "activated_date": formatDate(formValue?.activationDate, 'yyyy-MM-dd', 'en-US'),
      "valid_till_date": formatDate(formValue?.validTill, 'yyyy-MM-dd', 'en-US')
    }

    this.fitmentService.updateSimDetail(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.mapdata.emit()
        this.modalService.hide()
        this.NotificationService.successAlert('Sim Detail Modified Succesfully')
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })
  }

  /* for Hide Modal */
  cancel() {
    this.modalService.hide()
  }
}
