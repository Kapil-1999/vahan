import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-category',
  standalone: false,
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  @Output() mapdata = new EventEmitter()
  categoryForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private categoryService: CategoryService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.categoryForm.patchValue({
        categoryName: this.editData?.device_category_name,
      })
    }
  }

  submit(formValue: any) {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.pk_device_category_id) {
      payload = {
        "pk_device_category_id": Number(this.editData?.pk_device_category_id),
        "device_category_name": formValue?.categoryName
      }
      successMessage = 'Category Updated Succesfully'
      service = this.categoryService.updateCategory(payload);
    } else {
      payload = {
        "device_category_name": formValue?.categoryName
      }
      successMessage = 'Category Created Succesfully'
      service = this.categoryService.createCategory(payload)
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
