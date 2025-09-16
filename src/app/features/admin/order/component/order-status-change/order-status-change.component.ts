import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-order-status-change',
  standalone: false,
  templateUrl: './order-status-change.component.html',
  styleUrl: './order-status-change.component.scss'
})
export class OrderStatusChangeComponent {
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
    private orderService: OrderService,
    private notificationService: NotificationService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setIntialForm()
  }

  setIntialForm() {
    this.chnageStatusForm = this.fb.group({
      status: [this.editData?.status_Name, [Validators.required]],
      remarks: [""]
    });
    this.chnageStatusForm.get('status')?.valueChanges.subscribe((value) => {
      this.changeSt(value);
    });
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
      "fk_request_id": this.editData?.pk_request_id,
      "new_status_id": this.numericStatus,
      "log_by": Number(this.userDetails?.Id),
      "remarks": formValue?.remarks,
    }
    this.orderService.UpdateRequestOrderStatus(payload).subscribe((res: any) => {
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
