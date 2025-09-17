import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { AuthorityService } from '../../services/authority.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-authority',
  standalone: false,
  templateUrl: './create-authority.component.html',
  styleUrl: './create-authority.component.scss'
})
export class CreateAuthorityComponent {
  @Output() mapdata = new EventEmitter()
  authorityForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  showInput: boolean = false;
  showCityInput : boolean = false;
  stateData:any;
  cityData: any;
  selectedState: any;

  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private authorityService: AuthorityService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
    this.getStateDropdown()
  }

  setInitialForm() {
    this.authorityForm = this.fb.group({
      authorityName: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      state: ['', [Validators.required]],
      stateValue: [''],
      cityValue: [''],
      city: ['', [Validators.required]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.authorityForm.patchValue({
        authorityName: this.editData?.authority_Name,
      })
    }
  }

  toggleButton() {
    this.showCityInput = false;
    this.selectedState = null;
    this.authorityForm.controls['state'].setValue(null)
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
            this.authorityForm.patchValue({ state: matchedState });
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
            this.authorityForm.patchValue({ city: matchedCity });
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
      "stateName": this.authorityForm?.value?.stateValue,
      "createdBy": this.userDetails?.Id
    }
    this.commonService.createState(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.authorityForm.controls['stateValue'].setValue(null)
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
    this.authorityForm.controls['city'].setValue(null)
    this.selectedState = event?.value?.value;
    if (this.selectedState) {
      this.getCityDropdown(this.selectedState);
    }
  }
  
  addCity() {
    let successMessage = 'City Added Succesfully'
    let errorMessage = 'City Not Added'
    let payload: any = {
      "city_name": this.authorityForm?.value.cityValue,
      "pk_state_id": Number(this.authorityForm?.value.state?.value)
    };
    this.commonService.addCity(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showCityInput = false
        this.authorityForm.controls['cityValue'].setValue(null)
        this.getCityDropdown(this.authorityForm?.value.state?.value)
        this.NotificationService.successAlert(successMessage)
      } else {
        this.NotificationService.errorAlert(errorMessage)
      }
    })
  }

  submit(formValue: any) {
    if (this.authorityForm.invalid) {
      this.authorityForm.markAllAsTouched();
      return;
    }
    let payload: any
    let service: any;
    let successMessage: any;
    if (this.editData?.authority_Id) {
      payload = {
        "authority_Id": Number(this.editData?.authority_Id),
        "authority_Name": formValue?.authorityName,
        "updatedBy": this.userDetails?.Id,
        "activated": 1,
        "deleted": 0,
        "pk_state_id": Number(formValue?.state?.value),
        "pk_city_id": Number(formValue?.city?.value)
      }
      successMessage = 'Authority Updated Succesfully'
      service = this.authorityService.updateAuthority(payload);
    } else {
      payload = {
        "authority_Name": formValue?.authorityName,
        "createdBy": this.userDetails?.Id,
        "pk_state_id": Number(formValue?.state?.value),
        "pk_city_id": Number(formValue?.city?.value)
      }
      successMessage = 'Authority Created Succesfully'
      service = this.authorityService.addAuthority(payload)
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
