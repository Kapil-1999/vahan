import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-sales-order',
  standalone: false,
  templateUrl: './create-sales-order.component.html',
  styleUrl: './create-sales-order.component.scss'
})
export class CreateSalesOrderComponent {
  @Output() mapdata = new EventEmitter()
  salesOrderForm!: FormGroup;
  tittle: string = 'Create';
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }

  userDetails: any;
  editData: any
  productList: any;
  salesManagerList: any;
  balanceData: any;
  isBalanceExceeded: boolean = false;
  selectedDealerId:any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private commonService: CommonService,
    private NotificationService: NotificationService,
    private salesOrderService: SalesOrderService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
    this.getManagerList()
    this.getProductList()
    this.getBalanceData()
  }

  setInitialForm() {
    this.salesOrderForm = this.fb.group({
      date: ['', [Validators.required]],
      poNumber: ['', [Validators.required]],
      model: [null, [Validators.required]],
      rate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      tax: [{ value: 18, disabled: true }, Validators.required],
      invoiceNo: ['', [Validators.required]],
      salesManager: ['', [Validators.required]],
      remarks: [''],
    })
  }

  // product dropdown
  getProductList() {
    this.commonService.productList().subscribe((res: any) => {
      if (res?.status == 200) {
        this.productList = res.body.result.map((item: any) => ({
          value: item.productId,
          text: item.product_Name
        }));
      }
    })
  }

  // sales manager dropdown
  getManagerList() {
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id)
    }
    this.commonService.managerList(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.salesManagerList = res?.body?.result?.map((item: any) => ({
          value: item.empId,
          text: item.contactPersonName
        }));
      }
    })
  }

  getBalanceData() {
    let payload = {
      "employeeId": Number(this.userDetails?.Id)
    }
    this.salesOrderService.deviceBalance(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.balanceData = res?.body?.result
      }
    })
  }

  checkBalance(event: any): void {
    const inputQuantity = Number(event.target.value);
    if (this.balanceData && inputQuantity > this.balanceData) {
      this.isBalanceExceeded = true;
    } else {
      this.isBalanceExceeded = false;
    }
  }

  submit(formValue: any) {
    const inputQuantity = Number(formValue?.quantity);
    if (this.balanceData && inputQuantity > this.balanceData) {
      this.NotificationService.errorAlert("Balance not available. Cannot submit.");
      return;
    }
    if (this.salesOrderForm.invalid) {
      this.salesOrderForm.markAllAsTouched();
      return;
    }
    let successMessage: any = 'Sales Order Created Succesfully';
    let taxFormValue = this.salesOrderForm.getRawValue();
    let payload = {

      "po_no": formValue?.poNumber,
      "order_date": formatDate(formValue.date, 'yyyy-MM-dd', 'en-US'),
      "fk_product_id": Number(formValue?.model?.value),
      "fk_from_parent_id": Number(this.userDetails?.Id),
      "fk_to_dealer_id": Number(this.selectedDealerId.value),
      "rate": Number(formValue?.rate),
      "quantity": inputQuantity,
      "tax": taxFormValue?.tax,
      "invoice_no": formValue?.invoiceNo,
      "remarks": formValue?.remarks,
      "fk_sales_manager_id": Number(formValue?.salesManager?.value)
    }
console.log('payload',payload);

    this.salesOrderService.createSales(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.bsModalService.hide();
        this.mapdata.emit();
        this.NotificationService.successAlert(successMessage);
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.bsModalService.hide();
  }
}
