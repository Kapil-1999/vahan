import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-sub-category',
  standalone: false,
  templateUrl: './create-sub-category.component.html',
  styleUrl: './create-sub-category.component.scss'
})
export class CreateSubCategoryComponent {
  @Output() mapdata = new EventEmitter()
  subCategoryForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  categoryData: any
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  gstListData: any;
  selectedHsn: any;
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private subCategoryService: SubCategoryService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    console.log(this.editData);
    
    this.setInitialForm();
    this.getGstDropdown()
    this.changeValue()
  }

  changeValue() {
    this.subCategoryForm.get('isState')?.valueChanges.subscribe(isStateValue => {
      const isplanControl = this.subCategoryForm.get('isplan');
      if (isStateValue) {
        isplanControl?.enable();
      } else {
        isplanControl?.setValue(false);
        isplanControl?.disable();
      }
    });
  }

  setInitialForm() {
    this.subCategoryForm = this.fb.group({
      subCategoryName: ['', [Validators.required]],
      hsnCode: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      isState: [false],
      isplan: [{ value: false, disabled: true }],
    });
  
    if (this.editData) {
      this.tittle = 'Update';
        this.subCategoryForm.patchValue({
        subCategoryName: this.editData?.device_subcategory_name,
        isState: this.editData?.isState,
        rate: this.editData?.device_price,
      });
  
      const isplanControl = this.subCategoryForm.get('isplan');
        if (this.editData?.isState) {
        isplanControl?.enable();
          this.subCategoryForm.patchValue({
          isplan: this.editData?.isPlan 
        });
      } else {
        isplanControl?.disable();
        this.subCategoryForm.patchValue({
          isplan: false
        });
      }
    }
  }
  

  onSelectHsnCode(event: any) {
    this.selectedHsn = event?.value
  }

  getGstDropdown() {
    this.commonService.getGstList().subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.gstListData = res.body.result.map((item: any) => ({
          value: item.pk_gst_id,
          text: item.hsN_CODE,
          cgst: item.cgst,
          igst: item.igst,
          sgst: item.sgst,
        }));
        if (this.editData?.pk_device_subcategory_id) {
          const matchedGst = this.gstListData.find(
            (state: any) => state.value === this.editData?.fk_gst_id
          );
          if (matchedGst) {
            this.subCategoryForm.patchValue({ hsnCode: matchedGst });
          }
        }
      }
    })
  }


  submit(formValue: any) {
    if (this.subCategoryForm.invalid) {
      this.subCategoryForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    const rawValue = this.subCategoryForm.getRawValue();

    if (this.editData?.pk_device_subcategory_id) {
      payload = {
        "pk_device_subcategory_id": Number(this.editData?.pk_device_subcategory_id),
        "fk_device_category_id": Number(this.categoryData.value),
        "device_subcategory_name": formValue?.subCategoryName,
        "isState": formValue?.isState,
        "isPlan": rawValue?.isplan,
        "fk_gst_id": Number(formValue?.hsnCode?.value),
        "device_price" : formValue?.rate
      }
      successMessage = 'Sub Category Updated Succesfully'
      service = this.subCategoryService.updatSubCategory(payload);
    } else {
      payload = {
        "fk_device_category_id": Number(this.categoryData.value),
        "device_subcategory_name": formValue?.subCategoryName,
        "isState": formValue?.isState,
        "isPlan": rawValue?.isplan,
        "fk_gst_id": Number(formValue?.hsnCode?.value),
        "device_price":formValue?.rate

      }
      successMessage = 'Sub Category Created Succesfully'
      service = this.subCategoryService.createSubCategory(payload)
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
