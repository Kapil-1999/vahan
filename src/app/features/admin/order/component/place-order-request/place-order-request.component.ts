import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-place-order-request',
  standalone: false,
  templateUrl: './place-order-request.component.html',
  styleUrl: './place-order-request.component.scss'
})
export class PlaceOrderRequestComponent {
  @Output() mapdata = new EventEmitter();

  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  config1 = {
    displayKey: "device_subcategory_name",
    height: '200px',
    search: true
  };
  productList: any;
  stateList: any;
  placeOrderForm!: FormGroup;
  planList: any;
  selectedProduct: any;
  userDetails: any;

  constructor(
    private modalService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private OrderService: OrderService,
    private notficationService : NotificationService
  ) { 
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
  };

  ngOnInit() {
    this.setInitialTable();
    this.getProductList();
  }

  setInitialTable() {
    this.placeOrderForm = this.fb.group({
      productId: ['', [Validators.required]],
      stateId: [''],
      planId: [''],
      quantity: ['', [Validators.required]],
      remarks: ['']
    })
  }

  getProductList() {
    let payload = {
      fk_device_category_id: 0
    }
    this.OrderService.orderProductList(payload).subscribe((res: any) => {
      this.productList = res?.body?.result

    })
  }

  onProductChange(event: any) {
    if (Array.isArray(event.value)) {
      return;
    }
    this.selectedProduct = event.value
    if (event.value?.isPlan) {
      this.getPlanList();
    }
    if (event.value?.isState) {
      this.getStateList();
    }

  }

  getStateList() {
    this.commonService.stateListOnDeviceType().subscribe((res: any) => {
      this.stateList = res.body || [];
    })
  }

  onChangeState(event: any) {
    if (Array.isArray(event.value)) {
      return;
    }
    this.getPlanList();
  }

  getPlanList() {
    let payload = {
      state_Id: Number(this.placeOrderForm.value.stateId?.value)
    }
    this.commonService.planBasedOnState(payload).subscribe((res: any) => {
      console.log(res);
      this.planList = res?.body

    })
  }

  submit(formValue: any) {
    if (this.placeOrderForm.invalid) {
      this.placeOrderForm.markAllAsTouched();
      return;
    };
    
    let payload = {
      "fk_category_id": 0,
      "fk_subcategory_id": Number(formValue.productId?.pk_device_subcategory_id),
      "fk_plan_id": formValue?.planId?.value? Number(formValue?.planId?.value) : 0,
      "fk_state_id": formValue?.stateId?.value ? Number(formValue?.stateId?.value) : 0,
      "request_qty": formValue.quantity,
      "remarks": formValue.remarks,
      "created_by": Number(this.userDetails?.Id)
    }
    this.OrderService.generateOrder(payload).subscribe((res: any) => {
      console.log(res);
      if(res?.body?.statusCode ==200) {
        this.modalService.hide();
        this.mapdata.emit();
        this.notficationService.showSuccess(res?.body?.actionResponse);
      } else {
        this.notficationService.showError(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.modalService.hide();
  }
}
