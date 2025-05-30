import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DistributerService } from '../../services/distributer.service';

@Component({
  selector: 'app-create-distributer',
  standalone: false,
  templateUrl: './create-distributer.component.html',
  styleUrl: './create-distributer.component.scss'
})
export class CreateDistributerComponent {
  @Output() mapdata = new EventEmitter()

  distributerForm! : FormGroup;
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

  allowArClose = [
    {
      "value": 1,
      "text": "Yes"
    },
    {
      "value": 0,
      "text": "No"
    },
  ];
  tittle : string = 'Create';
  showInput: boolean = false;
  showCityInput : boolean = false;
  stateData:any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  cityData: any;
  userDetails: any;
  editData:any
  selectedState: any;

  constructor(
    private fb: FormBuilder,
    private bsModalService : BsModalService,
    private commonService : CommonService,
    private NotificationService :NotificationService,
    private distributerService: DistributerService,
  ) {
     this.commonService.getUserDetails().subscribe((res:any) => {
      this.userDetails = res
     });    
  };

  ngOnInit() {
    this.setInitialForm();
    this.getStateDropdown();
  }

  setInitialForm () {    
    this.distributerForm = this.fb.group({
      orgnizationName: ['', [Validators.required]],
      personName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      panNo: ['', [Validators.required]],
      gstn: ['', [Validators.required]],
      status: [1, [Validators.required]],
      password: ['123456', [Validators.required]],
      state: ['', [Validators.required]],
      stateValue: [''],
      cityValue: [''],
      city: ['', [Validators.required]],
      allowArClose: [1,[Validators.required]],
      address: [''],
    })
    if(this.editData) {
      this.tittle = 'Update'
      this.distributerForm.patchValue({
        orgnizationName : this.editData?.orgName,
        personName : this.editData?.contactPersonName,
        email : this.editData?.email,
        mobileNo : this.editData?.mobileNo,
        panNo : this.editData?.panNo,
        gstn : this.editData?.gstNo,
        status : this.editData?.empStatus,
        password : this.editData?.empPassword,
        address : this.editData?.address,
        allowArClose:this.editData?.allowARCode
      })
    }
  }

  toggleButton() {
    this.showCityInput = false;
    this.selectedState = null;
    this.distributerForm.controls['state'].setValue(null)
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
            this.distributerForm.patchValue({ state: matchedState });
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
            this.distributerForm.patchValue({ city: matchedCity });
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
      "stateName": this.distributerForm?.value?.stateValue,
      "createdBy": this.userDetails?.Id
    }
    this.commonService.createState(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.distributerForm.controls['stateValue'].setValue(null)
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
    this.distributerForm.controls['city'].setValue(null)
    this.selectedState = event?.value?.value;
    if (this.selectedState) {
      this.getCityDropdown(this.selectedState);
    }
  }
  
  addCity() {
    let successMessage = 'City Added Succesfully'
    let errorMessage = 'City Not Added'
    let payload: any = {
      "city_name": this.distributerForm?.value.cityValue,
      "pk_state_id": Number(this.distributerForm?.value.state?.value)
    };
    this.commonService.addCity(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showCityInput = false
        this.distributerForm.controls['cityValue'].setValue(null)
        this.getCityDropdown(this.distributerForm?.value.state?.value)
        this.NotificationService.successAlert(successMessage)
      } else {
        this.NotificationService.errorAlert(errorMessage)
      }
    })
  }

  submit(formValue:any) {
    if (this.distributerForm.invalid) {
      this.distributerForm.markAllAsTouched();
      return;
    }
    let payload = {
      "empId": 0,
      "roleId": 2,
      "parentId": Number(this.userDetails?.Id),
      "orgName": formValue?.orgnizationName,
      "contactPersonName": formValue?.personName,
      "allowARCode": Number(formValue?.allowArClose),
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
    let service :any;
    let successMessage: any;
    if (this.editData?.empId) {
      successMessage = 'Distributer Updated Succesfully';
      payload['empId'] = Number(this.editData?.empId);
      service = this.distributerService.updateDistributer(payload);
    } else {
      successMessage = 'Distributer Created Succesfully';
      service = this.distributerService.createDistributer(payload);
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
