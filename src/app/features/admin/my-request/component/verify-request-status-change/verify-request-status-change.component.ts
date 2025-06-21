import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { OrderService } from '../../../order/services/order.service';
import { MyRequestService } from '../../services/my-request.service';

@Component({
  selector: 'app-verify-request-status-change',
  standalone: false,
  templateUrl: './verify-request-status-change.component.html',
  styleUrl: './verify-request-status-change.component.scss'
})
export class VerifyRequestStatusChangeComponent {
  @Output() mapdata = new EventEmitter();
  chnageStatusForm!:FormGroup;
  statusList:any
  userDetails: any;
  editData:any;

  constructor(
    private fb: FormBuilder,
    private myRequestService: MyRequestService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private notificationService: NotificationService,
  ) {
    this.commonService.getUserDetails().subscribe((res:any) => {
      this.userDetails = res
    });
   };

  ngOnInit() {
    this.setIntialForm();
    this.getStatusList()
  }

  setIntialForm() {
    this.chnageStatusForm = this.fb.group({
      status: ["", [Validators.required]],
      remarks: [""]
    });
  }

  getStatusList() {
    this.commonService.paymentStatusList().subscribe((res:any) => {
      this.statusList = res?.body || [];      
    })
  }

  submit(formValue:any, e:any) {
    e.preventDefault();
    if (this.chnageStatusForm.invalid) {
      this.chnageStatusForm.markAllAsTouched();
      return;
    }
    let payload = {
        "fk_request_id": this.editData?.customer_request_id,
        "new_status_id": Number(formValue.status),
        "log_by": Number(this.userDetails?.Id || 0),
        "remarks": formValue.remarks    
    }
    this.myRequestService.verifyRequestPaymentStatus(payload).subscribe((res:any) => {
      if (res?.body?.statusCode == 200) {
        this.notificationService.showSuccess(res?.body?.actionResponse);
        this.modalService.hide();
        this.mapdata.emit();
      } else {
        this.notificationService.showError(res?.body?.actionResponse);
      }
      
    })
  }

  cancel() {
    this.modalService.hide();
  }

}
