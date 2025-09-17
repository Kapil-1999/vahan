import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { DealerService } from '../../../../dealer/dealer-manage/services/dealer.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-create-support',
  standalone: false,
  templateUrl: './create-support.component.html',
  styleUrl: './create-support.component.scss'
})
export class CreateSupportComponent {
  @Output() mapdata = new EventEmitter()
  supportForm!: FormGroup;
  tittle: string = 'Create';
  showInput: boolean = false;
  showCityInput: boolean = false;
  stateData: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  cityData: any;
  userDetails: any;
  editData: any
  selectedState: any;
  selectedId: any
  headdata:any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private commonService: CommonService,
    private NotificationService: NotificationService,
    private supportService: SupportService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
    this.getStateDropdown();
  }

  setInitialForm() {
    this.supportForm = this.fb.group({
      personName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.maxLength(254)]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['User@123456#', [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(12),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,15}$/)]],
      state: ['', [Validators.required]],
      stateValue: [''],
      cityValue: [''],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: [''],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.supportForm.patchValue({
        personName: this.editData?.contactPersonName,
        email: this.editData?.email,
        mobileNo: this.editData?.mobileNo,
        password: this.editData?.empPassword,
        address: this.editData?.address,
        pinCode: this.editData?.pinCode,
      })
    }
  }

  toggleButton() {
    this.showCityInput = false;
    this.selectedState = null;
    this.supportForm.controls['state'].setValue(null)
    this.showInput = !this.showInput
  }

  getStateDropdown() {
    this.commonService.stateDropdownList().subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.stateData = res.body.result.map((item: any) => ({
          value: item.stateId,
          text: item.stateName
        }));
        if (this.editData?.pk_state_id) {
          const matchedState = this.stateData.find(
            (state: any) => state.value === this.editData.pk_state_id
          );
          if (matchedState) {
            this.supportForm.patchValue({ state: matchedState });
            this.getCityDropdown(matchedState.value);
          }
        }
      }
    })
  }

  getCityDropdown(stateId: any) {
    let payload = {
      "stateId": Number(stateId)
    }
    this.commonService.cityDropdown(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.cityData = res.body.result.map((item: any) => ({
          value: item.city_id,
          text: item.city_name
        }));
        if (this.editData?.pk_city_id) {
          const matchedCity = this.cityData.find(
            (city: any) => city.value === this.editData.pk_city_id
          );
          if (matchedCity) {
            this.supportForm.patchValue({ city: matchedCity });
          }
        }
      }

    })
  }

  addState() {
    this.showCityInput = false;
    let successMessage = 'State Created Succesfully'
    let errorMessage = 'State Not Created'
    let payload = {
      "stateName": this.supportForm?.value?.stateValue,
      "createdBy": this.userDetails?.Id
    }
    this.commonService.createState(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.supportForm.controls['stateValue'].setValue(null)
        this.showInput = false;
        this.getStateDropdown()
        this.NotificationService.successAlert(successMessage)
      } else {
        this.NotificationService.errorAlert(errorMessage)
      };
    });
  };

  toggleCityButton() {
    this.showCityInput = !this.showCityInput;
  }

  onSelectState(event: any) {
    this.showCityInput = false;
    this.cityData = [];
    this.supportForm.controls['city'].setValue(null)
    this.selectedState = event?.value?.value;
    if (this.selectedState) {
      this.getCityDropdown(this.selectedState);
    }
  }

  addCity() {
    let successMessage = 'City Added Succesfully'
    let errorMessage = 'City Not Added'
    let payload: any = {
      "city_name": this.supportForm?.value.cityValue,
      "pk_state_id": Number(this.supportForm?.value.state?.value)
    };
    this.commonService.addCity(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showCityInput = false
        this.supportForm.controls['cityValue'].setValue(null)
        this.getCityDropdown(this.supportForm?.value.state?.value)
        this.NotificationService.successAlert(successMessage)
      } else {
        this.NotificationService.errorAlert(errorMessage)
      }
    })
  }

  submit(formValue: any) {
    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.empId) {
      payload = {
        "empId": Number(this.editData?.empId),
        "employeeName": formValue?.personName,
        "email": formValue?.email,
        "mobileNo": String(formValue?.mobileNo),
        "empPassword": formValue?.password,
        "address": formValue?.address,
        "pk_state_id": Number(formValue?.state?.value),
        "pk_city_id": Number(formValue?.city?.value),
        "pinCode": formValue?.pincode
      }
      successMessage = 'Support Updated Succesfully'
      service = this.supportService.updateSupport(payload);
    } else {
      payload = {
        "headId":this.headdata ? Number(this.headdata?.value) : 0,
        "parentId": Number(this.userDetails?.Id),
        "employeeName": formValue?.personName,
        "email": formValue?.email,
        "mobileNo": String(formValue?.mobileNo),
        "empPassword": formValue?.password,
        "address": formValue?.address,
        "pk_state_id": Number(formValue?.state?.value),
        "pk_city_id": Number(formValue?.city?.value),
        "pinCode": formValue?.pincode

      }
      successMessage = 'Support Created Succesfully'
      service = this.supportService.addSupport(payload)
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
  };

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
