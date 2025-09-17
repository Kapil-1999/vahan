import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { formatDate } from '@angular/common';
import { OrderService } from '../../../../order/services/order.service';

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
  selectedDealerId: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private commonService: CommonService,
    private NotificationService: NotificationService,
    private salesOrderService: SalesOrderService,
    private OrderService: OrderService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
    this.getProductList()
    this.getBalanceData()
  }

  setInitialForm() {
    this.salesOrderForm = this.fb.group({
      date: ['', [Validators.required]],
      poNumber: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      model: [null, [Validators.required]],
      rate: ['0.00', [Validators.required, Validators.min(1),Validators.max(10000)]],
      quantity: ['0.00', [Validators.required, Validators.min(1), Validators.max(10000)]],
      tax: [{ value: 18, disabled: true }, Validators.required],
      invoiceNo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      // salesManager: ['', [Validators.required]],
      remarks: [''],
    })
    const formatDate = (date: any) => {
      if (!date) return '';
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      if (typeof date === 'string') {
        return date.split('T')[0];
      }
      return '';
    };
    if (this.editData) {
      this.tittle = 'Update'
      this.salesOrderForm.patchValue({
        date: formatDate(this.editData?.order_date),
        poNumber: this.editData?.po_no,
        rate: this.editData?.rate,
        quantity: this.editData?.quantity,
        tax: this.editData?.tax,
        invoiceNo: this.editData?.invoice_no,
        remarks: this.editData?.remarks,
      })
      this.salesOrderForm.get('quantity')?.disable();
    }
  }

quantityError: boolean = false;
rateError: boolean = false;

blockAboveMax(event: KeyboardEvent, field: 'quantity' | 'rate') {
  const input = event.target as HTMLInputElement;
  const newValue = input.value + event.key;
  if (!/^\d+$/.test(event.key)) {
    event.preventDefault();
    return;
  }
  if (Number(input.value) === 10000) {
    event.preventDefault(); 
    return;      
  }

  if (Number(newValue) > 10000) {
    event.preventDefault();
    if (field === 'quantity') this.quantityError = true;
    if (field === 'rate') this.rateError = true;
  } else {
    if (field === 'quantity') this.quantityError = false;
    if (field === 'rate') this.rateError = false;
  }
}


onInput(event: Event, field: 'quantity' | 'rate') {
  const input = event.target as HTMLInputElement;
  if (input.value === '' || Number(input.value) <= 10000) {
    if (field === 'quantity') this.quantityError = false;
    if (field === 'rate') this.rateError = false;
  }
}




  // product dropdown
  // getProductList() {
  //   this.commonService.productList().subscribe((res: any) => {
  //     if (res?.status == 200) {
  //       this.productList = res.body.result.map((item: any) => ({
  //         value: item.productId,
  //         text: item.product_Name
  //       }));
  //       if (this.editData?.fk_product_id) {
  //         const matchedProduct = this.productList.find(
  //           (product: any) => product.value === this.editData.fk_product_id
  //         );
  //         if (matchedProduct) {
  //           this.salesOrderForm.patchValue({ model: matchedProduct });
  //         }
  //       }
  //     }
  //   })
  // }

  getProductList() {
    let payload = {
      fk_device_category_id: 0
    }
    this.OrderService.orderProductList(payload).subscribe((res: any) => {
      if (res?.status == 200) {
        this.productList = res.body.result.map((item: any) => ({
          value: item.fk_device_category_id,
          text: item.device_subcategory_name
        }));

        if (this.editData) {
          const matchedProduct = this.productList.find(
            (data: any) => data.value == this.editData.fk_product_id
          );
          if (matchedProduct) {
            this.salesOrderForm.patchValue({ model: matchedProduct });
          }
        }
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

  // checkBalance(event: any): void {
  //   const inputQuantity = Number(event.target.value);
  //   if (this.balanceData && inputQuantity > this.balanceData) {
  //     this.isBalanceExceeded = true;
  //   } else {
  //     this.isBalanceExceeded = false;
  //   }
  // }

  submit(formValue: any) {

    if (this.salesOrderForm.invalid) {
      this.salesOrderForm.markAllAsTouched();
      return;
    }
    let taxFormValue = this.salesOrderForm.getRawValue();
    let service: any
    let payload: any = {
      "po_no": formValue?.poNumber,
      "order_date": formatDate(formValue.date, 'yyyy-MM-dd', 'en-US'),
      "fk_product_id": Number(formValue?.model?.value),
      "rate": Number(formValue?.rate),
      "quantity": Number(formValue?.quantity),
      "tax": taxFormValue?.tax,
      "invoice_no": formValue?.invoiceNo,
      "remarks": formValue?.remarks,
      "fk_parent_id": Number(this.userDetails?.Id),
      "fk_client_id": Number(this.selectedDealerId.value)
    }
    if (this.editData?.pk_order_header_id) {
      payload.pk_order_header_id = this.editData.pk_order_header_id;
      service = this.salesOrderService.updateSales(payload)
    } else {
      service = this.salesOrderService.createSales(payload)
    }
    console.log('payload', payload);

    service.subscribe((res: any) => {
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
