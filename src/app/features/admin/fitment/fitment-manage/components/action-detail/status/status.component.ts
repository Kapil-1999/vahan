import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../../shared/services/notification.service';
import { FitmentService } from '../../../services/fitment.service';

@Component({
  selector: 'app-status',
  standalone: false,
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  @Output() mapdata = new EventEmitter()
  statusValue: any
  statusForm!: FormGroup
  tittle: any
  button: any
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };

  config1 = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  manufactureData: any;
  productList: any;
  statusDropdown = [
    {
      "value": 0,
      "text": "Open"
    },
    {
      "value": 1,
      "text": "Close"
    },
  ];
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
    if (this.statusValue) {
      console.log("this.statusValue",this.statusValue);
      
      const selectedStatus = this.statusValue?.ar_status_model?.fk_status == 1 ?    {
        "value": 0,
        "text": "Open"
      } :  {
        "value": 1,
        "text": "Close"
      }
     
      this.statusForm = this.fb.group({
        status: [selectedStatus, [Validators.required]],
        comment: [this.statusValue?.ar_status_model?.comment, [Validators.required]],
      })
    }
  }

  submit(formValue: any) {
    if (this.statusForm.invalid) {
      this.statusForm.markAllAsTouched();
      return;
    }
    let payload = {
      "fk_ar_id": Number(this.statusValue?.id),
      "fk_status": Number(formValue?.status?.value),
      "comment": formValue?.comment
    }

    this.fitmentService.updateStatus(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.modalService.hide()
        this.mapdata.emit()
        this.NotificationService.successAlert('Status Modified Succesfully')
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
