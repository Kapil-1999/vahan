import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { BackendService } from '../../../../master/backend-master/services/backend.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { SalesOrderService } from '../../services/sales-order.service';

@Component({
  selector: 'app-asign-inventory',
  standalone: false,
  templateUrl: './asign-inventory.component.html',
  styleUrl: './asign-inventory.component.scss'
})
export class AsignInventoryComponent {
  @Output() mapdata = new EventEmitter()
  inventoryForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  selectedFile: any;
  validateData: any;

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
    this.inventoryForm = this.fb.group({
      uploadInventory: ['', [Validators.required]],
    })
  }

  uploadExcel(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    } else {
      console.error('No file selected');
    }
  }

  validateFile(){
     if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      return;
    }
    let payload = {
      uploadId: this.editData?.pk_order_header_id
    }
    const formData = new FormData();
    formData.append("file", this.selectedFile);
    this.salesOrderService.validateInventoryFile(payload, formData).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.validateData = res?.body
      } 
    })
  }

  submit() {
    if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      return;
    }
    let payload = {
      uploadId: this.editData?.pk_order_header_id
    }
    const formData = new FormData();
    formData.append("file", this.selectedFile);
    this.salesOrderService.uploadInventory(payload, formData).subscribe((res: any) => {
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
