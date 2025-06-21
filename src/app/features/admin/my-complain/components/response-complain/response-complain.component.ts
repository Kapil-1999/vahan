import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { MycomplainService } from '../../services/mycomplain.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-response-complain',
  standalone: false,
  templateUrl: './response-complain.component.html',
  styleUrl: './response-complain.component.scss'
})
export class ResponseComplainComponent {
  @Output() mapdata = new EventEmitter()
  responseComplainForm!: FormGroup;
  userDetails: any;
  editData: any
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  StatusDropdown = [
    {
      "value": 1,
      "text": "Open"
    },
    {
      "value": 0,
      "text": "Close"
    },
  ];
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private myComplainService: MycomplainService,

  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {    
    console.log('editData',this.editData);
    this.setInitialForm();
  }

  setInitialForm() {
    this.responseComplainForm = this.fb.group({
      status: [1, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submit(formValue: any) {
    if (this.responseComplainForm.invalid) {
      this.responseComplainForm.markAllAsTouched();
      return;
    }
    let service : any
    let payload = {
      "fk_complaint_id": Number(this.editData?.pk_complaint_id),
      "action_description": formValue?.description,
      "log_by": Number(this.userDetails.Id),
      "is_closed":  Number(formValue?.status)
    }
    if (this.userDetails?.RoleId == 7 || this.userDetails?.RoleId == 6) {
      service = this.myComplainService.responseComplain(payload)
    } else {
      service = this.myComplainService.oldComplainList(payload)
    }
    service.subscribe((res: any) => {
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
