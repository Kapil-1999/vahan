import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { StockService } from '../../services/stock.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-add-bulk-stock',
  standalone: false,
  templateUrl: './add-bulk-stock.component.html',
  styleUrl: './add-bulk-stock.component.scss'
})
export class AddBulkStockComponent {
  @Output() mapdata = new EventEmitter();
  tittle : string = 'Create';
  selectManu :any;
  stockForm!: FormGroup;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  productList: any;
  selectedFile: any;


  constructor(
    private bsmodalService : BsModalService,
    private fb : FormBuilder,
    private commonService : CommonService,
    private stockService : StockService,
    private NotificationService : NotificationService
  ) {};

  ngOnInit() {
    this.setInialValue();
    this.getProductList();
  }

  setInialValue() {
    this.stockForm = this.fb.group({
      product : [null, [Validators.required]],
      devices: ['', [Validators.required]]
    })
  }

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

  uploadExcel(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    } else {
      console.error('No file selected');
    }
  }

  submit(formValue:any) {
    if (this.stockForm.invalid) {
      this.stockForm.markAllAsTouched();
      return;
    };
    let successMessage = 'Devices Uploaded Succesfully'
    let payload: any = {
      "manufactureId": Number(this.selectManu?.value),
      "productId": Number(formValue?.product?.value),
    };
    const formData = new FormData();
    formData.append("file", this.selectedFile);
    let service = this.stockService.addBulkStock(payload, formData);
    service.subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.bsmodalService.hide()
        this.mapdata.emit()
        this.NotificationService.successAlert(successMessage)
      } else {

        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }

    })
  }


  cancel() {
    this.bsmodalService.hide()
  }
}
