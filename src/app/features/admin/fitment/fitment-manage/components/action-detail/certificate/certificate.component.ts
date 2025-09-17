import { Component, EventEmitter, Output } from '@angular/core';
import { FitmentService } from '../../../services/fitment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../../shared/services/notification.service';

@Component({
  selector: 'app-certificate',
  standalone: false,
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss'
})
export class CertificateComponent {
  @Output() mapdata = new EventEmitter()
  certificateValue: any
  certificateForm!: FormGroup
  tittle: any
  button: any
  base64BackendCertificate: any;
  base64VahanCertificate: any;
  backendImagePath: any;
  vahanImagepath: any;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private NotificationService: NotificationService,
    private fitmentService: FitmentService

  ) { }

  ngOnInit() {
    console.log(this.certificateValue);

    this.setInitialForm()
  }

  /*For Form Control*/
 setInitialForm() {
  this.certificateForm = this.fb.group({
    backendCertificate: ['', [Validators.required]],
    vahanCertificate: ['', [Validators.required]],
  });

  if (this.certificateValue) {
    this.backendImagePath = this.certificateValue?.ar_certificate_model?.backend_certificate;
    this.vahanImagepath = this.certificateValue?.ar_certificate_model?.vahan_certificate;

    this.certificateForm.get('backendCertificate')?.clearValidators();
    this.certificateForm.get('backendCertificate')?.updateValueAndValidity();
    
    this.certificateForm.get('vahanCertificate')?.clearValidators();
    this.certificateForm.get('vahanCertificate')?.updateValueAndValidity();
  }
}


  getImageUrl(path: string): string {
    return path ? `${path.replace(/\\/g, '/')}` : '';
  }

  onFileChange(event: any, documentType: string): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        if (documentType === 'backend') {
          this.base64BackendCertificate = base64String;
        } else if (documentType === 'vahan') {
          this.base64VahanCertificate = base64String;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.certificateForm.invalid) {
      this.certificateForm.markAllAsTouched();
      return;
    }
    let payload = {
      "fk_ar_id": Number(this.certificateValue?.id),
      "backend_certificate_upload": this.backendImagePath && !this.base64BackendCertificate ? this.backendImagePath : this.base64BackendCertificate,
      "vahan_certificate_upload": this.vahanImagepath && !this.base64VahanCertificate ? this.vahanImagepath : this.base64VahanCertificate,
      "backend_certificate": "",
      "vahan_certificate": ""
    }
    
    this.fitmentService.uploadCertificate(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.modalService.hide()
        this.mapdata.emit()
        this.NotificationService.successAlert('Certificate Uploaded Succesfully')
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
