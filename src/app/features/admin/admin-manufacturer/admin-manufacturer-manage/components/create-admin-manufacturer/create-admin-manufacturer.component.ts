import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { AdminManufacturerService } from '../../services/admin-manufacturer.service';

@Component({
  selector: 'app-create-admin-manufacturer',
  standalone: false,
  templateUrl: './create-admin-manufacturer.component.html',
  styleUrl: './create-admin-manufacturer.component.scss'
})
export class CreateAdminManufacturerComponent {
  @Output() mapdata = new EventEmitter();

  manufactureForm! : FormGroup;
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
  base64Logo: string = ''; 
  editData:any
  selectedState: any;
  imagePath: any;

  constructor(
    private fb: FormBuilder,
    private bsModalService : BsModalService,
    private commonService : CommonService,
    private NotificationService :NotificationService,
    private manufactureService : AdminManufacturerService
  ) {
     this.commonService.getUserDetails().subscribe((res:any) => {
      this.userDetails = res
     });    
  };

  ngOnInit() {
    console.log("check edit", this.editData);
    this.setInitialForm();
    this.getStateDropdown();
  }

  setInitialForm () {    
    this.manufactureForm = this.fb.group({
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
      logo: [''],
      address: [''],
    })
    if(this.editData) {
      this.tittle = 'Update'
      this.manufactureForm.patchValue({
        orgnizationName : this.editData?.orgName,
        personName : this.editData?.contactPersonName,
        email : this.editData?.email,
        mobileNo : this.editData?.mobileNo,
        panNo : this.editData?.panNo,
        gstn : this.editData?.gstNo,
        status : this.editData?.empStatus,
        password : this.editData?.empPassword,
        address : this.editData?.address
      })
      this.imagePath = this.editData?.profile_image_path;
    }
  }

  getImageUrl(path: string): string {
    return path ? `${path.replace(/\\/g, '/')}` : '';
  }

  toggleButton() {
    this.showCityInput = false;
    this.selectedState = null;
    this.manufactureForm.controls['state'].setValue(null)
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
            this.manufactureForm.patchValue({ state: matchedState });
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
            this.manufactureForm.patchValue({ city: matchedCity });
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
      "stateName": this.manufactureForm?.value?.stateValue,
      "createdBy": this.userDetails?.Id
    }
    this.commonService.createState(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.manufactureForm.controls['stateValue'].setValue(null)
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
    this.manufactureForm.controls['city'].setValue(null)
    this.selectedState = event?.value?.value;
    if (this.selectedState) {
      this.getCityDropdown(this.selectedState);
    }
  }
  
  addCity() {
    let successMessage = 'City Added Succesfully'
    let errorMessage = 'City Not Added'
    let payload: any = {
      "city_name": this.manufactureForm?.value.cityValue,
      "pk_state_id": Number(this.manufactureForm?.value.state?.value)
    };
    this.commonService.addCity(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showCityInput = false
        this.manufactureForm.controls['cityValue'].setValue(null)
        this.getCityDropdown(this.manufactureForm?.value.state?.value)
        this.NotificationService.successAlert(successMessage)
      } else {
        this.NotificationService.errorAlert(errorMessage)
      }
    })
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Logo = e.target.result.split(',')[1]; 
      };
      reader.readAsDataURL(file);
    }
  }

  submit(formValue:any) {
    if (this.manufactureForm.invalid) {
      this.manufactureForm.markAllAsTouched();
      return;
    }
    let payload = {
      "empId": 0,
      "roleId": 6,
      "parentId": this.userDetails?.Id,
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
      "isupload ": 1,
      "ImagePath": this.base64Logo,
      "ImageName": ''
    }    
    let service :any;
    let successMessage: any;
    if (this.editData?.empId) {
      successMessage = 'Manufacturer Updated Succesfully';
      payload['empId'] = Number(this.editData?.empId);
      service = this.manufactureService.updateManufacture(payload);
    } else {
      successMessage = 'Manufacturer Created Succesfully';
      service = this.manufactureService.createManufacturer(payload);
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
