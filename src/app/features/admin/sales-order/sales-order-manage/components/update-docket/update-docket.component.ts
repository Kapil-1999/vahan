import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-update-docket',
  standalone: false,
  templateUrl: './update-docket.component.html',
  styleUrl: './update-docket.component.scss'
})
export class UpdateDocketComponent {
  @Output() mapdata = new EventEmitter()
  docketForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any

  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private salesOrderService: SalesOrderService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.docketForm = this.fb.group({
      docketNo: ['', [Validators.required,Validators.pattern(/^\d{12}$/)]],
    })
  }

  submit(formValue: any) {
    if (this.docketForm.invalid) {
      this.docketForm.markAllAsTouched();
      return;
    }
    let payload = {
      "po_request_id": Number(this.editData?.pk_order_header_id),
      "docket_no": formValue?.docketNo
    }
    this.salesOrderService.updateDocket(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
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
