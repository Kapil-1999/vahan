import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DealerService } from '../../services/dealer.service';

@Component({
  selector: 'app-create-dealer',
  standalone: false,
  templateUrl: './create-dealer.component.html',
  styleUrl: './create-dealer.component.scss'
})
export class CreateDealerComponent {
  @Output() mapdata = new EventEmitter()

  dealerForm!: FormGroup;
  StatusDropdown = [
    {
      "value": 1,
      "text": "Active"
    },
    {
      "value": 0,
      "text": "Barred"
    },
  ];

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
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private commonService: CommonService,
    private NotificationService: NotificationService,
    private dealerService: DealerService,
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
    this.dealerForm = this.fb.group({
      orgnizationName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9&.\-\s]{3,50}$/)]],
      personName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.maxLength(254)]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      panNo: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      gstn: ['', [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      status: [1, [Validators.required]],
      password: ['User@123456#', [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(12),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,15}$/)]],
      state: ['', [Validators.required]],
      stateValue: [''],
      cityValue: [''],
      city: ['', [Validators.required]],
      address: [''],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.dealerForm.patchValue({
        orgnizationName: this.editData?.orgName,
        personName: this.editData?.contactPersonName,
        email: this.editData?.email,
        mobileNo: this.editData?.mobileNo,
        panNo: this.editData?.panNo,
        gstn: this.editData?.gstNo,
        status: this.editData?.empStatus,
        password: this.editData?.empPassword,
        address: this.editData?.address,
      })
    }
  }

  toggleButton() {
    this.showCityInput = false;
    this.selectedState = null;
    this.dealerForm.controls['state'].setValue(null)
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
            this.dealerForm.patchValue({ state: matchedState });
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
            this.dealerForm.patchValue({ city: matchedCity });
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
      "stateName": this.dealerForm?.value?.stateValue,
      "createdBy": this.userDetails?.Id
    }
    this.commonService.createState(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.dealerForm.controls['stateValue'].setValue(null)
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
    this.dealerForm.controls['city'].setValue(null)
    this.selectedState = event?.value?.value;
    if (this.selectedState) {
      this.getCityDropdown(this.selectedState);
    }
  }
  
  addCity() {
    let successMessage = 'City Added Succesfully'
    let errorMessage = 'City Not Added'
    let payload: any = {
      "city_name": this.dealerForm?.value.cityValue,
      "pk_state_id": Number(this.dealerForm?.value.state?.value)
    };
    this.commonService.addCity(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showCityInput = false
        this.dealerForm.controls['cityValue'].setValue(null)
        this.getCityDropdown(this.dealerForm?.value.state?.value)
        this.NotificationService.successAlert(successMessage)
      } else {
        this.NotificationService.errorAlert(errorMessage)
      }
    })
  }

  submit(formValue: any) {
    if (this.dealerForm.invalid) {
      this.dealerForm.markAllAsTouched();
      return;
    }
    let payload = {
      "empId": 0,
      "roleId": 3,
      "parentId": Number(this.selectedId),
      "orgName": formValue?.orgnizationName,
      "contactPersonName": formValue?.personName,
      "allowARCode": 0,
      "email": formValue?.email,
      "mobileNo": String(formValue?.mobileNo),
      "gstNo": formValue?.gstn,
      "panNo": formValue?.panNo,
      "empStatus": Number(formValue?.status),
      "empPassword": formValue?.password,
      "address": formValue?.address,
      "pk_state_id": Number(formValue?.state?.value),
      "pk_city_id": Number(formValue?.city?.value),
    }
    let service: any;
    let successMessage: any;
    if (this.editData?.empId) {
      successMessage = 'Dealer Updated Succesfully';
      payload['empId'] = Number(this.editData?.empId);
      service = this.dealerService.updateDealer(payload);
    } else {
      successMessage = 'Dealer Created Succesfully';
      service = this.dealerService.createDealer(payload);
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

  toPanInput(event: any) {
    const input = event.target as HTMLInputElement;
    const formattedValue = this.commonService.formatPan(input.value);
    input.value = formattedValue;
    this.dealerForm.get('panNo')?.setValue(formattedValue, { emitEvent: false });
  }


  toGstinInput(event: any) {
    const input = event.target as HTMLInputElement;
    const formattedValue = this.commonService.formatGstin(input.value);
    input.value = formattedValue;
    this.dealerForm.get('gstn')?.setValue(formattedValue, { emitEvent: false });
  };

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  };
}
