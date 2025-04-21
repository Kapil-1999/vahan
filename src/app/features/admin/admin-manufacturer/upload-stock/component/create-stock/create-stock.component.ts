import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { StockService } from '../../services/stock.service';
import { OrderService } from '../../../../order/services/order.service';

@Component({
  selector: 'app-create-stock',
  standalone: false,
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.scss'
})
export class CreateStockComponent {
  @Output() mapdata = new EventEmitter();
  tittle : string = 'Create';
  editData:any;
  selectManu :any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  productList: any;
  stockForm!: FormGroup;

  constructor(
    private modalService : BsModalService,
    private commonService : CommonService,
    private fb : FormBuilder,
    private NotificationService : NotificationService,
    private stockService : StockService,
    private OrderService : OrderService
  ){}

  ngOnInit() {        
    this.setInitialForm();    
    if(!this.editData) {
      this.getProductList();
    }
  }

  setInitialForm() {
    this.stockForm = this.fb.group({
      product: [
        null, 
        this.editData ? [] : [Validators.required] 
      ],
      uid : ['', [Validators.required]],
      imei : ['', [Validators.required]],
      iccid : ['', [Validators.required]]
    });

    if(this.editData) {
      this.tittle = 'Update'
      this.stockForm.patchValue({
        uid : this.editData?.uid,
        imei : this.editData?.imei,
        iccid : this.editData?.iccid
      })
    }
  }

  // product dropdown
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
            (data: any) => data.value == this.editData.pk_product_id
          );
          if (matchedProduct) {
            this.stockForm.patchValue({ product: matchedProduct });
          }
        }
      }
    })
  }

  submit(formValue:any) {
    if (this.stockForm.invalid) {
      this.stockForm.markAllAsTouched();
      return;
    };
    let successMessage: any = 'Device Added Succesfully';
    let service: any;
    let payload:any = {
      "uid": formValue?.uid,
      "imei": formValue?.imei,
      "iccid": formValue?.iccid,
      "fk_manufacture_id": Number(this.selectManu?.value),
      "fk_device_type_id": Number(formValue?.product?.value)
    }
    service = this.stockService.addSingleStock(payload);
    if(this.editData) {
      payload = {
        "device_id": Number(this.editData?.device_id),
        "uid": formValue?.uid,
        "imei": formValue?.imei,
        "iccid": formValue?.iccid
      }
      service = this.stockService.updateStock(payload);
      successMessage = 'Device Updated Successfully'
    }
    service.subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.modalService.hide();
        this.mapdata.emit();
        this.NotificationService.successAlert(successMessage);
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })

  }

  cancel() {
    this.modalService.hide();
  }
}
