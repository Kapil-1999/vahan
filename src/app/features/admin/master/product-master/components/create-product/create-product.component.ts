import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  standalone: false,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  @Output() mapdata = new EventEmitter()
  productForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private ProductService: ProductService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.productForm = this.fb.group({
      pName: ['', [Validators.required]],
      description: ['', [Validators.required]],    })
    if (this.editData) {
      this.tittle = 'Update'
      this.productForm.patchValue({
        pName: this.editData?.product_Name,
        description: this.editData?.description,
      })
    }
  }

  submit(formValue: any) {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.productId) {
      payload = {
        "productId": Number(this.editData?.productId),
        "product_Name": formValue?.pName,
        "description": formValue?.description,
        "updatedBy": this.userDetails?.Id,
        "Deleted": 0  
      }
      successMessage = 'Product Updated Succesfully'
      service = this.ProductService.updateProduct(payload);
    } else {
      payload = {
        "product_Name":formValue?.pName,
        "description": formValue?.description,
        "createdBy": this.userDetails?.Id

      }
      successMessage = 'Product Created Succesfully'
      service = this.ProductService.addProduct(payload)
    }
    service.subscribe((res: any) => {
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
