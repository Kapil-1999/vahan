import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MyRequestService } from '../../services/my-request.service';

@Component({
  selector: 'app-change-request-status',
  standalone: false,
  templateUrl: './change-request-status.component.html',
  styleUrl: './change-request-status.component.scss'
})
export class ChangeRequestStatusComponent {
  @Output() mapdata = new EventEmitter();

  editData: any;
  statusList = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Processing' },
    { id: 3, name: 'Dispatched' },
    { id: 3, name: 'Rejected' },
  ];
  chnageStatusForm!: FormGroup;
  numericStatus: any;
  userDetails: any;

  constructor(
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private myRequestService: MyRequestService,
    private notificationService: NotificationService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    console.log(this.editData);
    this.setIntialForm()
  }

  setIntialForm() {
    const defaultStatus = this.editData?.request_status || this.statusList[0].name;
    
    this.chnageStatusForm = this.fb.group({
      status: [defaultStatus, [Validators.required]],
      remarks: [this.editData?.remarks]
    });
    
    this.chnageStatusForm.get('status')?.valueChanges.subscribe((value) => {
      this.changeSt(value);
    });
    
    this.changeSt(defaultStatus);
  }

  changeSt(item: any) {
    if (!item) return;

    const selectedStatusName = item;
    const statusValues: { [key: string]: number } = {
      'Pending': 1,
      'Processing': 2,
      'Dispatched': 3,
      'Rejected': 4
    };

    this.numericStatus = statusValues[selectedStatusName];
  }

  submit(formValue: any, e: any) {
    e.preventDefault();
    const currentStatus = this.chnageStatusForm.get('status')?.value;
    if (typeof currentStatus === 'string') {
      this.changeSt(currentStatus);
    }
    let payload = {
      "fk_request_id": this.editData?.pk_device_request_id,
      "new_status_id": this.numericStatus,
      "log_by": Number(this.userDetails?.Id),
      "remarks": formValue?.remarks,
    }
    this.myRequestService.UpdateRequestStatus(payload).subscribe((res: any) => {
      if (res?.body?.statusCode == 200) {
        this.notificationService.showSuccess(res?.body?.actionResponse);
        this.bsModalService.hide();
        this.mapdata.emit();
      } else {
        this.notificationService.showError(res?.body?.actionResponse);
      }
    });
  }

  cancel() {
    this.bsModalService.hide();
  }
}
